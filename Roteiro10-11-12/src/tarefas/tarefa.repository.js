// @file: src/features/tarefas/tarefa.repository.js
import pool from '../../database/pool.js'

// Mapeia uma linha do banco (descricao/concluido) para o formato do domínio (titulo/status)
function mapRowParaTarefa(row) {
  return {
    id: row.id,
    titulo: row.descricao,
    status: row.concluido ? 'concluida' : 'pendente',
    criada_em: row.criada_em
  }
}

export class TarefaRepository {
  async listarTodos() {
    const resultado = await pool.query(`
      SELECT id, descricao, concluido, criada_em
      FROM tarefas
      ORDER BY id
    `)

    return resultado.rows.map(mapRowParaTarefa)
  }

  async buscarPorId(id) {
    const resultado = await pool.query(
      `
        SELECT id, descricao, concluido, criada_em
        FROM tarefas
        WHERE id = $1
      `,
      [id]
    )

    const row = resultado.rows[0]
    return row ? mapRowParaTarefa(row) : null
  }

  async salvar(tarefa) {
    const concluido = tarefa.status === 'concluida'

    const resultado = await pool.query(
      `
        INSERT INTO tarefas (descricao, concluido)
        VALUES ($1, $2)
        RETURNING id, descricao, concluido, criada_em
      `,
      [tarefa.titulo, concluido]
    )

    return mapRowParaTarefa(resultado.rows[0])
  }

  async atualizar(id, dadosAtualizados) {
    const tarefaAtual = await this.buscarPorId(id)
    if (!tarefaAtual) return null

    const tarefaFinal = {
      ...tarefaAtual,
      ...dadosAtualizados,
      id: tarefaAtual.id
    }

    const concluido = tarefaFinal.status === 'concluida'

    const resultado = await pool.query(
      `
        UPDATE tarefas
        SET descricao = $1,
            concluido = $2
        WHERE id = $3
        RETURNING id, descricao, concluido, criada_em
      `,
      [tarefaFinal.titulo, concluido, id]
    )

    return resultado.rows[0] ? mapRowParaTarefa(resultado.rows[0]) : null
  }

  async remover(id) {
    const resultado = await pool.query(
      `
        DELETE FROM tarefas
        WHERE id = $1
      `,
      [id]
    )

    return resultado.rowCount > 0
  }
}