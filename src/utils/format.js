const subjects = [ "Artes",
                   "Biologia",
                   "Ciências", 
                   "Educação Física", 
                   "Física", 
                   "Geografia", 
                   "História", 
                   "Matemática", 
                   "Português", 
                   "Químicao"]

const weekdays = [  "Domingo",
                    "Segunda-feira",
                    "Terça-feira",
                    "Quarta-feira",
                    "Quinta-feira",
                    "Sexta-feira",
                    "Sábado"]


// Funcionalidades 
function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

function convertHourToMinutes(time){
    const hour    = time.split(":",1)
    const minutes = time.split(":",2)
}

module.exports = {
    subjects,
    weekdays,
    getSubject
}