// Setup empty JS array to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3030;
app.listen(port, () => {
    console.log("server is running ");
    console.log(`listening at port ${port}`);
})

//get all data from server
let sendProjectData = (req, res) => {
    res.send(projectData);
}
app.get('/all', sendProjectData)

//post route (app sends data to server)
let addProjectData = (req, res) => {
    userEntry = {
        temp: req.body.temp,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    projectData.push(userEntry);
    console.log(userEntry);
}
app.post('/add', addProjectData)