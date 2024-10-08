const express = require('express');
const { getConnection } = require('./db'); // Import the getConnection function
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Define your routes here
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve your main HTML file
});

// Handle the POST request from form.html
app.post('/submit', async (req, res) => {
    try {
        const { country, fruit, hobbies, date } = req.body;

        // Log the entire request body
        console.log(req.body);

        // Check for required fields
        if (!country || !fruit) {
            return res.status(400).send('Country and Favorite Fruit are required fields.');
        }
        
        // Handle optional fields and format them
        const formattedHobbies = Array.isArray(hobbies) ? hobbies.join(', ') : hobbies || 'None';
        const nameDay = date || null;

        // Define the SQL query to insert the data
        const query = `
            INSERT INTO Form_Submissions (country_code, country_name, favorite_fruit, hobbies, name_day)
            VALUES (?, ?, ?, ?, ?)
        `;

        // Get a connection and execute the query
        const conn = await getConnection();
        await conn.query(query, [country, country, fruit, formattedHobbies, nameDay]);

        // Release the connection back to the pool
        conn.release();

        // If successful, redirect to a thank-you page
        res.redirect('/thank-you');
        
    } catch (error) {
        console.error('Error processing the form:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for thank-you page
app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'thank-you.html'));
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
