class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function criarProduto(dados) {
    if (!dados.nome || typeof dados.nome !== "string") {
        throw new ValidationError("O nome do produto é obrigatório");
    }

    if (typeof dados.preco !== "number" || dados.preco <= 0) {
        throw new ValidationError("O preço deve ser um número maior que zero");
    }

    if (
        typeof dados.estoque !== "number" ||
        !Number.isInteger(dados.estoque) ||
        dados.estoque < 0
    ) {
        throw new ValidationError(
            "O estoque deve ser um número inteiro maior ou igual a zero"
        );
    }

    return { nome: dados.nome, preco: dados.preco, estoque: dados.estoque };
}

const casos = [
    { nome: "Notebook", preco: 3500, estoque: 10 },   // ✅ válido
    { nome: "",         preco: 3500, estoque: 10 },   // ❌ nome vazio
    { nome: "Mouse",    preco: -50,  estoque: 5  },   // ❌ preço negativo
    { nome: "Teclado",  preco: 200,  estoque: 1.5},   // ❌ estoque decimal
    { nome: "Monitor",  preco: 0,    estoque: 3  },   // ❌ preço zero
];

casos.forEach((dados, i) => {
    try {
        const produto = criarProduto(dados);
        console.log(`Caso ${i + 1} ✅:`, produto);
    } catch (erro) {
        if (erro instanceof ValidationError) {
            console.log(`Caso ${i + 1} Erro de validação: ${erro.message}`);
        } else {
            console.log(`Caso ${i + 1} Erro inesperado:`, erro);
        }
    }
});