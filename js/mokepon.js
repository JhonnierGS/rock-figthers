const buttonReset = document.getElementById('button_reset');
const buttonSelectPet = document.getElementById('button_selectPet');
const closeAlert = document.getElementById('closeAlert');
const reset = document.getElementById('reset');

const selectAtack = document.getElementById('selectAtack');
const selectPet = document.getElementById('selectPet');
const namePetPlayer = document.getElementById('namePetPlayer');
const alertChapter = document.getElementById('alertChapter');

const namePetEnemy = document.getElementById('namePetEnemy');
const nameEnemySelcted = document.getElementById('nameEnemySelcted');

const activeRotate = document.getElementById('result');

const contentMessages = document.getElementById('result');
const atackOfPlayer = document.getElementById('atack-of-player');
const atackOfEnemy = document.getElementById('atack-of-enemy');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const containerAtacks = document.getElementById('containerAtacks');

const sectionVerMapa = document.getElementById('viewMap');
const mapa = document.getElementById('mapa');

let jugadorId = null
let enemigoId = null
let mokeponesEnemigos = []

let luchadores = [];
let atackPlayer = [];
let enemyAtack = [];
let opcionDeLuchadores;
let pumpkin;
let TRex;
let Kunoichi;
let inputs;
let macotasJugador;
let ataquesLuchadores;
let buttonTierra;
let buttonAgua;
let buttonFuego;
let ataqueLuchadorenemigo;
let botones = [];
let ataqueLuchador = [];
let indexAtaqueJugador;
let indexAtaqueenemigo;
let victoriasJuagador = 0
let victoriasEnemigo = 0
let playerLifes = 3;
let enemyLifes = 3;

let personajeMapa;
let lienzo = mapa.getContext("2d");
let intervalo
let mapaBackgroud = new Image();
mapaBackgroud.src = './assets/img/mokemap.webp'

let alturaQueBsucamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 550
if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBsucamos = anchoDelMapa * 600 / 800;




class Peleador {
  constructor(id, container, animation, nombre, foto, fotoRun, vida, cardName){
    this.id = id
    this.container = container
    this.animation = animation
    this.nombre = nombre
    this.foto = foto
    this.fotoRun = fotoRun
    this.vida = vida
    this.cardName = cardName
    this.ataques = []
  }
}

let kidPumpkin = new Peleador('pumpkin', 'containerPumpkin', 'animationPumpkin',  'Kid Pumpkin', 'tarjeta_de_pumkimStop','tarjeta_de_pumkimRun', 5, '');
let jhonTRex = new Peleador('T-Rex', 'containerRex', 'animationTRex', 'Jhon T-Rex', 'tarjeta_de_rexStop', 'tarjeta_de_rexRun', 5,'tarjeta_de_rexName');
let kunoichiKill = new Peleador('Kunoichi','containerKuno', 'animationGirlNinja', 'Kunoichi Kill', 'tarjeta_de_ninjaGirlStop', 'tarjeta_de_ninjaGirlRun', 5, 'tarjeta_de_ninjaGirlName');

const KINDPUMPKIN_ATAQUES = [
  {nombre: "💧", id: "button_Agua"},
  {nombre: "💧", id: "button_Agua"},
  {nombre: "💧", id: "button_Agua"},
  {nombre: "🔥", id: "button_fuego"},
  {nombre: "🌱", id: "button_tierra"}
]

kidPumpkin.ataques.push(...KINDPUMPKIN_ATAQUES)

const JHONTREX_ATAQUES = [
  {nombre: "🌱", id: "button_tierra"},
  {nombre: "🌱", id: "button_tierra"},
  {nombre: "🌱", id: "button_tierra"},
  {nombre: "💧", id: "button_Agua"},
  {nombre: "🔥", id: "button_fuego"}
]
jhonTRex.ataques.push(...JHONTREX_ATAQUES)


const KUNOICHIKILL_ATAQUES = [
  {nombre: "🔥", id: "button_fuego"},
  {nombre: "🔥", id: "button_fuego"},
  {nombre: "🔥", id: "button_fuego"},
  {nombre: "💧", id: "button_Agua"},
  {nombre: "🌱", id: "button_tierra"}
]
kunoichiKill.ataques.push(...KUNOICHIKILL_ATAQUES)

luchadores.push(kidPumpkin,jhonTRex,kunoichiKill);

