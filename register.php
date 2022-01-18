<?php
	require "db.php";
	if (isset($_SESSION['logged_user'])) {
		header ('Location: profile.php');
	}
	
	$data = $_POST;
	
	if (isset($data['do_signup'])) {
		
		$flag = true;
		
		/*if (trim($data['name']) == '') {
			$_SESSION['message'] = "Введите свое имя!";
			$flag = false;
		}
		else if (trim($data['surname']) == '') {
			$_SESSION['message'] = "Введите свою фамилию!";
			$flag = false;
		}
		else if (trim($data['login']) == '') {
			$_SESSION['message'] = "Введите логин!";
			$flag = false;
		}
		else if (trim($data['email']) == '') {
			$_SESSION['message'] = "Введите email!";
			$flag = false;
		}
		else if ($_FILES['avatar']['size'] == 0) {
			$_SESSION['message'] = "Пожалуйста, загрузите фотографию профиля";
			$flag = false;
		}
		else if ($data['password'] == '') {
			$_SESSION['message'] = "Введите пароль!";
			$flag = false;
		}*/
		
		if (R::count('users', "login = ?", array($data['login'])) > 0) {
			$_SESSION['message'] = "Пользователь с таким именем уже существует!";
			$flag = false;
		}
		
		else if (R::count('users', "email = ?", array($data['email'])) > 0) {
			$_SESSION['message'] = "Пользователь с таким email уже существует!";
			$flag = false;
		}
		
		else if ($data['password_confirm'] != $data['password']) {
			$_SESSION['message'] = "Пароли не совпадают";
			$flag = false;
		}
		
		if ($flag = true) {
			$user = R::dispense('users');
			$user->name = $data['name'];
			$user->surname = $data['surname'];
			$user->login = $data['login'];
			$user->email = $data['email'];
			$user->password = password_hash($data['password'], PASSWORD_DEFAULT);
			
			$user->phone = $data['phone'];
			$user->dob = $data['dob'];
			$user->university = $data['university'];
			$user->gender = $data['gender'];
			
			$path = 'uploads/' . time() . $_FILES['avatar']['name'];
			if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $path)) {
				$_SESSION['message'] = 'Ошибка при загрузке изоображения';
				//header('Location: ../register.php');
			}
			$user->avatar = $path;
			R::store($user);
			$_SESSION['message'] = 'Регистрация прошла успешно!' . '<br/>'.'<a href="index.php"> Войти </a>';
		}
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset = "UTF-8">
		<title> Регистрация </title>
		<link href = "assets/style.css" rel = "stylesheet" type = "text/css"/>
	</head
	<body class ="signup">
		<!--Форма регистрации-->
		<form action = "/register.php" method = "post" enctype = "multipart/form-data">
			<label> Имя </label>
			<input type = "text" name = "name" placeholder = "Введите свое имя" required value = "<?php echo @$data['name'] ?>">
			<label> Фамилия </label>
			<input type = "text" name = "surname" placeholder = "Введите свою фамилию" required value = "<?php echo @$data['surname'] ?>">
			<label> Логин </label>
			<input type = "text" name = "login" placeholder = "Введите свой логин" required value = "<?php echo @$data['login'] ?>">
			<label> Почта </label>
			<input type = "email" name = "email" placeholder = "Введите адрес электронной почты" required value = "<?php echo @$data['email'] ?>">
			<label> Номер телефона (0XX-XXX-XX-XX)  </label>
			<input type = "tel" name = "phone" placeholder = "Введите ваш номер в формате 0xx-xxx-xx-xx" required pattern = "0[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
			value = "<?php echo @$data['phone'] ?>">
			<label> День рождения </label>
			<input type = "date" name = "dob" max = "2004-12-31" required value = "<?php echo @$data['dob'] ?>"> 
			<label> Пол </label>
			<p> <input class = "rb" type = "radio" name = "gender" value = "male" required> Мужчина
			<input class = "rb" type = "radio" name = "gender" value = "female"required > Женщина </p>
			<label> Место учебы </label>
			<select name = "university" class = "ddlist" required size='2'>
				<option value = "dnu"> Дніпровський національний університет імені Олеся Гончара </option>
				<option value = "med"> Дніпропетровська медична академія Міністерства охорони здоров’я України </option>
				<option value = "politech"> Національний технічний університет "Дніпровська політехніка" </option>
				<option value = "tamozhka"> Університет митної справи та фінансів </option>
				<option value = "diit"> Дніпровський національний університет залізничного транспорту імені академіка В. Лазаряна </option>
				<option value = "himtech"> Український державний хіміко-технологічний університет </option>
				<option value = "nobel"> Університет імені Альфреда Нобеля </option>
			</select>
			<label> Изображение профиля </label>
			<input type = "file" name = "avatar" accept = "image/png, image/gif, image/jpg" required>
			<label> Пароль </label>
			<input type = "password" name = "password" placeholder = "Введите пароль" required>
			<label> Подтверждение пароля </label>
			<input type = "password" name = "password_confirm" placeholder = "Введите пароль ещё раз" required> 
			<button type = "submit" name = "do_signup"> Войти </button>
			<p>
				У Вас уже есть аккаунт? — <a href = "/index.php"> Авторизируйтесь </a>
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