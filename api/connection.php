<?php
$servername = "us-east.connect.psdb.cloud";
$username = "q22jl9a79rsymx497jfd";
$password = "pscale_pw_86DHhEdyEiF8LWxAM8dPmNcpo4kByYGSJZXLhkHmGkA";
$dbname = "mariananailsatrist";



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, null, '/etc/pki/tls/certs/ca-bundle.crt');


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Resto do seu código...

?>
