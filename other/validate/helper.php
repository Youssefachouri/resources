<?php

function parse_file($section, $f) {
    $content = file_get_contents($f);
    if (hasParts($section)) {
        $parts = preg_split('/\\n----------\\n/', $content, 2);
        if (count($parts) != 2) {
            throw new Exception("Separator ---------- not found. Make sure there is a newline before and after it.");
        }
        $main = $parts[1];
        [$data, $offsets] = parse_data($section, $parts[0]);
        $offsets['main'] = count(preg_split('/\\n/', $parts[0])) + 2;
    } else {
        $main = $content;
        $data = [];
        $offsets = ['main' => 0];
    }
    if (strlen(''.$main)) {
        $data['main'] = $main;
    }
    return [$data, $offsets];
}

function parse_json($f) {
    $content = file_get_contents($f);
    $res = json_decode($content, true);
    switch (json_last_error()) {
        case JSON_ERROR_NONE:
            $error = ''; // JSON is valid // No error has occurred
            break;
        case JSON_ERROR_DEPTH:
            $error = 'The maximum stack depth has been exceeded.';
            break;
        case JSON_ERROR_STATE_MISMATCH:
            $error = 'Invalid or malformed JSON.';
            break;
        case JSON_ERROR_CTRL_CHAR:
            $error = 'Control character error, possibly incorrectly encoded.';
            break;
        case JSON_ERROR_SYNTAX:
            $error = 'Syntax error, malformed JSON.';
            break;
        case JSON_ERROR_UTF8:
            $error = 'Malformed UTF-8 characters, possibly incorrectly encoded.';
            break;
        case JSON_ERROR_RECURSION:
            $error = 'One or more recursive references in the value to be encoded.';
            break;
        case JSON_ERROR_INF_OR_NAN:
            $error = 'One or more NAN or INF values in the value to be encoded.';
            break;
        case JSON_ERROR_UNSUPPORTED_TYPE:
            $error = 'A value of a type that cannot be encoded was given.';
            break;
        default:
            $error = 'Unknown JSON error occured.';
            break;
    }
    if ($error !== '') {
        throw new Exception("File can not be parsed: ".$error);
    }
    return flatten_json($res);
}

function flatten_json($json, $prefix = '') {
    $flatdata = [];
    foreach ($json as $key => $val) {
        if (is_array($val)) {
            $flatdata = array_merge($flatdata, flatten_json($val, $prefix.$key."."));
        } else {
            $flatdata[$prefix.$key] = $val;
        }
    }
    return $flatdata;
}

function parse_data($section, $content) {
    $r = [];
    $offsets = [];

    if (hasH1($section)) {
        if (hasH1short($section)) {
            if (preg_match('|^<h1>\\s*\\[(.*?)\\](.*?)</h1>\\n|', $content, $matches)) {
                $r['h1short'] = trim($matches[1]);
                $r['h1long'] = trim($matches[2]);
                $offsets['h1short'] = $offsets['h1long'] = 0;
                $content = "\n".substr($content, strlen($matches[0]));
            } else {
                throw new Exception("First line must have format: <h1>[SHORTHEADER] LONGHEADER</h1>");
            }
        } else {
            if (preg_match('|^<h1>(.*?)</h1>\\n|', $content, $matches)) {
                $r['h1long'] = trim($matches[1]);
                $offsets['h1long'] = 0;
                $content = "\n".substr($content, strlen($matches[0]));
            } else {
                throw new Exception("First line must have format: <h1>HEADER</h1>");
            }
        }
    }

    $lastoffset = 1;
    $parts = preg_split('|\\n--- (.*?) ---\\n|', $content, -1, PREG_SPLIT_DELIM_CAPTURE);
    for ($i=1; $i<count($parts); $i+=2) {
        $r[$parts[$i]] = $parts[$i+1];
        $lastoffset = $lastoffset + count(preg_split('/\\n/', $parts[$i-1])) + 1;
        $offsets[$parts[$i]] = $lastoffset;
    }

    return [$r, $offsets];
}

