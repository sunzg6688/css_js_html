var GlobalHome={
	 isBool:{
	 	isMobile:true
	 },
	 isWidth:function(){
	 	var that=this;
	 	var w=$(window).width()<=1024?false:true;
	 	//console.log("W",w)
	 	//根据宽度来判断是不是到了MB还是PC
	 	GlobalHome.isBool.isMobile=w;
	 },
	 init:function(){
	 	var that=this;
	 	$(window).resize(function(){
			SamsungWeb.HDetectResolution.getInstance().CssChange();
			that.imgscales=that.imgscale.getScale();
			that.getScale();
			that.OnResize();
			that.isWidth();
		});
		that.isWidth();
		
		that.imgscale=new SamsungWeb.HResizeScale(1920,1080);
		that.imgscales=that.imgscale.getScale();
		
		that.getScale();
	 	SamsungWeb.HDetectResolution.getInstance().init("#SSpackage",[1600,1366,1280,1024,768,480,320]);
	 	
	    that.h=new $S.HBigrender({threshold:-100,startdelay:true});
        that.h.init();
        that.h.getCurrentIndex=function(){
        	 that.getScale();
        }
        
        //console.log(that)
        
        
        $(window).on("scroll",function(){
        	 that.OnResize(); 
        })
        
        that.addEventnav();
        
        //mobie事件
        that.MenuMb();
        
	 },
	 addEventnav:function(){
	 	var that=this;
	 	$("#SSnavpoint ul li").on("click",function(){
	 		if(GlobalHome.isBool.isMobile){
	 		 var ind=$(this).index();
	 		 var currentwin=getScrollXY().y;
	 		 var currenttime=Math.abs(that.listPushPoint[ind]-104-currentwin)>1000?1000:Math.abs(that.listPushPoint[ind]-104-currentwin)/2;
	 		 $('html,body').animate({scrollTop:(that.listPushPoint[ind]-104)+'px'},currenttime);
	 	     }
	    })
	 	
	 	
	 	$(".SShead_menu ul li").on("mouseenter",function(){
	 		 if(GlobalHome.isBool.isMobile){
	 		 var indexper=$(this).children("div").filter(".menunav");
	 		 indexper.css("display","block").addClass("fadeIn animated03");
	 	     }
	    }).on("mouseleave",function(){
	 		 if(GlobalHome.isBool.isMobile){
	 		 var indexper=$(this).children("div").filter(".menunav");
	 		 indexper.css("display","none");
	 		 }
	 	})
	 },
	 getScale:function(){
	 	var that=this;
	 	$(".abcontent").each(function(){
	 		var t=$(this).attr("data-top")*that.imgscales,
	 		l=$(this).attr("data-left")*that.imgscales;
	 		
	 		$(this).css({
	 			"top":t+'px',
	 			"left":l+'px'
	 		})
	 	})
	 	
	 	$(".view_img").each(function(){
	 		var w=$(this).attr("data-w")*that.imgscales,
	 		h=$(this).attr("data-h")*that.imgscales;
	 		
	 		$(this).css({
	 			"width":w+'px',
	 			"height":h+'px'
	 		})
	 	})
	 	
	 	
	 	that.OnResize();
	 },
	 OnResize:function(){
	 	var that=this;
	 	//console.log(that)
	 	that.listPushPoint=[];
	 	$(".SShomeKv").each(function(){
	 		that.listPushPoint.push($(this).offset().top);
	 	})
	 	
	 	that.initPoint();
	 	//console.log(that.listPushPoint);
	 },
	 initPoint:function(){
	 	var that=this;
	 	var win=getScrollXY().y+104;
	 	for(var i=0,len=that.listPushPoint.length;i<len;i++){
			if(win<=that.listPushPoint[i]&&win>=0){
				//console.log(i)
				//console.log("gg",i);
				$("#SSnavpoint ul li").removeClass("on");
				$("#SSnavpoint ul li").eq(i).addClass("on");
				break;
			} 	 
			if(win>=that.listPushPoint[i]&&win<that.listPushPoint[i+1]){
				//console.log("ee",i);
			    $("#SSnavpoint ul li").removeClass("on");
				$("#SSnavpoint ul li").eq(i+1).addClass("on");
			    break;
			}
		}
	 },
	 MenuMb:function(){
	 	var that=this;
		that.clickbool=false;
		$(".navul").click(function(){
			if(!that.clickbool){
				that.clickbool=true;
				$(".first1li").addClass("rotations45");
				$(".first2li").addClass("opaction0");
				$(".first3li").addClass("rotations45f");
				var w=$(".SShead_ul").outerWidth(true);
				$(".SShead_ul").css("right",-w+'px')
				$(".SShead_ul").addClass("show").animate({
					"right":'0px'
				},300)
			}else{
				that.clickbool=false;
				$(".first1li").removeClass("rotations45");
				$(".first2li").removeClass("opaction0");
				$(".first3li").removeClass("rotations45f");
				var w=$(".SShead_ul").outerWidth(true);
				$(".SShead_ul").animate({
					"right":-w+'px'
				},500)
				  
				 //清空菜单项
				 currentcmenu.removeClass("on");
	    	  	 menunav.animate({
					 "height":0+'px'
				 },300,function(){
				 	 $(this).css({"display":"none","height":'auto'});
				 })
	    	  	 currentIndex=null;
	    	     currentcmenu=null;
	    	     menunav=null;
	    	  	 
			}
		})
	    
	    var currentcmenu=null,menunav=null;
	    var currentIndex=null;
	    $(".SShead_menu ul li").on("click",function(){
	    	  var cmenu=$(this).children("div").filter(".menutitle");
	    	  var nav=$(this).children("div").filter(".menunav");
	    	  var ind=$(this).index();
	    	  if(currentcmenu!=null){
	    	  	 
	    	  	 currentcmenu.removeClass("on");
	    	  	 menunav.animate({
					 "height":0+'px'
				 },300,function(){
				 	 $(this).css({"display":"none","height":'auto'});
				 })
	    	    }
	    	  
	    	    if(currentIndex==ind){
	    	    	currentIndex=null;
	    	    	currentcmenu=null;
	    	    	menunav=null;
	    	    	return;
	    	    }
	    	   
	    	    currentcmenu=cmenu;
	    	    currentIndex=ind;
	    	    menunav=nav;
		    	if(!currentcmenu.hasClass("on")){
		    	    currentcmenu.addClass("on");
		    	  	h1=menunav.outerHeight(true);
					menunav.css({"display":"block","height":'0px'}).animate({
							"height":h1+'px'
					},300)
		    	 }
	    	   
	    	  
	    
	    	  
	    	  
	    	
	    })
	 
	 }
}



$(document).ready(function(){
	GlobalHome.init();
})


$.fn.extend({
  animateCss:function(fn){
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).one(animationEnd, function(){
       fn.call(this);
    });
}
});

function getScrollXY(){
var x,y;
if(document.body.scrollTop){ //非标准写法,chrome能识别
x=document.body.scrollLeft;
y=document.body.scrollTop;
}
else{ //标准写法
x=document.documentElement.scrollLeft;
y=document.documentElement.scrollTop;
}
return {x:x,y:y};
}