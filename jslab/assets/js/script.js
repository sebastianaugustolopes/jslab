const produtos = ["banana", "maçã", "pera"]
const valores = [100, 0, 0]
const desconto = [0, 5, 0]
let dinheiro = 100

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

if(valorFinal > dinheiro){
    console.log("Vamos repensar a sua vida financeira?")
    console.log(valorFinal)
} else if(valorFinal === dinheiro){
    console.log("Não restará salto em conta após a realizar essa compra. Repense!")
    console.log(valorFinal)
} else{
    valorRestante = dinheiro - valorFinal
    console.log(`Compra moderada. Valor restante: ${valorRestante}`)
    console.log(valorFinal)
}

console.log(soma)
console.log(totalDesconto)
console.log(valorFinal)

console.log(typeof soma)
console.log(typeof totalDesconto)
console.log(typeof produtos)