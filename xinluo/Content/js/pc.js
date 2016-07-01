/**
 * Created by sunzg on 16/6/15.
 */

function eid(id) {

    return document.getElementById(id);
}

function addTouchHandle() {

    var stage = eid("stage");

}

var roomName = $("body").attr("data-type");

var startScroll = false;

var startY = 0;

var endY = 0;

var startX;

var endX = 0;

var canTouch = true;

var offsetLeft = 0;

var bgOffsetX = 0;

var bgImg_heigh = 800;

var bgImg_width = 9839;

var groundTop = 693;

var personHeight = 144;

var personWWidth = 150;

var personFooter = 10;

var personLeft = 60;//document.documentElement.clientWidth/2;//60;

var carWidth = 189;

var carHeight = 87;

var carLeft = 60;

var planeWidth = 433;

var planeHeight = 135;

var planeLeft = 60;

var d_w = document.documentElement.clientWidth;

var stage_height = document.documentElement.clientHeight;

var stage_width = stage_height / bgImg_heigh * bgImg_width;

var scale = 1 //stage_height / bgImg_heigh;

var personStageLeft = personLeft * scale;

var stageCenterX=d_w/2-75;

var scaleNomal = "scaleNomal9"

//var bgPosX = [
//    {"pos": 0, "maxPos":0,"pop": "l_tip_0", "pop1": "s_tip_0", "during": 400, "li_index": 0},
//    {"pos": 400,"maxPos":0, "pop": "award_3", "during": 400, "bottom": 108},
//    {"pos": 600,"maxPos":0, "pop": "l_tip_1", "pop1": "s_tip_1", "during": 400},
//    {"pos": 850, "pop": "l_d_cn_mall", "pop1": "s_d_cn_mall", "during": 800, "li_index": 1},
//    {"pos": 1650, "pop": "award_1", "during": 400, "bottom": 108},
//    {"pos": 1970, "pop": null, "pop1": null, "during": 1500},
//    {"pos": 3660, "pop": "l_tip_2", "pop1": "s_tip_2", "during": 400, "bottom": 108},
//    {"pos": 3800, "pop": "award_6", "during": 400, "bottom": 108},
//    {"pos": 3900, "pop": "l_tip_2", "pop1": "s_tip_2", "during": 400},
//    {"pos": 4000, "pop": "l_d_patzt", "pop1": "s_d_cddyz", "during": 400, "li_index": 2},
//    {"pos": 4550, "pop": "award_2", "during": 400, "bottom": 108},
//    {"pos": 4730, "pop": "l_d_wjsy", "pop1": "s_d_kzty", "during": 850, "li_index": 3},
//    {"pos": 5440, "pop": "l_d_tjt", "pop1": "s_d_dps", "during": 750, "li_index": 4},
//    {"pos": 6000, "pop": "l_d_kft", "pop1": "s_d_xljd", "during": 400, "li_index": 5},
//    {"pos": 6535, "pop": "l_tip_3", "pop1": "s_tip_3", "during": 400},
//    {"pos": 6700, "pop": null, "during": 700},
//    {"pos": 7535, "pop": null, "during": 300},
//    {"pos": 7635, "pop": "l_d_xlmsd", "pop1": "s_d_xlmsd", "during": 700, "li_index": 6},
//    {"pos": 8135, "pop": "award_4", "during": 400, "bottom": 108},
//    {"pos": 8335, "pop": "l_tip_4", "pop1": "s_tip_4", "during": 500},
//    {"pos": 8640, "pop": "l_d_jcd", "pop1": "s_d_jcd", "during": 400, "li_index": 7}
//];

