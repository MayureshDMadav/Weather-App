const btn = document.querySelector("#fetch-button");
const error = document.querySelector("#error");
const cardTitle = document.querySelector(".card-title");
const listGroup = document.querySelectorAll(".list-group li");
const cardImg = document.querySelector(".card-img");
const listDiv = document.querySelector(".list-group");

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  const input = document.querySelector("#input-box").value;
  if (!input) {
    error.style.display = "block";
    error.innerHTML = "Please Enter City Name";
    resetHTMLerror("error");
    return;
  }

  const url = `https://open-weather13.p.rapidapi.com/city?city=${input}&lang=EN`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9192bec45bmsh602ac3bc1adcc05p12a311jsnc89398bab041",
      "x-rapidapi-host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.cod === "404") {
      error.style.display = "block";
      error.innerHTML = result.message;
      resetHTMLerror("error");
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
    }
  } catch (error) {
    console.log(error);
  }
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
