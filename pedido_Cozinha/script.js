console.log('pedido_Cozinha script loaded');
const baseUrl = "https://localhost:7004";
const headers = { "Content-Type": "application/json" };

async function Lista_PedidosCozinha() {
    const response = await fetch(`${baseUrl}/api/PedidoCozinha`, { headers });
    const pedidosCozinha = await response.json();

    const modal = document.querySelector('.modal');
    if (!modal) return;

    let container = modal.querySelector('.pedidos_container');
    if (!container) {
        container = document.createElement('div');
        container.classList.add('pedidos_container');
        modal.appendChild(container);
    }
    container.innerHTML = '';

    const ul = document.createElement('ul');
    ul.classList.add('pedidos_list');
    container.appendChild(ul);

    pedidosCozinha.forEach(pedido => {
        const li = document.createElement('li');
        li.classList.add('pedido_item');

        const header = document.createElement('div');
        header.classList.add('pedido_header');
        header.innerHTML = `<h3>Mesa: ${pedido.numeroMesa}</h3>`;

        const buttons = document.createElement('div');
        buttons.classList.add('pedido_buttons');

        // edit modal removed — no verMais button

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remuve';
        removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        removeBtn.addEventListener('click', async () => {
            const ok = confirm('Deseja realmente excluir este pedido?');
            if (!ok) return;
            const resp = await fetch(`${baseUrl}/api/PedidoCozinha/${pedido.id}`, { method: 'DELETE', headers });
            if (resp.ok) {
                li.remove();
            } else {
                alert('Erro ao excluir pedido');
            }
        });

        buttons.appendChild(removeBtn);
        header.appendChild(buttons);
        li.appendChild(header);

        const itensUl = document.createElement('ul');
        itensUl.classList.add('itens_pedido');
        pedido.items.forEach(item => {
            const itemLi = document.createElement('li');
            itemLi.innerHTML = `<h4>${item.titulo}</h4>`;
            itensUl.appendChild(itemLi);
        });

        li.appendChild(itensUl);
        ul.appendChild(li);
    });
}

Lista_PedidosCozinha();

// edit modal functionality removed

function Modal_DeNavegacao() {
    const ModalNavegacao = document.querySelector('.ModalNavegacao');
    ModalNavegacao.innerHTML = `
        <button class="btn_navegar">
            <i class="fa-solid fa-bars"></i>
        </button>
    `;

    const btnNavegar = document.querySelector('.btn_navegar');
    if (btnNavegar) btnNavegar.addEventListener('click', () => { Modalnavegar(); });
}

Modal_DeNavegacao();

function Modalnavegar() {
    const ModalNavegacao = document.querySelector('.ModalNavegacao');
    ModalNavegacao.innerHTML = `
    <nav class="navegacao_links">
        <button class="btn_fecharnavegar">&times;</button>
        <a href="../Home/index.html">Home</a>
        <a href="../Cardapio/index.html">Cadapio</a>
        <a href="../Mesa/index.html">Mesa</a>
        <a href="../comanda/index.html">Comanda</a>
    </nav>
    `;
    const btnFecharNavegar = document.querySelector('.btn_fecharnavegar');
    if (btnFecharNavegar) {
        btnFecharNavegar.addEventListener('click', () => {
            ModalNavegacao.style.display = 'none';
            window.location.reload();
        });
    }
}