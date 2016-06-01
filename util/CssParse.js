/**
 * Created by sunzg on 16/5/5.
 */
(function () {

    //这个地方通过cssRule.html 页面可以获取到common_lib.css 的所有class的样式的字符串
    var classes_string=".f_l{float:left;}.f_r{float:right;}.c_b{clear:both;}.o_h{overflow:hidden;}.p_r{position:relative;}.p_a{position:absolute;}.p_f{position:fixed;}.c_p{cursor:pointer;}.t-a_c{text-align:center;}.d_n{display:none;}.m_0px_a{margin:0pxauto;}.m_5px_a{margin:5pxauto;}.m_10px_a{margin:10pxauto;}.m_15px_a{margin:15pxauto;}.m_20px_a{margin:20pxauto;}.m_25px_a{margin:25pxauto;}.m_30px_a{margin:30pxauto;}.w_0{width:0%}.w_1{width:1%}.w_2{width:2%}.w_3{width:3%}.w_4{width:4%}.w_5{width:5%}.w_6{width:6%}.w_7{width:7%}.w_8{width:8%}.w_9{width:9%}.w_10{width:10%}.w_11{width:11%}.w_12{width:12%}.w_13{width:13%}.w_14{width:14%}.w_15{width:15%}.w_16{width:16%}.w_17{width:17%}.w_18{width:18%}.w_19{width:19%}.w_20{width:20%}.w_21{width:21%}.w_22{width:22%}.w_23{width:23%}.w_24{width:24%}.w_25{width:25%}.w_26{width:26%}.w_27{width:27%}.w_28{width:28%}.w_29{width:29%}.w_30{width:30%}.w_31{width:31%}.w_32{width:32%}.w_33{width:33%}.w_34{width:34%}.w_35{width:35%}.w_36{width:36%}.w_37{width:37%}.w_38{width:38%}.w_39{width:39%}.w_40{width:40%}.w_41{width:41%}.w_42{width:42%}.w_43{width:43%}.w_44{width:44%}.w_45{width:45%}.w_46{width:46%}.w_47{width:47%}.w_48{width:48%}.w_49{width:49%}.w_50{width:50%}.w_51{width:51%}.w_52{width:52%}.w_53{width:53%}.w_54{width:54%}.w_55{width:55%}.w_56{width:56%}.w_57{width:57%}.w_58{width:58%}.w_59{width:59%}.w_60{width:60%}.w_61{width:61%}.w_62{width:62%}.w_63{width:63%}.w_64{width:64%}.w_65{width:65%}.w_66{width:66%}.w_67{width:67%}.w_68{width:68%}.w_69{width:69%}.w_70{width:70%}.w_71{width:71%}.w_72{width:72%}.w_73{width:73%}.w_74{width:74%}.w_75{width:75%}.w_76{width:76%}.w_77{width:77%}.w_78{width:78%}.w_79{width:79%}.w_80{width:80%}.w_81{width:81%}.w_82{width:82%}.w_83{width:83%}.w_84{width:84%}.w_85{width:85%}.w_86{width:86%}.w_87{width:87%}.w_88{width:88%}.w_89{width:89%}.w_90{width:90%}.w_91{width:91%}.w_92{width:92%}.w_93{width:93%}.w_94{width:94%}.w_95{width:95%}.w_96{width:96%}.w_97{width:97%}.w_98{width:98%}.w_99{width:99%}.w_100{width:100%}.t_0{top:0%}.t_1{top:1%}.t_2{top:2%}.t_3{top:3%}.t_4{top:4%}.t_5{top:5%}.t_6{top:6%}.t_7{top:7%}.t_8{top:8%}.t_9{top:9%}.t_10{top:10%}.t_11{top:11%}.t_12{top:12%}.t_13{top:13%}.t_14{top:14%}.t_15{top:15%}.t_16{top:16%}.t_17{top:17%}.t_18{top:18%}.t_19{top:19%}.t_20{top:20%}.t_21{top:21%}.t_22{top:22%}.t_23{top:23%}.t_24{top:24%}.t_25{top:25%}.t_26{top:26%}.t_27{top:27%}.t_28{top:28%}.t_29{top:29%}.t_30{top:30%}.t_31{top:31%}.t_32{top:32%}.t_33{top:33%}.t_34{top:34%}.t_35{top:35%}.t_36{top:36%}.t_37{top:37%}.t_38{top:38%}.t_39{top:39%}.t_40{top:40%}.t_41{top:41%}.t_42{top:42%}.t_43{top:43%}.t_44{top:44%}.t_45{top:45%}.t_46{top:46%}.t_47{top:47%}.t_48{top:48%}.t_49{top:49%}.t_50{top:50%}.t_51{top:51%}.t_52{top:52%}.t_53{top:53%}.t_54{top:54%}.t_55{top:55%}.t_56{top:56%}.t_57{top:57%}.t_58{top:58%}.t_59{top:59%}.t_60{top:60%}.t_61{top:61%}.t_62{top:62%}.t_63{top:63%}.t_64{top:64%}.t_65{top:65%}.t_66{top:66%}.t_67{top:67%}.t_68{top:68%}.t_69{top:69%}.t_70{top:70%}.t_71{top:71%}.t_72{top:72%}.t_73{top:73%}.t_74{top:74%}.t_75{top:75%}.t_76{top:76%}.t_77{top:77%}.t_78{top:78%}.t_79{top:79%}.t_80{top:80%}.t_81{top:81%}.t_82{top:82%}.t_83{top:83%}.t_84{top:84%}.t_85{top:85%}.t_86{top:86%}.t_87{top:87%}.t_88{top:88%}.t_89{top:89%}.t_90{top:90%}.t_91{top:91%}.t_92{top:92%}.t_93{top:93%}.t_94{top:94%}.t_95{top:95%}.t_96{top:96%}.t_97{top:97%}.t_98{top:98%}.t_99{top:99%}.t_100{top:100%}.l_0{left:0%}.l_1{left:1%}.l_2{left:2%}.l_3{left:3%}.l_4{left:4%}.l_5{left:5%}.l_6{left:6%}.l_7{left:7%}.l_8{left:8%}.l_9{left:9%}.l_10{left:10%}.l_11{left:11%}.l_12{left:12%}.l_13{left:13%}.l_14{left:14%}.l_15{left:15%}.l_16{left:16%}.l_17{left:17%}.l_18{left:18%}.l_19{left:19%}.l_20{left:20%}.l_21{left:21%}.l_22{left:22%}.l_23{left:23%}.l_24{left:24%}.l_25{left:25%}.l_26{left:26%}.l_27{left:27%}.l_28{left:28%}.l_29{left:29%}.l_30{left:30%}.l_31{left:31%}.l_32{left:32%}.l_33{left:33%}.l_34{left:34%}.l_35{left:35%}.l_36{left:36%}.l_37{left:37%}.l_38{left:38%}.l_39{left:39%}.l_40{left:40%}.l_41{left:41%}.l_42{left:42%}.l_43{left:43%}.l_44{left:44%}.l_45{left:45%}.l_46{left:46%}.l_47{left:47%}.l_48{left:48%}.l_49{left:49%}.l_50{left:50%}.l_51{left:51%}.l_52{left:52%}.l_53{left:53%}.l_54{left:54%}.l_55{left:55%}.l_56{left:56%}.l_57{left:57%}.l_58{left:58%}.l_59{left:59%}.l_60{left:60%}.l_61{left:61%}.l_62{left:62%}.l_63{left:63%}.l_64{left:64%}.l_65{left:65%}.l_66{left:66%}.l_67{left:67%}.l_68{left:68%}.l_69{left:69%}.l_70{left:70%}.l_71{left:71%}.l_72{left:72%}.l_73{left:73%}.l_74{left:74%}.l_75{left:75%}.l_76{left:76%}.l_77{left:77%}.l_78{left:78%}.l_79{left:79%}.l_80{left:80%}.l_81{left:81%}.l_82{left:82%}.l_83{left:83%}.l_84{left:84%}.l_85{left:85%}.l_86{left:86%}.l_87{left:87%}.l_88{left:88%}.l_89{left:89%}.l_90{left:90%}.l_91{left:91%}.l_92{left:92%}.l_93{left:93%}.l_94{left:94%}.l_95{left:95%}.l_96{left:96%}.l_97{left:97%}.l_98{left:98%}.l_99{left:99%}.l_100{left:100%}";

    var classes={};

    function initClasses(string){

        var class_arr=string.split("}");

        for(var i=0;i<class_arr.length;i++){

            var class_string=class_arr[i];

            var class_begin=class_string.indexOf(".");

            var class_content_begin=class_string.indexOf("{");

            var class_content_end=class_string.length;

            var class_name=class_string.slice(class_begin,class_content_begin);

            var class_content=class_string.slice(class_content_begin+1,class_content_end);

            classes[class_name]=class_content;
        }

    }

    initClasses(classes_string);

    function parseStyle(element){

        var styles=element.style.cssText.split(";");

        var style={};

        var style_string="";

        for(var j=0;j<styles.length;j++){

            var arr=styles[j].split(":");

            style[arr[0]]=arr[1];

            if(arr[0]){

                style_string+=arr[0]+":"+arr[1];
            }
         }

        console.log(style_string);
    }

    function parseClass(element){

        var class_name=element.className;

        var name_arr=class_name.split(" ");

        var style_string="";

        for(var i=0;i<name_arr.length;i++){

            if(classes["."+name_arr[i]]){

                style_string+=classes["."+name_arr[i]];
            }
        }

        console.log(style_string);
    }

    var cssParse = {};

    cssParse.parseStyle=parseStyle;

    cssParse.parseClass=parseClass;

    window.cssParse=cssParse;

    if(!window.eid){

        window.eid=function(id){

            return document.getElementById(id);

        }
    }

})();