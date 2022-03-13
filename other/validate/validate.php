<?php

require_once(__DIR__.'/helper.php');

if (count($argv) < 2) {
    echo "Usage: php ".basename(__FILE__)." LANG [SECTION [FILENAME]]\n";
    exit(1);
}

$maindir = dirname(dirname(__DIR__));
[$script, $language, $section, $filename] = array_merge($argv, [null, null, null]);


$errors = [];

if ($filename) {
    $filename .= preg_match('/\.md$/', $filename) ? '' : '.md';
    $errors = array_merge($errors, comparefiles($language, $section, $filename));
} else if ($section) {
    $errors = array_merge($errors, comparefolder($language, $section));
} else {
    foreach (scandir("$maindir/texts/en") as $section) {
        if (preg_match('/^[^\\.]/', $section) && is_dir("$maindir/texts/en/{$section}")) {
            $errors = array_merge($errors, comparefolder($language, $section));
        }
    }
}

if (count($errors)) {
    echo join("\n", $errors)."\n";
    exit(1);
}

function comparefolder($language, $section): array {
    global $maindir;
    $errors = [];
    foreach (scandir("$maindir/texts/en/{$section}") as $filename) {
        if (preg_match('/^(.+)\.md$/', $filename)) {
            $errors = array_merge($errors, comparefiles($language, $section, $filename));
        }
    }
    return $errors;
}

function comparefiles($language, $section, $filename): array {
    global $maindir;
    $enfile = "texts/en/{$section}/{$filename}";
    $langfile = "texts/{$language}/{$section}/{$filename}";
    $errors = [];
    if (!file_exists($enfile)) {
        $errors[] = "File {$enfile} not found";
    } else {
        try {
            [$endata, $enoffsets] = parse_file($section, "{$maindir}/$enfile") + ['main' => ''];
        } catch (Exception $e) {
            $errors[] = "File {$enfile}: {$e->getMessage()}";
        }
    }
    if (!file_exists($langfile)) {
        $errors[] = "File {$langfile} not found";
    } else {
        try {
            [$langdata, $langoffsets] = parse_file($section, "{$maindir}/$langfile") + ['main' => ''];
        } catch (Exception $e) {
            $errors[] = "File {$langfile}: {$e->getMessage()}";
        }
    }

    if (count($errors)) {
        // These were fatal errors - return now.
        return $errors;
    }

    // Compare parts of the file.
    $missing = array_diff(array_keys($endata), array_keys($langdata));
    if (count($missing)) {
        $errors[] = "File {$langfile} does not have section(s): ".join(', ', $missing);
    }

    $extra = array_diff(array_keys($langdata), array_keys($endata), ['Previous titles']);
    if (count($extra)) {
        $errors[] = "File {$langfile} has extra section(s): ".join(', ', $extra);
    }

    // Compare each part.
    $parts = array_diff(array_keys($endata), ['h1logn', 'h1short']);
    foreach ($parts as $part) {
        $errors = array_merge($errors,
            comparetext($langfile, $section, $part, $langoffsets[$part], $endata[$part] ?? '', $langdata[$part] ?? ''));
    }

    return $errors;
}
