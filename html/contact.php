<?php
require 'config.php';
require 'functions.php';

$email_to = NOTIFICATIONS_EMAIL_LIST;

$required_fields = array(
  'name',
  'email',
  'message',
  'g-recaptcha-response'
);

foreach ($required_fields as $key) {
  if (empty($_POST[$key])) {
    return json_encode([
      'result'=>'required_fields',
      'errors'=>['all'=>'Completati campurile obligatorii.']
    ]);
  }
}

$response = post(array(
  'secret'   => RECAPTCHA_SECRET,
  'response' => $_POST['g-recaptcha-response'],
  'remoteip' => $_SERVER['REMOTE_ADDR']
));

if (false === $response) {
  return json_encode([
    'result'=>'recaptcha_validation_failed',
    'errors'=>['captcha'=>'Validarea ReCaptcha a esuat.']
  ]);
}

$response = json_decode($response);

if (true !== $response->success) {
  return json_encode([
    'result'=>'recaptcha_validation_failed',
    'errors'=>['captcha'=>'Validarea ReCaptcha a esuat.']
  ]);
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
  return json_encode([
    'result'=>'header_injection_detected',
    'errors'=>['message'=>'Mesajul trebuie sa fie scurt si fara caractere speciale in exces :).']
  ]);
}

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
  // send notification on email for admins and send thank you message to client
  send_mail(MESSAGE_TYPE_NOTIFICATION, $email_to, array(
    'name' => $name,
    'email' => $email,
    'tel' => $tel,
    'message' => $message,
    )
  );
  send_mail(MESSAGE_TYPE_THANK_YOU, $email, array('name' => $name, 'email' => $email));
  return json_encode([
    'result'=>'success'
  ]);
} else {
  return json_encode([
    'result'=>'failed',
    'errors'=>['all'=>'Mesajul nu a fost trimis cu success. Adresa de mail introdusa in formular nu este valida.']
  ]);
}
