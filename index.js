async function updateTime() {
  const citySelect = document.getElementById("citySelect");
  const selectedValue = citySelect.value;
  const cityName = document.getElementById("cityName");
  const date = document.getElementById("date");
  const time = document.getElementById("time");

  if (selectedValue === "current") {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Use TimezoneDB API to get the timezone
        const apiKey = "YOUR_API_KEY"; // Replace with your TimezoneDB API key
        const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        cityName.textContent = "Your Location";
        date.textContent = new Date(data.formatted).toLocaleDateString();
        time.textContent = new Date(data.formatted).toLocaleTimeString();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  } else if (selectedValue) {
    // Display time for selected city
    const cityTime = new Date().toLocaleString("en-US", {
      timeZone: selectedValue,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    cityName.textContent = citySelect.options[citySelect.selectedIndex].text;
    date.textContent = cityTime.split(",")[0];
    time.textContent = cityTime.split(",")[1];
  } else {
    cityName.textContent = "--";
    date.textContent = "--";
    time.textContent = "--";
  }
}
