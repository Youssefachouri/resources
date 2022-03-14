<?php

require_once(__DIR__.'/helper.php');

/*
 Usage:

 php other/validate/validate.php ... | php other/validate/autofix.php
*/

$f = fopen( 'php://stdin', 'r' );
while ($line = fgets($f)) {
    $lines[] = $line;
}
fclose($f);

foreach ($lines as $i => $line) {
    if (preg_match('/File ([^ ]*) \\((\d+)\): tags do not match:/', $line, $matches)) {
        $str1 = substr($lines[$i+1], 8, strlen($lines[$i+1])-9);
        $str2 = substr($lines[$i+2], 8, strlen($lines[$i+2])-9);
        //echo $matches[1]." ".$matches[2]." '".$str1."'\n";
        replacetag($matches[1], (int)($matches[2]), $str1, $str2);
    }
}

function replacetag($filename, $lineno, $str1, $str2) {
    $contents = file_get_contents($filename);
    $lines = preg_split('/\\n/', $contents);
    $lines[$lineno-1] = str_replace($str2, $str1, $lines[$lineno-1]);
    file_put_contents($filename, join("\n", $lines));
}