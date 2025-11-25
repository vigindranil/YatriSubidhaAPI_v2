// server.js
import express from "express";
import dotenv from "dotenv";

import authRoutes from './src/routes/auth.js';

dotenv.config();
// const authRoutes = require('./src/routes/auth');

const app = express();

app.use(express.json());
// routes
// app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API is running'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
