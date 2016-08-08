/**
 * Created by sunzg on 16/8/3.
 */
$(function(){

    //下面的为动画油滴的逻辑
    var oilArr=[];

    var oilPos=[{top:132,left:7},{top:15,left:1100},{top:30,left:650},{top:450,left:130},{top:160,left:60},{top:132,left:600},{top:132,left:1020}]

    function createFloatOil(){

        var h=$("#feed1").height();

        var w=$("#feed1").width();

        for(var i=0;i<7;i++){

            var oilTop=oilPos[i].top;

            var oilLeft=oilPos[i].left;

            if(i==5||i==6){

                oilTop=h-60;
            }

            var oilImg=$('<img id="floatId'+i+'" class="float_oil"/>');

            $(oilImg).attr("src","image/oil_float_"+i+".png");

            var oil=new Oil(oilLeft,oilTop,oilImg);

            oilImg.oil=oil;

            oilArr.push(oilImg);

            $("#feed1Oil").append(oilImg);

            oilImg.oil.startMove();
        }
    }

    function Oil(left,top,img){

        this.left=left;

        this.top=top;

        this.img=img;

        this.dir=0;

        this.speed=1;

        var self=this;

        var up_down=0;

        var up_down_speed=1;

        var left_right=0;

        var left_right_speed=1;

        this.move=function(){

            self.dir=Math.floor(Math.random()*4);

            self.up_down=Math.random();

            self.left_right=Math.random();

            if(self.dir==0){

                self.top+=self.speed;

            }else if(self.dir==1){

                self.top-=self.speed;

            }else if(this.dir==2){

                self.left+=self.speed;

            }else if(this.dir==3){

                self.left-=self.speed;
            }

            $(self.img).css({"top":self.top,"left":self.left});
        }

        this.moveDir=function(){

            self.top+=up_down_speed;

            self.left+=left_right_speed;

            if(self.top<=0){

                self.top=0;

                up_down_speed=-up_down_speed;

            }else if(self.top>=wrapperHeight-10){

                self.top=wrapperHeight-10;

                up_down_speed=-up_down_speed;
            }

            if(self.left<=0){

                self.left=0;

                left_right_speed=-left_right_speed;

            }else if(self.left>=wrappWidth-10){

                self.left=wrappWidth-10;

                left_right_speed=-left_right_speed;
            }

            $(self.img).css({"top":self.top,"left":self.left});
        }

        this.loop=function(){

            self.moveDir();

            setTimeout(self.loop,60);
        }

        this.startMove=function(){

            if(Math.random()>0.5){

                up_down_speed=this.speed;

            }else{

                up_down_speed=-this.speed;
            }

            if(Math.random()>0.5){

                left_right_speed=this.speed;

            }else{

                left_right_speed=-this.speed;
            }

            this.loop();
        }
    }

});