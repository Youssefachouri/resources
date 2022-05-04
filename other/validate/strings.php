<?php

require_once(__DIR__.'/helper.php');

if (count($argv) < 2) {
    echo "Usage: php ".basename(__FILE__)." LANG [--autofix]\n";
    exit(1);
}

$maindir = dirname(dirname(__DIR__));
[$script, $language, $autofix] = array_merge($argv, [null, null, null, null]);
$autofix = ($autofix === '--autofix');

$enfile = "texts/en/translations.json";
$langfile = "texts/{$language}/translations.json";

$errors = comparejsonfiles($enfile, $langfile);
if (count($errors)) {
    echo join("\n\n", $errors)."\n\n";
    exit(1);
}

function comparejsonfiles($enfile, $langfile): array {
    global $maindir, $autofix;
    $errors = [];

    if (!file_exists($maindir."/".$enfile)) {
        $errors[] = "File {$enfile} not found";
    } else {
        try {
            $endata = parse_json($maindir."/".$enfile);
        } catch (Exception $e) {
            $errors[] = "File {$enfile}: {$e->getMessage()}";
        }
    }
    if (!file_exists($maindir."/".$langfile)) {
        $errors[] = "File {$langfile} not found";
    } else {
        try {
            $langdata = parse_json($maindir."/".$langfile);
        } catch (Exception $e) {
            $errors[] = "File {$langfile}: {$e->getMessage()}";
        }
    }

    if (count($errors)) {
        // These were fatal errors - return now.
        return $errors;
    }

    $missing = array_diff(array_keys($endata), array_keys($langdata));
    if ($missing) {
        $errors[] = "File {$langfile} is missing keys:\n    ".join("\n    ", $missing);
    }

    $extra = array_diff(array_keys($langdata), array_keys($endata));
    if ($extra) {
        $errors[] = "File {$langfile} has extra keys that need to be removed:\n    ".join("\n    ", $extra);
    }

    foreach (array_intersect_key($endata, $langdata) as $key => $value) {
        $errors = array_merge($errors, comparetags($langfile, null, null, null, $key, $value, $langdata[$key], $autofix));
        $errors = array_merge($errors, compareplaceholders($langfile, null, null, null, $key, $value, $langdata[$key], $autofix));
    }

    if ($autofix && $errors) {
        $all = unflatten_json($langdata);
        recur_ksort($all);
        file_put_contents($maindir."/".$langfile,
            preg_replace('/  /', ' ', json_encode($all, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) . "\n");
    }

    return $errors;
}