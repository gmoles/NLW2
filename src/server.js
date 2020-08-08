require('express')()

.get("/", (req,res) => {
    return res.send("Hi from NLW")
})

.get("/study", (req,res) => {
    return res.send("Pagina study")
})

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