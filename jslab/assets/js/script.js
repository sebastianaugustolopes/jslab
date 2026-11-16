// UNIDADE 1 — DOM Básico
// Apenas selecionamos elementos e confirmamos que dados.js já chegou aqui.

const elementoContador = document.querySelector("#contador-pedidos")
const elementoLista = document.querySelector("#lista-pedidos")

// `pedidos` vem de dados.js (carregado antes, veja a ordem dos <script> no HTML)
elementoContador.textContent = `${pedidos.length} pedido(s) cadastrado(s)`

console.log("Elementos encontrados:", { elementoContador, elementoLista })
