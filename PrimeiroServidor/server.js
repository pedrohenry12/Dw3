import Fastify from "fastify";

const server = Fastify({
    longger: true
})

server.get('/', async (request, reply) => {
    let x = 100
    reply.send(x*2)
})

try { 
    await server.listen({ port:3000 })
}   catch (err) {
    server.log.error(err)
    process.exit(1)
}