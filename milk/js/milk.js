/**
 * Created by sunzg on 16/4/6.
 */
var stage_width;

var auto_layout = {psd_width: 1440};

var stage_scale;

function calculateScale() {

    if (document.body && document.body.clientWidth) {

        stage_width = document.body.clientWidth;

        var scale = document.body.clientWidth / auto_layout.psd_width;

    } else {

        stage_width = document.documentElement.clientWidth;

        var scale = document.documentElement.clientWidth / auto_layout.psd_width;

    }

    return scale;

};

stage_scale = calculateScale();

function initGameUI() {

    var autoElements = document.getElementsByClassName("at");

    var element;

    for (var i = 0; i < autoElements.length; i++) {

        element = autoElements[i];

        element.style.display = "block";

        if (element.getAttribute("aW")) {

            element.style.width = element.getAttribute("aW") * stage_scale + "px";

        }

        if (element.getAttribute("aH")) {

            element.style.height = element.getAttribute("aH") * stage_scale + "px";

        }

        if (element.getAttribute("aL")) {

            element.style.left = element.getAttribute("aL") * stage_scale + "px";

        }

        if (element.getAttribute("aT")) {

            element.style.top = element.getAttribute("aT") * stage_scale + "px";

        }

        if (element.getAttribute("outDisplay") && element.getAttribute("outDisplay") == "true") {

            continue;

        }

        element.style.display = "block";

        if (element.getAttribute("aC") && element.getAttribute("aC") == "true") {

            element.style.left = (stage_width - element.getAttribute("aW") * stage_scale) / 2 + "px";

        }
    }
}

initGameUI();

var center_offset;

var feeder_width;

var mouth_width;

var mouth_height;

var mouth_top;

var mouth_left;

var coefficient = 1;

var feeder_hspeed = 0.155;

var feeder_vspeed = 0.5;

var last_time = new Date().getTime();

var last_offset;

function initGameParam() {

    center_offset = (stage_width - document.getElementById("feeder").getAttribute("aW") * stage_scale) / 2;

    last_offset = center_offset;

    feeder_width = Math.floor(document.getElementById("feeder").getAttribute("aW") * stage_scale);

    mouth_width = Math.floor(document.getElementById("mouth").getAttribute("aW") * stage_scale);

    mouth_height = Math.floor(document.getElementById("mouth").getAttribute("aH") * stage_scale);

    mouth_top = Math.floor(document.getElementById("mouth").getAttribute("aT") * stage_scale);

    mouth_left = Math.floor((stage_width - document.getElementById("mouth").getAttribute("aW") * stage_scale) / 2);
}

initGameParam();

var total_time = 60 * 1000;

var remaining_time = total_time;

var current_time;

var update_time;

function loop() {

    current_time = new Date().getTime();

    update_time = current_time - last_time

    remaining_time = remaining_time - update_time;

    if (remaining_time <= 0) {

        remaining_time = 0;

        gameOver();

        return;

    }

    var game_process = 100 - Math.round(remaining_time / (total_time) * 100);

    var timeline = document.getElementById("timeprocess");

    timeline.style.width = game_process + "%";

    var feeder = document.getElementById("feeder");

    var update_offset = update_time * feeder_hspeed * coefficient;

    if ((last_offset + update_offset) >= (stage_width - feeder_width)) {

        feeder.style.left = (stage_width - feeder_width) + "px";

        last_offset = stage_width - feeder_width;

        feeder_hspeed = -Math.abs(feeder_hspeed);

    } else if ((last_offset + update_offset) <= 0) {

        feeder.style.left = "0px";

        last_offset = 0;

        feeder_hspeed = Math.abs(feeder_hspeed);

    } else {

        var current_offset = last_offset + update_offset;

        feeder.style.left = current_offset + "px";

        last_offset = current_offset;

    }

    last_time = current_time;

    if (is_create) {

        createMilk();

    }

    updateMilkPos(update_time);

    animationCreating();

    animationDeath();

}

var milk_last_offsetH;

var milk_last_offsetV;

function updateMilkPos(update_time) {

    if (milk) {

        var offsetH = update_time * milk_hspeed;

        var new_offsetH = milk_last_offsetH + offsetH;

        milk.style.left = (milk_last_offsetH + offsetH) + "px";

        var offsetV = update_time * milk_vspeed;

        var new_offsetV = milk_last_offsetV + offsetV;

        milk.style.top = (milk_last_offsetV + offsetV) + "px";

        if (new_offsetH >= stage_width) {

            milk = null;

            return;

        }
        if ((offsetH + milk_last_offsetH) <= 0) {

            milk = null;

            return;

        }

        milk_last_offsetH = new_offsetH;

        var nextX = milk_last_offsetH + offsetH;

        if (new_offsetV >= (mouth_top + mouth_height)) {

            milk = null;

            return;
        }

        milk_last_offsetV = new_offsetV;

        var nextY = milk_last_offsetV + offsetV;

//        createDiv(milk_last_offsetH,milk_last_offsetV);
//
//        console.log("div:::(x, y):",milk_last_offsetH,milk_last_offsetV)

        if (is_goal) {

            var next_impactLength = Math.sqrt((nextX - impact_point.x) * (nextX - impact_point.x) + (nextY - impact_point.y) * (nextY - impact_point.y));

            var current_impactLength = Math.sqrt((milk_last_offsetH - impact_point.x) * (milk_last_offsetH - impact_point.x) + (milk_last_offsetV - impact_point.y) * (milk_last_offsetV - impact_point.y));

            if (current_impactLength < next_impactLength) {

                goal++;

                setDeathMilk(milk);

                milk = null;

//                if (feeder_hspeed > 0) {

//                    feeder_hspeed += 0.015;

//                } else {

//                    feeder_hspeed -= 0.015;

//                }
            }
        }

    }
}

