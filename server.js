// const http = require("http");
// const fs = require('fs');

// let rawdata = fs.readFileSync('users.json');
// let users = JSON.parse(rawdata);


// const server = http.createServer((req, res) => {
//   if (req.url === "/users") {
 
//     res.writeHead(200, {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "http://localhost:3000",
//     });
//     res.end(JSON.stringify(users))
//     // res.end(JSON.stringify(users));

//   } else {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     res.end("testing testing ...");
//   }
// });

// server.listen(4000, () => {
//   console.log("Server is running on port 4000");
// });



//Express
const express = require('express')
const app = express();
const port = 8080;
const fs = require('fs');
const cors = require('cors'); 


app.use(cors()); 
app.use(express.json());

let rawdata = fs.readFileSync('users.json');
let users = JSON.parse(rawdata);

app.get('/users',  (req, res)=> {
  res.send(JSON.stringify(users))
})

app.get('/users/:id',  (req, res) => {
  
  // res.send(`ID from Req ${req.params.id}`)
  res.send(users.find((user)=> user.id == req.params.id));
})

app.post('/users', function (req, res) {

  fs.readFile('users.json', (err, data) => {
    if (err) {
 
      console.error(err);
      return res.status(500).send('Error reading users.json');
    }

    let users = [];


    if (data.length > 0) {
      users = JSON.parse(data);
    }


    users.push(req.body);

   
    fs.writeFile('users.json', JSON.stringify(users, null, 3), (err) => {
      if (err) {

        console.error(err);
        return res.status(500).send('Error writing to users.json');
      }

      console.log('Data added to users.json');
      res.send("Data received and added to users.json");
    });
  });
});


app.listen(port, ()=>console.log(`server is running on ${port}`))