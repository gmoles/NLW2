//Procurar o Botao e capturar o Botao 
document.querySelector("#add-time")
.addEventListener('click', cloneField)

//Quando clicar no Botao

//Executar uma acao
function cloneField(){
    console.log("Cheguei aqui")
 
    //Captura o elemento do schedule-item com o querySelector
    //cloneNode -> Duplica o elemento
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //bolean

    //Limpar os campos
    //Primeiro ele pega os inputs do elemento copiado
    const fields = newFieldContainer.querySelectorAll("input")

    //Depois ele limpa os campos
    fields[0].value = ""
    fields[1].value = ""

    console.log(fields[0].value)

    //Para cada campo, Limpar
    //Pegar o field do momento
    /*
    fields.foreach(function(field){
         //Limpa o Field do momento 
        field.value = ""
    })
    */
    //Colocar na Pagina, em qual lugar?
    document.querySelector('#schedule-items').appendChild(newFieldContainer) 
    // Primeiro ele Clona depois ele coloca no id #schedule-items com o comando appendChild

}