<?php

require_once(__DIR__.'/helper.php');

$pattern = null;
if (count($argv) >= 2) {
    $pattern = "|".$argv[1]."|";
}
$matchpattern = function($v) use ($pattern) { return !$pattern || preg_match($pattern, $v); };

$maindir = dirname(dirname(__DIR__));

$baretext = [];
$enfile = "texts/en/translations.json";
if ($matchpattern("translations.json")) {
    $endata = parse_json($maindir."/".$enfile);
    $baretext['strings'] = '';
    foreach ($endata as $key => $str) {
        $baretext['strings'] .= strip_tags(append_alt_title(strip_placeholders($str)))."\n";
    }
}

foreach (scandir("$maindir/texts/en") as $section) {
    if (preg_match('/^[^\\.]/', $section) && is_dir("$maindir/texts/en/{$section}")) {
        foreach (scandir("$maindir/texts/en/{$section}") as $filename) {
            if (preg_match('/^(.+)\.md$/', $filename) && $matchpattern("{$section}/{$filename}")) {
                $enfile = "$maindir/texts/en/{$section}/{$filename}";
                [$data, $offsets] = parse_file($section, $enfile);
                foreach ($data as $name => $str) {
                    if ($section === 'articles' && $name === 'main') $key = 'articles-body';
                    else $key = $section;
                    if (!array_key_exists($key, $baretext)) $baretext[$key] = '';
                    $baretext[$key] .= strip_tags(append_alt_title(strip_placeholders($str)))."\n";
                }
            }
        }
    }
}

$counts = array_map('str_word_count', $baretext);
print_r($counts);
$sum = 0;
array_walk($counts, function($v) use (&$sum) { $sum += $v; });
echo "Total = $sum\n";
if (array_key_exists('articles-body', $counts)) {
    $sumexcl = $sum - $counts['articles-body'];
    echo "Total excl articles-body = $sumexcl\n";
}
