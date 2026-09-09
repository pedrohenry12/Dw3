// @file: src/features/tarefas/tarefa.repository.js
import pool from '../database/pool.js'

function mapRowParaTarefa(row) {
  return {
    id: row.id,
    titulo: row.descricao,
    status: row.concluido ? 'concluida' : 'pendente',
    criada_em: row.criada_em,
    projetoId: row.projeto_id,
    projetoNome: row.projeto_nome ?? null,
    tags: row.tags ?? []
  }
}

export class TarefaRepository {
  async listarTodos() {
    const resultado = await pool.query(`
      SELECT
        t.id, t.descricao, t.concluido, t.criada_em,
        t.projeto_id, p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p ON p.id = t.projeto_id
      ORDER BY t.id
    `)

    return resultado.rows.map(mapRowParaTarefa)
  }

  async buscarPorId(id) {
    const resultado = await pool.query(`
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome,

        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', tg.id,
              'nome', tg.nome
            )
          ) FILTER (WHERE tg.id IS NOT NULL),
          '[]'
        ) AS tags

      FROM tarefas t
      LEFT JOIN projetos p ON p.id = t.projeto_id
      LEFT JOIN tarefas_tags tt ON tt.tarefa_id = t.id
      LEFT JOIN tags tg ON tg.id = tt.tag_id

      WHERE t.id = $1
      GROUP BY t.id, p.nome
    `, [id])

    const row = resultado.rows[0]
    return row ? mapRowParaTarefa(row) : null
  }

  async salvar(tarefa) {
    const concluido = tarefa.status === 'concluida'

    const resultado = await pool.query(`
      INSERT INTO tarefas (descricao, concluido, projeto_id)
      VALUES ($1, $2, $3)
      RETURNING id, descricao, concluido, criada_em, projeto_id
    `, [tarefa.titulo, concluido, tarefa.projetoId])

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

    const resultado = await pool.query(`
      UPDATE tarefas
      SET descricao = $1, concluido = $2, projeto_id = $3
      WHERE id = $4
      RETURNING id, descricao, concluido, criada_em, projeto_id
    `, [
      tarefaFinal.titulo,
      concluido,
      tarefaFinal.projetoId,
      id
    ])

    return resultado.rows[0] ? mapRowParaTarefa(resultado.rows[0]) : null
  }

  async remover(id) {
    const resultado = await pool.query(
      `DELETE FROM tarefas WHERE id = $1`,
      [id]
    )

    return resultado.rowCount > 0
  }
}