
function ler(){
    
let dadosPost = new FormData();

dadosPost.append('op', 1);
dadosPost.append('texto', $("#nome").val());

$.ajax({
    url: "api/modelComercial.php",
    method: "POST",
    data: dadosPost,
    cache: false,
    processData: false,
    contentType: false,
    dataType: "html",
    success: function(response) {
        // Manipular a resposta de sucesso aqui
        console.log("Resposta bem-sucedida:", response);



        $("#dados").html(response)

    },
    error: function(xhr, status, error) {
        // Manipular o erro aqui
        console.log("Erro na solicitação AJAX:", status, error);
    }
});

}

function inser(){
    
let dadosPost = new FormData();

dadosPost.append('op', 2);
dadosPost.append('texto', $("#nome").val());

$.ajax({
    url: "api/modelComercial.php",
    method: "POST",
    data: dadosPost,
    cache: false,
    processData: false,
    contentType: false,
    dataType: "html",
    success: function(response) {
        // Manipular a resposta de sucesso aqui
        console.log("Resposta bem-sucedida:", response);
        

    },
    error: function(xhr, status, error) {
        // Manipular o erro aqui
        console.log("Erro na solicitação AJAX:", status, error);
    }
});

}
