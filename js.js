
function inser(){
    
    let dadosPost = new FormData();

    dadosPost.append('op', 1);
    dadosPost.append('texto', $("#nome").val());
    
    $.ajax({
        url: "api/model/modelComercial.php",
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
