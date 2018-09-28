'use strict';

const express = require('express');
const cors = require('cors');
const multer  = require('multer');

// Define storage and upload.
const storage = multer.memoryStorage({
  limits: {
    files: 1,
    fileSize: 10485760
  }
});
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

// Apis and Microservices Projects - File Metadata Microservice
// Handle File Upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    res.json({"error": "An error occured while uploading..."})
  }
  else {
    console.log(req);
    res.json({"filename": req.file.originalname, "size": req.file.size});
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
