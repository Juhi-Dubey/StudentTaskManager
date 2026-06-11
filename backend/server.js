const express = require('express');
const mongoose= require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db.js');
const taskRoutes = require('./routes/task.routes.js');
const authRoutes = require('./routes/auth.routes.js');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});