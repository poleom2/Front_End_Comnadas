document.addEventListener("DOMContentLoaded", () => {

    const baseUrl = "https://localhost:7004";
    const headers = { "Content-Type": "application/json" };
    const $ = (sel) => document.querySelector(sel);

    //
    // ===================================
    // CARREGAR MESAS NA PÁGINA PRINCIPAL
    // ===================================
    //
    async function carregarMesasPagina() {
        const selectMesa = $("#numeroMesa");
        if (!selectMesa) return;

        try {
            const response = await fetch(`https://localhost:7004/api/Mesa`, { headers });
            if (!response.ok) throw new Error();
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

    //
    // ===================================
    // CARREGAR ITENS NA PÁGINA PRINCIPAL
    // ===================================
    //
    async function carregarItensPagina() {
        const selectItens = $("#itens");
        if (!selectItens) return;

        try {
            const response = await fetch(`https://localhost:7004/api/CardapioItem`, { headers });
            if (!response.ok) throw new Error();
            const itens = await response.json();

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

    //
    // =======================
    // BOTÃO CANCELAR
    // =======================
    //
    const btnCancelar = $(".btn_cancelar");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            window.location.href = "/index.html";
        });
    }

    //
    // =======================
    // SALVAR COMANDA
    // =======================
    const btnSalvar = $(".btn_salvarcomanda");

    if (btnSalvar) {
        console.log("Botão encontrado:", btnSalvar);

        btnSalvar.addEventListener("click", async () => {
            console.log("CLICOU NO BOTÃO SALVAR!");

            try {
                const nomeCliente = $("#nomeCliente").value.trim();
                const numeroMesa = $("#numeroMesa").value;

                let itens = [];

                const selectItens = $("#itens");
                if (selectItens && selectItens.selectedOptions.length > 0) {
                    itens = [...selectItens.selectedOptions].map(o => ({
                        id: Number(o.value),
                        quantidade: 1
                    }));
                }

                const linhas = [...document.querySelectorAll("#listaItensPage .item-linha")];
                if (linhas.length > 0) {
                    itens = linhas.map(l => {
                        const id = Number(l.querySelector(".itemSelectPage")?.value || 0);
                        return { id };
                    }).filter(x => x.id);
                }

                if (!nomeCliente || !numeroMesa || itens.length === 0) {
                    alert("Preencha todos os campos e adicione pelo menos um item.");
                    return;
                }

                const cardapioItemIds = itens.map(i => i.id);

                const novaComanda = {
                    nomeCliente,
                    numeroMesa: Number(numeroMesa),
                    cardapioItemIds
                };


                console.log("Enviando payload:", JSON.stringify(novaComanda));


                const response = await fetch(`https://localhost:7004/api/Comanda`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(novaComanda),
                });

                const text = await response.text();

                if (!response.ok) {
                    console.error("Erro salvar comanda:", response.status, text);
                    let msg = text;
                    try { msg = JSON.parse(text); } catch (e) { }
                    alert("Erro ao cadastrar comanda: " + (msg.message || text || response.status));
                    return;
                }

                alert("Comanda cadastrada com sucesso!");

                window.location.href = "index.html";

            } catch (err) {
                console.error("Erro inesperado ao salvar comanda:", err);
                alert("Erro inesperado ao salvar comanda. Veja o console (F12).");
            }
        });
    } else {
        console.error("Botão .btn_salvarcomanda NÃO encontrado no DOM!");
    }

    carregarMesasPagina();
    carregarItensPagina();

});
