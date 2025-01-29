// Função para embaralhar um array utilizando o algoritmo de Fisher-Yates
function embaralharArray(array) {
  // Loop para embaralhar os elementos do array
  for (let i = array.length - 1; i > 0; i--) {
    // Gera um índice aleatório para trocar os elementos
    const j = Math.floor(Math.random() * (i + 1));
    // Troca os elementos no índice i e j
    [array[i], array[j]] = [array[j], array[i]];
  }
  // Retorna o array embaralhado
  return array;
}

// Array de objetos que representa os aliens com seus nomes e imagens
const aliens = [
  { nome: "Anfíbio", imagem: "src/imagem/jogo/anfibio.png" },
  { nome: "Arraiajato", imagem: "src/imagem/jogo/arraiajato.png" },
  { nome: "Artropode", imagem: "src/imagem/jogo/artropode.png" },
  { nome: "Besta", imagem: "src/imagem/jogo/besta.png" },
  { nome: "Calafrio", imagem: "src/imagem/jogo/calafrio.png" },
  { nome: "Chama", imagem: "src/imagem/jogo/chama.png" },
  { nome: "Cromático", imagem: "src/imagem/jogo/cromatico.png" },
  { nome: "Diamante", imagem: "src/imagem/jogo/diamante.png" },
  { nome: "Eco-Eco", imagem: "src/imagem/jogo/eco-eco.png" },
  { nome: "Fogo Selvagem", imagem: "src/imagem/jogo/fogo-selvagem.png" },
  { nome: "Gigante", imagem: "src/imagem/jogo/gigante.png" },
  { nome: "Irado", imagem: "src/imagem/jogo/irado.png" },
  { nome: "Ultra-T", imagem: "src/imagem/jogo/ultra-t.png" },
  { nome: "XLR8", imagem: "src/imagem/jogo/xlr8.png" }
];

// Cria uma cópia do array de aliens e embaralha os elementos
let aliensEmbaralhados = embaralharArray([...aliens]);

// Evento de clique para transformar Ben no alien escolhido
document.getElementById('transformar').addEventListener('click', () => {
  // Se não houver mais aliens para selecionar, embaralha novamente
  if (aliensEmbaralhados.length === 0) {
    aliensEmbaralhados = embaralharArray([...aliens]);
    alert('Todos os alienígenas foram selecionados!.');
  }

  // Pega o último alien da lista embaralhada
  const alienEscolhido = aliensEmbaralhados.pop();

  // Atualiza a imagem e o nome do alien no elemento de Ben
  const benImage = document.getElementById('ben');
  benImage.src = alienEscolhido.imagem;
  benImage.alt = alienEscolhido.nome;

  // Adiciona a classe 'alien' à imagem de Ben
  benImage.classList.add("alien");

  // Verifica se o elemento com o nome do alien existe, caso contrário cria um novo
  let nomeAlien = document.getElementById('nome-alien');
  if (!nomeAlien) {
    nomeAlien = document.createElement('p');
    nomeAlien.id = 'nome-alien';
    nomeAlien.classList.add('alien-nome');
    document.querySelector('.personagem').appendChild(nomeAlien);
  }
  // Atualiza o nome do alien exibido
  nomeAlien.textContent = alienEscolhido.nome;
});

// Função para voltar para o Ben original
function voltarBen() {
  // Restaura a imagem e o nome de Ben
  const benImage = document.getElementById('ben');
  benImage.src = 'src/imagem/jogo/ben.png';
  benImage.alt = 'Ben Tennyson';

  const nomeAlien = document.getElementById('nome-alien');
  if (nomeAlien) {
    nomeAlien.textContent = '';
  }

  // Remove a classe 'alien' de Ben
  benImage.classList.remove("alien");
}

// Adiciona um evento de clique para voltar a Ben, quando o alien é clicado
document.querySelectorAll('.alien').forEach((alien) => {
  alien.addEventListener('click', voltarBen);
});

// Evento de carregamento do DOM, para configurar o comportamento do logo e link de Ben10
document.addEventListener("DOMContentLoaded", function () {
  const logoBen10 = document.getElementById("logo-ben10");
  const linkBen10 = document.getElementById("link-ben10");

  // Verifica se os elementos existem e adiciona o evento de clique
  if (logoBen10 && linkBen10) {
    linkBen10.addEventListener("click", function (event) {
      event.preventDefault(); // Impede o comportamento padrão do link

      // Muda a imagem do logo para indicar que o Omnitrix está carregando
      logoBen10.src = "src/imagem/omnitrix-recharging.png";

      // Após um pequeno tempo, redireciona para a página inicial
      setTimeout(() => {
        window.location.href = "index.html";
      }, 80);
    });
  }
});