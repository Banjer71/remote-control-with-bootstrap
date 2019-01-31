<?php

$cmd = $_GET['cmd'];
$url = $_GET['url'];

switch ($cmd) {

    case 'setChannel':

        # Chiusura dei processi chrome
        // exec("taskkill /F /IM chrome.exe", $output1, $return1);
        
        # Lancio chrome
        $phpExecutable = '"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" '; 
        $path = $url;
        // exec($phpExecutable./*" --kiosk ".*/$path, $output, $return);
        exec($phpExecutable.$path, $output, $return);
        
        break;

    case 'shutDown':

        # Shutdown del computer
        exec("shutdown -h", $output1, $return1);
        
        break;

    case 'loadExternalJson':

        # Caricamento di una risorsa esterna json
        $JSON = file_get_contents($url);

        // echo the JSON (you can echo this to JavaScript to use it there)
        echo $JSON;
        
        break;

    default:
        # code...
        break;
}

?>