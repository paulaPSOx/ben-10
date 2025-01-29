// Seleção de elementos da DOM
const omnitrixButton = document.getElementById('omnitrix-button');
const omnitrixIcon = document.querySelector('.omnitrix-icon');
const radialMenu = document.querySelector('.radial-menu');
const menuItems = document.querySelectorAll('.menu-item');
const sound = document.getElementById('ben10-menu-omnitrix-sound');
const transformSound = document.getElementById('omnitrix-transform');
const powerDownSound = document.getElementById('omnitrix-power-down');
const choosingAlienSound = document.getElementById('omnitrix-sound-choosing-alien');

// Definições de ângulos e raio
const startAngle = -135;
const endAngle = 135;
const radius = 65;

// Estado do menu e da seleção
let selectedAlien = null;
let isAlienSelected = false;
let isMenuOpen = false;

// Função para desabilitar todos os itens do menu
function desabilitarMenu() {
  menuItems.forEach((item) => {
    item.classList.add('disabled');
  });
}

// Função para habilitar apenas os itens de alien para seleção
function habilitarSelecaoDeAlien() {
  menuItems.forEach((item) => {
    item.classList.remove('disabled');
  });
}

// Função para abrir/fechar o menu radial
function alternarMenu() {
  const menuEstaAtivo = radialMenu.parentElement.classList.toggle('active');
  
  if (menuEstaAtivo) {
    habilitarSelecaoDeAlien();
    posicionarItensMenu();
    isMenuOpen = true;
  } else {
    desabilitarMenu();
    isMenuOpen = false;
  }
}

// Função para posicionar os itens do menu radial
function posicionarItensMenu() {
  const anguloIncremento = (endAngle - startAngle) / (menuItems.length - 2.5);
  menuItems.forEach((item, index) => {
    const angulo = startAngle + index * anguloIncremento;
    const anguloEmRadiano = angulo * (Math.PI / 180);
    const x = radius * Math.cos(anguloEmRadiano);
    const y = radius * Math.sin(anguloEmRadiano);
    item.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Função para reproduzir som com tratamento de erro
function tocarSom(som) {
  som.currentTime = 0;
  som.play().catch((erro) => {
    console.error("Erro ao tentar reproduzir o som:", erro);
  });
}

// Evento de clique no botão para abrir/fechar o menu radial
omnitrixButton.addEventListener('click', () => {
  if (isAlienSelected) return;

  if (isMenuOpen) {
    omnitrixIcon.src = "src/imagem/logo-clock-omnitrix.png";
    radialMenu.parentElement.classList.remove('active');
    desabilitarMenu();
    isMenuOpen = false;
  } else {
    tocarSom(sound);
    omnitrixIcon.src = "src/imagem/omnitrix-open.gif";
    alternarMenu();
  }
});

// Evento para cada item do menu
menuItems.forEach((item) => {
  item.addEventListener('mouseover', (evento) => {
    const imagem = evento.target.closest('button').querySelector('img');
    if (imagem && imagem.src.includes('aliens')) {
      tocarSom(choosingAlienSound);
    }
  });

  // Selecionar alien ao clicar
  item.addEventListener('click', () => {
    if (isAlienSelected) return;

    const alienImg = item.querySelector('img').src;
    omnitrixIcon.src = alienImg;
    selectedAlien = alienImg;
    isAlienSelected = true;

    tocarSom(transformSound);
    desabilitarMenu();

    // Sequência de animações de desligamento e redefinição
    setTimeout(() => {
      omnitrixIcon.src = "src/imagem/omnitrix-power-down.gif";
      tocarSom(powerDownSound);

      setTimeout(() => {
        omnitrixIcon.src = "src/imagem/omnitrix-recharging.png";

        setTimeout(() => {
          omnitrixIcon.src = "src/imagem/omnitrix-charging.png";

          setTimeout(() => {
            omnitrixIcon.src = "src/imagem/logo-clock-omnitrix.png";
            selectedAlien = null;
            isAlienSelected = false;
            desabilitarMenu();
          }, 3000);
        }, 3000);
      }, 3000);
    }, 10000);

    radialMenu.parentElement.classList.remove('active');
  });
});

// Desabilitar os itens ao carregar a página
window.addEventListener('load', () => {
  desabilitarMenu();
});