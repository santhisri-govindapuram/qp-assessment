require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);


// Catch-all route for unknown endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: "Could not find this route." });
});


// MongoDB Connection
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0sjhe.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Connect to MongoDB and start the server

const port = process.env.API_PORT
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

// Global Error Handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message || "An unknown error occurred."
    });
});
