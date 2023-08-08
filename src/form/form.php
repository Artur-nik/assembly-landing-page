<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer/language/');
$mail->IsHTML(true);

//  if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php')) {
//      /** Loads the WordPress Environment and Template */
//      require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');
//      $email_to = get_option( 'send_email', $default = false );
//  }
//    
//  $email_from = 'no-reply@' . preg_replace('/\/+$/', '', $_SERVER['HTTP_HOST']); // E-mail отправителя
//  $mail->setFrom($email_from, 'Заявка с сайта');
//  
//  $email_to = str_replace(' ', '', $email_to);
//  $email_list = explode(",", $email_to);
//  
//  foreach($email_list as $item){
//  	$mail->AddAddress($item);
//  }

//*
$email_from = 'no-reply@' . preg_replace('/\/+$/', '', $_SERVER['HTTP_HOST']); // E-mail отправителя
$mail->setFrom($email_from, 'Заявка с сайта');
//*
$mail->AddAddress('artur@zanyatiyadoma.ru');

//*
$mail->Subject = 'Заявка с сайта';

$body = '<h1>Заявка с сайта </h1>';


if (trim(!empty($_POST['form-title']))) {
    $body .= '<p><b>Форма:</b> ' . $_POST['form-title'] . '</p>';
}
if (trim(!empty($_POST['name']))) {
    $body .= '<p><b>Имя:</b> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['phone']))) {
    $body .= '<p><b>Номер телефона:</b> ' . $_POST['phone'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><b>Email:</b> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['comment']))) {
    $body .= '<p><b>Комментарий:</b> ' . $_POST['comment'] . '</p>';
}
if (trim(!empty($_POST['info']))) {
    $body .= '<p><b>Дополнительная информация:</b> ' . $_POST['info'] . '</p>';
}

// URL страницы

if (trim(!empty($_POST['url-page']))) {
    $body .= '<hr>';
    $body .= '<p><b>Url:</b> ' . $_POST['url-page'] . '</p>';
}

// --------------------Начала кода распознавания Мобик/ПК---------------------

if ($_POST['device']=='mobile') $dtype='Мобильный';
if ($_POST['device']=='pk') $dtype='ПК';

$body .= '<p><b>Тип устройства пользователя:</b> ' . $dtype . '</p>';
// --------------------Конец кода распознавания Мобик/ПК---------------------


// --------------------Начала кода распознавания региона по IP--------------------
//Функция получения IP пользователя
function get_ip()
{
	$value = '';
	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
		$value = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$value = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} elseif (!empty($_SERVER['REMOTE_ADDR'])) {
		$value = $_SERVER['REMOTE_ADDR'];
	}
  
	return $value;
}
$uip=get_ip();

//Запрашиваем данные по IP
$ip_params=file_get_contents('http://ip-api.com/json/'.$uip.'?lang=ru');
$ip_params=json_decode($ip_params);

//Добавляем в письмо
$body .= '<hr>';
$body .= '<p><b>Регион пользователя (по IP):</b></p>';
$body .= '<p><b>Страна - </b> ' . $ip_params->country . '</p>';
$body .= '<p><b>Регион - </b> ' . $ip_params->regionName . '</p>';
$body .= '<p><b>Город - </b> ' . $ip_params->city . '</p>';

// --------------------Конец кода распознавания региона по IP---------------------


// --------------------Начала кода распознавания UTM---------------------
//Добавляем метки в письмо
$body .= '<hr>';
$body .= '<p><b>UTM метки:</b></p>';
if (trim(!empty($_POST['utm_source']))) {
    $body .= '<p><b>Название рекламной площадки - </b> ' . $_POST['utm_source'] . '</p>';
}
if (trim(!empty($_POST['utm_medium']))) {

$utm_medium='Другая реклама	('.$_POST['utm_medium'].')';

if ($_POST['utm_medium']=='organic') $utm_medium='Бесплатный поиск';
if ($_POST['utm_medium']=='referral') $utm_medium='Переход';
if ($_POST['utm_medium']=='email') $utm_medium='Электронная почта';
if ($_POST['utm_medium']=='cpc' || $_POST['utm_medium']=='ppc' || $_POST['utm_medium']=='paidsearch') $utm_medium='Поисковая реклама';
if ($_POST['utm_medium']=='social' || $_POST['utm_medium']=='social-network' || $_POST['utm_medium']=='social-media' || $_POST['utm_medium']=='sm') $utm_medium='Социальные сети';
if ($_POST['utm_medium']=='display' || $_POST['utm_medium']=='cpm' || $_POST['utm_medium']=='banner') $utm_medium='Медийная реклама';

    $body .= '<p><b>Тип рекламы - </b> ' . $utm_medium . '</p>';
}
if (trim(!empty($_POST['utm_campaign']))) {
    $body .= '<p><b>Название кампании - </b> ' . $_POST['utm_campaign'] . '</p>';
}
// --------------------Конец кода распознавания UTM---------------------


//* один файл
if (
    isset($_FILES['one-file']) &&
    $_FILES['one-file']['error'] == UPLOAD_ERR_OK
) {
    $mail->AddAttachment(
        $_FILES['one-file']['tmp_name'],
        $_FILES['one-file']['name']
    );
}

//*  multiple
if (!empty($_FILES['files']['name'][0])) {
    foreach ($_FILES['files']['name'] as $key => $value) {
        $out_files[] = array("name" => $_FILES['files']['name'][$key], "tmp_name" => $_FILES['files']['tmp_name'][$key]);
    }
    $filesSend = true;
} else {
    $filesSend = false;
}
if ($filesSend) {
    foreach ($out_files as $k => $v) {
        $mail->AddAttachment($out_files[$k]['tmp_name'], $out_files[$k]['name']);
    }
}

$message = false;

if (!empty($_POST)) {
    $mail->Body = $body;
    
    if ($mail->send()) {
        $message = true;
    }
}
$response = ['message' => $message];

header('Content-type: application/json');

echo json_encode($response);
