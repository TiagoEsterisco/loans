<?php 
include('../config/init.php');

$init->dbinit();
// from front-end 
$data    = file_get_contents("php://input"); 
$objData = json_decode($data);

// setting easy vars for query.
$user    = $objData->data->username;
$pass    = $objData->data->password;

// query.
echo $init->do_login($user,$pass);

?>