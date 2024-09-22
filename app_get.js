const  express =  require('express');
const app = express();

//const hostname = '0.0.0.0';
const port = 3000;

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, PMI Node.js app is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get('/about', (req, res) => {
  res.send('This is the PMI About page.');
});

