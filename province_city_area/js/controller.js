/**
 * Created by sunzg on 16/9/6.
 */
$(document).ready(
    function(){

        $("#province").append("<option value='请选择'>请选择</option>");

        $("#city").attr("disabled",true);

        $("#area").attr("disabled",true);

        for(var i=0;i<data.length;i++){

            var province=data[i].n;

            $("#province").append("<option value='"+province+"'>"+province+"</option>");
        }

        $("#province").change(function(){

            var province=$(this).children('option:selected').val();

            $("#city").attr("disabled",false);

            $("#city").empty();

            $("#city").append("<option value='请选择'>请选择</option>");

            $("#area").empty();

            $("#area").attr("disabled",true);

            for(var i=0;i<data.length;i++){

                if(province==data[i].n){

                    var citys=data[i].s;

                    for(var j=0;j<citys.length;j++){

                        var city=citys[j].n;

                        $("#city").append("<option value='"+city+"'>"+city+"</option>");

                    }
                }
            }
        })

        $("#city").change(function(){

            var province=$("#province").children('option:selected').val();

            var city=$(this).children('option:selected').val();

            for(var i=0;i<data.length;i++){

                if(province==data[i].n){

                    var citys=data[i].s;

                    $("#area").empty();

                    $("#area").append("<option value='请选择'>请选择</option>");

                    $("#area").attr("disabled",false);

                    for(var j=0;j<citys.length;j++){

                        if(city==citys[j].n){

                            if(areas=citys[j].s){

                                var areas=citys[j].s;

                                for(var m=0;m<areas.length;m++){

                                    var area=areas[m].n;

                                    $("#area").append("<option value='"+area+"'>"+area+"</option>");
                                }
                            }else{

                                $("#area").attr("disabled",true);
                            }
                        }
                    }
                }
            }
        })
    }
);