const initGame = () => {
  selectAtack.style.display = "none";
  reset.style.display = "none";
  sectionVerMapa.style.display = "none"

  luchadores.forEach(luchador => {
    opcionDeLuchadores = `
    <div id="${luchador.container}" class="card__container">
      <label id="${luchador.animation}" for="${luchador.id}" class="${luchador.foto}">
        <p class="${luchador.cardName}">${luchador.nombre}</p>
      </label>
      <input type="radio" name="pet" id="${luchador.id}" />
    </div>
    `
    contenedorTarjetas.innerHTML += opcionDeLuchadores
  })

  pumpkin = document.getElementById('pumpkin');
  TRex = document.getElementById('T-Rex');
  Kunoichi = document.getElementById('Kunoichi');
  inputs = document.querySelectorAll("input");

  buttonSelectPet.addEventListener('click', selectPetPlayer);

  buttonReset.addEventListener('click', resetGame);

  inputs.forEach(input => {
    input.addEventListener('change',  backgroundCard)
  })

  closeAlert.addEventListener('click', closeWindowAlert)

  unriseAlJuego();
}

const unriseAlJuego = async () => {
  let response = await fetch("http://localhost:8080/unirse")
  let userData = await response.json();

  jugadorId = userData
}

//active backgroud card
const backgroundCard = () => {
  pumpkin = document.getElementById('pumpkin');
  TRex = document.getElementById('T-Rex');
  Kunoichi = document.getElementById('Kunoichi');
  const containerPumpkin = document.getElementById('containerPumpkin');
  const animationPumpkin = document.getElementById('animationPumpkin');
  const containerRex = document.getElementById('containerRex');
  const animationTRex = document.getElementById('animationTRex');
  const containerKuno = document.getElementById('containerKuno');
  const animationGirlNinja = document.getElementById('animationGirlNinja');
  const namePlayerSelcted = document.getElementById('namePlayerSelcted');


  if (pumpkin.checked) {
    containerPumpkin.style.background = "#FEC260";
    animationPumpkin.classList.remove('tarjeta_de_pumkimStop');
    animationPumpkin.classList.add('tarjeta_de_pumkimRun');
    namePlayerSelcted.classList.add('tarjeta_de_pumkimRun');
    namePlayerSelcted.classList.remove('tarjeta_de_ninjaGirlRun');
    namePlayerSelcted.classList.remove('tarjeta_de_rexRun');
  }else{
    containerPumpkin.style.background = "";
    animationPumpkin.classList.remove('tarjeta_de_pumkimRun');
    animationPumpkin.classList.add('tarjeta_de_pumkimStop');
  }

  if (TRex.checked) {
    containerRex.style.background = "#FEC260";
    animationTRex.classList.remove('tarjeta_de_rexStop');
    animationTRex.classList.add('tarjeta_de_rexRun');
    namePlayerSelcted.classList.add('tarjeta_de_rexRun');
    namePlayerSelcted.classList.remove('tarjeta_de_ninjaGirlRun');
  }else{
    containerRex.style.background = "";
    animationTRex.classList.remove('tarjeta_de_rexRun');
    animationTRex.classList.add('tarjeta_de_rexStop');
  }

  if (Kunoichi.checked) {
    containerKuno.style.background = "#FEC260";
    animationGirlNinja.classList.remove('tarjeta_de_ninjaGirlStop');
    animationGirlNinja.classList.add('tarjeta_de_ninjaGirlRun');
    namePlayerSelcted.classList.add('tarjeta_de_ninjaGirlRun');
  }else{
    containerKuno.style.background = "";
    animationGirlNinja.classList.remove('tarjeta_de_ninjaGirlRun');
    animationGirlNinja.classList.add('tarjeta_de_ninjaGirlStop');
  }
}

