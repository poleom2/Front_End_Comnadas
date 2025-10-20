// const baseUrl = "http://localhost:5257"

// const headers ={
//             "content-type":	"application/json; charset=utf-8"
//         }
// async function getUsers(){
//     const response = await fetch(`${baseUrl}/api/Usuario
// `)
//     const users = await response.json()

// }
// getUsers()

function Login() {
    const loginButton = document.querySelector('form');
       
    loginButton.addEventListener('submit',async (e) => {  
        e.preventDefault()
        loginAlert()
    });
   
}
Login();
function toastify(tipo,message){
     document.body.insertAdjacentHTML("beforeend", `
     <div class="toastify ${tipo}">
            <p>${message}</p
    >
     </div>
     `);
     const toastify = document.querySelector('.toastify');
     setTimeout(() => {
        toastify.remove();
     },3000);
}
function loginAlert(){
   const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    console.log(email.value);
    console.log(password.value);    
    if(email.value == 'Miguel' && password.value == '1234')
        {
       
        toastify("sucesso","Login realizado com sucesso!");
        setTimeout(() => {
        location.href = '../Home/index.html';
        }, 3000);
     }
    else
        {
            toastify("erro","Email ou senha incorretos!")
       
     }
}
