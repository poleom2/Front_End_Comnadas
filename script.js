const baseUrl = "http://localhost:7004"
const headers = {
    "content-type": "application/json; charset=utf-8"
};

//armazenar os usuários buscados
let users = [];

async function getUsers() {
    try {
        const response = await fetch("https://localhost:7004/api/Usuario", {
            headers: headers
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        users = await response.json();

    } catch (error) {
        console.error("Erro ao buscar usuários:", error);

    }
}


getUsers();

function Login() {
    const loginButton = document.querySelector('form');

    loginButton.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginAlert();
    });
}

Login();

function toastify(tipo, message) {
    document.body.insertAdjacentHTML("beforeend", `
        <div class="toastify ${tipo}">
            <p>${message}</p>
        </div>
    `);
    const toastifyElement = document.querySelector('.toastify');
    setTimeout(() => {
        toastifyElement.remove();
    }, 3000);
}

function loginAlert() {
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!email || !password) {
        toastify("erro", "Preencha email e senha!");
        return;
    }

    verificarUsuario(email, password);
}

function verificarUsuario(email, password) {
    let usuarioEncontrado = null;

    // Percorre os usuários
    users.forEach(user => {
        if (user.email === email && user.senha === password) {
            usuarioEncontrado = user;
        }
    });

    if (usuarioEncontrado) {
        toastify("sucesso", "Login realizado com sucesso!");
        setTimeout(() => {
            location.href = '../Home/index.html';
        }, 3000);
    } else {
        toastify("erro", "Email ou senha incorretos!");
    }
}