//var bgPosX = [
//    {"pos": 0, "maxPos":0,"pop": "l_tip_0", "pop1": "s_tip_0", "during": 400, "li_index": 0},
//    {"pos": 300,"maxPos":400, "pop": "award_3", "during": 400, "bottom": 108},
//    {"pos": 520,"maxPos":550, "pop": "l_tip_1", "pop1": "s_tip_1", "during": 400},
//    {"pos": 700,"maxPos":1200,  "pop": "l_d_cn_mall", "pop1": "s_d_cn_mall", "during": 800, "li_index": 1},
//    {"pos": 1500,"maxPos":1650, "pop": "award_1", "during": 400, "bottom": 108},
//    {"pos": 1970,"maxPos":1970, "pop": null, "pop1": null, "during": 2500},
//    {"pos": 3510,"maxPos":3515, "pop": null, "pop1": null, "during": 400, "bottom": 108},
//    {"pos": 3520,"maxPos":3650, "pop": "award_6","pops":["award_6","roomName_tip_2"], "during": 400, "bottom": 108},
//    {"pos": 3750,"maxPos":4000, "pop": "l_d_patzt", "pop1": "s_d_cddyz", "during": 400, "li_index": 2},
//    {"pos": 4250,"maxPos":4350, "pop": "award_2", "during": 400, "bottom": 108},
//    {"pos": 4500,"maxPos":4950, "pop": "l_d_wjsy", "pop1": "s_d_kzty", "during": 850, "li_index": 3},
//    {"pos": 5260,"maxPos":5620, "pop": "l_d_tjt", "pop1": "s_d_dps", "during": 750, "li_index": 4},
//    {"pos": 5940,"maxPos":6200, "pop": "l_d_kft", "pop1": "s_d_xljd", "during": 400, "li_index": 5},
//    {"pos": 6400,"maxPos":6500, "pop": "l_tip_3", "pop1": "s_tip_3", "during": 400},
//    {"pos": 6550,"maxPos":6550, "pop": null, "during": 700},
//    {"pos": 7300,"maxPos":7300, "pop": null, "during": 300},
//    {"pos": 7370,"maxPos":8050, "pop": "l_d_xlmsd", "pop1": "s_d_xlmsd", "during": 700, "li_index": 6},
//    {"pos": 8140,"maxPos":8240, "pop": "award_4", "during": 400, "bottom": 108},
//    {"pos": 8260,"maxPos":8350, "pop": "l_tip_4", "pop1": "s_tip_4", "during": 500},
//    {"pos": 8390,"maxPos":8980, "pop": "l_d_jcd", "pop1": "s_d_jcd", "during": 400, "li_index": 7}
//];

var bgPosX = [
    {"pos": 0, "maxPos":0,"pop": "l_tip_0", "pop1": "s_tip_0", "during": 400, "li_index": 0},
    {"pos": 300,"maxPos":400, "pop": "award_7", "during": 400, "bottom": 108},
    {"pos": 520,"maxPos":550, "pop": "l_tip_1", "pop1": "s_tip_1", "during": 400},
    {"pos": 700,"maxPos":1200,  "pop": "l_d_cn_mall", "pop1": "s_d_cn_mall", "during": 800, "li_index": 1},
    {"pos": 1500,"maxPos":1650, "pop": "award_6", "during": 400, "bottom": 108},
    {"pos": 1970,"maxPos":1970, "pop": null, "pop1": null, "during": 2500},
    {"pos": 3510,"maxPos":3515, "pop": null, "pop1": null, "during": 400, "bottom": 108},
    {"pos": 3520,"maxPos":3650, "pop": "award_4","pops":["award_4","roomName_tip_2"], "during": 400, "bottom": 108},
    {"pos": 3750,"maxPos":4000, "pop": "l_d_patzt", "pop1": "s_d_cddyz", "during": 400, "li_index": 2},
    {"pos": 4250,"maxPos":4350, "pop": "award_3", "during": 400, "bottom": 108},
    {"pos": 4500,"maxPos":4950, "pop": "l_d_wjsy", "pop1": "s_d_kzty", "during": 850, "li_index": 3},
    {"pos": 5260,"maxPos":5620, "pop": "l_d_tjt", "pop1": "s_d_dps", "during": 750, "li_index": 4},
    {"pos": 5940,"maxPos":6200, "pop": "l_d_kft", "pop1": "s_d_xljd", "during": 400, "li_index": 5},
    {"pos": 6400,"maxPos":6500, "pop": "l_tip_3", "pop1": "s_tip_3", "during": 400},
    {"pos": 6550,"maxPos":6550, "pop": null, "during": 700},
    {"pos": 7300,"maxPos":7300, "pop": null, "during": 300},
    {"pos": 7370,"maxPos":8050, "pop": "l_d_xlmsd", "pop1": "s_d_xlmsd", "during": 700, "li_index": 6},
    {"pos": 8140,"maxPos":8240, "pop": "award_1", "during": 400, "bottom": 108},
    {"pos": 8260,"maxPos":8350, "pop": "l_tip_4", "pop1": "s_tip_4", "during": 500},
    {"pos": 8390,"maxPos":8980, "pop": "l_d_jcd", "pop1": "s_d_jcd", "during": 400, "li_index": 7}
];

var targetPosX = [
    {"posX": 0, "inCross": true}
];

var inCrossIndex = 0;

var planIndex = 5;

var carIndex = 15;

var planeMaxTopX;

var planeMaxTop;

var planeMinTop;

var planeLength;


var playing = false;

var dir = "next";

var scrollY;

var tmp = 0;

var count = 0;

var roomName;

