<?php

require_once '../controller/controllerComercial.php';

if($_POST['op'] == 1){
    $getClientes = new Comercial();
    $resp = $getClientes -> getClientes($_POST['texto']);
    echo($resp);
}
