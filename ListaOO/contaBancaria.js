class Conta {
    constructor(titular, saldo){
        this.titular = titular;
        this.saldo = saldo
    }

    depositar(valor){
        this.saldo += valor
    }

    sacar(valor){
        if(valor > this.saldo){
            console.log("Saldo insuficiente para o saque")
            return
        }
        this.saldo -= valor
    }

    exibirSaldo(){
        console.log(`Titular: ${this.titular} / Saldo: ${this.saldo}`)
    }

}

// Exemplo de uso:
const conta1 = new Conta("Ana", 150)

conta1.exibirSaldo()   // Titular: Ana | Saldo: R$ 150.00
conta1.depositar(50)
conta1.exibirSaldo()   // Titular: Ana | Saldo: R$ 200.00
conta1.sacar(100)
conta1.exibirSaldo()   // Titular: Ana | Saldo: R$ 100.00
conta1.sacar(200)      // Saldo insuficiente.