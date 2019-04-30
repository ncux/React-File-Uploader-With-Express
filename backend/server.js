const express = require('express');
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 5000;

const app = express();

app.use(fileUpload());

// file upload endpoint
app.post('/upload', async (req, res) => {
    if(!req.files) {
        return res.status(400).json({ message: 'No file selected' });
    }

    const file = req.files.file;   // matches what's passed into formData('file', file) in the client

    file.mv(`${__dirname}/public/uploads/${file.name}`, error => {
        if(error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error!' });
        }

        res.status(200).send('File successfully uploaded');
    });
});


app.listen(port, () => console.log(`Server running on port ${port}`));

