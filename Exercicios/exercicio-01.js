function dividir(a,b){
    if (typeof a !== "number" ||  typeof b !== "number"){
        throw new TypeError("Os dois valores devem ser números")
    }

    if(b === 0){
        throw new Error("b não pode ser 0")
    }

    return a/b
}

 try{
        const resultado = dividir("a",2)
        console.log(`O resultado é ${resultado}`)
    }
    catch(error){
        console.log(`Erro interceptado com sucesso: mensagem ${error.message}`)
    }