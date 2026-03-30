import fastify from "fastify";

const server = fastify()
const PORT = 3001

const tarefas = [
    {id: 1, descricao: "Fazer compras", concluido: false}, 
    {id: 2, descricao: "Lavar o carro", concluido: false},
    {id: 3, descricao: "Estudar Fastify", concluido: true},
    {id: 4, descricao: "Assistir Champions League", concluido: false},
    {id: 5, descricao: "Estudar para o ENEM", concluido: true},
]

const start = async () => {
    try{
        await server.listen({port : PORT})
        console.log(`Servidor rodando em http://localhost:${PORT}`)    
    }catch (error){
        console.error(error)
        process.exit(1)
    }
}

start()


//get com filtros caso queira aplicar
server.get('/tarefas', async (request, reply) => {
    let resultado = tarefas;
    const { concluido, busca } = request.query;

    if (concluido !== undefined) {
        resultado = resultado.filter(t => String(t.concluido) === concluido);
    }

    if (busca !== undefined) {
        resultado = resultado.filter(t => t.descricao.toLowerCase().includes(busca.toLowerCase()));
    }

    return reply.send(resultado);
});


//metodo post com validação (nao permite mandar a tarefa vazia, tem que ter descrição)
server.post('/tarefas', async (request, reply) => {
    //usando o concluido = false para evitar bugs, por exemplo, se o user mandar só a descrição
    //o concluido recebe false como padrão
    const { descricao, concluido = false} = request.body
    const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1
    const novaTarefa = {id: novoId, descricao, concluido}

    if(!descricao || descricao.trim() === ""){
        return reply.status(400).send({ error: "Informe uma descrição antes de enviar uma tarefa" })
    }
    

    tarefas.push(novaTarefa)
    
    return reply.status(201).send(novaTarefa)
    
})


//get de tarefas por id
server.get('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const tarefa = tarefas.find(t => t.id === id)

    if (!tarefa) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    return reply.send(tarefa)
})


//update de tarefa de acordo com id selecionado
server.patch('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const tarefaAtualizada = request.body
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    tarefas[index] = { ...tarefas[index], ...tarefaAtualizada, id }
    return reply.send(tarefas[index])
})


//delete padão (por id selecionado)
server.delete('/tarefas/:id', async (request, reply) => {

    const id = Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    tarefas.splice(index, 1)

    return reply.status(204).send()
})


//rota que muda o status do "concluido" do index selecionado
server.patch('/tarefas/:id/concluir', async (request, reply) => {
    const { id } = request.params
    const index = tarefas.findIndex(t => t.id === Number(id))

    if(index === -1){
        return reply.status(404).send({ erro: "Id não encontrado" })
    }

    tarefas[index].concluido = !tarefas[index].concluido

    return reply.send(tarefas[index])

})


//rota que faz o resumo
server.get('/tarefas/resumo', async (request, reply) => {
    const total = tarefas.length
    const concluidas = tarefas.filter(t => t.concluido === true).length

    return reply.send({
    "total": total,
    "concluidas": concluidas,
    "pendentes": total - concluidas
});
})


//mensagem de erro padrão
server.setNotFoundHandler((request, reply) => {

  return reply.code(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.',
  })

})