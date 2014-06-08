<?php
header("content-type:text/plain");
function listdir($dir){
  $files = scandir("list/$dir");
  foreach($files as $file){
    if($file != '.' && $file != '..'){
      echo $dir,':',$file, "\n";
      if(is_dir("list/$file")){
        listdir($file);
      }
    }
  }
}
listdir("");
?>
