const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Change if using a different user
    password: '',   // Add your MySQL password if set
    database: 'url_shortener'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Generate short URL function
function generateShortUrl() {
    return Math.random().toString(36).substr(2, 8);
}

// API to shorten URL
app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    const shortUrl = generateShortUrl();

    const query = 'INSERT INTO urls (long_url, short_url) VALUES (?, ?)';
    db.query(query, [longUrl, shortUrl], (err, result) => {
        if (err) throw err;
        res.json({ shortUrl: `http://localhost:3000/${shortUrl}` });
    });
});

// API to redirect short URL to long URL
app.get('/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl;
    
    const query = 'SELECT long_url FROM urls WHERE short_url = ?';
    db.query(query, [shortUrl], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.redirect(result[0].long_url);
        } else {
            res.status(404).send('URL Not Found');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
