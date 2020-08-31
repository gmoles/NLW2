//Criando servidor para aplicação 
//(npm run dev) para rodar o Servidor
const express  = require('express')
const server   = express()

const {pageLanding, pageStudy, pageGiveClasses, saveClasses } = require("./pages")

//Configurar Nunjucks
const nunjucks = require('nunjucks') 

nunjucks.configure('src/views',{
    express: server,
    noCache: true,
})

//Start do Server
server

//Receber os Dados do req.body
.use(express.urlencoded({extended: true}))

//Configurar a pasta dos arquivos estáticos (css, scripts, imagens) para serem usados sem colocar todo caminho
.use(express.static("public"))

//Rotas da aplicação 
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(5500)

/*
function express(){
    return{
        name: "Gui",
        age: 33
    } 

}

const nome = express()
*/