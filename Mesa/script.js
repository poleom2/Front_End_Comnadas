const baseUrl = "http://localhost:5257"
const heders = {
    "Content-Type": "application/json "
}
async function ListasDasMesas() {
    const response = await fetch("http://localhost:5257/api/Mesa", {
        headers: heders
    })
    const MesaLista = await response.json()
    console.log(MesaLista)
    MesaLista.forEach(element => {

        const ul = document.querySelector("ul")

        ul.innerHTML =
            `
            <h3 class="Numero_mesa">${element.numeroMesa}</h3>
            <span class="Situacao_Mesa"> ${element.situacaoMesa}</span>
            <button Class="remove"> 
            // <i class="fa-solid fa-trash"></i>
            </button>
        `
    });




}
ListasDasMesas()