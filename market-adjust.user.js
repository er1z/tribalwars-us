// ==UserScript==
// @name       TribalWars - market currently selected values override
// @namespace  http://github.com/er1z/plemiona-us
// @version    0.1
// @description  adjusts default transport values to satisfy transport time and current village capacity
// @include      http://*.plemiona.pl/*mode=call
// @include		http://*.tribalwars*/*mode=call
// @location     https://raw.github.com/er1z/tribalwars-us/master/market-adjust.js
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
                value: vil[0],
                full: $('#wood').hasClass('warn'),
                prod: vil[1]
            },
            stone: {
                value: vil[2],
                full: $('#stone').hasClass('warn'),
                prod: vil[3]
            },
            iron: {
                value: vil[4],
                full: $('#iron').hasClass('warn'),
                prod: vil[4]
            }        
        };
        return result;
    };

    var rowValues = {
        wood: {
            handle: row.find('input[name=wood]'),
            max: Math.floor(row.find('td.wood').data('res')/1000)*1000,
            enabled: $('#checkbox_wood').is(':checked')
        },
        stone: {
            handle: row.find('input[name=stone]'),
            max: Math.floor(row.find('td.stone').data('res')/1000)*1000,
            enabled: $('#checkbox_stone').is(':checked')
        },
        iron: {
            handle: row.find('input[name=iron]'),
            max: Math.floor(row.find('td.iron').data('res')/1000)*1000,
            enabled: $('#checkbox_iron').is(':checked')
        }
    };
    
    var storageCapacity = window.game_data.village.res[6];
    
    var transportTime = hmsToSecondsOnly(row.find('td:eq(1)').text());
    var values = _getCurrentResources();
    var capacityLeft = maxTransportCapacity;
    
    var checkboxes = rowValues.wood.enabled+rowValues.stone.enabled+rowValues.iron.enabled;
    var perTrader = Math.floor(maxTransportCapacity/checkboxes/1000)*1000;
    
    var left = 0;
    
    //todo: time-aware storage status
    //todo: regard all incoming transports above (sum storage + incoming)
    //todo: url filtering
    
    for(var i in rowValues){
    	var amount = left+perTrader;
        
        if(rowValues[i].enabled){
        	var computedAmount = Math.floor((storageCapacity-values[i].value)/1000)*1000;
        
        	var amount = Math.min(amount, computedAmount);
            amount = Math.min(amount, rowValues[i].max);
            
        	left = perTrader-amount;
            rowValues[i].handle.val(amount);
        }else{
            rowValues[i].handle.val(0);
            left = amount;
        }
        
        
    }
    
}

btn.click(CallResources.toggle);