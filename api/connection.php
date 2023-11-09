<?php
$servername = "aws.connect.psdb.cloud";
$username = "x47dpkdo8h444vcllq6e";
$password = "pscale_pw_Sbwpx17SXysWnInCjDzvRhCEf8nOoCZZznT6SiMAYjZ";
$dbname = "mariananailsatrist";

echo"2";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, null, '/etc/pki/tls/certs/ca-bundle.crt');


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Resto do seu código...

?>
