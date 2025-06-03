const btn = document.querySelector("#fetch-button");
const error = document.querySelector("#error");
const cardTitle = document.querySelector(".card-title");
const listGroup = document.querySelectorAll(".list-group li");
const cardImg = document.querySelector(".card-img");
const listDiv = document.querySelector(".list-group");
const resetBtn = document.querySelector("#reset-button");
const refeshBtn = document.querySelector("#refesh-button");
let input = null;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "9192bec45bmsh602ac3bc1adcc05p12a311jsnc89398bab041",
    "x-rapidapi-host": "open-weather13.p.rapidapi.com",
  },
};

resetBtn.addEventListener("click", (event) => {
  event.preventDefault();
  cardTitle.innerHTML = "No Data Yet Fetched";
  listDiv.style.display = "none";
  resetBtn.style.display = "none";
  btn.style.display = "block";
  refeshBtn.style.display = "none";
  cardImg.src =
    "https://www.mistay.in/travel-blog/content/images/2020/06/cover-9.jpg";
});

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  input = document.querySelector("#input-box").value;
  if (!input) {
    error.style.display = "block";
    error.innerHTML = "Please Enter City Name";
    resetHTMLerror("error");
    return;
  }

  const url = `https://open-weather13.p.rapidapi.com/city?city=${input}&lang=EN`;

  const res = await fecthCurrentWeatherData(url, options);
  if (res) {
    refeshBtn.style.display = "block";
  }
});

refeshBtn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(input);
  const url = `https://open-weather13.p.rapidapi.com/city?city=${input}&lang=EN`;
  fecthCurrentWeatherData(url, options);
});

function seasonDetect(currentid) {
  if (currentid >= 200 && currentid <= 622) {
    cardImg.src =
      "https://amber-holdings.com/wp-content/uploads/2020/03/What-to-Expect-From-The-Indonesian-Rainy-Season2.jpg";
  } else if (currentid >= 701 && currentid <= 781) {
    cardImg.src =
      "https://www.experiencetravelgroup.com/blog/wp-content/uploads/2019/09/Periyar-_7245-Small.jpg";
  } else if (currentid == 800) {
    cardImg.src =
      "https://miro.medium.com/v2/resize:fit:1400/0*1DtL639ZXJQj8ZDA.jpg";
  } else if (currentid >= 801) {
    cardImg.src =
      "https://www.mistay.in/travel-blog/content/images/2020/06/cover-9.jpg";
  }
}

function resetHTMLerror(tag) {
  setTimeout(function () {
    if (tag == "error") {
      error.innerHTML = "";
      error.style.display = "none";
    }
  }, 2500);
}

async function fecthCurrentWeatherData(url, options) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let validResponse = false;
    if (result.cod === "404") {
      error.style.display = "block";
      error.innerHTML = result.message;
      resetHTMLerror("error");
      validResponse = false;
    } else {
      const currentWeather = result.weather[0]?.id;
      seasonDetect(currentWeather);
      const cityResultArray = [
        `Temprature&nbsp;<b>${result.main.temp} &deg;C</b>`,
        `Wind Speed&nbsp<b>${result.wind.speed} miles<sup>hr<sup></b>`,
        `Current Weather&nbsp<b>${result.weather[0].main}</b>`,
        `Location&nbsp<b>${result.sys.country}</b>`,
      ];
      cardTitle.innerHTML = `City:&nbsp;<b>${result.name}</b>`;
      for (let i = 0; i < listGroup.length; i++) {
        listGroup[i].innerHTML = cityResultArray[i];
      }
      listDiv.style.display = "block";
      btn.style.display = "none";
      resetBtn.style.display = "block";
      validResponse = true;
    }
    return validResponse;
  } catch (error) {
    console.log(error);
  }
}
