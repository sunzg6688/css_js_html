/**
 * Created by sunzg on 16/5/31.
 */

var _h = document.documentElement.clientHeight;

var _w = document.documentElement.clientWidth;

var _psdW = 640;

var _scale = _w / _psdW;

//80 是 nav_bg 的 psd 高度
var _nav_psd_h = 80;

var _nav_h=_nav_psd_h*_scale;

//713 是 feed 的 psd 高度
var _img_psd_h = 713;

//var _giv_div_h=_img_psd_h*_scale;

var _content_height = _h - _nav_psd_h * _scale;

var _giv_div_h=_content_height-50;

var _arrow_index=10;


function eid(id) {

    return document.getElementById(id);
}

function initContent() {

    $("#nav").height(_nav_h);

    $("#nav_img").css("opacity",1);

    $("#nav_img").hide();

    $("#content").height(_content_height);

    $(".gif_div").height(_giv_div_h);

    var gif_icon_h=320*(_w*0.33/574);

    $(".show_gif_div").height(_giv_div_h-gif_icon_h);


    $(".big_img_div").height(_content_height-50);

//    var _desc_h = _content_height - _img_psd_h * _scale;
//
//    $(".desc").height(_desc_h);
//
//    var lh = _desc_h / 2 + "px";
//
//    $(".desc").css({"line-height": lh});

    $("#feed0").show();

    addTouchHandle();

    var li_num = $("#img_ul").children().length;

    $("#img_ul").width(li_num*_w);

//    $("#img_ul").height(_giv_div_h);

    var top=( _giv_div_h-_img_psd_h*_scale)/2;

    $("#img_ul").css("marginTop",top)

    $("#img_ul li").width(_w);

    $("#img_ul li img").width(_w);

}

var _current_index = 0;

function addTouchHandle() {

    var div = eid("content");

    div.addEventListener("touchstart", startTouchHandler, false);

    div.addEventListener("touchmove", moveTouchHandler, false);

    div.addEventListener("touchend", endTouchHandler, false);


//    var divs=document.getElementsByClassName("content");
//
//    for(var i=0;i<divs.length;i++){
//
//        var div=divs[i];
//
//        div.addEventListener("touchstart", startTouchHandler, false);
//
//        div.addEventListener("touchmove", moveTouchHandler, false);
//
//        div.addEventListener("touchend", endTouchHandler, false);
//    }

    var control_div=eid("control_div");

    control_div.addEventListener("touchstart", startTouchHandler, false);

    control_div.addEventListener("touchmove", moveTouchHandler, false);

    control_div.addEventListener("touchend", endTouchHandler, false);

}

var startY;

var endY;

var startX;

var enY;

function startTouchHandler(event) {

//    event.stopPropagation();//阻止冒泡

//    event.preventDefault();//阻止浏览器默认事件

    startY = event.touches[0].clientY;

    startX= event.touches[0].clientX;

}

function moveTouchHandler(event) {

    event.stopPropagation();

    event.preventDefault();

    endY = event.touches[0].clientY;

    endX = event.touches[0].clientX;

}

function endTouchHandler(event) {

//    event.stopPropagation();

//    event.preventDefault();

    endY = event.changedTouches[0].clientY;

    endX = event.changedTouches[0].clientX;

    var offsetY = endY - startY;

    if (offsetY < -80) {

        gotoNextPage();

    } else if (offsetY > 80) {

        gotoPrevPage();

    }

    if(_current_index==_arrow_index){

        var offsetX= endX-startX;

        if(offsetX<-80){

            gotoNextPage2();

        }else if(offsetX>80){

            gotoPrevPage2();

        }

    }


}

function gotoPrevPage() {

    _current_index -= 1;

    if (_current_index < 0) {

        _current_index = 0;

    } else {

        var toPage = eid("feed" + _current_index);

        toPage.style.top = -_content_height + "px";

        toPage.style.display = "block";

        $("#feed" + _current_index).animate({"top": 0 + 'px'}, 500);

        var current_showIndex = _current_index + 1;

        stopLoop();

        $("#feed" + current_showIndex).animate({"top": _content_height + "px"}, 500,function(){

            $("#feed" + current_showIndex).hide();

            if(_current_index==_arrow_index){

                startLoop();

            }

        });

    }

    if(_current_index==0){

        var nav_img=eid("nav_img");

        nav_img.style.display="none";

    }else{

        var nav_img=eid("nav_img");

        nav_img.style.display="block";
    }

}

function gotoNextPage() {

    var lg = $("#content").children().length;

    _current_index += 1;

    if (_current_index > lg - 1) {

        _current_index = lg - 1;

    } else {

        var toPage = eid("feed" + _current_index);

        toPage.style.top = _content_height + "px";

        toPage.style.display = "block";

        $("#feed" + _current_index).animate({"top": 0 + 'px'}, 500);

        var current_showIndex = _current_index - 1;

        stopLoop();

        $("#feed" + current_showIndex).animate({"top": -_content_height + "px"}, 500,function(){

            $("#feed" + current_showIndex).hide();

            if(_current_index==_arrow_index){

                startLoop();

            }

        });

    }

    var nav_img=eid("nav_img");

    nav_img.style.display="block";

}


