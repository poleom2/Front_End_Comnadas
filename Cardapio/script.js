import { openModalDesc } from "./modal.js"
openModalDesc()
function listarCardapio() {
    const listardocardapio = document.querySelector(".cardapio-lista")
    fetch("http://localhost:3000/cardapio")
        .then(resposta => resposta.json())

}
listarCardapio()
