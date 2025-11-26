// server.js
import express from "express";
import dotenv from "dotenv";

import authRoute from './src/routes/auth.js';
import slotRoute from './src/routes/slotRoute.js';
import userRoute from './src/routes/userRoute.js';

dotenv.config();
// const authRoutes = require('./src/routes/auth');

const app = express();

app.use(express.json());
// routes
// app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoute);
app.use('/api/user/slot', slotRoute);
app.use('/api/user/', userRoute);

app.get('/', (req, res) => res.send('API is running'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
