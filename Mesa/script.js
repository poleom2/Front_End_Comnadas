const baseUrl = "http://localhost:7004"
const heders = {
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


        li.innerHTML =
            `
            <h3 class="Numero_mesa">${element.numeroMesa}</h3>
            <span class="Situacao_Mesa"> ${element.situacaoMesa}</span>
            <button Class="remove"> 
            // <i class="fa-solid fa-trash"></i>
            </button>

        `
        ul.appendChild(li)
    });




}
ListasDasMesas()