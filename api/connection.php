<?php
$servername = "us-east.connect.psdb.cloud";
$username = "q22jl9a79rsymx497jfd";
$password = "pscale_pw_86DHhEdyEiF8LWxAM8dPmNcpo4kByYGSJZXLhkHmGkA";
$dbname = "mariananailsatrist";

// Caminho para o certificado
$ca_cert = "/etc/pki/tls/certs/ca-bundle.crt";

// Configuração SSL
$ssl_options = array(
    'ssl' => array(
        'cafile' => $ca_cert,
        'verify_peer' => true,
        'verify_peer_name' => true,
    ),
);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, null, MYSQLI_CLIENT_SSL);

// Configuração do certificado
mysqli_ssl_set($conn, null, null, $ca_cert, null, null);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Resto do seu código...

?>
