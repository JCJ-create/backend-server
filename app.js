const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the public directory less secure way
//app.use(express.static('public'));

// Define your routes here
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Change to your HTML file
  res.sendFile(path.join(__dirname, 'public', 'form.html')); // Change to your HTML file

});


// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Routes will go here
app.post('/submit', (req, res) => {
    const { name, email } = req.body; // Access the form data
    console.log(`Name: ${name}, Email: ${email}`);
    // You can process the data or save it here

  res.sendFile(path.join(__dirname, 'public', 'thank-you.html')); // Change to your HTML file
});


//app.listen(PORT, () => {
//    console.log(`Server is running on http://localhost:${PORT}`);
//});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