var bgw = 9839;

var planePos={minPos:1720,maxPos:3510};

var carPos={minPos:6500,maxPos:7150};

var speed=2;


function initGame(name) {
    roomName = name;

}

$(window).on('DOMMouseScroll scroll', function (e) {

    personRun()

    endY = -$(window).scrollTop();

    endY=endY/speed;

    if (endY < startY) {
        dir = "next"
    } else {
        dir = "prev";
    }

    gotoScroll(endY);

});



function personRun() {
    tmp++;
    if (tmp % 3 == 0) {
        count++;
        if (count > 9) {
            count = 1;
        }
        eid("person_img").src = "Content/img/char/character0" + count + ".png";
    }
}


var offsetCentX;

$(window).on('resize', function (e) {

    var wH = $(window).height();

    posX = $(window).width()-17 - wH;

    d_w = document.documentElement.clientWidth;

    stageCenterX=d_w/2-75;

    offsetCentX=stageCenterX-60;

    var h=(bgw - posX+offsetCentX)*speed;

    $('body').height(h);

//    $('body').height(bgw - posX+offsetCentX);

    if(wH < 800){
        scaleNomal = "scaleNomal8"
    }else if(wH < 600){
        scaleNomal = "scaleNomal7"
    }

}).resize();


function gotoScroll(scrollY) {

    if (-scrollY-offsetCentX >= (bgw - d_w )) {

        scrollY=d_w-bgw-offsetCentX;

        $("#pop_div").show();

    } else {

        $("#pop_div").hide();

    }

    if (dir && dir == "next") {

        removeFlipx();

        var newOffsetLeft = Math.abs(scrollY);

        for(var i=0;i<bgPosX.length;i++){

            if(newOffsetLeft>=bgPosX[i].pos){

                inCrossIndex=i;
            }
        }

        var offsetLeft = startY = scrollY;

        showTargetByScroll(inCrossIndex);

        if(newOffsetLeft<=offsetCentX){

            $("#person").css({"left":newOffsetLeft+personStageLeft});

        }else{

            $("#person").css({"left":offsetCentX+personStageLeft});

            $("#bg_div").css({"left":  offsetLeft+offsetCentX});

        }

    } else if (dir && dir == "prev") {

        addFlipx();

        var offsetLeft = startY = scrollY;

        var newOffsetLeft = Math.abs(scrollY);

        for(var i=0;i<bgPosX.length;i++){

            if(newOffsetLeft>=bgPosX[i].pos){

                inCrossIndex=i;
            }
        }

        var popX=bgPosX[inCrossIndex].maxPos;

        if (newOffsetLeft <= popX) {

            showTargetByScroll(inCrossIndex);
        }

        if(newOffsetLeft<=offsetCentX){

            $("#person").css({"left":newOffsetLeft+personStageLeft});

        }else if(scrollY==0){

            $("#person").css({"left":0});

            $("#bg_div").css({"left": 0});

        }else{

            $("#person").css({"left":offsetCentX+personStageLeft});

            $("#bg_div").css({"left": offsetLeft+offsetCentX});
        }

    }

    if (newOffsetLeft >= planePos.minPos && newOffsetLeft <= planePos.maxPos) {

        showPlane();

    } else if (newOffsetLeft >= carPos.minPos&& newOffsetLeft <= carPos.maxPos) {

        showCar();

    } else {

        showPerson();
    }
}

function showTargetByScroll(index) {

    if(bgPosX[index].pops){

        showPops(index);

        return;
    }

    if (bgPosX[index].pop) {

        if (bgPosX[index].pop.indexOf("_tip_") != -1) {

            showTip(index);

        } else if (bgPosX[index].pop.indexOf("_d_") != -1) {

            showD(index);

        } else if (bgPosX[index].pop.indexOf("award") != -1) {

            showAward(index);
        }
    }


    if (inCrossIndex <= 2) {

        navActive(0);

    }

}


function addFlipx() {

    $("#person").addClass("flipx");

    $("#plane").addClass("flipx");

    $("#car").addClass("flipx");

    $("#plane_award_img").addClass("flipx");

    $("#car_award_img").addClass("flipx");
}

function removeFlipx() {

    $("#person").removeClass("flipx");

    $("#plane").removeClass("flipx");

    $("#car").removeClass("flipx");

    $("#plane_award_img").removeClass("flipx");

    $("#car_award_img").removeClass("flipx");
}

var isPlaneing = false;

function showPlane() {

    $("#plane").show();

    $("#plane").css({"left":offsetCentX+personStageLeft});

    $("#person").hide();

    $("#car").hide();

    isPlaneing = true;

    isCaring = false;

    isPersoning = false;
}

