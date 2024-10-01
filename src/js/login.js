// const loginForm = document.getElementById('loginForm');
// const mysql = require('mysql');
// console.log("hi ");
// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: 'localhost',     // Your MySQL host
//   user: 'Aditi@2203', // Your MySQL username
//   password: 'VOTING', // Your MySQL password
//   database: 'voting_system' // Your MySQL database name
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting: ' + err.stack);
//     return;
//   }
//   console.log('Connected as id ' + connection.threadId);
// });
// loginForm.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const voter_id = document.getElementById('voter-id').value;
//   const password = document.getElementById('password').value;
//   const token = voter_id;

//   const headers = {
//     'method': "GET",
//     'Authorization': `Bearer ${token}`,
//   };

//   fetch(`http://127.0.0.1:8000/login?voter_id=${voter_id}&password=${password}`, { headers })
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Login failed');
//     }
//   })
//   .then(data => {
//     if (data.role === 'admin') {
//       console.log(data.role)
//       localStorage.setItem('jwtTokenAdmin', data.token);
//       window.location.replace(`http://127.0.0.1:8080/admin.html?Authorization=Bearer ${localStorage.getItem('jwtTokenAdmin')}`);
//     } else if (data.role === 'user'){
//       localStorage.setItem('jwtTokenVoter', data.token);
//       window.location.replace(`http://127.0.0.1:8080/index.html?Authorization=Bearer ${localStorage.getItem('jwtTokenVoter')}`);
//     }
//   })
//   .catch(error => {
//     console.error('Login failed:', error.message);
//   });
// });

// Import the necessary libraries
const loginForm = document.getElementById('loginForm');
const { Voter } = require('../models/Voter'); // Adjust path as necessary
const sequelize = require('../database'); // Import the Sequelize instance

// Remove MySQL connection code since you’re using Sequelize

// Login form submission event listener
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const voter_id = document.getElementById('voter-id').value;
  const password = document.getElementById('password').value;

  try {
    // Fetch voter details from the database using Sequelize
    const voter = await Voter.findOne({ where: { voter_id, password } });

    if (!voter) {
      throw new Error('Invalid Voter ID or password');
    }

    // Generate a token (you can adjust this as needed)
    const token = voter_id; // This is a placeholder. Replace with a proper JWT generation if needed.

    // Redirect based on role
    if (voter.role === 'admin') {
      localStorage.setItem('jwtTokenAdmin', token);
      window.location.replace(`http://127.0.0.1:8080/admin.html?Authorization=Bearer ${localStorage.getItem('jwtTokenAdmin')}`);
    } else if (voter.role === 'user') {
      localStorage.setItem('jwtTokenVoter', token);
      window.location.replace(`http://127.0.0.1:8080/index.html?Authorization=Bearer ${localStorage.getItem('jwtTokenVoter')}`);
    }
  } catch (error) {
    console.error('Login failed:', error.message);
  }
});
