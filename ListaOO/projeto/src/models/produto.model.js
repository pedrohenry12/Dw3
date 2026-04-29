export default class ProdutoModel {
  #produtos
  #proximoId

  constructor() {
    this.#produtos = [
      { id: 1, nome: "Mouse", preco: 100 },
      { id: 2, nome: "Monitor", preco: 900 },
      { id: 3, nome: "Notebook", preco: 3500 }
    ];
    this.#proximoId = 4
  }

  async findAll() {
    return this.#produtos
  }

  async findById(id) {
    return this.#produtos.find(p => p.id === id)
  }

  async create(dados) {
    const novo = {
      id: this.#proximoId,
      nome: dados.nome,
      preco: dados.preco
    };

    this.#produtos.push(novo)
    this.#proximoId++

    return novo
  }

  async delete(id) {
    const index = this.#produtos.findIndex(p => p.id === id)
    if (index === -1) return false

    this.#produtos.splice(index, 1)
    return true
  }

  static validar(dados) {
    const erros = []

    if (!dados || !dados.nome || dados.nome.trim() === "") {
      erros.push("Nome é obrigatório.")
    }

    if (
      !dados ||
      dados.preco === undefined ||
      typeof dados.preco !== "number" ||
      dados.preco <= 0
    ) {
      erros.push("Preço deve ser um número maior que 0.");
    }

    if (erros.length > 0) {
      return { valido: false, erros }
    }

    return { valido: true }
  }
}