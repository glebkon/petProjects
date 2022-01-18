<?php

	require "libs/rb.php";
	
	R::setup( 'mysql:host=localhost;dbname=finaldb',
        'root', '' );
		
	session_start();
?>