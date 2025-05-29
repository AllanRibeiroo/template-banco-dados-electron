console.log("Deu certo")

var formulario = document.getElementById("form-cadastro")

formulario.addEventListener("submit", function(event) {
    event.preventDefault()

    var campoNome = document.getElementById("nome").value
    var campoEmail = document.getElementById("email").value

    

    console.log(campoNome,campoEmail)
})
