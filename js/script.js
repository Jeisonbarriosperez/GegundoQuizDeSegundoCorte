function cargarDatosPaises() {
  var select = document.getElementById('countriesSelect');
  fetch('https://restcountries.com/v3.1/independent?status=true')
    .then(response => response.json())
    .then(data => {
      countriesData = data;
      for (var countryCode in data) {
        var country = data[countryCode];
        var commonName = country.name.common;
        var officialName = country.name.official;
        var option = crearOption(commonName, countryCode);
        select.appendChild(option);
      }
    })

    .catch(error => {
      console.log('Error al obtener los datos de los países:', error);
    });
}
document.addEventListener('DOMContentLoaded', function () {
  cargarDatosPaises();
  var select = document.getElementById('countriesSelect');
  select.addEventListener('change', visiualizarDatosPais);
});
function visiualizarDatosPais() {
  var select = document.getElementById('countriesSelect');
  var countryCode = select.value;
  if (countryCode) {
    var countryPais = countriesData[countryCode];
    document.getElementById('countryName').textContent = countryPais.name.common;
    document.getElementById('officialName').textContent = countryPais.name.official;
    document.getElementById('capitals').textContent = countryPais.capital.join(', ');
    var currencies = countryPais.currencies;
    var currencyKeys = Object.keys(currencies);
    var currencyName = currencies[currencyKeys[0]].name;
    var currencySymbol = currencies[currencyKeys[0]].symbol;
    document.getElementById('currencies').textContent = currencyName + ' (' + currencySymbol + ')';
    document.getElementById('languages').textContent = Object.values(countryPais.languages).join(', ');
    var flagsList = document.getElementById('flags');
    while (flagsList.firstChild) {
      flagsList.firstChild.remove();
    }
    if (Array.isArray(countryPais.flags)) {
      for (var flag of countryPais.flags) {
        if (flag.endsWith('.png')) { 
          var variableDeImg = document.createElement('img');
          variableDeImg.src = flag;
          flagsList.appendChild(variableDeImg);
        }
      }
    } else {
      var variableDeImg = document.createElement('img');
      variableDeImg.src = countryPais.flags.png; 
      flagsList.appendChild(variableDeImg);
    }
    // ...
    var coatOfArmsList = document.getElementById('coatOfArmsList');
    while (coatOfArmsList.firstChild) {
      coatOfArmsList.firstChild.remove();
    }
    if (countryPais.coatOfArms.png.endsWith('.png')) {
      var coatOfArmsImg = document.createElement('img');
      coatOfArmsImg.src = countryPais.coatOfArms.png;
      coatOfArmsList.appendChild(coatOfArmsImg);
    }
    // ...
    document.getElementById('population').textContent = countryPais.population;
  }
}