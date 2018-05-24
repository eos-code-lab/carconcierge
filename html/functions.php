<?php
//require 'config.php';
define("MESSAGE_TYPE_NOTIFICATION", "MESSAGE_TYPE_NOTIFICATION");
define("MESSAGE_TYPE_THANK_YOU", "MESSAGE_TYPE_THANK_YOU");

function post($url, $data = array()) {
  $url = 'https://www.google.com/recaptcha/api/siteverify';
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);
  curl_setopt($ch, CURLOPT_URL, $url);

  $response = curl_exec($ch);

  curl_close($ch);

  return $response;
}

function send_mail($type, $to, $contact_form = array()) {
  $headers  = "MIME-Version: 1.1" . PHP_EOL;
  $headers .= "Content-type: text/html; charset=utf-8" . PHP_EOL;
  $headers .= "Content-Transfer-Encoding: 8bit" . PHP_EOL;
  $headers .= "From: CarConcierge <gabriel.durbaca@carconcierge.ro>" . PHP_EOL;
  $headers .= "Return-Path: $to" . PHP_EOL;
  $headers .= "Reply-To: gabriel.durbaca@carconcierge.ro" . PHP_EOL;
  $headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL;
  $headers .= "X-Originating-IP: " . $_SERVER['SERVER_ADDR'] . PHP_EOL;

  if ($type === MESSAGE_TYPE_THANK_YOU) {
    $subject = "[CarConcierge] Multumim pentru mesajul trimis!";
    $body = "Salut ${contact_form['name']},<br /><br />Iti multumim pentru mesaj.<br />Vei fi contactat in cel mai scurt timp posibil, de obicei nu mai mult de doua ore.<br /><br />Programul de functionare: Luni-Vineri, 09:00 - 18:00.<br /><br />Echipa Car Concierge<br /><a href='http://carconcierge.ro/'>www.carconcierge.ro</a>";
    mail($to, $subject, $body, $headers);
  } else {
    if (!empty($contact_form)) {
      $subject = "[CarConcierge - Contact] Mesaj nou de la ${contact_form['name']}";
      $body = "<b>Nume si prenume:</b> ${contact_form['name']}<br /><b>E-mail:</b> ${contact_form['email']}<br /><b>Telefon:</b> ${contact_form['tel']}<br /><b>Mesaj:</b> ${contact_form['message']}";
      mail($to, $subject, $body, $headers);
    }
  }
}
