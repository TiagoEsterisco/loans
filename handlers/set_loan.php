<?php
include('../config/init.php');

$init->dbinit();
// from front-end

$data    = file_get_contents("php://input");
$objData = json_decode($data);

// setting easy vars for query.
$user_id   = $objData->data->user_id;
$friend    = $objData->data->friend_name;
$object    = $objData->data->object;
$date      = $objData->data->date;

// query.
echo $init->set_loan($user_id, $friend, $object, $date);

//echo $user_id."".$friend."".$object."".$date;

?>