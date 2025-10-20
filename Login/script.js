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
    const nome = document.querySelector("email");
        const senha = document.querySelector("password");
        const modal = document.querySelector(".Modal");
    loginButton.addEventListener('submit',async (e) => {
        
        e.preventDefault()
        if(nome =='Miguel' && senha == '1234'){
            window.location.href = '../Home/index.html';

        }else{
             modal.style.display = "block";
             
        }
        console.log('Login button clicked');
    });
   
}
Login();