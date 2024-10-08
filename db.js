// db.js
const mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
  host: 'localhost',           // e.g., 'localhost'
  user: 'pmi_user',           // your mariadb username
  password: 'pmi_user!1',     // your mariadb password
  database: 'pmi_data',       // the name of your database
  connectionLimit: 5          // Adjust this value based on your needs
});

// Function to get a connection from the pool
async function getConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Connected to the MariaDB database.');
    return conn;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err; // Re-throw the error for handling in your main app
  }
}

// Export the pool and the connection function
module.exports = { pool, getConnection };
