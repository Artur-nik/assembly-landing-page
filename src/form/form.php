<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
//**************AmoCrm********************************* */
require 'config.php';
require 'amocrm.php';
//**************AmoCrm End***************************** */

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
$title_body = 'Заявка с сайта #SITE-433';
//*
$email_from = 'no-reply@' . preg_replace('/\/+$/', '', $_SERVER['HTTP_HOST']); // E-mail отправителя
$mail->setFrom($email_from , $title_body);
//*
$mail->AddAddress('');
//$mail->AddAddress('telebot@editme.agency');
//*
$mail->Subject = $title_body;

$body = '<!DOCTYPE html    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"    xmlns:o="urn:schemas-microsoft-com:office:office" lang="ru"><head>    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />    <meta http-equiv="X-UA-Compatible" content="IE=edge" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <!-- <meta name="color-scheme" content="light dark" />    <meta name="supported-color-schemes" content="light dark" /> -->    <title>Свяжитесь с клиентом</title>    <style type="text/css">        table {            border-spacing: 0;            mso-cellspacing: 0;            mso-padding-alt: 0;        }        td {            padding: 0;        }        #outlook a {            padding: 0;        }        a {            text-decoration: none;            color: #e8fbfa;            font-size: 16px;        }        @media screen and (max-width: 599.98px) {            h1 {                font-size: 24px !important;                padding-bottom: 20px !important;            }            p {                font-size: 14px !important;            }            td {            }        }        @media screen and (max-width: 399.98px) {        }        /* Custom Dark Mode Colors */        /* :root {      color-scheme: light dark;      supported-color-schemes: light dark;    }    @media (prefers-color-scheme: dark) {      table,      td {        background-color: #06080B !important;      }      h1,      h2,      h3,      p {        color: #ffffff !important;      }    } */    </style>    <!--[if (gte mso 9)|(IE)]>    <style type="text/css">      table {border-collapse: collapse !important;}    </style>  <![endif]-->    <!--[if (gte mso 9)|(IE)]>  <xml>    <o:OfficeDocumentSettings>      <o:AllowPNG/>      <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings>  </xml>  <![endif]--></head><body style="Margin:0;padding:0;min-width:100%;background-color:#C7ECF2;">    <!--[if (gte mso 9)|(IE)]>      <style type="text/css">         body {background-color: #C7ECF2!important;}         body, table, td, p, a {font-family: Verdana, sans-serif, Arial, Helvetica!important;}      </style>   <![endif]-->    <center style="width: 100%;table-layout:fixed;background-color: #ffffff;padding-top: 40px;padding-bottom: 40px;">        <div style="max-width: 600px; padding: 0 10px 0 10px;">            <!-- Preheader (remove comment) -->            <div                style="font-size: 0px;color: #fafdfe;line-height: 1px;mso-line-height-rule:exactly;display: none;max-width: 0px;max-height: 0px;opacity: 0;overflow: hidden;mso-hide:all;">                Стартовое описание            </div>            <!-- End Preheader (remove comment) -->         <!--[if (gte mso 9)|(IE)]>            <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"              style="color:#000000;">            <tr>            <td>        <![endif]-->            <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation" style="color:#000000;font-family: Verdana,sans-serif, Arial, Helvetica;Margin:0;padding:0;width: 100%;max-width: 600px; line-height: 127.9%;">';

$body .= '<tr><td><h1 style="font-size: 32px;font-weight: 700;line-height: 127.9%; padding-bottom: 40px; margin: 0;">Свяжитесь с клиентом</h1></td></tr>';

$body .= '<tr><td>';

if (trim(!empty($_POST['form-title']))) {
    $body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Форма:</b> ' . $_POST['form-title'] . '</p>';
}
if (trim(!empty($_POST['name']))) {
    $body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Имя:</b> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['phone']))) {
    $body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Номер телефона:</b> ' . $_POST['phone'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Email:</b> ' . $_POST['email'] . '</p>';
    $body .= '<p><b>Email:</b> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['comment']))) {
    $body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Комментарий:</b> ' . $_POST['comment'] . '</p>';
}
if (trim(!empty($_POST['info']))) {
    $body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Дополнительная информация:</b> ' . $_POST['info'] . '</p>';
}

