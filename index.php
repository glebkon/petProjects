<?php
	require "db.php";
	
	if (isset($_SESSION['logged_user'])) {
		header ('Location: profile.php');
	}
	$data = $_POST;
	
	if (isset($data['do_signin'])) {
		
		$user = R::findOne('users', 'login = ?', array($data['login']));
		if (trim($data['login']) == '') {
			$_SESSION['message'] = "Введите логин!";
		}
		else if ($user) {
			if (password_verify($data['password'], $user->password)) {
				$_SESSION['logged_user'] = $user;
				header ('Location: profile.php');
			}
			else {
				$_SESSION['message'] = "Пароль введён неверно";
			}
		}
		else {
			$_SESSION['message'] = "Пользователь с таким логином не найден";
		}
		
	}
	
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset = "UTF-8">
		<title> Авторизация </title>
		<link href = "assets/style.css" rel = "stylesheet" type = "text/css"/>
	</head
	<body>
		<!--Форма авторизации-->
		<form action = "index.php" method = "post" class = "signin">
			<label> Логин </label>
			<input type = "text" placeholder = "Введите свой логин" name = "login" value = "<?php echo @$data['login'] ?>">
			<label> Пароль </label>
			<input type = "password" placeholder = "Введите пароль" name = "password">
			<button type = "submit" name = "do_signin"> Войти </button>
			<p>
				У Вас нет аккаунта? — <a href = "/register.php"> Зарегистрируйтесь </a>
			</p>
			<?php
				if (isset($_SESSION['message'])) {
					echo '<p class = "msg">' . $_SESSION['message'] . '</p>';
				}
				unset($_SESSION['message']);
			?>
		</form>
		
	</body>
</html>