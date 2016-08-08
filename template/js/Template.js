/**
 * Created by sunzg on 16/8/5.
 */
//非常重要缓存已经调用过的模版
var templates = {};

function Template(container, tmpl, data, callBack) {

    var container = container;

    var tmpl = tmpl;

    var data = data;

    var tmplTxtArr = [];

    var innerHTML = "";

    function parse() {

        if (templates[tmpl]) {

            updateTmplData(templates[tmpl]["tmplTxtArr"]);

            document.getElementById(container).innerHTML = innerHTML;

        } else {

            parseTmpl();

            updateTmplData(tmplTxtArr);

            document.getElementById(container).innerHTML = innerHTML;
        }
    };

    function parseTmpl() {

        var template = document.getElementById(tmpl);

        var htmlTxt = template.innerHTML;

        parseTxt(htmlTxt);

    };

    function parseTxt(htmlTxt) {

        var htmlTxtArr = htmlTxt.split("}}");

        for (var i = 0; i < htmlTxtArr.length; i++) {

            var startIndex = htmlTxtArr[i].indexOf("{{");

            if (startIndex != -1) {

                var beforHtmlTxt = htmlTxtArr[i].substring(0, startIndex);

                var key = htmlTxtArr[i].substring(startIndex + 2, htmlTxtArr[i].length);

                tmplTxtArr.push({"txt": beforHtmlTxt, "update": false});

                var updateData = {"txt": "", "update": true, "key": key};

                tmplTxtArr.push(updateData);

            } else {

                tmplTxtArr.push({"txt": htmlTxtArr[i], "update": false});
            }
        }

        templates[tmpl] = {"tmplTxtArr": tmplTxtArr};
    };

    function updateTmplData(tmplTxtArr) {

        for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < tmplTxtArr.length; j++) {

                if (tmplTxtArr[j].update) {

                    var key = tmplTxtArr[j].key;

                    if (data[i][key] || data[i][key] == 0) {

                        innerHTML += data[i][key];
                    }

                } else {

                    innerHTML += tmplTxtArr[j].txt
                }
            }
        }
    };

    parse();

    //此处异步执行是为了保证回调函数在调用执行时，插入的模版数据已经存在dom树中，浏览器已经成功渲染。
    if (callBack)setTimeout(callBack);
}