var phpbb={};phpbb.alertTime=100,function(t){"use strict";var e,a={TAB:9,ENTER:13,ESC:27},r=t("#darkenwrapper"),n=null;phpbb.isTouch=window&&"undefined"!=typeof window.ontouchstart,phpbb.loadingIndicator=function(){return e||(e=t("<div />",{id:"loading_indicator"}),e.appendTo("#page-footer")),e.is(":visible")||(e.fadeIn(phpbb.alertTime),phpbb.clearLoadingTimeout(),n=setTimeout(function(){var a=t("#phpbb_alert");e.is(":visible")&&phpbb.alert(a.attr("data-l-err"),a.attr("data-l-timeout-processing-req"))},15e3)),e},phpbb.clearLoadingTimeout=function(){null!==n&&(clearTimeout(n),n=null)},phpbb.closeDarkenWrapper=function(e){n=setTimeout(function(){t("#darkenwrapper").trigger("click")},e)},phpbb.alert=function(e,r){var n=t("#phpbb_alert");return n.find(".alert_title").html(e),n.find(".alert_text").html(r),t(document).on("keydown.phpbb.alert",function(t){(t.keyCode===a.ENTER||t.keyCode===a.ESC)&&(phpbb.alert.close(n,!0),t.preventDefault(),t.stopPropagation())}),phpbb.alert.open(n),n},phpbb.alert.open=function(t){r.is(":visible")||r.fadeIn(phpbb.alertTime),e&&e.is(":visible")?e.fadeOut(phpbb.alertTime,function(){r.append(t),t.fadeIn(phpbb.alertTime)}):r.is(":visible")?(r.append(t),t.fadeIn(phpbb.alertTime)):(r.append(t),t.show(),r.fadeIn(phpbb.alertTime)),t.on("click",function(t){t.stopPropagation()}),r.one("click",function(e){phpbb.alert.close(t,!0),e.preventDefault(),e.stopPropagation()}),t.find(".alert_close").one("click",function(e){phpbb.alert.close(t,!0),e.preventDefault()})},phpbb.alert.close=function(e,a){var n=a?r:e;n.fadeOut(phpbb.alertTime,function(){e.hide()}),e.find(".alert_close").off("click"),t(document).off("keydown.phpbb.alert")},phpbb.confirm=function(e,r,n){var i=t("#phpbb_confirm");return i.find(".alert_text").html(e),n=n||!0,t(document).on("keydown.phpbb.alert",function(e){if(e.keyCode===a.ENTER||e.keyCode===a.ESC){var r=e.keyCode===a.ENTER?"confirm":"cancel";t('input[name="'+r+'"]').trigger("click"),e.preventDefault(),e.stopPropagation()}}),i.find('input[type="button"]').one("click.phpbb.confirmbox",function(t){var e="confirm"===this.name;e&&r(!0),i.find('input[type="button"]').off("click.phpbb.confirmbox"),phpbb.alert.close(i,n||!e),t.preventDefault(),t.stopPropagation()}),phpbb.alert.open(i),i},phpbb.parseQuerystring=function(t){var e,a,r={};for(t=t.split("&"),e=0;e<t.length;e++)a=t[e].split("="),r[a[0]]=decodeURIComponent(a[1]);return r},phpbb.ajaxify=function(a){var i,l=t(a.selector),o=a.refresh,p=a.callback,c="undefined"!=typeof a.overlay?a.overlay:!0,s=l.is("form"),h=l.is('input[type="text"], textarea');return i=s?"submit":h?"keyup":"click",l.on(i,function(i){function l(t,e,a){"undefined"!=typeof console&&console.log&&console.log("AJAX error. status: "+e+", message: "+a),phpbb.clearLoadingTimeout();var n,i=!1;try{n=JSON.parse(t.responseText),n=n.message}catch(l){}"string"==typeof n&&n.length>0?i=n:"string"==typeof a&&a.length>0?i=a:(i=r.attr("data-ajax-error-text-"+e),"string"==typeof i&&i.length||(i=r.attr("data-ajax-error-text"))),phpbb.alert(r.attr("data-ajax-error-title"),i)}function b(e){var a;phpbb.clearLoadingTimeout(),"undefined"==typeof e.S_CONFIRM_ACTION?("undefined"!=typeof e.MESSAGE_TITLE?a=phpbb.alert(e.MESSAGE_TITLE,e.MESSAGE_TEXT):r.fadeOut(phpbb.alertTime),"function"==typeof phpbb.ajaxCallbacks[p]&&phpbb.ajaxCallbacks[p].call(v,e),e.REFRESH_DATA&&("function"==typeof o?o=o(e.REFRESH_DATA.url):"boolean"!=typeof o&&(o=!1),n=setTimeout(function(){o&&(window.location=e.REFRESH_DATA.url),r.fadeOut(phpbb.alertTime,function(){"undefined"!=typeof a&&a.hide()})},1e3*e.REFRESH_DATA.time))):phpbb.confirm(e.MESSAGE_BODY,function(a){a&&(phpbb.loadingIndicator(),f=t("<form>"+e.S_HIDDEN_FIELDS+"</form>").serialize(),t.ajax({url:e.S_CONFIRM_ACTION,type:"POST",data:f+"&confirm="+e.YES_VALUE+"&"+t("form","#phpbb_confirm").serialize(),success:b,error:l}))},!1)}var u,d,f,g,v=this,y=t(this);if("false"!==y.find('input[type="submit"][data-clicked]').attr("data-ajax")){var m="function"==typeof a.filter;if(f={},s)u=y.attr("action").replace("&","&"),f=y.serializeArray(),d=y.attr("method")||"GET",y.find('input[type="submit"][data-clicked]')&&(g=y.find('input[type="submit"][data-clicked]'),f.push({name:g.attr("name"),value:g.val()}));else if(h){var k=y.attr("data-name")||this.name;u=y.attr("data-url").replace("&","&"),f[k]=this.value,d="POST"}else u=this.href,f=null,d="GET";var T=function(){var a=y.attr("data-overlay");!c||"undefined"!=typeof a&&"true"!==a||phpbb.loadingIndicator();var r=t.ajax({url:u,type:d,data:f,success:b,error:l,cache:!1});r.always(function(){e&&e.is(":visible")&&e.fadeOut(phpbb.alertTime)})};(!m||a.filter.call(this,f,i,T))&&(T(),i.preventDefault())}}),s&&l.find("input:submit").click(function(){var e=t(this);e.parents("form:first").find("input:submit[data-clicked]").removeAttr("data-clicked"),e.attr("data-clicked","true")}),this},phpbb.search={cache:{data:[]},tpl:[],container:[]},phpbb.search.cache.get=function(t){return this.data[t]?this.data[t]:!1},phpbb.search.cache.set=function(t,e,a){this.data[t]||(this.data[t]={results:[]}),this.data[t][e]=a},phpbb.search.cache.setResults=function(t,e,a){this.data[t].results[e]=a},phpbb.search.cleanKeyword=function(e){return t.trim(e).toLowerCase()},phpbb.search.getKeyword=function(t,e,a){if(a){var r=phpbb.search.getKeywordLine(t);e=e.split("\n").splice(r,1)}return phpbb.search.cleanKeyword(e)},phpbb.search.getKeywordLine=function(t){var e=t.get(0).selectionStart;return t.val().substr(0,e).split("\n").length-1},phpbb.search.setValue=function(t,e,a){if(a){var r=phpbb.search.getKeywordLine(t),n=t.val().split("\n");n[r]=e,e=n.join("\n")}t.val(e)},phpbb.search.setValueOnClick=function(t,e,a,r){a.click(function(){phpbb.search.setValue(t,e.result,t.attr("data-multiline")),r.hide()})},phpbb.search.filter=function(e,a,r){var n=t(this),i=n.attr(void 0!==n.attr("data-name")?"data-name":"name"),l=parseInt(n.attr("data-min-length"),10),o=n.attr("data-results"),p=phpbb.search.getKeyword(n,e[i],n.attr("data-multiline")),c=phpbb.search.cache.get(o),s=!0;e[i]=p,c.timeout&&clearTimeout(c.timeout);var h=setTimeout(function(){if(l>p.length)s=!1;else if(c.lastSearch)if(c.lastSearch===p)s=!1;else{if(c.results[p]){var t={keyword:p,results:c.results[p]};phpbb.search.handleResponse(t,n,!0),s=!1}0===p.indexOf(c.lastSearch)&&0===c.results[c.lastSearch].length&&(phpbb.search.cache.set(o,"lastSearch",p),phpbb.search.cache.setResults(o,p,[]),s=!1)}s&&r.call(this)},350);return phpbb.search.cache.set(o,"timeout",h),!1},phpbb.search.handleResponse=function(e,a,r,n){if("object"==typeof e){var i=a.attr("data-results"),l=t(i);this.cache.get(i).callback?n=this.cache.get(i).callback:"function"==typeof n&&this.cache.set(i,"callback",n),r||this.cache.setResults(i,e.keyword,e.results),this.cache.set(i,"lastSearch",e.keyword),this.showResults(e.results,a,l,n)}},phpbb.search.showResults=function(e,a,r,n){var i=t(".search-results",r);if(this.clearResults(i),!e.length)return void r.hide();var l,o,p=r.attr("id");this.tpl[p]||(l=t(".search-result-tpl",r),this.tpl[p]=l.clone().removeClass("search-result-tpl"),l.remove()),l=this.tpl[p],t.each(e,function(t,e){o=l.clone(),o.find(".search-result").html(e.display),"function"==typeof n&&n.call(this,a,e,o,r),o.appendTo(i).show()}),r.show()},phpbb.search.clearResults=function(t){t.children(":not(.search-result-tpl)").remove()},t("#phpbb").click(function(){var e=t(this);e.is(".live-search")||e.parents().is(".live-search")||t(".live-search").hide()}),phpbb.history={},phpbb.history.isSupported=function(t){return!("undefined"==typeof history||"undefined"==typeof history[t])},phpbb.history.alterUrl=function(t,e,a,r){var n=t+"State";e&&phpbb.history.isSupported(n)&&(a||(a=document.title),r||(r=null),history[n](r,a,e))},phpbb.history.replaceUrl=function(t,e,a){phpbb.history.alterUrl("replace",t,e,a)},phpbb.history.pushUrl=function(t,e,a){phpbb.history.alterUrl("push",t,e,a)},phpbb.ajaxCallbacks={},phpbb.addAjaxCallback=function(t,e){return"function"==typeof e&&(phpbb.ajaxCallbacks[t]=e),this},phpbb.addAjaxCallback("member_search",function(e){phpbb.search.handleResponse(e,t(this),!1,phpbb.getFunctionByName("phpbb.search.setValueOnClick"))}),phpbb.addAjaxCallback("alt_text",function(){var e,a,r=t(this).data("update-all");e=t(void 0!==r&&r.length?r:this),e.each(function(){var e=t(this);a=e.attr("data-alt-text"),e.attr("data-alt-text",e.text()),e.attr("title",t.trim(a)),e.text(a)})}),phpbb.addAjaxCallback("toggle_link",function(){var e,a,r,n,i=t(this).data("update-all");e=t(void 0!==i&&i.length?i:this),e.each(function(){var e=t(this);a=e.attr("data-toggle-text"),e.attr("data-toggle-text",e.text()),e.attr("title",t.trim(a)),e.text(a),r=e.attr("data-toggle-url"),e.attr("data-toggle-url",e.attr("href")),e.attr("href",r),n=e.attr("data-toggle-class"),e.attr("data-toggle-class",e.parent().attr("class")),e.parent().attr("class",n)})}),phpbb.applyCodeEditor=function(e){function r(){return phpbb.inBBCodeTag(e,l,p)}function n(t){var a=e.selectionStart,r=e.value,n=r.lastIndexOf("\n",a-1);if(r=r.substring(n+1,a),t)for(var i=0;i<l.length;i++)if(n=r.lastIndexOf(l[i]),n>=0){var p=l[i].length;r=r.substring(n+p),l[i].lastIndexOf(o)!==p&&(n=r.indexOf(o),n>=0&&(r=r.substr(n+1)))}return r}function i(t){var a=e.selectionStart,r=e.selectionEnd,n=e.value;e.value=n.substr(0,a)+t+n.substr(r),e.selectionStart=e.selectionEnd=a+t.length}var l=["[code]","[code="],o="]",p=["[/code]"];e&&"number"==typeof e.selectionStart&&t(e).data("code-editor")!==!0&&t(e).data("code-editor",!0).on("keydown",function(t){var e=t.keyCode||t.which;if(!(e!==a.TAB||t.ctrlKey||t.shiftKey||t.altKey||t.metaKey)&&r())return i("	"),void t.preventDefault();if(e===a.ENTER&&r()){var l=n(!0),o=""+/^\s*/g.exec(l);o.length>0&&(i("\n"+o),t.preventDefault())}})},phpbb.colorPalette=function(t,e,a){var r,n,i,l=new Array(6),o="",p="";l[0]="00",l[1]="40",l[2]="80",l[3]="BF",l[4]="FF";var c="h"===t?"horizontal-palette":"vertical-palette";for(p+='<table class="not-responsive colour-palette '+c+'" style="width: auto;">',r=0;5>r;r++){for("h"===t&&(p+="<tr>"),n=0;5>n;n++){for("v"===t&&(p+="<tr>"),i=0;5>i;i++)o=""+l[r]+l[n]+l[i],p+='<td style="background-color: #'+o+"; width: "+e+"px; height: "+a+'px;"><a href="#" data-color="'+o+'" style="display: block; width: '+e+"px; height: "+a+'px; " alt="#'+o+'" title="#'+o+'"></a>',p+="</td>";"v"===t&&(p+="</tr>")}"h"===t&&(p+="</tr>")}return p+="</table>"},phpbb.registerPalette=function(e){var a=e.attr("data-orientation"),r=e.attr("data-height"),n=e.attr("data-width"),i=e.attr("data-target"),l=e.attr("data-bbcode");e.html(phpbb.colorPalette(a,n,r)),t("#color_palette_toggle").click(function(t){e.toggle(),t.preventDefault()}),t(e).on("click","a",function(e){var a=t(this).attr("data-color");l?bbfontstyle("[color=#"+a+"]","[/color]"):t(i).val(a),e.preventDefault()})},phpbb.toggleDisplay=function(e,a,r){r||(r="block");var n=t("#"+e),i=n.css("display");a||(a=""===i||i===r?-1:1),n.css("display",1===a?r:"none")},phpbb.toggleSelectSettings=function(e){e.children().each(function(){var e=t(this),a=t(e.data("toggle-setting"));a.toggle(e.is(":selected"))})},phpbb.getFunctionByName=function(t){for(var e=t.split("."),a=e.pop(),r=window,n=0;n<e.length;n++)r=r[e[n]];return r[a]},phpbb.lazyLoadAvatars=function(){t(".avatar[data-src]").each(function(){var e=t(this);e.attr("src",e.data("src")).removeAttr("data-src")})},t(window).load(phpbb.lazyLoadAvatars),t(function(){t("textarea[data-bbcode]").each(function(){phpbb.applyCodeEditor(this)}),t("#color_palette_placeholder").each(function(){phpbb.registerPalette(t(this))}),phpbb.history.replaceUrl(t("#unread[data-url]").data("url")),t("select[data-togglable-settings]").each(function(){var e=t(this);e.change(function(){phpbb.toggleSelectSettings(e)}),phpbb.toggleSelectSettings(e)})})}(jQuery);