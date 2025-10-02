require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const chatRoutes = require('./routes/chat');

const app = express();
app.use(helmet());
app.use(cors({ origin: true })); // allow any origin for demo; tighten for prod
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/chats', chatRoutes);

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/chatbotdb';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log(`Backend running on ${PORT}`));
  })
  .catch(err => { console.error('Mongo connect err', err); process.exit(1); });
