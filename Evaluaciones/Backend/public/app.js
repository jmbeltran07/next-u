//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()

$('#buscar').click( () => {
  $.get("getAll", (response, status) => alert("Data: " + response + "\nStatus: " + status))
  $('#lista').removeClass('invisible')
  //$.get(url, {name: valorBuscado}, function(response){
  //  appendHTML(response);
  //})
})
