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
  $.get("search/all", (response, status) => {
    var ciudadOptions = {}
    var tipoOptions = {}
    for(let resultado in response){
      ciudadOptions[response[resultado]["Ciudad"]] = response[resultado]["Ciudad"];
      tipoOptions[response[resultado]["Tipo"]] = response[resultado]["Tipo"];
    }
    for (var key in ciudadOptions){
      $('#ciudad').append($('<option>',{
          value: key,
          text : ciudadOptions[key]
      }))
    }
    for (var key in tipoOptions){
      $('#tipo').append($('<option>',{
          value: key,
          text : tipoOptions[key]
      }))
    }
    $('select').formSelect();
  })
  //$('select').formSelect();
  $('#ciudad').trigger("chosen:updated");

  busqueda.on('change', (e) => {
    $('#personalizada').toggleClass('invisible')
  })
}

$(document).ready(function(){
  setSearch()
  $('select').formSelect();
});


$('#buscar').click( () => {
  $('#lista').removeClass('invisible')
  $('#lista').empty()
  if($("#checkPersonalizada").prop("checked")){
    let O_ciudad = $('#ciudad').find(":selected").val()
    let O_tipo = $('#tipo').find(":selected").val()
    let O_min = $('#rangoPrecio').prop("value").split(";")[0];
    let O_max = $('#rangoPrecio').prop("value").split(";")[1];
    $.get("search", { ciudad: O_ciudad, tipo: O_tipo ,min: O_min,max: O_max}, (response, status) => {
      for(let resultado in response){
        $('#lista').append(createCard(response[resultado]["Direccion"],response[resultado]["Ciudad"],response[resultado]["Telefono"],response[resultado]["Codigo_Postal"],response[resultado]["Precio"],response[resultado]["Tipo"]))
      }
    })
  }else{
    $.get("search/all", (response, status) => {
      for(let resultado in response){
        $('#lista').append(createCard(response[resultado]["Direccion"],response[resultado]["Ciudad"],response[resultado]["Telefono"],response[resultado]["Codigo_Postal"],response[resultado]["Precio"],response[resultado]["Tipo"]))
      }
    })
  }
})

function createCard(direccion="-----", ciudad="-----", telefono="-----", codigoPostal="-----", precio="-----", tipo="-----") {
  return `<div class="card horizontal">
    <div class="card-image">
      <img src="img/home.jpg">
    </div>
    <div class="card-stacked">
      <div class="card-content">
        <div>
          <b>Direccion: </b>${direccion}
        </div>
        <div>
          <b>Ciudad: </b>${ciudad}
        </div>
        <div>
          <b>Telefono: </b>${telefono}
        </div>
        <div>
          <b>Código postal: </b>${codigoPostal}
        </div>
        <div>
          <b>Precio: </b>${precio}
        </div>
        <div>
          <b>Tipo: </b>${tipo}
        </div>
      </div>
    </div>
  </div>`
}
