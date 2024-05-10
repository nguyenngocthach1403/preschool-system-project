const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post('/', async (req, res) => {
  console.log('hello')
  const { your_name, email, phone, address, city, district, town, levels, syllabus, relationship, informationState, status } = req.body;

  const query = 'INSERT INTO Registers (your_name, email, phone, address, city, district, town, levels, syllabus, relationship, informationState, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
  const values = [your_name, email, phone, address, city, district, town, levels, syllabus, relationship, informationState, status];
  db.connect();
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send({ message: 'Error registering' });
      return;
    }

    console.log('registered successfully');
    res.status(200).send({ message: 'registered successfully' });
  });
});
  
module.exports = router; 
