const Tabela = require("./TabelaProduto")

class Produto {
    constructor ({id, titulo, preco, estoque, fornecedor, dataCriacao, dataAtualizacao, versao}) {
        this.id = id
        this.titulo = titulo
        this.preco = preco
        this.estoque = estoque
        this.fornecedor = fornecedor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    validar() {
        if(typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new Error('O campo título está inválido')
        }

        if(typeof this.preco !== 'number' || this.preco === 0) {
            throw new Error("O campo preço está inválido")
        }
    }

    async criar() {
        this.validar()
        const resultado = await Tabela.inserir({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    apagar() {
        return Tabela.remover(this.id, this.fornecedor)
    }
}

module.exports = Produto