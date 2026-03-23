import Fastify from "fastify";

const server = Fastify()

server.get('/', async (request, reply) => {
    let x= 200
    reply.send(x*2)
})

server.get('/json', async (request, reply) => {
    let x= 24
    reply.send({numero: "cavalo "})
})

server.get('/html', async (request, reply) => {
    //esse type é usado pra tipar a resposta e fazer com que o back entenda a maneira do retorno
    reply.type("text/html").send("<h1>Olá mundo</h1> <h3>Pedro</h3>")
})

try {
    await server.listen({port: 3001})
    console.log("Servidor rodando na porta 3001")
} catch(err) {
    console.log("Erro ao rodar servidor", err)
}