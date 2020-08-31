const {subjects, weekdays, getSubject, convertHourToMinutes} = require("./utils/format")

const Database = require("./database/db")

function pageLanding(req,res){    
    return res.render("index.html")
}

//Envia para a Dom os dados dos Proffys para renderizar com o nunjucks
async function pageStudy(req,res){    
    
    const filters  = req.query //Guarga os dados do filtro
    console.log(req.query) //dados recebidos pelo submit
    
    

    if (!filters.subject || !filters.weekday || !filters.time){
        //Algum campo do Filtro está Vazio
        console.log("Campos vazios")    
        return res.render("study.html", {filters, subjects, weekdays }) //envia os dados de filtro e dos proffys
    }

    //console.log("Não tem campos vazios")

    //Converter horas em minutos
    const timetoMinutes = convertHourToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)    
        WHERE EXISTS( 
            SELECT class_schedule.*
            FROM class_schedule 
            WHERE class_schedule.class_id = classes.id                             
            AND class_schedule.weekday    = '${filters.weekdays}'
            AND class_schedule.time_from <= '${timetoMinutes}'
            AND class_schedule.time_to    > '${timetoMinutes}'           
        )
        AND classes.subject = '${filters.subject}';
    `
    //caso haja erro na hora da consulta do banco de dados.
    try {
        //Abrir o Banco de dados e se não tiver as tabelas cadastra as tabelas.
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", { proffys, filters, subjects, weekdays }) //envia os dados de filtro e dos proffys

    } catch (error) {
        console.log("ERRO de SQL " + error)    
    }    
}
 
function pageGiveClasses(req,res){    
    //Carregar Página
    return res.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses(req,res){    
    
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost,
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        
        return {
            weekday,
            time_from: convertHourToMinutes(req.body.time_from[index]),
            time_to: convertHourToMinutes(req.body.time_to[index])
        }    
    })

    try { 
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})    

        let queryString = "?subject=" + req.body.subject 
        //queryString = queryString + ""
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.render("study" + queryString) //envia os dados de filtro e dos proffys
        
    } catch (error) {

        console.log("Erro Insert " + error)
        
    }
    

    
    
    
    
    
    
    
    
    
    //const data = req.body
    
    //Transforma o objeto data em um array
    const isNotEmpty = Object.keys(data).length != 0
    //Se tiver data adicionar
    if (isNotEmpty) {
        
        //Pega o subject na function getSubject
        data.subject = getSubject(data.subject)
        
        //Adicionar os data a lista de Proffys
        proffys.push(data)        

        return res.redirect("/study")
    }
    //se não houver não adicionar

    console.log(data)
    return res.render("give-classes.html", {subjects, weekdays})
}


module.exports = {pageLanding, pageStudy, pageGiveClasses, saveClasses}