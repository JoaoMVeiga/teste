<?php
$servername = "us-east.connect.psdb.cloud";
$username = "q22jl9a79rsymx497jfd";
$password = "pscale_pw_86DHhEdyEiF8LWxAM8dPmNcpo4kByYGSJZXLhkHmGkA"; //2gUeCUsOYbfjn5Iprcwo
$dbname = "mariananailsatrist";
//2gUeCUsOYbfjn5Iprcwo

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, null, MYSQLI_CLIENT_SSL);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


?>
