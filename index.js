// index.js
document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("city-select");

  select.addEventListener("change", function () {
    const city = select.value;
    let timezone = "";

    if (city === "London") {
      timezone = "Europe/London";
    } else if (city === "New York") {
      timezone = "America/New_York";
    } else if (city === "Auckland") {
      timezone = "Pacific/Auckland";
    }

    if (timezone) {
      const now = new Date().toLocaleString("en-US", {
        timeZone: timezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      alert(`It is ${now} in ${timezone.replace("_", " ")}`);
    }
  });
});
