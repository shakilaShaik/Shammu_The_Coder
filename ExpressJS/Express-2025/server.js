import express from 'express'
const app = express();

app.post('/user', (req, res) => {
    let data = '';

    // Collect data chunks
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        console.log('Raw request body:', data);
        // data is still a string! Not a JS object
        res.send('Received raw data');
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
