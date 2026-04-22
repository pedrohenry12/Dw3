import controller from '../controllers/tarefas.controller.js'


// ATENÇÃO À ORDEM DAS ROTAS: Rotas estáticas (como /resumo) devem
// vir antes de rotas com parâmetros dinâmicos (como /:id) para evitar
// que "resumo" seja interpretado como um :id pelo servidor.
export async function TarefasRoutes(server, options){


// PROCESSAMENTO das requisições relacionadas às tarefas.

server.get('/tarefas', async (request, reply) => {
  // LOG para indicar que a rota foi chamada
  console.log("Routes: GET /tarefas chamada");
  // Chama a função do controlador para processar a requisição
  controller.listarTarefas(request, reply)
})

server.post('/tarefas', async (request, reply) => {
    console.log("Routes: POST /tarefas chamada")
    controller.criarTarefa(request, reply)
})

server.get('/tarefas/resumo', async (request, reply) => {
    console.log("Routes: GET /tarefas/resumo chamada")
    controller.obterResumo(request, reply)
})

server.get('/tarefas/obterpendentes', async (request, reply) => {
    console.log("Routes: GET /tarefas/obter pendentes chamada")
    controller.obterPendentes(request, reply)
})

server.get('/tarefas/:id', async (request, reply) => {
    console.log("Routes: GET /tarefas/:id chamada")
    controller.obterTarefa(request, reply)
})

server.patch('/tarefas/:id', async (request, reply) => {
    console.log("Routes: PATCH /tarefas/:id chamada")
    controller.atualizarTarefa(request, reply)
})

server.patch('/tarefas/:id/concluir', async (request, reply) => {
    console.log("Routes: PATCH /tarefas/:id/concluir chamada")
    controller.concluirTarefa(request, reply)
})

server.delete('/tarefas/:id', async (request, reply) => {
    console.log("Routes: DELETE /tarefas/:id chamada")
    controller.removerTarefa(request, reply)
})

server.get('/tarefas/pendentes', async (request, reply) => {
    console.log("Routes: GET /tarefas/pendentes chamada")
    controller.listarPendentes(request, reply)
})


}

