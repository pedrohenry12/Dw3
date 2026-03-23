import Fastify from "fastify";

const server = Fastify()

const tarefas = [
    {id: 1, descrition: "Matar o Gabriel"},
    {id: 2, descrition: "Lavar louça"},
    {id: 3, descrition: "Limpar o sangue"},

]

server.get('/tarefas', async(request, reply) => {
    reply.send({tarefas})
})

server.post('/tarefas', async(request, reply) => {
    const tarefa = request.body
    tarefas.push(tarefa)
    reply.send({status: "sucesso", mensagem: "Tarefa adicionada"})

})


try {
    await server.listen({port: 3001})
    console.log("Servidor rodando na porta 3001")
} catch(err) {
    console.log("Erro ao rodar servidor", err)
}