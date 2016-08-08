/**
 * Created by sunzg on 16/7/4.
 */
$(function () {

    //一级导航
    var feedIndex = 0;

    //二级导航
    var feedNavIndex;

    //三级导航 公司动态为详情页，产品为三级列表页
    var feedNavItemIndex;

    //四级导航 只有产品才有productId
    var feedNavItemInfoIndex;

    var hashFeedIndex=0;

    var ajaxUrl;

    var ajaxTemplate;

    var wrapperHeight=0;

    var mouseover_tid = [];

    var mouseout_tid = [];

    //以下为 ajax 路由解析
    var hashLoad=false;

    function parseUrl(){

        feedMaxNum=$('.nav ul li').length;

        var hash=window.location.hash;

        var parameters=hash.split("#!");

        parameters.shift();

        if(parameters.length){

            hashLoad=true;

            var feed=parameters.shift();

            var startIndex=feed.indexOf("=");

            var endIndex=feed.indexOf("#####");

            if(endIndex!=-1){

                feedIndex=feed.substring(startIndex+1,endIndex);

                ajaxUrl=feed.substring(endIndex+5,feed.length);

            }else{

                feedIndex=parseInt(feed.substring(startIndex+1,feed.length));
            }
        }

        if(parameters.length){

            var feedNav=parameters.shift();

            var startIndex=feedNav.indexOf("=");

            var endIndex=feedNav.indexOf("#####");

            if(endIndex!=-1){

                feedNavIndex=feedNav.substring(startIndex+1,endIndex);

                ajaxUrl=feedNav.substring(endIndex+5,feedNav.length);

            }else{

                feedNavIndex=feedNav.substring(startIndex+1,feedNav.length);
            }
        }

        if(parameters.length){

            var feedNavItem=parameters.shift();

            var startIndex=feedNavItem.indexOf("=");

            var endIndex=feedNavItem.indexOf("#####");

            if(endIndex!=-1){

                feedNavItemIndex=feedNavItem.substring(startIndex+1,endIndex);

                ajaxUrl=feedNavItem.substring(endIndex+5,feedNavItem.length);

            }else{

                feedNavItemIndex=feedNavItem.substring(startIndex+1,feedNavItem.length);
            }
        }

        if(parameters.length){

            var feedNavItemInfo=parameters.shift();

            var startIndex=feedNavItemInfo.indexOf("=");

            var endIndex=feedNavItemInfo.indexOf("#####");

            if(endIndex!=-1){

                feedNavItemInfoIndex=feedNavItemInfo.substring(startIndex+1,endIndex);

                ajaxUrl=feedNavItemInfo.substring(endIndex+5,feedNavItemInfo.length);

            }else{

                feedNavItemInfoIndex=feedNavItemInfo.substring(startIndex+1,feedNavItemInfo.length);
            }
        }
    }

    function gotoFeedbyLoad(){

        if(window.location.hash){

            switch (feedIndex){

                //首页
                case 0:

                    loadFeedContent(feedIndex);

                    break;

                case 1:

                    gyNavIndex=feedNavIndex;

                    loadFeedContent(feedIndex,gyNavIndex);

                    break;

                case 2:

                    cpNavIndex=feedNavIndex;

                    cpNavItemIndex=feedNavItemIndex;

                    cpNavItemInfoIndex=feedNavItemInfoIndex;

                    loadFeedContent(feedIndex,cpNavIndex,cpNavItemIndex,cpNavItemInfoIndex);

                    break;

                case 3:

                    gsdtNavIndex=feedNavIndex;

                    gsdtNavItemIndex=feedNavItemIndex;

                    cpNavItemInfoIndex=feedNavItemInfoIndex;

                    loadFeedContent(feedIndex,gsdtNavIndex,gsdtNavItemIndex);

                    break;

                case 4:

                    zcNavIndex=feedNavIndex;

                    zcNavItemIndex=feedNavItemIndex;

                    loadFeedContent(feedIndex,zcNavIndex,zcNavItemIndex);

                    break;

                case 5:

                    hdzqNavIndex=feedNavIndex;

                    hdIndex=feedNavItemIndex;

                    loadFeedContent(feedIndex,hdzqNavIndex,hdIndex);

                    break;

                //联系我们
                case 6:

                    loadFeedContent(feedIndex);

                    break;

                //法律声明
                case 7:

                    feedIndex=0;

                    window.location.hash="";

                    specialFeedShow(7);

                    break;

                case 8:

                    feedIndex=0;

                    window.location.hash="";

                    specialFeedShow(8);

                    break;

                case 10:

                    feedIndex=0;

                    window.location.hash="";

                    specialFeedShow(10);

                    break;

                case 11:

                    feedIndex=0;

                    window.location.hash="";

                    specialFeedShow(11);

                    break;
            }
        }else{

            AD_SURVEY_TRACKING_Site_Visit('39');
        }
    }

    function getDataByAPI(ajaxUrl,template,callback){

        $.ajax({

            type: "GET",

            url: ajaxUrl,

            data: {},

            dataType: "json",

            success: function(data){

                parseDateForTemplate(data,template);

                if(callback)callback();

                setTimeout(function(){

                    resizeScrollBar();

                },100);
            }
        });
    }

    function parseDateForTemplate(data,template){

        if(template=="xcpTemplate"){

            var htmlTxt="";

            for(var i=0;i<data.length;i++){

                htmlTxt+='\<div vid="'+data[i].Url+'" class="video_item"><div class="video_src"><img src="'+data[i].ImageUrl+'"></div><div class="video_name"><img class="video_name_bg" src="image/erweima_bg.png"><span class="video_name_span">'+data[i].Title+'</span></div></div>'
            }

            $(".video_list").html(htmlTxt);

            setTimeout(function(){

                $(".video_item").each(function(){

                    if($(this).index()==0){

                        var vid=$(this).attr("vid");

                        isPlayingVideo=true;

                        videoId=vid;

//                        player=new YKU.Player('youkuplayer',{
//                            styleid: '0',
//                            client_id: '6c9c676329d06001',
//                            vid: vid,
//                            newPlayer: true
//                        });

                        $("#aiqiyiPlayer").attr("src",vid);
                    }

                    var h=$(".big_video").height()/2-5;

                    $(this).height(h);

                    $(this).click(function(){

                            var vid=$(this).attr("vid");

                            isPlayingVideo=true;

                            videoId=vid;

//                            if(player){
//
//                                player=null;
//                            }
//
//                            player=new YKU.Player('youkuplayer',{
//                                styleid: '0',
//                                client_id: '6c9c676329d06001',
//                                vid: vid,
//                                newPlayer: true
//                            });

                            $("#aiqiyiPlayer").attr("src",vid);
                        }
                    );
                });
            },100);

        }else if(template=="zpxxTemplate"){

            var htmlTxt="";

            for(var i=0;i<data.length;i++){

                htmlTxt+='\<div><span class="sk_title">招聘岗位：</span><span id="zpxxTemplate_Title" class="sk_title">'+data[i].Title+'</span></div>'+
                    '\<div><span class="sk_title_2">人数：</span><span id="zpxxTemplate_PeopleNum" class="sk_title_2">'+data[i].PeopleNum+'</span><span class="sk_title_2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工作经验：</span>'+
                    '\<span id="zpxxTemplate_WorkExperience" class="sk_title_2">'+data[i].WorkExperience+'</span></div>'+
                    '\<div class="sk_title_fgx sk_title_fgx2"></div>'+
                    '\<div id="zpxxTemplate_Content" class="editDiv">'+data[i].Content+'</div>';
            }

            $("#zpxxView_shower").html(htmlTxt);

        }else if(template=="gsdtListTemplate"){

            var htmlTxt="";

            gsdtItemIds=[];

            for(var i=0;i<data.length;i++){

                var PublishTime=data[i].PublishTime;

                var timeArr=PublishTime.split("-");

                var year=timeArr.shift();

                var month=timeArr.shift();

                var day=timeArr.shift();

                var dayIndex=day.indexOf("T");

                day=day.substring(0,dayIndex);

                var dayArr=day.split("");

                var dayString='\<div class="date_img1">';

                for(var j=0;j<dayArr.length;j++){

                    dayString+='<img src="image/date_'+dayArr[j]+'.png">';
                }

                dayString+='</div>';

                gsdtItemIds.push(data[i].DynamicId);

                htmlTxt+='\<div class="list_item"><div class="list_info"><div class="list_time"><div class="time_date">'+
                    dayString+'\</div><div class="time_year_month">'+year+'/'+month+'</div></div><div class="info_img gsdt_info_desc_href" ajaxId="'+data[i].DynamicId+'" ajaxTemplate="gsdtContentTemplate">'+
                    '\<img src="'+data[i].ImageWebUrl+'"/>'+'</div><div class="info_desc"><div class="info_desc_title gsdt_info_desc_href" ajaxUrl="api/Company/Dynamic?id=" ajaxId="'+data[i].DynamicId+'" ajaxTemplate="gsdtContentTemplate">'+
                    data[i].Title+'</div><div class="info_desc_span"><span>'+data[i].Summary+'</span></div>'+
                    '\<a class="info_desc_href gsdt_info_desc_href" ajaxUrl="api/Company/Dynamic?id=" ajaxId="'+data[i].DynamicId+'" ajaxTemplate="gsdtContentTemplate">了解详情&gt;&gt;</a></div></div></div>';
            }

            $("#gsdtView_shower").html(htmlTxt);

            setTimeout(resetCPContentSize,100);

        }else if(template=="zc_rhyzs_ListTemplate"||template=="zc_qcby_ListTemplate"||template=="zc_cjwt_ListTemplate"){

            var idTemplate="";

            var shower="";

            var itemIds;

            if(template=="zc_rhyzs_ListTemplate"){

                idTemplate="zc_rhyzs_ContentTemplate";

                shower="rhyzsView_shower";

                rhyzsItemIds=[];

                itemIds=rhyzsItemIds;

            }else if(template=="zc_qcby_ListTemplate"){

                idTemplate="zc_qcby_ContentTemplate";

                shower="qcbyView_shower";

                qcbyItemIds=[];

                itemIds=qcbyItemIds;

            }else if(template=="zc_cjwt_ListTemplate"){

                idTemplate="zc_cjwt_ContentTemplate";

                shower="cjwtView_shower";

                cjwtItemIds=[];

                itemIds=cjwtItemIds;
            }

            var htmlTxt="";

            for(var i=0;i<data.length;i++){

                var PublishTime=data[i].PublishTime;

                var timeArr=PublishTime.split("-");

                var year=timeArr.shift();

                var month=timeArr.shift();

                var day=timeArr.shift();

                var dayIndex=day.indexOf("T");

                day=day.substring(0,dayIndex);

                itemIds.push(data[i].Id);

                htmlTxt+='\<div class="list_item"><div class="list_info list_info2"><div class="info_img zc_info_desc_href" ajaxUrl="api/Company/ServiceSupport?id=" ajaxId="'+data[i].Id+'" ajaxTemplate="'+idTemplate+'" parentTemplate="'+template+'"><img src="'+data[i].ImageWeb+'"/></div>'+
                '<div class="info_desc"><div class="info_desc_title zc_info_desc_href" ajaxUrl="api/Company/ServiceSupport?id=" ajaxId="'+data[i].Id+'" ajaxTemplate="'+idTemplate+'" parentTemplate="'+template+'">'+data[i].Title+'</div><div class="info_desc_span"><span>'+data[i].Summary+'</span></div>'+
                '<a class="info_desc_href zc_info_desc_href" ajaxUrl="api/Company/ServiceSupport?id=" ajaxId="'+data[i].Id+'" ajaxTemplate="'+idTemplate+'" parentTemplate="'+template+'">了解详情&gt;&gt;</a></div></div></div>';
            }

            $("#"+shower).html(htmlTxt);

            setTimeout(resetCPContentSize,100);

        }else if(template=="cycListTemplate"||template=="sycListTemplate"||template=="mtcListTemplate"){

            var idTemplate;

            if(template=="cycListTemplate"){

                idTemplate="cp_cyc_ItemContentTemplate";

            }else if(template=="sycListTemplate"){

                idTemplate="cp_syc_ItemContentTemplate";

            }else if(template=="mtcListTemplate"){

                idTemplate="cp_mtc_ItemContentTemplate";
            }

            var htmlTxt="";

            cpClickIds=[];


            for(var i=0;i<data.length;i++){


                cpClickIds.push({"id":data[i].ProductId,"clickId":data[i].StatisticsCode})

                htmlTxt+='\<div ajaxId="'+data[i].ProductId+'" class="cp_list_item '+template+'_list_item" id="'+template+'_list_item_'+i+'"><div class="cp_img_div"><img class="cp_item_img cp_info_desc_href" ajaxUrl="" ajaxTemplate="'+idTemplate+'" ajaxId="'+data[i].ProductId+'" parentTemplate="'+template+'" src="'+data[i].ImageWebUrl+'"></div><div class="cp_item_info"><div class="cp_item_info_p">'+
                    '\<div class="cp_item_name cp_info_desc_href" ajaxUrl="" ajaxTemplate="'+idTemplate+'" ajaxId="'+data[i].ProductId+'" parentTemplate="'+template+'"><nobr>'+data[i].ProductName+'</nobr></div><div class="cp_item_dj"><span class="cp_item_span1"> 产品等级：</span><span class="cp_item_span2">'+data[i].APIGrade+'</span></div><div class="cp_item_bz">'+
                    '<span class="cp_item_span1">包装：</span><span class="cp_item_span2">'+data[i].Pack+'</span></div><div class="cp_item_fl"><span class="cp_item_span1">SAE黏度分类：</span><span class="cp_item_span2">'+
                    data[i].SAEType+'</span></div><div class="cp_item_desc"><span class="cp_item_span2">'+data[i].Sammary+'</span></div>'+
                    '\<a class="info_desc_href cp_info_desc_href2 cp_info_desc_href" ajaxUrl="" ajaxTemplate="'+idTemplate+'" ajaxId="'+data[i].ProductId+'" parentTemplate="'+template+'">了解详情&gt;&gt;</a></div></div></div>';

            }

            var min=feedHeight/4<125?125:feedHeight/4;

            var top=feedHeight/2+min+20;

            htmlTxt+='\<div style="top:'+top+'px" class="cp_list_icon '+template+'_list_icon"></div>';

            $("."+template).find(".cp_list").html(htmlTxt);

        }else if(template=="dsjTemplate"){

            var htmlTxt="";

            if(data[0]){

                var lastDate=data[0].EventDate;

                var year=lastDate.substring(0,4);

                $("#dsj_lastDate").html(year);
            }

            for(var i=0;i<data.length;i++){

                htmlTxt+='\<div class="dsj_date"><span class="dsjTemplate_EventsDate">'+data[i].EventDate+'\</span></div>'+
                    '\<div class="dsj_event"><span class="dsjTemplate_Events">'+data[i].Events+'\</span></div>';
            }

            $("#dsjTemplate_Content").html(htmlTxt);

        }else if(template=="hdzqListTemplate"){

            var htmlTxt="";

            for(var i=0;i<data.length;i++){

                var PublishTime=data[i].PublishTime;

                var timeArr=PublishTime.split("-");

                var year=timeArr.shift();

                var month=timeArr.shift();

                var day=timeArr.shift();

                var dayIndex=day.indexOf("T");

                day=day.substring(0,dayIndex);

                var dayArr=day.split("");

                var dayString='\<div class="date_img1">';

                for(var j=0;j<dayArr.length;j++){

                    dayString+='<img src="image/date_'+dayArr[j]+'.png">';
                }

                dayString+='</div>';

                var linkHref="";

                var hrefType="";

                if(data[i].PopUp.Type==1){

                    hrefType="img";

                    linkHref=data[i].PopUp.QCImgUrl;

                }else{

                    hrefType="a";

                    linkHref=data[i].PopUp.Url;
                }

//                hrefType="img";
//
//                linkHref="image/sk_erweima.jpg";

                htmlTxt+='\<div class="hdzqList"><div class="hdzqListImg"><img src="'+data[i].WebImageUrl+'"></div><div class="hdzq_list_time"><div class="hdzq_time_date">'+dayString+'</div><div class="hdzq_time_year_month">'+year+'/'+month+'</div></div>'+
                '\<div class="hdzq_content"><div class="hdzq_title"><span>'+data[i].Title+'</span></div><div class="hdzq_desc"><span>'+data[i].Intro+'</span></div>'+
                '\<div class="hdzq_href" ajaxId="'+i+'" hrefType="'+hrefType+'" linkHref="'+linkHref+'"><span>了解详情</span><img class="hdzq_href_img" src="image/btn_arrow.png"></div></div></div>';
            }

            $("#hdzqView_shower").html(htmlTxt);

        }else{

            for( var key in data){

                if($("#"+template+"_"+key)){

                    if(key.indexOf("Url")!=-1){

                        $("#"+template+"_"+key).attr("src",data[key]);

                    }else{

                        $("#"+template+"_"+key).html(data[key]);
                    }
                }
            }
        }
    }

    $(document).ready(function () {

        parseUrl();

        gotoFeedbyLoad();

        initWrapper();

        initHeaderNav();

        initHeaderProduct();

        initSearchInput();

        addWrapperMouseScroll();

        initIndexFeed();

        initGYFeed();

        initCPFeed();

        initFWZCFeed();

        initXWDTFeed();

        initSearch();

        initSeller();

        initSpecialFeed();

        initHDZQ();
    });

    $(window).resize(function () {

        initWrapper();

        resetCPContentSize();
    });

    var scaleH;

    function initWrapper() {

        var h = $(window).height() - $(".header").height() - $(".footer").height();

        $(".wrapper").height(h);

        wrapperHeight=h<430?430:h;

        var width=$(window).width();

        if(width<1280){

            width=1280;
        }

        scaleH=h/730;

        if(scaleH>0.85)scaleH=0.85;

        //导航栏产品样式
        $(".product_list").width(width);

        $(".second_nav").width(width);
    }

    function initSearchInput() {

        $("#search_input").focus(function () {

            $(".search").addClass("search_input_focus");
        });

        $("#search_input").blur(function () {

            $(".search").removeClass("search_input_focus");
        });
    }

    var isWrapperScroll = false;

    var isSpecialFeed=false;

    function addWrapperMouseScroll() {

        //W3C
        if (document.addEventListener) {

            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }

        //IE/Opera/Chrome
        window.onmousewheel = document.onmousewheel = scrollFunc;

        $(".template").mouseover(function () {

            isWrapperScroll = false;
        });

        $(".template").mouseout(function () {

            isWrapperScroll = true;
        });
    }

    var scrollFunc = function (e) {

        var e = e || window.event;

        var scrollValue;

        //IE/Opera/Chrome
        if (e.wheelDelta) {

            scrollValue = e.wheelDelta;

        } else if (e.detail) {

            //Firefox的滚轴数值是反的。
            scrollValue = -e.detail;
        }

        if(isSpecialFeed)return;

        if(isWrapperScroll){

            isWrapperScroll=false;

            var gotoIndex;

            if(scrollValue<0){

                gotoIndex=feedIndex+1;

            }else{

                gotoIndex=feedIndex-1;
            }

            if(gotoIndex==3){

                gsdtNavItemIndex=null;

            }else if(gotoIndex==4){

                rhyzsIndex=null;

                qcbyIndex=null;

                cjwtIndex=null;

                zcNavItemIndex=null;
            }


            switch (gotoIndex){

                case 0:

                    loadFeedContent(gotoIndex);

                    break;

                case 1:

                    loadFeedContent(gotoIndex,gyNavIndex);

                    break;

                case 2:

                    loadFeedContent(gotoIndex,cpNavIndex,cpNavItemIndex,cpNavItemInfoIndex);

                    break;

                case 3:

                    loadFeedContent(gotoIndex,gsdtNavIndex,gsdtNavItemIndex);

                    break;

                case 4:

                    loadFeedContent(gotoIndex,zcNavIndex,zcNavItemIndex);

                    break;

                case 5:

                    loadFeedContent(gotoIndex,hdzqNavIndex,hdIndex);

                    break;

                case 6:

                    loadFeedContent(gotoIndex);

                    break;

                default :

                    isWrapperScroll=true;

                    break;
            }


        }else{

        }
    }

    function showFeed(gotoIndex) {

        if(gotoIndex==0){

            AD_SURVEY_TRACKING_Site_Event('39' , '156');

        }else if(gotoIndex==1){

            AD_SURVEY_TRACKING_Site_Event('39' , '157');

        }else if(gotoIndex==2){

            AD_SURVEY_TRACKING_Site_Event('39' , '158');

        }else if(gotoIndex==3){

            AD_SURVEY_TRACKING_Site_Event('39' , '159');

        }else if(gotoIndex==4){

            AD_SURVEY_TRACKING_Site_Event('39' , '160');

        }else if(gotoIndex==5){

            AD_SURVEY_TRACKING_Site_Event('39' , '161');

        }else if(gotoIndex==6){

            AD_SURVEY_TRACKING_Site_Event('39' , '162');
        }

        <!--Ad Survey网站监测-访问代码-->
        AD_SURVEY_TRACKING_Site_Visit('39');

        specialFeedHide();

        hashFeedIndex=gotoIndex;

        if(gotoIndex<0||gotoIndex>feedMaxNum-1){

            isWrapperScroll=true;

            return;
        }

        if(gotoIndex<feedIndex){

            isWrapperScroll=false;

            $("#feed"+gotoIndex).show();

            $("#feed"+gotoIndex).find(".feed_nav").css("right","75%");

            $("#feed"+gotoIndex).find(".feed_content").css("right","0%");

//            $("#feed"+gotoIndex).find(".feed_nav").css("right","-100%");
//
//            $("#feed"+gotoIndex).find(".feed_content").css("right","-100%");

//            $("#feed"+gotoIndex).find(".feed_nav").animate({"right":"75%"},1500);

//            $("#feed"+gotoIndex).find(".feed_content").animate({"right":"0%"},1500);

            $("#feed"+gotoIndex).css("top",-wrapperHeight);

            $("#feed" + gotoIndex).animate({"top": 0 + 'px'}, 1000);

            $("#feed" + feedIndex).animate({"top": wrapperHeight + 'px'}, 1000,resetFeedIndex);

        }else if(gotoIndex>feedIndex){

            isWrapperScroll=false;

            $("#feed"+gotoIndex).show();

            $("#feed"+gotoIndex).find(".feed_nav").css("right","75%");

            $("#feed"+gotoIndex).find(".feed_content").css("right","0%");

//            $("#feed"+gotoIndex).find(".feed_nav").css("right","-100%");

//            $("#feed"+gotoIndex).find(".feed_content").css("right","-100%");

//            $("#feed"+gotoIndex).find(".feed_nav").animate({"right":"75%"},1500);

//            $("#feed"+gotoIndex).find(".feed_content").animate({"right":"0%"},1500);

            $("#feed"+gotoIndex).css("top",wrapperHeight);

            $("#feed" + gotoIndex).animate({"top": 0 + 'px'}, 1000);

            $("#feed" + feedIndex).animate({"top": -wrapperHeight + 'px'}, 1000,resetFeedIndex);

        }else{

//            console.log("header nav 点击自己，或者自己下面的子项,或者通过window.location.hash导航过来的，要做不同处理。");

            if(hashLoad){

                $(".feed").hide();

                $("#feed" + gotoIndex).show();

                resetFeedIndex();
            }
        }

        if(gotoIndex==6){

            $(".feedArrow1").show();

            $(".feedArrow2").hide();
        }

        if(gotoIndex>=0&&gotoIndex<6){

            $(".feedArrow1").hide();

            $(".feedArrow2").show();

        }

        function resetFeedIndex(){

            $("#feed"+feedIndex).hide();

            feedIndex=gotoIndex;

            $("#feed" + gotoIndex).show();

            isWrapperScroll=true;

            $('.nav ul li').each(function(){

                if(feedIndex==$(this).index()){

                    navLiAddOn(this);

                }else{

                    navLiRemoveOn(this);
                }
            });

            $('.nav ul li:eq('+feedIndex+')').addClass("on");
        }
    }

    function navLiRemoveOn(li){

        if ($(li).index() != feedIndex) {

            $(li).removeClass("on");

            if (!$(li).hasClass("on")) {

                var imgSrc = $($(li).find("p").first().find("img").first()).attr("src");

                var index = imgSrc.indexOf("_on.png");

                if(index!=-1){

                    var newSrc = imgSrc.substr(0, index) + ".png";

                    $($(li).find("p").first().find("img").first()).attr("src", newSrc);
                }
            }
        }
    }

    function navLiAddOn(li){

        $(li).addClass("on");

        var imgSrc = $($(li).find("p").first().find("img").first()).attr("src");

        if (imgSrc.indexOf("on") == -1) {

            var lg = imgSrc.length;

            var newSrc = imgSrc.substr(0, lg - 4) + "_on.png";

            $($(li).find("p").first().find("img").first()).attr("src", newSrc);
        }
    }

    var feedMaxNum=0;

    function initHeaderNav() {

        $('.nav ul li').each(function (index) {

            $(this).hover(

                function () {

                    $(".menu_products").hide();

                    var _self = this;

                    clearTimeout(mouseout_tid[index]);

                    mouseover_tid[index] = setTimeout(function () {

                        $(_self).find("div").first().slideDown(400);

                    }, 200);

                    navLiAddOn(this);
                },

                function () {

                    var _self = this;

                    clearTimeout(mouseover_tid[index]);

                    mouseout_tid[index] = setTimeout(function () {

                        $(_self).find("div").first().slideUp(400);

                    }, 200);

                    navLiRemoveOn(this);
                }
            );
        });

        $(".nav_feed").click(function(){

            if(!isWrapperScroll)return;

            var gotoIndex=parseInt($(this).attr("feedIndex"));

            feedNavIndex=parseInt($(this).attr("feedNavIndex"));

            feedNavItemIndex=parseInt($(this).attr("feedNavItemIndex"));

            feedNavItemInfoIndex=parseInt($(this).attr("feedNavItemInfoIndex"));

            if(gotoIndex==3){

                $(this).attr("feedNavItemIndex","");

                gsdtNavItemIndex=null;

                feedNavItemIndex=null;

            }else if(gotoIndex==4){

                $(this).attr("feedNavItemIndex","");

                rhyzsIndex=null;

                qcbyIndex=null;

                cjwtIndex=null;

                zcNavItemIndex=null;

                feedNavItemIndex=null;

            }

            loadFeedContent(gotoIndex,feedNavIndex,feedNavItemIndex,feedNavItemInfoIndex);
        });

        $(".nav_span_2").each(function () {

            $(this).mouseover(function () {

                $(".nav_span_2").removeClass("nav_span_2_on");

                $(this).addClass("nav_span_2_on");
            });

            $(this).mouseout(function () {

                $(this).removeClass("nav_span_2_on");
            });

            $(this).click(function(){

                var gotoIndex=parseInt($(this).attr("feedIndex"));

                feedNavIndex=parseInt($(this).attr("feedNavIndex"));

                feedNavItemIndex=parseInt($(this).attr("feedNavItemIndex"));

                loadFeedContent(gotoIndex,feedNavIndex);
            });
        });

        $(".openSpecialFeed").each(function(){

            $(this).click(function(){

                specialFeedHide();

                var hiddenIndex=$(this).attr("feedIndex");

                specialFeedShow(hiddenIndex);

            });
        });

        $(".dt_href").each(function(){

            $(this).click(function(){

                var gotoIndex=parseInt($(this).attr("feedIndex"));

                feedNavIndex=parseInt($(this).attr("feedNavIndex"));

                feedNavItemIndex=parseInt($(this).attr("feedNavItemIndex"));

                loadFeedContent(gotoIndex,feedNavIndex,feedNavItemIndex);
            });
        });

        $(".aHref").each(function(){

            $(this).click(function(){

                var gotoIndex=parseInt($(this).attr("feedIndex"));

                feedNavIndex=parseInt($(this).attr("feedNavIndex"));

                feedNavItemIndex=parseInt($(this).attr("feedNavItemIndex"));

                loadFeedContent(gotoIndex,feedNavIndex,feedNavItemIndex);
            });
        });

        $(".feedArrow2").click(function(){

            var e={};

            e.wheelDelta=-1;

            scrollFunc(e);
        });

        $(".feedArrow1").click(function(){

            var e={};

            e.wheelDelta=1;

            scrollFunc(e);
        });

        if(feedIndex==6){

            $(".feedArrow1").show();
        }
    }

    function loadFeedContent(gotoIndex,gotoNavIndex,gotoNavItemIndex,gotoNavItemInfoIndex){

        if(gotoIndex==1&&gotoNavIndex==3){

            if(videoId){

                $("#aiqiyiPlayer").attr("src",videoId);
            }

        }else{

            if(isPlayingVideo&&videoId){

                isPlayingVideo=false;

                $("#aiqiyiPlayer").attr("src","");
            }
        }

//        if(isPlayingVideo&&gotoIndex==1&&gotoNavIndex==2){
//
//
//        }else{
//
//            if(isPlayingVideo&&videoId){
//
//                isPlayingVideo=false;
//
//                player=new YKU.Player('youkuplayer',{
//                    styleid: '0',
//                    client_id: '6c9c676329d06001',
//                    vid: videoId,
//                    newPlayer: true
//                });
//            }
//        }

        showFeed(gotoIndex);

        if(gotoIndex==0){

            window.location.hash="";

        }else if(gotoIndex==1){

            if(isFirstGY){

                gyNavIndex=gotoNavIndex;

                gyNavSelected(gyNavIndex);

            }else if(gotoNavIndex!=gyNavIndex){

                feedNavIndex=gotoNavIndex;

                gyNavIndex=gotoNavIndex;

                gyNavSelected(gyNavIndex);

            }else{

                gyNavIndex=gotoNavIndex;

                gyNavSelected(gyNavIndex);

                window.location.hash="#!feed="+gotoIndex+"#!feedNavIndex="+gotoNavIndex;
            }

        }else if(gotoIndex==2){

            if(isFirstCP){

                cpNavIndex=gotoNavIndex;

                cpNavItemIndex=gotoNavItemIndex;

                cpNavItemInfoIndex=gotoNavItemInfoIndex;

                if(cpNavIndex==0){

                    cycIndex=cpNavItemIndex;

                }else if(cpNavIndex==1){

                    sycIndex=cpNavItemIndex;

                }else if(cpNavItemIndex==2){

                    mtcIndex=cpNavItemIndex;
                }
            }

            cpNavSelected(gotoNavIndex,gotoNavItemIndex,gotoNavItemInfoIndex);

        }else if(gotoIndex==3){

            if(isFirstGSDT){

                gsdtNavIndex=gotoNavIndex;

                gsdtNavItemIndex=gotoNavItemIndex;

                if(gsdtNavItemIndex||gsdtNavItemIndex==0){

                    gsdtNavSelected(gsdtNavIndex,gsdtNavItemIndex);

                }else{

                    gsdtNavSelected(gsdtNavIndex);
                }

            }else{

                if(gotoNavItemIndex||gotoNavItemIndex==0){

                    gsdtNavSelected(gotoNavIndex,gotoNavItemIndex);

                }else{

                    gsdtNavSelected(gotoNavIndex);
                }
            }

        }else if(gotoIndex==4){

            if(isFirstFWZC){

                zcNavIndex=gotoNavIndex;

                zcNavItemIndex=gotoNavItemIndex;

                if(zcNavIndex==0){

                    rhyzsIndex=zcNavItemIndex;

                }else if(zcNavIndex==1){

                    qcbyIndex=zcNavItemIndex;

                }else if(zcNavIndex==2){

                    cjwtIndex=zcNavItemIndex;
                }

                if(zcNavItemIndex||zcNavItemIndex==0){

                    zcNavSelected(zcNavIndex,zcNavItemIndex);

                }else{

                    zcNavSelected(zcNavIndex);
                }

            }else{

                zcNavIndex=gotoNavIndex;

                zcNavSelected(zcNavIndex,gotoNavItemIndex);
            }

        }else if(gotoIndex==5){

            if(isFirstHDZQ){

                hdzqNavIndex=gotoNavIndex;

                hdIndex=gotoNavItemIndex;

                hdzqNavSelected(hdzqNavIndex,hdIndex);

            }else{

                hdzqNavSelected(gotoNavIndex,gotoNavItemIndex);
            }

        }else if(gotoIndex==6){

            window.location.hash="#!feed=6";
        }
    }

    function initSpecialFeed(){

        $(".special_content_close").click(function(){

            var tmpl = $(this).attr("closeTempalte");

            $("." + tmpl).hide();

            specialFeedHide();
        });
    }

    var prevHash="";

    function specialFeedShow(index){

        dtView.resetTop();

        flsmView.resetTop();

        searchView.resetTop();

        sczcView.resetTop();

        pxzlView.resetTop();

        sczcItemView.resetTop();

        if(index==9){

            AD_SURVEY_TRACKING_Site_Event('39' , '163');
        }

        $(".feed").hide();

        isSpecialFeed=true;

        prevHash=window.location.hash;

        window.location.hash="#!feed="+index;

        if(index==7){

            getDataByAPI("api/Company/LegalNotice","flsmContentTemplate");
        }

        if(index==10||index==11){

            openJXS(index);

        }else{

            $("#feed"+index).show();
        }
    }

    function specialFeedHide(){

        $(".specialFeed").hide();

        isSpecialFeed=false;

        window.location.hash=prevHash;

        $("#feed"+feedIndex).show();
    }

    function initHeaderProduct(){

        $(".menu_title_2").hover(

            function(){

                $(".menu_products").hide();

                var self=this;

                var tmpl=$(this).find(".menu_products");

                var span=$(this).find(".menu_title_2_span");

                var cpNavIndex1=parseInt($(span).attr("feedNavIndex"));

                var cpNavItemIndex1=parseInt($(span).attr("feedNavItemIndex"));

                var cpNavType1;

                var cpNavItemType1;

                if(cpNavIndex1==0){

                    cpNavType1=23;

                    cpNavItemType1=cycNavItemType[cpNavItemIndex1];

                }else if(cpNavIndex1==1){

                    cpNavType1=24;

                    cpNavItemType1=sycNavItemType[cpNavItemIndex1];

                }else if(cpNavIndex1==2){

                    cpNavType1=25;

                    cpNavItemType1=mtcNavItemType[cpNavItemIndex1];
                }

                var ajaxUrl="api/Product/ProductList?motorTypeId="+cpNavType1+"&productTypeId="+cpNavItemType1;

                function ajaxProducts(){

                    $.ajax({

                        type: "GET",

                        url: ajaxUrl,

                        data: {},

                        dataType: "json",

                        success: function(data){

                            var htmlTxt="";

                            for(var i=0;i<data.length;i++){

                                htmlTxt+='\<div feedIndex="2" feedNavIndex="'+cpNavIndex1+'" feedNavItemIndex="'+cpNavItemIndex1+'" feedNavItemInfoIndex="'+data[i].ProductId+'" class="product">'+
                                    '\<div class="product_img"><img src="'+data[i].ImageWebUrl+'"></div><span class="product_desc">'+data[i].ProductName+'</span> </div>';
                            }

                            htmlTxt+='\<img class="up_arrow" src="image/huisanjiao.png">';

                            $(tmpl).html(htmlTxt);

                            setTimeout(addProductClick,100);

                            function addProductClick(){

                                $(".menu_products").hide();

                                var num=$(self).find(".product").length;

                                $(self).find(".menu_products").width(num*80);

                                $(self).find(".menu_products").show();

                                $(tmpl).find(".product").each(function(){

                                    $(this).click(function(){

                                        var index1=$(this).attr("feedIndex");

                                        cpNavIndex=$(this).attr("feedNavIndex");

                                        cpNavItemIndex=$(this).attr("feedNavItemIndex");

                                        cpNavItemInfoIndex=$(this).attr("feedNavItemInfoIndex");

                                        loadFeedContent(index1,cpNavIndex,cpNavItemIndex,cpNavItemInfoIndex);

                                    });
                                });
                            }
                        }
                    });
                };

                ajaxProducts();
            },

            function(){

                $(this).find(".menu_products").hide();

                $(".menu_products").hide();
            }
        );

        $(".menu_title_2_span").click(function(){

            var gotoIndex=parseInt($(this).attr("feedIndex"));

            cpNavIndex=parseInt($(this).attr("feedNavIndex"));

            cpNavItemIndex=parseInt($(this).attr("feedNavItemIndex"));

            cpNavItemInfoIndex=null;

            loadFeedContent(gotoIndex,cpNavIndex,cpNavItemIndex);
        });
    }


    //下面为首页动画效果
    var descLeft = 0;

    var ljgdLeft = 0;

    var carLeft = 0;

    var oilLeft = 0;

    var index_imgNum = 0;

    function initIndexFeed() {

        descLeft = parseInt($("#index_desc").css("marginLeft"));

        ljgdLeft = parseInt($("#index_ljgd_btn").css("marginLeft"));

        carLeft = parseInt($("#index_car").css("marginLeft"));

        oilLeft = parseInt($("#index_oil").css("marginLeft"));

        $("#index_desc").css("marginLeft", -1500);

        $("#index_ljgd_btn").css("marginLeft", -1500);

        $("#index_car").css("marginLeft", 3000);

        $("#index_oil").css("bottom", 1900);

        index_imgNum = $(".index_img").length;

        indexImgLoaded();
    }


    function indexImgLoading() {

        var loadingNum = index_imgNum;

        $(".index_img").each(function () {

            if (this.complete) {

                loadingNum--;
            }
        })

        if (loadingNum == 0) {

            indexImgLoaded();

        } else {

            setTimeout(indexImgLoading, 200);
        }
    }

    function indexImgLoaded() {

        $(".index_img").each(function(){

            var newH=parseInt($(this).attr("dataH"))*scaleH;

            var newW=parseInt($(this).attr("dataW"))*scaleH;

            $(this).width(newW);

            $(this).height(newH);

            $(this).show();

        });

        $("#index_desc").animate({marginLeft: descLeft}, 500, function () {

            $("#index_car").animate({marginLeft: carLeft}, 500, function () {

                $("#index_oil").animate({bottom: 0}, 500, function () {

                    indexFeedAnimated();
                });
            });
        });

        $("#index_ljgd_btn").animate({marginLeft: ljgdLeft}, 300, function () {


        });

        $.ajax({

            type: "GET",

            url: "api/Company/HomePage",

            data: {},

            dataType: "json",

            success: function(data){

                var htmlTxt="";

               for(var i=0;i<data.length;i++){

                   var index=i+1;

                   htmlTxt='<div id="index_kv'+index+'" class="index_kvItem"><a target="_blank" href="'+data[i].LinkUrl+'"><img class="index_kvImg" src="'+data[i].ImageUrl+'"></a></div>';

                   var item=$(htmlTxt);

                   $("#index_kv_container").append(item);
               }

                setTimeout(function(){

                    var indexKv=new KV("index");

                    indexKv.init();

                },100);
            }
        });
    }

    function indexFeedAnimated() {

        isWrapperScroll=true;

        //body只是元素的显示范围,document是整个文档的范围
        $(document).mousemove(function (e) {

            var centerX = $(window).width() / 2;

            var m_l = Math.abs(e.pageX - centerX) / 50;

            $("#index_car").css("margin-left", carLeft - m_l);

            $("#index_oil").css("margin-left", oilLeft + m_l);

            if((e.pageX-centerX)>0){

                $(".feed_bg").css("margin-left",m_l);
            }else{
                $(".feed_bg").css("margin-left",-m_l);

            }
        });
    }

    var gyNavIndex = 0;

    var isFirstGY=true;

    function initGYFeed() {

        $(".gysk_tab").each(function () {

            $(this).hover(

                function () {

                    $(this).addClass("gysk_tab_hover");

                    $(this).animate({width: 40}, 200);
                },

                function () {

                    if ($(this).index() != gyNavIndex) {

                        $(this).removeClass("gysk_tab_hover");

                        $(this).animate({width: 25}, 200);
                    }
                }
            );

            $(this).click(function () {

                gyNavIndex = $(this).index();

                feedNavIndex=gyNavIndex;

                gyNavSelected();
            });
        });

//        createFloatOil();
    }

    var isPlayingVideo=false;

    var videoId;

    function gyNavSelected(index){

        gsjj.resetTop();

        qywh.resetTop();

        dsj.resetTop();

        xcp.resetTop();

        zpxx.resetTop();

        isFirstGY=false;

        if(gyNavIndex==3){

            isPlayingVideo=true;

            if(videoId){

                $("#aiqiyiPlayer").attr("src",videoId);
            }
        }else{

            $("#aiqiyiPlayer").attr("src","");
        }

        $("#gysk").attr("feedNavIndex",gyNavIndex);

        $(".gyTemplate").hide();

        $(".gysk_tab").each(function () {

            if($(this).index()==gyNavIndex){

                $(this).find("img").first().show();

                $(this).addClass("gysk_tab_on");

                $(this).animate({width: 40}, 200);

                ajaxTemplate=$(this).attr("ajaxTemplate");

                ajaxUrl=$(this).attr("ajaxUrl");

                var tmpl = ajaxTemplate;

                $("." + tmpl).show();

                getDataByAPI(ajaxUrl,ajaxTemplate);

            }else{

                $(this).removeClass("gysk_tab_hover");

                $(this).removeClass("gysk_tab_on");

                $(this).animate({width: 25}, 200);

                $(this).find("img").first().hide();
            }

            window.location.hash="#!feed=1#!feedNavIndex="+gyNavIndex;
        });
    }

    var gsdtNavIndex=0;

    var gsdtNavItemIndex;

    var isFirstGSDT=true;

    var gsdtItemIds=[];

    function findItemId(itemIds,goto,currentId){

        var index;

        for(var i=0;i<itemIds.length;i++){

            if(currentId==itemIds[i]){

                index=i;
            }
        }

        if(goto=="prev"){

            if(index==0){

                return null;

            }else{

                return itemIds[index-1];
            }

        }else if(goto=="next"){

            if(index==itemIds.length-1){

                return null;

            }else{

                return itemIds[index+1];
            }

        }

        return null;
    }

    function initXWDTFeed(){

        $(".content_close").click(function(){

            var tmpl = $(this).attr("closeTempalte");

            $("." + tmpl).hide();

            if(tmpl=="flsmContentTemplate"){

                specialFeedHide();
            }
        });

        $(".gsdtContent_close").click(function(){

            var tmpl = $(this).attr("closeTempalte");

            $("." + tmpl).hide();

            window.location.hash="#!feed=3#!feedNavIndex=0";
        });

        $(".gsdt_prev_btn").click(function(){

            var prevId=findItemId(gsdtItemIds,"prev",gsdtNavItemIndex);

            if(prevId){

                var tmpl = "gsdtContentTemplate";

                var url = "api/Company/Dynamic?id=";

                gsdtNavItemSelected(prevId,url,tmpl);
            }
        });

        $(".gsdt_next_btn").click(function(){

            var prevId=findItemId(gsdtItemIds,"next",gsdtNavItemIndex);

            if(prevId){

                var tmpl = "gsdtContentTemplate";

                var url = "api/Company/Dynamic?id=";

                gsdtNavItemSelected(prevId,url,tmpl);
            }
        });
    }

    function gsdtNavSelected(index,itemIndex){

        gsdtNavItemIndex=itemIndex;

        isFirstGSDT=false;

        gsdtList.resetTop();

        $(".gsdtContentTemplate").hide();

        $(".gsdt_tab").each(function () {

            ajaxTemplate=$(this).attr("ajaxTemplate");

            var tmpl = ajaxTemplate;

            $("." + tmpl).show();

            var ajaxUrl=$(this).attr("ajaxUrl");

            window.location.hash="#!feed=3#!feedNavIndex=0";

            getDataByAPI(ajaxUrl,tmpl,addItemHref);

        });

        function addItemHref(){

            //这个在ajaxList被添加到文档之后添加监听.500毫秒延迟确保已经被添加到文档流。
            setTimeout(function(){

                $(".gsdt_info_desc_href").each(function(){

                    $(this).click(function(){

                        var tmpl2 = $(this).attr("ajaxTemplate");

                        var url=$(this).attr("ajaxUrl");

                        var gsdtId=$(this).attr("ajaxId");

                        gsdtNavItemSelected(gsdtId,url,tmpl2);
                    });
                });

                if(itemIndex||itemIndex==0){

                    var isRequested=false;

                    $(".gsdt_info_desc_href").each(function(){

                        var gsdtId=$(this).attr("ajaxId");

                        if(gsdtId==itemIndex&&!isRequested){

                            var tmpl2 = $(this).attr("ajaxTemplate");

                            var url=$(this).attr("ajaxUrl");

                            gsdtNavItemSelected(gsdtId,url,tmpl2);

                            isRequested=true;
                        }
                    });
                }
            },100);
        }
    }

    function gsdtNavItemSelected(id,url,tmpl){

        gsdtNavItemIndex=id;

        gsdtItemView.resetTop();

        window.location.hash="#!feed=3#!feedNavIndex=0#!feedNavItemIndex="+id;

        $("." + tmpl).show();

        url+=id;

        getDataByAPI(url,tmpl);
    }

    var zcNavIndex=0;

    var zcNavItemIndex;

    var isFirstFWZC=true;

    var isFirstrhyzs=true;

    var isFirstqcby=true;

    var isFirstcjwt=true;

    var rhyzsIndex;

    var qcbyIndex;

    var cjwtIndex;

    var rhyzsItemIds;

    var qcbyItemIds;

    var cjwtItemIds;

    function initFWZCFeed(){

        $(".zc_tab").each(function () {

            $(this).hover(

                function () {

                    $(this).addClass("zc_tab_hover");

                    $(this).animate({width: 40}, 200);
                },

                function () {

                    if ($(this).index() != zcNavIndex) {

                        $(this).removeClass("zc_tab_hover");

                        $(this).animate({width: 25}, 200);
                    }
                }
            );

            $(this).click(function () {

                zcNavIndex = $(this).index();

                rhyzsIndex=null;

                qcbyIndex=null;

                cjwtIndex=null;

                zcNavSelected(zcNavIndex);
            });
        });

        $(".zc_content_close").each(function(){

            $(this).click(function(){

                var tmpl = $(this).attr("closeTempalte");

                $("." + tmpl).hide();

                window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex;

                if(zcNavIndex==0){

                    rhyzsIndex=null;

                }else if(zcNavIndex==1){

                    qcbyIndex=null;

                }else if(zcNavIndex==2){

                    cjwtIndex=null;
                }

                zcNavItemIndex=null;
            });
        });

        $(".rhyzs_prev_btn").click(function(){

            var prevId=findItemId(rhyzsItemIds,"prev",rhyzsIndex);

            if(prevId){

                var tmpl = $(this).attr("ajaxTemplate");

                var url = "api/Company/ServiceSupport?id=";

                zcNavItemSelected(prevId,url,tmpl);
            }
        });

        $(".rhyzs_next_btn").click(function(){

            var prevId=findItemId(rhyzsItemIds,"next",rhyzsIndex);

            if(prevId){

                var tmpl = $(this).attr("ajaxTemplate");

                var url = "api/Company/ServiceSupport?id=";

                zcNavItemSelected(prevId,url,tmpl);
            }
        });

        $(".qcby_prev_btn").click(function(){

            var prevId=findItemId(qcbyItemIds,"prev",qcbyIndex);

            if(prevId){

                var tmpl = $(this).attr("ajaxTemplate");

                var url = "api/Company/ServiceSupport?id=";

                zcNavItemSelected(prevId,url,tmpl);
            }
        });

        $(".qcby_next_btn").click(function(){

            var prevId=findItemId(qcbyItemIds,"next",qcbyIndex);

            if(prevId){

                var tmpl = $(this).attr("ajaxTemplate");

                var url = "api/Company/ServiceSupport?id=";

                zcNavItemSelected(prevId,url,tmpl);
            }
        });

        $(".cjwt_prev_btn").click(function(){

            var prevId=findItemId(cjwtItemIds,"prev",cjwtIndex);

            if(prevId){

                var tmpl = $(this).attr("ajaxTemplate");

                var url = "api/Company/ServiceSupport?id=";

                zcNavItemSelected(prevId,url,tmpl);
            }
        });

        $(".cjwt_next_btn").click(function(){

            var prevId=findItemId(cjwtItemIds,"next",cjwtIndex);

            if(prevId){

                var tmpl = $(this).attr("ajaxTemplate");

                var url = "api/Company/ServiceSupport?id=";

                zcNavItemSelected(prevId,url,tmpl);
            }
        });
    }

    function zcNavSelected(index,itemIndex){

        zcNavIndex=index;

        isFirstFWZC=false;

        $(".zc_ContentTemplate").hide();

        $("#fwzc").attr("feedNavIndex",zcNavIndex);

        rhyzsView.resetTop();

        qcbyView.resetTop();

        cjwtView.resetTop();

        $(".zc_tab").each(function () {

            if($(this).index()==zcNavIndex){

                $(this).find("img").first().show();

                $(this).addClass("zc_tab_on");

                $(this).animate({width: 40}, 200);

                ajaxTemplate=$(this).attr("ajaxTemplate");

                ajaxUrl=$(this).attr("ajaxUrl");

            }else{

                $(this).removeClass("zc_tab_hover");

                $(this).removeClass("zc_tab_on");

                $(this).animate({width: 25}, 200);

                $(this).find("img").first().hide();
            }
        });

        $(".zcListTemplate").hide();

        $(".zc_ContentTemplate ").hide();

        var tmpl = ajaxTemplate;

        $("." + tmpl).show();

        if(zcNavIndex==0){

            if(isFirstrhyzs){

                isFirstrhyzs=false;

                loadNavIndexContent();

            }else{

                if(itemIndex){

                    if(itemIndex!=rhyzsIndex){

                        var tmpl3="zc_rhyzs_ContentTemplate";

                        var url3="api/Company/ServiceSupport?id=";

                        zcNavItemSelected(itemIndex,url3,tmpl3);

                    }else{

                        $(".zc_rhyzs_ContentTemplate").show();
                    }

                    window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex+"#!feedNavItemIndex="+rhyzsIndex;

                }else{

                    if(rhyzsIndex||rhyzsIndex==0){

                        $(".zc_rhyzs_ContentTemplate").show();

                        window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex+"#!feedNavItemIndex="+rhyzsIndex;

                    }else{

                        window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex;
                    }
                }
            }

        }else if(zcNavIndex==1){

            if(isFirstqcby){

                isFirstqcby=false;

                loadNavIndexContent();

            }else{

                if(itemIndex){

                    if(itemIndex!=qcbyIndex){

                        var tmpl3="zc_qcby_ContentTemplate";

                        var url3="api/Company/ServiceSupport?id=";

                        zcNavItemSelected(itemIndex,url3,tmpl3);

                    }else{

                        $(".zc_qcby_ContentTemplate").show();
                    }

                    window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex+"#!feedNavItemIndex="+qcbyIndex;

                }else{

                    if(qcbyIndex||qcbyIndex==0){

                        $(".zc_qcby_ContentTemplate").show();

                        window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex+"#!feedNavItemIndex="+qcbyIndex;

                    }else{

                        window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex;
                    }
                }
            }

        }else if(zcNavIndex==2){

            if(isFirstcjwt){

                isFirstcjwt=false;

                loadNavIndexContent();

            }else{

                if(itemIndex){

                    if(itemIndex!=cjwtIndex){

                        var tmpl3="zc_cjwt_ContentTemplate";

                        var url3="api/Company/ServiceSupport?id=";

                        zcNavItemSelected(itemIndex,url3,tmpl3);

                    }else{

                        $(".zc_cjwt_ContentTemplate").show();
                    }

                    window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex+"#!feedNavItemIndex="+cjwtIndex;

                }else{

                    if(cjwtIndex||cjwtIndex==0){

                        $(".zc_cjwt_ContentTemplate").show();

                        window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex+"#!feedNavItemIndex="+cjwtIndex;

                    }else{

                        window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex;
                    }
                }
            }
        }

        function loadNavIndexContent(){

            window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex;

            getDataByAPI(ajaxUrl,tmpl,addItemHref);

            function addItemHref(){

                //这个在ajaxList被添加到文档之后添加监听.500毫秒延迟确保已经被添加到文档流。
                setTimeout(function(){

                    $(".zc_info_desc_href").each(function(){

                        $(this).click(function(){

                            var tmpl3 = $(this).attr("ajaxTemplate");

                            var url=$(this).attr("ajaxUrl");

                            var zcItemId=$(this).attr("ajaxId");

                            zcNavItemSelected(zcItemId,url,tmpl3);
                        });
                    });

                    if(itemIndex||itemIndex==0){

                        var isRequested=false;

                        $(".zc_info_desc_href").each(function(){

                            var zcItemId=$(this).attr("ajaxId");

                            var tmpl2 = $(this).attr("parentTemplate");

                            if(zcItemId==itemIndex&&tmpl2==tmpl&&!isRequested){

                                var url=$(this).attr("ajaxUrl");

                                var tmpl3=$(this).attr("ajaxTemplate");

                                zcNavItemSelected(zcItemId,url,tmpl3);

                                isRequested=true;
                            }
                        });
                    }
                },100);
            }
        }
    }

    function zcNavItemSelected(itemId,url,tmpl){

        $(".zc_ContentTemplate ").hide();

        rhyzsItemView.resetTop();

        qcbyItemView.resetTop();

        cjwtItemView.resetTop();

        zcNavItemIndex=itemId;

        if(zcNavIndex==0){

            rhyzsIndex=itemId;

        }else if(zcNavIndex==1){

            qcbyIndex=itemId;

        }else if(zcNavIndex==2){

            cjwtIndex=itemId;
        }

        window.location.hash="#!feed=4#!feedNavIndex="+zcNavIndex+"#!feedNavItemIndex="+itemId;

        $("#fwzc").attr("feedNavItemIndex",zcNavItemIndex);

        $("." + tmpl).show();

        url+=itemId;

        getDataByAPI(url,tmpl);
    }

    var hdzqNavIndex=0;

    var hdIndex;

    var isFirstHDZQ=true;

    function initHDZQ(){

        $(".hdzq_content_close").each(function(){

            $(this).click(function(){

                var tmpl=$(this).attr("closeTempalte");

                $("."+tmpl).hide();

                window.location.hash="#!feed=5#!feedNavIndex=0";

                hdIndex=null;
            });
        });
    }

    function hdzqNavSelected(index,itemIndex){

        window.location.hash="#!feed=5#!feedNavIndex=0";

        if(isFirstHDZQ){

            isFirstHDZQ=false;

            var ajaxUrl="api/Company/Activity";

            var ajaxTemplate="hdzqListTemplate";

            getDataByAPI(ajaxUrl,ajaxTemplate,addEvent);

            function addEvent(){

                setTimeout(function(){

                    resetCPContentSize();

                    $(".hdzq_href").each(function(){

                            $(this).click(function(){

                                openHdzqItem(this);

                                if($(this).attr("ajaxId")==0){

                                    AD_SURVEY_TRACKING_Site_Event('39' , '154');

                                }else{

                                    AD_SURVEY_TRACKING_Site_Event('39' , '155');
                                }
                            });
                        }
                    );

                    if(itemIndex||itemIndex==0){

                        var isRequested=false;

                        $(".hdzq_href").each(function(){

                            if($(this).attr("ajaxId")==itemIndex&&!isRequested){

                                openHdzqItem(this);

                                isRequested=true;
                            }
                        });
                    }
                },100);
            }

        }else{

            if(itemIndex||itemIndex==0){

                var isRequested=false;

                $(".hdzq_href").each(function(){

                    if($(this).attr("ajaxId")==itemIndex&&!isRequested){

                        openHdzqItem(this);

                        isRequested=true;
                    }
                });
            }
        }

        function openHdzqItem(item){

            hdIndex=$(item).attr("ajaxId");

            var hrefType=$(item).attr("hrefType");

            var linkHref=$(item).attr("linkHref")

            if(hrefType=="img"){

                $(".hdzqewmTemplate").show();

                $("#hdzq_ewm").attr("src",linkHref);

                window.location.hash="#!feed=5#!feedNavIndex=0#!feedNavItemIndex="+hdIndex;

            }else{

                window.open(linkHref);
            }
        }
    }


    var cpNavIndex=0;

    var cpNavItemIndex=0;

    var cpNavItemInfoIndex;

    var cpNavType=23;

    var cpNavItemType=8;

    var cpNavItemInfoId;

    var isFirstCP=true;

    var isFirstCyc=true;

    var isFirstSyc=true;

    var isFirstMtc=true;

    var cycType=23;

    var cycIndex=0;

    var cycNavItemType=[8,9,10,11];

    var cycIndexId;

    var sycType=24;

    var sycIndex=0;

    var sycNavItemType=[8,12,13];

    var sycIndexId;

    var mtcType=25;

    var mtcIndex=0;

    var mtcNavItemType=[8];

    var mtcIndexId;

    function initCPFeed(){

        resetCPContentSize();

        $(".cp_tab").each(function () {

            $(this).hover(

                function () {

                    $(this).addClass("cp_tab_on");

                    $(this).animate({width: 40}, 200);
                },

                function () {

                    if ($(this).index() != cpNavIndex) {

                        $(this).removeClass("cp_tab_on");

                        $(this).animate({width: 25}, 200);

                    }
                }
            );

            $(this).click(function () {

                cpNavIndex = $(this).index();

                if(cpNavIndex==0){

                    cpNavItemIndex=cycIndex;

                    cpNavItemInfoIndex=cycIndexId;

                }else if(cpNavIndex==1){

                    cpNavItemIndex=sycIndex;

                    cpNavItemInfoIndex=sycIndexId;

                }else if(cpNavIndex==2){

                    cpNavItemIndex=mtcIndex;

                    cpNavItemInfoIndex=mtcIndexId;
                }

                cpNavSelected(cpNavIndex,cpNavItemIndex,cpNavItemInfoIndex);

            });
        });

        $(".cp_tab_2").each(function(){

            $(this).click(function(){

                var index=$(this).index();

                cpNavItemIndex=index;

                cpNavSelected(cpNavIndex,cpNavItemIndex);
            });
        });

        $(".cp_content_close").click(function(){

            var tmpl=$(this).attr("closeTempalte");

            $("."+tmpl).hide();

            gotoCPListItem(cp_list_item_index);

            window.location.hash="#!feed=2#!feedNavIndex="+cpNavIndex+"#!feedNavItemIndex="+cpNavItemIndex;

            $("#cpjs").attr("feedNavItemInfoIndex",null);

            if(cpNavIndex==0){

                cycIndexId=null;

            }else if(cpNavIndex==1){

                sycIndexId=null;

            }else if(cpNavIndex==2){

                mtcIndexId=null;
            }

            cpNavItemInfoIndex=null;
        });

        $(".cp_prev_btn").click(function(){

            var currentTime=new Date().getTime();

            if(currentTime>lastTime+500){

                lastTime=currentTime;

            }else{

                return;
            }

            if(cp_list_item_index>0){

                setCPListItemStatus(cp_list_item_index,false);

                cp_list_item_index-=1;

                setCPListItemStatus(cp_list_item_index,true);

                var productId=$("#"+cp_list_tmpl+"_list_item_"+cp_list_item_index).attr("ajaxId");

                var template=$(this).attr("ajaxTemplate");

                cpNavItemSelected(productId,"",template);
            }
        });

        $(".cp_next_btn").click(function(){

            var currentTime=new Date().getTime();

            if(currentTime>lastTime+500){

                lastTime=currentTime;

            }else{

                return;
            }

            if(cp_list_item_index<cp_list_item_lg-1){

                setCPListItemStatus(cp_list_item_index,false);

                cp_list_item_index+=1;

                setCPListItemStatus(cp_list_item_index,true);

                var productId=$("#"+cp_list_tmpl+"_list_item_"+cp_list_item_index).attr("ajaxId");

                var template=$(this).attr("ajaxTemplate");

                cpNavItemSelected(productId,"",template);
            }
        });
    }

    function cpNavSelected(index,level2Index,itemInfoIndex){

        cpNavIndex=index;

        cpNavItemIndex=level2Index;

        cpNavItemInfoIndex=itemInfoIndex;

        isFirstCP=false;

        var tmpl;

        $("#cpjs").attr("feedNavIndex",index);

        $("#cpjs").attr("feedNavItemIndex",level2Index);

        $(".cp_tab2").hide();

        $(".cpListTemplate").hide();

        $(".cpItemContentTemplate").hide();

        var cp_tab2_name;

        var cp_tab2_name_on;

        if(cpNavIndex==0){

            cp_tab2_name="cp_cyc_tab";

            cp_tab2_name_on="cp_cyc_tab_on";

        }else if(cpNavIndex==1){

            cp_tab2_name="cp_syc_tab";

            cp_tab2_name_on="cp_syc_tab_on";

        }else if(cpNavIndex==2){

            cp_tab2_name="cp_mtc_tab";

            cp_tab2_name_on="cp_mtc_tab_on";
        }

        $(".cp_tab_2").each(function(){

            if($(this).attr("ownClass")==cp_tab2_name&&$(this).index()==level2Index){

                $(this).addClass(cp_tab2_name_on);

                $(this).find("img").first().show();

                $(this).siblings().each(function(){

                    $(this).removeClass(cp_tab2_name_on);

                    $(this).find("img").first().hide();
                });
            }
        });

        $(".cp_tab").each(function () {

            if($(this).index() == index){

                $(this).addClass("cp_tab_on");

                $(this).animate({width: 40}, 200);

                var level2=$(this).attr("showLevel2");

                $("."+level2).show();

                tmpl=$(this).attr("ajaxTemplate");

            }else{

                $(this).removeClass("cp_tab_on");

                $(this).animate({width: 25}, 200);
            }
        });

        if(index==0){

            tmpl="cycListTemplate";

            $(".cycListTemplate").show();

            cpNavType=23;

            cpNavItemType=cycNavItemType[level2Index];

            cp_list_tmpl=tmpl;

            cp_list_item_index=cyc_list_item_index;

            cp_list_item_lg=cyc_list_item_lg;

            if(isFirstCyc){

                cycIndex=level2Index;

                isFirstCyc=false;

                loadNavIndexContent();

            }else{

                if(cycIndex!=level2Index){

                    cycIndex=level2Index;

                    loadNavIndexContent();

                }else if(cycIndex==level2Index){

                    if(itemInfoIndex){

                        if(cycIndexId!=itemInfoIndex){

                            cycIndexId=itemInfoIndex;

                            var tmpl3="cp_cyc_ItemContentTemplate";

                            cpNavItemSelected(itemInfoIndex,"",tmpl3);

                        }else{

                            $(".cp_cyc_ItemContentTemplate").show();
                        }

                        window.location.hash="#!feed=2#!feedNavIndex="+cpNavIndex+"#!feedNavItemIndex="+cycIndex+"#!feedNavItemInfoIndex"+cycIndexId;

                    }else{

                        window.location.hash="#!feed=2#!feedNavIndex="+cpNavIndex+"#!feedNavItemIndex="+cycIndex;
                    }
                }
            }

        }else if(index==1){

            tmpl="sycListTemplate";

            $(".sycListTemplate").show();

            cpNavType=24;

            cpNavItemType=sycNavItemType[level2Index];

            cp_list_tmpl=tmpl;

            cp_list_item_index=syc_list_item_index;

            cp_list_item_lg=syc_list_item_lg;

            if(isFirstSyc){

                sycIndex=level2Index;

                isFirstSyc=false;

                loadNavIndexContent();

            }else{

                if(sycIndex!=level2Index){

                    sycIndex=level2Index;

                    loadNavIndexContent();

                }else if(sycIndex==level2Index){

                    if(itemInfoIndex){

                        if(sycIndexId!=itemInfoIndex){

                            sycIndexId=itemInfoIndex;

                            var tmpl3="cp_syc_ItemContentTemplate";

                            cpNavItemSelected(itemInfoIndex,"",tmpl3);

                        }else{

                            $(".cp_syc_ItemContentTemplate").show();
                        }

                        window.location.hash="#!feed=2#!feedNavIndex="+cpNavIndex+"#!feedNavItemIndex="+sycIndex+"#!feedNavItemInfoIndex"+sycIndexId;

                    }else{

                        window.location.hash="#!feed=2#!feedNavIndex="+cpNavIndex+"#!feedNavItemIndex="+sycIndex;
                    }
                }
            }

        }else if(index==2){

            tmpl="mtcListTemplate";

            $(".mtcListTemplate").show();

            cpNavType=25;

            cpNavItemType=mtcNavItemType[level2Index];

            cp_list_tmpl=tmpl;

            cp_list_item_index=mtc_list_item_index;

            cp_list_item_lg=mtc_list_item_lg;

            if(isFirstMtc){

                mtcIndex=level2Index;

                isFirstMtc=false;

                loadNavIndexContent();

            }else{

                if(mtcIndex!=level2Index){

                    mtcIndex=level2Index;

                    loadNavIndexContent();

                }else if(mtcIndex==level2Index){

                    if(itemInfoIndex){

                        if(mtcIndexId!=itemInfoIndex){

                            mtcIndexId=itemInfoIndex;

                            var tmpl3="cp_mtc_ItemContentTemplate";

                            cpNavItemSelected(itemInfoIndex,"",tmpl3);

                        }else{

                            $(".cp_mtc_ItemContentTemplate").show();
                        }

                        window.location.hash="#!feed=2#!feedNavIndex="+cpNavIndex+"#!feedNavItemIndex="+mtcIndex+"#!feedNavItemInfoIndex"+mtcIndexId;

                    }else{

                        window.location.hash="#!feed=2#!feedNavIndex="+cpNavIndex+"#!feedNavItemIndex="+mtcIndex;
                    }
                }
            }
        }

        function loadNavIndexContent(){

            window.location.hash="#!feed=2#!feedNavIndex="+cpNavIndex+"#!feedNavItemIndex="+cpNavItemIndex;

            var ajaxUrl="api/Product/ProductList?motorTypeId="+cpNavType+"&productTypeId="+cpNavItemType;

            getDataByAPI(ajaxUrl,tmpl,addItemHref);

            function addItemHref(){

                $("."+tmpl).show();

                //这个在ajaxData被添加到文档之后添加监听.100毫秒延迟确保已经被添加到文档流。
                setTimeout(function(){

                    addCPItemListIcon(tmpl,itemInfoIndex);

                    $(".cp_info_desc_href").each(function(){

                        $(this).click(function(){

                            var tmpl = $(this).attr("ajaxTemplate");

                            var url=$(this).attr("ajaxUrl");

                            var cpItemId=$(this).attr("ajaxId");

                            cpNavItemSelected(cpItemId,url,tmpl);
                        });
                    });

                    if(itemInfoIndex||itemInfoIndex==0){

                        var isRequested=false;

                        $(".cp_info_desc_href").each(function(){

                            var cpItemId=$(this).attr("ajaxId");

                            var tmpl2 = $(this).attr("parentTemplate");

                            if(cpItemId==itemInfoIndex&&tmpl2==tmpl&&!isRequested){

                                var url=$(this).attr("ajaxUrl");

                                var tmpl3=$(this).attr("ajaxTemplate");

                                cpNavItemSelected(cpItemId,url,tmpl3);

                                isRequested=true;
                            }
                        });
                    }
                },100);
            }
        }
    }

    var cpClickIds=[];

    function cpNavItemSelected(itemIndex,url,tmpl){

        syc.resetTop();

        cyc.resetTop();

        mtc.resetTop();

        for(var i=0;i<cpClickIds.length;i++){

            if(itemIndex==cpClickIds[i].id){

                AD_SURVEY_TRACKING_Site_Event('39' , cpClickIds[i].clickId);
            }
        }

        var ajaxUrl="api/Product/Details?productId="+itemIndex;

        $("."+tmpl).show();

        $("#cpjs").attr("feedNavItemInfoIndex",itemIndex);

        cpNavItemInfoIndex=itemIndex;

        if(cpNavIndex==0){

            cycIndexId=itemIndex;

        }else if(cpNavIndex==1){

            sycIndexId=itemIndex;

        }else if(cpNavIndex==2){

            mtcIndexId=itemIndex;
        }

        window.location.hash="#!feed=2#!feedNavIndex="+cpNavIndex+"#!feedNavItemIndex="+cpNavItemIndex+"#!feedNavItemInfoIndex="+itemIndex;

        getDataByAPI(ajaxUrl,tmpl);

    }

    //此类型下面的产品种类数量
    function addCPItemListIcon(tmpl,itemInfoIndex){

        $("."+tmpl+"_list_item").each(function(){

            if(itemInfoIndex){

                if($(this).attr("ajaxId")==itemInfoIndex){

                    cp_list_item_index=$(this).index();

                    $(this).show();
                }
            }else{

                if($(this).index()==0){

                    cp_list_item_index=0;

                    $(this).show();
                }
            }
        });

        isAnimateItem=false;

        if(timerId){

            clearTimeout(timerId);
        }

        cp_list_tmpl=tmpl;

        var lg=$("."+tmpl+"_list_item").length;

        cp_list_item_lg=lg;

        if(cpNavIndex==0){

            cyc_list_item_index=cp_list_item_index;

            cyc_list_item_lg=cp_list_item_lg;

        }else if(cpNavIndex==1){

            syc_list_item_index=cp_list_item_index;

            syc_list_item_lg=cp_list_item_lg;

        }else if(cpNavIndex==2){

            mtc_list_item_index=cp_list_item_index;

            mtc_list_item_lg=cp_list_item_lg;
        }

        var iconList=$("."+tmpl+"_list_icon")[0];

        $(iconList).empty();

        for(var i=0;i<lg;i++){

            var newDiv;

            if(i==cp_list_item_index){

                newDiv=$('<div class="item_s '+tmpl+'_item_icon">');

            }else{

                newDiv=$('<div class="item_u '+tmpl+'_item_icon">');
            }

            $(iconList).append(newDiv);
        }

        $(iconList).width(lg*30);

        setTimeout(function(){

            $("."+tmpl+"_item_icon").each(function(){

                $(this).click(function(){

                    if(isAnimateItem)return;

                    $($("."+tmpl+"_item_icon")[cp_list_item_index]).removeClass("item_s");

                    $($("."+tmpl+"_item_icon")[cp_list_item_index]).addClass("item_u");

                    $(this).removeClass("item_u");

                    $(this).addClass("item_s");

                    var clickIndex=$(this).index();

                    gotoCPListItem(clickIndex);
                })
            });
        },100);

        //这个地方是打开产品列表的自动轮播
        //timerId=setTimeout(loopCPKV,4000);
    }

    var timerId;

    var lastTime=0;

    function setCPListItemStatus(index,isShow){

        var w=$(".cp_list").width();

        if(isShow){

            $("#"+cp_list_tmpl+"_list_item_"+index).css("left",0);

            $("#"+cp_list_tmpl+"_list_item_"+index).show();

            $($("."+cp_list_tmpl+"_item_icon")[index]).removeClass("item_u");

            $($("."+cp_list_tmpl+"_item_icon")[index]).addClass("item_s");

        }else{

            $("#"+cp_list_tmpl+"_list_item_"+index).css("left",-w);

            $("#"+cp_list_tmpl+"_list_item_"+index).hide();

            $($("."+cp_list_tmpl+"_item_icon")[index]).removeClass("item_s");

            $($("."+cp_list_tmpl+"_item_icon")[index]).addClass("item_u");
        }
    }


    function loopCPKV(){

        timerId=setTimeout(loopCPKV,4000);

        if($(".cp_cyc_ItemContentTemplate").is(":visible")||$(".cp_syc_ItemContentTemplate").is(":visible")||$(".cp_mtc_ItemContentTemplate").is(":visible")){

            return;
        }

        var index=cp_list_item_index;

        $($("."+cp_list_tmpl+"_item_icon")[index]).removeClass("item_s");

        $($("."+cp_list_tmpl+"_item_icon")[index]).addClass("item_u");

        index++;

        if(index>cp_list_item_lg-1){

            index=0;
        }

        $($("."+cp_list_tmpl+"_item_icon")[index]).removeClass("item_u");

        $($("."+cp_list_tmpl+"_item_icon")[index]).addClass("item_s");

        gotoCPListItem(index);

    }


    var cyc_list_item_index=0;

    var syc_list_item_index=0;

    var mtc_list_item_index=0

    var cyc_list_item_lg=0;

    var syc_list_item_lg=0;

    var mtc_list_item_lg=0;

    var cp_list_item_index=0;

    var cp_list_item_lg=0;

    var cp_list_tmpl;

    var isAnimateItem=false;

    function gotoCPListItem(index){

        if(isAnimateItem)return;

        var w=feedWidth;

        isAnimateItem=true;

        if(cp_list_item_index<index){

            $("#"+cp_list_tmpl+"_list_item_"+index).css("left",w);

            $("#"+cp_list_tmpl+"_list_item_"+index).show();

            $("#"+cp_list_tmpl+"_list_item_"+index).animate({"left":0},1000);

            $("#"+cp_list_tmpl+"_list_item_"+cp_list_item_index).animate({"left":-w},1000,function(){

                listItemAinmated();
            });

        }else if(cp_list_item_index>index){

            $("#"+cp_list_tmpl+"_list_item_"+index).css("left",-w);

            $("#"+cp_list_tmpl+"_list_item_"+index).show();

            $("#"+cp_list_tmpl+"_list_item_"+index).animate({"left":0},1000);

            $("#"+cp_list_tmpl+"_list_item_"+cp_list_item_index).animate({"left":w},1000,function(){

               listItemAinmated();
            });
        }else{

            $("#"+cp_list_tmpl+"_list_item_"+index).show();

            isAnimateItem=false;
        }

        function listItemAinmated(){

            $("#"+cp_list_tmpl+"_list_item_"+cp_list_item_index).hide();

            cp_list_item_index=index;

            isAnimateItem=false;

            if(cpNavIndex==0){

                cyc_list_item_index=cp_list_item_index;

            }else if(cpNavIndex==1){

                syc_list_item_index=cp_list_item_index;

            }else if(cpNavIndex==2){

                mtc_list_item_index=cp_list_item_index;
            }
        }
    }

    var wrapperHeight;

    var wrappWidth;

    var feedWidth;

    var feedHeight;

    //当页面大小变化，或者有些容器内数据被填充后，重新计算页面和各个容器的尺寸，如果容器有滚动条，并重新计算滚动条的位置
    function resetCPContentSize(){

        wrapperHeight=$("#wrapperContent").height();

        feedHeight=wrapperHeight*0.8;

        wrappWidth=$("#wrapperContent").width();

        feedWidth=wrappWidth*0.75;

        scaleH=wrapperHeight/730;

        if(scaleH>0.85)scaleH=0.85;

        $(".cpItemContentTemplate").height(feedHeight+40);

        $(".cp_content_bg_img").height(feedHeight);

        $(".cp_content_img").height(feedHeight);

        $(".cp_content_info").height(feedHeight);

        $(".cp_content_info").css("top",40);

        var min=feedHeight/4<125?125:feedHeight/4;

        var top=feedHeight/2+min;

        var topH=$(".cp_item_img").height();

        if(top<topH)top=topH;

        $(".cp_list_icon").css("top",top);

        $(".hdzq_content").width(feedWidth*0.9-450);

        $(".info_desc").width(feedWidth*0.9-280);

        $(".jxs_info_desc").width(feedWidth*0.9-130);


        $(".hdzq_content").width(feedWidth*0.9-450);

        var scrollView1H=feedHeight-124;

        $(".scrollView1").height(scrollView1H);

        $(".scrollView2").height(wrapperHeight);

        var xcpView=feedHeight-84;

        $("#xcpView").height(xcpView);

        var scrollView3H=feedHeight-144;

        $(".scrollView3").height(scrollView3H);

        $(".index_img").each(function(){

            var newH=parseInt($(this).attr("dataH"))*scaleH;

            var newW=parseInt($(this).attr("dataW"))*scaleH;

            $(this).width(newW);

            $(this).height(newH);
        });

        var h=$(".big_video").height()/2-10;

        $(".video_item").height(h);

        resizeScrollBar();

        var h2=(feedHeight-8)/5;

        $(".gysk_tab").height(h2);
    }


    function initSearch(){

        $('#search_input').bind('keypress',function(event){

            if(event.keyCode == "13"){

                searchData();

                AD_SURVEY_TRACKING_Site_Event('39' , '62');
            }
        });

        $("#search_btn").click(function(){

            searchData();
        });

        function regKey(str, key){

            var regObj =new RegExp(""+key,"gim");

            str = str.replace(regObj, function(keys){

                return '<span style="color:red">'+ keys +'</span>';
            });

            return str;
        }

        function searchData(){

            var value=$("#search_input").val();

            var value2=encodeURI(value);

            var ajaxUrl="api/Search/SearchAll?key="+value2;

            var template="ssContentTemplate_Content";

            $.ajax({

                type: "GET",

                url: ajaxUrl,

                data: {},

                dataType: "json",

                success: function(data){

                    var htmlTxt="";

                    for(var key in data){

                        if(key=="ProductList"){

                            var href="";

                            var feedIndex=2;

                            var feedNavIndex;

                            var feedNavItemIndex;

                            var feedNavItemInfoIndex;

                            var baseUrl=window.location.href;

                            var index=baseUrl.indexOf("#");

                            if(index!=-1){

                                baseUrl=baseUrl.substring(0,index);
                            }

                            for(var i=0;i<data[key].length;i++){

                                if(data[key][i].MotorTypeId==23){

                                    feedNavIndex=0;

                                }else if(data[key][i].MotorTypeId==24){

                                    feedNavIndex=1;

                                }else if(data[key][i].MotorTypeId==25){

                                    feedNavIndex=2;
                                }

                                if(data[key][i].ProductTypeId==8){

                                    feedNavItemIndex=0;

                                }else if(data[key][i].ProductTypeId==9){

                                    feedNavItemIndex=1;

                                }else if(data[key][i].ProductTypeId==10){

                                    feedNavItemIndex=2;

                                }else if(data[key][i].ProductTypeId==11){

                                    feedNavItemIndex=3;

                                }else if(data[key][i].ProductTypeId==12){

                                    feedNavItemIndex=1;

                                }else if(data[key][i].ProductTypeId==13){

                                    feedNavItemIndex=2;
                                }

                                feedNavItemInfoIndex=data[key][i].ProductId;

                                var url=baseUrl+"#!feed="+feedIndex+"#!feedNavIndex="+feedNavIndex+"#!feedNavItemIndex="+feedNavItemIndex+"#!feedNavItemInfoIndex="+feedNavItemInfoIndex;

                                var newString=regKey(data[key][i].ProductName,value);

                                htmlTxt+='\<div class="ss_item"><div><a href="'+url+'" feedIndex="'+feedIndex+'" feedNavIndex="'+feedNavIndex+'" feedNavItemIndex="'+feedNavItemIndex+'" feedNavItemInfoIndex="'+feedNavItemInfoIndex+'" class="ss_item_name">'+newString+'</a>'+
                                    '\</div><div><span class="ss_item_content">'+data[key][i].Sammary+'</span></div><div><a feedIndex="'+feedIndex+'" feedNavIndex="'+feedNavIndex+'" feedNavItemIndex="'+feedNavItemIndex+'" feedNavItemInfoIndex="'+feedNavItemInfoIndex+'" class="ss_item_url">'+url+'</a></div></div>';

                            }

                        }else if(key=="DynamicList"){

                            for(var i=0;i<data[key].length;i++){

                                feedIndex=3;

                                feedNavIndex=0;

                                feedNavItemIndex=data[key][i].DynamicId;

                                var url=baseUrl+"#!feed="+feedIndex+"#!feedNavIndex="+feedNavIndex+"#!feedNavItemIndex="+feedNavItemIndex;

                                var newString=regKey(data[key][i].Title,value);

                                htmlTxt+='\<div class="ss_item"><div><a href="'+url+'" feedIndex="'+feedIndex+'" feedNavIndex="'+feedNavIndex+'" feedNavItemIndex="'+feedNavItemIndex+'" class="ss_item_name">'+newString+'</a>'+
                                    '\</div><div><span class="ss_item_content">'+data[key][i].Summary+'</span></div><div><a feedIndex="'+feedIndex+'" feedNavIndex="'+feedNavIndex+'" feedNavItemIndex="'+feedNavItemIndex+'" class="ss_item_url">'+url+'</a></div></div>';

                            }

                        }else if(key=="ServiceSupportList"){

                            for(var i=0;i<data[key].length;i++){

                                feedIndex=4;

                                if(data[key][i].ServiceSupportTypeId==1){

                                    feedNavIndex=0;

                                }else if(data[key][i].ServiceSupportTypeId==2){

                                    feedNavIndex=1;

                                }else if(data[key][i].ServiceSupportTypeId==3){

                                    feedNavIndex=2;
                                }

                                feedNavItemIndex=data[key][i].Id;

                                var url=baseUrl+"#!feed="+feedIndex+"#!feedNavIndex="+feedNavIndex+"#!feedNavItemIndex="+feedNavItemIndex;

                                var newString=regKey(data[key][i].Title,value);

                                htmlTxt+='\<div class="ss_item"><div><a href="'+url+'" feedIndex="'+feedIndex+'" feedNavIndex="'+feedNavIndex+'" feedNavItemIndex="'+feedNavItemIndex+'" class="ss_item_name">'+newString+'</a>'+
                                    '\</div><div><span class="ss_item_content">'+data[key][i].Summary+'</span></div><div><a feedIndex="'+feedIndex+'" feedNavIndex="'+feedNavIndex+'" feedNavItemIndex="'+feedNavItemIndex+'" class="ss_item_url">'+url+'</a></div></div>';

                            }

                        }else if(key=="ActivityList"){

                            for(var i=0;i<data[key].length;i++){

                                feedIndex=5;

                                feedNavIndex=0;

                                var url=baseUrl+"#!feed="+feedIndex+"#!feedNavIndex="+feedNavIndex;

                                var newString=regKey(data[key][i].Title,value);

                                htmlTxt+='\<div class="ss_item"><div><a feedIndex="'+feedIndex+'" feedNavIndex="'+feedNavIndex+'" class="ss_item_name">'+newString+'</a>'+
                                    '\</div><div><span class="ss_item_content">'+data[key][i].Intro+'</span></div><div><a feedIndex="'+feedIndex+'" feedNavIndex="'+feedNavIndex+'" class="ss_item_url">'+url+'</a></div></div>';

                            }
                        }
                    }

                    $("#ssContentTemplate_Content").html(htmlTxt);

                    specialFeedHide();

                    specialFeedShow(9);

                    setTimeout(function(){

                        $(".ss_item_name").each(function(){

                            $(this).click(function(){

                                var feedIndex=$(this).attr("feedIndex");

                                var feedNavIndex=$(this).attr("feedNavIndex");

                                var feedNavItemIndex=$(this).attr("feedNavItemIndex");

                                var feedNavItemInfoIndex=$(this).attr("feedNavItemInfoIndex");

                                loadFeedContent(feedIndex,feedNavIndex,feedNavItemIndex,feedNavItemInfoIndex);
                            })
                        });

                        $(".ss_item_url").each(function(){

                            $(this).click(function(){

                                var feedIndex=$(this).attr("feedIndex");

                                var feedNavIndex=$(this).attr("feedNavIndex");

                                var feedNavItemIndex=$(this).attr("feedNavItemIndex");

                                var feedNavItemInfoIndex=$(this).attr("feedNavItemInfoIndex");

                                loadFeedContent(feedIndex,feedNavIndex,feedNavItemIndex,feedNavItemInfoIndex);
                            })
                        });

                        resizeScrollBar();

                    },100);
                }
            });
        }
    }

    var jsxNavIndex=0;

    var isFirstJsx=true;

    var isFirstSC=true;

    var isFirstPX=true;

    var isFirstPP=true;

    var accessToken;

    function initSeller(){

        $(".logout").click(function(){

            logOut();
        });

        accessToken=getAccessToken();

        if(accessToken){

            var ajaxUrl="api/Dealer/Datum?typeId=1&accessToken="+accessToken;

            $.ajax({

                type: "GET",

                url: ajaxUrl,

                data: {},

                dataType: "json",

                success: function (data) {

                    if (!data.Status) {

                        accessToken = null;

                        setAccessToken("");

                        $(".logout").hide();

                    }else{

                        $(".logout").show();
                    }
                }
            });
        }

        $(".search_seller").click(

            function(){

                specialFeedShow(10);
            }
        );

        $("#loginName").focus(function(){

            var name=$("#loginName").val();

            if(name=="用户名"){

                $("#loginName").val("");
            }
        });

        $("#loginName").blur(function(){

            var name=$("#loginName").val();

            if(name==""){

                $("#loginName").val("用户名");
            }
        });

        $("#loginPassWord").focus(function(){

            var name=$("#loginPassWord").val();

            if(name=="密码"){

                $("#loginPassWord").val("");

                document.getElementById("loginPassWord").type="password";
            }
        });

        $("#loginPassWord").blur(function(){

            var name=$("#loginPassWord").val();

            if(name==""){

                $("#loginPassWord").val("密码");

                document.getElementById("loginPassWord").type="text";
            }
        });

        $('#loginPassWord').bind('keypress',function(event){

            if(event.keyCode == "13"){

                loginServer();
            }
        });

        $(".loginSubmit").click(function(){

            loginServer();
        });

        function logOut(){

            var ajaxUrl="api/Dealer/Logout?accessToken="+accessToken;

            $.ajax({

                type: "GET",

                url: ajaxUrl,

                data: {},

                dataType: "json",

                success: function(data){

                    document.cookie="accessToken=";

                    document.cookie="";

                    $(".logout").hide();

                    specialFeedShow(10);

                    $("#loginName").val("用户名");

                    $("#loginPassWord").val("密码");

                    document.getElementById("loginPassWord").type="text";
                }
            });
        }

        function loginServer(){

            var name=$("#loginName").val();

            var password=$("#loginPassWord").val();

            var ajaxUrl="api/Dealer/Login?account="+name+"&password="+password;

            $.ajax({

                type: "GET",

                url: ajaxUrl,

                data: {},

                dataType: "json",

                success: function(data){

                    if(data.Status){

                        accessToken=data.Data.AccessToken;

                        setAccessToken(accessToken);

                        specialFeedShow(11);

                    }else{

                        alert("用户名或密码错误");
                    }
                }
            });
        }

        $(".jxs_tab").each(function () {

            $(this).hover(

                function () {

                    $(this).addClass("jxs_tab_hover");

                    $(this).animate({width: 40}, 200);
                },

                function () {

                    if ($(this).index() != jsxNavIndex) {

                        $(this).removeClass("jxs_tab_hover");

                        $(this).animate({width: 25}, 200);
                    }
                }
            );

            $(this).click(function () {

                jsxNavIndex = $(this).index();

                jsxNavSelected(jsxNavIndex);
            });
        });

        $(".jxs_content_close").each(function(){

            $(this).click(function(){

                var tmpl=$(this).attr("closeTempalte");

                $("."+tmpl).hide();
            });
        });
    }

    function openJXS(index){

        accessToken=getAccessToken();

        if(accessToken){

            $("#feed11").show();

            jsxNavSelected(0);

        }else{

            $("#feed10").show();
        }
    }

    //name:sunzg,password:abc123
    function jsxNavSelected(index,itemIndex){

        sczcView.resetTop();

        pxzlView.resetTop();

        sczcItemView.resetTop();

        jsxNavIndex=index;

        isFirstJsx=false;

        $(".jxs_tab").each(function () {

            if($(this).index()==jsxNavIndex){

                $(this).find("img").first().show();

                $(this).addClass("jxs_tab_on");

                $(this).animate({width: 40}, 200);

                ajaxTemplate=$(this).attr("ajaxTemplate");

                ajaxUrl=$(this).attr("ajaxUrl");

            }else{

                $(this).removeClass("jxs_tab_hover");

                $(this).removeClass("jxs_tab_on");

                $(this).animate({width: 25}, 200);

                $(this).find("img").first().hide();
            }
        });

        $(".jxsListTemplate").hide();

        $(".jxs_ContentTemplate ").hide();

        var tmpl = ajaxTemplate;

        $("." + tmpl).show();

        ajaxUrl+="&accessToken="+accessToken;

        if(index==0){

//            if(isFirstSC){

//                isFirstSC=false;

                getDataByJXS(ajaxUrl,tmpl,addItemHref);
//            }

        }else if(index==1){

//            if(isFirstPX){

//                isFirstPX=false;

                getDataByJXS(ajaxUrl,tmpl);
//            }

        }else if(index==2){

//            if(isFirstPP){

//                isFirstPP=false;

                getDataByJXS(ajaxUrl,tmpl)
//            }
        }

        function addItemHref(){

            setTimeout(function(){

                resetCPContentSize();

                $(".jxs_info_desc_href").each(function(){

                    $(this).click(function(){

                        var tmpl3 = $(this).attr("ajaxTemplate");

                        var url=$(this).attr("ajaxUrl");

                        var jxsItemId=$(this).attr("ajaxId");

                        jxsNavItemSelected(jxsItemId,url,tmpl3);
                    });
                });

                if(itemIndex||itemIndex==0){

                    var isRequested=false;

                    $(".jxs_info_desc_href").each(function(){

                        var jxsItemId=$(this).attr("ajaxId");

                        var tmpl2 = $(this).attr("parentTemplate");

                        if(jxsItemId==itemIndex&&tmpl2==tmpl&&!isRequested){

                            var url=$(this).attr("ajaxUrl");

                            var tmpl3=$(this).attr("ajaxTemplate");

                            jxsNavItemSelected(jxsItemId,url,tmpl3);

                            isRequested=true;
                        }
                    });
                }
            },100);
        }
    }

    function jxsNavItemSelected(id,url,tmpl){

        sczcItemView.resetTop();

        url+=id+"&accessToken="+accessToken;

        getDataByJXS(url,tmpl);
    }

    function getDataByJXS(ajaxUrl,template,callback){

        $.ajax({

            type: "GET",

            url: ajaxUrl,

            data: {},

            dataType: "json",

            success: function(data){

                if(!data.Status){

                    accessToken=null;

                    setAccessToken("");

                    specialFeedShow(10);

                    return;
                }

                if(template=="sczc_ListTemplate"){

                    var htmlTxt="";

                    for(var i=0;i<data.Data.length;i++){

                        var PublishTime=data.Data[i].PublishTime;

                        var timeArr=PublishTime.split("-");

                        var year=timeArr.shift();

                        var month=timeArr.shift();

                        var day=timeArr.shift();

                        var dayIndex=day.indexOf("T");

                        day=day.substring(0,dayIndex);

                        var dayArr=day.split("");

                        var dayString='\<div class="date_img1">';

                        for(var j=0;j<dayArr.length;j++){

                            dayString+='<img src="image/date_'+dayArr[j]+'.png">';
                        }

                        dayString+='</div>';

                        htmlTxt+='\<div class="list_item"><div class="list_info"><div class="list_time"><div class="time_date">'+dayString+'</div><div class="time_year_month">'+year+'/'+month+'</div></div><div class="info_desc jxs_info_desc">'+
                        '\<div class="info_desc_title jxs_info_desc_href" ajaxUrl="api/Dealer/MarketingPolicyDetail?id=" ajaxId="'+data.Data[i].Id+'" ajaxTemplate="sczc_ContentTemplate" parentTemplate="sczc_ListTemplate">'+data.Data[i].Title+'</div><div class="info_desc_span"><span>'+data.Data[i].Summary+'</span></div>'+
                        '\<a class="info_desc_href jxs_info_desc_href" ajaxUrl="api/Dealer/MarketingPolicyDetail?id=" ajaxId="'+data.Data[i].Id+'" ajaxTemplate="sczc_ContentTemplate" parentTemplate="sczc_ListTemplate">了解详情&gt;&gt;</a></div></div></div>';
                    }

                    $("#sczcView_shower").html(htmlTxt);

                }else if(template=="pxzl_ListTemplate"){

                    var htmlTxt="";

                    var bgColor="#ef8922";

                    var eleType="a";

                    var cursorType="pointer";

                    if(!data.CanDownload){

                        bgColor="#555555";

                        eleType="div";

                        cursorType="auto";
                    }

                    for(var i=0;i<data.Data.length;i++){

                        var PublishTime=data.Data[i].PublishTime;

                        var timeArr=PublishTime.split("-");

                        var year=timeArr.shift();

                        var month=timeArr.shift();

                        var day=timeArr.shift();

                        var dayIndex=day.indexOf("T");

                        day=day.substring(0,dayIndex);

                        var dayArr=day.split("");

                        var dayString='\<div class="date_img1">';

                        for(var j=0;j<dayArr.length;j++){

                            dayString+='<img src="image/date_'+dayArr[j]+'.png">';
                        }

                        dayString+='</div>';

                        var openUrl=data.Data[i].FileUrls;

                        var urls=openUrl.split(",");

                        var newUrl=urls.shift();

                        var baseUrl=window.location.href;

                        var index=baseUrl.indexOf("index.html");

                        if(index!=-1){

                            baseUrl=baseUrl.substring(0,index);
                        }

                        var ajaxUrl=baseUrl+"api/Dealer/DownFile?filePath="+openUrl+"&accessToken="+accessToken;

                        var ajaxUrl2=baseUrl+openUrl;

                        htmlTxt+='\<div class="list_item"><div class="list_info"><div class="list_time"><div class="time_date">'+dayString+'</div><div class="time_year_month">'+year+'/'+month+'</div></div><div class="info_desc">'+
                            '\<div class="info_desc_title">'+data.Data[i].Title+'</div><div class="info_desc_span"><span>'+data.Data[i].Summary+'</span></div>'+
                            '\</div><div class="list_control"><a href="'+ajaxUrl2+'" target="_blank"><span openUrl="'+newUrl+'" class="zxReader">在线阅读</span></a><'+eleType+' href="'+ajaxUrl+'" target="_blank"><span style="background-color:'+bgColor+';cursor:'+cursorType+';" openUrl="'+newUrl+'" class="pxzl_load">下载</span></'+eleType+'></div></div></div>';
                    }

                    $("#pxzlView_shower").html(htmlTxt);

                }else if(template=="ppzl_ListTemplate"){

                    var htmlTxt="";

                    for(var i=0;i<data.Data.length;i++) {

                        var openUrl=data.Data[i].FileUrls;

                        var urls=openUrl.split(",");

                        var newUrl=urls.shift();

                        var baseUrl=window.location.href;

                        var index=baseUrl.indexOf("index.html");

                        if(index!=-1){

                            baseUrl=baseUrl.substring(0,index);
                        }

                        var ajaxUrl=baseUrl+"api/Dealer/DownFile?filePath="+openUrl+"&accessToken="+accessToken;

                        htmlTxt+='\<div class="pp_list_item"><div class="pp_img"><img src="'+data.Data[i].ImageUrl+'"><div class="pp_loadName">'+data.Data[i].Title+'</div></div><a href="'+ajaxUrl+'" target="_blank"><div  openUrl="'+newUrl+'" class="pp_loadBtn"><img src="image/btn_download.jpg"></div></a></div>';
                    }

                    $(".ppzl_content").html(htmlTxt);

                    }else{

                    for( var key in data.Data){

                        if($("#"+template+"_"+key)){

                            if(key.indexOf("Url")!=-1){

                                $("#"+template+"_"+key).attr("src",data.Data[key]);

                            }else{

                                $("#"+template+"_"+key).html(data.Data[key]);
                            }
                        }
                    }
                }

                $("."+template).show();

                if(callback)callback();

                setTimeout(function(){

                    resizeScrollBar();

                },100);
            }
        });
    }

    function setAccessToken(accessToken){

        document.cookie="accessToken="+accessToken;

        if(accessToken){

            $(".logout").show();

        }else{

            $(".logout").hide();
        }
    }

    function getAccessToken(){

        var cookies=document.cookie.split(";");

        for(var i=0;i<cookies.length;i++){

            var cookie=cookies[i].split("=");

            if(cookie[0]=="accessToken"||cookie[0]==" accessToken"){

                return cookie[1];
            }
        }

        return null;
    }
});
