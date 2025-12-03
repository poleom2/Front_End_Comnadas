
const baseUrl = "https://localhost:7004";
const headers = {
    "Content-Type": "application/json"
};
async function Lista_PedidosCozinha()
{
    const response = await fetch (`${baseUrl}/api/PedidoCozinha`);
    const pedidosCozinha = await response.json();
    
    console.log(pedidosCozinha)
    const modal = document.querySelector(".modal");
    const  div= document.createElement("div")
    div.classList.add("lista_pedidoscozinha")
    modal.appendChild (div)
    pedidosCozinha.forEach(element => {
        const pedidoItem = document.createElement("h3")
        pedidoItem.classList.add ("nome_da_comanda")
        

    });
}
Lista_PedidosCozinha();





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
    <a href="../Cardapio/index.html">Cadapio</a>
    <a href="../Mesa/index.html">Mesa</a>
    <a href="../comanda/index.html">Pedido de Cozinha</a>
    </nav>
    `;
    const btnFecharNavegar = document.querySelector(".btn_fecharnavegar");
    btnFecharNavegar.addEventListener("click", () => {

        ModalNavegacao.style.display = "none";
        window.location.reload();
    });
}