const express = require('express')
const { v4: uuid } = require('uuid')
const PORT = process.env.PORT || 5000
const server = express()

server.use(express.json())

/* Informações para o Produto
    "titulo": "Notebook Lenovo Ideapad ",
	"descrição": "Notebook Lenovo Ideapad S145 81V70008BR - AMD Ryzen 5-3500U 8GB 256GB SSD 15,6” Windows 10",
	"valor": 3419,
	"marca": "Lenovo",
	"modelo": "Ideapad",
	"promocao": true,
	"estoque": 30
*/

const produtos = [{
    "titulo": "Notebook Lenovo Ideapad ",
	"descrição": "Notebook Lenovo Ideapad S145 81V70008BR - AMD Ryzen 5-3500U 8GB 256GB SSD 15,6” Windows 10",
	"valor": 3419,
	"marca": "Lenovo",
	"modelo": "Ideapad",
	"promocao": true,
	"estoque": 30
}]

//GET => http://localhost:3000/produtos
server.get('/', (req,res) =>{
    return res.sendFile(__dirname+"/html/index.html");
})
// GET / => Retorna todos os protudos
server.get('/produtos', (req, res) => {
  return res.send(produtos)
})

server.post('/produtos', (req, res) => {
  const dados = req.body

  produtos.push({
    id: uuid(),
    ...dados,
  })

  return response.json({ mensagem: 'Produto cadastrado com sucesso!' })
})

server.put('/produto/:id', (req, res) => {
  const id_produto = req.params.id
  const dados = req.body

  const produtoIndex = produtos.findIndex((produto) => {
    return produto.id === id_produto
  })

  if (produtoIndex === -1) {
    return res.send({ mensagem: 'Professor não encontrado' })
  }

  produtos[produtoIndex] = {
    id: id_produto,
    ...dados,
  }

  return response
    .status(200)
    .send({ mensagem: 'Produto atualizado com sucesso' })
})

server.delete('/produtos/:id', (req, res) => {
  const id_produto = req.params.id

  const produtoIndex = produtos.findIndex((produto) => {
    return produto.id === id_produto
  })

  if (produtoIndex === -1) {
    return res.send({ mensagem: 'Produto não encontrado' })
  }
  produtos.splice(produtoIndex, 1)

  return res.json({ mensagem: 'Produto apagado com sucesso!' })
})


server.listen(PORT), () => {
  console.log('Server rodando na porta 3000')
	console.log(`Listening on ${ PORT }`)
})