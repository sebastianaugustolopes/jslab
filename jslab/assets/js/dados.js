// Fonte de dados do laboratório. Em uma aplicação real isso viria de uma API,
// mas para o lab usamos um array fixo de objetos (cada um = um pedido).
const pedidos = [
    { id: 1, cliente: "Ana Souza",    categoria: "Eletrônicos", prioridade: "Alta",  status: "Pendente",    valor: 1200.50 },
    { id: 2, cliente: "Bruno Lima",    categoria: "Alimentos",   prioridade: "Baixa", status: "Entregue",    valor: 85.90 },
    { id: 3, cliente: "Carla Dias",    categoria: "Móveis",      prioridade: "Média", status: "Em trânsito", valor: 2499.00 },
    { id: 4, cliente: "Diego Alves",   categoria: "Eletrônicos", prioridade: "Média", status: "Entregue",    valor: 530.00 },
    { id: 5, cliente: "Elaine Rocha",  categoria: "Vestuário",   prioridade: "Baixa", status: "Pendente",    valor: 149.90 },
    { id: 6, cliente: "Felipe Nunes",  categoria: "Móveis",      prioridade: "Alta",  status: "Cancelado",   valor: 899.99 },
]
