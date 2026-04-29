class Fila {
    constructor(fila, contador) {
        this._fila = [],
            this.contador = 1
    }

    entrar(nome) {
        let senha = {
            senha: this.contador,
            nome: nome
        }

        this._fila.push(senha)
        console.log(`Senha ${this.contador} gerada para ${nome}.`)

        this.contador++
    }

    chamarProximo() {
        if (this._fila.length === 0) {
            console.log("Fila vazia.")
        }
        else {
            let pessoa = this._fila.shift()

            console.log(`Chamando senha ${pessoa.senha} - ${pessoa.nome}`)

            return pessoa
        }
    }

    tamanho(){
        return this._fila.length 
    }

}

let fila = new Fila()

fila.entrar("Ana")
fila.entrar("Pedro")
fila.entrar("Maria")

fila.chamarProximo()
fila.chamarProximo()

console.log(fila.tamanho())