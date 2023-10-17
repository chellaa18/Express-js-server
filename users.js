var express = require('express');
var router = express.Router();
const fs = require('fs');

let rawdata = fs.readFileSync('users.json');
let users = JSON.parse(rawdata);


router.get('/',(req, res, next) => {
  res.send(JSON.stringify(users))
});


router.get('/:id',  (req, res) => {
      // res.send(`ID from Req ${req.params.id}`)
  res.send(users.find((user)=> user.id == req.params.id));

})

router.post('/', function (req, res) {

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



module.exports = router;
