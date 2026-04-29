class Cliente {
    constructor(nome, email) {
        this.nome = nome
        this.email = email
    }

    exibir() {
        console.log(`Nome: ${this.nome} - Email: ${this.email}`)
    }
}

class Pedido {
    constructor(id, cliente) {
        this.id = id
        this.cliente = cliente
        this.itens = []
        this.status = "aberto"
    }

    adicionarItem(descricao, valor) {
        let produto = {
            descricao,
            valor
        }
        this.itens.push(produto)
    }

    total() {
        let soma = 0
        for (let item of this.itens) {
            soma += item.valor
        }
        return soma
    }

    fechar() {
        this.status = "fechado"
    }

    exibir() {
        let lista = ""

        for (let item of this.itens) {
            lista += `${item.descricao} - R$${item.valor}\n`
        }

        console.log(`Pedido ${this.id} / ${this.status}\n Cliente: ${this.cliente.nome} - ${this.cliente.email}\n Itens:\n ${lista} Total: R$${this.total()}`)
    }
}

let cliente1 = new Cliente("Pedro", "pedro@email.com")

let pedido1 = new Pedido(1, cliente1)

pedido1.adicionarItem("Mesa", 300)
pedido1.adicionarItem("Clipes", 10)

pedido1.fechar()

pedido1.exibir()