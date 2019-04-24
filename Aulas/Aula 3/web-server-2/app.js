const express = require('express')
const hbs = require('hbs')
const path = require('path')
const request = require('request')

const app = express()
const port = 3001
const publicAssets = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')
app.set('view engine','hbs')
app.set('views', viewsPath)
app.use(express.static(publicAssets))
hbs.registerPartials(partialsPath)

app.get('', (request, response) => {
    response.render('index', {title : 'Home', autor: 'William'})
})

app.get('/sobre', (request, response) => {
    response.render('sobre')
})

app.get('/ajuda', (request, response) => {
    response.render('ajuda')
})

app.get('/cotacoes/:uri', (req, res) => {

    request({url:'https://www.worldtradingdata.com/api/v1/stock?symbol=' + req.params.uri + '&api_token=FQ47aUHyX9gIBvQXLFRNhZCltPnAR8EAWzuvIkWo1VoNnBO6hRM9NZYPrNxT', json:true}, 
    (error, response, body) => {
        if(body.data[0]){
            console.log(body.data[0].price)
            res.render('cotacoes', {preco : body.data[0].price})
        }
    })
})

app.get('/heartBeat/:id', (request, response) => {
    if(request.params.id === '1'){
        const dadosApi = {
            versao: "v1"
        }

        response.status(200).json(dadosApi)
    }else{
        response.status(400).end()
    }
})
//porta na qual o servidor vai subir
app.listen(port, () => {
    console.log('servidor no ar, na porta' + port)
})