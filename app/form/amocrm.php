<?php
/*
ini_set('display_errors', 'On'); // сообщения с ошибками будут показываться
error_reporting(E_ALL); // E_ALL - отображаем ВСЕ ошибки
set_time_limit(0);
*/
function amo_auth($arrAmoParams){
    $amo_subdomain = $arrAmoParams['amo_subdomain']; //Поддомен нужного аккаунта
    $amo_client_id = $arrAmoParams['amo_client_id']; // id нашей интеграции
    $amo_client_secret = $arrAmoParams['amo_client_secret']; // код авторизации нашей интеграции
    $amo_code = $arrAmoParams['amo_code']; // код авторизации нашей интеграции
    $amo_redirect_url = $arrAmoParams['amo_redirect_url']; // домен сайта нашей интеграции
//---------------------------------------------
    $link = 'https://' . $amo_subdomain . '.amocrm.ru/oauth2/access_token'; //Формируем URL для запроса

    /* Соберем данные для запроса */
    $data = [
        'client_id' => $amo_client_id, 
        'client_secret' => $amo_client_secret, 
        'grant_type' => 'authorization_code',
        'code' => $amo_code, 
        'redirect_uri' => $amo_redirect_url,
    ];

    /**
     * Нам необходимо инициировать запрос к серверу.
     * Воспользуемся библиотекой cURL (поставляется в составе PHP).
     * Вы также можете использовать и кроссплатформенную программу cURL, если вы не программируете на PHP.
     */
    $curl = curl_init(); //Сохраняем дескриптор сеанса cURL
    /** Устанавливаем необходимые опции для сеанса cURL  */
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-oAuth-client/1.0');
    curl_setopt($curl,CURLOPT_URL, $link);
    curl_setopt($curl,CURLOPT_HTTPHEADER,['Content-Type:application/json']);
    curl_setopt($curl,CURLOPT_HEADER, false);
    curl_setopt($curl,CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl,CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, 1);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, 2);
    $out = curl_exec($curl); //Инициируем запрос к API и сохраняем ответ в переменную

    $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    /** Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом. */
    $code = (int)$code;
    
    // коды возможных ошибок
    $errors = [
        400 => 'Bad request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not found',
        500 => 'Internal server error',
        502 => 'Bad gateway',
        503 => 'Service unavailable',
    ];
    
    try
    {
        /** Если код ответа не успешный - возвращаем сообщение об ошибке  */
        if ($code < 200 || $code > 204) {
            throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undefined error', $code);
        }
    }
    catch(\Exception $e)
    {
        die('Ошибка: ' . $e->getMessage() . PHP_EOL . 'Код ошибки: ' . $e->getCode());
    }
    
    /**
     * Данные получаем в формате JSON, поэтому, для получения читаемых данных,
     * нам придётся перевести ответ в формат, понятный PHP
     */
    $response = json_decode($out, true);
    
    /* массив со всеми необходимыми данными, его вам нужно будет сохранить в файле или в БД, чтобы при каждом запросе получать токен */
    $arrParamsAmo = [
        "access_token" => $response['access_token'],
        "refresh_token" => $response['refresh_token'],
        "token_type" => $response['token_type'],
        "expires_in" => $response['expires_in'],
        "endTokenTime" => $response['expires_in'] + time(),
    ];
    
    $arrParamsAmo = json_encode($arrParamsAmo);
    
		/* передаём значения наших токенов в файл */
		$filename = "token.txt";
		$f = fopen($filename,'w');
		fwrite($f, $arrParamsAmo);
		fclose($f);


    // выведем наши токены. Скопируйте их для дальнейшего использования
    // access_token будет использоваться для каждого запроса как идентификатор интеграции
    
    return json_decode($arrParamsAmo);
}

