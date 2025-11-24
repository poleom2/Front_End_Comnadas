const baseUrl = "http://localhost:7004";
const headers = {
    "Content-Type": "application/json"
};

export function openModalEditar(element) {
    console.log("Modal de edição aberto");
    const modal = document.querySelector('.modal');
    if (!modal) {
        console.error("Elemento modal não encontrado");
        return;
    }

    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal_conteudo_editar" role="dialog" aria-labelledby="modal-titulo">
            <span class="modal_fechar" aria-label="Fechar">&times;</span>
            <h2 id="modal-titulo">Editar Usuário</h2>
            <label for="edit_nome">Nome:</label>
            <input type="text" id="edit_nome" value="${element.nome || ''}" placeholder="Digite o nome" required>
            <label for="edit_email">Email:</label>
            <input type="email" id="edit_email" value="${element.email || ''}" placeholder="Digite o email" required>
            <label for="edit_senha">Senha:</label>
            <input type="senha" id="edit_senha" value="${element.senha || ''}" placehalder="Digite a senha" requires>
            <button class="modal_salvar" disabled>Salvar</button>
        </div>
    `;

    const fecharBtn = modal.querySelector('.modal_fechar');
    const salvarBtn = modal.querySelector('.modal_salvar');
    const nomeInput = document.getElementById('edit_nome');
    const emailInput = document.getElementById('edit_email');
    const senhaInput = document.getElementById('edit_senha');

    const validarEntradas = () => {
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();
        const isValid = nome && email && email.includes('@') && senha;
        salvarBtn.disabled = !isValid;
        salvarBtn.textContent = isValid ? 'Salvar' : 'Preencha os campos';
    };

    nomeInput.addEventListener('input', validarEntradas);
    emailInput.addEventListener('input', validarEntradas);
    senhaInput.addEventListener('input', validarEntradas);
    validarEntradas();

    const fecharModal = () => {
        modal.style.display = 'none';
    };

    const salvarAlteracoes = async () => {
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        if (!nome || !email || !email.includes('@') || !senha) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        salvarBtn.disabled = true;
        salvarBtn.textContent = 'Salvando...';

        const usuarioUpdate = { nome: nome, email: email, senha: senha };

        try {
            const response = await fetch(`${baseUrl}/api/Usuario/${element.id}`, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(usuarioUpdate)
            });
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status} - ${response.statusText}`);
            }

            alert("Usuário atualizado com sucesso!");
            fecharModal();

            if (typeof listarUsuarios === 'function') {
                listarUsuarios();
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            alert(`Erro ao salvar alterações: ${error.message}. Tente novamente.`);
            salvarBtn.disabled = false;
            salvarBtn.textContent = 'Salvar';
        }
    };


    fecharBtn.addEventListener('click', fecharModal);
    salvarBtn.addEventListener('click', salvarAlteracoes);
}
