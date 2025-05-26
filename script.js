/*################### hamburger Button ##################*/

const hambButton = document.getElementById("hamburger-button");
const hambList = document.getElementById("hambList");

hambButton.addEventListener("click", () => {
    if (hambList.style.display === "none" || hambList.style.display === "") {
        hambList.style.display = "flex";
    } else {
        hambList.style.display = "none";
    }
})

/*################### backHome ##################*/

function backHome() {
    document.getElementById("main-page").style.display = "flex";
    document.getElementById("weather-page").style.display = "none";
    document.getElementById("loader").style.display = "none";
    document.getElementById("contact-page").style.display = "none";
    document.getElementById("status-cf").style.display = "none";
    document.getElementById("docs-page").style.display = "none";
    document.getElementById("donate-page").style.display = "none";
    document.getElementById("hambList").style.display = "none";
}

/*################ getWeather ###############*/
/* on enter */
const input = document.getElementById("search-input")
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});

function getWeather() {
    const cityName = (document.getElementById("search-input").value).trim();
    if (cityName != "") {
        document.getElementById("main-page").style.display = "none";
        document.getElementById("loader").style.display = "flex";
    } else {
        return alert("Input field can't be empty!");
    }
    openWeatherAPI(cityName);
}

/*################ fetchingData ##################*/

async function openWeatherAPI(city) {
    try {
        const apiKey = "a129eb76b87c5c79db0987d8dced150c";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`City "${city}" not found!`);
        const current = await response.json();
        document.getElementById("loader").style.display = "none";
        document.getElementById("search-input").value = "";
        document.getElementById("weather-page").style.display = "flex";
        showWeather(current);
    } catch (error) {
        alert (error.message);
        document.getElementById("search-input").value = "";
        return backHome();
    }
}

/*################# showWeather ################*/

function showWeather(current) {
    const locationHTML = `
    <p class="location-p">${current.name + ", " + current.sys.country}</p>`;
    
    const weatherId = current.weather[0].icon;
    const iconCondition = `
    <img src="assets/w-icons/${weatherId}.png">
    <p class="weatherCondi">${current.weather[0].main}</p>
    <p class="weatherDescrip">${current.weather[0].description}</p>`;

    const tempFeel = `
    <p class="temp">${(current.main.temp).toFixed(1)}°C</p>`;

    const otherW_details = `
    <p>Feels: ${current.main.feels_like}°C</p>
    <p>Humidity: ${current.main.humidity}%</p>
    <p>Clouds: ${current.clouds.all}%</p>
    <p>Wind: ${current.wind.speed}m/s ${current.wind.deg}°</p>
    <p>Visibility: ${(current.visibility/1000).toFixed(1)}km</p>`;
    
    
    document.getElementById("location").innerHTML = locationHTML;
    document.getElementById("icon-condition").innerHTML = iconCondition;
    document.getElementById("temp-feel").innerHTML = tempFeel;
    document.getElementById("other-w-details").innerHTML = otherW_details;
}

/*################ Contact ####################*/

function openContactPage() {
    document.getElementById("main-page").style.display = "none";
    document.getElementById("contact-page").style.display = "flex";
}

