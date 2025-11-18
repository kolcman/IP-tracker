import {validateIp} from "./helpers";

const API_KEY = "2e8966b0c70e48b7b49f7ccfa64e473d";
const BASE_URL = `https://ip-intelligence.abstractapi.com/v1/?api_key=${API_KEY}&ip_address=`;

const inputEl = document.querySelector(".search-bar__input");
const btnEl = document.querySelector(".search-bar__btn");

const ipEl = document.getElementById("ip")
const locationEl = document.getElementById("location")
const timezoneEl = document.getElementById("timezone")
const currencyEl = document.getElementById("currency")

let myMap

ymaps.ready(init);
function init(){
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });
}


inputEl.addEventListener("keydown", handleEnter)
btnEl.addEventListener("click", getData);

function handleEnter(e) {
    if (e.key === "Enter") {
        getData()
    }
}

async function getData() {
    validateIp(inputEl.value)
    try {
        const response = await fetch(`${BASE_URL}${inputEl.value}`)
        const data = await response.json();
        console.log(data);
        setData(data)

    } catch (error) {
        console.log(error);
    }
}

function setData(data) {
    const {ip_address, location, timezone, currency} = data
    ipEl.innerText = ip_address;
    locationEl.innerText = `${location.continent} - ${location.country}`;
    timezoneEl.innerText = timezone.local_time;
    currencyEl.innerText = currency.code
    const coords = [location.latitude, location.longitude];
    myMap.geoObjects.removeAll();
    const placemark = new ymaps.Placemark(coords, {
        hintContent: 'Метка',
        balloonContent: `IP: ${ip_address}`
    });
    myMap.geoObjects.add(placemark);
    myMap.setCenter(coords, 15);

}