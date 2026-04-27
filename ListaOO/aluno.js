class Aluno {
    constructor(nome) {
        this.nome = nome;
        this.notas = [];
    }

    adicionarNota(nota) {
        this.notas.push(nota);
    }

    calcularMedia() {
        if (this.notas.length === 0) return 0;
        return this.notas.reduce((soma, n) => soma + n, 0) / this.notas.length;
    }

    situacao() {
        return this.calcularMedia() >= 6 ? "Aprovado" : "Reprovado";
    }

    exibir() {
        const media = this.calcularMedia().toFixed(2);
        console.log(`${this.nome} | Média: ${media} | ${this.situacao()}`);
    }
}

const a1 = new Aluno("Ana");
a1.adicionarNota(8);
a1.adicionarNota(7);
a1.adicionarNota(7.5);

a1.exibir(); // Ana | Média: 7.50 | Aprovado