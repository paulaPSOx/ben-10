// Seleção de elementos do DOM
const btnAvancar = document.getElementById("btn-avancar");
const btnVoltar = document.getElementById("btn-voltar");
const aliens = document.querySelectorAll(".cartao");
let currentAlien = 0;

// Função para ocultar o alien selecionado
function hideAlien() {
  aliens[currentAlien].classList.remove("selecionado");
}

// Função para exibir o alien selecionado
function showAlien() {
  aliens[currentAlien].classList.add("selecionado");
}

// Função para avançar para o próximo alien
function avançarAlien() {
  hideAlien();
  currentAlien = (currentAlien + 1) % aliens.length;
  showAlien();
}

// Função para voltar para o alien anterior
function voltarAlien() {
  hideAlien();
  currentAlien = (currentAlien - 1 + aliens.length) % aliens.length;
  showAlien();
}

// Evento de clique para avançar
btnAvancar.addEventListener("click", avançarAlien);

// Evento de clique para voltar
btnVoltar.addEventListener("click", voltarAlien);

// Evento de carregamento da página
document.addEventListener("DOMContentLoaded", function () {
  const logoBen10 = document.getElementById("logo-ben10");
  const linkBen10 = document.getElementById("link-ben10");

  // Verifica se os elementos logoBen10 e linkBen10 existem
  if (logoBen10 && linkBen10) {
    // Evento de clique no link Ben10
    linkBen10.addEventListener("click", function (event) {
      event.preventDefault();

      // Muda a imagem da logo Ben10
      logoBen10.src = "src/imagem/omnitrix-recharging.png";

      // Redireciona após um pequeno intervalo
      setTimeout(() => {
        window.location.href = "menu.html";
      }, 80);
    });
  }
});