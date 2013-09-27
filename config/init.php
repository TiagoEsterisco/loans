<?php

include('config.php');
$DBServer = 'localhost';
$DBName   = 'loans';
$DBUser   = 'root';
$DBPass   = 'root';


$init = new Init();
$init->db($DBServer,$DBName, $DBUser, $DBPass);

?>