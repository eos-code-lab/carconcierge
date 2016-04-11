<?php
require 'config.php';

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