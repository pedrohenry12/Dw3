function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function buscarPedido(id) {
    if (!id) {
        throw new Error("ID do pedido é obrigatório");
    }

    await esperar(1000);

    if (id !== 1) {
        throw new Error("Pedido não encontrado");
    }

    return { id: 1, total: 150 };
}

async function executar() {
    try {
        const pedido = await buscarPedido(1);
        console.log("Pedido encontrado:", pedido);
    } catch (erro) {
        console.log("Erro:", erro.message);
    }

    try {
        const pedido = await buscarPedido(99);
        console.log("Pedido encontrado:", pedido);
    } catch (erro) {
        console.log("Erro:", erro.message);
    }

    try {
        const pedido = await buscarPedido();
        console.log("Pedido encontrado:", pedido);
    } catch (erro) {
        console.log("Erro:", erro.message);
    }
}

executar();