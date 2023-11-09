<?php

require_once 'connection.php';

class Comercial
{

    function getClientes($texto){

        global $conn;
        $msg = "";
        $sql = "";
        
        $sql = "INSERT INTO Exemplo (nome, idade)" .
            " VALUES ('" . $texto . "', '22')";
        
        if ($conn->query($sql) === TRUE) {
            $msg = "Sucesso";
        } else {
            $msg = "Error: " . $sql . "<br>" . $conn->error;
        }
        
        $conn->close();
        
        return $msg;        

    }



}
