﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var jqStyle = (function () {
        function jqStyle() {
        }
        jqStyle.JQ_TREE_DF = 'jq-Tree-Df';
        jqStyle.JQ_TREE_BRANCH_DF = 'jq-Tree-Branch-Df';
        jqStyle.JQ_TREE_LEAF_DF = 'jq-Tree-Leaf-Df';

        jqStyle.JQ_HIDE = 'jq-Hide';
        jqStyle.JQ_SHOW = 'jq-Show';
        jqStyle.JQ_FILL_LEFT_IN = 'jq-Fill-Left-in';
        return jqStyle;
    })();
    exports.jqStyle = jqStyle;

    var jqEvent = (function () {
        function jqEvent() {
        }
        jqEvent.BLUR = 'blur';
        jqEvent.CHANGE = 'change';
        jqEvent.CLICK = 'click';
        jqEvent.DB_LCLICK = 'dblclick';
        jqEvent.FOCUS = 'focus';
        jqEvent.KEY_DOWN = 'keydown';
        jqEvent.KEY_PRESS = 'keypress';
        jqEvent.KEY_UP = 'keyup';
        jqEvent.LOAD = 'load';
        jqEvent.MOUSE_DOWN = 'mousedown';
        jqEvent.MOUSE_MOVE = 'mousemove';
        jqEvent.MOUSE_OUT = 'mouseout';
        jqEvent.MOUSE_OVER = 'mouseover';
        jqEvent.MOUSE_UP = 'mouseup';
        jqEvent.RESET = 'reset';
        jqEvent.SELECT = 'select';
        jqEvent.SUBMIT = 'submit';
        return jqEvent;
    })();
    exports.jqEvent = jqEvent;

    var jqObserver = (function () {
        function jqObserver() {
        }
        jqObserver.registerClass = function (_name) {
            var _index = this.collectionClassName.indexOf(_name);

            if (_index > -1) {
                this.collectionClassKey[_index]++;
            } else {
                this.collectionClassName.push(_name);
                this.collectionClassKey.push(1);
            }
            _index = _name = null;
        };

        jqObserver.nextKey = function (_name) {
            var _index = this.collectionClassName.indexOf(_name);
            _name = null;
            return this.collectionClassKey[_index];
        };

        jqObserver.finalize = function () {
            this.collectionClassKey = null;
            this.collectionClassName = null;
        };
        jqObserver.collectionClassName = new Array();
        jqObserver.collectionClassKey = new Array();
        return jqObserver;
    })();
    exports.jqObserver = jqObserver;

    var jqBaseComponent = (function () {
        function jqBaseComponent(_baseEle) {
            this.jqElementHtml = _baseEle;
            _baseEle = null;
        }
        jqBaseComponent.prototype.getJQLabel = function () {
            return this.jqLabel;
        };

        jqBaseComponent.prototype.setJQLabel = function (_jqLabel) {
            this.jqLabel = _jqLabel;
            _jqLabel = null;
        };

        jqBaseComponent.prototype.getJQClassName = function () {
            return this.jqClassName;
        };

        jqBaseComponent.prototype.setJQClassName = function (_jqclassName) {
            _jqclassName = typeof _jqclassName === 'undefined' ? this.getNodeName().toLowerCase() : _jqclassName.replace(/ /g, '_');
            this.jqClassName = _jqclassName;
            jqObserver.registerClass(this.jqClassName);
            _jqclassName = null;
        };

        jqBaseComponent.prototype.appendElement = function (_jqElement) {
            this.jqElementHtml.appendChild(_jqElement.toHtml());
            _jqElement = null;
        };

        jqBaseComponent.prototype.appendBeforeElement = function (_jqElement, jqTargetElement) {
            this.jqElementHtml.insertBefore(_jqElement.toHtml(), jqTargetElement.toHtml());
        };

        jqBaseComponent.prototype.appendAfertElement = function (_jqElement, jqTargetElement) {
            if (this.getLastChildElement() === jqTargetElement.toHtml()) {
                this.appendElement(_jqElement);
            } else {
                this.jqElementHtml.insertBefore(_jqElement.toHtml(), jqTargetElement.getNextSiblingElement());
            }
        };

        jqBaseComponent.prototype.replaceElement = function (_jqElement, _oldJqElement) {
            this.jqElementHtml.replaceChild(_jqElement.toHtml(), _oldJqElement.toHtml());
            _jqElement = _oldJqElement = null;
        };

        jqBaseComponent.prototype.removeElement = function (_jqElement) {
            this.removeChildElement(_jqElement.toHtml());
        };

        jqBaseComponent.prototype.removeAllElements = function () {
            var _length = this.getChildNodesElementsLength();

            if (_length > 0) {
                for (var i = _length - 1; i >= 0; i--) {
                    this.removeChildElement(this.getChildNodeElement(i));
                }
            }
            _length = null;
        };

        jqBaseComponent.prototype.removeChildElement = function (_node) {
            this.jqElementHtml.removeChild(_node);
            _node = null;
        };

        jqBaseComponent.prototype.remove = function () {
            this.getParentElement().removeChild(this.jqElementHtml);
        };

        jqBaseComponent.prototype.getChildNodesElementsLength = function () {
            return this.jqElementHtml.childNodes.length;
        };

        jqBaseComponent.prototype.getChildNodesElements = function () {
            return this.jqElementHtml.childNodes;
        };

        jqBaseComponent.prototype.getChildNodeElement = function (_index) {
            return this.jqElementHtml.childNodes[_index];
        };

        jqBaseComponent.prototype.getFirstChildElement = function () {
            return this.jqElementHtml.firstChild;
        };

        jqBaseComponent.prototype.getLastChildElement = function () {
            return this.jqElementHtml.lastChild;
        };

        jqBaseComponent.prototype.getNextSiblingElement = function () {
            return this.jqElementHtml.nextSibling;
        };

        jqBaseComponent.prototype.getParentElement = function () {
            return this.jqElementHtml.parentNode;
        };

        jqBaseComponent.prototype.isEqualElement = function (_jqElement) {
            return this.jqElementHtml.isEqualNode(_jqElement.toHtml());
        };

        jqBaseComponent.prototype.equals = function (_jqElement) {
            return this.getId() === _jqElement.getId();
        };

        jqBaseComponent.prototype.createAutoId = function () {
            this.jqElementHtml.id = this.jqClassName + "[" + jqObserver.nextKey(this.jqClassName) + "]";
        };

        jqBaseComponent.prototype.toHtml = function () {
            return this.jqElementHtml;
        };

        jqBaseComponent.prototype.addEvent = function (_event, _function) {
            this.jqElementHtml.addEventListener(_event, _function, false);
        };

        jqBaseComponent.prototype.removeEvent = function (_event, _function) {
            this.jqElementHtml.removeEventListener(_event, _function, false);
        };

        jqBaseComponent.prototype.getId = function () {
            return this.jqElementHtml.id;
        };

        jqBaseComponent.prototype.setId = function (_id) {
            this.jqElementHtml.id = _id;
            _id = null;
        };

        jqBaseComponent.prototype.existId = function (_id) {
            return this.jqElementHtml.id == _id;
            _id = null;
        };

        jqBaseComponent.prototype.addClass = function (_class) {
            this.jqElementHtml.classList.add(_class);
            _class = null;
        };

        jqBaseComponent.prototype.addCollectionClass = function (_classes) {
            var length = _classes.length;

            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    this.addClass(_classes[i]);
                }
            }

            length = _classes = null;
        };

        jqBaseComponent.prototype.removeClass = function (_class) {
            this.jqElementHtml.classList.remove(_class);
            _class = null;
        };

        jqBaseComponent.prototype.removeCollectionClass = function (_classes) {
            var length = _classes.length;

            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    this.removeClass(_classes[i]);
                }
            }

            length = _classes = null;
        };

        jqBaseComponent.prototype.removeAllClass = function () {
            var length = this.countClass();
            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    this.removeClass(this.getItemClass(i));
                }
            }
            length = null;
        };

        jqBaseComponent.prototype.toggleClass = function (_class) {
            this.jqElementHtml.classList.toggle(_class);
            _class = null;
        };

        jqBaseComponent.prototype.exitsClass = function (_class) {
            return this.jqElementHtml.classList.contains(_class);
            _class = null;
        };

        jqBaseComponent.prototype.countClass = function () {
            return this.jqElementHtml.classList.length;
        };

        jqBaseComponent.prototype.getItemClass = function (_index) {
            return this.jqElementHtml.classList.item(_index);
            _index = null;
        };

        jqBaseComponent.prototype.getDateSet = function () {
            return this.jqElementHtml.dataset;
        };

        jqBaseComponent.prototype.addDataSet = function (_key, _value) {
            this.jqElementHtml.dataset[_key] = _value;
            _key = _value = null;
        };

        jqBaseComponent.prototype.getInnerHtml = function () {
            return this.jqElementHtml.innerHTML;
        };

        jqBaseComponent.prototype.setInnerHtml = function (_innerHtml) {
            this.jqElementHtml.innerHTML = _innerHtml;
            _innerHtml = null;
        };

        jqBaseComponent.prototype.getInnerText = function () {
            return this.jqElementHtml.innerText;
        };

        jqBaseComponent.prototype.setInnerText = function (_innerText) {
            this.jqElementHtml.innerText = _innerText;
            _innerText = null;
        };

        jqBaseComponent.prototype.appendHtml = function (_htmlElement) {
            this.jqElementHtml.appendChild(_htmlElement);
            _htmlElement = null;
        };

        jqBaseComponent.prototype.replaceHtml = function (_htmlElement, _oldHtmlElement) {
            this.jqElementHtml.replaceChild(_htmlElement, _oldHtmlElement);
            _htmlElement = _oldHtmlElement = null;
        };

        jqBaseComponent.prototype.isEqualHtml = function (_htmlElement) {
            return this.jqElementHtml.isEqualNode(_htmlElement);
            _htmlElement = null;
        };

        jqBaseComponent.prototype.getNodeName = function () {
            return this.jqElementHtml.nodeName;
        };

        jqBaseComponent.prototype.setNodeName = function (_nodeName) {
            this.jqElementHtml.nodeName = _nodeName;
            _nodeName = null;
        };

        jqBaseComponent.prototype.getStyle = function () {
            return this.jqElementHtml.style;
        };

        jqBaseComponent.prototype.setStyle = function (_style) {
            this.jqElementHtml.style = _style;
            _style = null;
        };

        jqBaseComponent.prototype.getCssWidth = function () {
            return this.jqElementHtml.style.width;
        };

        jqBaseComponent.prototype.setCssWidth = function (_width) {
            return this.jqElementHtml.style.width = _width;
        };

        jqBaseComponent.prototype.applyCss = function (_cssMap) {
        };

        jqBaseComponent.prototype.expire = function () {
            this.jqElementHtml = null;
            this.jqLabel = null;
            this.jqClassName = null;
        };
        return jqBaseComponent;
    })();
    exports.jqBaseComponent = jqBaseComponent;

    

    var div = (function (_super) {
        __extends(div, _super);
        function div(_className) {
            var _tmpElement = document.createElement('div');
            _super.call(this, _tmpElement);
            this.setJQClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return div;
    })(jqBaseComponent);
    exports.div = div;

    var i = (function (_super) {
        __extends(i, _super);
        function i(_className) {
            var _tmpElement = document.createElement('i');
            _super.call(this, _tmpElement);
            this.setJQClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return i;
    })(jqBaseComponent);
    exports.i = i;

    var li = (function (_super) {
        __extends(li, _super);
        function li(_className) {
            var _tmpElement = document.createElement('li');
            _super.call(this, _tmpElement);
            this.setJQClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return li;
    })(jqBaseComponent);
    exports.li = li;

    var p = (function (_super) {
        __extends(p, _super);
        function p(_className) {
            var _tmpElement = document.createElement('p');
            _super.call(this, _tmpElement);
            this.setJQClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return p;
    })(jqBaseComponent);
    exports.p = p;

    var span = (function (_super) {
        __extends(span, _super);
        function span(_className) {
            var _tmpElement = document.createElement('span');
            _super.call(this, _tmpElement);
            this.setJQClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return span;
    })(jqBaseComponent);
    exports.span = span;

    var ul = (function (_super) {
        __extends(ul, _super);
        function ul(_className) {
            var _tmpElement = document.createElement('ul');
            _super.call(this, _tmpElement);
            this.setJQClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return ul;
    })(jqBaseComponent);
    exports.ul = ul;

    

    var jqList = (function () {
        function jqList(_parent) {
            this.parent = _parent;
            this.jqElements = new Array();
            this.length = 0;
            this.index = -1;
            _parent = null;
        }
        jqList.prototype.add = function (_element) {
            this.jqElements.push(_element);
            this.parent.appendElement(_element);
            this.length++;
            this.index++;
            _element = null;
        };

        jqList.prototype.addIndex = function (_element, _index) {
            if (_index <= this.length && _index >= 0) {
                this.parent.appendBeforeElement(_element, this.jqElements[_index]);
                this.jqElements.splice(_index, 0, _element);
                this.index = _index;
                this.length++;
                _index = _element = null;
            } else {
                throw new Error('Indice ' + _index + '  fuera de rango ');
                _index = _element = null;
            }
        };

        jqList.prototype.getFirst = function () {
            if (!this.isEmpty()) {
                this.index = 0;
                return this.jqElements[this.index];
            } else {
                return null;
            }
        };

        jqList.prototype.getLast = function () {
            if (!this.isEmpty() && this.length > 1) {
                this.index = this.length - 1;
                return this.jqElements[this.index];
            } else {
                return null;
            }
        };

        jqList.prototype.getNext = function () {
            if (!this.isEmpty() && this.length > 1) {
                this.index = this.index === this.length - 1 ? 0 : this.index++;
                return this.jqElements[this.index];
            } else {
                return null;
            }
        };

        jqList.prototype.getBack = function () {
            if (!this.isEmpty() && this.length > 1) {
                this.index = this.index === 0 ? this.length - 1 : this.index--;
                return this.jqElements[this.index];
            } else {
                return null;
            }
        };

        jqList.prototype.getItem = function (_index) {
            if (!this.isEmpty()) {
                if (_index <= this.length && _index >= 0) {
                    this.index = _index;
                    _index = null;
                    return this.jqElements[this.index];
                } else {
                    throw new Error('Indice ' + _index + '  fuera de rango ');
                    _index = null;
                    return null;
                }
            } else {
                _index = null;
                return null;
            }
        };

        jqList.prototype.pullOutFirst = function () {
            if (!this.isEmpty()) {
                var _tmpEle = this.jqElements.shift();
                this.length--;
                this.index = this.length === 0 ? -1 : 0;
                this.parent.removeElement(_tmpEle);
                return _tmpEle;
            } else {
                return null;
            }
        };

        jqList.prototype.pullOutLast = function () {
            if (!this.isEmpty() && this.length > 1) {
                var _tmpEle = this.jqElements.pop();
                this.length--;
                this.index = this.length - 1;
                this.parent.removeElement(_tmpEle);
                return _tmpEle;
            } else {
                return null;
            }
        };

        jqList.prototype.pullOutNext = function () {
            if (!this.isEmpty() && this.length > 1) {
                var _tmpIndex = this.index;
                this.index = this.index === this.length - 1 ? 0 : this.index++;
                var _arrTmpEle = this.jqElements.splice(this.index, 1);
                this.length--;
                this.index = _tmpIndex;
                _tmpIndex = null;
                this.parent.removeElement(_arrTmpEle[0]);
                return _arrTmpEle[0];
            } else {
                return null;
            }
        };

        jqList.prototype.pullOutBack = function () {
            if (!this.isEmpty() && this.length > 1) {
                var _tmpIndex = this.index;
                this.index = this.index === 0 ? this.length - 1 : this.index--;
                var _arrTmpEle = this.jqElements.splice(this.index, 1);
                this.length--;
                this.index = _tmpIndex;
                _tmpIndex = null;
                this.parent.removeElement(_arrTmpEle[0]);
                return _arrTmpEle[0];
            } else {
                return null;
            }
        };

        jqList.prototype.pullOutItem = function (_index) {
            if (!this.isEmpty()) {
                if (_index <= this.length && _index >= 0) {
                    this.index = _index;
                    _index = null;
                    var _arrTmpEle = this.jqElements.splice(this.index, 1);
                    this.length--;
                    this.index = this.index === 0 ? this.length - 1 : this.index--;
                    this.parent.removeElement(_arrTmpEle[0]);
                    return _arrTmpEle[0];
                } else {
                    throw new Error('Indice ' + _index + '  fuera de rango ');
                    _index = null;
                    return null;
                }
            } else {
                _index = null;
                return null;
            }
        };

        jqList.prototype.remove = function (_element) {
            if (!this.isEmpty()) {
                if (this.length > 1) {
                    var _length = this.length;

                    for (var i = _length - 1; i >= 1; i--) {
                        var _tmpElement = this.jqElements[i];

                        if (_tmpElement.equals(_element)) {
                            this.jqElements.splice(i, 1);
                            this.length--;
                            this.index = this.index === 0 ? this.length - 1 : this.index--;
                            this.parent.removeElement(_element);
                            _element = _length = _tmpElement = null;
                            return;
                        }
                        _tmpElement = null;
                    }
                    _length = _element = null;
                } else {
                    this.jqElements.unshift();
                    this.length--;
                    this.index = -1;
                    this.parent.removeElement(_element);
                    _element = null;
                }
            }
        };

        jqList.prototype.removeIndex = function (_index) {
            if (!this.isEmpty()) {
                if (_index <= this.length && _index >= 0) {
                    this.index = _index;
                    _index = null;
                    var _arrTmpEle = this.jqElements.splice(this.index, 1);
                    this.length--;
                    this.index = this.index === 0 ? this.length - 1 : this.index--;
                    this.parent.removeElement(_arrTmpEle[0]);
                } else {
                    throw new Error('Indice ' + _index + '  fuera de rango ');
                    _index = null;
                }
            }
        };

        jqList.prototype.removeAll = function () {
            if (!this.isEmpty()) {
                this.parent.removeAllElements();
                this.clear();
            }
        };

        jqList.prototype.clear = function () {
            this.jqElements = [];
            this.length = 0;
            this.index = -1;
        };

        jqList.prototype.destroy = function () {
            this.jqElements = null;
            this.length = null;
            this.index = null;
            this.parent = null;
        };

        jqList.prototype.isEmpty = function () {
            return this.length <= 0;
        };
        return jqList;
    })();
    exports.jqList = jqList;
});