$body .= '</tr></td>';

//
$body .= '<tr><td style="padding-bottom: 10px;"><div style="height: 1px; width: 100%; background-color: #00A9C2;"></div></td></tr>';
//
$body .= '<tr><td>';
// URL страницы

if (trim(!empty($_POST['url-page']))) {
    $body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Url:</b> ' . $_POST['url-page'] . '</p>';
}

// --------------------Начала кода распознавания Мобик/ПК---------------------

if ($_POST['device']=='mobile') $dtype='Мобильный';
if ($_POST['device']=='pk') $dtype='ПК';

$body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Дополнительная информация:</b> ' . $dtype . '</p>';
// --------------------Конец кода распознавания Мобик/ПК---------------------
$body .= '</tr></td>';
//

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

//************ Новая правка
$uip=get_ip();
if (strpos($uip,', ')!==false){
    $uip=explode(', ',$uip);
  $uip=$uip[0];
}
//************ Новая правка конец

//Запрашиваем данные по IP
$ip_params=file_get_contents('http://ip-api.com/json/'.$uip.'?lang=ru');
$ip_params=json_decode($ip_params);


//Добавляем в письмо
$body .= '<tr><td style="padding-bottom: 10px;"><div style="height: 1px; width: 100%; background-color: #00A9C2;"></div></td></tr>';
$body .= '<tr><td>';
$body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Регион пользователя (по IP):</b></p>';
$body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Страна: </b> ' . $ip_params->country . '</p>';
$body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Регион: </b> ' . $ip_params->regionName . '</p>';
$body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Город: </b> ' . $ip_params->city . '</p>';
$body .= '</tr></td>';
// --------------------Конец кода распознавания региона по IP---------------------


// --------------------Начала кода распознавания UTM---------------------
//Добавляем метки в письмо

$body .= '<tr><td style="padding-bottom: 10px;"><div style="height: 1px; width: 100%; background-color: #00A9C2;"></div></td></tr>';
$body .= '<tr><td>';

$body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">UTM метки:</b></p>';

if (trim(!empty($_POST['utm_source']))) {
    $body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Название рекламной площадки: </b> ' . $_POST['utm_source'] . '</p>';
}
if (trim(!empty($_POST['utm_medium']))) {

$utm_medium='Другая реклама	('.$_POST['utm_medium'].')';

if ($_POST['utm_medium']=='organic') $utm_medium='Бесплатный поиск';
if ($_POST['utm_medium']=='referral') $utm_medium='Переход';
if ($_POST['utm_medium']=='email') $utm_medium='Электронная почта';
if ($_POST['utm_medium']=='cpc' || $_POST['utm_medium']=='ppc' || $_POST['utm_medium']=='paidsearch') $utm_medium='Поисковая реклама';
if ($_POST['utm_medium']=='social' || $_POST['utm_medium']=='social-network' || $_POST['utm_medium']=='social-media' || $_POST['utm_medium']=='sm') $utm_medium='Социальные сети';
if ($_POST['utm_medium']=='display' || $_POST['utm_medium']=='cpm' || $_POST['utm_medium']=='banner') $utm_medium='Медийная реклама';

    $body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Тип рекламы: </b> ' . $utm_medium . '</p>';
}
if (trim(!empty($_POST['utm_campaign']))) {
    $body .= '<p style="font-size: 16px; line-height: 127.9%; margin: 0; padding-bottom: 10px;"><b style="font-weight: 700;">Название кампании: </b> ' . $_POST['utm_campaign'] . '</p>';
}
$body .= '</tr></td>';
// --------------------Конец кода распознавания UTM---------------------

$url = 'data:image/svg+xml;base64,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';



