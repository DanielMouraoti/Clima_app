// Aqui eu coloco minha chave da API pra pegar o clima
const apiKey = "38078a80ebb8a1ec9191ad40e79b5926";

// Função que busca o clima quando clica no botão
function getWeather() {
  // Pega o que o usuário digitou no campo da cidade
  const city = document.getElementById("city").value;
  // Pega onde eu vou mostrar o resultado
  const result = document.getElementById("result");

  // Se o usuário não digitou nada, aviso pra ele digitar
  if (!city) {
    result.innerHTML = "Digite uma cidade!";
    return; // Para aqui porque não tem cidade pra buscar
  }

  // Aqui eu monto o endereço pra pedir o clima pra API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

  // Faço a chamada pra API buscar os dados do clima
  fetch(url)
    .then(response => {
      // Se não der certo, tipo cidade errada, eu aviso o erro
      if (!response.ok) throw new Error("Cidade não encontrada!");
      // Se deu certo, pego o resultado em JSON
      return response.json();
    })
    .then(data => {
      // Aqui eu monto a parte que vai mostrar o clima pra o usuário ver
      const clima = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperatura: ${data.main.temp}°C</p>
        <p>☁️ Clima: ${data.weather[0].description}</p>
        <p>💨 Vento: ${data.wind.speed} km/h</p>
      `;
      // Jogo o clima montado pra tela aparecer
      result.innerHTML = clima;
    })
    // Se deu algum erro na hora de buscar, mostro a mensagem
    .catch(error => {
      result.innerHTML = error.message;
    });
}
