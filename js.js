
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
        
        // Assuming you want to display the updated data, you can parse the JSON
        console.log(jsonData);

        $("#dados").html(jsonData)
    },
    error: function(xhr, status, error) {
        // Manipular o erro aqui
        console.log("Erro na solicitação AJAX:", status, error);
    }
});

}

function inserir(){
    
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
        
        // Assuming you want to display the updated data, you can parse the JSON
        console.log(jsonData);

        $("#dados").html(jsonData)
    },
    error: function(xhr, status, error) {
        // Manipular o erro aqui
        console.log("Erro na solicitação AJAX:", status, error);
    }
});

}
