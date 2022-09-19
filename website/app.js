/* Global Variables */
const generateButton = document.getElementById("generate");
const zipCode = document.getElementById("zip");
const userFeelings = document.getElementById("feelings");
const tempId = document.getElementById('temp');
const dateId = document.getElementById('date');
const contentId = document.getElementById('content');

const apiKey = "ADD YOU API ID HERE";
const api = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//fetch data from api
const getWeatherData = async(zip) => {
    const response = await fetch(`${api}${zip}${apiKey}`);
    const parsedData = await response.json();

    return parsedData;
}

const generateFunction = () => {
    const zipCodeValue = zipCode.value;
    const userFeelingsValue = userFeelings.value;
    getWeatherData(zipCodeValue)
        .then(function postRequestData(parsedData) {
            postDataFunction('/add', { temp: parsedData.main.temp, date: newDate, userResponse: userFeelingsValue });
            UI_update();
        });
}
generateButton.addEventListener('click', generateFunction);


//post request to add the api data
const postDataFunction = async(api_URL = '', data = {}) => {
    const serverResponse = await fetch(api_URL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

const UI_update = async() => {
    let serverResponse = await fetch('/all');
    serverResponse.json().then((serverData) => {
        tempId.textContent = `Temperature: ${serverData[0].temp} Celsius`;
        dateId.textContent = `Date: ${serverData[0].date}`;
        contentId.textContent = `Feeling: ${serverData[0].userResponse}`;
    });
};