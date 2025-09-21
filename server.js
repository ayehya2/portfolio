const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Tell Express where to find the views (EJS files) - Updated path
app.set('views', path.join(__dirname, 'public/views'));

// Serve static files (CSS, JS, images) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve scripts from the root 'scripts' directory
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

// Route for the Home page
app.get('/', (req, res) => {
    res.render('index');
});

// Route for the Contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route for the Server page
app.get('/server-page', (req, res) => {
    res.render('server-page');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});