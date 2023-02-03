$('#foo .bar').on('click', handleBarClick);
if (escapesToo)
  $('#foo .bar').on('keypress', handleEscapes);
items.forEach(function(item) {
  $('#foo .bar').append(item);
});