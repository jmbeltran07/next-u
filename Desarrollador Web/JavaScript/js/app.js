var Calculadora = {
  espaciosUsados: 0,
  numeroEnPantalla: 0,
  decimales: 0,
  numero_1: 0,
  numero_2: 0,
  resultado: 0,
  ultima_operacion: 'suma',
  last_igual: false,
  display: document.getElementById('display'),
  Sumar: function(num1, num2) {
    return num1 + num2;
  },
  Restar: function(num1, num2) {
    return num1 - num2;
  },
  Multiplicacion: function(num1, num2) {
    return num1 * num2;
  },
  Division: function(num1, num2) {
    if (num2 != 0) {
      return num1 / num2;
    } else {
      return 'error'
    }
  },
  computa: function(op) {
    switch (op) {
      case 'suma':
        Calculadora.numero_1 = Calculadora.Sumar(Calculadora.numero_1, Calculadora.numero_2);
        break;
      case 'resta':
        Calculadora.numero_1 = Calculadora.Restar(Calculadora.numero_1, Calculadora.numero_2);
        break;
      case 'multiplicacion':
        Calculadora.numero_1 = Calculadora.Multiplicacion(Calculadora.numero_1, Calculadora.numero_2);
        break;
      case 'division':
        Calculadora.numero_1 = Calculadora.Division(Calculadora.numero_1, Calculadora.numero_2);
        break;
      case 'igual':
        Calculadora.computa(Calculadora.ultima_operacion)
        break;
      default:
    }
  },
  digitosEnPantalla: function(num) {
    dig = 0
    while (num / Math.pow(10, dig) >= 1) {
      ++dig
      if(dig > 8){
        return 9;
      }
    }
    if (Calculadora.decimales > 0) {
      return dig + Number(Calculadora.decimales) - 1
    } else {
      return dig
    }
  },
  decimalesEnPantalla: function(num){
    if(num%1 != 0 ){
      var precision = (num + "").split(".")[1].length;
      return precision
    }else{
      return 0
    }
  },
  numeroPresionado: function(numero) {
    if (Calculadora.digitosEnPantalla(Calculadora.numeroEnPantalla) < 8) {
      if (Calculadora.decimales > 0) {
        var numeroASumar = numero / (Math.pow(10, Calculadora.decimales))
        if (Calculadora.numeroEnPantalla >= 0) {
          Calculadora.numeroEnPantalla = Number((Calculadora.numeroEnPantalla + numeroASumar).toFixed(Calculadora.decimales));
        } else {
          Calculadora.numeroEnPantalla = Number((Calculadora.numeroEnPantalla - numeroASumar).toFixed(Calculadora.decimales));
        }
        display.innerHTML = Calculadora.numeroEnPantalla.toFixed(Calculadora.decimales);
        ++Calculadora.decimales
      } else {
        Calculadora.numeroEnPantalla = Calculadora.numeroEnPantalla * 10
        if (Calculadora.numeroEnPantalla >= 0) {
          Calculadora.numeroEnPantalla = Calculadora.numeroEnPantalla + numero
        } else {
          Calculadora.numeroEnPantalla = Calculadora.numeroEnPantalla - numero
        }
        display.innerHTML = Calculadora.numeroEnPantalla.toFixed(Calculadora.decimales);
      }
    } else {
      alert('limite de numeros')
    }
  },
  teclaPresionada: function(tecla) {
    switch (tecla) {
      case 'on':
        Calculadora.espaciosUsados = 0
        Calculadora.numeroEnPantalla = 0
        Calculadora.decimales = 0
        Calculadora.numero_1 = 0
        Calculadora.numero_2 = 0
        Calculadora.resultado = 0
        Calculadora.ultima_operacion = 'suma'
        Calculadora.last_igual= false
        display.innerHTML = Calculadora.numeroEnPantalla.toString();
        break;
      case 'sign':
        Calculadora.numero_1 = Calculadora.numero_1 * -1;
        display.innerHTML = Calculadora.numero_1.toString();
        break;
      case 'raiz':
        alert('Tecla presionada')
        break;
      case 'dividido':
        console.log("numero_1: " + Calculadora.numero_1 + " numero_2: " + Calculadora.numero_2 + " numeroEnPantalla: " + Calculadora.numeroEnPantalla);
        Calculadora.numero_2 = Calculadora.numeroEnPantalla;
        if(Calculadora.last_igual == false){
          Calculadora.computa(Calculadora.ultima_operacion)
        }
        Calculadora.ultima_operacion = 'division'
        display.innerHTML = " ";
        Calculadora.numeroEnPantalla = 0;
        Calculadora.decimales = 0;
        Calculadora.last_igual = false;
        console.log("numero_1: " + Calculadora.numero_1 + " numero_2: " + Calculadora.numero_2 + " numeroEnPantalla: " + Calculadora.numeroEnPantalla);
        break;
      case 'siete':
        Calculadora.numeroPresionado(7);
        break;
      case 'ocho':
        Calculadora.numeroPresionado(8);
        break;
      case 'nueve':
        Calculadora.numeroPresionado(9);
        break;
      case 'por':
        console.log("numero_1: " + Calculadora.numero_1 + " numero_2: " + Calculadora.numero_2 + " numeroEnPantalla: " + Calculadora.numeroEnPantalla);
        Calculadora.numero_2 = Calculadora.numeroEnPantalla;
        if(Calculadora.last_igual == false){
          Calculadora.computa(Calculadora.ultima_operacion)
        }
        Calculadora.ultima_operacion = 'multiplicacion'
        display.innerHTML = " ";
        Calculadora.numeroEnPantalla = 0;
        Calculadora.decimales = 0;
        Calculadora.last_igual = false;
        console.log("numero_1: " + Calculadora.numero_1 + " numero_2: " + Calculadora.numero_2 + " numeroEnPantalla: " + Calculadora.numeroEnPantalla);
        break;
      case 'cuatro':
        Calculadora.numeroPresionado(4);
        break;
      case 'cinco':
        Calculadora.numeroPresionado(5);
        break;
      case 'seis':
        Calculadora.numeroPresionado(6);
        break;
      case 'menos':
        console.log("numero_1: " + Calculadora.numero_1 + " numero_2: " + Calculadora.numero_2 + " numeroEnPantalla: " + Calculadora.numeroEnPantalla);
        Calculadora.numero_2 = Calculadora.numeroEnPantalla;
        if(Calculadora.last_igual == false){
          Calculadora.computa(Calculadora.ultima_operacion)
        }
        Calculadora.ultima_operacion = 'resta'
        display.innerHTML = " ";
        Calculadora.numeroEnPantalla = 0;
        Calculadora.decimales = 0;
        Calculadora.last_igual = false;
        console.log("numero_1: " + Calculadora.numero_1 + " numero_2: " + Calculadora.numero_2 + " numeroEnPantalla: " + Calculadora.numeroEnPantalla);
        break;
      case 'uno':
        Calculadora.numeroPresionado(1);
        break;
      case 'dos':
        Calculadora.numeroPresionado(2);
        break;
      case 'tres':
        Calculadora.numeroPresionado(3);
        break;
      case 'cero':
        Calculadora.numeroPresionado(0);
        break;
      case 'punto':
        if (Calculadora.decimales <= 0) {
          display.innerHTML = Calculadora.numeroEnPantalla.toString() + ".";
          Calculadora.decimales = 1;
        }
        break;
      case 'igual':
        console.log("numero_1: " + Calculadora.numero_1 + " numero_2: " + Calculadora.numero_2 + " numeroEnPantalla: " + Calculadora.numeroEnPantalla);
        if (Calculadora.last_igual == false) {
          Calculadora.numero_2 = Calculadora.numeroEnPantalla;
        }
        Calculadora.computa('igual')
        var i = 7
        if (Calculadora.digitosEnPantalla(Calculadora.numero_1) + Calculadora.decimalesEnPantalla(Calculadora.numero_1) > 8){
          while(Calculadora.digitosEnPantalla(Calculadora.numero_1) + Calculadora.decimalesEnPantalla(Calculadora.numero_1)  > 8){
            if(i>-1){
              Calculadora.numero_1 = Number(Calculadora.numero_1.toFixed(i));
            }else{
              Calculadora.numero_1 = (Calculadora.numero_1/10).toFixed(0);
            }
            --i
          }
        }
        display.innerHTML = Calculadora.numero_1.toString();
        Calculadora.numeroEnPantalla = 0;
        Calculadora.decimales = 0;
        Calculadora.last_igual = true;
        console.log("numero_1: " + Calculadora.numero_1 + " numero_2: " + Calculadora.numero_2 + " numeroEnPantalla: " + Calculadora.numeroEnPantalla);
        break;
      case 'mas':
        console.log("numero_1: " + Calculadora.numero_1 + " numero_2: " + Calculadora.numero_2 + " numeroEnPantalla: " + Calculadora.numeroEnPantalla);
        Calculadora.numero_2 = Calculadora.numeroEnPantalla;
        if(Calculadora.last_igual == false){
          Calculadora.computa(Calculadora.ultima_operacion)
        }
        Calculadora.ultima_operacion = 'suma'
        display.innerHTML = " ";
        Calculadora.numeroEnPantalla = 0;
        Calculadora.decimales = 0;
        Calculadora.last_igual = false;
        console.log("numero_1: " + Calculadora.numero_1 + " numero_2: " + Calculadora.numero_2 + " numeroEnPantalla: " + Calculadora.numeroEnPantalla);
        break;
      default:
        alert('Tecla presionada')
    }
  }
}

