const express = require('express');

const https = require('https');
const app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

var resultData = []
app.get('/getData', (req, res) => {
res.json({
    resultData
  
    
})

})
https.get('https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1', res => {
  let data = [];
//   var resultData = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const users = JSON.parse(Buffer.concat(data).toString());

    resultData = users;
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});


app.listen(3000, (req, res) => {
    console.log("is running on port 3000");
    
})