function createDiv(left, top) {

    var div = document.createElement("div");

    var border = "1px solid " + color;

    div.style.border = border;

    div.style.width = milk_size * 2 + "px";

    div.style.height = milk_size * 2 + "px";

    div.style.borderRadius = milk_size + "px";

    div.style.backgroundColor = color;

    div.style.position = "absolute";

    div.style.left = left + "px";

    div.style.top = top + "px";

    var content = document.getElementById("content");

    content.appendChild(div);

    return div;

}

var creating_milk;

var creating_time;

var creating_opacity;

function setCreateMilk(milk) {

    creating_milk = milk;

    creating_time = current_time;

    creating_opacity = 0;

}

function animationCreating() {

    if (creating_milk) {

        if (creating_time - current_time <= 50) {

            creating_opacity += 0.1;

            creating_milk.style.opacity = creating_opacity;

            creating_time = current_time;

            if (creating_opacity >= 1) {

                creating_milk = null;

            }
        }
    }
}

var death_milk;

var death_time;

var death_opacity;

var goal_span = document.getElementById("goals");

function setDeathMilk(milk) {

    death_milk = milk;

    death_time = current_time;

    death_opacity = 1;

    goal_span.innerText = "喝到 " + goal + " 次";

}

function animationDeath() {

    if (death_milk) {

        if ((death_time - current_time) <= 100) {

            death_opacity -= 0.1;

            death_milk.style.opacity = death_opacity;

            death_time = current_time;

            if (death_opacity <= 0) {

                death_milk = null;

            }
        }
    }
}

var stage = document.getElementById("stage");

stage.addEventListener("click", stageClick);


function stageClick() {

    if (milk) {

        return;

    }

    is_create = true;
}

var is_create = false;

var milk_hspeed;

var milk_vspeed = 0.3;

var milk_size = 5;

var tp1 = {x: mouth_left - milk_size, y: mouth_top - milk_size};

var tp2 = {x: mouth_left + mouth_width + milk_size, y: mouth_top - milk_size};

var tp3 = {x: mouth_left + mouth_width + milk_size, y: mouth_top + mouth_height + milk_size};

var tp4 = {x: mouth_left - milk_size, y: mouth_top + mouth_height + milk_size};

var is_goal = false;

var goal = 0;

var impact_point = {};

var milk;

var impact_length = 0;

var create_count = 0;

var color;

function createMilk() {

    is_create = false;

    create_count++;

    milk_hspeed = feeder_hspeed;

    milk_last_offsetV = 0;

    milk_last_offsetH = last_offset + feeder_width / 2 - milk_size;

    color = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);

    milk = createDiv(milk_last_offsetH, 0);

    setCreateMilk(milk);


    //280.495 0 -0.155 0.3
    //32.5 0 0.155 0.3
//    milk_last_offsetV = 0;
//    milk_last_offsetH = 32.5; //lastOffset + feeder_width / 2 - milk_size;
//    div.style.left = milk_last_offsetH + "px";
//    is_goal = false;
//    x = milk_last_offsetH;
//    y = 0;
//    hk = 0.155;
//    vk = 0.3;
//    var tx;
//    var ty;


    var x = milk_last_offsetH;

    var y = 0;

    var hk = milk_hspeed;

    var vk = milk_vspeed;

    var tx;

    var ty;

    is_goal = false;

    console.log(create_count, "================================");

    console.log("createMilk::", x, y, hk, vk)

    function setImpact() {

        impact_length = Math.sqrt((impact_point.x - milk_last_offsetH) * (impact_point.x - milk_last_offsetH) + (impact_point.y - milk_last_offsetV) * (impact_point.y - milk_last_offsetV));

        console.log("is_goal:::true");
    }

//    ty=(tx-x)*vk/hk+y;

//    tx=(ty-y)*hk/vk+x;

    tx = (tp1.y - 0) * hk / vk + x;

    if (tx >= tp1.x && tx <= tp2.x) {

        is_goal = true;

        impact_point.x = tx;

        impact_point.y = tp1.y;

        setImpact();

        return;

    }

    //检测需要先后顺序
    if (milk_last_offsetH <= center_offset) {

        ty = (tp1.x - x) * vk / hk + y;

        if (ty >= tp1.y && ty <= tp4.y) {

            is_goal = true;

            impact_point.x = tp1.x;

            impact_point.y = ty;

            setImpact();

            return;

        }

        ty = (tp2.x - x) * vk / hk + y;

        if (ty >= tp2.y && ty <= tp3.y) {

            is_goal = true;

            impact_point.x = tp2.x;

            impact_point.y = ty;

            setImpact();

            return;

        }
    } else {
        ty = (tp2.x - x) * vk / hk + y;

        if (ty >= tp2.y && ty <= tp3.y) {

            is_goal = true;

            impact_point.x = tp2.x;

            impact_point.y = ty;

            setImpact();

            return;

        }

        ty = (tp1.x - x) * vk / hk + y;

        if (ty >= tp1.y && ty <= tp4.y) {

            is_goal = true;

            impact_point.x = tp1.x;

            impact_point.y = ty;

            setImpact();

            return;

        }
    }

    console.log("is_goal:::false");

}

function requestLoop() {

    loop();

    requestAnimationFrame(requestLoop);

}

setTimeout(requestLoop);

function gameOver() {

    //clearInterval(loop_id);

    var feeder = document.getElementById("feeder");

    feeder.style.left = center_offset + "px";

    var timeprocess = document.getElementById("timeprocess");

    timeprocess.style.width = "100%";

}

//var loop_id;

//var ticker_time=34;

//function startGame() {

//    last_time = new Date().getTime();

//    last_offset = center_offset;

//    loop_id = setInterval(loop, ticker_time);

//}
