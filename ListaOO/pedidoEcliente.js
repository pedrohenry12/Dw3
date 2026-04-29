class Cliente{
    constructor(nome, email){
        this.nome = nome,
        this.email = email
    }

    exibir(){
        console.log(`Nome ${this.nome} - email ${this.email}`)
    }
}

class Pedido{
    constructor(id, cliente, status, itens){
        this.id = id,
        this.cliente = cliente,
        this.itens = [],
        this.status = "aberto"
    }

    adicionarItem(descricao, valor){
        let produto = {
            descricao,
            valor
        }
        this.itens.push(produto)
    }

    total(){
        
    }
}