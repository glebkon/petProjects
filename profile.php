<?php
	require "db.php";
	if (!$_SESSION['logged_user']) {
		header ('Location: index.php');
	}
	//echo "Hello, " . $_SESSION['logged_user']['login'];
	
	function placeof($answer) {
		switch ($answer) {
			case 'dnu':
				$answer = "Дніпровський національний університет імені Олеся Гончара";
				break;
			case 'politech':
				$answer = "Національний технічний університет Дніпровська політехніка";
				break;
			case "med":
				$answer = "Дніпропетровська медична академія Міністерства охорони здоров’я України";
				break;
			case "tamozhka":
				$answer = "Університет митної справи та фінансів";
				break;
			case "diit":
				$answer = "Дніпровський національний університет залізничного транспорту імені академіка В. Лазаряна";
				break;
			case "himhtech":
				$answer = "Український державний хіміко-технологічний університет";
				break;
			case "nobel":
				$answer = "Університет імені Альфреда Нобеля";
				break;
		}
		return $answer;
	}
	
	function usergender ($ug) {
		switch ($ug) {
			case 'male':
				$ug = "мужской";
				break;
			case 'женский':
				$ug = "женский";
		}
		return $ug;
	}
	
	function bday ($bd) {
		return $bd[8] . $bd[9] . '.' . $bd[5] . $bd[6] . '.' . $bd[0] . $bd[1] . $bd[2] . $bd[3];
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset = "UTF-8">
		<title> Добро пожаловать! </title>
		<link href = "assets/style.css" rel = "stylesheet" type = "text/css"/>
	</head
	
	<body>
		<!--Профиль-->
		<div>
			<img src="<?= $_SESSION['logged_user']['avatar'] ?>" width = "300" alt = "">
			<h2> <?= $_SESSION['logged_user']['name'] . ' ' . $_SESSION['logged_user']['surname'] . '<a>' . ' @' . $_SESSION['logged_user']['login'] . '</a>'?> </h2>
			<p> <?= "Пол: " . usergender($_SESSION['logged_user']['gender']) ?> </p>
			Почта: <a href = "#"> <?= $_SESSION['logged_user']['email'] ?> </a> <br/>
			<p> <?= "Номер телефона: " . $_SESSION['logged_user']['phone'] ?> </p>
			<p> <?= "День рождения: " . bday($_SESSION['logged_user']['dob']) ?> </p>
			<p> <?= "Место учебы: " . placeof($_SESSION['logged_user']['university']) ?> </p>
			<a class = "logout" href = "logout.php"> Выйти </a>
		</div>
		
	</body>
	
</html>