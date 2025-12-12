import { openModalComanda } from "./modal.js"


const baseUrl = "https://localhost:7004"
const headers = {
    "Content-Type": "application/json"
}


async function listDeComandas() {
    const resposta = await fetch("https://localhost:7004/api/Comanda", {
        headers: headers
    });

    const comandas = await resposta.json();
    console.log(comandas);
    const listadecomandas = document.querySelector(".comanda_lista");


    if (!listadecomandas) {
        console.error("Erro: Elemento '.comanda_lista' não encontrado no HTML!");
        return;
    }

    const ul = document.createElement("ul");
    ul.classList.add("ul");
    listadecomandas.append(ul);

    console.log(comandas, "comandas");

    comandas.forEach(element => {
        const li = document.createElement("li");
        li.classList.add("comanda_item");
        li.innerHTML = `
            <h3 class="comanda_nome">Cliente: ${element.nomeCliente}</h3>
            <p class="Numero_mesa">Mesa: ${element.numeroMesa}</p>
            <button class="comanda_vermais" id="${element.id}"> <i class="fa-solid fa-list-ul"></i> </button>
            <button class="remove_comanda" id="remove_comanda_${element.id}">  <!-- Corrigido: "remuve" -> "remove" e ID único -->
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        const vermaisBtn = li.querySelector('.comanda_vermais');
        vermaisBtn.addEventListener('click', () => {
            openModalComanda(element);
        });


        ul.appendChild(li);




        const removeBtn = li.querySelector('.remove_comanda');
        removeBtn.addEventListener('click', async () => {
            if (confirm("Tem certeza que deseja excluir esta comanda?")) {
                const removeResponse = await fetch(`https://localhost:7004/api/Comanda/${element.id}`, {
                    method: 'DELETE',
                    headers: headers
                });
                if (removeResponse.ok) {
                    li.remove();
                }
            }
        });
    });


    const novaComanda = document.querySelector(".btn_novacomanda");
    if (novaComanda) {
        novaComanda.addEventListener('click', () => {
            console.log("click");
            openNovaComanda();
        });
    }
}

listDeComandas();

function Modal_DeNavegacao() {

    const botondenavegar = document.createElement("button")
    botondenavegar.classList.add("botondenavegar")
    const ModalNavegacao = document.querySelector(".ModalNavegacao")

    botondenavegar.innerHTML = `
<button class="btn_navegar">
<i class="fa-solid fa-bars"></i>
</button>
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
    <nav class="navegacao_links">
    <button class="btn_fecharnavegar">&times;</button>
    <a href="../Home/index.html">Home</a>
    <a href="../Cardapio/index.html">Cadapio</a>
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

function openNovaComanda() {
    window.location.href = "cadastro_comanda.html";

}
