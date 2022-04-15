/**
 * Application Entry
 */

// Dependencies
const express = require('express');
const path = require('path');
const appRouter = require('./routers');

// Initializing Express Application
const app = express();

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Using App Router
app.use('/api', appRouter);

// Initializing Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});