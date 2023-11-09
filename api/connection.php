<?php
$servername = $_ENV['PLANETSCALE_DB_HOST'];;
$username = $_ENV['PLANETSCALE_DB_USERNAME'];;
$password = $_ENV['PLANETSCALE_DB_PASSWORD'];;
$dbname = $_ENV['PLANETSCALE_DB'];;
$ssl = $_ENV['PLANETSCALE_SSL_CERT_PATH'];
$conn = mysqli_init();
$conn->ssl_set(NULL, NULL, $ssl, NULL, NULL);
$conn->real_connect($servername, $username, $password, $dbname, null);


if ($conn->connect_error) {
    echo 'not connected to the database';
} else {
    echo "Connected successfully";
}

?>
