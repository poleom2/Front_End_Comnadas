import { openModalEditar } from "./modal.js";

const baseUrl = "http://localhost:7004";
const headers = {
    "Content-Type": "application/json"
};

document.addEventListener("DOMContentLoaded", () => {
    listarUsuarios();

    const novoUsuario = document.querySelector(".btn_novousuario");
    if (novoUsuario) {
        novoUsuario.addEventListener('click', () => {
            console.log("click");
            openNovoUsuario();
        });
    }
});

// listar usuários
async function listarUsuarios() {
    try {
        const response = await fetch(`https://localhost:7004/api/Usuario`, {
            headers: headers
        });
        if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);

        const usuarios = await response.json();

        const listaUsuario = document.querySelector(".lista_usuario");
        listaUsuario.innerHTML = "";
        const ul = document.createElement("ul");
        ul.classList.add("ul");
        listaUsuario.appendChild(ul);

        usuarios.forEach(element => {
            const li = document.createElement("li");
            li.classList.add("usuario");
            li.innerHTML = `
                <h3 class="usuario">${element.nome}</h3>
                <span class="usuario">${element.email}</span>
                <button class="usuario_editar" data-id="${element.id}">Ver mais</button>
                <button class="removeBtn" data-id="${element.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;

            // editar
            const verMaisBtn = li.querySelector('.usuario_editar');
            if (verMaisBtn) {
                verMaisBtn.addEventListener('click', () => {
                    openModalEditar(element);
                });
            }

            // remover
            const removeBtn = li.querySelector('.removeBtn');
            if (removeBtn) {
                removeBtn.setAttribute('aria-label', 'Remover usuário');
                removeBtn.addEventListener('click', () => removerUsuario(element, removeBtn));
            }

            ul.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        alert("Erro ao carregar usuários. Verifique o servidor e CORS.");
    }
}

// modal de novo usuário
function openNovoUsuario() {
    const modal = document.querySelector(".modal");
    modal.classList.add('modal_novousuario');
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal_Novo_usuario">
            <span class="modal_fechar">&times;</span>
            <label for="edit_nome">Nome:</label>
            <input type="text" id="edit_nome" placeholder="Digite o nome" required>
            <label for="edit_email">Email:</label>
            <input type="email" id="edit_email" placeholder="Digite o email" required>
            <label for="edit_senha">Senha:</label>
            <input type="password" id="edit_senha" placeholder="Digite a senha" required>
            <button class="modal_salvar">Salvar</button>
        </div>
    `;

    // Fechar 
    const fechar = modal.querySelector(".modal_fechar");
    fechar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Salvar 
    const salvarBtn = modal.querySelector(".modal_salvar");
    salvarBtn.addEventListener('click', async () => {
        const nome = document.getElementById("edit_nome").value.trim();
        const email = document.getElementById("edit_email").value.trim();
        const senha = document.getElementById("edit_senha").value.trim();

        if (!nome || !email || !senha) {
            alert("Preencha todos os campos.");
            return;
        }


        const novoUsuario = {
            nome: nome,
            email: email,
            senha: senha
        };
        try {
            const response = await fetch(`${baseUrl}api/Usuario`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(novoUsuario)
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            alert("Usuário criado com sucesso!");
            modal.style.display = 'none';
            listarUsuarios();
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            alert("Erro ao criar usuário. Tente novamente.");
        }
    });
}

// remover usuário
async function removerUsuario(element, removeBtn) {
    // Confirmação
    if (!confirm("Tem certeza de que deseja excluir este usuário?")) {
        return;
    }


    if (removeBtn) {
        removeBtn.disabled = true;
        removeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    }

    try {

        const deleteResponse = await fetch(`${baseUrl}api/Usuario/${element.id}`, {
            method: "DELETE",
            headers: headers,
        });


        if (deleteResponse.ok) {
            alert("Usuário excluído com sucesso!");
            if (typeof listarUsuarios === 'function') {
                listarUsuarios();
            } else {
                window.location.reload();
            }
        } else {

            const errorData = await deleteResponse.json().catch(() => ({}));
            alert(`Erro ao deletar usuário: ${deleteResponse.status} - ${errorData.message || 'Erro desconhecido'}`);
        }
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        alert(`Erro ao deletar usuário: ${error.message}`);
    } finally {

        if (removeBtn) {
            removeBtn.disabled = false;
            removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        }
    }
}

listarUsuarios();