//Obtengo los objetos DOM y los guardo en variables para utilizar en JS
var on = document.getElementById('on');
var sign = document.getElementById('sign');
var raiz = document.getElementById('raiz');
var dividido = document.getElementById('dividido');
var siete = document.getElementById('7');
var ocho = document.getElementById('8');
var nueve = document.getElementById('9');
var por = document.getElementById('por');
var cuatro = document.getElementById('4');
var cinco = document.getElementById('5');
var seis = document.getElementById('6');
var menos = document.getElementById('menos');
var uno = document.getElementById('1');
var dos = document.getElementById('2');
var tres = document.getElementById('3');
var cero = document.getElementById('0');
var punto = document.getElementById('punto');
var igual = document.getElementById('igual');
var mas = document.getElementById('mas');

var tools = {
  shrinkEffect: function(but) {
    but.style.transform = "scale(0.95,0.95)";
  },
  backToNormaleffect: function(but) {
    but.style.transform = "scale(1,1)";
  }
}

//Efectos de boton presionado
on.addEventListener("mousedown", function() {
  tools.shrinkEffect(on)
})
on.addEventListener("mouseup", function() {
  tools.backToNormaleffect(on)
})
sign.addEventListener("mousedown", function() {
  tools.shrinkEffect(sign)
})
sign.addEventListener("mouseup", function() {
  tools.backToNormaleffect(sign)
})
raiz.addEventListener("mousedown", function() {
  tools.shrinkEffect(raiz)
})
raiz.addEventListener("mouseup", function() {
  tools.backToNormaleffect(raiz)
})
dividido.addEventListener("mousedown", function() {
  tools.shrinkEffect(dividido)
})
dividido.addEventListener("mouseup", function() {
  tools.backToNormaleffect(dividido)
})
siete.addEventListener("mousedown", function() {
  tools.shrinkEffect(siete)
})
siete.addEventListener("mouseup", function() {
  tools.backToNormaleffect(siete)
})
ocho.addEventListener("mousedown", function() {
  tools.shrinkEffect(ocho)
})
ocho.addEventListener("mouseup", function() {
  tools.backToNormaleffect(ocho)
})
nueve.addEventListener("mousedown", function() {
  tools.shrinkEffect(nueve)
})
nueve.addEventListener("mouseup", function() {
  tools.backToNormaleffect(nueve)
})
por.addEventListener("mousedown", function() {
  tools.shrinkEffect(por)
})
por.addEventListener("mouseup", function() {
  tools.backToNormaleffect(por)
})
cuatro.addEventListener("mousedown", function() {
  tools.shrinkEffect(cuatro)
})
cuatro.addEventListener("mouseup", function() {
  tools.backToNormaleffect(cuatro)
})
cinco.addEventListener("mousedown", function() {
  tools.shrinkEffect(cinco)
})
cinco.addEventListener("mouseup", function() {
  tools.backToNormaleffect(cinco)
})
seis.addEventListener("mousedown", function() {
  tools.shrinkEffect(seis)
})
seis.addEventListener("mouseup", function() {
  tools.backToNormaleffect(seis)
})
menos.addEventListener("mousedown", function() {
  tools.shrinkEffect(menos)
})
menos.addEventListener("mouseup", function() {
  tools.backToNormaleffect(menos)
})
uno.addEventListener("mousedown", function() {
  tools.shrinkEffect(uno)
})
uno.addEventListener("mouseup", function() {
  tools.backToNormaleffect(uno)
})
dos.addEventListener("mousedown", function() {
  tools.shrinkEffect(dos)
})
dos.addEventListener("mouseup", function() {
  tools.backToNormaleffect(dos)
})
tres.addEventListener("mousedown", function() {
  tools.shrinkEffect(tres)
})
tres.addEventListener("mouseup", function() {
  tools.backToNormaleffect(tres)
})
cero.addEventListener("mousedown", function() {
  tools.shrinkEffect(cero)
})
cero.addEventListener("mouseup", function() {
  tools.backToNormaleffect(cero)
})
punto.addEventListener("mousedown", function() {
  tools.shrinkEffect(punto)
})
punto.addEventListener("mouseup", function() {
  tools.backToNormaleffect(punto)
})
igual.addEventListener("mousedown", function() {
  tools.shrinkEffect(igual)
})
igual.addEventListener("mouseup", function() {
  tools.backToNormaleffect(igual)
})
mas.addEventListener("mousedown", function() {
  tools.shrinkEffect(mas)
})
mas.addEventListener("mouseup", function() {
  tools.backToNormaleffect(mas)
})

