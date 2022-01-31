<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer/language/');
$mail->IsHTML(true);

$mail->setFrom('artur@zanyatiyadoma.ru', 'Заявка с сайта');
$mail->AddAddress('artur@zanyatiyadoma.ru');


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
if (trim(!empty($_POST['question']))) {
    $body .= '<p><b>Вопрос:</b> ' . $_POST['question'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><b>Djghjc:</b> ' . $_POST['email'] . '</p>';
}

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


$mail->Body = $body;

if (!$mail->send()) {
    $message = false;
} else {
    $message = true;
}
$response = ['message' => $message];

header('Content-type: application/json');

echo json_encode($response);
