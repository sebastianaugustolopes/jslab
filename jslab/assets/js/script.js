const produtos = ["banana", "maçã", "pera"]
const valores = [10, 15, 20]
const desconto = [0, 5, 0]

let soma = 0
let totalDesconto = 0

for(let x = 0; x < produtos.length; x++){
    console.log(`Produto: ${produtos[x]}, preço: ${valores[x]}`)
    let valorDesconto = (valores[x] * desconto[x]) / 100

    if(desconto[x] > 0){
        console.log(`Esse produto tem desconto de ${desconto[x]}%`)
    }
    totalDesconto += valorDesconto
    soma += valores[x]
}

let valorFinal = soma - totalDesconto

console.log(soma)
console.log(totalDesconto)
console.log(valorFinal)

console.log(typeof soma)
console.log(typeof totalDesconto)
console.log(typeof produtos)