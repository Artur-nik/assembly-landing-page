<?php
$AmoIntegration=0; // Интеграция с AmoCRM 0 - выкл, 1 - вкл.
$BitrixIntegration=0; // Интеграция с Битрикс24 0 - выкл, 1 - вкл.

$arrAmoParams = [
    //Поддомен нужного аккаунта
   "amo_subdomain" => 'wpspro', 
    // id нашей интеграции
   "amo_client_id" => 'e01f0296-43a2-4d16-8598-6fb3a0df0bdadfs', 
    // секретный ключ нашей интеграции
    "amo_client_secret" => 'JnYSlKMtSkyyjDWw0J4SEzhT59cJebigzEbxqC9AJ35smO4f5zJMiNNodRits12Nfd22', 
    // код авторизации нашей интеграции
   "amo_code" => 'def50200d689e5333569fcf18e70ddb53ef838029257bba40462c451tgg3423a2167517a34b1fb121caf0f02f5a560f6884d0c3e4ddfdb31abf1191d8b804a442141f1bb399950bb1ee4272f789b532e8859f16c73f23f487953ff00dcb23ca87e495da923bf92626f7f66cba088cfb7593ace72b3898ab39c2d32325d6be64dff65ce424853e22b547fb2f85f065f5423c5d4fae078357da5707a1558cb15f3405c39e3d70528dbf7b479c5250f52fad26a63dc51bf8fc006ff9230adcace107c9537452fef21d9a8eef9406cfed375ee03a7e8f405ac978cc078991131f7aed2e33e5f6443a536a28e7dacb690edb923ce0ee993f0d5e901cbde521e54428b3c9c3874770e5ae873ec82a404f558beb585e6d8a2d8dd4484dcd9985cd4b140f372407fcad05b04da60cdf836a45fa5ddb5031ba685afe37acbf472636db6859e9c4037ec683a3c08b4dd59250ec925019c3cd8ae77c04e8d2ca58491f828139cb42fc749707be66b5f992b2941bc246350e673976fcced4b37b16b101fed4d3afb9cccfad744c4e858021f482b8ebf571b04e9287ae1d7abcc711ced0d6e7e804d97a8052971a5a35777e333a341a9226f8ceb6f9da73163a108a25cffe2f04d88c77ef8c258bf15630a64c7ec410814c48b33cf176178366437fc46376377cb01d1b03af8337742a96cae35f9b1558e3c876ef844ce6bc491400c608266', 
    // домен сайта нашей интеграции
   "amo_redirect_url" => 'https://'.$_SERVER['HTTP_HOST'].'/form/form.php', 
];

