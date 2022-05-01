<?php

require_once(__DIR__.'/helper.php');

if (count($argv) < 2) {
    echo "Usage: php ".basename(__FILE__)." LANG MASTERPATH\n";
    exit(1);
}

$maindir = dirname(dirname(__DIR__));
[$script, $language, $masterpath] = array_merge($argv, [null, null, null]);

$errors = [];

if (!is_dir($masterpath)) {
    if (is_dir(dirname($masterpath))) {
        echo "Skipping the headers check, language does not exist in production branch\n";
        exit;
    } else {
        echo "Something went wrong, can not access ".dirname($masterpath)."\n";
        exit(1);
    }
} else if (file_exists($masterpath."/nonproduction")) {
    echo "Skipping the headers check, the language was marked as non-production\n";
    exit;
}

foreach (['articles', 'static'] as $section) {
    foreach (scandir("$maindir/texts/${language}/{$section}") as $filename) {
        if (preg_match('/^(.+)\.md$/', $filename)) {
            $errors = array_merge($errors, checktitles($language, $section,
                "texts/${language}/{$section}/{$filename}", "$masterpath/{$section}/{$filename}"));
        }
    }
}

if (count($errors)) {
    echo join("\n", $errors)."\n";
    exit(1);
}

function checktitles($language, $section, $filename, $oldfilename): array {
    $errors = [];
    [$data, $offsets] = parse_file($section, $filename);
    if (!file_exists($oldfilename)) {
        if (array_key_exists('Previous titles', $data)) {
            $errors[] = "File {$filename} is newly created, it should not have a section '--- Previous titles ---'";
        }
        return $errors;
    }
    [$olddata, $oldoffsets] = parse_file($section, $oldfilename);
    $headerchanged = $data['h1long'] !== $olddata['h1long'];
    if ($headerchanged) {
        if (!array_key_exists('Previous titles', $data)) {
            $expected = $olddata['h1long'];
        } else {
            $expected = trim(trim($olddata['Previous titles'] ?? '')."\n".$olddata['h1long']);
        }
        if (trim($data['Previous titles'] ?? '') !== $expected) {
            if (!array_key_exists('Previous titles', $data)) {
                $errors[] = "File {$filename} - you must add a section '--- Previous titles ---' with the content:\n\n".$expected."\n\n";
            } else {
                $errors[] = "File {$filename} - section '--- Previous titles ---' must read:\n\n".$expected."\n\n";
            }
        }
    } else {
        $expected = trim($olddata['Previous titles'] ?? '');
        if (trim($data['Previous titles'] ?? '') !== $expected) {
            $errors[] = "File {$filename} - unexpected modification of section '--- Previous titles ---', this section should not be changed if the header was not changed";
        }
    }
    return $errors;
}