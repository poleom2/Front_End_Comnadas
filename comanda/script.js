import { list } from "../Cardapio/script";

export function MenuComanda(element) {
    const ul = document.querySelector(".ul");
    const comanda = list
    comanda.forEach(element => {
        const li = document.createElement("li")
        li.classList.add("comanda_item")
        li.innerHTML = `
        <h3 class="comanda_nome">${element.nome}</h3>
        <button class="Info">Item</button>
        <p class="Numero_mesa">${element.numero_mesa}</p>
        <span class="comanda_preco">R$ ${element.preco}</span>
        `
        ul.appendChild(li)
    })
}
MenuComanda();