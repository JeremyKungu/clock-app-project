const background = document.querySelector(".background");
const author = document.querySelector(".author");
const icon = document.querySelector(".icon");
const details = document.querySelector(".details");
const period = document.querySelector(".period");
const expand = document.querySelector(".expand");

function getQuote() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ac84a71c6bmsh1eb429a79a6d8bbp128c89jsn2a556460ff37',
            'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
    };
    
    fetch('https://quotes15.p.rapidapi.com/quotes/random/', options)
        .then(response => response.json())
        .then((quotes) => {
            const chosenQuote = quotes.data;            

            document.getElementById("quote").textContent = quotes.content;
            author.textContent = quotes.originator.name;           
        })
        .catch(err => console.error(err));    
}

function getTime() {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();

    //Time of day
    let greet = "";
    if (hour >= 5 && hour <=11) {
        greet = "Morning";
    } else if(hour >=12 && hour <= 17){
        greet = "Afternoon";
    } else {
        greet = "Evening";
    }

    document.querySelector(".current-greeting").textContent = `Good ${greet}`;

    //background and icons
    if(hour >= 5 && hour <=17){
        background.classList.add("day");
        icon.src = "./img/icon-sun.svg";
        icon.setAttribute("alt", "sun icon");
    } else {
        background.classList.add("night");
        icon.src = "./img/icon-moon.svg";
        icon.setAttribute("alt", "moon icon");
        details.style.color = "#fff";
        details.style.background = "rgba(0, 0, 0, 0.75)";
    }

    //Time setup
    if(minute < 10) {
        minute = "0" + minute;
    }
    if(hour === 0) {
        hour = 12;
        period.textContent = "am";        
    } else if(hour === 12){
        period.textContent = "pm";
    } else if(hour > 12) {
        hour -= 12;
        period.textContent = "pm";
    } else {
        period.textContent = "am"
    }

    document.querySelector(".time-now").textContent = `${hour}:${minute}`;

    //update time
    let interval = (60 - (new Date()).getSeconds()) * 1000 + 5;
    setTimeout(getTime, interval);
}

function getTimeZone() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ac84a71c6bmsh1eb429a79a6d8bbp128c89jsn2a556460ff37',
            'X-RapidAPI-Host': 'world-time2.p.rapidapi.com'
        }
    };
    
    fetch('https://world-time2.p.rapidapi.com/timezone/Europe/London', options)
        .then(response => response.json())
        .then((regionRes) => {
            const region = regionRes.data;
            console.log(regionRes)

            document.querySelector(".region").textContent = region.abbreviation;
            document.getElementById("timezone").textContent = region.timezone;
            document.getElementById("day").textContent = region.day_of_year;
            document.getElementById("week-day").textContent = region.day_of_week;
            document.getElementById("week-number").textContent = region.week_number;
        })
        .catch(err => console.error(err));
}

function getLocation() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ac84a71c6bmsh1eb429a79a6d8bbp128c89jsn2a556460ff37',
            'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        }
    };
    
    fetch('https://countries-cities.p.rapidapi.com/location/country/list', options)
        .then(response => response.json())
        .then((location) => {
            const ipLocation = location.data;
            const regionName = ipLocation.region_name;
            const countryCode = ipLocation.country_code;
            document.querySelector(".current-location").textContent = `in ${regionName}, ${countryCode}`;
        })
        .catch(err => console.error(err));
}

getQuote();
getTime();
getTimeZone();
getLocation();

//Event listeners
function showTimeZone() {
    document.querySelector(".widgets").classList.toggle("transform");
    details.classList.toggle("transform");

    if(expand.firstChild.nodeValue === "More") {
        expand.firstChild.nodeValue = "Less"
    } else {
        expand.firstChild.nodeValue = "More"
    }

    const arrow = document.querySelector(".arrow");
    arrow.classList.toggle("rotate");
}

expand.addEventListener("click", showTimeZone);

document.getElementById("refresh").addEventListener("click", getQuote);