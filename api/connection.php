<?php
$servername = "aws.connect.psdb.cloud";
$username = "x47dpkdo8h444vcllq6e";
$password = "pscale_pw_Sbwpx17SXysWnInCjDzvRhCEf8nOoCZZznT6SiMAYjZ";
$dbname = "mariananailsatrist";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, null, null);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Additional SSL/TLS configuration
$conn->ssl_set(null, null, '/etc/pki/tls/certs/ca-bundle.crt', null, null);

// Check if SSL configuration is successful
if (!$conn->real_connect($servername, $username, $password, $dbname)) {
    die("Connection failed: " . $conn->connect_error);
}

// Rest of your code...

?>
