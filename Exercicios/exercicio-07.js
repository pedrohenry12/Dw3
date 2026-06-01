class ValidationError extends Error {
    constructor(message, details) {
        super(message);
        this.name = "ValidationError";
        this.details = details;
    }
}

function validarAluno(aluno) {
    const erros = [];

    if (!aluno.nome || typeof aluno.nome !== "string") {
        erros.push("Nome é obrigatório");
    }

    if (!aluno.email || !aluno.email.includes("@")) {
        erros.push("Email inválido");
    }

    if (typeof aluno.idade !== "number" || aluno.idade < 16) {
        erros.push("Idade deve ser um número maior ou igual a 16");
    }

    if (erros.length > 0) {
        throw new ValidationError("Dados do aluno inválidos", erros);
    }

    return true;
}

const casos = [
    { nome: "Ana",  email: "ana@email.com", idade: 20  }, // ✅ válido
    { nome: "",     email: "sem-arroba",    idade: 14  }, // ❌ três erros
    { nome: "João", email: "joao@mail.com", idade: 15  }, // ❌ só idade
    { nome: "Bia",  email: "bia.com",       idade: 18  }, // ❌ só email
];

casos.forEach((aluno) => {
    try {
        const resultado = validarAluno(aluno);
        console.log("Aluno válido:", resultado);
    } catch (erro) {
        console.log("Erro:", erro.message);
        console.log("Detalhes:", erro.details);
    }
});