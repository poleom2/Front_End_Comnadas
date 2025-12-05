const baseUrl = "https://localhost:7004";
const headers = {
    "Content-Type": "application/json"
};

export async function openModalComanda(element) {
    if (!element) {
        console.error("Erro: Elemento da comanda não fornecido.");
        return;
    }

    const modal = document.querySelector('.ModalComanda');
    if (!modal) {
        console.error("Erro: Elemento '.modal' não encontrado no HTML.");
        return;
    }

    let total = 0;
    let itensMap = new Map(); //Maps pra itens por título

    for (let item of element.Itens || element.itens || []) {
        console.log("Item da comanda:", item);
        const itemPreco = item.Preco || item.preco || 0;
        const itemQuantidade = item.quantidade || 1;
        const itemNome = item.titulo;
        //título
        if (itensMap.has(itemNome)) {
            //somar a quantidade
            itensMap.get(itemNome).quantidade += itemQuantidade;
        } else {
            // adicionar novo
            itensMap.set(itemNome, { quantidade: itemQuantidade, preco: itemPreco });
        }
    }


    let consrucaoTela = '';
    for (let [nome, dados] of itensMap) {
        const subtotal = dados.preco * dados.quantidade;
        total += subtotal;
        consrucaoTela += `${nome} (Qtd: ${dados.quantidade}, Preço: R$ ${dados.preco.toFixed(2)}),</br>`;

    }
    if (consrucaoTela.endsWith(',</br>')) {
        consrucaoTela = consrucaoTela.slice(0, -2);
    }




    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="Itens_comanda_modal">
            <div class="detalhes_comanda">
                <button class="detalhes_comanda_fechar">&times;</button>
                <h2>Detalhes da Comanda</h2>
                <p><strong>Cliente:</strong> ${element.NomeCliente || element.nomeCliente || 'N/A'}</p>
                <p><strong>Mesa:</strong> ${element.NumeroMesa || element.numeroMesa || 'N/A'}</p>
                <p><strong>Itens:</strong><br> ${consrucaoTela || 'Nenhum item'}</p>
                <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
            </div>
        </div>
    `;

    // Evento para fechar o modal
    const fecharBtn = modal.querySelector('.detalhes_comanda_fechar');
    fecharBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar ao clicar fora do modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}
