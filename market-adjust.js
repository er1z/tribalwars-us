// ==UserScript==
// @name       TribalWars - market currently selected values override
// @namespace  http://github.com/er1z/plemiona-us
// @version    0.1
// @description  adjusts default transport values to satisfy transport time and current village capacity
// @include      http://*.plemiona.pl/*
// @include		http://*.tribalwars*/*
// @grant none
// @copyright  2013+, eRIZ
// ==/UserScript==

// LICENSE: CC: BY-NC-SA

var btn = $('#village_list .call_button').off('click');
var oldToggle = CallResources.toggle;

//http://stackoverflow.com/a/9640417
function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}

CallResources.toggle = function(){
	oldToggle.call(this);
    
    var row = $(this).parent().parent();
    
    var maxTransportCapacity = row.data('capacity');
    
    var _getCurrentResources = function(){
        var vil = window.game_data.village.res;
        var result = {
            wood: {
                value: vil.res[0],
                full: $('#wood').hasClass('warn'),
                prod: vil.res[1]
            },
            stone: {
                value: vil.res[2],
                full: $('#stone').hasClass('warn'),
                prod: vil.res[3]
            },
            iron: {
                value: vil.res[4],
                full: $('#iron').hasClass('warn'),
                prod: vil.res[4]
            }        
        };
        return result;
    };

    var rowValues = {
        wood: {
            handle: row.find('input[name=wood]'),
            max: Math.floor(row.find('td.wood').data('res')/1000)*1000
        },
        stone: {
            handle: row.find('input[name=stone]'),
            max: Math.floor(row.find('td.stone').data('res')/1000)*1000
        },
        iron: {
            handle: row.find('input[name=iron]'),
            max: Math.floor(row.find('td.iron').data('res')/1000)*1000
        }
    };
    
    var transportTime = hmsToSecondsOnly(row.find('td:eq(1)').text());
    
    alert(transportTime);
}

btn.click(CallResources.toggle);