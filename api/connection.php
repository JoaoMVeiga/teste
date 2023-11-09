<?php
$servername = "aws.connect.psdb.cloud";
$username = "x47dpkdo8h444vcllq6e";
$password = "pscale_pw_Sbwpx17SXysWnInCjDzvRhCEf8nOoCZZznT6SiMAYjZ";
$dbname = "mariananailsatrist";
$ssl = $_ENV['PLANETSCALE_SSL_CERT_PATH'];
$mysqli = mysqli_init();
$mysqli->ssl_set(NULL, NULL, $ssl, NULL, NULL);
$mysqli->real_connect($servername, $username, $password, $dbname, null);


if ($mysqli->connect_error) {
    echo 'not connected to the database';
} else {
    echo "Connected successfully";
}

?>
