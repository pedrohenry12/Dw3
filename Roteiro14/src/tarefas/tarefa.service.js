// @file: src/features/tarefas/tarefa.service.js
import { AppError } from '../shared/errors/app-error.js'

export class TarefaService {
  constructor(repository) {
    this.repository = repository
  }

  async buscarPorId(id) {
    const tarefa = await this.repository.buscarPorId(id)

    if (!tarefa) {
      throw new AppError('Tarefa não encontrada', 404)
    }

    return tarefa
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

  async criarTarefa(dados) {
    if (!dados.titulo || dados.titulo.trim() === '') {
      throw new AppError('O título é obrigatório', 400)
    }

    const tarefas = await this.repository.listarTodos()

    const tituloJaExiste = tarefas.some(t =>
      t.titulo.toLowerCase() === dados.titulo.toLowerCase().trim()
    )

    if (tituloJaExiste) {
      throw new AppError('Já existe uma tarefa com esse título', 400)
    }

    const criada = await this.repository.salvar({
      titulo: dados.titulo,
      status: 'pendente',
      projetoId: dados.projetoId ?? null
    })

    return this.buscarPorId(criada.id)
  }

  async atualizarTarefa(id, dados) {
    const tarefa = await this.buscarPorId(id)

    if (tarefa.status === 'concluida') {
      throw new AppError('Não é possível atualizar uma tarefa já concluída', 400)
    }

    return this.repository.atualizar(id, dados)
  }

  async concluirTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    const novoStatus =
      tarefa.status === 'concluida' ? 'pendente' : 'concluida'

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