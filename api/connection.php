<?php
$servername = "aws.connect.psdb.cloud";
$username = "x47dpkdo8h444vcllq6e";
$password = "pscale_pw_Sbwpx17SXysWnInCjDzvRhCEf8nOoCZZznT6SiMAYjZ";
$dbname = "mariananailsatrist";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname, null, null);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Adicionar variável de sistema PLANETSCALE_SSL_CERT_PATH ao caminho do certificado SSL
$ssl_cert_path = getenv('PLANETSCALE_SSL_CERT_PATH');
if ($ssl_cert_path) {
    $conn->ssl_set(null, null, $ssl_cert_path, null, null);
}

// Verificar se a configuração SSL foi bem-sucedida
if (!$conn->real_connect($servername, $username, $password, $dbname)) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Restante do seu código...

?>
