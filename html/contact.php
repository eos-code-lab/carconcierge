<?php
require 'config.php';
require 'functions.php';

$email_to = 'gabriel.durbaca@carconcierge.ro, ifrim.claudia@gmail.com';

$required_fields = array(
  'name',
  'email',
  'message',
  'g-recaptcha-response'
);

foreach ($required_fields as $key) {
  if (empty($_POST[$key])) {
    header('Location: /');
  }
}

$response = post(RECAPTCHA_URL, array(
  'secret'   => RECAPTCHA_SECRET,
  'response' => $_POST['g-recaptcha-response'],
  'remoteip' => $_SERVER['REMOTE_ADDR']
));

if (false === $response) {
  header('Location: /');
}

$response = json_decode($response);

if (true !== $response->success) {
  header('Location: /');
}

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
  // save message in db
  // save_contact($name, $email, $tel, $message);
  // send notification on email for admins and send thank you message to client
  send_mail(MESSAGE_TYPE_NOTIFICATION, $email_to, array(
    'name' => $name,
    'email' => $email,
    'tel' => $tel,
    'message' => $message,
    )
  );
  send_mail(MESSAGE_TYPE_THANK_YOU, $email, array('name' => $name, 'email' => $email));
  //TODO: Add log message "Notification e-mail sent!"
  header('Location: /');
} else {
  //TODO: Add log message "Invalid e-mail detected" - data not saved, user redirected on main page
  header('Location: /');
}