function returnNewToken($arrAmoParams,$refresh_token) {
 
    $amo_subdomain = $arrAmoParams['amo_subdomain']; //Поддомен нужного аккаунта
    $amo_client_id = $arrAmoParams['amo_client_id']; // id нашей интеграции
    $amo_client_secret = $arrAmoParams['amo_client_secret']; // код авторизации нашей интеграции
    $amo_redirect_url = $arrAmoParams['amo_redirect_url']; // домен сайта нашей интеграции
//---------------------------------------------
$token=$refresh_token;

    $link = 'https://' . $amo_subdomain . '.amocrm.ru/oauth2/access_token'; //Формируем URL для запроса

	/** Соберем данные для запроса */
	$data = [
        'client_id' => $amo_client_id, 
        'client_secret' => $amo_client_secret, 
        'grant_type' => 'refresh_token',
        'refresh_token' => $token,
        'redirect_uri' => $amo_redirect_url,
	];

	/**
	 * Нам необходимо инициировать запрос к серверу.
	 * Воспользуемся библиотекой cURL (поставляется в составе PHP).
	 * Вы также можете использовать и кроссплатформенную программу cURL, если вы не программируете на PHP.
	 */
	$curl = curl_init(); //Сохраняем дескриптор сеанса cURL
	/** Устанавливаем необходимые опции для сеанса cURL  */
	curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-oAuth-client/1.0');
	curl_setopt($curl,CURLOPT_URL, $link);
	curl_setopt($curl,CURLOPT_HTTPHEADER,['Content-Type:application/json']);
	curl_setopt($curl,CURLOPT_HEADER, false);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST, 'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS, json_encode($data));
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, 1);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, 2);
	$out = curl_exec($curl); //Инициируем запрос к API и сохраняем ответ в переменную
	$code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	curl_close($curl);
    print_r($out);
	/** Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом. */
	$code = (int)$code;
	$errors = [
		400 => 'Bad request',
		401 => 'Unauthorized',
		403 => 'Forbidden',
		404 => 'Not found',
		500 => 'Internal server error',
		502 => 'Bad gateway',
		503 => 'Service unavailable',
	];

	try
	{
		if ($code < 200 || $code > 204) {
			throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undefined error', $code);
		}
	}
	catch(\Exception $e)
	{
		die('Ошибка: ' . $e->getMessage() . PHP_EOL . 'Код ошибки: ' . $e->getCode());
	}


	 

	$response = json_decode($out, true);

	if($response) {

		/* записываем конечное время жизни токена */
		$response["endTokenTime"] = time() + $response["expires_in"];

		$responseJSON = json_encode($response);

		/* передаём значения наших токенов в файл */
		$filename = "token.txt";
		$f = fopen($filename,'w');
		fwrite($f, $responseJSON);
		fclose($f);

		$response = json_decode($responseJSON, true);

		return $response;
	}
	else {
		return false;
	}

}



function amoAddContact($arrAmoParams,$AmoFilds,$access_token) {


    $arrContactParams = [

        
        "CONTACT" => [
            "namePerson"	=> "Имя пользователя",
            "phonePerson"	=> "Телефон",
            "emailPerson"	=> "Email пользователя",
            "messagePerson"	=> "Сообщение от пользователя",
        ]
    ];



    $contacts['request']['contacts']['add'] = array($AmoFilds);
   
  
  
      /* Формируем заголовки */
      $headers = [
          "Accept: application/json",
          'Authorization: Bearer ' . $access_token
      ];
     
      $link='https://'.$arrAmoParams['amo_subdomain'].'.amocrm.ru/private/api/v2/json/contacts/set';
  
      $curl = curl_init(); //Сохраняем дескриптор сеанса cURL
      /** Устанавливаем необходимые опции для сеанса cURL  */
      curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-oAuth-client/1.0');
      curl_setopt($curl,CURLOPT_URL, $link);
      curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
      curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($contacts));
      curl_setopt($curl,CURLOPT_HTTPHEADER, $headers);
      curl_setopt($curl,CURLOPT_HEADER, false);
      curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, 1);
      curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, 2);
      $out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
      $code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
      curl_close($curl);
      $Response=json_decode($out,true);
   $account=$Response['response']['account'];

      return $Response["response"]["contacts"]["add"]["0"]["id"];
  
  }

  function amoAddTask($contactId,$arrAmoParams,$AmoFilds,$access_token) {

    $AmoFilds['contacts_id'][0]=$contactId;
    $arrTaskParams = [  
    'add' => [
        0 => $AmoFilds
        ],
    ];
    
   
        $link = 'https://'.$arrAmoParams['amo_subdomain'].'.amocrm.ru/api/v2/leads';
    
        $headers = [
            "Accept: application/json",
            'Authorization: Bearer ' . $access_token
        ];
    
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
        curl_setopt($curl, CURLOPT_USERAGENT, "amoCRM-API-client-
        undefined/2.0");
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($arrTaskParams));
        curl_setopt($curl, CURLOPT_URL, $link);
        curl_setopt($curl, CURLOPT_HEADER,false);
        curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__)."/cookie.txt");
        curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__)."/cookie.txt");
        $out = curl_exec($curl);
        curl_close($curl);
        $result = json_decode($out,TRUE);
    }