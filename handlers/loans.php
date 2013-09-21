<?php 
include('../config/init.php');

 $init->dbinit();
// from front-end 
$data    = file_get_contents("php://input"); 
$objData = json_decode($data);

// setting easy vars for query.
$user    = $objData->data->user_id;
$type    = $objData->data->type_id;

// query.
echo $init->get_loans($user,$type);

?>