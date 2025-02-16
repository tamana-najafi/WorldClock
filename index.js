function updateTime() {
  const cities = [
    { id: "time1", zone: "America/Los_Angeles", dateId: "date1" },
    { id: "time2", zone: "Europe/London", dateId: "date2" },
    { id: "time3", zone: "Asia/Tokyo", dateId: "date3" },
  ];

  cities.forEach((city) => {
    const now = new Date().toLocaleString("en-US", {
      timeZone: city.zone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    const date = new Date().toLocaleDateString("en-US", {
      timeZone: city.zone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    document.getElementById(city.id).innerText = now;
    document.getElementById(city.dateId).innerText = date;
  });
}

function displayCurrentLocationTime(position) {
  const { latitude, longitude } = position.coords;
  const apiKey = "YOUR_API_KEY"; // Get a free key from https://timezonedb.com/

  fetch(
    `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        const now = new Date().toLocaleString("en-US", {
          timeZone: data.zoneName,
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });

        const date = new Date().toLocaleDateString("en-US", {
          timeZone: data.zoneName,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        document.querySelector("#city1 h2").innerText = `${data.zoneName} 🌍`;
        document.getElementById("time1").innerText = now;
        document.getElementById("date1").innerText = date;
      } else {
        alert("Unable to retrieve time zone information.");
      }
    })
    .catch(() => {
      alert("Failed to fetch time zone data.");
    });
}

function showCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayCurrentLocationTime, () => {
      alert("Unable to retrieve your location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

document.getElementById("citySelect").addEventListener("change", function () {
  const selectedCity = this.value;
  if (selectedCity === "current") {
    showCurrentLocation();
  } else {
    updateTime();
  }
});

setInterval(updateTime, 1000);
updateTime();
