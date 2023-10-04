const myModal = new bootstrap.Modal("#transaction-modal") // funçao ajuda madar formulario
let logged = sessionStorage.getItem("logged"); // declardo pra session
const session = localStorage.getItem("session");// declarado pra session

let data = {
    transacion: []
};

//aprovetada
document.getElementById("button-logout").addEventListener("click", logout); // objeto de click chamada função logout


document.getElementById("transaction-from").addEventListener("submit", function (e) { // aprovetei funão hom.js
    e.preventDefault();

     console.log("estou dentro da função");
    const valor = parseFloat(document.getElementById("value-input").value);
    console.log("foi agora");
    const descricao = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    //console.log("estou agora aqui da função"); pra bugar

    data.transacion.unshift({
        valor: valor, type: type, descricao: descricao, date: date
    });

    //console.log("estou agora aqui depois da  da função"); pra bugar

    saveDate(data); // chamada

    e.target.reset();
    myModal.hide();

    getTrans();// trans

    alert("Lançamento adicionado com sucesso ") // alerta 

});

checklog();


function checklog() { // checkar logado*******
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if (!logged) { // se não tiver logado 

        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {

        data = JSON.parse(dataUser);
    }

    getTrans();
}

function logout() {// funça logout

    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTrans(){ // função transacão 
    const transacion = data.transacion;
    let transacionHtml = ``;

    if(transacion.length){
          transacion.forEach((item) => {
            let type = "Entrada";
          if(item.type === "2"){   
            type = "Saida";
        }
        transacionHtml +=`
        
        <tr>
              <th scope="row">${item.date}</th>
              <td>${ item.valor.toFixed(2)}</td>
              <td>${type}</td>
              <td>${item.descricao}</td>
      </tr>
        `
    });
 }
 document.getElementById("trans-list").innerHTML = transacionHtml;
}

function saveDate(data) { // salvar dado
    localStorage.setItem(data.login, JSON.stringify(data));
}