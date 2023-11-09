<?php
$servername = "aws.connect.psdb.cloud";
$username = "mgkmd19l0nnwr29wg0ed";
$password = "pscale_pw_SIl04X8ZQLKXTXz5V2CIAlMGIn58d7hAB1YRKCM5gYU";
$dbname = "mariananailsatrist";

echo"1";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, null, '/etc/pki/tls/certs/ca-bundle.crt');


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Resto do seu código...

?>
