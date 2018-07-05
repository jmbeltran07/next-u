//global variables
var toggleTitle = 0;

var JuegoCandy = {
  iniciarJuego: function() {
    JuegoCandy.iniciarColumnas()
  },
  iniciarColumnas: function() {
    for (var i = 1; i < 8; i++) {
      $(".col-" + i).append("<div class=\"row-0\"></div>")
      for (var j = 1; j < 8; j++) {
        rand = Math.floor(Math.random() * 4 + 1)
        $(".col-" + i).find(".row-" + (j - 1)).before("<div class=\"row-" + j + "\"><img class=\"" + rand + "\" src=\"./image/" + rand + ".png\"></div>")
        //$(".col-"+i).find(".row-"+j).show()
        //alert($(".col-"+i).find(".row-"+j).position().left + " " + $(".col-"+i).find(".row-"+j).position().top)
        //JuegoCandy.fallAnimation(i,j,$(".col-"+i).find(".row-"+j).position().left,$(".col-"+i).find(".row-"+j).position().top)
      }
    }
    //animaciones iniciales
    $(".row-1").hide()
    $(".row-1").hide()
    $(".row-2").hide()
    $(".row-3").hide()
    $(".row-4").hide()
    $(".row-5").hide()
    $(".row-6").hide()
    $(".row-7").hide()
    $(".row-1").slideDown("slow")
    $(".row-2").slideDown("slow")
    $(".row-3").slideDown("slow")
    $(".row-4").slideDown("slow")
    $(".row-5").slideDown("slow")
    $(".row-6").slideDown("slow")
    $(".row-7").slideDown("slow", function() {
      JuegoCandy.checkForPointsGeneral();
    })
    //Revisar los dulces iniciales

  },
  deleteCandy: function() {
    var puntos = ($(".toDelete").length) * 10
    var previousScore = Number($("#score-text").text());
    $("#score-text").text(Number(previousScore + puntos))
    $(".toDelete").remove();
    JuegoCandy.relabelRows();
  },
  relabelRows: function() {
    for (var i = 1; i < 8; i++) {
      $("div[class*='row'").removeClass("row-" + i)
    }
    for (var i = 1; i < 8; i++) {
      var Columna_i = $(".col-" + i).children()
      var filas = Columna_i.length - 1
      for (var j = filas; j > 0; j--) {
        $(".col-" + i + " div:nth-child(" + (filas - j + 1) + ")").addClass("row-" + j)
      }
    }
  },
  markCandyToDelete: function(dulcesGanadores) {
    for (var dulce of dulcesGanadores) {
      $(".col-" + dulce[0]).find(".row-" + dulce[1]).addClass("toDelete");
    }
  },
  deleteAnimation: function() {
    for (var i = 0; i < 4; i++) {
      $(".toDelete").animate({
        opacity: "0"
      }, 200);
      $(".toDelete").animate({
        opacity: "1"
      }, 200);
    }
    $(".toDelete").animate({
      opacity: "1"
    }, 50, function() {
      JuegoCandy.deleteCandy();
    });
  },
  rellenarDulces: function() {
    for (var i = 1; i < 8; i++) {
      for (var j = 1; j < 8; j++) {
        if ($(".col-" + i).find(".row-" + j).length == 0) {
          rand = Math.floor(Math.random() * 4 + 1)
          $(".col-" + i).find(".row-" + (j - 1)).before("<div class=\"row-" + j + "\"><img class=\"" + rand + "\" src=\"./image/" + rand + ".png\"></div>")
          $(".col-" + i).find(".row-" + j).hide();
          $(".col-" + i).find(".row-" + j).slideDown("slow")
        }
      }
    }
  },
  checkForPointsGeneral: function() {
    //$("div: class+='row-'").
    var dulcesGanadores = new Array();
    var dulcesGanadores_prov = new Array();
    for (var i = 1; i < 8; i++) {
      for (var j = 1; j < 8; j++) {
        dulcesGanadores_prov = JuegoCandy.checkForPointsIndividual(i, j);
        for (var elem of dulcesGanadores_prov) {
          if (!JuegoCandy.existsInArray(dulcesGanadores, elem)) {
            dulcesGanadores.push(elem);
          }
        }
        dulcesGanadores_prov = 0;
      }
    }
    if (dulcesGanadores.length > 0) {
      JuegoCandy.markCandyToDelete(dulcesGanadores);
      JuegoCandy.deleteAnimation();
      setTimeout(function() {
        JuegoCandy.rellenarDulces();
      }, 2000);
      setTimeout(function() {
        JuegoCandy.makeNewCandiesDragableAndDropable();
      }, 1500);
      setTimeout(function() {
        JuegoCandy.checkForPointsGeneral();
      }, 1500);
      return dulcesGanadores;
    } else {
      return;
    }
  },
  makeNewCandiesDragableAndDropable: function() {
    $("[class*='row-']").draggable({
      revert: "invalid",
      enable: "true"
    });
    $("[class*='row-']").droppable({
      disabled: true,
      accept: ".selected",
      drop: function(event, ui) {
        changeCandy($(this))
      }
    })
  },
  checkForPointsIndividual: function(x, y) {
    var setProvisional = new Array();
    var cuentaDerecha = 1;
    var cuentaIzquierda = 1;
    var cuentaArriba = 1;
    var cuentaAbajo = 1;
    var desface = 0;
    dulceActual = ($(".col-" + x).find(".row-" + y).find("img").attr("class"))
    //revisa a la derecha
    desface = 1;
    if (x + desface > 0 && x + desface < 8) {
      while (dulceActual == ($(".col-" + (x + desface)).find(".row-" + y).find("img").attr("class"))) {
        //alert("coincidencia: " + dulceActual + " " +  ($(".col-"+(x+desface)).find(".row-"+y).find("img").attr("class")))
        ++cuentaDerecha;
        ++desface;
      }
    }
    //revisa a la izquierda
    desface = -1;
    if (x + desface > 0 && x + desface < 8) {
      while (dulceActual == ($(".col-" + (x + desface)).find(".row-" + y).find("img").attr("class"))) {
        //alert("coincidencia: " + dulceActual + " " +  ($(".col-"+(x+desface)).find(".row-"+y).find("img").attr("class")))
        ++cuentaIzquierda;
        --desface;
      }
    }
    //revisa arriba
    desface = 1;
    if (y + desface > 0 && y + desface < 8) {
      while (dulceActual == ($(".col-" + x).find(".row-" + (y + desface)).find("img").attr("class"))) {
        //alert("coincidencia: " + dulceActual + " " +  ($(".col-"+x).find(".row-"+(y+desface)).find("img").attr("class")))
        ++cuentaArriba;
        ++desface;
      }
    }
    //revisa abajo
    desface = -1;
    if (y + desface > 0 && y + desface < 8) {
      while (dulceActual == ($(".col-" + x).find(".row-" + (y + desface)).find("img").attr("class"))) {
        //alert("coincidencia: " + dulceActual + " " +  ($(".col-"+x).find(".row-"+(y+desface)).find("img").attr("class")))
        ++cuentaAbajo;
        --desface;
      }
    }
    //alert(($(".col-"+x).find(".row-"+y).find("img").attr("class")))
    //alert("revise: ["+x+","+y+"] \rcuentaArriba: "+cuentaArriba +"\rcuentaAbajo: "+cuentaAbajo +"\rcuentaIzquierda: "+cuentaIzquierda +"\rcuentaDerecha: "+cuentaDerecha)
    if (cuentaIzquierda + cuentaDerecha - 1 > 2) {
      if (!JuegoCandy.existsInArray(setProvisional, [x, y])) {
        setProvisional.push([x, y]);
      }
      for (var i = 1; i < cuentaIzquierda; i++) {
        if (!JuegoCandy.existsInArray(setProvisional, [x - i, y])) {
          setProvisional.push([x - i, y]);
        }
      }
      for (var i = 1; i < cuentaDerecha; i++) {
        if (!JuegoCandy.existsInArray(setProvisional, [x + i, y])) {
          setProvisional.push([x + i, y]);
        }
      }
    }
    if (cuentaArriba + cuentaAbajo - 1 > 2) {
      if (!JuegoCandy.existsInArray(setProvisional, [x, y])) {
        setProvisional.push([x, y]);
      }
      for (var i = 1; i < cuentaArriba; i++) {
        if (!JuegoCandy.existsInArray(setProvisional, [x, y + i])) {
          setProvisional.push([x, y + i]);
        }
      }
      for (var i = 1; i < cuentaAbajo; i++) {
        if (!JuegoCandy.existsInArray(setProvisional, [x, y - i])) {
          setProvisional.push([x, y - i]);
        }
      }
    }
    return setProvisional;
  },
  existsInArray: function(arrayARevisar, elemento) {
    for (var i = 0; i < arrayARevisar.length; i++) {
      //alert("revisando \relemento: ["+elemento[0]+","+elemento[1]+"]\rarregloARevisar("+i+"): ["+arrayARevisar[i][0]+","+arrayARevisar[i][1]+"]\rresultado: "+(elemento[0] == arrayARevisar[i][0] && elemento[1] == arrayARevisar[i][1]))
      if (elemento[0] == arrayARevisar[i][0] && elemento[1] == arrayARevisar[i][1]) {
        return true
      }
    }
    return false;
  }
}

