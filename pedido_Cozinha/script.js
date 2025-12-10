
const baseUrl = "https://localhost:7004";
const headers = {
    "Content-Type": "application/json"
};
async function Lista_PedidosCozinha() {
    const response = await fetch(`${baseUrl}/api/PedidoCozinha`);
    const pedidosCozinha = await response.json();

    console.log(pedidosCozinha)
    const modal = document.querySelector(".modal");
    const pedidosContainer = document.createElement("div");
    pedidosContainer.classList.add("pedidos_container");
    modal.appendChild(pedidosContainer);
    let pedido = ""

    let pedido = ""

    pedidosCozinha.forEach(element => {
        pedidosContainer.innerHTML += `
        <div class="lista">
        <h3>${element.numeroMesa}</h3>
        <ul id="${element.id}">
        
        </ul>
        <button class="remuve id="${element.id}">

            <i class="fa-solid fa-trash"></i>
           
       </button>
        </div>
        
        
        `;

        pedido = element
        const ul = document.getElementById(element.id)
        element.items.forEach(items => {
            ul.innerHTML += `
        
       
        pedido=element
        const ul =document.getElementById(element.id)
          element.items.forEach(items => {
              ul.innerHTML += `
                < li >
                <h3>${items.titulo}</h3>
                 <button class="vermais ">
                 <button class="vermais ">
                    <i class="fa-solid fa-list-ul"></i>
                   
               </button>
                    
                </li>
            `;
        });
    });
     const button_delete = Number(document.getElementById(pedido.id))
 

    button_delete.addEventListener('click', async () => {
    const element_delete = element.id;
    console.log("Tentando excluir pedido:", element_delete);

    const response = await fetch(`${ baseUrl } /api/PedidoCozinha / ${ element_delete } `, {
        method: "DELETE",
        headers: headers,
    }
);

    if (response.ok) {
        console.log("Pedido excluído com sucesso!");

        // Remove o elemento do DOM (por exemplo, a linha da tabela ou card do pedido)
        const pedidoElement = document.getElementById(pedido.id)
        const numeromesa= document.querySelector(".lista")
        if (pedidoElement) {
           
            numeromesa.remove();
            
            console.log("Elemento removido da interface.");
         
        }
    } else {
        console.error("Erro ao excluir pedido:", response.status);
    }
});

    const vermaisbtn = document.querySelector(".vermais")
    vermaisbtn.addEventListener('click', () => {
          vermais(pedido)
    })
    
}
Lista_PedidosCozinha();
async function vermais(element) {
    const modal = document.querySelector(".modal_vermais")
    modal.innerHTML = `
                < label for= "comandaid" > ${ element.id }</label >
        <label for="numeroMesa">${element.numeroMesa}</label>
        <select>
        
        </select>
            `




}







function Modal_DeNavegacao() {

    const botondenavegar = document.createElement("button")
    botondenavegar.classList.add("botondenavegar")
    const ModalNavegacao = document.querySelector(".ModalNavegacao")

    botondenavegar.innerHTML = `
                < button class="btn_navegar" >
                    <i class="fa-solid fa-bars"></i>
</button >
                `;
    ModalNavegacao.appendChild(botondenavegar)

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
                < nav class="navegacao_links" >
    <button class="btn_fecharnavegar">&times;</button>
    <a href="../Home/index.html">Home</a>
    <a href="../Cardapio/index.html">Cadapio</a>
    <a href="../Mesa/index.html">Mesa</a>
    <a href="../comanda/index.html">Comanda</a>
    </nav >
                `;
    const btnFecharNavegar = document.querySelector(".btn_fecharnavegar");
    btnFecharNavegar.addEventListener("click", () => {

        ModalNavegacao.style.display = "none";
        window.location.reload();
    });
}