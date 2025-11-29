import { baseUrl, heders } from "./script.js";

 function modal() {
    const buttonNovaMesa = document.querySelector(".btn_novaMesa")
    buttonNovaMesa.addEventListener("click", () => {
        modal_Novamesa();
    } )
 }
 function modal_Novamesa() {
    const modal_Novamesa = document.querySelector(".modal")

    modal_Novamesa.style.display = "block"
    modal_Novamesa.innerHTML = `
    <div class="modal-conteudo-novamesa">
        <span class="modal_fechar">&times;</span>
        <h2>Criar Nova Mesa</h2>
        <input type="number" id="numero_mesa" placeholder="Número da Mesa">
        <button class="modal_criar_mesa">Criar Mesa</button>
    </div>
    `
    const fecharBtn = modal_Novamesa.querySelector('.modal_fechar');
    fecharBtn.addEventListener('click', (event) => {
        modal_Novamesa.style.display = 'none';
    });
    const criarMesaBtn = modal_Novamesa.querySelector('.modal_criar_mesa');
    criarMesaBtn.addEventListener('click', async (event) => {
        const numeroMesa = document.querySelector("#numero_mesa").value;
        const mesa_nova = {
            numeroMesa: Number(numeroMesa),
            situacaoMesa: 0
        
        }
        const salvarMesa = await fetch(`${baseUrl}/api/Mesa`, {
            method: "POST",
            headers: heders,
            body: JSON.stringify(mesa_nova)
        });
        console.log(salvarMesa);
        if(salvarMesa.ok){
            
            window.location.reload()
        }
    });
}
modal();
function reserva(){
    const buttonReserva = document.querySelector(".btn_reservarMesa")
    buttonReserva.addEventListener("click", () => {
        modal_Reserva();
    } )
}
function modal_Reserva() {
    const list = [{nome:"abacaxi",id:1},{nome:"manga",id:2}]
    const modal_Reserva = document.querySelector(".modal")
    modal_Reserva.style.display = "block"
    modal_Reserva.innerHTML = `
    <div class="modal-conteudo-reserva">
        <span class="modal_fechar">&times;</span>
        <h2>Reservar Mesa</h2>
        <input type="text" id="nome_reserva" placeholder="Nome para Reserva">
        <input type="number" id="numero_telefone_reserva" placeholder="Número do Telefone">

         <select name="" id="slectmesa">
            ${list.map(item => `<option value="${item.id}">${item.nome}</option>`)}
            
        </select>
        <button class="modal_reservar_mesa">Reservar Mesa</button>
    </div>  
    `
    
    const fecharBtn = modal_Reserva.querySelector('.modal_fechar');
    fecharBtn.addEventListener('click', (event) => {
        modal_Reserva.style.display = 'none';
    }
    );
    const reservarMesaBtn = modal_Reserva.querySelector('.modal_reservar_mesa');
    reservarMesaBtn.addEventListener('click', async (event) => {
        const slectmesa = document.querySelector("#slectmesa").value
        console.log(slectmesa)
        const numeroMesaReserva = document.querySelector("#numero_mesa_reserva").value;
        const mesa_reserva = {
            numeroMesa: Number(numeroMesaReserva),
            situacaoMesa: 1
        }
        const reservarMesa = await fetch(`${baseUrl}/api/Mesa/ReservarMesa`, {
            method: "PUT",
            headers: heders,
            body: JSON.stringify(mesa_reserva)
        });
        console.log(reservarMesa);
        if(reservarMesa.ok){
            window.location.reload()
        }   
    });
}
reserva();  