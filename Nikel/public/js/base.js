const nome = "chris";
let nome2 = "maman";
let nomes =["chris","vino", "kev"];
let pessoa = {
    nome: "paul",
    idade: "25",
    trabalho: "programador"
}
const myModal = new bootstrap.Modal("#exampleModal")

document.getElementById("creat-from").addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtenha os valores dos campos de entrada
    let email = document.getElementById("exampleInputEmail1").value;
    let password = document.getElementById("exampleInputPassword1").value;

    // Adicione um console.log aqui para verificar se o código está chegando até aqui
    console.log("Chegou até aqui");

    // Verifique se os valores de email e senha são obtidos corretamente
    console.log("Email:", email);
    console.log("Senha:", password);

    // Restante do seu código

    // Verifique se o modal é ocultado corretamente
    myModal.hide();
});
