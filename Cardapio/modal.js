// import { listarCardapio } from "../Cardapio/script.js";
const baseUrl = "http://localhost:5257"
const heders = {
    "Content-Type": "application/json "
}
export function openModalDesc(element) {
    //abri o modal 1
    console.log("Modal de descrição aberto");
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    modal.innerHTML = `
    <div class="modal-conteudo">
        <button class="modal_fechar">&times;</button>

        <p class="cardapio_descricao">${element.descricao}</p>
        <img src="${element.imagem}" alt="">
        <button class="modal_editar">Editar</button>
    </div>
    `;
    const modal_editar = modal.querySelector('.modal_editar');
    modal_editar.addEventListener('click', (event) => {

        openModalEdit(element)
    });
    const fecharBtn = modal.querySelector('.modal_fechar');

    fecharBtn.addEventListener('click', (event) => {
        modal.style.display = 'none';


    });
}

export async function openModalEdit(element) {
    const modal = document.querySelector('.modal');
    modal.classList.add('modal_edit');
    modal.innerHTML = `
    <div class="modal_conteudo_editar">
        <span class="modal_fechar">&times;</span>
        <input type="text" id="edit_description" value="${element.descricao}">
        <input type="text" id="edit_Imagem" value="${element.imagem}">
        <input type="number" id="edit_preco" value="${element.preco}">
        <input type="text" id="edit_titulo" value="${element.titulo}">
        <input type="text" id="edit_tipo" value="${element.tipo}">
        <button class="modal_salvar">Salvar</button>
    </div>
    `;
    const fecharBtn = modal.querySelector('.modal_fechar');

    fecharBtn.addEventListener('click', (event) => {
        modal.style.display = 'none';
    });
    const modal_salvar = modal.querySelector('.modal_salvar');



    modal_salvar.addEventListener('click', async (event) => {
        const produtoUpdate = {
            titulo: document.querySelector("#edit_titulo").value,
            descricao: document.querySelector("#edit_description").value,
            imagem: document.querySelector("#edit_Imagem").value,
            preco: document.querySelector("#edit_preco").value,
            tipo: document.querySelector("#edit_tipo").value
        }
        const aslvarCardapio = await fetch(`${baseUrl}/api/CardapioItem/${element.id}`, {
            method: "PUT",
            headers: heders,
            body: JSON.stringify(produtoUpdate)
        })

        modal.style.display = 'none';
        window.location.reload()

    });
}

