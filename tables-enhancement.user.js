// ==UserScript==
// @name       TribalWars - tables hover enhancement
// @namespace  http://github.com/er1z/plemiona-us
// @version    0.1
// @description  adds another state into tables with summaries
// @include      http://*.plemiona.pl/*
// @include		http://*.tribalwars*/*
// @location     https://raw.github.com/er1z/tribalwars-us/master/tables-enhancement.user.js
// @grant none
// @copyright  2013+, eRIZ
// ==/UserScript==

// LICENSE: CC: BY-NC-SA

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
    'table.vis tr:hover td{ background-color: #F7F7F7; }'
);