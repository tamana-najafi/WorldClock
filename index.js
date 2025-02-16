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
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  )
    .then((response) => response.json())
    .then((data) => {
      const cityName = data.city || "Current Location";
      const now = new Date();
      document
        .getElementById("city1")
        .querySelector("h2").innerText = `${cityName} 🌍`;
      document.getElementById("time1").innerText = now.toLocaleTimeString();
      document.getElementById("date1").innerText = now.toLocaleDateString();
    });
}

function showCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayCurrentLocationTime);
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
