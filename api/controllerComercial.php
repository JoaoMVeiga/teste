<?php

require_once 'connection.php';

class Comercial
{

    function getClientes($texto){
        global $conn;

        $dados = [];

        $sql = "SELECT Exemplo.* FROM Exemplo";

        $result = mysqli_query($conn, $sql);
        if ($result && mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                array_push($dados, array('id' => $row['id'], 'name' => $row['name']));
            }
        }

        return (json_encode($dados, JSON_PRETTY_PRINT));    

    }



}