//Document ready
$(function() {
  changeTitleColor();
});



//Function to change title color indefinetly
function changeTitleColor() {
  window.setInterval(function() {
    if (toggleTitle == 0) {
      $(".main-titulo").animate({
        color: "white"
      }, 1)
      toggleTitle = 1;
    } else {
      $(".main-titulo").animate({
        color: "yellow"
      }, 1)
      toggleTitle = 0;
    }
  }, 1000);
}

function finalTiempo(){
  $(".panel-tablero").hide("Drop","swing",1000)
  $(".panel-score").animate({
    width: "100%"
  }, 1000)
  $(".time").hide("Drop","swing",1000)
  $(".panel-tablero").before("<h1 class=\"main-titulo end\">Juego Terminado</h1>")
}

$(".btn-reinicio").click(function() {
  if ($(".btn-reinicio").text() == "Iniciar") {
    $("#timer").countdown(Date.now() + 120000)
    .on('update.countdown', function(event){
      $("#timer").text(event.strftime('%M:%S'))
    })
    .on('finish.countdown', function(){
      finalTiempo();
    });
    JuegoCandy.iniciarJuego();
    $(".btn-reinicio").text("Reiniciar")
  } else {
    $("[class*=col-]").empty()
    $(".panel-tablero").show()
    $(".panel-score").animate({
      width: "25%"
    }, 1000)
    $(".time").show()
    $(".end").remove()
    $("#movimientos-text").text("0")
    $("#score-text").text("0")
    $("#timer").text("02:00")
    $("#timer").countdown(Date.now() + 120000)
    .on('update.countdown', function(event){
      $("#timer").text(event.strftime('%M:%S'))
    })
    .on('finish.countdown', function(){
      finalTiempo();
    });
    JuegoCandy.iniciarJuego();
  }

})



