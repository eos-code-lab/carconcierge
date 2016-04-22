<?php
//require 'config.php';
define("MESSAGE_TYPE_NOTIFICATION", "MESSAGE_TYPE_NOTIFICATION");
define("MESSAGE_TYPE_THANK_YOU", "MESSAGE_TYPE_THANK_YOU");

function save_contact($name, $email, $tel, $message){
	// $pdo = new PDO(
	// 		$config['database_dsn'],
	// 		$config['database_user'],
	// 		$config['database_pass'],
	// 	);

	// $query = "INSERT INTO contact(id,name,email,phone,message) VALUES ('NULL','$name','$email','$tel','$message')";
	// $stmt = $pdo->prepare($query);
	// $stmt->bindParam(':name', $name, PDO::PARAM_STR);
	// $stmt->bindParam(':email', $email, PDO::PARAM_STR);
	// $stmt->bindParam(':tel', $tel, PDO::PARAM_STR);
	// $stmt->bindParam(':message', $message, PDO::PARAM_STR);
	// $stmt->execute();
}

function send_mail($type, $to, $contact_form = array()) {
	$headers  = "MIME-Version: 1.1" . PHP_EOL;
	$headers .= "Content-type: text/html; charset=utf-8" . PHP_EOL;
	$headers .= "Content-Transfer-Encoding: 8bit" . PHP_EOL;
	$headers .= "From: $name <$email>" . PHP_EOL;
	$headers .= "Return-Path: $email_to" . PHP_EOL;
	$headers .= "Reply-To: $email" . PHP_EOL;
	$headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL;
	$headers .= "X-Originating-IP: " . $_SERVER['SERVER_ADDR'] . PHP_EOL;

	if ($type === MESSAGE_TYPE_THANK_YOU) {
		$subject = "[CarConcierge] Multumim pentru mesajul trimis!";
		$body = "Salut ${contact_form['name']},<br /><br />Iti multumim pentru mesaj.<br />Vei fi contactat in cel mai scurt timp posibil, de obicei nu mai mult de doua ore.<br /><br />Programul de functionare: Luni-Vineri, 09-18<br /><br />Echipa Car Concierge<br /><a href='http://carconcierge.ro/'>www.carconcierge.ro</a>";
		mail($to, $subject, $body, $headers);
	} else {
		if (!empty($contact_form)) {
			$subject = "[CarConcierge - Contact] Mesaj nou de la ${contact_form['name']}";
			$body = "<b>Nume si prenume:</b> ${contact_form['name']}<br /><b>E-mail:</b> ${contact_form['email']}<br /><b>Telefon:</b> ${contact_form['tel']}<br /><b>Mesaj:</b> ${contact_form['message']}";
			mail($to, $subject, $body, $headers);
		}
	}
}
