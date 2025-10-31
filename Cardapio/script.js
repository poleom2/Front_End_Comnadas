import { openModalDesc } from "./modal.js"
const baseUrl = "http://localhost:5257/"
const heders = {
    "Content-Type": "application/json "
}
openModalDesc()
async function listarCardapio() {
    const listardocardapio = document.querySelector(".cardapio-lista")
    const ul = document.createElement("ul")
    listarCardapio.appendChild(ul)
    const respsta = await fetch("http://localhost:5257/swagger")
    const cardapio = await respsta.json()
    cardapio.forEach(element => {
        const li = document.createElement("li")
        li.classList.add("cardapio-item")
        li.innerHTML = `
        <h3 class="cardapio-nome">${element.nome}</h3>
        <p class="cardapio-descricao">${element.descricao}</p>
        <span class="cardapio-preco">R$ ${element.preco}</span>
        <button class="cardapio-vermais" id="${element.id}">Ver mais</button>
        `
        ul.appendChild(li)
    })
}
listarCardapio()
