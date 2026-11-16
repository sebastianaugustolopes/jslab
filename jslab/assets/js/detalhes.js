// Lê o parâmetro `id` da URL (ex: detalhes.html?id=3) e mostra os dados
// daquele pedido, buscando-o no array `pedidos` (vindo de dados.js).

const elementoDetalhes = document.querySelector("#detalhes-pedido")

const parametros = new URLSearchParams(window.location.search)
const idPedido = Number(parametros.get("id"))

const pedido = pedidos.find((p) => p.id === idPedido)

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
})

function renderizarDetalhes(pedido) {
    if (!pedido) {
        elementoDetalhes.innerHTML = "<p>Pedido não encontrado.</p>"
        return
    }

    elementoDetalhes.innerHTML = `
        <h1>Pedido #${pedido.id}</h1>
        <p><strong>Cliente:</strong> ${pedido.cliente}</p>
        <p><strong>Categoria:</strong> ${pedido.categoria}</p>
        <p><strong>Prioridade:</strong> ${pedido.prioridade}</p>
        <p><strong>Status:</strong> ${pedido.status}</p>
        <p><strong>Valor:</strong> ${formatadorMoeda.format(pedido.valor)}</p>
    `
}

renderizarDetalhes(pedido)
