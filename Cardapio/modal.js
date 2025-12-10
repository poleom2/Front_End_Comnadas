// import { listarCardapio } from "../Cardapio/script.js";
const baseUrl = "https://localhost:7004"
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
         <label for="edit_description"> Descrição</label>
        <input type="text" id="edit_description" value="${element.descricao}">
         <label for="edit_Imagem">Imagem</label>
        <input type="text" id="edit_Imagem" value="${element.imagem}">
         <label for="edit_preco">Preço</label>
        <input type="number" id="edit_preco" value="${element.preco}">
         <label for="edit_titulo">Titulo</label>
        <input type="text" id="edit_titulo" value="${element.titulo}">
         <label for="edit_tipo">Tipo</label>
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
    const fecharBtn = modal.querySelector('.modal_fechar');

    fecharBtn.addEventListener('click', (event) => {
        modal.style.display = 'none';
    });
    const modal_salvar = modal.querySelector('.modal_salvar');
    
    
    modal_salvar.addEventListener('click', async (event) => {
        let tipo = ""
        let categoriaCardapioId = 0
            if(document.getElementById("tipo_lanche").checked){
                tipo = document.getElementById("tipo_lanche").value
                categoriaCardapioId=1
            }else if(document.getElementById("tipo_pratos").checked){
                tipo = 3
            }else if(document.getElementById("tipo_bebidas").checked){
                tipo = 2
            }
        const produtoUpdate = {
            titulo: document.querySelector("#edit_titulo").value,
            descricao: document.querySelector("#edit_description").value,
            imagem: document.querySelector("#edit_Imagem").value,
            preco: document.querySelector("#edit_preco").value,
            tipo: tipo,
            categoriaCardapioId: categoriaCardapioId
        }
        console.log(produtoUpdate)
        const aslvarCardapio = await fetch(`${baseUrl}/api/CardapioItem/${element.id}`, {
            method: "PUT",
            headers: heders,
            body: JSON.stringify(produtoUpdate)
        })


        modal.style.display = 'none';
         window.location.reload()

    });
}

