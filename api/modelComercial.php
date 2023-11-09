<?php

require_once 'controllerComercial.php';

if($_POST['op'] == 1){
    $getClientes = new Comercial();
    $resp = $getClientes -> setClientes();
    echo($resp);
}
?>
