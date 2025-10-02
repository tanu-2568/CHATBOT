Overview

This is a React + Vite powered chatbot project with a Node.js/Express backend.
The chatbot provides an interactive interface where users can type queries and receive automated responses in real time.

Full-stack development (React + Express)

API integration

State management

Hosting & deployment

##Features

Interactive Chatbot – real-time user queries and responses
API Integration – backend handles chatbot responses
Authentication Support – (optional if enabled) login & session
Database Ready – structured for MongoDB integration
Frontend + Backend Setup – complete full-stack architecture
Tech Stack

Frontend: React.js, Vite, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (can be configured in .env)

Other Tools: Axios, dotenv, ESLint

Database: MongoDB (can be configured in .env)

Other Tools: Axios, dotenv, ESLint

##Project Structure
CHATBOT/
│
├── src/              # React frontend components
├── backend/          # Express backend (APIs, routes, controllers)
├── public/           # Static files
├── .env              # Environment variables
├── package.json      # Project dependencies
└── README.md         # Documentation
##Getting Started
1. Clone the repo
   git clone https://github.com/tanu-2568/CHATBOT.git
   cd CHATBOT
2. Install dependencies
   npm install
3. Set up environment variables
  Create a .env file:
   PORT=4000
   MONGO_URL=mongodb://db:27017/chatbotdb
   VITE_API_URL=http://localhost:4000
4. Run the app
   For frontend (Vite React):
   npm run dev
   For backend:
   npm run server

  
