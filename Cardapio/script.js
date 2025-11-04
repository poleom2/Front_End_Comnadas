import { openModalDesc } from "./modal.js"

const baseUrl = "http://localhost:5257/"
const heders = {
    "Content-Type": "application/json "
}
const list = [
    { id: "1", nome: "X-Burguer", descricao: "Pão, hambúrguer, queijo, alface, tomate e maionese", preco: 15.00, ImageUrl: "https://t4.ftcdn.net/jpg/06/46/48/07/240_F_646480739_5zBTxkCQnOpIEnjBJtFs5I7pkx4KcC0m.jpg  ", tipo: "Lanche", numero_mesa: 5 }
    , { id: "2", nome: "X-Salada", descricao: "Pão, hambúrguer, queijo, alface, tomate, maionese e salada", preco: 18.00, ImageUrl: "https://br.freepik.com/fotos-premium/close-up-de-um-hamburguer-na-mesa_99999176.htm#from_element=cross_selling__photo,", tipo: "Lanche", numero_mesa: 3 }
    , { id: "3", nome: "X-Bacon", descricao: "Pão, hambúrguer, queijo, alface, tomate, maionese e bacon", preco: 20.00, ImageUrl: "https://br.freepik.com/fotos-gratis/closeup-tiro-de-um-hamburguer-com-bacon-e-queijo-uma-caneca-de-cafe-vermelha_8280993.htm#fromView=keyword&page=1&position=1&uuid=461efc52-9893-4821-aa74-c663f6a5ad5c&query=Hamburger", tipo: "Lanche", numero_mesa: 8 }
    , { id: "4", nome: "X-Egg", descricao: "Pão, hambúrguer, queijo, alface, tomate, maionese e ovo", preco: 22.00 }
    , { id: "5", nome: "X-Tudo", descricao: "Pão, hambúrguer, queijo, alface, tomate, maionese, bacon e ovo", preco: 25.00 }

]
import { MenuComanda } from "../comanda/script.js"
MenuComanda(element);
// openModalDesc()
export async function listarCardapio() {
    const listardocardapio = document.querySelector(".lista_cardapio")
    listardocardapio.innerHTML = ""
    const ul = document.createElement("ul")
    ul.classList.add("ul")
    listardocardapio.append(ul)
    // const respsta = await fetch("http://localhost:5257/api/CardapioItem")
    const cardapio = list
    cardapio.forEach(element => {
        const li = document.createElement("li")

        li.classList.add("cardapio_item")
        li.innerHTML = `
        <h3 class="cardapio_nome">${element.nome}</h3>
       
        <span class="cardapio_preco">R$ ${element.preco}</span>
        <button class="cardapio_vermais" id="${element.id}">Ver mais</button>
        `
        const vermaisBtn = li.querySelector('.cardapio_vermais');
        vermaisBtn.addEventListener('click', () => {
            openModalDesc(element)
            // const modal = document.querySelector('.modal');
            // modal.innerHTML = `
            // <div class="modal-conteudo">
            //     <span class="modal-fechar">&times;</span>
            //     <p class="cardapio-descricao">${element.description}</p>

            // </div>
            // `;
            // modal.style.display = 'block';
            // const fecharBtn = modal.querySelector('.modal-fechar');
            // fecharBtn.addEventListener('click', () => {
            //     modal.style.display = 'none';
            // }
            // );
        }
        );
        ul.appendChild(li)
    })
}
listarCardapio()
// openModalDesc()
