const apiKey = "38078a80ebb8a1ec9191ad40e79b5926";

function getWeather() {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");

  if (!city) {
    result.innerHTML = "Digite uma cidade!";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Cidade não encontrada!");
      return response.json();
    })
    .then(data => {
      const clima = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperatura: ${data.main.temp}°C</p>
        <p>☁️ Clima: ${data.weather[0].description}</p>
        <p>💨 Vento: ${data.wind.speed} km/h</p>
      `;
      result.innerHTML = clima;
    })
    .catch(error => {
      result.innerHTML = error.message;
    });
}
