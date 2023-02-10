// incicializacion de variables
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerinicial = 30;
let tiempoRegresivoid = null;

// apuntar a documento HTML
let mostrarmovimientos = document.getElementById('movimientos');
let mostarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

// generacion de numeros aleatorios
let numeros = ["♠","♠","☺","☺","☻","☻","♥","♥","♦","♦","♣","♣","•","•","◘","◘"];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

// funciones
function contartiempo(){
   tiempoRegresivoid = setInterval(()=>{
      timer--;
      mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
      if(timer == 0){
          clearInterval(tiempoRegresivoid);
          bloqueartarjetas();
      }
    },1000);
}

 function bloqueartarjetas(){
     for (let i = 0; i<=15; i++){
         let tarjetabloqueada = document.getElementById(i);
         tarjetabloqueada.innerHTML = numeros[i]
         tarjetabloqueada.disabled = true
     }
 }
 
// funcion principal
function destapar(id){

    if(temporizador == false){
        contartiempo();
        temporizador = true;
    }

  tarjetasdestapadas++;
  console.log(tarjetasdestapadas);

  if(tarjetasdestapadas == 1){
      // mostrar primer numero
      tarjeta1 = document.getElementById(id);
      primerResultado = numeros[id]
      tarjeta1.innerHTML = primerResultado;

      //deshabilitar primer boton
      tarjeta1.disabled = true
  }else if(tarjetasdestapadas == 2){
      // mostrar segundo numero
      tarjeta2 = document.getElementById(id);
      segundoResultado = numeros[id];
      tarjeta2.innerHTML = segundoResultado

      // deshabilitar segundo boton
      tarjeta2.disabled = true

     // incrementar movimientos
     movimientos++;
     mostrarmovimientos.innerHTML = `movimientos: ${movimientos}`;
     
     if(primerResultado == segundoResultado){
         // encerar contador tarjetas destapadas
         tarjetasdestapadas = 0;

         // aumentar aciertos
         aciertos++;
         mostarAciertos.innerHTML = `aciertos: ${aciertos}`;

         if(aciertos == 10){
             clearInterval(tiempoRegresivoid);
             mostarAciertos.innerHTML = `aciertos: ${aciertos} 😱`
             mostrarTiempo.innerHTML = `fantastico 🤩 solo demoraste ${timerinicial - timer}segundos`
             mostrarmovimientos.innerHTML = `movimientos: ${movimientos} 🤙🏻😎`
         }
     }else{
         // mostrar momentaneament valores y volver a tapar
         setTimeout(()=>{
             tarjeta1.innerHTML = ``;
             tarjeta2.innerHTML = ``;
             tarjeta1.disabled = false;
             tarjeta2.disabled = false;
             tarjetasdestapadas = 0;
         },600);
     }
  }

}