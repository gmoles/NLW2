//Criando servidor para aplicação 
//(npm run dev) para rodar o Servidor
const express  = require('express')
const server   = express()

const {pageLanding, pageStudy, pageGiveClasses} = require("./pages")

//Configurar Nunjucks
const nunjucks = require('nunjucks') 

nunjucks.configure('src/views',{
    express: server,
    noCache: true,
})


//Start do Server
server
//Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))

//Rotas da aplicação 
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
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