<?php
header("content-type:text/plain");

foreach(explode("\n", file_get_contents("list.txt")) as $line){
  if($line){
    echo ":".$line."\n";
    $files = scandir("list/$line");
    foreach($files as $file){
      if($file != '.' && $file != '..'){
        echo $line,':',$file, "\n";
      }
    }
  }
}
?>
