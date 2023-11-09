<?php

require_once 'connection.php';

class Comercial
{

    function getClientes($texto){
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

}

?>
