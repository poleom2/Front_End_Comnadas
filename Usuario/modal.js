const baseUrl = "http://localhost:5211";
const headers = {
    "Content-Type": "application/json"
};

export function openModalDesc(element) {
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
            <button class="modal_salvar" disabled>Carregando...</button>
        </div>
    `;

    const fecharBtn = modal.querySelector('.modal_fechar');
    const salvarBtn = modal.querySelector('.modal_salvar');
    const nomeInput = document.getElementById('edit_nome');
    const emailInput = document.getElementById('edit_email');


    const validarEntradas = () => {
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        salvarBtn.disabled = !nome || !emailRegex.test(email);
        salvarBtn.textContent = salvarBtn.disabled ? 'Preencha todos os campos corretamente' : 'Salvar';
    };

    nomeInput.addEventListener('input', validarEntradas);
    emailInput.addEventListener('input', validarEntradas);
    validarEntradas();

    const fecharModal = () => {
        modal.style.display = 'none';

        fecharBtn.removeEventListener('click', fecharModal);
        salvarBtn.removeEventListener('click', salvarAlteracoes);

    };


    const salvarAlteracoes = async () => {
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();

        if (nome || email.includes("@")) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        salvarBtn.disabled = true;
        salvarBtn.textContent = 'Salvando...';

        const usuarioUpdate = { nome: nome, email: email };

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
