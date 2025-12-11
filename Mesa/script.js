export const baseUrl = "https://localhost:7004"
export const heders = {
    "Content-Type": "application/json "
}

async function ListasDasMesas() {
    const response = await fetch("https://localhost:7004/api/Mesa", {
        headers: heders
    })

    const MesaLista = await response.json()
    console.log(MesaLista)

    MesaLista.forEach(element => {

        const ul = document.querySelector("ul")
        const li = document.createElement("li")
        li.classList.add("lista")

        const situacaoMesa = element.situacaoMesa

        if (situacaoMesa === 0) {
            element.situacaoMesa = "Disponivel"
        } else if (situacaoMesa === 1) {
            element.situacaoMesa = "Ocupada"
        } else {
            element.situacaoMesa = "Reservada"
        }

        li.innerHTML =
            `
            <h3 class="Numero_mesa">${element.numeroMesa}
            <span class="Situacao_Mesa"> ${element.situacaoMesa}</span>
            </h3>
            <button Class="remove"> 
            <i class="fa-solid fa-trash"></i>
            </button>
        `

        ul.appendChild(li)

        const btnRemove = li.querySelector(".remove")


        btnRemove.addEventListener("click", async () => {

            const confirmar = confirm(`Tem certeza que deseja excluir a mesa ${element.numeroMesa}?`);

            if (!confirmar) return;

            const mesaId = element.id;
            console.log(mesaId);

            const deletar = await fetch(`https://localhost:7004/api/Mesa/${mesaId}`, {
                method: "DELETE",
                headers: heders
            });

            if (deletar.ok) {
                ul.removeChild(li);
            } else {
                alert("Erro ao excluir a mesa.");
            }
        })
    });
}

ListasDasMesas()



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

    ModalNavegacao.innerHTML = `
        <nav class="navegacao_links">
            <button class="btn_fecharnavegar">&times;</button>
            <a href="../Home/index.html">Home</a>
            <a href="../Cardapio/index.html">Cadapio</a>
            <a href="../comanda/index.html">Mesa</a>
            <a href="../pedido_Cozinha/">Pedido de Cozinha</a>
        </nav>
    `;

    const btnFecharNavegar = document.querySelector(".btn_fecharnavegar");

    btnFecharNavegar.addEventListener("click", () => {
        ModalNavegacao.innerHTML = "";
        Modal_DeNavegacao()
    });
}
