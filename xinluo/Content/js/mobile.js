/**
 * Created by sunzg on 16/6/15.
 */

window.addEventListener("resize", rotationChange);

var resized=false;

function rotationChange() {

    var w = document.documentElement.clientWidth;

    var h = document.documentElement.clientHeight;

    resized=true;

    if(w<h){

        setStage();

        $("#stage").show();


    }else{

        setStage();

        $("#stage").show();

    }


//    if (w < h || window.orientation == 180 || window.orientation == 0) {
//
//        //alert("请在系统设置里打开屏幕旋转，并在横屏状态下玩游戏！" + window.orientation);
//
//        setStage();
//
//    }
//
//    if (w > h || window.orientation == 90 || window.orientation == -90) {
//
//        //alert("横屏" + window.orientation);
//
//        setStage();
//
//    }

}

function eid(id) {

    return document.getElementById(id);

}

function addTouchHandle() {

    var stage = eid("stage");

    stage.addEventListener("touchstart", startTouchHandler, false);

    stage.addEventListener("touchmove", moveTouchHandler, false);

    stage.addEventListener("touchend", endTouchHandler, false);

}

var startY;

var endY;

var startX;

var enY;

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

var scale = stage_height / bgImg_heigh;

var personStageLeft = personLeft * scale;

var bgPosX = [
    {"pos": 0, "pop": "l_tip_0", "pop1": "s_tip_0", "during": 400, "li_index": 0},
    {"pos": 400, "pop": "award_7", "during": 400, "bottom": 108, "width": 104},
    {"pos": 600, "pop": "l_tip_1", "pop1": "s_tip_1", "during": 400},
    {"pos": 850, "pop": "l_d_cn_mall", "pop1": "s_d_cn_mall", "during": 800, "li_index": 1},
    {"pos": 1650, "pop": "award_6", "during": 400, "bottom": 108, "width": 104},
    {"pos": 1970, "pop": null, "pop1": null, "during": 1500},
    {"pos": 3750, "pop": null, "during": 400, "bottom": 108},
    {"pos": 3800, "pop": "award_4", "during": 400, "bottom": 108, "width": 104},
    {"pos": 3850, "pop": "l_tip_2", "pop1": "s_tip_2", "during": 400},
    {"pos": 3900, "pop": "l_d_patzt", "pop1": "s_d_cddyz", "during": 400, "li_index": 2},
    {"pos": 4350, "pop": "award_3", "during": 400, "bottom": 108, "width": 104},
    {"pos": 4630, "pop": "l_d_wjsy", "pop1": "s_d_kzty", "during": 850, "li_index": 3},
    {"pos": 5340, "pop": "l_d_tjt", "pop1": "s_d_dps", "during": 750, "li_index": 4},
    {"pos": 5950, "pop": "l_d_kft", "pop1": "s_d_xljd", "during": 400, "li_index": 5},
    {"pos": 6535, "pop": "l_tip_3", "pop1": "s_tip_3", "during": 400},
    {"pos": 6700, "pop": null, "during": 700},
    {"pos": 7535, "pop": null, "during": 300},
    {"pos": 7635, "pop": "l_d_xlmsd", "pop1": "s_d_xlmsd", "during": 700, "li_index": 6},
    {"pos": 8135, "pop": "award_1", "during": 400, "bottom": 108, "width": 166},
    {"pos": 8335, "pop": "l_tip_4", "pop1": "s_tip_4", "during": 500},
    {"pos": 8635, "pop": "l_d_jcd", "pop1": "s_d_jcd", "during": 400, "li_index": 7}
];


