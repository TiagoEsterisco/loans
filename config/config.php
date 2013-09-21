<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

class Init {
	
	function Init() {}
	
	function db ($host,$database,$username,$password) {
		$this->db_host  	= $host;
		$this->database  	= $database;
		$this->username 	= $username;
		$this->pwd  		= $password;
	}
	
	function dbinit () {
		$this->conn = new mysqli($this->db_host,$this->username,$this->pwd,$this->database);
		if ($this->conn->connect_error) {
			trigger_error('Database connection failed: '  . $this->conn->connect_error, E_USER_ERROR);
		}
	}
	
	function sql_action($sql) {
		
		$rs=$this->conn->query($sql);
		if($rs === false) {
			trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $this->conn->error, E_USER_ERROR);
		}
		return $rs;
	}
	
	function do_login ($username,$password)
	{
		$sql='SELECT id_user from t_user where username="'.$username.'" and password= "'.$password.'";';
		$rs = $this->sql_action($sql);
		$rows_returned = $rs->num_rows;

		if($rows_returned==0){
			return false;
		} else {
			$rs->data_seek(0);
			$row = $rs->fetch_assoc();
			return $row['id_user'];
		}
	}
	

	function get_loans ($user_id,$type_id)
	{
		$sql = 'SELECT l.id_friend, u.username, l.date_in, l.date_out
				from t_loan l
				inner join t_user u
				on l.id_friend=u.id_user
				where l.id_user = '.$user_id.' and l.type_id = '.$type_id;

		$rs = $this->sql_action($sql);
		$rows_returned = $rs->num_rows;

		if($rows_returned==0){
			return false;
		} else {
			$myArray = array();
			$tempArray = array();
		}
		$rs->data_seek(0);
		while($row = $rs->fetch_assoc()){
		 	$tempArray = $row;
            array_push($myArray, $tempArray);
		}

		return json_encode($myArray);
	}
	
	/* 	--- To be deleted  --- */
	function query ()
	{
		$sql='SELECT * from t_user;';
		$rs=$this->conn->query($sql);
		if($rs === false) {
			trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $this->conn->error, E_USER_ERROR);
		} else {
			$rows_returned = $rs->num_rows;
			echo "Rows, returned: ".$rows_returned . '<br>';
		}
		$rs->data_seek(0);
		while($row = $rs->fetch_assoc()){
			echo $row['id_user']."-".$row['username']. '<br>';
		}
	}
} 

?>