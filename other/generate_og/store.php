<?php

/**
 * Stores an OG image on server. Used from the JS
 */

$path = dirname(dirname(__DIR__)) . "/media/articles/". $_REQUEST['article']."/ogimage";
$file = $path . "/" . $_REQUEST['filename'];

if (file_exists($file)) {
    if (!is_writable($file)) {
        echo "ERROR: No permission to override file $file";
        return;
    }
} else if (!file_exists($path) || !is_dir($path)) {
    echo "ERROR: Directory $path does not exist";
    return;
} else if (!is_writable($path)) {
    echo "ERROR: No permission to create a file in $path";
    return;
}

file_put_contents($file, base64_decode($_REQUEST['file']));
chmod($file, 0666);
echo "OK";