//seleccion de personaje
const selectPetPlayer = (notPlay) => {
  // selectAtack.style.display = "flex";
  

  
  if (pumpkin.checked) {
    namePetPlayer.textContent = pumpkin.id
    macotasJugador = pumpkin.id
    personajeMapa = pump8bits
    selectPet.style.display = "none";
    sectionVerMapa.style.display = "flex";
    iniciarMapa();
    extraerAtaques(macotasJugador);
  }else if (TRex.checked) {
    namePetPlayer.textContent = TRex.id
    macotasJugador = TRex.id
    personajeMapa = rex8bits
    selectPet.style.display = "none";
    sectionVerMapa.style.display = "flex";
    iniciarMapa();
    extraerAtaques(macotasJugador);
  }else if(Kunoichi.checked){
    namePetPlayer.textContent = Kunoichi.id
    macotasJugador = Kunoichi.id
    personajeMapa = kun8bits
    selectPet.style.display = "none";
    sectionVerMapa.style.display = "flex";
    iniciarMapa();
    extraerAtaques(macotasJugador);
  }else{
    alertChapter.style.display = "block";
    selectAtack.style.display = "none";
    selectPet.style.display = "flex";
  }
  // selectPetEnemy();

  seleccionarJugador(macotasJugador)
}

const seleccionarJugador = async (mascotaJugador) => {
  let response = await fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify({
      mokepon: mascotaJugador
    })
  })

}

const extraerAtaques = (macotasJugador) => {
  let atacks
  
  for (let i = 0; i < luchadores.length; i++) {
    if (macotasJugador === luchadores[i].id) {
      atacks = luchadores[i].ataques
    }
  }
  mostrarAtaques(atacks)
}

const mostrarAtaques = (atacks) => {
  atacks.forEach(ataque => {
    ataquesLuchadores = `
    <button id=${ataque.id} class="button__atack BAtack">${ataque.nombre}</button>
    `
    containerAtacks.innerHTML += ataquesLuchadores
  })
  buttonTierra = document.getElementById('button_tierra');
  buttonAgua = document.getElementById('button_Agua');
  buttonFuego = document.getElementById('button_fuego');
  botones = document.querySelectorAll('.BAtack');

  secuenciaAtack(botones);
}

const secuenciaAtack = (botones) => {
  botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === "🔥") {
        ataqueLuchador.push('FUEGO')
        console.log(ataqueLuchador)
        boton.style.background = "#FEC260"
        boton.disabled = true;
      }else if (e.target.textContent === "💧") {
        ataqueLuchador.push('AGUA')
        console.log(ataqueLuchador)
        boton.style.background = "#FEC260"
        boton.disabled = true;
      }else if(e.target.textContent === "🌱"){
        ataqueLuchador.push('TIERRA')
        console.log(ataqueLuchador)
        boton.style.background = "#FEC260"
        boton.disabled = true;
      }
      atackEnemy();
      // if (atackPlayer.length === 5) {
      //   enviarAteques()
      // }
    })
  })
}

// const enviarAteques = () => {
//   fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
//     method: "post",
//     headers: {
//       "content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       ataques: ataqueLuchador
//     })
//   })
//   intervalo = setInterval(obtenerAtaques, 50);
// }

// const obtenerAtaques = () => {
//   fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
//     .then(function(res) {
//       if(res.ok){
//         res.json()
//           .then(function ({ataques}){
//             if (ataques.length === 5) {
//               console.log('hola')
//               enemyAtack = ataques
//               figth();
//             }
//           })
//       }
//     })
// }

const selectPetEnemy = (enemigo) => {
  let randomEnemySelected = randomEnemy(0, luchadores.length-1);

  namePetEnemy.textContent = enemigo.name
  ataqueLuchadorenemigo = luchadores[randomEnemySelected].ataques
  nameEnemySelcted.classList.add(enemigo.fotorun);
}

//cerrar ventana de alert
const closeWindowAlert = () => {
  const alertChapter = document.getElementById('alertChapter');
  alertChapter.style.display = "none";
}


const atackEnemy = () => {
  let enemyAtackRandom = randomEnemy(0, ataqueLuchadorenemigo.length - 1);
  if (enemyAtackRandom === 0 || enemyAtackRandom == 1) {
    enemyAtack.push("FUEGO");
  }else if (enemyAtackRandom === 3 || enemyAtackRandom === 4) {
    enemyAtack.push("AGUA");
  }else {
    enemyAtack.push("TIERRA");
  }

  console.log(enemyAtack)
  iniciarPelea();
}

const iniciarPelea = () => {
  if (ataqueLuchador.length === 5) {
    figth();
  }
}

const indexAmbosOponentes = (jugador, enemigo) => {
  console.log(jugador, enemigo)
  indexAtaqueJugador = ataqueLuchador[jugador]
  indexAtaqueenemigo = enemyAtack[enemigo]
}