function gotoPage(num) {

    if (_current_index < num) {

        var _c_index=_current_index;

        $("#feed" + _current_index).animate({"top": -_content_height + "px"}, 500,function(){

            $("#feed" + _c_index).hide();

        });

        var toPage = eid("feed" + num);

        toPage.style.top = _content_height + "px";

        toPage.style.display = "block";

        $("#feed" + num).animate({"top": 0 + 'px'}, 500);

        _current_index = num;

    } else if (_current_index > num) {

        var toPage = eid("feed" + num);

        toPage.style.top = -_content_height + "px";

        toPage.style.display = "block";

        $("#feed" + num).animate({"top": 0 + 'px'}, 500);

        var _c_index=_current_index;

        $("#feed" + _current_index).animate({"top": _content_height + "px"}, 500,function(){

            $("#feed" + _c_index).hide();

        });

        _current_index = num;

    }

}

$(document).ready(function () {

    initContent();

});


var isAnimation=false;

var _current_li_index=0;

var _ul_margin_left=0;

function gotoPrevPage2(){

    if(isAnimation)return;

    stopLoop();

    $("#arrow_div").show();

    isAnimation=true;

    _current_li_index-=1;

    if(_current_li_index<0){

        _current_li_index=0;

    }

    _ul_margin_left=-_w*_current_li_index;

    $("#img_ul").animate({"marginLeft":_ul_margin_left},function(){

        isAnimation=false;

        startLoop();

    })

}

function gotoNextPage2(){

    if(isAnimation)return;

    stopLoop();

    $("#arrow_div").show();

    isAnimation=true;

    _current_li_index+=1;

    var li_num = $("#img_ul").children().length;

    if(_current_li_index>li_num-1){

        _current_li_index=li_num-1;

    }

    _ul_margin_left=-_w*_current_li_index;

    $("#img_ul").animate({"marginLeft":_ul_margin_left},function(){

        isAnimation=false;

        startLoop();

    })

}

var isLoop=false;

var timeId;

function loop(){

    if(isLoop){

        if(isAnimation)return;

        if(timeId)clearTimeout(timeId);

        isAnimation=true;

        _current_li_index+=1;

        var li_num = $("#img_ul").children().length;

        if(_current_li_index>li_num-1){

            _current_li_index=0;

        }

        _ul_margin_left=-_w*_current_li_index;

        $("#img_ul").animate({"marginLeft":_ul_margin_left},function(){

            isAnimation=false;

        })

        setTimeout(loop,2000);

    }
}

function startLoop(){

    isLoop=true;

    isAnimation=false;

    timeId=setTimeout(loop,2000);

    $("#arrow_div").show();

    $("#arrow_div").css("top",_nav_h);

    $("#arrow_div").css("left",0);

    $("#arrow_div").height(_content_height);

    var top=_giv_div_h/2-15;

    $("#left_arrow_img").css("top",top);

    $("#right_arrow_img").css("top",top);

}

function stopLoop(){

    if(timeId)clearTimeout(timeId);

    isLoop=false;

    $("#arrow_div").hide();
}

function showGif(index,gif_icon){

    if(index<4){

        var gif=eid("show_gif");

    }else if(index>3&&index<7){

        var gif=eid("show_gif2");

    }else if(index>6){

        var gif=eid("show_gif3");

    }

    gif.src="images/gif"+index+".gif";

    $(gif_icon).parent().parent().children().children().removeClass("on");

    $(gif_icon).addClass("on");

}

var _showShare=false;

function showShare(){
    _showShare=!_showShare;
    if(_showShare){
        $(".share_div").show();
    }else{
        $(".share_div").hide();
    }
}

function showWeixinTip(){

    if(isWeiXin()){
        $("#share_tip").show();

    }else{

        $("#share_tip2").show();
    }


}

function hideWeixinTip(){

    $("#share_tip").hide();

}

function hideWeixinTip2(){

    $("#share_tip2").hide();

}

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

//微博分享
function shareWB(){
    var sinaShareURL="http://service.weibo.com/share/share.php?";//新浪URL
    var host_url=document.location; //host_url获取当前的路径
    var title=document.title;
    var pic="http://ipengtai.local.opentide.com.cn/diva/images/cover.jpg";//var pic2=document.getElementById("pic").src;
    var _URL;
    _URL=sinaShareURL+"url="+host_url+"&title="+title+"&pic="+pic;//新浪
    //location.href=_URL;
    window.open(_URL);//重新打开一个新的窗体
}