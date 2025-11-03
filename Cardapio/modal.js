import { listarCardapio } from "./script.js";

export function openModalDesc(element) {
    //abri o modal 1
    console.log("Modal de descrição aberto");
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    modal.innerHTML = `
    <div class="modal-conteudo">
        <span class="modal_fechar">&times;</span>

        <p class="cardapio_descricao">${element.descricao}</p>
        <img src="${element.ImageUrl}" alt="">
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
export function openModalEdit(element) {
    const modal = document.querySelector('.modal');
    modal.classList.add('modal_edit');
    modal.innerHTML = `
    <div class="modal_conteudo_editar">
        <span class="modal_fechar">&times;</span>
        <input type="text" id="edit_description" value="${element.descricao}">
        <input type="text" id="edit_ImageUrl" value="${element.ImageUrl}">
        <input type="number" id="edit_price" value="${element.preco}">
        <input type="text" id="edit_nome" value="${element.nome}">
        <input type="text" id="edit_tipo" value="${element.tipo}">
        <button class="modal_salvar">Salvar</button>
    </div>
    `;
    const fecharBtn = modal.querySelector('.modal_fechar');

    fecharBtn.addEventListener('click', (event) => {
        modal.style.display = 'none';
    });
    const modal_salvar = modal.querySelector('.modal_salvar');
    modal_salvar.addEventListener('click', (event) => {
        element.description = document.querySelector('#edit_description').value;
        element.ImageUrl = document.querySelector('#edit_ImageUrl').value;
        element.price = parseFloat(document.querySelector('#edit_price').value);
        element.nome = document.querySelector('#edit_nome').value;
        element.tipo = document.querySelector('#edit_tipo').value;
        console.log(element);
        //put
        modal.style.display = 'none';
        listarCardapio()
    });


}