$("[class*=col-]").on("mousedown", "[class*=row-]", function() {
  $(this).addClass("selected")
  var candySelected = returnColumnAndRow($(this))
  makeNeighboursDroppable(candySelected)
  //$("[class*='row-']").droppable({ accept: ".selected" });
})

$(document).on("mouseup", "[class*=row-]", function() {
  setTimeout(function() {
    $(".selected").removeClass("selected");
    $(".ui-droppable").droppable({
      disabled: true
    });
  }, 200);
})

function returnColumnAndRow(item) {
  var col = 0;
  var row = 0;
  for (var i = 1; i < 8; i++) {
    if (item.parent().hasClass("col-" + i)) {
      col = i;
      break;
    }
  }
  for (var i = 1; i < 8; i++) {
    if (item.hasClass("row-" + i)) {
      row = i;
      break;
    }
  }
  return [col, row]
}

function changeCandy(candyDesplazado) {
  selectedCoordinates = returnColumnAndRow($(".selected"))
  aMoverCoordinates = returnColumnAndRow(candyDesplazado)
  $(".selected").after(candyDesplazado)
  $(".selected").insertBefore($(".col-" + aMoverCoordinates[0]).find(".row-" + (aMoverCoordinates[1] - 1)))
  $(".selected").attr("style", "relative")
  JuegoCandy.makeNewCandiesDragableAndDropable();
  setTimeout(function() {
    JuegoCandy.checkForPointsGeneral();
  }, 1000);
  var previousMovements = Number($("#movimientos-text").text());
  $("#movimientos-text").text(Number(previousMovements + 1))
  //$(".col-"+aMoverCoordinates[0]).find(".row-"+aMoverCoordinates[1]-1).before($(".selected"))
}

function makeNeighboursDroppable(candy) {
  if (candy[0] > 1) {
    $(".col-" + (candy[0] - 1)).find(".row-" + candy[1]).droppable({
      disabled: false
    })
  }
  if (candy[0] < 7) {
    $(".col-" + (candy[0] + 1)).find(".row-" + candy[1]).droppable({
      disabled: false
    })
  }
  if (candy[1] > 1) {
    $(".col-" + candy[0]).find(".row-" + (candy[1] - 1)).droppable({
      disabled: false
    })
  }
  if (candy[1] < 7) {
    $(".col-" + candy[0]).find(".row-" + (candy[1] + 1)).droppable({
      disabled: false
    })
  }
}
