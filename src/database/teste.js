const Database = require("./db")
const createProffy = require("./createProffy")

Database.then(async (db) => {

    //Inserir Dados

    proffyValue = {
        name: "Guilherme Moles",
        avatar: "https://avatars1.githubusercontent.com/u/51065539?s=460&u=fdc675cc73d2a97a4b534b1bbecd0fdd0432edc7&v=4",
        whatapp: "11999209007",
        bio: "Sou apaixonado por projetos e por resolver problemas utilizando a programação. Sou um Progress 4GL Developer procurando aprender cada dia mais sobre programação web e mobal:"
    }

    classValue = {
        subject: 1,
        cost: "80"
        // O Id do proffy vamos pegar em tempo de exec

    }

    classScheduleValues = [
        // O Id da class virá pelo bando de dados através da criação do banco de dados.
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ] 

    //Create Proffy  
    
    //await createProffy (db, {proffyValue, classValue, classScheduleValues})

    //Consultar Dados Inseridos

    //Todos os Proffys

    const selectedProffys = await db.all("SELECT * from proffys")
    //console.log(selectedProffys)

    //Consultar as Classes de um determinado Professor 
    // e trazer junto os dados do Professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)    
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectedClassesAndProffys)


    // o horário que a pessoa trabalha por exemplo é das 08:00 até as 18:00 
    // o horario do time_from precisa ser antes ou depois do horário solicitado
    // o horário do time_to precisa ser acima do horario solicitado 

    const selectedClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_Schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = 0
        AND class_schedule.time_from <= 520
        AND class_schedule.time_to > 600
    `)

    console.log(selectedClassesSchedule)


    
})