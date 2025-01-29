document.addEventListener("DOMContentLoaded", function () {
    const logoBen10 = document.getElementById("logo-ben10");  // Obtém o elemento de logo com id "logo-ben10"
    const linkBen10 = document.getElementById("link-ben10");

    // Verifica se os elementos existem na página
    if (logoBen10 && linkBen10) {
        // Adiciona um ouvinte de evento para o clique no link
        linkBen10.addEventListener("click", function (event) {
            event.preventDefault();  // Impede a ação padrão do link (não irá para o destino do href)

            // Troca o logo para a imagem do Omnitrix carregando
            logoBen10.src = "src/imagem/omnitrix-recharging.png";

            // Após 80ms, redireciona o usuário para a página "menu.html"
            setTimeout(() => {
                window.location.href = "index.html";  // Redireciona para a página do menu
            }, 80);
        });
    }
});