//Listeners para mandar el numero o boton presionado
on.addEventListener("click", function() {
  Calculadora.teclaPresionada('on')
})
sign.addEventListener("click", function() {
  Calculadora.teclaPresionada('sign')
})
raiz.addEventListener("click", function() {
  Calculadora.teclaPresionada('raiz')
})
dividido.addEventListener("click", function() {
  Calculadora.teclaPresionada('dividido')
})
siete.addEventListener("click", function() {
  Calculadora.teclaPresionada('siete')
})
ocho.addEventListener("click", function() {
  Calculadora.teclaPresionada('ocho')
})
nueve.addEventListener("click", function() {
  Calculadora.teclaPresionada('nueve')
})
por.addEventListener("click", function() {
  Calculadora.teclaPresionada('por')
})
cuatro.addEventListener("click", function() {
  Calculadora.teclaPresionada('cuatro')
})
cinco.addEventListener("click", function() {
  Calculadora.teclaPresionada('cinco')
})
seis.addEventListener("click", function() {
  Calculadora.teclaPresionada('seis')
})
menos.addEventListener("click", function() {
  Calculadora.teclaPresionada('menos')
})
uno.addEventListener("click", function() {
  Calculadora.teclaPresionada('uno')
})
dos.addEventListener("click", function() {
  Calculadora.teclaPresionada('dos')
})
tres.addEventListener("click", function() {
  Calculadora.teclaPresionada('tres')
})
cero.addEventListener("click", function() {
  Calculadora.teclaPresionada('cero')
})
punto.addEventListener("click", function() {
  Calculadora.teclaPresionada('punto')
})
igual.addEventListener("click", function() {
  Calculadora.teclaPresionada('igual')
})
mas.addEventListener("click", function() {
  Calculadora.teclaPresionada('mas')
})