emailjs.init("pHgLxB_rDGE8w4un7");
function sentMail(e) {
    document.getElementById("loader").style.display = "flex";
    document.getElementById("contact-page").style.display = "none";
    document.getElementById("status-cf").style.display = "none";

    e.preventDefault();

    emailjs.sendForm("service_pjrk0bo", "template_hd94sb6",
    document.getElementById("contact-form")).then(
        (response) => {
            document.getElementById("status-cf").style.display = "block";
            document.getElementById("status-cf").innerHTML = "<img src='assets/sent-p.png'> Message sent successfully!";
            document.getElementById("loader").style.display = "none";
            document.getElementById("contact-page").style.display = "flex";
        },
        (error) => {
            document.getElementById("status-cf").style.display = "block";
            document.getElementById("status-cf").innerHTML = "<img src='assets/sent-n.png'> Something went wrong!";
            document.getElementById("loader").style.display = "none";
            document.getElementById("contact-page").style.display = "flex";
        });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

/*################## Docs ####################*/

function openDocs() {
    document.getElementById("main-page").style.display = "none";
    document.getElementById("docs-page").style.display = "flex";
}

/*################## Donate ####################*/

function openDonatePage() {
    document.getElementById("main-page").style.display = "none";
    document.getElementById("donate-page").style.display = "flex";
}

function justifyCenterDiv() {
    const donateDiv = document.getElementById("donate-content-div-2");
    if (donateDiv.scrollHeight > donateDiv.clientHeight) {
        donateDiv.classList.remove("centered");
    } else {
        donateDiv.classList.add("centered");
    }
}
window.addEventListener("load", justifyCenterDiv);
window.addEventListener("click", justifyCenterDiv);
window.addEventListener("resize", justifyCenterDiv);

/*#####*/

const fiatButton = document.getElementById("fiat-d-button");
const cryptoButton = document.getElementById("crypto-d-button");
const fiatContent = document.getElementById("fiat-content");
const cryptoContent = document.getElementById("crypto-content");
const fiatButtonDownImg = document.querySelector(".fiat-d-button img");
const cryptoButtonDownImg = document.querySelector(".crypto-d-button img");

fiatButton.addEventListener("click", () => {
    if (window.getComputedStyle(fiatContent).display === "none") {
        fiatButton.style.borderBottomLeftRadius = 0;
        fiatButton.style.borderBottomRightRadius = 0;
        fiatContent.style.display = "flex";
        fiatButton.style.borderBottom = 0;
        fiatButtonDownImg.style.rotate = "180deg";
        if (window.getComputedStyle(cryptoContent).display === "flex") {
            cryptoButton.style.borderBottomLeftRadius = "";
            cryptoButton.style.borderBottomRightRadius = "";
            cryptoContent.style.display = "";
            cryptoButton.style.borderBottom = "";
            cryptoButtonDownImg.style.rotate = "";
        }
    } else {
        fiatButton.style.borderBottomLeftRadius = "";
        fiatButton.style.borderBottomRightRadius = "";
        fiatContent.style.display = "";
        fiatButton.style.borderBottom = "";
        fiatButtonDownImg.style.rotate = "";
    }
})

cryptoButton.addEventListener("click", () => {
    if (window.getComputedStyle(cryptoContent).display === "none") {
        cryptoButton.style.borderBottomLeftRadius = 0;
        cryptoButton.style.borderBottomRightRadius = 0;
        cryptoContent.style.display = "flex";
        cryptoButton.style.borderBottom = 0;
        cryptoButtonDownImg.style.rotate = "180deg";
        if (window.getComputedStyle(fiatContent).display === "flex") {
            fiatButton.style.borderBottomLeftRadius = "";
            fiatButton.style.borderBottomRightRadius = "";
            fiatContent.style.display = "";
            fiatButton.style.borderBottom = "";
            fiatButtonDownImg.style.rotate = "";
        }
    } else {
        cryptoButton.style.borderBottomLeftRadius = "";
        cryptoButton.style.borderBottomRightRadius = "";
        cryptoContent.style.display = "";
        cryptoButton.style.borderBottom = "";
        cryptoButtonDownImg.style.rotate = "";
    }
})

/*#####*/

function showQrCrypto(button) {
    const qrCrypto = document.querySelector(".qr-crypto");
    const opacity = window.getComputedStyle(qrCrypto).opacity;
    if (opacity === "0") {
        const qrName = button.closest(".crypto-name").firstChild.textContent.trim();
        const srcQr = `assets/crypto-qr/${qrName.toLowerCase().replace(/\s+/g, "-").replace(/[():]/g, "")}.png`;
        const qrDiv = document.querySelector(".qr-crypto img");
        qrDiv.src = srcQr;
        document.querySelector(".qr-crypto").style.opacity = 1;
        document.querySelector(".donate-content-div").style.opacity = 0.5;
        document.querySelector(".donate-content-div").style.pointerEvents = "none";
        document.querySelector(".qr-crypto").style.pointerEvents = "auto";
    } else {
        document.querySelector(".qr-crypto").style.opacity = "";
        document.querySelector(".donate-content-div").style.opacity = "";
        document.querySelector(".donate-content-div").style.pointerEvents = "";
        document.querySelector(".qr-crypto").style.pointerEvents = "";
    }
}