// UNIDADE 1 — DOM Básico
// Apenas selecionamos elementos e confirmamos que dados.js já chegou aqui.

const elementoContador = document.querySelector("#contador-pedidos")
const elementoLista = document.querySelector("#lista-pedidos")
const elementoMensagemVazia = document.querySelector("#mensagem-vazia")

// `pedidos` vem de dados.js (carregado antes, veja a ordem dos <script> no HTML)
elementoContador.textContent = `${pedidos.length} pedido(s) cadastrado(s)`

// UNIDADE 2 — Renderização

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
})

// Mapeia o status para uma classe CSS, para estilização futura (badge colorido).
function classeDoStatus(status) {
    const classes = {
        "Pendente": "status-pendente",
        "Em trânsito": "status-transito",
        "Entregue": "status-entregue",
        "Cancelado": "status-cancelado",
    }
    return classes[status] ?? "status-padrao"
}

// Cria o <li> correspondente a UM pedido. Função pequena, uma responsabilidade.
function criarItemPedido(pedido) {
    const item = document.createElement("li")
    item.classList.add("item-pedido")
    item.dataset.id = pedido.id

    item.innerHTML = `
        <strong>#${pedido.id} — ${pedido.cliente}</strong>
        <span class="categoria">${pedido.categoria}</span>
        <span class="prioridade">Prioridade: ${pedido.prioridade}</span>
        <span class="status ${classeDoStatus(pedido.status)}">${pedido.status}</span>
        <span class="valor">${formatadorMoeda.format(pedido.valor)}</span>
        <button type="button" class="botao-detalhes" data-id="${pedido.id}">Ver detalhes</button>
    `

    return item
}

// Recebe uma lista (já filtrada/ordenada) e desenha na tela.
function renderizarPedidos(lista) {
    elementoLista.innerHTML = "" // limpa a renderização anterior

    const estaVazia = lista.length === 0
    elementoMensagemVazia.hidden = !estaVazia
    if (estaVazia) return

    const itens = lista.map(criarItemPedido)
    elementoLista.append(...itens)
}

renderizarPedidos(pedidos) // primeira renderização, com todos os pedidos
