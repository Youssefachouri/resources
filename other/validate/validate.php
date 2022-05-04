<?php

require_once(__DIR__.'/helper.php');

if (count($argv) < 2) {
    echo "Usage: php ".basename(__FILE__)." LANG [SECTION [FILENAME]] [--autofix]\n";
    exit(1);
}

$maindir = dirname(dirname(__DIR__));
$autofix = in_array("--autofix", $argv);
[$script, $language, $section, $filename] = array_merge(array_diff($argv, ['--autofix']), [null, null, null]);


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
    echo join("\n\n", $errors)."\n";
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
    global $maindir, $autofix;
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
    $canfix = true;

    // Compare parts of the file.
    $missing = array_diff(array_keys($endata), array_keys($langdata));
    if (count($missing)) {
        $errors[] = "File {$langfile} does not have section(s): ".join(', ', $missing);
        $canfix = false;
    }

    $extra = array_diff(array_keys($langdata), array_keys($endata), ['Previous titles']);
    if (count($extra)) {
        $errors[] = "File {$langfile} has extra section(s): ".join(', ', $extra);
        $canfix = false;
    }

    // Compare each part.
    $parts = array_diff(array_keys($endata), ['h1long', 'h1short'], $missing);
    foreach ($parts as $part) {
        $langdata[$part] = $langdata[$part] ?? '';
        $errors = array_merge($errors,
            comparetext($langfile, $section, $part, $langoffsets[$part] ?? 0, $endata[$part] ?? '', $langdata[$part], $autofix));
    }

    if ($canfix && $autofix && count($errors)) {
        //print_r($langdata);
        //print_r(array_keys($endata));
        $text = array_key_exists('h1short', $langdata) ? "<h1>[{$langdata['h1short']}] {$langdata['h1long']}</h1>\n\n" : "<h1>{$langdata['h1long']}</h1>\n\n";
        foreach ($langdata as $header => $content) if (!in_array($header, ['h1short', 'h1long', 'main'])) $text .= "--- $header ---\n\n".trim($content)."\n\n";
        $text .= "----------\n\n".trim($langdata['main']);
        //echo "\n\n\n$text\n\n";
        file_put_contents($langfile, trim($text)."\n");
    }

    return $errors;
}
