
const myModal = new bootstrap.Modal("#transaction-modal") // funçao ajuda madar formulario
let logged = sessionStorage.getItem("logged"); // declardo pra session
const session = localStorage.getItem("session");// declarado pra session

let data = {
    transacion: []
};

document.getElementById("transct-button").addEventListener("click", function (){ // home baixo 
    window.location.href ="transaction.html"
});//
document.getElementById("button-logout").addEventListener("click", logout); // objeto de click chamada função logout


// implementando lançamento ***
// mesma coisa que fizemos com formulario
document.getElementById("transaction-from").addEventListener("submit", function (e) {
    e.preventDefault();

    // console.log("estou dentro da função");
    const valor = parseFloat(document.getElementById("valor-input").value);
    const descricao = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    //console.log("estou agora aqui da função"); pra bugar
// ## 
    const saldoAtual = calcularSaldoAtual(); //** */
    // **Verifique se é uma transação de saída e se resultará em saldo negativo
    if (type === "2" && valor > saldoAtual) {
        alert("Atenção. seu soldo após cadastrar essa despesa será negativo, deseja continuar?");
        //return; // Aborta a adição da transação
    }

    data.transacion.unshift({
        valor: valor, type: type, descricao: descricao, date: date
    });

    


    //console.log("estou agora aqui depois da  da função"); pra bugar

    saveDate(data); // chamada

    e.target.reset();

    myModal.hide();
    getCash(); // chamada pra aparecer na lançamento de entrada
    getOut(); // chamada pra aparecer lançamento de saida
    getTotal();

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

    getCash(); // chamada de getCash 
    getOut(); // chamada de getOut
    getTotal();// chamada de getTotal
}

function logout() {// funça logout

    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCash() { // função de entrada e saída 
    const transacion = data.transacion;
    const entrada = transacion.filter((item) => item.type === "1");

    let entradaHtml = ``; // Defina entradaHtml aqui fora

    if (entrada.length) {
        let limit = 0;

        if (entrada.length > 5) {
            limit = 5;
        }
        else {
            limit = entrada.length;
        }

        for (let index = 0; index < limit; index++) {
            entradaHtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${entrada[index].valor.toFixed(2)}</h3>
                        <div class="container p-0"></div>
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${entrada[index].descricao}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                <p>Data: ${entrada[index].date}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        document.getElementById("cash-in1").innerHTML = entradaHtml;
    }

    //  entradaHtml conforme necessário entrada
}

// implementação da saida 
function getOut() { // função de entrada e saída 
    const transacion = data.transacion;
    const entrada = transacion.filter((item) => item.type === "2");

    let entradaHtml = ``; // Defina entradaHtml aqui fora

    if (entrada.length) {
        let limit = 0;

        if (entrada.length > 5) {
            limit = 5;
        }
        else {
            limit = entrada.length;
        }

        for (let index = 0; index < limit; index++) {
            entradaHtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${entrada[index].valor.toFixed(2)}</h3>
                        <div class="container p-0"></div>
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${entrada[index].descricao}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                <p>Data: ${entrada[index].date}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        document.getElementById("cash-out1").innerHTML = entradaHtml;
    }

}

// função que faz o total de entrada e saida 

function getTotal(){
    const transacion = data.transacion;
    let total = 0;
    transacion.forEach((item) => {
        if(item.type === "1"){
            total += item.valor;
        }else{  
            total -= item.valor;
        }

    });

    document.getElementById("total-solde").innerHTML =`R$ ${total.toFixed(2)}`;
}

function calcularSaldoAtual() {
    const transacion = data.transacion;
    let saldo = 0;

    transacion.forEach((item) => {
        if (item.type === "1") {
            saldo += item.valor;
        } else if (item.type === "2") {
            saldo -= item.valor;
        }
    });

    return saldo;
}

function saveDate(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
