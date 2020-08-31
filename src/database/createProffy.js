module.exports = async function (db, {proffyValue, classValue, classScheduleValues}) {
    
    // Inserir dados na table de Teachers
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES(
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatapp}",
            "${proffyValue.bio}"
        );    
    `)

    const proffy_id = insertedProffy.lastID

    // Inserir dados na table de Class
    const insertedClass= await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES(
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID

    // Roda um loop com os arrays dos horarios do professor e cria um insert para cada um no array de inserts
    const insertedAllclassScheduleValues = classScheduleValues.map((value) => {
        return db.run(`
        INSERT INTO class_schedule (
            class_id,
            weekday,
            time_from,
            time_to
        ) VALUES(
            "${class_id}",
            "${value.weekday}",
            "${value.time_from}",
            "${value.time_to}"
        );
        `)
    })

    // Inserir dados na tabela de ClassSchedule
    await Promise.all(insertedAllclassScheduleValues)

    
}