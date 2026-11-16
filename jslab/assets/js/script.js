// UNIDADE 1 — DOM Básico
// Apenas selecionamos elementos e confirmamos que dados.js já chegou aqui.

const elementoContador = document.querySelector("#contador-pedidos")
const elementoLista = document.querySelector("#lista-pedidos")
const elementoMensagemVazia = document.querySelector("#mensagem-vazia")
const elementoBusca = document.querySelector("#campo-busca")
const elementoFiltroCategoria = document.querySelector("#filtro-categoria")
const elementoFiltroStatus = document.querySelector("#filtro-status")
const elementoBotaoOrdenar = document.querySelector("#botao-ordenar-valor")

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

// UNIDADE 3 — Eventos, busca, filtro, ordenação e navegação

// Preenche os <select> dinamicamente a partir dos valores existentes em `pedidos`,
// evitando hardcode e mantendo os filtros sempre sincronizados com os dados.
function preencherOpcoes(selectElemento, valores) {
    valores.forEach((valor) => {
        const opcao = document.createElement("option")
        opcao.value = valor
        opcao.textContent = valor
        selectElemento.append(opcao)
    })
}

const categoriasUnicas = [...new Set(pedidos.map((p) => p.categoria))]
const statusUnicos = [...new Set(pedidos.map((p) => p.status))]

preencherOpcoes(elementoFiltroCategoria, categoriasUnicas)
preencherOpcoes(elementoFiltroStatus, statusUnicos)

let direcaoOrdenacao = "asc"

// Ordena por valor sem mutar o array original (`slice()` cria uma cópia).
function ordenarPorValor(lista, direcao) {
    return lista.slice().sort((a, b) => {
        return direcao === "asc" ? a.valor - b.valor : b.valor - a.valor
    })
}

// Única função que decide o que aparece na tela: lê os controles, filtra,
// ordena e renderiza. É chamada por todo evento relevante.
function aplicarFiltros() {
    const termoBusca = elementoBusca.value.trim().toLowerCase()
    const categoriaSelecionada = elementoFiltroCategoria.value
    const statusSelecionado = elementoFiltroStatus.value

    let resultado = pedidos.filter((pedido) => {
        const combinaBusca = pedido.cliente.toLowerCase().includes(termoBusca)
        const combinaCategoria = categoriaSelecionada === "todas" || pedido.categoria === categoriaSelecionada
        const combinaStatus = statusSelecionado === "todos" || pedido.status === statusSelecionado

        return combinaBusca && combinaCategoria && combinaStatus
    })

    resultado = ordenarPorValor(resultado, direcaoOrdenacao)
    renderizarPedidos(resultado)
}

elementoBusca.addEventListener("input", aplicarFiltros)
elementoFiltroCategoria.addEventListener("change", aplicarFiltros)
elementoFiltroStatus.addEventListener("change", aplicarFiltros)

elementoBotaoOrdenar.addEventListener("click", () => {
    direcaoOrdenacao = direcaoOrdenacao === "asc" ? "desc" : "asc"
    elementoBotaoOrdenar.textContent = direcaoOrdenacao === "asc" ? "Ordenar por valor ▲" : "Ordenar por valor ▼"
    aplicarFiltros()
})

// Delegação de eventos: um único listener no container cuida de todos os
// botões "Ver detalhes", incluindo os que ainda serão criados em renderizações futuras.
elementoLista.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".botao-detalhes")
    if (!botao) return // o clique não foi em um botão de detalhes

    const parametros = new URLSearchParams({ id: botao.dataset.id })
    window.location.href = `detalhes.html?${parametros.toString()}`
})

aplicarFiltros() // renderização inicial, já passando pelo pipeline de filtros/ordenação
