// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from './src/routes/auth.js';
import slotRoute from './src/routes/slotRoute.js';
import userRoute from './src/routes/userRoute.js';
import adminRoute from './src/routes/admin.js';
import adminAuthRoute from './src/routes/adminAuth.js';
import verifyToken from "./src/middlewares/authMiddleware.js";

dotenv.config();
// const authRoutes = require('./src/routes/auth');

const app = express();

app.use(express.json());
app.use(cors());
// routes
// app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoute);
app.use('/api/admin/auth', adminAuthRoute);
app.use('/api/user/slot', verifyToken, slotRoute);
app.use('/api/user/', verifyToken, userRoute);
app.use('/api/admin', verifyToken, adminRoute);

app.get('/', (req, res) => res.send('API is running'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
