function Login() {
    const loginButton = document.querySelector('.login-button');
    
    loginButton.addEventListener('click', () => {
        window.location.href = '../Home/index.html';
    });
   
}
Login();