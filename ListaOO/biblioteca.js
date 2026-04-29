class Livro {
    constructor(titulo, autor) {
        this.titulo = titulo
        this.autor = autor
        this.disponivel = true
    }

    emprestar() {
        if (this.disponivel) {
            this.disponivel = false
        } else {
            console.log("Livro indisponível")
        }
    }

    devolver() {
        this.disponivel = true
    }

    exibir() {
        console.log(`${this.titulo} - ${this.autor} - ${this.disponivel ? "Disponível" : "Indisponível"}`)
    }
}

class Biblioteca {
    constructor(nome) {
        this.nome = nome
        this.acervo = []
    }

    adicionarLivro(livro) {
        this.acervo.push(livro)
    }

    buscar(titulo) {
        let busca = this.acervo.find((livro) => livro.titulo === titulo)

        if (!busca) {
            console.log("Livro não encontrado")
            return null
        } 
        
        return busca
    }

    emprestar(titulo) {
        let busca = this.buscar(titulo)

        if (busca) {
            busca.emprestar()
        }
    }

    devolver(titulo) {
        let busca = this.buscar(titulo)

        if (busca) {
            busca.devolver()
        }
    }

    exibirAcervo() {
        this.acervo.forEach((livro) => livro.exibir())
    }
}

let l1 = new Livro("O Alquimista", "Paulo Coelho")
let l2 = new Livro("Dom Casmurro", "Machado de Assis")
let l3 = new Livro("1984", "George Orwell")

let b1 = new Biblioteca("Biblioteca Central")

b1.adicionarLivro(l1)
b1.adicionarLivro(l2)
b1.adicionarLivro(l3)

b1.emprestar("O Alquimista")
b1.emprestar("1984")

b1.devolver("1984")

b1.exibirAcervo()