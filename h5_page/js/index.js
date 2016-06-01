/**
 * Created by sunzg on 16/5/31.
 */
var clickbool = false;

function MenuMb() {
    clickbool = false;
    $(".navul").click(function () {
        if (!clickbool) {
            clickbool = true;
            $(".first1li").addClass("rotations45");
            $(".first2li").addClass("opaction0");
            $(".first3li").addClass("rotations45f");
            var w = $(".menu").outerWidth(true);
            $(".menu").show();
            $(".menu").css("right", -w + 'px')
            $(".menu").addClass("show").animate({
                "right": '0px'
            }, 300)
        } else {
            clickbool = false;
            $(".first1li").removeClass("rotations45");
            $(".first2li").removeClass("opaction0");
            $(".first3li").removeClass("rotations45f");
            var w = $(".menu").outerWidth(true);
            $(".menu").animate({
                "right": -w + 'px'
            }, 500)
        }
    })
};

function clickMenu() {
    if (!clickbool) {
        clickbool = true;
        $(".first1li").addClass("rotations45");
        $(".first2li").addClass("opaction0");
        $(".first3li").addClass("rotations45f");
        var w = $(".menu").outerWidth(true);
        $(".menu").show();
        $(".menu").css("right", -w + 'px')
        $(".menu").addClass("show").animate({
            "right": '0px'
        }, 300)
    } else {
        clickbool = false;
        $(".first1li").removeClass("rotations45");
        $(".first2li").removeClass("opaction0");
        $(".first3li").removeClass("rotations45f");
        var w = $(".menu").outerWidth(true);
        $(".menu").animate({
            "right": -w + 'px'
        }, 500)
    }
}

var _h = document.documentElement.clientHeight;

var _w = document.documentElement.clientWidth;

var _psdW = 640;

var _scale = _w / _psdW;

//106为 nav_bg 的 psd 高度，为了计算content的height
var _nav_bg_h = 106;

//带文字 feed 里的图片高度，为了计算文字的line－height
var _img_h = 723;

var _content_height = _h - _nav_bg_h * _scale;


function eid(id) {

    return document.getElementById(id);
}

function initContent() {

    var div = eid("content");

    div.style.height = _content_height + "px";

    var _desc_h = _content_height - _img_h * _scale;

    $(".desc").height(_desc_h);

    var lh = _desc_h / 2 + "px";

    $(".desc").css({"line-height": lh});

    eid("feed0").style.display = "block";

    addTouchHandle();

}

var _current_index = 0;

function addTouchHandle() {

    var div = eid("content");

    div.addEventListener("touchstart", startTouchHandler, false);

    div.addEventListener("touchmove", moveTouchHandler, false);

    div.addEventListener("touchend", endTouchHandler, false);

}

var startY;

var endY;

function startTouchHandler(event) {

    event.stopPropagation();//阻止冒泡

    event.preventDefault();//阻止浏览器默认事件

    startY = event.touches[0].clientY;

}

function moveTouchHandler(event) {

    event.stopPropagation();

    event.preventDefault();

    endY = event.touches[0].clientY;

}

function endTouchHandler(event) {

    event.stopPropagation();

    event.preventDefault();

    endY = event.changedTouches[0].clientY;

    var offsetY = endY - startY;

    if (offsetY < -100) {

        gotoNextPage();

    } else if (offsetY > 100) {

        gotoPrevPage();

    }

}

function gotoPrevPage() {

    _current_index -= 1;

    if (_current_index < 0) {

        _current_index = 0;

        return;

    } else {

        var toPage = eid("feed" + _current_index);

        toPage.style.top = -_content_height + "px";

        toPage.style.display = "block";

        $("#feed" + _current_index).animate({"top": 0 + 'px'}, 500);

        var current_showIndex = _current_index + 1;

        $("#feed" + current_showIndex).animate({"top": _content_height + "px"}, 500);

    }
}

function gotoNextPage() {

    var lg = $("#content").children().length;

    _current_index += 1;

    if (_current_index > lg - 1) {

        _current_index = lg - 1;

        return;

    } else {

        var toPage = eid("feed" + _current_index);

        toPage.style.top = _content_height + "px";

        toPage.style.display = "block";

        $("#feed" + _current_index).animate({"top": 0 + 'px'}, 500);

        var current_showIndex = _current_index - 1;

        $("#feed" + current_showIndex).animate({"top": -_content_height + "px"}, 500);

    }
}


function gotoPage(num) {

    if (_current_index < num) {

        $("#feed" + _current_index).animate({"top": -_content_height + "px"}, 500);

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

        $("#feed" + _current_index).animate({"top": _content_height + "px"}, 500);

        _current_index = num;

    }

    clickMenu();
}

$(document).ready(function () {

    MenuMb();

    initContent();

});