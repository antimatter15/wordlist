<?php
header("content-type: text/plain");
  $fn = $_REQUEST['fn'];
  if($fn && strpos($fn, "..") === FALSE){
    if(file_exists("list/$fn")){
      echo file_get_contents("list/$fn");
    }else{
      echo "ERROR:NO FILE";
    }
  }else{
    echo "ERROR:INVALID FILENAME";
  }
?>
