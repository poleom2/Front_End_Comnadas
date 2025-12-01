import { openModalDesc } from "./modal.js"


const baseUrl = "https://localhost:7004"
const heders = {
    "Content-Type": "application/json "
}
// export const list = [
//     { id: "1", nome: "X-Burguer", descricao: "Pão, hambúrguer, queijo, alface, tomate e maionese", preco: 15.00, ImageUrl: "https://t4.ftcdn.net/jpg/06/46/48/07/240_F_646480739_5zBTxkCQnOpIEnjBJtFs5I7pkx4KcC0m.jpg  ", tipo: "Lanche", numero_mesa: 5 }
//     , { id: "2", nome: "X-Salada", descricao: "Pão, hambúrguer, queijo, alface, tomate, maionese e salada", preco: 18.00, ImageUrl: "https://br.freepik.com/fotos-premium/close-up-de-um-hamburguer-na-mesa_99999176.htm#from_element=cross_selling__photo,", tipo: "Lanche", numero_mesa: 3 }
//     , { id: "3", nome: "X-Bacon", descricao: "Pão, hambúrguer, queijo, alface, tomate, maionese e bacon", preco: 20.00, ImageUrl: "https://br.freepik.com/fotos-gratis/closeup-tiro-de-um-hamburguer-com-bacon-e-queijo-uma-caneca-de-cafe-vermelha_8280993.htm#fromView=keyword&page=1&position=1&uuid=461efc52-9893-4821-aa74-c663f6a5ad5c&query=Hamburger", tipo: "Lanche", numero_mesa: 8 }
//     , { id: "4", nome: "X-Egg", descricao: "Pão, hambúrguer, queijo, alface, tomate, maionese e ovo", preco: 22.00 }
//     , { id: "5", nome: "X-Tudo", descricao: "Pão, hambúrguer, queijo, alface, tomate, maionese, bacon e ovo", preco: 25.00 }
// ]


// // listDeComandas()
// export function listDeComandas() {
//     return list;
// }
// listDeComandas();
// listDeComandas()


// openModalDesc()

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
const home = document.querySelector(".logo")
if (home) {
    home.addEventListener('click', () => {
        console.log("click home");

    })
}

// openModalDesc()
function openNovoCardapio() {
    const modal_Novocardarpio = document.querySelector(".modal")
    modal_Novocardarpio.classList.add('modal_novocardapio');
    modal_Novocardarpio.style.display = 'block';
    modal_Novocardarpio.innerHTML = `
    <div class="modal_Novo_cardapio">
        <span class="modal_fechar">&times;</span>
        <input type="text" id="_description" placeholder="Descrição">
        <input type="text" id="_Imagem" placeholder="Imagem URL" >
        <input type="number" id="_preco" placeholder="Preço" >
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
        if(document.getElementById("tipo_lanche").checked){
            tipo = 1
        }else if(document.getElementById("tipo_pratos").checked){
            tipo = 3
        }else if(document.getElementById("tipo_bebidas").checked){
            tipo = 2
        }
        const producto_novo = { 

            titulo: document.querySelector("#_titulo").value,
            descricao: document.querySelector("#_description").value,
            imagem: document.querySelector("#_Imagem").value,
            preco: Number(document.querySelector("#_preco").value),
            possuiPreparo: document.querySelector("#_Pussui_preparo").checked,
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
    })
<<<<<<< HEAD
}
function Modal_DeNavegacao()
{

const botondenavegar = document.createElement("button")
botondenavegar.classList.add("botondenavegar")
const ModalNavegacao = document.querySelector(".ModalNavegacao")

botondenavegar.innerHTML=`
<button class="btn_navegar">
<i class="fa-solid fa-bars"></i>
</button>
`;
ModalNavegacao.appendChild(botondenavegar)

const btnNavegar = document.querySelector(".btn_navegar")
 btnNavegar.addEventListener("click", ()=>
 {
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

=======

}
function goHome() {

    location.href = '../Home/index.html';
};
>>>>>>> 577761c (Função goHome clicando no logo. E entrada padrão pra login d teste)
