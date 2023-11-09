<?php

require_once 'controllerComercial.php';

if($_POST['op'] == 1){
    $getClientes = new Comercial();
    $resp = $getClientes -> setClientes();
    echo($resp);
}else if($_POST['op'] == 2){
    $inserUser = new Comercial();
    $resp = $inserUser -> inserUser($_POST['nome']);
    echo($resp);
}
    
?>
