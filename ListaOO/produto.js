class Produto { 
    constructor(nome, preco, estoque){
        this.nome = nome;      
        this.preco = preco;  
        this.estoque = estoque 
    }

    disponivel(){              
        return this.estoque > 0
    }

    exibir(){
        if(this.disponivel()){
            console.log(`Nome: ${this.nome} / Valor: ${this.preco} / - Em estoque`)      
        }
        else{
            console.log(`Nome: ${this.nome} / Valor: ${this.preco} / - Indisponível`)    
    }
}}

const p1 = new Produto("Notebook", 3500, 5);
const p2 = new Produto("Mouse", 80, 0);

p1.exibir();
p2.exibir();