<?php

/**
 * Stores an OG image on server. Used from the JS
 */

$path = dirname(dirname(__DIR__)) . "/media/". $_REQUEST['article']."/ogimage";
$file = $path . "/" . $_REQUEST['filename'];

if (file_exists($file)) {
    // File already exists.
    if (!is_writable($file)) {
        echo "ERROR: No permission to override file $file";
        return;
    }
} else if (file_exists($path)) {
    if (!is_dir($path) || !is_writable($path)) {
        echo "ERROR: No permission to create a file in $path";
        return;
    }
} else {
    if (!mkdir($path, 0777, true)) {
        echo "ERROR: No permission to create a directory $path";
        return;
    }
}

file_put_contents($file, base64_decode($_REQUEST['file']));
chmod($file, 0666);
echo "OK";