//Tablas de las vidas
const figth = (stopGame) => {
  clearInterval(intervalo)

  const pointsPlayer = document.getElementById('pointsPlayer');
  const poinstEnemy = document.getElementById('poinstEnemy');

  for (let index = 0;  index < ataqueLuchador.length; index++) {
    if (ataqueLuchador[index] === enemyAtack[index]) {
      indexAmbosOponentes(index, index);
      createMessage("EMPATE");
    }else if(ataqueLuchador[index] == "FUEGO" && enemyAtack[index] == "TIERRA"){
      indexAmbosOponentes(index, index);
      victoriasJuagador++
      pointsPlayer.innerHTML = victoriasJuagador
      createMessage("GANASTE");
    }else if(ataqueLuchador[index] == "AGUA" && enemyAtack[index] == "FUEGO"){
      indexAmbosOponentes(index, index);
      victoriasJuagador++
      pointsPlayer.innerHTML = victoriasJuagador
      // activeRotate.classList.add('rotate-scale-up');
      createMessage("GANASTE");
    }else if(ataqueLuchador[index] == "TIERRA" && enemyAtack[index] == "AGUA"){
      indexAmbosOponentes(index, index);
      victoriasJuagador++
      pointsPlayer.innerHTML = victoriasJuagador
      // activeRotate.classList.add('rotate-scale-up');
      createMessage("GANASTE");
    }else {
      indexAmbosOponentes(index, index);
      victoriasEnemigo++
      poinstEnemy.innerHTML = victoriasEnemigo
      // activeRotate.classList.add('shake-horizontal');
      createMessage("PERDISTE");
    }
  }
  viewLife();
}

const viewLife = () => {
  const ModalFinalResults = document.getElementById('ModalFinalResults');

  if (victoriasJuagador === victoriasEnemigo) {
    createMessage("EMPATE");
    activeRotate.classList.add('rotate-center');
    createFinalMessage("Esto fue un empate")
    // ModalFinalResults.style.display = "block"
  }else if (victoriasJuagador > victoriasEnemigo) {
    createMessage("GANASTE");
    activeRotate.classList.add('rotate-scale-up');
    createFinalMessage("FELICITACIONES! Ganaste 🥳")
    // ModalFinalResults.style.display = "block"
  }else{
    createMessage("PERDISTE");
    activeRotate.classList.add('shake-horizontal');
    createFinalMessage("Lo siento perdiste 💀")
    // ModalFinalResults.style.display = "block"
  }
}

const createMessage = (resultBattle) => {
  let newAtackPlayer = document.createElement('p');
  let newAtackEnemy = document.createElement('p');
  
  contentMessages.textContent = `${resultBattle}`
  newAtackPlayer.textContent = indexAtaqueJugador
  newAtackEnemy.textContent = indexAtaqueenemigo
  console.log(newAtackPlayer)
  console.log(newAtackEnemy)

  atackOfPlayer.appendChild(newAtackPlayer);
  atackOfEnemy.appendChild(newAtackEnemy);
}

const createFinalMessage = (finalResult) => {
  const textModelFinal = document.getElementById('textModelFinal');
  textModelFinal.textContent = `${finalResult}`

  const buttonFuego = document.getElementById('button_fuego');
  buttonFuego.disabled = true;
  const buttonAgua = document.getElementById('button_Agua');
  buttonAgua.disabled = true;
  const buttonTierra = document.getElementById('button_tierra');
  buttonTierra.disabled = true;
  const reset = document.getElementById('reset');
  reset.style.display = "block";
}

const resetGame = () => {
  location.reload();
}

//numero aleatorio
const randomEnemy = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Peleador8bits {
  constructor(name, fotorun, foto, id=null){
    this.id = id
    this.name = name
    this.fotorun = fotorun
    this.ancho = 40
    this.alto = 40
    this.x = randomEnemy(0, mapa.width-this.ancho)
    this.y = randomEnemy(0, mapa.height-this.alto)
    this.mapaFoto = new Image();
    this.mapaFoto.src = foto
    this.velocidadX = 0
    this.velocidadY = 0
  }

  pintarPersonaje(){
    lienzo.drawImage(
      this.mapaFoto,
      this.x, //x
      this.y, //y
      this.ancho,
      this.alto
    )
  }
}

