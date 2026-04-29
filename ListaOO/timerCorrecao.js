class Timer {
  constructor(nome) {
    this.nome = nome
    this.segundos = 0
  }

  iniciar() {
    //erro aqui, a função estava sendo chamada separadamente, logo o this que ela recebia era aalgo vindo do navegador ou ate mesmo do node
    //(um this global) por isso ele ignorava os parametros do timer e não funcionava corretamente
    setInterval(() => {
      this.segundos++
      console.log(`${this.nome}: ${this.segundos}s`)
    }, 1000)
  }
}

const t = new Timer('Cronômetro')
t.iniciar()

// 1. O erro acontecia porque dentro do setInterval,
// o this não estava apontando para o objeto timer.

// 2. Para corrigir, foi usada uma arrow function
// no lugar da função normal.

// 3. A arrow function pega o this do lugar onde foi criada,
// então continua usando o this do método iniciar.