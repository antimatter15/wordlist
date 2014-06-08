<?php
//by aldo
$get_data = array();

foreach($_GET as $key => $value)

  $get_data[] = $key. '='. urlencode($value);

$ch = curl_init();   

  curl_setopt($ch, CURLOPT_URL, 'http://datastore-service.appspot.com/?'. implode('&', $get_data));   

  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);   

  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); $data = curl_exec($ch); curl_close($ch); 

echo $data;
?>