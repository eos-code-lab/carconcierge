<?php
//TODO: Set in config file
$email_to = 'test.me@mailinator.com';


if($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$tel = '';
		$message = $_POST['message'];
		$pattern = '/[\r\n]|Content-Type:|Bcc:|Cc:/i';

		if (isset($_POST['tel'])) {
			$tel = $_POST['tel'];
		}

		if (preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $subject)) {
    	//TODO: Add log message "Header injection detected" - data not saved, user redirected on main page
    	header('Location: /');
    }

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    	$subject = "[CarConcierge - Contact] Mesaj nou de la $name";
      $body = "<b>Nume si prenume:</b> $name <br /> <b>E-mail:</b> $email <br /> <b>Telefon:</b> $tel <br /> <b>Mesaj:</b> $message";
      $headers  = "MIME-Version: 1.1" . PHP_EOL;
      $headers .= "Content-type: text/html; charset=utf-8" . PHP_EOL;
      $headers .= "Content-Transfer-Encoding: 8bit" . PHP_EOL;
      $headers .= "From: $name <$email>" . PHP_EOL;
      $headers .= "Return-Path: $email_to" . PHP_EOL;
      $headers .= "Reply-To: $email" . PHP_EOL;
      $headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL;
      $headers .= "X-Originating-IP: " . $_SERVER['SERVER_ADDR'] . PHP_EOL;
      mail($email_to, $subject, $body, $headers);
      //TODO: Add log message "Notification e-mail sent!"
    	header('Location: /');
    } else {
    	//TODO: Add log message "Invalid e-mail detected" - data not saved, user redirected on main page
    	header('Location: /');
    }

	} else {
		//TODO: Add log message "Form incorrect completed" - data not saved, user redirected on main page
		header('Location: /');
	}
}