var isCaring = false;

function showCar() {

    $("#car").show();

    $("#car").css({"left":offsetCentX+personStageLeft});

    $("#person").hide();

    $("#plane").hide();

    isCaring = true;

    isPlaneing = false;

    isPersoning = false;
}

var isPersoning = true;

function showPerson() {

    $("#person").show();

    $("#plane").hide();

    $("#car").hide();

    isPersoning = true;

    isPlaneing = false;

    isCaring = false;

}

function showPops(index){

    var popsName=bgPosX[index].pops;

    for(var i=0;i<popsName.length;i++){

        if(popsName[i].indexOf("roomName")!=-1){

            popsName[i]=popsName[i].replace("roomName",roomName);
        }

        $("#" + popsName[i]).show();
    }

}

function showTip(index) {

    var popName;

    if (roomName == "l") {

        popName = bgPosX[index].pop;

    } else {

        popName = bgPosX[index].pop1;
    }

    $("#tip img").hide();

    $("#" + popName).show();

    $("#tip").show();

    //$("#d").hide();

    //$("#award").hide();

}

// 导航选中
function navActive(navIndex) {

    $("#nav_ul img").each(function (index, el) {
        $(this)[0].src = "Content/img/" + roomName + "_" + index + ".png";
    })
    $("#nav_ul img").eq(navIndex)[0].src = "Content/img/" + roomName + "_" + navIndex + "_s.png";
}

var popIndex=-1;

function showD(index) {

    popIndex=index;

    if(popIndex==closeIndex){

        return;

    }

    var popName;

    if (roomName == "l") {
        popName = bgPosX[index].pop;
    } else {
        popName = bgPosX[index].pop1;
    }

    var imgIndex = bgPosX[index].li_index;

    navActive(imgIndex)

    $("#d div").removeClass(scaleNomal)

    $("#" + popName).addClass(scaleNomal);

    $("#d").show();



    //var left=$("#" + popName).css("left");
    //
    //left=left.substr(0,left.length-2);
    //
    //var newLeft=+left;
    //
    //newLeft+=427;
    //
    //var bottom=600;
    //
    //if(popName.indexOf("jcd")!=-1){
    //    bottom=450;
    //}
    //
    //$(".closeD_btn").css({"left":newLeft,"bottom":bottom});

//    $("#tip").hide();

    //$("#award").hide();
}

function showAward(index) {

    $("#award img").hide()

    $("#" + bgPosX[index].pop).show();

    $("#award").show();

    //$("#d").hide();

    //$("#tip").hide();


}

function playAnimate() {

    if (isPlaneing) {

        var bg_offsetX = parseInt($("#bg_div").css("left"));

        bg_offsetX = Math.abs(bg_offsetX)+offsetCentX;

        var offsetX = Math.abs(bg_offsetX - planeMaxTopX);

        var percent = offsetX / planeLength;

        if (percent > 1)percent = 1;

        if (percent < 0)percent = 0;

        var realTop = (1 - percent) * 300 + 150;

        $("#plane").css("bottom", realTop);
    }

    var top=$(window).scrollTop();

    if(top==0){

        $("#person").css({"left":60});

        $("#bg_div").css({"left": 0});

    }
}

setInterval(playAnimate, 1000 / 20);

function initGame() {

    addTouchHandle();

    setStage();

    $("#stage").show();

    addNavClick();
}

function setStage() {

    d_w = document.documentElement.clientWidth;

    stage_height = document.documentElement.clientHeight;

    stage_width = stage_height / bgImg_heigh * bgImg_width;

    scale = 1 //stage_height / bgImg_heigh;

    personStageLeft = personLeft * scale;

    setBg();

    setPerson();

    setPlane();

    setCar();

    setNav();

    setTargetPos();
}

function setTargetPos() {

    targetPosX = [];

    for (var i = 0; i < bgPosX.length; i++) {

        var newPosX = bgPosX[i]["pos"] * scale - personStageLeft - scale * personWWidth;

        if (inCrossIndex == i) {

            var target = {"posX": newPosX, "inCross": true}

        } else {

            var target = {"posX": newPosX, "inCross": false}

        }

        targetPosX.push(target);
    }

    planeMaxTopX = (planePos.minPos + planePos.maxPos) / 2;

    planeLength = (planePos.maxPos - planePos.minPos) / 2;

}

function setBg() {

    var offsetX = bgOffsetX * scale;

    $("#bg_div").css("left", offsetX);

    $("#logo").width(110 * scale);

    $("#title").width(360 * scale);

    $("#title").css("left", 420 * scale);

    $("#title").css("bottom", 440 * scale);
}

