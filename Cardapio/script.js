import { openModalDesc } from "./modal.js"


const baseUrl = "https://localhost:7004"
const heders = {
    "Content-Type": "application/json "
}


async function listarCardapio() {
    const novo = document.querySelector(".btn_novocaradapio")
    novo.addEventListener('click', () => {
        console.log("click")
        openNovoCardapio()
    })
    const respsta = await fetch("https://localhost:7004/api/CardapioItem", {
        headers: heders
    })
    // const cardapio = list


    const cardapio = await respsta.json()
    console.log(cardapio)
    const listardocardapio = document.querySelector(".lista_cardapio")

    const ul = document.createElement("ul")
    ul.classList.add("ul")
    listardocardapio.append(ul)

    console.log(cardapio, "cardapio")
    cardapio.forEach(element => {

        const li = document.createElement("li")

        li.classList.add("cardapio_item")
        li.innerHTML = `
       
        <h3 class="cardapio_nome">${element.titulo}</h3>
       
        <span class="cardapio_preco">R$ ${element.preco}</span>
        <button class="cardapio_vermais" id="${element.id}"> <i class="fa-solid fa-list-ul"></i> </button>
        <button class="remuve" id="${element.id}-remuve">
            <i class="fa-solid fa-trash"> </i>
        </button>
        `
        const vermaisBtn = li.querySelector('.cardapio_vermais');
        vermaisBtn.addEventListener('click', () => {
            openModalDesc(element);
        }
        );


        ul.appendChild(li)


        const remuve = document.getElementById(`${element.id}-remuve`)
        remuve.addEventListener('click', async (event) => {
            const cardapioId = element.id
            console.log(cardapioId)
            await fetch(`https://localhost:7004/api/CardapioItem/${cardapioId}`, {
                method: "DELETE",
                headers: heders,

            })
            ul.removeChild(li)

        })
    })

}
listarCardapio();

// openModalDesc()
function openNovoCardapio() {
    const modal_Novocardarpio = document.querySelector(".modal")
    modal_Novocardarpio.classList.add('modal_novocardapio');
    modal_Novocardarpio.style.display = 'block';
    modal_Novocardarpio.innerHTML = `
    <div class="modal_Novo_cardapio">
        <span class="modal_fechar">&times;</span>
        <label for="_description">Descrição:</label>
        <input type="text" id="_description" placeholder="Descrição">
        <label for="_Imagem">Imagem URL:</label>
        <input type="text" id="_Imagem" placeholder="Imagem URL" >
        <label for="_preco">Preço:</label>
        <input type="number" id="_preco" placeholder="Preço" >
        <label for="_titulo">Titulo:</label>
        <input type="text" id="_titulo"  placeholder="Titulo" >

        <label for= "_Pussui_preparo">Possui Preparo </label>
        <input type="checkbox" id="_Pussui_preparo">

        <div class = tipos_lanches>
        <input type="radio" id="tipo_lanche" name="tipo" value="Lanche">
        <label for="tipo_lanche">Lanche</label>
        <input type="radio" id="tipo_pratos" name="tipo" value="Pratos">
        <label for="tipo_pratos">Pratos</label>
        <input type="radio" id="tipo_bebidas" name="tipo" value="Bebidas">
        <label for="tipo_bebidas">Bebidas</label>

        </div>
        <button class="modal_salvar">Salvar</button>
    </div>
    `;
    const fechar = document.querySelector(".modal_fechar")
    fechar.addEventListener('click', () => {
        modal_Novocardarpio.style.display = 'none';
    });

    const Salvar = document.querySelector(".modal_salvar")
    Salvar.addEventListener("click", async (event) => {
        let tipo = 0
        if (document.getElementById("tipo_lanche").checked) {
            tipo = 1
        } else if (document.getElementById("tipo_pratos").checked) {
            tipo = 3
        } else if (document.getElementById("tipo_bebidas").checked) {
            tipo = 2
        }
        const producto_novo = {

            titulo: document.querySelector("#_titulo").value,
            descricao: document.querySelector("#_description").value,
            imagem: document.querySelector("#_Imagem").value,
            preco: Number(document.querySelector("#_preco").value),
            possuiPreparo: document.querySelector("#_Pussui_preparo").checked,
            tipo: tipo,
            categoriaCardapioId: tipo


        }
        console.log(JSON.stringify(producto_novo));
        const salvarCardapio = await fetch(`${baseUrl}/api/CardapioItem`, {
            method: "POST",
            headers: heders,
            body: JSON.stringify(producto_novo)
        });
        console.log(salvarCardapio);
        // window.location.reload()
        modal_Novocardarpio.style.display = "none"
        // window.location.reload();
        modal_Novocardarpio.style.display = "none"
        window.location.reload();
    })

}
function Modal_DeNavegacao() {

    const botondenavegar = document.createElement("button")
    botondenavegar.classList.add("botondenavegar")
    const ModalNavegacao = document.querySelector(".ModalNavegacao")
    ModalNavegacao.appendChild(botondenavegar)



    botondenavegar.innerHTML = `
<button class="btn_navegar">
<i class="fa-solid fa-bars"></i>
</button>
`;

    const btnNavegar = document.querySelector(".btn_navegar")
    btnNavegar.addEventListener("click", () => {
        Modalnavegar();
    })
}
Modal_DeNavegacao();
function Modalnavegar() {
    const ModalNavegacao = document.querySelector(".ModalNavegacao");
    const botao = document.querySelector("btnNavegar");
    ModalNavegacao.innerHTML = `
    <nav class="navegacao_links">
    <button class="btn_fecharnavegar">&times;</button>
    <a href="../Home/index.html">Home</a>
    <a href="../comanda/index.html">Comanda</a>
    <a href="../Mesa/index.html">Mesa</a>
    <a href="../pedido_Cozinha/">Pedido de Cozinha</a>
    </nav>
    `;
    const btnFecharNavegar = document.querySelector(".btn_fecharnavegar");
    btnFecharNavegar.addEventListener("click", () => {

        ModalNavegacao.style.display = "none";
        window.location.reload();
    });
}