function prepare_data($section, $data) {
    $content = '';
    $main = $data['main'] ?? '';
    unset($data['main']);
    if (!hasParts($section)) {
        return $main;
    }
    if (hasH1($section)) {
        $data += ['h1short' => '', 'h1long' => ''];
        if (hasH1short($section)) {
            $content .= "<h1>[{$data['h1short']}] {$data['h1long']}</h1>\n\n";
        } else {
            $content .= "<h1>{$data['h1long']}</h1>\n\n";
        }
        unset($data['h1short']);
        unset($data['h1long']);
    }
    foreach ($data as $key => $value) {
        $content .= "--- $key ---\n\n".trim($value)."\n\n";
    }
    $content .= "----------\n";
    if (strlen($main)) {
        $content .= "\n".trim($main)."\n";
    }
    return $content;
}

function hasH1($section) {
    return in_array($section, ['articles', 'dynamic', 'static']);
}

function hasH1short($section) {
    return in_array($section, ['dynamic', 'static']);
}

function hasParts($section) {
    return in_array($section, ['articles', 'dynamic', 'static']);
}

function comparetext($langfile, $section, $partkey, $partoffset, $entext, $langtext): array {
    $sname = $partkey === 'main' ? "Main content (after dashed line)" : "Section '$partkey'";
    if (strlen(trim($entext)) && !strlen(trim($langtext))) {
        return ["File {$langfile}: $sname should not be empty"];
    }
    if (!strlen(trim($entext)) && strlen(trim($langtext))) {
        return ["File {$langfile}: $sname should be empty"];
    }
    if (!strlen(trim($entext))) return [];

    $enlines = preg_split('/\\n/', trim($entext));
    $langlines = preg_split('/\\n/', trim($langtext));

    $errors = [];
    if (count($enlines) != count($langlines)) {
        $errors[] = "File {$langfile}: $sname should have exactly ".count($enlines)." lines, ".count($langlines)." lines found";
    }
    for ($i=0; $i<min(count($enlines), count($langlines)); $i++) {
        $errors = array_merge($errors, compareline($langfile, $section, $sname, $partkey, $partoffset + $i + 1,
            trim($enlines[$i]), trim($langlines[$i])));
    }
    return $errors;
}

function compareline($langfile, $section, $sname, $partkey, $lineno, $entext, $langtext): array {
    if (strlen($entext) && !strlen($langtext)) {
        return ["File {$langfile}: $sname, line $lineno should not be empty"];
    }
    if (!strlen($entext) && strlen($langtext)) {
        return ["File {$langfile}: $sname, line $lineno should be empty"];
    }
    if (!strlen($entext)) return [];

    return comparetags($langfile, $section, $sname, $partkey, $lineno, $entext, $langtext);
}

function comparetags($langfile, $section, $sname, $partkey, $lineno, $entext, $langtext): array {

    $tagmatch = '/<[^>]*(>|$)/';
    $r = preg_match_all($tagmatch, $entext, $matches);
    $entags = $r ? $matches[0] : [];
    $r = preg_match_all($tagmatch, $langtext, $matches);
    $langtags = $r ? $matches[0] : [];

    for ($i=0;$i<count($entags);$i++) {
        $entags[$i] = strip_alt_title($entags[$i]);
    }

    for ($i=0;$i<count($langtags);$i++) {
        $langtags[$i] = strip_alt_title($langtags[$i]);
    }

    if (join('', $entags) !== join('', $langtags)) {
        $language = preg_match('|texts/(.*?)/|', $langfile, $matches) ? $matches[1] : '??';
        return ["File {$langfile} ($lineno): tags do not match:\n    en: {$entext}\n    {$language}: {$langtext}"];
    }

    return [];
}

function compareplaceholders($langfile, $section, $sname, $partkey, $lineno, $entext, $langtext): array {

    $tagmatch = '/\\{[^\\}]*\\}/';
    $r = preg_match_all($tagmatch, $entext, $matches);
    $entags = $r ? $matches[0] : [];
    $r = preg_match_all($tagmatch, $langtext, $matches);
    $langtags = $r ? $matches[0] : [];

    if (join('', $entags) !== join('', $langtags)) {
        $language = preg_match('|texts/(.*?)/|', $langfile, $matches) ? $matches[1] : '??';
        return ["File {$langfile} ($lineno): placeholders do not match:\n    en: {$entext}\n    {$language}: {$langtext}"];
    }

    return [];
}

function strip_alt_title($text): string {
    return preg_replace('/\b(alt|title)="([^"]*)"/', '\\1=""', $text);
}
