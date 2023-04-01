//Deliver Jokes Microservice

const express = require('express');
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'DESKTOP-D7IPKF6',
    user: 'DESKTOP-D7IPKF6\RAVINDU-PC',
    password: '',
    database: 'Microservices',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const app = express();

app.get('/jokes', (req, res) => {
    pool.query('SELECT * FROM jokes ORDER BY RAND() LIMIT 1', (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No jokes found' });
        }

        const joke = results[0];
        return res.json({ joke });
    });
});

app.listen(3000, () => console.log('Deliver Jokes microservice listening on port 3000!'));
