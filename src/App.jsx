import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, User, Bot, Sparkles, Zap, Moon, Sun } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

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
          onAuth(true);
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
const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, content: "👋 Hi! I'm your AI assistant. How can I help today?", role: "assistant" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { id: Date.now(), content: inputMessage, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = { id: Date.now() + 1, content: generateBotResponse(inputMessage, messages), role: "assistant" };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className={`h-screen flex flex-col ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow">
        <h2 className="flex items-center gap-2 font-bold"><Bot className="w-5 h-5" /> AI Chat</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-3`}>
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return <>{isAuthenticated ? <ChatPage /> : <AuthComponent onAuth={setIsAuthenticated} />}</>;
};

export default App;
