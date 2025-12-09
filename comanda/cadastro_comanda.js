const baseUrl = "https://localhost:7004";
const headers = { "Content-Type": "application/json" };
const $ = (sel) => document.querySelector(sel);


async function carregarMesasPagina() {
    const selectMesa = $("#numeroMesa");
    if (!selectMesa) return;

    try {
        const response = await fetch(`${baseUrl}/api/Mesa`, { headers });
        const mesas = await response.json();

        mesas.forEach(mesa => {
            if (mesa.situacaoMesa === 0) {
                selectMesa.insertAdjacentHTML(
                    "beforeend",
                    `<option value="${mesa.numeroMesa}">${mesa.numeroMesa}</option>`
                );
            }
        });
    } catch (error) {
        console.error("Erro ao carregar mesas:", error);
    }
}

async function carregarItensPagina() {
    const selectItens = $("#itens");
    if (!selectItens) return;

    try {
        const responseItens = await fetch(`https://localhost:7004/api/CardapioItem`, { headers });
        const itens = await responseItens.json();


        itens.forEach(item => {
            selectItens.insertAdjacentHTML(
                "beforeend",
                `<option value="${item.id}">${item.titulo}</option>`
            );
        });
    } catch (error) {
        console.error("Erro ao carregar itens:", error);
    }
}





const btnSalvar = $(".btn_salvarcomanda");

if (btnSalvar) {
    btnSalvar.addEventListener("click", async () => {
        const nomeCliente = $("#nomeCliente").value.trim();
        const numeroMesa = $("#numeroMesa").value;
        const itensSelecionados = [...$("#itens").selectedOptions].map(o => o.value);

        if (!nomeCliente || !numeroMesa || itensSelecionados.length === 0 || numeroMesa === null) {
            alert("Preencha todos os campos.");
            return;
        }

        const novaComanda = { nomeCliente, numeroMesa: Number(numeroMesa), cardapioItemIds: itensSelecionados };

        try {
            const responseSalvar = await fetch(`https://localhost:7004/api/Comanda`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(novaComanda)
            });

            if (!responseSalvar.ok) throw new Error();

            alert("Comanda cadastrada com sucesso!");
            window.location.href = "../comanda/index.html";
        } catch (e) {
            alert("Falha ao cadastrar comanda.");
        }
    });
}




export async function openNovaComanda() {

    const modal = $("#cadastroComandaModal");
    modal.style.display = "block";

    modal.innerHTML = `
        <div class="cadastro_comanda_modal">
            <div class="cadastro_comanda_conteudo">

                <button class="cadastro_comanda_fechar">&times;</button>

                <h2>Cadastro de Nova Comanda</h2>

                <form id="cadastroComandaForm">

                    <label>Nome do Cliente:</label>
                    <input type="text" id="nomeClienteModal" required>

                    <label>Número da Mesa:</label>
                    <select id="numeroMesaModal" required></select>

                    <label>Itens :</label>
                    <select id="itensModal" multiple></select>

                    <button type="submit" class="btn_finalizar">Cadastrar Comanda</button>
                    
                </form>

            </div>
        </div>
    `;


    $(".cadastro_comanda_fechar").onclick = () => (modal.style.display = "none");

    $(".btn_cancelar").onclick = () => (
        window.location.href = "../comanda/index.html"

    );




    $("#cadastroComandaForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const nomeCliente = $("#nomeClienteModal").value.trim();
        const numeroMesa = $("#numeroMesaModal").value;
        const itensSelecionados = [...$("#itensModal").selectedOptions].map(o => o.value);

        const novaComanda = {
            nomeCliente,
            numeroMesa: Number(numeroMesa),
            cardapioItemIds: itensSelecionados
        };

        try {
            const resp = await fetch(`https://localhost:7004/api/Comanda`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(novaComanda)
            });

            if (!resp.ok) throw new Error();

            alert("Comanda cadastrada com sucesso!");
            modal.style.display = "none";
            location.reload();

        } catch {
            alert("Erro ao cadastrar comanda.");
        }
    });




    try {
        const responseMesa = await fetch(`${baseUrl}/api/Mesa`, { headers });
        const mesas = await responseMesa.json();

        const selectMesa = $("#numeroMesaModal");

        mesas.forEach(mesa => {
            if (mesa.situacaoMesa === 0) {
                selectMesa.insertAdjacentHTML(
                    "beforeend",
                    `<option value="${mesa.numeroMesa}">${mesa.numeroMesa}</option>`
                );
            }
        });

    } catch {
        alert("Erro ao carregar mesas.");
    }



    try {
        const responseItens = await fetch(`https//api/ItensCardapio`, { headers });
        const itens = await responseItens.json();

        const selectItens = $("#itensModal");

        itens.forEach(item => {
            selectItens.insertAdjacentHTML(
                "beforeend",
                `<option value="${item.id}">${item.nomeItem}</option>`
            );
        });

    } catch {
        alert("Erro ao carregar itens do cardápio.");
    }
}


//
// ========== CARREGAR SELECTS DA PÁGINA AO ABRIR ==========
//
carregarMesasPagina();
carregarItensPagina();


