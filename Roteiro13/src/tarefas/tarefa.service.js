// @file: src/features/tarefas/tarefa.service.js
import { AppError } from '../shared/errors/app-error.js'

export class TarefaService {
  constructor(repository) {
    this.repository = repository
  }

  async listarTarefas(filtros = {}) {
    const tarefas = await this.repository.listarTodos()
    
    let resultado = tarefas

    if (filtros.busca) {
      resultado = resultado.filter(t =>
        t.titulo.toLowerCase().includes(filtros.busca.toLowerCase())
      )
    }

    if (filtros.status) {
      resultado = resultado.filter(t => t.status === filtros.status)
    }

    return resultado
  }

  async salvar(tarefa) {
  const concluido = tarefa.status === 'concluida'

  const resultado = await pool.query(
    `
      INSERT INTO tarefas (descricao, concluido, projeto_id)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
    [tarefa.titulo, concluido, tarefa.projetoId]
  )

  return this.buscarPorId(resultado.rows[0].id)
}
  async criarTarefa(dados) {
  if (!dados.titulo || dados.titulo.trim() === '') {
    throw new AppError('O título é obrigatório', 400)
  }

  const tarefas = await this.repository.listarTodos()
  const tituloJaExiste = tarefas.some(t => t.titulo.toLowerCase() === dados.titulo.toLowerCase().trim())

  if (tituloJaExiste) {
    throw new AppError('Já existe uma tarefa com esse título', 400)
  }

  return this.repository.salvar({
    titulo: dados.titulo,
    status: 'pendente',
    projetoId: dados.projetoId ?? null
  })
}

  async atualizarTarefa(id, dados) {
    const tarefa = await this.buscarPorId(id) // Se não achar, o método acima já lança o AppError 404

    if (tarefa.status === 'concluida') {
      throw new AppError('Não é possível atualizar uma tarefa já concluída', 400)
    }

    return this.repository.atualizar(id, dados)
  }

  async concluirTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    const novoStatus = tarefa.status === 'concluida' ? 'pendente' : 'concluida'
    return this.repository.atualizar(id, { status: novoStatus })
  }

  async removerTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    if (tarefa.status === 'concluida') {
      throw new AppError('Não é possível remover uma tarefa já concluída', 400)
    }

    return this.repository.remover(id)
  }
}