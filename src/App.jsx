import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, User, Bot, Sparkles, Zap, Moon, Sun } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { fetchChats, postChat } from "./api"; // <- new

// ---------------- BOT RESPONSE ----------------
const generateBotResponse = (userMessage, messageHistory) => {
  const message = userMessage.toLowerCase();
  const responses = {
    greeting: [
      "Hello! I'm excited to chat with you today. What's on your mind?",
      "Hey there! I'm here and ready to help. What would you like to explore?",
      "Hi! Great to meet you. I'm your AI assistant - how can I make your day better?",
    ],
    default: [
      "That's really interesting! I'd love to hear more.",
      "Thanks for sharing that. Want to explore further?",
      "I like that perspective! Tell me more…",
    ],
  };

  if (message.match(/hello|hi|hey/)) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  } else {
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  }
};

// ---------------- AUTH PAGE ----------------
const AuthComponent = ({ onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        // ✅ Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user.emailVerified) {
          // send email as userId to parent
          onAuth(user.email || user.uid);
        } else {
          alert("Please verify your email before logging in.");
          await signOut(auth);
        }
      } else {
        // ✅ Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert("Verification email sent! Please check your inbox.");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 relative z-10">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AI Chat</span>
          </h1>
          <p className="text-white/70">Your intelligent conversation partner</p>
        </div>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition disabled:opacity-50"
        >
          {isLoading ? "Authenticating..." : isLogin ? "Sign In" : "Create Account"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-white/70 hover:text-white cursor-pointer"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </p>
      </div>
    </div>
  );
};

// ---------------- CHAT PAGE ----------------
const ChatPage = ({ userId, onSignOut }) => {
  const [messages, setMessages] = useState([
    // placeholder will be replaced by fetched history
    { id: "welcome", _id: "welcome", content: "👋 Hi! I'm your AI assistant. How can I help today?", role: "assistant" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // load history when component mounts or when userId changes
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const chats = await fetchChats(userId);
        // normalize returned docs to match your UI keys
        const normalized = chats.map(c => ({
          id: c._id,
          _id: c._id,
          content: c.message,
          role: c.role
        }));
        // if no messages, keep welcome
        setMessages(normalized.length ? normalized : [
          { id: "welcome", _id: "welcome", content: "👋 Hi! I'm your AI assistant. How can I help today?", role: "assistant" }
        ]);
      } catch (e) {
        console.error("Failed to fetch chats", e);
      }
    })();
  }, [userId]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // optimistic UI: push user message locally
    const userMsgLocal = { id: Date.now(), content: inputMessage, role: "user" };
    setMessages((prev) => [...prev, userMsgLocal]);
    const messageText = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      // persist user message
      const savedUserMsg = await postChat({ userId, role: "user", message: messageText });
      // generate bot response (your existing local stub)
      const botReplyText = generateBotResponse(messageText, messages);
      // persist bot reply
      const savedBotMsg = await postChat({ userId, role: "assistant", message: botReplyText });
      // update UI: replace optimistic (we appended user local msg earlier), append bot saved
      setMessages((prev) => {
        // remove the optimistic msg with same content & role "user" if server returned _id (optional)
        // here we simply append the saved versions to ensure server IDs present
        return [...prev, { id: savedUserMsg._id, _id: savedUserMsg._id, content: savedUserMsg.message, role: savedUserMsg.role }, { id: savedBotMsg._id, _id: savedBotMsg._id, content: savedBotMsg.message, role: savedBotMsg.role }];
      });
    } catch (e) {
      console.error("send failed", e);
      alert("Failed to send message. Check console for details.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`h-screen flex flex-col ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow">
        <h2 className="flex items-center gap-2 font-bold"><Bot className="w-5 h-5" /> AI Chat</h2>
        <div className="flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={async () => {
              try {
                await signOut(auth);
                onSignOut();
              } catch (err) {
                console.error(err);
              }
            }}
            className="text-sm bg-white/20 px-3 py-1 rounded"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id || msg._id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-3`}>
            <div className={`px-4 py-2 rounded-2xl max-w-xs ${msg.role === "user" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "bg-white text-gray-900 shadow"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && <p className="text-sm text-gray-400">AI is typing...</p>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 flex items-center gap-2 border-t bg-white">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
        />
        <button onClick={handleSendMessage} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// ---------------- APP ----------------
const App = () => {
  // userId will be email (or uid) when authenticated; null otherwise
  const [userId, setUserId] = useState(null);

  // onAuth now receives userId string (email or uid)
  const handleAuth = (uidOrEmail) => setUserId(uidOrEmail);
  const handleSignOut = () => setUserId(null);

  return <>{userId ? <ChatPage userId={userId} onSignOut={handleSignOut} /> : <AuthComponent onAuth={handleAuth} />}</>;
};

export default App;
