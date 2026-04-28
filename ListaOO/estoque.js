class Estoque {
    constructor() {
        this.produtos = []
    }

    cadastrar(nome, quantidade) {
        let produto = this.produtos.find(p => p.nome === nome)

        if (produto) {
            console.log("Produto já cadastrado.")
        }
        else {
            this.produtos.push({ nome, quantidade })
        }
    }

    entrada(nome, quantidade) {
        let produto = this.produtos.find(p => p.nome === nome)

        if (produto) {
            produto.quantidade += quantidade
        }
        else {
            console.log("Produto não encontrado.")
        }
    }

    saida(nome, quantidade) {
        let produto = this.produtos.find(p => p.nome === nome)

        if (!produto) {
            console.log("Produto não encontrado.")
        }
        else if (produto.quantidade < quantidade) {
            console.log("Quantidade insuficiente.")
        }
        else {
            produto.quantidade -= quantidade
        }
    }

    exibir() {
        this.produtos.forEach(produto => {
            console.log(`${produto.nome}: ${produto.quantidade} unidades`)
        })
    }
}

let e1 = new Estoque()

e1.cadastrar("Clipes", 30)
e1.cadastrar("Mesas", 10)

e1.entrada("Clipes", 20)
e1.saida("Mesas", 5)

e1.exibir()