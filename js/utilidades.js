function crearElementoConTexto(elemento, texto) {
    var el = document.createElement(elemento);
    el.textContent = texto;
    return el;
  }
  
  function crearOption(texto, valor) {
    var option = document.createElement('option');
    option.textContent = texto;
    option.value = valor;
    return option;
  }
  