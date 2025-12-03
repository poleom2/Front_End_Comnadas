const baseUrl = "https://localhost:7004"
const headers = {
    "Content-Type": "application/json"
}

export async function openNovaComanda() {
    const modal = document.querySelector('.ModalComanda');
    if (!modal) {
        console.error("Erro: Elemento '.ModalComanda' não encontrado no HTML.");
        return;
    }
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="cadastro_comanda_modal">
            <div class="cadastro_comanda_conteudo">
                <button class="cadastro_comanda_fechar">&times;</button>
                <h2>Cadastro de Nova Comanda</h2>
                <form id="cadastroComandaForm">
                    <label for="nomeCliente">Nome do Cliente:</label>
                    <input type="text" id="nomeCliente" name="nomeCliente" required>
                    <label for="numeroMesa">Número da Mesa:</label>
                    <input type="number" id="numeroMesa" name="numeroMesa" required>
                    <button type="submit">Cadastrar Comanda</button>
                </form>
            </div>
        </div>
    `;
    const fecharBtn = modal.querySelector('.cadastro_comanda_fechar');
    fecharBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const form = modal.querySelector('#cadastroComandaForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nomeCliente = form.nomeCliente.value;
        const numeroMesa = form.numeroMesa.value;
        const novaComanda = {
            nomeCliente: nomeCliente,
            numeroMesa: parseInt(numeroMesa)
        };
        try {
            const resposta = await fetch(`${baseUrl}/api/Comanda`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(novaComanda)
            });

            if (resposta.ok) {
                alert('Comanda cadastrada com sucesso!');
                modal.style.display = 'none';
                location.reload();
            }
        } catch (error) {
            console.error('Erro ao cadastrar comanda:', error);
        }
    });
}