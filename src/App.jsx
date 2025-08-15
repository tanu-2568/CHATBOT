import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, User, Bot, Sparkles, Zap, Shield, Moon, Sun } from 'lucide-react';

// Improved AI responses with context awareness
const generateBotResponse = (userMessage, messageHistory) => {
  const message = userMessage.toLowerCase();
  const context = messageHistory.slice(-3);
  
  const responses = {
    greeting: [
      "Hello! I'm excited to chat with you today. What's on your mind?",
      "Hey there! I'm here and ready to help. What would you like to explore?",
      "Hi! Great to meet you. I'm your AI assistant - how can I make your day better?"
    ],
    question: [
      "That's a fascinating question! Let me think about this carefully...",
      "Great question! Here's what I know about that topic...",
      "I love curious minds! Let me share some insights on that..."
    ],
    help: [
      "I'm here to help! I can assist with questions, brainstorming, explanations, creative tasks, and much more.",
      "I'd be happy to help! I can discuss topics, solve problems, provide information, or just have a friendly conversation.",
      "Absolutely! I can help with research, creative writing, problem-solving, learning new topics, or whatever you need."
    ],
    compliment: [
      "Thank you so much! That really brightens my day. You seem pretty awesome yourself!",
      "That's incredibly kind of you to say! I appreciate the positivity.",
      "You're too kind! It's wonderful chatting with someone as thoughtful as you."
    ],
    creative: [
      "I love creative challenges! Let's brainstorm something amazing together.",
      "Creativity is one of my favorite things! What kind of creative project are you thinking about?",
      "Now we're talking! Creative work is where the magic happens. Tell me more!"
    ],
    default: [
      "That's really interesting! I'd love to hear more about your thoughts on this.",
      "Thanks for sharing that with me. What aspect would you like to explore further?",
      "I find that perspective intriguing. Can you tell me what led you to that conclusion?",
      "That's a great point! It reminds me of some fascinating concepts I've learned about."
    ]
  };

  if (message.match(/hello|hi|hey|good morning|good afternoon|good evening/)) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  } else if (message.includes('?') || message.match(/what|how|why|when|where|which|who/)) {
    return responses.question[Math.floor(Math.random() * responses.question.length)];
  } else if (message.match(/help|assist|support|need/)) {
    return responses.help[Math.floor(Math.random() * responses.help.length)];
  } else if (message.match(/thank|thanks|good|great|amazing|awesome|nice|love/)) {
    return responses.compliment[Math.floor(Math.random() * responses.compliment.length)];
  } else if (message.match(/create|write|story|poem|idea|design|art/)) {
    return responses.creative[Math.floor(Math.random() * responses.creative.length)];
  } else {
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  }
};

// Modern Authentication Component
const AuthComponent = ({ onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuth(true);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 relative z-10 transform hover:scale-105 transition-transform duration-300">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AI Chat</span>
          </h1>
          <p className="text-white/70">Your intelligent conversation partner</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>
            
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <Sparkles className="w-5 h-5" />
              </span>
            )}
          </button>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/70 hover:text-white transition-colors underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Chat Component
const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm your AI assistant. I'm here to help you with anything you need - from answering questions to creative brainstorming. What would you like to explore today?",
      role: 'assistant',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = { 
      id: Date.now(), 
      content: inputMessage.trim(), 
      role: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(currentMessage, messages);
      
      const botMessage = { 
        id: Date.now() + 1, 
        content: botResponse,
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 1500 + 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const theme = darkMode ? {
    bg: 'bg-gray-900',
    cardBg: 'bg-gray-800',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    border: 'border-gray-700',
    inputBg: 'bg-gray-700',
    userBubble: 'bg-gradient-to-r from-purple-600 to-blue-600',
    botBubble: 'bg-gray-700'
  } : {
    bg: 'bg-gray-50',
    cardBg: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-gray-200',
    inputBg: 'bg-white',
    userBubble: 'bg-gradient-to-r from-purple-600 to-blue-600',
    botBubble: 'bg-white'
  };

  return (
    <div className={`h-screen flex flex-col ${theme.bg} transition-colors duration-300`}>
      {/* Modern Header */}
      <div className={`${theme.cardBg} ${theme.border} border-b px-6 py-4 shadow-sm`}>
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${theme.text}`}>AI Assistant</h1>
              <p className={`text-sm ${theme.textSecondary}`}>Smart • Responsive • Creative</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl ${theme.inputBg} hover:bg-opacity-80 transition-colors duration-300`}
            >
              {darkMode ? <Sun className={`w-5 h-5 ${theme.text}`} /> : <Moon className={`w-5 h-5 ${theme.text}`} />}
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{ 
                opacity: 0,
                animation: `fadeIn 0.3s ease-out ${index * 100}ms forwards`
              }}
            >
              <div className={`flex items-start space-x-3 max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-green-400 to-blue-500'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>
                
                {/* Message Bubble */}
                <div className="flex flex-col">
                  <div className={`px-6 py-4 rounded-3xl shadow-sm ${msg.role === 'user' ? theme.userBubble + ' text-white' : theme.botBubble + ' ' + theme.text} ${!darkMode && msg.role === 'assistant' ? 'shadow-md border border-gray-200' : ''} transform hover:scale-105 transition-transform duration-300`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                  <span className={`text-xs ${theme.textSecondary} mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start" style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <div className="flex items-start space-x-3 max-w-xs">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className={`px-6 py-4 rounded-3xl ${theme.botBubble} shadow-sm ${!darkMode ? 'shadow-md border border-gray-200' : ''}`}>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 ${darkMode ? 'bg-gray-400' : 'bg-gray-600'} rounded-full animate-bounce`}></div>
                    <div className={`w-2 h-2 ${darkMode ? 'bg-gray-400' : 'bg-gray-600'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                    <div className={`w-2 h-2 ${darkMode ? 'bg-gray-400' : 'bg-gray-600'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Modern Input Area */}
      <div className={`${theme.cardBg} ${theme.border} border-t px-4 py-6 shadow-lg`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... I'm here to help!"
                disabled={isTyping}
                className={`w-full px-6 py-4 ${theme.inputBg} ${theme.text} rounded-2xl border ${theme.border} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 shadow-sm resize-none`}
                style={{ minHeight: '56px' }}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {inputMessage.trim() && !isTyping && (
                  <Zap className="w-5 h-5 text-purple-500 animate-pulse" />
                )}
              </div>
            </div>
            
            <button 
              onClick={handleSendMessage}
              disabled={isTyping || !inputMessage.trim()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-2xl hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 disabled:hover:scale-100 shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Main App
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen">
      {isAuthenticated ? (
        <ChatPage />
      ) : (
        <AuthComponent onAuth={setIsAuthenticated} />
      )}
    </div>
  );
};

export default App;