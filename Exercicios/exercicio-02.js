function criarProduto(dados) {
    if (!dados.nome || typeof dados.nome !== "string") {
        throw new Error("O nome do produto é obrigatório");
    }

    if (typeof dados.preco !== "number" || dados.preco <= 0) {
        throw new Error("O preço deve ser um número maior que zero");
    }

    if (
        typeof dados.estoque !== "number" ||
        !Number.isInteger(dados.estoque) ||
        dados.estoque < 0
    ) {
        throw new Error("O estoque deve ser um número inteiro maior ou igual a zero");
    }

    return {
        nome: dados.nome,
        preco: dados.preco,
        estoque: dados.estoque
    };
}

criarProduto({
    nome: "Notebook",
    preco: 3500,
    estoque: 1.5
});