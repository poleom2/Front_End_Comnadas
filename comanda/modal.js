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


    const total = element.Total || (element.Itens ? element.Itens.reduce((sum, item) => sum + (item.Preco || 0), 0) : 0);


    const itensFormatados = element.Itens && Array.isArray(element.Itens)
        ? element.Itens.map(item => `${item.Titulo || 'Item desconhecido'} - R$ ${item.Preco || 0}`).join(', ')
        : 'Nenhum item encontrado';

    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="Itens_comanda_modal">
        <div class="detalhes_comanda">
        <button class="detalhes_comanda_fechar">&times;</button>
        <h2>Detalhes da Comanda</h2>
                <p><strong>Cliente:</strong> ${element.NomeCliente || element.nomeCliente || 'N/A'}</p>
                <p><strong>Mesa:</strong> ${element.NumeroMesa || element.numeroMesa || 'N/A'}</p>
                <p><strong>Itens:</strong> ${itensFormatados}</p>
                <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
            </div>
        </div>
    `;

    const fecharBtn = modal.querySelector('.detalhes_comanda_fechar');
    fecharBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}