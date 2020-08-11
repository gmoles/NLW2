const {subjects, weekdays, getSubject} = require("./utils/format")

const Database = require("./database/db")

function pageLanding(req,res){    
    return res.render("index.html")
}

//Envia para a Dom os dados dos Proffys para renderizar com o nunjucks
function pageStudy(req,res){    
    
    const filters  = req.query //Guarga os dados do filtro
    console.log(req.query) //dados recebidos pelo submit
    console.log(filters.subject)

    if (!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays }) //envia os dados de filtro e dos proffys
    }

    console.log("Não tem campos vazios")

    //Converter horas em minutos

    const query = `
    SELECT classes.*, proffys.* 
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)    
    WHERE EXISTS(
        SELECT class_schedule.*
        FROM class_Schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday    = ${filters.weekdays}
        AND class_schedule.time_from <= ${filters.time}
        AND class_schedule.time_to    > ${filters.time}
    );
`

    return res.render("study.html", { proffys, filters, subjects, weekdays }) //envia os dados de filtro e dos proffys
}
 
function pageGiveClasses(req,res){    
    const data = req.query
    
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

module.exports = {pageLanding, pageStudy, pageGiveClasses}