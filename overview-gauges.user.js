// ==UserScript==
// @name       TribalWars - resources usage gauges on overview
// @namespace  http://github.com/er1z/plemiona-us
// @version    0.1.3
// @description  shows visual gauges on resources list
// @include      http://*.plemiona.pl/game.php*
// @include		http://*.tribalwars*/game.php*
// @location     https://raw.github.com/er1z/tribalwars-us/master/overview-gauges.user.js
// @grant none
// @copyright  2013+, eRIZ
// ==/UserScript==

// LICENSE: CC: BY-NC-SA

//todo:farm gauge

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


var handle = $('.menu_block_right table.box:first').css({position: 'relative', 'z-index': 1});
handle.wrap('<div id="resourceGauges"></div>');

var tds = handle.find('.box-item');

var gaugeContainer = $('#resourceGauges');

// move background image to another node
var firstItem = tds.filter('.firstcell');
var bg = firstItem.css('background');
firstItem.css('background', 'none');
gaugeContainer.css('background', bg);

var res = {
    wood: gaugeContainer.append('<div id="gaugeWood"><span></span></div>').find('#gaugeWood'),
    stone: gaugeContainer.append('<div id="gaugeStone"><span></span></div>').find('#gaugeStone'),
    iron: gaugeContainer.append('<div id="gaugeIron"><span></span></div>').find('#gaugeIron')
};

var all = $([res.wood[0], res.stone[0], res.iron[0]]);

var updateDimensions = function(){
    var offset = 1;
    var iteration = 0;
    all.each(function(){
        
        var width = tds.eq(iteration).outerWidth()+tds.eq(iteration+1).outerWidth();
        
        $(this).css({
            width: width,
            left: offset
        });
        
        offset += width;
        iteration += 2;
    });
}
    
// update widths
var update = function(){
    
    updateDimensions();
    var idx = 0;
    for(var i in res){
        var percent = (window.game_data.village.res[idx]/parseInt(window.game_data.village.res[6]))*100;
        idx+=2;
        
        res[i].find('span').css('width', percent+'%');
    }
};

setInterval(update,1000);
update();

addGlobalStyle('#resourceGauges div > span{'+
               'background: #eeeeee; /* Old browsers */ '+
               'background: -moz-linear-gradient(top, #eeeeee 0%, #ffffff 100%); /* FF3.6+ */'+
               'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#eeeeee), color-stop(100%,#ffffff)); /* Chrome,Safari4+ */'+
               'background: -webkit-linear-gradient(top, #eeeeee 0%,#ffffff 100%); /* Chrome10+,Safari5.1+ */'+
               'background: -o-linear-gradient(top, #eeeeee 0%,#ffffff 100%); /* Opera 11.10+ */'+
               'background: -ms-linear-gradient(top, #eeeeee 0%,#ffffff 100%); /* IE10+ */'+
               'background: linear-gradient(to bottom, #eeeeee 0%,#ffffff 100%);'+
               'display: block;'+
    		   'position: absolute;'+
               'top: 1px;'+
               'bottom: 1px;'+
               'width: 0;'+
               'height: 24px;'+
'}'+
               
               '#resourceGauges { position: relative; }'+

'#resourceGauges div{'+
'	position: absolute;'+
'   top: 0;'+
'   height: 26px;'+
'}');