let pump8bits = new Peleador8bits('pumpkin','tarjeta_de_pumkimRun','./assets/img/pumpin8bits.png');
let rex8bits = new Peleador8bits('jhonTRex','tarjeta_de_rexRun','./assets/img/rex8bits.png');
let kun8bits = new Peleador8bits('kunoichiKill','tarjeta_de_rexRun','./assets/img/ninja8bits.png');



const pintarCanvas = () => {
  personajeMapa.x = personajeMapa.x + personajeMapa.velocidadX
  personajeMapa.y = personajeMapa.y + personajeMapa.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(
    mapaBackgroud,
    0,
    0,
    mapa.width,
    mapa.height
  )
  personajeMapa.pintarPersonaje();

  enviarPocision(personajeMapa.x, personajeMapa.y);
  mokeponesEnemigos.forEach(mokepon => {
    mokepon.pintarPersonaje();
    revisarColision(mokepon)
  })

  // if (personajeMapa.velocidadX !== 0 || personajeMapa.velocidadY !== 0) {
  //   revisarColision(rex8bitsEnemy)
  //   revisarColision(kun8bitsEnemy)
  // }
}

function enviarPocision(x, y){
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
    method:"post",
    headers:{
      "content-Type": "application/json"
    },
    body:JSON.stringify({
      x,
      y
    })
  })

  .then(function(res) {
    if (res.ok) {
      res.json()
        .then(function({enemigos}){
          console.log(enemigos)
          mokeponesEnemigos = enemigos.map(enemigo => {
            let personajeEnemigo = null
            const mokeponNombre = enemigo.mokepon.nombre || ""
            if (mokeponNombre === "pumpkin") {
              personajeEnemigo = new Peleador8bits('pumpkin','tarjeta_de_pumkimRun','./assets/img/pumpin8bits.png', enemigo.id);
            }else if (mokeponNombre === "T-Rex") {
              personajeEnemigo = new Peleador8bits('jhonTRex','tarjeta_de_rexRun','./assets/img/rex8bits.png', enemigo.id);
            }else if (mokeponNombre === "Kunoichi") {
              personajeEnemigo = new Peleador8bits('kunoichiKill','tarjeta_de_ninjaGirlRun','./assets/img/ninja8bits.png', enemigo.id);
            }
            personajeEnemigo.x = enemigo.x
            personajeEnemigo.y = enemigo.y

            return personajeEnemigo
          })
        })
    }
  })
}

const obtenerObjetoMascota = () => {

}

const moverDerecha = () => {
  personajeMapa.velocidadX = 5
  pintarCanvas();
}

const moverIzquierda = () => {
  personajeMapa.velocidadX = -5;
  pintarCanvas();
}
const moverArriba = () => {
  personajeMapa.velocidadY = -5;
  pintarCanvas();
}
const moverAbajo = () => {
  personajeMapa.velocidadY = 5;
  pintarCanvas();
}

const sePresionoUnaTecla = (e) => {
  switch (e.key) {
    case 'ArrowUp':
      moverArriba();
      break;
    case 'ArrowDown':
      moverAbajo();
      break;
    case 'ArrowLeft':
      moverIzquierda();
      break;
    case 'ArrowRight':
      moverDerecha();
      break;
    default:
      break;
  }
}

const detenerMovimiento = () => {
  personajeMapa.velocidadX = 0;
  personajeMapa.velocidadY = 0;
}

const iniciarMapa = () => {
  mapa.width = anchoDelMapa
  mapa.height = alturaQueBsucamos
  intervalo = setInterval(pintarCanvas, 50)
  window.addEventListener('keydown', sePresionoUnaTecla)
  window.addEventListener('keyup', detenerMovimiento)
}

const revisarColision = (enemigo) => {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquieraEnemigo = enemigo.x

  const arribaMascota = personajeMapa.y
  const abajoMascota = personajeMapa.y + personajeMapa.alto
  const derechaMascota = personajeMapa.x + personajeMapa.ancho
  const izquierdaMascota = personajeMapa.x

  if (
      abajoMascota < arribaEnemigo ||
      arribaMascota > abajoEnemigo ||
      derechaMascota < izquieraEnemigo ||
      izquierdaMascota > derechaEnemigo
    ){
      return
  }else{
    detenerMovimiento();
    clearInterval(intervalo)
    enemigoId = enemigo.id
    selectAtack.style.display = "flex";
    sectionVerMapa.style.display = "none";
    selectPetEnemy(enemigo);
    // alert("colition")
  }
}

window.addEventListener('load', initGame);