var bgPosX_l = [
    {"pos": 0, "pop": "l_tip_0", "pop1": "s_tip_0", "during": 400, "li_index": 0},
    {"pos": 400, "pop": "award_7", "during": 400, "bottom": 108, "width": 104},
    {"pos": 600, "pop": "l_tip_1", "pop1": "s_tip_1", "during": 400},
    {"pos": 850, "pop": "l_d_cn_mall", "pop1": "s_d_cn_mall", "during": 800, "li_index": 1},
    {"pos": 1650, "pop": "award_6", "during": 400, "bottom": 108, "width": 104},
    {"pos": 1970, "pop": null, "pop1": null, "during": 1500},
    {"pos": 3750, "pop": null, "during": 400, "bottom": 108},
    {"pos": 3800, "pop": "award_4", "during": 400, "bottom": 108, "width": 104},
    {"pos": 3900, "pop": "l_tip_2", "pop1": "s_tip_2", "during": 400},
    {"pos": 4000, "pop": "l_d_patzt", "pop1": "s_d_cddyz", "during": 400, "li_index": 2},
    {"pos": 4550, "pop": "award_3", "during": 400, "bottom": 108, "width": 104},
    {"pos": 4730, "pop": "l_d_wjsy", "pop1": "s_d_kzty", "during": 850, "li_index": 3},
    {"pos": 5440, "pop": "l_d_tjt", "pop1": "s_d_dps", "during": 750, "li_index": 4},
    {"pos": 6000, "pop": "l_d_kft", "pop1": "s_d_xljd", "during": 400, "li_index": 5},
    {"pos": 6535, "pop": "l_tip_3", "pop1": "s_tip_3", "during": 400},
    {"pos": 6700, "pop": null, "during": 700},
    {"pos": 7535, "pop": null, "during": 300},
    {"pos": 7635, "pop": "l_d_xlmsd", "pop1": "s_d_xlmsd", "during": 700, "li_index": 6},
    {"pos": 8135, "pop": "award_1", "during": 400, "bottom": 108, "width": 166},
    {"pos": 8335, "pop": "l_tip_4", "pop1": "s_tip_4", "during": 500},
    {"pos": 8635, "pop": "l_d_jcd", "pop1": "s_d_jcd", "during": 400, "li_index": 7}
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

function startTouchHandler(event) {

    startY = event.touches[0].clientY;

    startX = event.touches[0].clientX;

}

function moveTouchHandler(event) {

    event.stopPropagation();

    event.preventDefault();

    endY = event.touches[0].clientY;

    endX = event.touches[0].clientX;

}

function endTouchHandler(event) {

    endY = event.changedTouches[0].clientY;

    endX = event.changedTouches[0].clientX;

    if(isRotation){

        endX=endY;

        startX=startY;
    }

    gotoTarget();
}

var playing = false;

var dir = "next";

var currentOffsetLeft=0;

function gotoTarget(byClickLi) {

    if (canTouch) {

        playing = true;

        canTouch = false;

        var goIndex;

        var during;

        var offsetX;

        if (byClickLi) {

            if (clickDir == "next") {

                offsetX = -41;

            } else if (clickDir == "prev") {

                offsetX = 41;

            }

        } else {

            offsetX = endX - startX;
        }

        if (offsetX < -40) {

            dir = "next";

            removeFlipx();

            if (inCrossIndex + 1 < targetPosX.length) {

                var stopX = targetPosX[inCrossIndex + 1].posX;

                goIndex = inCrossIndex + 1;

                offsetLeft = -stopX;

            } else {

                $("#pop_div").show();

                playing = false;

                canTouch = true;

                return;
            }

            during = bgPosX[inCrossIndex].during;

        } else if (offsetX > 40) {

            $("#pop_div").hide();

            dir = "prev";

            addFlipx();

            if (inCrossIndex >= 0) {

                goIndex = inCrossIndex - 1;

                if (goIndex <= 0)goIndex = 0;

                var stopX = targetPosX[goIndex].posX;

                offsetLeft = -stopX;

            }

            during = bgPosX[goIndex].during;

        } else {

            //这个地方是点击

            playing = false;

            canTouch = true;

            return;
        }

        bgOffsetX = offsetLeft / scale;

        $("#d").hide();

        $("#tip").hide();

        $("#award").hide();


        if(currentOffsetLeft==targetPosX[planIndex].posX){

            if(dir=="next"){

                showPlane();

            }else{

                showPerson();
            }
        }

        if(currentOffsetLeft==targetPosX[planIndex+1].posX){

            if(dir=="prev"){

                showPlane();

            }else{

                showPerson();
            }
        }

        if(currentOffsetLeft==targetPosX[carIndex].posX){

            if(dir=="next"){

                showCar();

            }else{

                showPerson();
            }
        }

        if(currentOffsetLeft==targetPosX[carIndex+1].posX){

            if(dir=="prev"){

                showCar();

            }else{

                showPerson();
            }
        }


        currentOffsetLeft=Math.abs(offsetLeft);


        $("#bg_img").animate({marginLeft: offsetLeft}, during, function () {

            playing = false;

            canTouch = true;

            personIndex = 1;

            eid("person_img").src = "Content/img/char/character0" + personIndex + ".png";

            if (goIndex || goIndex == 0) {

                targetPosX[inCrossIndex].inCross = false;

                inCrossIndex = goIndex;

                targetPosX[inCrossIndex].inCross = true;

                console.log("setInCross", inCrossIndex, targetPosX[inCrossIndex]);
                console.log( bgPosX[inCrossIndex]);

                if (byClickLi) {

                    clickCrossArr.shift();

                    if (clickCrossArr.length) {

                        showPop();

                        gotoTarget(true);

                    } else {

                        showPop();
                    }

                } else {

                    showPop(true);

                }

            }

            if (dir == "next") {

                if (inCrossIndex == planIndex) {

                    showPlane();

                } else if (inCrossIndex == carIndex) {

                    showCar();

                } else {

                    showPerson();

                }
            } else {

                if (inCrossIndex == planIndex + 1) {

                    showPlane();

                } else if (inCrossIndex == carIndex + 1) {

                    showCar();

                } else {

                    showPerson();

                }
            }


            if(currentOffsetLeft<targetPosX[planIndex].posX){

                $("#plane").hide();

                $("#person").show();

            }else if(currentOffsetLeft<=targetPosX[planIndex+1].posX){

                $("#plane").show();

                $("#person").hide();

            }else if(currentOffsetLeft<targetPosX[carIndex].posX){

                $("#car").hide();

                $("#person").show();

            }else if(currentOffsetLeft<=targetPosX[carIndex+1].posX){

                $("#car").show();

                $("#person").hide();

            }else{

                $("#car").hide();

                $("#person").show();

            }


        });

    }

}


function showPop(selectedLi) {

    if (bgPosX[inCrossIndex].pop) {

        if (bgPosX[inCrossIndex].pop.indexOf("_tip_") != -1) {

            showTip();

        } else if (bgPosX[inCrossIndex].pop.indexOf("_d_") != -1) {

            showD();

        } else if (bgPosX[inCrossIndex].pop.indexOf("award") != -1) {

            showAward();
        }
    }


    if (selectedLi){

        if (bgPosX[inCrossIndex].li_index || bgPosX[inCrossIndex].li_index == 0) {

            $("#nav_ul li").each(function () {

                if ($(this).index() == bgPosX[inCrossIndex].li_index) {

                    $(this).children()[0].src = "Content/img/" + roomName + "_" + $(this).index() + "_s.png";

                } else {

                    $(this).children()[0].src = "Content/img/" + roomName + "_" + $(this).index() + ".png";
                }

            });

        }
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

    $("#person").hide();

    $("#car").hide();

    isPlaneing = true;

    isCaring = false;

    isPersoning = false;
}

function hidePlaneOrCar(){

    $("#plane").hide();

    $("#person").show();

    $("#car").hide();

    isPlaneing = false;

    isCaring = false;

    isPersoning = true;
}

var isCaring = false;

function showCar() {

    $("#car").show();

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

function showTip() {

    var popName;

    if(roomName=="l"){
        popName=bgPosX[inCrossIndex].pop;
    }else{
        popName=bgPosX[inCrossIndex].pop1;
    }

    eid("tip_img").src = "Content/img/" + popName + ".png";

    var left = personStageLeft + personWWidth * scale;

    $("#tip").css("left", left);

    var top = 375 * scale;

    $("#tip").css("top", top);

    $("#tip").width(322 * scale*1.4);

    $("#tip").show();

    $("#d").hide();

    $("#award").hide();

}

function showD() {

    var popName;

    if(roomName=="l"){
        popName=bgPosX[inCrossIndex].pop;
    }else{
        popName=bgPosX[inCrossIndex].pop1;
    }

    eid("d_img").src = "Content/img/" + popName + ".png";

    var left = personStageLeft + personWWidth * scale;

    $("#d").css("left", left);

    var top = 25 * scale;

    $("#d").css("top", top);

    $("#d").width(518 * scale);

    $("#d").show();

    $("#tip").hide();

    $("#award").hide();

    if(popName.indexOf("jcd")!=-1){

        $("#d_close").css("top",160*scale);

    }else{

        $("#d_close").css("top",0);

    }

}

function showAward(){

    eid("award_img").src = "Content/img/" + bgPosX[inCrossIndex].pop + ".png";

    var left = personStageLeft + personWWidth * scale;

    $("#award").css("left", left);

    var bottom = bgPosX[inCrossIndex].bottom * scale;

    $("#award").css("bottom", bottom);

    $("#award").width(bgPosX[inCrossIndex].width * scale*1.6);

    $("#award").show();

    $("#d").hide();

    $("#tip").hide();


}

var personIndex = 1;

function playAnimate() {

    if (playing) {

        if (isPersoning) {

            personIndex++;

            if (personIndex >= 10) {

                personIndex = 1;
            }

            eid("person_img").src = "Content/img/char/character0" + personIndex + ".png";

        } else if (isPlaneing) {

            var bg_offsetX = parseInt($("#bg_img").css("marginLeft"));

            bg_offsetX = Math.abs(bg_offsetX);

            var offsetX = Math.abs(bg_offsetX - planeMaxTopX);

            var percent = offsetX / planeLength;

            if (percent > 1)percent = 1;

            if (percent < 0)percent = 0;

            var realTop = planeMinTop - (1 - percent) * 250;

            $("#plane").css("top", realTop);
        }

    }

}

setInterval(playAnimate, 1000 / 20);

//$(document).ready(function () {
//
//    addTouchHandle();
//
//   setStage();
//
//});

var roomName

function initGame(name) {

    roomName=name;

    if(roomName=="l"){

        bgPosX=bgPosX_l;

    }

    addTouchHandle();

    addNavClick();

    var w = document.documentElement.clientWidth;

    var h = document.documentElement.clientHeight;

    if(w<h){

        setStage();

        $("#stage").show();


    }else{

        setStage();

        $("#stage").show();

        $(".rotationTip").hide();

    }


}

var isRotation=false;

function setStage() {

    d_w = document.documentElement.clientWidth;

    stage_height = document.documentElement.clientHeight;

    if(d_w<stage_height){

        d_w=document.documentElement.clientHeight;

        stage_height = document.documentElement.clientWidth;

        isRotation=true;
    }else{

        isRotation=false;
    }

    $("#stage").width(d_w);

    $("#stage").height(stage_height);

    if(isRotation){

        $("#stage").css("transform","rotate(90deg)");

        var origin=stage_height/2+"px "+ stage_height/2+"px";

        $("#stage").css("transform-origin",origin);

    }else{

        $("#stage").css("transform","rotate(0deg)");

        var origin="0px 0px";

        $("#stage").css("transform-origin",origin);
    }

    stage_width = stage_height / bgImg_heigh * bgImg_width;

    scale = stage_height / bgImg_heigh;

    personStageLeft = personLeft * scale;

    personStageLeft=parseInt(personStageLeft);

    setBg();

    setPerson();

    setPlane();

    setCar();

    setNav();

    setTargetPos();

    $(".shareBtn").show();

    setShareList();
}

function setShareList(){


    if (isRotation) {

        $(".share_pop").width("100%");

        $(".share_pop").height("100%");

        $(".share_pop").css("left","0%");

    } else {

        $(".share_pop").width("50%");

        $(".share_pop").height("100%");

        $(".share_pop").css("left","25%");

    }
}



function setTargetPos() {

    targetPosX = [];

    for (var i = 0; i < bgPosX.length; i++) {

        var newPosX = bgPosX[i]["pos"] * scale - personStageLeft - scale * personWWidth;

        newPosX=parseInt(newPosX);

        if (inCrossIndex == i) {

            var target = {"posX": newPosX, "inCross": true}

        } else {

            var target = {"posX": newPosX, "inCross": false}

        }

        if (i == bgPosX.length - 1) {

            target.posX = -(d_w - stage_width);

        } else if (i == 0) {

            target.posX = 0;
        }

        targetPosX.push(target);
    }

    planeMaxTopX = (1970 * scale - personStageLeft - scale * personWWidth + 3750 * scale - personStageLeft - scale * personWWidth) / 2;

    planeLength = (3750 * scale - personStageLeft - scale * personWWidth - (1970 * scale - personStageLeft - scale * personWWidth)) / 2;

}

function setBg() {

    var offsetX = bgOffsetX * scale;

    $("#bg_img").css("margin-left", offsetX);

    $("#logo").width(110 * scale);

    $("#title").width(360 * scale);

    $("#title").css("left", 420 * scale);

    $("#title").css("top", 20 * scale);

    $("#mobileTip").width(202*scale);

    $("#mobileTip").show();
}

function setPerson() {

    $("#person").height(scale * personHeight);

    $("#person_img").height(scale * personHeight);

    $("#person_img").width(scale * personWWidth);

    var top = scale * groundTop - scale * personHeight + personFooter * scale;

    $("#person").css("top", top);

    $("#person").css("left", personStageLeft);

    $("#person").show();

}

function setPlane() {

    $("#plane").height(scale * planeHeight * 0.8);

    $("#plane_img").height(scale * planeHeight * 0.8);

    $("#plane_img").width(scale * planeWidth * 0.8);

    var top = scale * groundTop - scale * planeHeight * 0.8;

    planeMaxTop = top - 300;

    planeMinTop = top;

    $("#plane").css("top", top);

    $("#plane").css("left", personStageLeft);



    eid("plane_award_img").src = "Content/img/award_5.png";

    var left = (433-105)/2 * scale;

    $("#plane_award_img").css("left", left);

    var bottom = 135* scale/2;

    $("#plane_award_img").css("bottom", bottom);

    $("#plane_award_img").width(104 * scale*1.6);

    $("#plane_award_img").show();

}


function setCar() {

    $("#car").height(scale * carHeight);

    $("#car_img").height(scale * carHeight);

    $("#car_img").width(scale * carWidth);

    var top = scale * groundTop - scale * carHeight;

    $("#car").css("top", top);

    $("#car").css("left", personStageLeft);



    eid("car_award_img").src = "Content/img/award_2.png";

    var left = (189-105)/2 * scale;

    $("#car_award_img").css("left", left);

    var bottom = 87* scale;

    $("#car_award_img").css("bottom", bottom);

    $("#car_award_img").width(104 * scale*1.6);

    $("#car_award_img").show();

}

var nav_w=0;

function setNav() {

    var n_w=d_w-160;

    var n_s;

    var n_h;

    if(roomName=="l"){

        n_s=n_w/853;

        n_h=n_s*86;

    }else{
        n_s=n_w/846;

        n_h=n_s*84;
    }

    $("#nav_ul li").each(function () {

        //var w = $(this).attr("w") * n_s;

        //$(this).width(w);

        $(this).height(n_h);

        $(this).css("transform", "translateZ(0)");


    });

    $("#nav_ul").width(n_w+3);

    var left = (d_w - n_w) / 2;

    $("#nav").css("left", left);

    $("#nav").width(n_w);


    $("#nav").show();

    var ww=40;

    $(".nav_person").css("margin-left",-ww);

    $(".nav_person img").height(ww);

    var w2=ww/270*224;

    $(".nav_person img").width(w2);


    var w2=d_w/2+n_w/2+30;

    $(".index_btn").css("left",w2);




    if(resized)return;

    var popName;

    if(roomName=="l"){

        popName=bgPosX[inCrossIndex].pop;

    }else{

        popName=bgPosX[inCrossIndex].pop1;
    }

    eid("tip_img").src = "Content/img/" + popName + ".png";

    var left = personStageLeft + personWWidth * scale;

    $("#tip").css("left", left);

    var top = 365 * scale;

    $("#tip").css("top", top);

    $("#tip").width(322 * scale*1.3);

    $("#tip").show();

    $("#d").hide();

}

function addNavClick() {

    $("#nav_ul li").on("click", function () {

        if (playing)return;

        var index = $(this).index();

        $("#nav_ul li").each(function () {

            $(this).children()[0].src = "Content/img/"+roomName+"_" + $(this).index() + ".png";

        });

        $(this).children()[0].src = "Content/img/"+roomName+"_" + $(this).index() + "_s.png";

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

                gotoTarget(true);

            }

        }
    }

}

function hidePop() {

    $("#pop_div").hide();
}

function closeLqjp(){

    $(".lqjp").hide();
}

function showLqjp(img){

    var index=img.src.substr(-5,1);

    $("#gift_type").val(index);

    $(".lqjp").show();

    if(roomName=="s"){

        var price='cn:shilladfs_gxj_20160628:click_prize0'+index+'_huiqiao';

        if(LinkClick){
            LinkClick(price,'o')
        }

    }else{
        var price='cn:shilladfs_gxj_20160628:click_prize0'+index+'_guangzhu';

        if(LinkClick){
            LinkClick(price,'o')
        }
    }
}

function closeD(){
    $("#d").hide();
}


window.alert = function (txt) {

    $("#txt").html(txt);

    $(".alert").show();
}

function closeAlert() {

    $(".alert").hide();

}