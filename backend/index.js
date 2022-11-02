const express = require('express');
const cors = require('cors');

const app = express();


const port = 3000;

const corsOpts = {
    origin: '*',

    headers: '*',
    
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
    ],
  
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  };
  
app.use(cors(corsOpts));

app.use(express.json());

app.use(require('./routes'));

app.listen( port, () => {
    console.log(`El servidor está corriendo perfectamente`);
})



