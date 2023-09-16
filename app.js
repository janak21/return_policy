const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // maximum 100 requests per hour
  message: "Too many requests, please try again later.",
});

require('dotenv').config();
// Connect to MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});


// API endpoint to check return eligibility for the last purchased product
app.get('/checkLastProductReturnEligibility/:CustomerID', limiter, (req, res) => {
  const { CustomerID } = req.params; // CustomerID is the email address
  const sql = `
    SELECT o.ProductID, o.PurchaseDate, p.ProductName 
    FROM Orders o
    JOIN Products p ON o.ProductID = p.ProductID
    WHERE o.CustomerID = ?
    ORDER BY o.PurchaseDate DESC LIMIT 1`;
  
  db.query(sql, [CustomerID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      const currentDate = new Date();
      const purchaseDate = new Date(results[0].PurchaseDate);
      const returnDeadline = new Date(purchaseDate);
      returnDeadline.setDate(purchaseDate.getDate() + 90); // 90-day return policy
      const formattedReturnDeadline = returnDeadline.toISOString().split('T')[0];
      const isEligible = currentDate <= returnDeadline;
      res.json({ 
        isEligible,
        ProductID: results[0].ProductID,
        ProductName: results[0].ProductName,
        PurchaseDate: results[0].PurchaseDate,
        ReturnDeadline: isEligible ? formattedReturnDeadline : 'Not eligible for return'
      });
    } else {
      res.status(404).json({ message: 'No orders found for this customer' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

