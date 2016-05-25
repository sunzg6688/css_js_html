/**
 * Created by sunzg on 16/5/6.
 */
(function () {
    //解决IE8之类不支持indexOf
    if (!Array.prototype.indexOf) {

        Array.prototype.indexOf = function (elt, from) {

            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;

            from = (from < 0) ? Math.ceil(from) : Math.floor(from);

            if (from < 0) {

                from += len;

            }

            for (; from < len; from++) {

                if (from in this && this[from] === elt) {

                    return from;

                }
            }

            return -1;
        };
    }

    //解决IE8之类不支持getElementsByClassName
    if (!document.getElementsByClassName) {

        document.getElementsByClassName = function (className, element) {

            var children = (element || document).getElementsByTagName('*');

            var elements = new Array();

            for (var i = 0; i < children.length; i++) {

                var child = children[i];

                var classNames = child.className.split(' ');

                for (var j = 0; j < classNames.length; j++) {

                    if (classNames[j] == className) {

                        elements.push(child);

                        break;

                    }
                }
            }

            return elements;
        };
    }

    if (!window.eid) {

        window.eid = function (id) {

            return document.getElementById(id);

        }
    }

})();