function setPerson() {

    $("#person").height(scale * personHeight);

    $("#person_img").height(scale * personHeight);

    $("#person_img").width(scale * personWWidth);

    var top = scale * groundTop - scale * personHeight + personFooter * scale;

    //$("#person").css("top", top);

    $("#person").css("left", personStageLeft);

    $("#person").show();

}

function setPlane() {

    $("#plane").height(scale * planeHeight * 0.8);

    $("#plane_img").height(scale * planeHeight * 0.8);

    $("#plane_img").width(scale * planeWidth * 0.8);

    planeMaxTopX = (1970 + 3800) / 2 * scale;

    var top = scale * groundTop - scale * planeHeight * 0.8;

    planeMaxTop = top - 300;

    planeMinTop = top;

    //$("#plane").css("top", top);

    $("#plane").css("left", personStageLeft);

    eid("plane_award_img").src = "Content/img/award_5.png";

    var left = (433 - 166) / 2 * scale;

    $("#plane_award_img").css("left", left);

    var bottom = 135 * scale / 2;

    $("#plane_award_img").css("bottom", bottom);

    $("#plane_award_img").width(166 * scale);

    $("#plane_award_img").show();

}


function setCar() {

    $("#car").height(scale * carHeight);

    $("#car_img").height(scale * carHeight);

    $("#car_img").width(scale * carWidth);

    var top = scale * groundTop - carHeight - 150;

    //$("#car").css("top", top);

    $("#car").css("left", personStageLeft);


    eid("car_award_img").src = "Content/img/award_2.png";

    var left = (189 - 166) / 2 * scale;

    $("#car_award_img").css("left", left);

    var bottom = 87 * scale;

    $("#car_award_img").css("bottom", bottom);

    $("#car_award_img").width(166 * scale);

    $("#car_award_img").show();

}

function setNav() {

    $("#tip img").hide().eq(0).show()

    $("#tip").show();

    var w2=d_w/2+422+50;

    $(".index_btn").css("left",w2);

    $(".index_btn").show();
}

function addNavClick() {

    $("#nav_ul li").on("click", function () {

        if (playing)return;

        var index = $(this).index();

        clickNav(index);

    })
}

var clickIndex = 0;

var clickDir = "next";

var clickCrossArr = [];

function clickNav(index) {

    for (var i = 0; i < bgPosX.length; i++) {

        if ((index == 0 || bgPosX[i].li_index) && bgPosX[i].li_index == index) {

            clickIndex = i;

            if (inCrossIndex < i) {

                clickDir = "next";

                for (var j = inCrossIndex; j < i; j++) {

                    clickCrossArr.push(targetPosX[j]);

                }
            } else if (inCrossIndex > i) {

                clickDir = "prev";

                for (var j = i; j < inCrossIndex; j++) {

                    clickCrossArr.push(targetPosX[j]);
                }

            } else if (inCrossIndex == i) {


            }

            if (clickCrossArr.length) {

                var toTop=bgPosX[clickIndex].pos*speed;

                var currentTop=$(window).scrollTop();

                var distance=Math.abs(currentTop-toTop);

                var during=(distance/12000)*5000;

                if(during<800)during=800;

                console.log(during);

                $('html, body').animate({
                    scrollTop: toTop
                }, during,"linear", function () {

                });

            }

        }
    }

}
function hidePop() {

    $("#pop_div").hide();
}
function closeLqjp() {

    $(".lqjpLayout").hide();
}

function showLqjp(index) {

    if(roomName=="s"){

        var price='cn:shilladfs_gxj_20160628:click_prize0'+index+'_huiqiao';

        if(LinkClick){
            LinkClick(price,'o')
        };

    }else{

        var price='cn:shilladfs_gxj_20160628:click_prize0'+index+'_guangzhu';

        if(LinkClick){
            LinkClick(price,'o')
        };
    }


    $(".lqjpLayout").show();

}
$("#award img,#plane_award_img,#car_award_img").click(function () {

    var src=$(this).attr("src");

    var index=src.substr(-5,1);

    $("#gift_type").val(index);



    showLqjp(index)
})


$(function(){

    var top=$(window).scrollTop();

    for(var i=0;i<bgPosX.length;i++){

        if(top>=bgPosX[i].pos){

            inCrossIndex=i;
        }
    }

})

var closeIndex=-1;

function closeD(){

    closeIndex=inCrossIndex;

    $("#d").hide();

}

window.alert = function (txt) {

    $("#txt").html(txt);

    $(".alert").show();
}

function closeAlert() {

    $(".alert").hide();

}

