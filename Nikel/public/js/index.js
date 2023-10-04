// document.getElementById("link-conta").addEventListener("click", function(){
// alert("Usuário clicou para criar uma conta");
// Aqui você pode adicionar mais código para tratar o clique
// });

const myModal = new bootstrap.Modal("#exampleModal") // funçao ajuda madar formulario
let logged = sessionStorage.getItem("logged"); // declardo pra session
const session = localStorage.getItem("session");// declarado pra session

checklog(); // chamada da session

// **logar no sistema  si tiver conta ***
// a mesma coisa fizemos na criar conta
document.getElementById("login-from").addEventListener("submit", function (e) {// funcao ajuda pegar imformação do formulario
    e.preventDefault();


    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-senha").value;
    const cheksession =  document.getElementById("login-check").checked;

    // teste do valor de login 
    //console.log(email, session);
    const account = getAccount(email, password);// chamada da função getAccount

    if(!account){
        alert("por favor verifica usuario ou senha"); // caso email não certo imprima 
      //  console.log("primerio if");
        
        return;
    }

   // console.log("é só pra testar "); bugar teste
    //console.log(account); bugar teste
    if(account){
        
        if(account.senha !== password){// caso senha e  email diferente 
            alert("por favor verifica usuario ou senha");
       //     console.log(" teste segundo if"); bugar teste
      //  console.log("account.password"); bugar teste
            return;
        }

        saveSession(email, cheksession); // chamada da função saveSession

            window.location.href = "home.html"  
    }

    
})












// criar conta ####

document.getElementById("creat-from").addEventListener("submit", function (e) {// funcao ajuda pegar imformação do formulario
    e.preventDefault();
    // alert("Formulário enviado");

    // Obtenha os valores dos campos de entrada
    const email = document.getElementById("Email-input").value;
    const password = document.getElementById("Input-Password1").value;
    const confirmation = document.getElementById("Input-Password2").value;

    //console.log(email, password);

    if (email.length < 2) { // testa pra tamanho do meu email
        alert("prencha E-mail com  5 caractere");
        return;
    }
    if (password.length < 3) { // teste pra tamhao do meu email
        alert("prencha a senha  com 3 caractere");
        return;
    }
    else {
        if (password == confirmation) { // teste pra confirmação da senha
            alert("Formulário enviado")
             
        }else{
                alert("senha diferente");
                return "";
        }
            // console.log(email, password);
        }
        saveAcount({ // chamada da funcao
            login: email,
            senha: password,
            transacion: []
        });
    
        myModal.hide();// envio formulario
    });

    function checklog(){ // checkar logado*******
       if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
       }
       if(logged){
        saveSession(logged, session);
        window.location.href = "home.html";
       }
        
    }

    function saveAcount(data){ // funcao savar conta local stroge
        console.log(data); // imprimir meu dado
        localStorage.setItem(data.login, JSON.stringify(data));
        
    }

    function saveSession(data, save){ // função pra sessao permanecer usuario dentro da pagina

        if(save){
            localStorage.setItem("session", data);
        }

        sessionStorage.setItem("logged", data);
    }

    function getAccount(key){ // função que pega no local storge 
        const account = localStorage.getItem(key);

        if(account){
            return JSON.parse(account)
        }

        return "";
    }

    