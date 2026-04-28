class Carrinho {
    constructor(itens) {
        this.itens = []
    }

    adicionar(nome, preco, quantidade) {
        this.itens.push({ nome: nome, preco: preco, quantidade : quantidade })
    }

    remover(nome) {
        let tamanhoArray = this.itens.length
        this.itens = this.itens.filter((itens) => itens.nome !== nome)
        if (this.itens.length < tamanhoArray) {
            console.log("Item removido com sucesso")
        }
        else {
            console.log("Item não encontrado")
        }
    }

    total() {
        let soma = 0
        for (let item of this.itens) {
            soma += (item.preco * item.quantidade)
        }
        return soma
    }

    exibir() {
        this.itens.forEach(item => {
            console.log(`${item.quantidade}x ${item.nome} -- R$ ${item.preco.toFixed(2)}`)
        })
        console.log(`Total: R$ ${this.total().toFixed(2)}`)

    }
}

let c1 = new Carrinho();
c1.adicionar("Arroz", 10, 2);
c1.adicionar("Feijão", 8, 1);

c1.exibir();