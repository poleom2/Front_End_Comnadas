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
async function modal_Reserva() {
   
    const modal_Reserva = document.querySelector(".modal")
    modal_Reserva.style.display = "block"
    modal_Reserva.innerHTML = `
    <div class="modal-conteudo-reserva">
        <span class="modal_fechar">&times;</span>
        <h2>Reservar Mesa</h2>
        <input type="text" id="nome_reserva" placeholder="Nome para Reserva">
        <input type="number" id="numero_telefone_reserva" placeholder="Número do Telefone">

         <select name="" id="slectmesa">
    
            
        </select>
        <button class="modal_reservar_mesa">Reservar Mesa</button>
    </div>  
    `
    const selectMesa = document.querySelector('#slectmesa');
     const response = await fetch("https://localhost:7004/api/Mesa", {
        headers: heders
    })
    const MesaLista = await response.json()
    MesaLista.forEach(item => {
        console.log(item)
        if(item.situacaoMesa==0){

            selectMesa.insertAdjacentHTML('afterbegin', 
                `<option value="${item.numeroMesa}">${item.numeroMesa} </option>`
            );
        }
    
       // selectMesa.appendChild(option);
    })
    const fecharBtn = modal_Reserva.querySelector('.modal_fechar');
    fecharBtn.addEventListener('click', (event) => {
        modal_Reserva.style.display = 'none';
    }
    );
    const reservarMesaBtn = modal_Reserva.querySelector('.modal_reservar_mesa');
    reservarMesaBtn.addEventListener('click', async (event) => {
       
        const mesa_reserva = {
            nomeCliente: document.querySelector("#nome_reserva").value,
            telefone: document.querySelector("#numero_telefone_reserva").value,
            numeroMesa: Number(document.querySelector("#slectmesa").value),
            situacaoMesa: 1
        }
        const reservarMesa = await fetch(`${baseUrl}/api/Reservas`, {
            method: "POST",
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