$body .= '</table>        <!--[if (gte mso 9)|(IE)]>    </td>    </tr>    </table>  <![endif]-->    </div></center><center style="width: 100%;table-layout:fixed;background-color: #C7ECF2;">         <!--[if (gte mso 9)|(IE)]>            <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"              style="color:#000000;">            <tr>            <td>        <![endif]--><table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation" style="Margin:0;padding:0;width: 100%;max-width: 600px;"><tr >    <td>        <a href="" style="width: 100%;">            <img src="' . $url . '" alt="Подвал" style="width: 100%;"/>        </a>    </td></tr></table><!--[if (gte mso 9)|(IE)]>        </td>        </tr>        </table>      <![endif]--></center></body></html>';

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


//**************AmoCrm********************************* */
if ($AmoIntegration==1){
    $AmoFilds= 
        // поля для контакта 
    [
    'first_name' => $_POST['name'],
    'last_name' => '',
    
    //метка
    'tags' => 'Из сайта',
    
    //доп поля
    'custom_fields'	=> [
    //-----------------------------------------------------
    // ТЕЛЕФОН
    [
        'id'	=> 1142085,
        "values" => [
            [
                "value" => $_POST['phone'],
            ]
                ]
    ],
    //-----------------------------------------------------
    // EMAIL 
    [
        'id'	=> 1142087,
        "values" => [
            [
                "value" => $_POST['email'],
            ]
        ]
    ],
    //-----------------------------------------------------
    
    
    
    
    
    
    
    
    
                   ]
    ];
    
    
    if (!file_exists('token.txt')) {
        $tokens=amo_auth($arrAmoParams);
        $access_token=$tokens->access_token;
        $refresh_token=$tokens->refresh_token;
     }else{
         $file = file_get_contents('token.txt');
         $tokens=json_decode($file);
         $endTokenTime=date('Y-m-d H:m:s',$tokens->endTokenTime);
         $curent_date=date('Y-m-d H:m:s',time());
         if ($curent_date>=$endTokenTime){
             $refresh_token=$tokens->refresh_token;
             $tokens=returnNewToken($arrAmoParams,$refresh_token);
         }         
         $access_token=$tokens->access_token;
         $refresh_token=$tokens->refresh_token;
     }  
     
     
     amoAddTask(amoAddContact($arrAmoParams,$AmoFilds,$access_token),$arrAmoParams,$AmoFilds,$access_token);
}
//**************AmoCrm End***************************** */


//**************Битрикс24***************************** */
if ($BitrixIntegration==1){

$urlAPI='https://b24-cu8zsh.bitrix24.ru/rest/1/677npplfdlv4fioo/'; // Вебхук для вызова rest api

$urlAPI.='crm.lead.add.json';

$queryData = http_build_query(array(
    "fields" => array(
        "TITLE" => "Лид с нашего сайта",	// название лида
        "NAME" => $_POST['name'],				// имя ;)


        "PHONE" => array(	// телефон в Битрикс24
            "n0" => array(
                "VALUE" =>  $_POST['phone'],	
                "VALUE_TYPE" => "MOBILE",			// тип номера = мобильный
            ),
        ),
        "EMAIL" => array(	// Email в Битрикс24
            "n0" => array(
                "VALUE" =>  $_POST['email'],	
                "VALUE_TYPE" => "WORK",			// тип Email = Рабочий
            ),
        ),


    ),
    'params' => array("REGISTER_SONET_EVENT" => "Y")	// Y = произвести регистрацию события добавления лида в живой ленте. Дополнительно будет отправлено уведомление ответственному за лид.	
));

// отправляем запрос в Б24 и обрабатываем ответ
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_POST => 1,
    CURLOPT_HEADER => 0,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $urlAPI,
    CURLOPT_POSTFIELDS => $queryData,
));
$result = curl_exec($curl);
curl_close($curl);
$result = json_decode($result,1); 

// если произошла какая-то ошибка - выведем её
if(array_key_exists('error', $result))
{      
    die("Ошибка при сохранении лида: ".$result['error_description']);
}
}
//**************Битрикс24 End***************************** */
    

header('Content-type: application/json');

echo json_encode($response);
