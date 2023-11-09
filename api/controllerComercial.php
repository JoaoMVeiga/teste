<?php

require_once 'connection.php';

class Comercial
{

    function setClientes(){
     global $conn;
    
        $dados = [];
    
        $sql = "SELECT * FROM Exemplo";
    
        $result = mysqli_query($conn, $sql);
        if ($result && mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                // Push the entire row to the $dados array
                array_push($dados, $row);
            }
        }
    
        return json_encode($dados, JSON_PRETTY_PRINT);    
    
        }

    function inserUser($nome){

            global $conn;

        // Assuming you have a table named 'Usuarios' with a column 'Nome'
        $sql = "INSERT INTO Exemplo (Nome, Idade) VALUES ('$nome', '22')";

        if (mysqli_query($conn, $sql)) {
            return "Inserção bem-sucedida!";
        } else {
            return "Erro na inserção: " . mysqli_error($conn);
        }
        
    }

}

?>
