<?php
$servername = $_ENV['PLANETSCALE_DB_HOST'];;
$username = $_ENV['PLANETSCALE_DB_USERNAME'];;
$password = $_ENV['PLANETSCALE_DB_PASSWORD'];;
$dbname = $_ENV['PLANETSCALE_DB'];;
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
