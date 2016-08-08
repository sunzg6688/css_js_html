
function KV(kv,selectIndex){

    this.kvId=kv+"_kv";

    this.kvContainer=kv+"_kv_container";

    this.iconList=kv+"_kv_icons";

    this.iconItem=kv+"_kv_icon";

    if(selectIndex){

        this.currentIndex=selectIndex;

    }else{

        this.currentIndex=0;
    }

    this.gotoIndex=1;

    this.num=$("."+kv+"_kvItem").length;

    this.spaceTime=5000;

    this.animateTime=1000;

    this.timerId;

    this.isAnimate=false;

    this.width;

    this.height;

    var self=this;

    this.init=function(){

        $("#"+this.kvId+this.currentIndex).show();

        this.createIcons();
    }

    this.resize=function(){

        this.width=$("#"+this.kvContainer).width();

        this.height=$("#"+this.kvContainer).height();
    }

    this.createIcons=function(){

        var icons=$('<div></div>');

        icons.attr("id",this.iconList);

        for(var i=0;i<this.num;i++){

            var div=$('<div></div>');

            if(i==this.currentIndex){

                var selectClass=this.kvId+'_s';

                div.addClass(selectClass);

            }else{

                var unSelectClass=this.kvId+'_u';

                div.addClass(unSelectClass);
            }

            div.addClass("index_kv_icon");

            icons.append(div);
        }

        if(this.num==1){

            icons.hide();
        }

        icons.width(this.num*30);

        $("#"+this.kvContainer).append(icons);

        setTimeout(this.addIconEvent,100);
    }

    this.addIconEvent=function(){

        $("."+self.iconItem).each(function(){

            var index=$(this).index();

            $(this).click(function(){

                if(self.isAnimate)return;

                self.goto(index);
            });

            if($(this).index()==self.currentIndex){

                $(this).removeClass(self.kvId+"_u");

                $(this).addClass(self.kvId+"_s");

            }else{

                $(this).removeClass(self.kvId+"_s");

                $(this).addClass(self.kvId+"_u");
            }
        });

        self.timerId=setTimeout(self.autoLoop,self.spaceTime);
    }

    this.autoLoop=function(){

        if(self.isAnimate)return;

        var gotoIndex;

        if(self.currentIndex<self.num-1){

            gotoIndex=self.currentIndex+1;

        }else{

            gotoIndex=0;
        }

        self.goto(gotoIndex);
    }

    this.goto=function(gotoIndex){

        if(this.timerId)clearTimeout(this.timerId);

        if(this.isAnimate)return;

        this.isAnimate=true;

        this.resize();

        this.gotoIndex=gotoIndex;

        if(gotoIndex>this.currentIndex){

            $("#"+this.kvId+gotoIndex).css("left",this.width);

            $("#"+this.kvId+gotoIndex).show();

            $("#"+this.kvId+gotoIndex).animate({"left":0},this.animateTime);

            $("#"+this.kvId+this.currentIndex).animate({"left":-this.width},this.animateTime,function(){

                $("#"+self.kvId+self.currentIndex).hide();

                self.animateComplete();
            });

        }else if(gotoIndex<this.currentIndex){

            $("#"+this.kvId+gotoIndex).css("left",-this.width);

            $("#"+this.kvId+gotoIndex).show();

            $("#"+this.kvId+gotoIndex).animate({"left":0},this.animateTime);

            $("#"+this.kvId+this.currentIndex).animate({"left":this.width},this.animateTime,function(){

                $("#"+self.kvId+self.currentIndex).hide();

                self.animateComplete();
            });

        }else{

            $("#"+this.kvId+gotoIndex).css("left",0);

            $("#"+this.kvId+gotoIndex).show();

            self.animateComplete();
        }
    }

    this.animateComplete=function(){

        this.currentIndex=this.gotoIndex;

        this.isAnimate=false;

        $("."+this.iconItem).each(function(){

            if($(this).index()==self.currentIndex){

                $(this).removeClass(self.kvId+"_u");

                $(this).addClass(self.kvId+"_s");

            }else{

                $(this).removeClass(self.kvId+"_s");

                $(this).addClass(self.kvId+"_u");
            }
        });

        this.timerId=setTimeout(self.autoLoop,self.spaceTime);
    }
}