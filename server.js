const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// array for added items
let items=[];

app.listen(8650, () => console.log(`I'm listening on port 8650`));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Get static
app.use(express.static(__dirname + '/src'));
// Get static .html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// app.get('/getData', (req, res) => {
//     // console.log(req);
//     let randomNum = generateRandom(30, 50);
//     let subNum = 100 - randomNum;
//     let num = {randomNum, subNum};
//     res.sendFile(path.join(__dirname, 'src/js', 'test.txt'));
// });

app.get('/dataShow', function (req, res) {
    res.sendFile(path.join(__dirname, '.', 'dummy.txt'));
});

app.get('/dataGet', function(req, res){
    res.sendFile(path.join(__dirname, '.', 'dummy.txt'));
});


var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
}