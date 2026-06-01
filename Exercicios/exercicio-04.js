class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

const usuarios = [
    { id: 1, nome: "Ana" },
    { id: 2, nome: "Bruno" },
    { id: 3, nome: "Carla" },
];

function buscarUsuarioPorId(id) {
    if (typeof id !== "number") {
        throw new ValidationError("O id deve ser um número");
    }

    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario) {
        throw new NotFoundError(`Usuário com id ${id} não encontrado`);
    }

    return usuario;
}

const casos = [1, "1", 99, 2, null];

casos.forEach((id) => {
    try {
        const usuario = buscarUsuarioPorId(id);
        console.log("Usuário encontrado:", usuario);
    } catch (erro) {
        if (erro instanceof ValidationError) {
            console.log("Erro de validação:", erro.message);
        } else if (erro instanceof NotFoundError) {
            console.log("Não encontrado:", erro.message);
        } else {
            console.log("Erro inesperado:", erro.message);
        }
    }
});