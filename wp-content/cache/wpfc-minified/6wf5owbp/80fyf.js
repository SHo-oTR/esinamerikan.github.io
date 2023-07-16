!function(){"use strict";const e=e=>Math.abs(parseInt(e,10)),t=(e,t)=>{const r=new Map([["init","init"],["validation_failed","invalid"],["acceptance_missing","unaccepted"],["spam","spam"],["aborted","aborted"],["mail_sent","sent"],["mail_failed","failed"],["submitting","submitting"],["resetting","resetting"],["payment_required","payment-required"]]);r.has(t)&&(t=r.get(t)),Array.from(r.values()).includes(t)||(t=`custom-${t=(t=t.replace(/[^0-9a-z]+/i," ").trim()).replace(/\s+/,"-")}`);const n=e.getAttribute("data-status");return e.wpcf7.status=t,e.setAttribute("data-status",t),e.classList.add(t),n&&n!==t&&e.classList.remove(n),t},r=(e,t,r)=>{const n=new CustomEvent(`wpcf7${t}`,{bubbles:!0,detail:r});"string"==typeof e&&(e=document.querySelector(e)),e.dispatchEvent(n)},n=e=>{const{root:t,namespace:r="contact-form-7/v1"}=wpcf7.api;return a.reduceRight(((e,t)=>r=>t(r,e)),(e=>{let n,a,{url:c,path:s,endpoint:o,headers:i,body:l,data:p,...d}=e;"string"==typeof o&&(n=r.replace(/^\/|\/$/g,""),a=o.replace(/^\//,""),s=a?n+"/"+a:n),"string"==typeof s&&(-1!==t.indexOf("?")&&(s=s.replace("?","&")),s=s.replace(/^\//,""),c=t+s),i={Accept:"application/json, */*;q=0.1",...i},delete i["X-WP-Nonce"],p&&(l=JSON.stringify(p),i["Content-Type"]="application/json");const u={code:"fetch_error",message:"You are probably offline."},f={code:"invalid_json",message:"The response is not a valid JSON response."};return window.fetch(c||s||window.location.href,{...d,headers:i,body:l}).then((e=>Promise.resolve(e).then((e=>{if(e.status>=200&&e.status<300)return e;throw e})).then((e=>{if(204===e.status)return null;if(e&&e.json)return e.json().catch((()=>{throw f}));throw f}))),(()=>{throw u}))}))(e)},a=[];function c(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(wpcf7.blocked)return s(e),void t(e,"submitting");const c=new FormData(e);a.submitter&&a.submitter.name&&c.append(a.submitter.name,a.submitter.value);const o={contactFormId:e.wpcf7.id,pluginVersion:e.wpcf7.pluginVersion,contactFormLocale:e.wpcf7.locale,unitTag:e.wpcf7.unitTag,containerPostId:e.wpcf7.containerPost,status:e.wpcf7.status,inputs:Array.from(c,(e=>{const t=e[0],r=e[1];return!t.match(/^_/)&&{name:t,value:r}})).filter((e=>!1!==e)),formData:c},i=t=>{const r=document.createElement("li");r.setAttribute("id",t.error_id),t.idref?r.insertAdjacentHTML("beforeend",`<a href="#${t.idref}">${t.message}</a>`):r.insertAdjacentText("beforeend",t.message),e.wpcf7.parent.querySelector(".screen-reader-response ul").appendChild(r)},l=t=>{const r=e.querySelector(t.into),n=r.querySelector(".wpcf7-form-control");n.classList.add("wpcf7-not-valid"),n.setAttribute("aria-describedby",t.error_id);const a=document.createElement("span");a.setAttribute("class","wpcf7-not-valid-tip"),a.setAttribute("aria-hidden","true"),a.insertAdjacentText("beforeend",t.message),r.appendChild(a),r.querySelectorAll("[aria-invalid]").forEach((e=>{e.setAttribute("aria-invalid","true")})),n.closest(".use-floating-validation-tip")&&(n.addEventListener("focus",(e=>{a.setAttribute("style","display: none")})),a.addEventListener("mouseover",(e=>{a.setAttribute("style","display: none")})))};n({endpoint:`contact-forms/${e.wpcf7.id}/feedback`,method:"POST",body:c,wpcf7:{endpoint:"feedback",form:e,detail:o}}).then((n=>{const a=t(e,n.status);return o.status=n.status,o.apiResponse=n,["invalid","unaccepted","spam","aborted"].includes(a)?r(e,a,o):["sent","failed"].includes(a)&&r(e,`mail${a}`,o),r(e,"submit",o),n})).then((t=>{t.posted_data_hash&&(e.querySelector('input[name="_wpcf7_posted_data_hash"]').value=t.posted_data_hash),"mail_sent"===t.status&&(e.reset(),e.wpcf7.resetOnMailSent=!0),t.invalid_fields&&(t.invalid_fields.forEach(i),t.invalid_fields.forEach(l)),e.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').insertAdjacentText("beforeend",t.message),e.querySelectorAll(".wpcf7-response-output").forEach((e=>{e.innerText=t.message}))})).catch((e=>console.error(e)))}n.use=e=>{a.unshift(e)},n.use(((e,n)=>{if(e.wpcf7&&"feedback"===e.wpcf7.endpoint){const{form:n,detail:a}=e.wpcf7;s(n),r(n,"beforesubmit",a),t(n,"submitting")}return n(e)}));const s=e=>{e.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').innerText="",e.wpcf7.parent.querySelector(".screen-reader-response ul").innerText="",e.querySelectorAll(".wpcf7-not-valid-tip").forEach((e=>{e.remove()})),e.querySelectorAll("[aria-invalid]").forEach((e=>{e.setAttribute("aria-invalid","false")})),e.querySelectorAll(".wpcf7-form-control").forEach((e=>{e.removeAttribute("aria-describedby"),e.classList.remove("wpcf7-not-valid")})),e.querySelectorAll(".wpcf7-response-output").forEach((e=>{e.innerText=""}))};function o(e){const a=new FormData(e),c={contactFormId:e.wpcf7.id,pluginVersion:e.wpcf7.pluginVersion,contactFormLocale:e.wpcf7.locale,unitTag:e.wpcf7.unitTag,containerPostId:e.wpcf7.containerPost,status:e.wpcf7.status,inputs:Array.from(a,(e=>{const t=e[0],r=e[1];return!t.match(/^_/)&&{name:t,value:r}})).filter((e=>!1!==e)),formData:a};n({endpoint:`contact-forms/${e.wpcf7.id}/refill`,method:"GET",wpcf7:{endpoint:"refill",form:e,detail:c}}).then((n=>{e.wpcf7.resetOnMailSent?(delete e.wpcf7.resetOnMailSent,t(e,"mail_sent")):t(e,"init"),c.apiResponse=n,r(e,"reset",c)})).catch((e=>console.error(e)))}n.use(((e,r)=>{if(e.wpcf7&&"refill"===e.wpcf7.endpoint){const{form:r,detail:n}=e.wpcf7;s(r),t(r,"resetting")}return r(e)}));const i=(e,t)=>{for(const r in t){const n=t[r];e.querySelectorAll(`input[name="${r}"]`).forEach((e=>{e.value=""})),e.querySelectorAll(`img.wpcf7-captcha-${r}`).forEach((e=>{e.setAttribute("src",n)}));const a=/([0-9]+)\.(png|gif|jpeg)$/.exec(n);a&&e.querySelectorAll(`input[name="_wpcf7_captcha_challenge_${r}"]`).forEach((e=>{e.value=a[1]}))}},l=(e,t)=>{for(const r in t){const n=t[r][0],a=t[r][1];e.querySelectorAll(`.wpcf7-form-control-wrap.${r}`).forEach((e=>{e.querySelector(`input[name="${r}"]`).value="",e.querySelector(".wpcf7-quiz-label").textContent=n,e.querySelector(`input[name="_wpcf7_quiz_answer_${r}"]`).value=a}))}};function p(t){const r=new FormData(t);t.wpcf7={id:e(r.get("_wpcf7")),status:t.getAttribute("data-status"),pluginVersion:r.get("_wpcf7_version"),locale:r.get("_wpcf7_locale"),unitTag:r.get("_wpcf7_unit_tag"),containerPost:e(r.get("_wpcf7_container_post")),parent:t.closest(".wpcf7")},t.querySelectorAll(".has-spinner").forEach((e=>{e.insertAdjacentHTML("afterend",'<span class="wpcf7-spinner"></span>')})),(e=>{e.querySelectorAll(".wpcf7-exclusive-checkbox").forEach((t=>{t.addEventListener("change",(t=>{const r=t.target.getAttribute("name");e.querySelectorAll(`input[type="checkbox"][name="${r}"]`).forEach((e=>{e!==t.target&&(e.checked=!1)}))}))}))})(t),(e=>{e.querySelectorAll(".has-free-text").forEach((t=>{const r=t.querySelector("input.wpcf7-free-text"),n=t.querySelector('input[type="checkbox"], input[type="radio"]');r.disabled=!n.checked,e.addEventListener("change",(e=>{r.disabled=!n.checked,e.target===n&&n.checked&&r.focus()}))}))})(t),(e=>{e.querySelectorAll(".wpcf7-validates-as-url").forEach((e=>{e.addEventListener("change",(t=>{let r=e.value.trim();r&&!r.match(/^[a-z][a-z0-9.+-]*:/i)&&-1!==r.indexOf(".")&&(r=r.replace(/^\/+/,""),r="http://"+r),e.value=r}))}))})(t),(e=>{if(!e.querySelector(".wpcf7-acceptance")||e.classList.contains("wpcf7-acceptance-as-validation"))return;const t=()=>{let t=!0;e.querySelectorAll(".wpcf7-acceptance").forEach((e=>{if(!t||e.classList.contains("optional"))return;const r=e.querySelector('input[type="checkbox"]');(e.classList.contains("invert")&&r.checked||!e.classList.contains("invert")&&!r.checked)&&(t=!1)})),e.querySelectorAll(".wpcf7-submit").forEach((e=>{e.disabled=!t}))};t(),e.addEventListener("change",(e=>{t()})),e.addEventListener("wpcf7reset",(e=>{t()}))})(t),(t=>{const r=(t,r)=>{const n=e(t.getAttribute("data-starting-value")),a=e(t.getAttribute("data-maximum-value")),c=e(t.getAttribute("data-minimum-value")),s=t.classList.contains("down")?n-r.value.length:r.value.length;t.setAttribute("data-current-value",s),t.innerText=s,a&&a<r.value.length?t.classList.add("too-long"):t.classList.remove("too-long"),c&&r.value.length<c?t.classList.add("too-short"):t.classList.remove("too-short")},n=e=>{e={init:!1,...e},t.querySelectorAll(".wpcf7-character-count").forEach((n=>{const a=n.getAttribute("data-target-name"),c=t.querySelector(`[name="${a}"]`);c&&(c.value=c.defaultValue,r(n,c),e.init&&c.addEventListener("keyup",(e=>{r(n,c)})))}))};n({init:!0}),t.addEventListener("wpcf7reset",(e=>{n()}))})(t),window.addEventListener("load",(e=>{wpcf7.cached&&t.reset()})),t.addEventListener("reset",(e=>{wpcf7.reset(t)})),t.addEventListener("submit",(e=>{const r=e.submitter;wpcf7.submit(t,{submitter:r}),e.preventDefault()})),t.addEventListener("wpcf7submit",(e=>{e.detail.apiResponse.captcha&&i(t,e.detail.apiResponse.captcha),e.detail.apiResponse.quiz&&l(t,e.detail.apiResponse.quiz)})),t.addEventListener("wpcf7reset",(e=>{e.detail.apiResponse.captcha&&i(t,e.detail.apiResponse.captcha),e.detail.apiResponse.quiz&&l(t,e.detail.apiResponse.quiz)}))}document.addEventListener("DOMContentLoaded",(e=>{var t;if("undefined"==typeof wpcf7)return void console.error("wpcf7 is not defined.");if(void 0===wpcf7.api)return void console.error("wpcf7.api is not defined.");if("function"!=typeof window.fetch)return void console.error("Your browser doesn't support window.fetch().");if("function"!=typeof window.FormData)return void console.error("Your browser doesn't support window.FormData().");const r=document.querySelectorAll(".wpcf7 > form");"function"==typeof r.forEach?(wpcf7={init:p,submit:c,reset:o,...null!==(t=wpcf7)&&void 0!==t?t:{}},r.forEach((e=>wpcf7.init(e)))):console.error("Your browser doesn't support NodeList.forEach().")}))}();
;(function (factory){
if(typeof define==='function'&&define.amd){
define(['jquery'], factory);
}else if(typeof exports==='object'){
module.exports=factory(require('jquery'));
}else{
factory(jQuery);
}}(function ($){
var eventNamespace='waitForImages';
var hasSrcset=(function(img){
return img.srcset&&img.sizes;
})(new Image());
$.waitForImages={
hasImageProperties: [
'backgroundImage',
'listStyleImage',
'borderImage',
'borderCornerImage',
'cursor'
],
hasImageAttributes: ['srcset']
};
$.expr[':']['has-src']=function (obj){
return $(obj).is('img[src][src!=""]');
};
$.expr[':'].uncached=function (obj){
if(!$(obj).is(':has-src')){
return false;
}
return !obj.complete;
};
$.fn.waitForImages=function (){
var allImgsLength=0;
var allImgsLoaded=0;
var deferred=$.Deferred();
var originalCollection=this;
var allImgs=[];
var hasImgProperties=$.waitForImages.hasImageProperties||[];
var hasImageAttributes=$.waitForImages.hasImageAttributes||[];
var matchUrl=/url\(\s*(['"]?)(.*?)\1\s*\)/g;
var finishedCallback;
var eachCallback;
var waitForAll;
if($.isPlainObject(arguments[0])){
waitForAll=arguments[0].waitForAll;
eachCallback=arguments[0].each;
finishedCallback=arguments[0].finished;
}else{
if(arguments.length===1&&$.type(arguments[0])==='boolean'){
waitForAll=arguments[0];
}else{
finishedCallback=arguments[0];
eachCallback=arguments[1];
waitForAll=arguments[2];
}}
finishedCallback=finishedCallback||$.noop;
eachCallback=eachCallback||$.noop;
waitForAll = !! waitForAll;
if(!$.isFunction(finishedCallback)||!$.isFunction(eachCallback)){
throw new TypeError('An invalid callback was supplied.');
}
this.each(function (){
var obj=$(this);
if(waitForAll){
obj.find('*').addBack().each(function (){
var element=$(this);
if(element.is('img:has-src') &&
!element.is('[srcset]')){
allImgs.push({
src: element.attr('src'),
element: element[0]
});
}
$.each(hasImgProperties, function (i, property){
var propertyValue=element.css(property);
var match;
if(!propertyValue){
return true;
}
while (match=matchUrl.exec(propertyValue)){
allImgs.push({
src: match[2],
element: element[0]
});
}});
$.each(hasImageAttributes, function (i, attribute){
var attributeValue=element.attr(attribute);
var attributeValues;
if(!attributeValue){
return true;
}
allImgs.push({
src: element.attr('src'),
srcset: element.attr('srcset'),
element: element[0]
});
});
});
}else{
obj.find('img:has-src')
.each(function (){
allImgs.push({
src: this.src,
element: this
});
});
}});
allImgsLength=allImgs.length;
allImgsLoaded=0;
if(allImgsLength===0){
finishedCallback.call(originalCollection);
deferred.resolveWith(originalCollection);
}
$.each(allImgs, function (i, img){
var image=new Image();
var events =
'load.' + eventNamespace + ' error.' + eventNamespace;
$(image).one(events, function me (event){
var eachArguments=[
allImgsLoaded,
allImgsLength,
event.type=='load'
];
allImgsLoaded++;
eachCallback.apply(img.element, eachArguments);
deferred.notifyWith(img.element, eachArguments);
$(this).off(events, me);
if(allImgsLoaded==allImgsLength){
finishedCallback.call(originalCollection[0]);
deferred.resolveWith(originalCollection[0]);
return false;
}});
if(hasSrcset&&img.srcset){
image.srcset=img.srcset;
image.sizes=img.sizes;
}
image.src=img.src;
});
return deferred.promise();
};}));
;(function($){
'use strict';
$.fn.fitVids=function(options){
var settings={
customSelector: null,
ignore: null
};
if(!document.getElementById('fit-vids-style')){
var head=document.head||document.getElementsByTagName('head')[0];
var css='.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
var div=document.createElement("div");
div.innerHTML='<p>x</p><style id="fit-vids-style">' + css + '</style>';
head.appendChild(div.childNodes[1]);
}
if(options){
$.extend(settings, options);
}
return this.each(function(){
var selectors=[
'iframe[src*="player.vimeo.com"]',
'iframe[src*="youtube.com"]',
'iframe[src*="youtube-nocookie.com"]',
'iframe[src*="kickstarter.com"][src*="video.html"]',
'object',
'embed'
];
if(settings.customSelector){
selectors.push(settings.customSelector);
}
var ignoreList='.fitvidsignore';
if(settings.ignore){
ignoreList=ignoreList + ', ' + settings.ignore;
}
var $allVideos=$(this).find(selectors.join(','));
$allVideos=$allVideos.not('object object');
$allVideos=$allVideos.not(ignoreList);
$allVideos.each(function(){
var $this=$(this);
if($this.parents(ignoreList).length > 0){
return;
}
if(this.tagName.toLowerCase()==='embed'&&$this.parent('object').length||$this.parent('.fluid-width-video-wrapper').length){ return; }
if((!$this.css('height')&&!$this.css('width'))&&(isNaN($this.attr('height'))||isNaN($this.attr('width')))){
$this.attr('height', 9);
$this.attr('width', 16);
}
var height=(this.tagName.toLowerCase()==='object'||($this.attr('height')&&!isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10):$this.height(),
width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10):$this.width(),
aspectRatio=height / width;
if(!$this.attr('name')){
var videoName='fitvid' + $.fn.fitVids._count;
$this.attr('name', videoName);
$.fn.fitVids._count++;
}
$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
$this.removeAttr('height').removeAttr('width');
});
});
};
$.fn.fitVids._count=0;
})(window.jQuery||window.Zepto);
;(function(factory){
'use strict';
if(typeof define==='function'&&define.amd){
define(['jquery'], factory);
}else if(typeof exports!=='undefined'){
module.exports=factory(require('jquery'));
}else{
factory(jQuery);
}}(function($){
'use strict';
var Slick=window.Slick||{};
Slick=(function(){
var instanceUid=0;
function Slick(element, settings){
var _=this, dataSettings;
_.defaults={
accessibility: true,
adaptiveHeight: false,
appendArrows: $(element),
appendDots: $(element),
arrows: true,
asNavFor: null,
prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
autoplay: false,
autoplaySpeed: 3000,
centerMode: false,
centerPadding: '50px',
cssEase: 'ease',
customPaging: function(slider, i){
return $('<button type="button" />').text(i + 1);
},
dots: false,
dotsClass: 'slick-dots',
draggable: true,
easing: 'linear',
edgeFriction: 0.35,
fade: false,
focusOnSelect: false,
infinite: true,
initialSlide: 0,
lazyLoad: 'ondemand',
mobileFirst: false,
pauseOnHover: true,
pauseOnFocus: true,
pauseOnDotsHover: false,
respondTo: 'window',
responsive: null,
rows: 1,
rtl: false,
slide: '',
slidesPerRow: 1,
slidesToShow: 1,
slidesToScroll: 1,
speed: 500,
swipe: true,
swipeToSlide: false,
touchMove: true,
touchThreshold: 5,
useCSS: true,
useTransform: true,
variableWidth: false,
vertical: false,
verticalSwiping: false,
waitForAnimate: true,
zIndex: 1000
};
_.initials={
animating: false,
dragging: false,
autoPlayTimer: null,
currentDirection: 0,
currentLeft: null,
currentSlide: 0,
direction: 1,
$dots: null,
listWidth: null,
listHeight: null,
loadIndex: 0,
$nextArrow: null,
$prevArrow: null,
scrolling: false,
slideCount: null,
slideWidth: null,
$slideTrack: null,
$slides: null,
sliding: false,
slideOffset: 0,
swipeLeft: null,
swiping: false,
$list: null,
touchObject: {},
transformsEnabled: false,
unslicked: false
};
$.extend(_, _.initials);
_.activeBreakpoint=null;
_.animType=null;
_.animProp=null;
_.breakpoints=[];
_.breakpointSettings=[];
_.cssTransitions=false;
_.focussed=false;
_.interrupted=false;
_.hidden='hidden';
_.paused=true;
_.positionProp=null;
_.respondTo=null;
_.rowCount=1;
_.shouldClick=true;
_.$slider=$(element);
_.$slidesCache=null;
_.transformType=null;
_.transitionType=null;
_.visibilityChange='visibilitychange';
_.windowWidth=0;
_.windowTimer=null;
dataSettings=$(element).data('slick')||{};
_.options=$.extend({}, _.defaults, settings, dataSettings);
_.currentSlide=_.options.initialSlide;
_.originalSettings=_.options;
if(typeof document.mozHidden!=='undefined'){
_.hidden='mozHidden';
_.visibilityChange='mozvisibilitychange';
}else if(typeof document.webkitHidden!=='undefined'){
_.hidden='webkitHidden';
_.visibilityChange='webkitvisibilitychange';
}
_.autoPlay=$.proxy(_.autoPlay, _);
_.autoPlayClear=$.proxy(_.autoPlayClear, _);
_.autoPlayIterator=$.proxy(_.autoPlayIterator, _);
_.changeSlide=$.proxy(_.changeSlide, _);
_.clickHandler=$.proxy(_.clickHandler, _);
_.selectHandler=$.proxy(_.selectHandler, _);
_.setPosition=$.proxy(_.setPosition, _);
_.swipeHandler=$.proxy(_.swipeHandler, _);
_.dragHandler=$.proxy(_.dragHandler, _);
_.keyHandler=$.proxy(_.keyHandler, _);
_.instanceUid=instanceUid++;
_.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/;
_.registerBreakpoints();
_.init(true);
}
return Slick;
}());
Slick.prototype.activateADA=function(){
var _=this;
_.$slideTrack.find('.slick-active').attr({
'aria-hidden': 'false'
}).find('a, input, button, select').attr({
'tabindex': '0'
});
};
Slick.prototype.addSlide=Slick.prototype.slickAdd=function(markup, index, addBefore){
var _=this;
if(typeof(index)==='boolean'){
addBefore=index;
index=null;
}else if(index < 0||(index >=_.slideCount)){
return false;
}
_.unload();
if(typeof(index)==='number'){
if(index===0&&_.$slides.length===0){
$(markup).appendTo(_.$slideTrack);
}else if(addBefore){
$(markup).insertBefore(_.$slides.eq(index));
}else{
$(markup).insertAfter(_.$slides.eq(index));
}}else{
if(addBefore===true){
$(markup).prependTo(_.$slideTrack);
}else{
$(markup).appendTo(_.$slideTrack);
}}
_.$slides=_.$slideTrack.children(this.options.slide);
_.$slideTrack.children(this.options.slide).detach();
_.$slideTrack.append(_.$slides);
_.$slides.each(function(index, element){
$(element).attr('data-slick-index', index);
});
_.$slidesCache=_.$slides;
_.reinit();
};
Slick.prototype.animateHeight=function(){
var _=this;
if(_.options.slidesToShow===1&&_.options.adaptiveHeight===true&&_.options.vertical===false){
var targetHeight=_.$slides.eq(_.currentSlide).outerHeight(true);
_.$list.animate({
height: targetHeight
}, _.options.speed);
}};
Slick.prototype.animateSlide=function(targetLeft, callback){
var animProps={},
_=this;
_.animateHeight();
if(_.options.rtl===true&&_.options.vertical===false){
targetLeft=-targetLeft;
}
if(_.transformsEnabled===false){
if(_.options.vertical===false){
_.$slideTrack.animate({
left: targetLeft
}, _.options.speed, _.options.easing, callback);
}else{
_.$slideTrack.animate({
top: targetLeft
}, _.options.speed, _.options.easing, callback);
}}else{
if(_.cssTransitions===false){
if(_.options.rtl===true){
_.currentLeft=-(_.currentLeft);
}
$({
animStart: _.currentLeft
}).animate({
animStart: targetLeft
}, {
duration: _.options.speed,
easing: _.options.easing,
step: function(now){
now=Math.ceil(now);
if(_.options.vertical===false){
animProps[_.animType]='translate(' +
now + 'px, 0px)';
_.$slideTrack.css(animProps);
}else{
animProps[_.animType]='translate(0px,' +
now + 'px)';
_.$slideTrack.css(animProps);
}},
complete: function(){
if(callback){
callback.call();
}}
});
}else{
_.applyTransition();
targetLeft=Math.ceil(targetLeft);
if(_.options.vertical===false){
animProps[_.animType]='translate3d(' + targetLeft + 'px, 0px, 0px)';
}else{
animProps[_.animType]='translate3d(0px,' + targetLeft + 'px, 0px)';
}
_.$slideTrack.css(animProps);
if(callback){
setTimeout(function(){
_.disableTransition();
callback.call();
}, _.options.speed);
}}
}};
Slick.prototype.getNavTarget=function(){
var _=this,
asNavFor=_.options.asNavFor;
if(asNavFor&&asNavFor!==null){
asNavFor=$(asNavFor).not(_.$slider);
}
return asNavFor;
};
Slick.prototype.asNavFor=function(index){
var _=this,
asNavFor=_.getNavTarget();
if(asNavFor!==null&&typeof asNavFor==='object'){
asNavFor.each(function(){
var target=$(this).slick('getSlick');
if(!target.unslicked){
target.slideHandler(index, true);
}});
}};
Slick.prototype.applyTransition=function(slide){
var _=this,
transition={};
if(_.options.fade===false){
transition[_.transitionType]=_.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
}else{
transition[_.transitionType]='opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
}
if(_.options.fade===false){
_.$slideTrack.css(transition);
}else{
_.$slides.eq(slide).css(transition);
}};
Slick.prototype.autoPlay=function(){
var _=this;
_.autoPlayClear();
if(_.slideCount > _.options.slidesToShow){
_.autoPlayTimer=setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
}};
Slick.prototype.autoPlayClear=function(){
var _=this;
if(_.autoPlayTimer){
clearInterval(_.autoPlayTimer);
}};
Slick.prototype.autoPlayIterator=function(){
var _=this,
slideTo=_.currentSlide + _.options.slidesToScroll;
if(!_.paused&&!_.interrupted&&!_.focussed){
if(_.options.infinite===false){
if(_.direction===1&&(_.currentSlide + 1)===(_.slideCount - 1)){
_.direction=0;
}
else if(_.direction===0){
slideTo=_.currentSlide - _.options.slidesToScroll;
if(_.currentSlide - 1===0){
_.direction=1;
}}
}
_.slideHandler(slideTo);
}};
Slick.prototype.buildArrows=function(){
var _=this;
if(_.options.arrows===true){
_.$prevArrow=$(_.options.prevArrow).addClass('slick-arrow');
_.$nextArrow=$(_.options.nextArrow).addClass('slick-arrow');
if(_.slideCount > _.options.slidesToShow){
_.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
_.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
if(_.htmlExpr.test(_.options.prevArrow)){
_.$prevArrow.prependTo(_.options.appendArrows);
}
if(_.htmlExpr.test(_.options.nextArrow)){
_.$nextArrow.appendTo(_.options.appendArrows);
}
if(_.options.infinite!==true){
_.$prevArrow
.addClass('slick-disabled')
.attr('aria-disabled', 'true');
}}else{
_.$prevArrow.add(_.$nextArrow)
.addClass('slick-hidden')
.attr({
'aria-disabled': 'true',
'tabindex': '-1'
});
}}
};
Slick.prototype.buildDots=function(){
var _=this,
i, dot;
if(_.options.dots===true){
_.$slider.addClass('slick-dotted');
dot=$('<ul />').addClass(_.options.dotsClass);
for (i=0; i <=_.getDotCount(); i +=1){
dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
}
_.$dots=dot.appendTo(_.options.appendDots);
_.$dots.find('li').first().addClass('slick-active');
}};
Slick.prototype.buildOut=function(){
var _=this;
_.$slides =
_.$slider
.children(_.options.slide + ':not(.slick-cloned)')
.addClass('slick-slide');
_.slideCount=_.$slides.length;
_.$slides.each(function(index, element){
$(element)
.attr('data-slick-index', index)
.data('originalStyling', $(element).attr('style')||'');
});
_.$slider.addClass('slick-slider');
_.$slideTrack=(_.slideCount===0) ?
$('<div class="slick-track"/>').appendTo(_.$slider) :
_.$slides.wrapAll('<div class="slick-track"/>').parent();
_.$list=_.$slideTrack.wrap('<div class="slick-list"/>').parent();
_.$slideTrack.css('opacity', 0);
if(_.options.centerMode===true||_.options.swipeToSlide===true){
_.options.slidesToScroll=1;
}
$('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');
_.setupInfinite();
_.buildArrows();
_.buildDots();
_.updateDots();
_.setSlideClasses(typeof _.currentSlide==='number' ? _.currentSlide:0);
if(_.options.draggable===true){
_.$list.addClass('draggable');
}};
Slick.prototype.buildRows=function(){
var _=this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;
newSlides=document.createDocumentFragment();
originalSlides=_.$slider.children();
if(_.options.rows > 1){
slidesPerSection=_.options.slidesPerRow * _.options.rows;
numOfSlides=Math.ceil(originalSlides.length / slidesPerSection
);
for(a=0; a < numOfSlides; a++){
var slide=document.createElement('div');
for(b=0; b < _.options.rows; b++){
var row=document.createElement('div');
for(c=0; c < _.options.slidesPerRow; c++){
var target=(a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
if(originalSlides.get(target)){
row.appendChild(originalSlides.get(target));
}}
slide.appendChild(row);
}
newSlides.appendChild(slide);
}
_.$slider.empty().append(newSlides);
_.$slider.children().children().children()
.css({
'width':(100 / _.options.slidesPerRow) + '%',
'display': 'inline-block'
});
}};
Slick.prototype.checkResponsive=function(initial, forceUpdate){
var _=this,
breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint=false;
var sliderWidth=_.$slider.width();
var windowWidth=window.innerWidth||$(window).width();
if(_.respondTo==='window'){
respondToWidth=windowWidth;
}else if(_.respondTo==='slider'){
respondToWidth=sliderWidth;
}else if(_.respondTo==='min'){
respondToWidth=Math.min(windowWidth, sliderWidth);
}
if(_.options.responsive &&
_.options.responsive.length &&
_.options.responsive!==null){
targetBreakpoint=null;
for (breakpoint in _.breakpoints){
if(_.breakpoints.hasOwnProperty(breakpoint)){
if(_.originalSettings.mobileFirst===false){
if(respondToWidth < _.breakpoints[breakpoint]){
targetBreakpoint=_.breakpoints[breakpoint];
}}else{
if(respondToWidth > _.breakpoints[breakpoint]){
targetBreakpoint=_.breakpoints[breakpoint];
}}
}}
if(targetBreakpoint!==null){
if(_.activeBreakpoint!==null){
if(targetBreakpoint!==_.activeBreakpoint||forceUpdate){
_.activeBreakpoint =
targetBreakpoint;
if(_.breakpointSettings[targetBreakpoint]==='unslick'){
_.unslick(targetBreakpoint);
}else{
_.options=$.extend({}, _.originalSettings,
_.breakpointSettings[
targetBreakpoint]);
if(initial===true){
_.currentSlide=_.options.initialSlide;
}
_.refresh(initial);
}
triggerBreakpoint=targetBreakpoint;
}}else{
_.activeBreakpoint=targetBreakpoint;
if(_.breakpointSettings[targetBreakpoint]==='unslick'){
_.unslick(targetBreakpoint);
}else{
_.options=$.extend({}, _.originalSettings,
_.breakpointSettings[
targetBreakpoint]);
if(initial===true){
_.currentSlide=_.options.initialSlide;
}
_.refresh(initial);
}
triggerBreakpoint=targetBreakpoint;
}}else{
if(_.activeBreakpoint!==null){
_.activeBreakpoint=null;
_.options=_.originalSettings;
if(initial===true){
_.currentSlide=_.options.initialSlide;
}
_.refresh(initial);
triggerBreakpoint=targetBreakpoint;
}}
if(!initial&&triggerBreakpoint!==false){
_.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
}}
};
Slick.prototype.changeSlide=function(event, dontAnimate){
var _=this,
$target=$(event.currentTarget),
indexOffset, slideOffset, unevenOffset;
if($target.is('a')){
event.preventDefault();
}
if(!$target.is('li')){
$target=$target.closest('li');
}
unevenOffset=(_.slideCount % _.options.slidesToScroll!==0);
indexOffset=unevenOffset ? 0:(_.slideCount - _.currentSlide) % _.options.slidesToScroll;
switch (event.data.message){
case 'previous':
slideOffset=indexOffset===0 ? _.options.slidesToScroll:_.options.slidesToShow - indexOffset;
if(_.slideCount > _.options.slidesToShow){
_.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
}
break;
case 'next':
slideOffset=indexOffset===0 ? _.options.slidesToScroll:indexOffset;
if(_.slideCount > _.options.slidesToShow){
_.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
}
break;
case 'index':
var index=event.data.index===0 ? 0 :
event.data.index||$target.index() * _.options.slidesToScroll;
_.slideHandler(_.checkNavigable(index), false, dontAnimate);
$target.children().trigger('focus');
break;
default:
return;
}};
Slick.prototype.checkNavigable=function(index){
var _=this,
navigables, prevNavigable;
navigables=_.getNavigableIndexes();
prevNavigable=0;
if(index > navigables[navigables.length - 1]){
index=navigables[navigables.length - 1];
}else{
for (var n in navigables){
if(index < navigables[n]){
index=prevNavigable;
break;
}
prevNavigable=navigables[n];
}}
return index;
};
Slick.prototype.cleanUpEvents=function(){
var _=this;
if(_.options.dots&&_.$dots!==null){
$('li', _.$dots)
.off('click.slick', _.changeSlide)
.off('mouseenter.slick', $.proxy(_.interrupt, _, true))
.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
if(_.options.accessibility===true){
_.$dots.off('keydown.slick', _.keyHandler);
}}
_.$slider.off('focus.slick blur.slick');
if(_.options.arrows===true&&_.slideCount > _.options.slidesToShow){
_.$prevArrow&&_.$prevArrow.off('click.slick', _.changeSlide);
_.$nextArrow&&_.$nextArrow.off('click.slick', _.changeSlide);
if(_.options.accessibility===true){
_.$prevArrow.off('keydown.slick', _.keyHandler);
_.$nextArrow.off('keydown.slick', _.keyHandler);
}}
_.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
_.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
_.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
_.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);
_.$list.off('click.slick', _.clickHandler);
$(document).off(_.visibilityChange, _.visibility);
_.cleanUpSlideEvents();
if(_.options.accessibility===true){
_.$list.off('keydown.slick', _.keyHandler);
}
if(_.options.focusOnSelect===true){
$(_.$slideTrack).children().off('click.slick', _.selectHandler);
}
$(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
$(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
$('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
$(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
};
Slick.prototype.cleanUpSlideEvents=function(){
var _=this;
_.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
_.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
};
Slick.prototype.cleanUpRows=function(){
var _=this, originalSlides;
if(_.options.rows > 1){
originalSlides=_.$slides.children().children();
originalSlides.removeAttr('style');
_.$slider.empty().append(originalSlides);
}};
Slick.prototype.clickHandler=function(event){
var _=this;
if(_.shouldClick===false){
event.stopImmediatePropagation();
event.stopPropagation();
event.preventDefault();
}};
Slick.prototype.destroy=function(refresh){
var _=this;
_.autoPlayClear();
_.touchObject={};
_.cleanUpEvents();
$('.slick-cloned', _.$slider).detach();
if(_.$dots){
_.$dots.remove();
}
if(_.$prevArrow&&_.$prevArrow.length){
_.$prevArrow
.removeClass('slick-disabled slick-arrow slick-hidden')
.removeAttr('aria-hidden aria-disabled tabindex')
.css('display','');
if(_.htmlExpr.test(_.options.prevArrow)){
_.$prevArrow.remove();
}}
if(_.$nextArrow&&_.$nextArrow.length){
_.$nextArrow
.removeClass('slick-disabled slick-arrow slick-hidden')
.removeAttr('aria-hidden aria-disabled tabindex')
.css('display','');
if(_.htmlExpr.test(_.options.nextArrow)){
_.$nextArrow.remove();
}}
if(_.$slides){
_.$slides
.removeClass('slick-slide slick-active slick-center slick-visible slick-current')
.removeAttr('aria-hidden')
.removeAttr('data-slick-index')
.each(function(){
$(this).attr('style', $(this).data('originalStyling'));
});
_.$slideTrack.children(this.options.slide).detach();
_.$slideTrack.detach();
_.$list.detach();
_.$slider.append(_.$slides);
}
_.cleanUpRows();
_.$slider.removeClass('slick-slider');
_.$slider.removeClass('slick-initialized');
_.$slider.removeClass('slick-dotted');
_.unslicked=true;
if(!refresh){
_.$slider.trigger('destroy', [_]);
}};
Slick.prototype.disableTransition=function(slide){
var _=this,
transition={};
transition[_.transitionType]='';
if(_.options.fade===false){
_.$slideTrack.css(transition);
}else{
_.$slides.eq(slide).css(transition);
}};
Slick.prototype.fadeSlide=function(slideIndex, callback){
var _=this;
if(_.cssTransitions===false){
_.$slides.eq(slideIndex).css({
zIndex: _.options.zIndex
});
_.$slides.eq(slideIndex).animate({
opacity: 1
}, _.options.speed, _.options.easing, callback);
}else{
_.applyTransition(slideIndex);
_.$slides.eq(slideIndex).css({
opacity: 1,
zIndex: _.options.zIndex
});
if(callback){
setTimeout(function(){
_.disableTransition(slideIndex);
callback.call();
}, _.options.speed);
}}
};
Slick.prototype.fadeSlideOut=function(slideIndex){
var _=this;
if(_.cssTransitions===false){
_.$slides.eq(slideIndex).animate({
opacity: 0,
zIndex: _.options.zIndex - 2
}, _.options.speed, _.options.easing);
}else{
_.applyTransition(slideIndex);
_.$slides.eq(slideIndex).css({
opacity: 0,
zIndex: _.options.zIndex - 2
});
}};
Slick.prototype.filterSlides=Slick.prototype.slickFilter=function(filter){
var _=this;
if(filter!==null){
_.$slidesCache=_.$slides;
_.unload();
_.$slideTrack.children(this.options.slide).detach();
_.$slidesCache.filter(filter).appendTo(_.$slideTrack);
_.reinit();
}};
Slick.prototype.focusHandler=function(){
var _=this;
_.$slider
.off('focus.slick blur.slick')
.on('focus.slick blur.slick', '*', function(event){
event.stopImmediatePropagation();
var $sf=$(this);
setTimeout(function(){
if(_.options.pauseOnFocus){
_.focussed=$sf.is(':focus');
_.autoPlay();
}}, 0);
});
};
Slick.prototype.getCurrent=Slick.prototype.slickCurrentSlide=function(){
var _=this;
return _.currentSlide;
};
Slick.prototype.getDotCount=function(){
var _=this;
var breakPoint=0;
var counter=0;
var pagerQty=0;
if(_.options.infinite===true){
if(_.slideCount <=_.options.slidesToShow){
++pagerQty;
}else{
while (breakPoint < _.slideCount){
++pagerQty;
breakPoint=counter + _.options.slidesToScroll;
counter +=_.options.slidesToScroll <=_.options.slidesToShow ? _.options.slidesToScroll:_.options.slidesToShow;
}}
}else if(_.options.centerMode===true){
pagerQty=_.slideCount;
}else if(!_.options.asNavFor){
pagerQty=1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
}else{
while (breakPoint < _.slideCount){
++pagerQty;
breakPoint=counter + _.options.slidesToScroll;
counter +=_.options.slidesToScroll <=_.options.slidesToShow ? _.options.slidesToScroll:_.options.slidesToShow;
}}
return pagerQty - 1;
};
Slick.prototype.getLeft=function(slideIndex){
var _=this,
targetLeft,
verticalHeight,
verticalOffset=0,
targetSlide,
coef;
_.slideOffset=0;
verticalHeight=_.$slides.first().outerHeight(true);
if(_.options.infinite===true){
if(_.slideCount > _.options.slidesToShow){
_.slideOffset=(_.slideWidth * _.options.slidesToShow) * -1;
coef=-1
if(_.options.vertical===true&&_.options.centerMode===true){
if(_.options.slidesToShow===2){
coef=-1.5;
}else if(_.options.slidesToShow===1){
coef=-2
}}
verticalOffset=(verticalHeight * _.options.slidesToShow) * coef;
}
if(_.slideCount % _.options.slidesToScroll!==0){
if(slideIndex + _.options.slidesToScroll > _.slideCount&&_.slideCount > _.options.slidesToShow){
if(slideIndex > _.slideCount){
_.slideOffset=((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
verticalOffset=((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
}else{
_.slideOffset=((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
verticalOffset=((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
}}
}}else{
if(slideIndex + _.options.slidesToShow > _.slideCount){
_.slideOffset=((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
verticalOffset=((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
}}
if(_.slideCount <=_.options.slidesToShow){
_.slideOffset=0;
verticalOffset=0;
}
if(_.options.centerMode===true&&_.slideCount <=_.options.slidesToShow){
_.slideOffset=((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
}else if(_.options.centerMode===true&&_.options.infinite===true){
_.slideOffset +=_.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
}else if(_.options.centerMode===true){
_.slideOffset=0;
_.slideOffset +=_.slideWidth * Math.floor(_.options.slidesToShow / 2);
}
if(_.options.vertical===false){
targetLeft=((slideIndex * _.slideWidth) * -1) + _.slideOffset;
}else{
targetLeft=((slideIndex * verticalHeight) * -1) + verticalOffset;
}
if(_.options.variableWidth===true){
if(_.slideCount <=_.options.slidesToShow||_.options.infinite===false){
targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex);
}else{
targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
}
if(_.options.rtl===true){
if(targetSlide[0]){
targetLeft=(_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
}else{
targetLeft=0;
}}else{
targetLeft=targetSlide[0] ? targetSlide[0].offsetLeft * -1:0;
}
if(_.options.centerMode===true){
if(_.slideCount <=_.options.slidesToShow||_.options.infinite===false){
targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex);
}else{
targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
}
if(_.options.rtl===true){
if(targetSlide[0]){
targetLeft=(_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
}else{
targetLeft=0;
}}else{
targetLeft=targetSlide[0] ? targetSlide[0].offsetLeft * -1:0;
}
targetLeft +=(_.$list.width() - targetSlide.outerWidth()) / 2;
}}
return targetLeft;
};
Slick.prototype.getOption=Slick.prototype.slickGetOption=function(option){
var _=this;
return _.options[option];
};
Slick.prototype.getNavigableIndexes=function(){
var _=this,
breakPoint=0,
counter=0,
indexes=[],
max;
if(_.options.infinite===false){
max=_.slideCount;
}else{
breakPoint=_.options.slidesToScroll * -1;
counter=_.options.slidesToScroll * -1;
max=_.slideCount * 2;
}
while (breakPoint < max){
indexes.push(breakPoint);
breakPoint=counter + _.options.slidesToScroll;
counter +=_.options.slidesToScroll <=_.options.slidesToShow ? _.options.slidesToScroll:_.options.slidesToShow;
}
return indexes;
};
Slick.prototype.getSlick=function(){
return this;
};
Slick.prototype.getSlideCount=function(){
var _=this,
slidesTraversed, swipedSlide, centerOffset;
centerOffset=_.options.centerMode===true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2):0;
if(_.options.swipeToSlide===true){
_.$slideTrack.find('.slick-slide').each(function(index, slide){
if(slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)){
swipedSlide=slide;
return false;
}});
slidesTraversed=Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide)||1;
return slidesTraversed;
}else{
return _.options.slidesToScroll;
}};
Slick.prototype.goTo=Slick.prototype.slickGoTo=function(slide, dontAnimate){
var _=this;
_.changeSlide({
data: {
message: 'index',
index: parseInt(slide)
}}, dontAnimate);
};
Slick.prototype.init=function(creation){
var _=this;
if(!$(_.$slider).hasClass('slick-initialized')){
$(_.$slider).addClass('slick-initialized');
_.buildRows();
_.buildOut();
_.setProps();
_.startLoad();
_.loadSlider();
_.initializeEvents();
_.updateArrows();
_.updateDots();
_.checkResponsive(true);
_.focusHandler();
}
if(creation){
_.$slider.trigger('init', [_]);
}
if(_.options.accessibility===true){
_.initADA();
}
if(_.options.autoplay){
_.paused=false;
_.autoPlay();
}};
Slick.prototype.initADA=function(){
var _=this,
numDotGroups=Math.ceil(_.slideCount / _.options.slidesToShow),
tabControlIndexes=_.getNavigableIndexes().filter(function(val){
return (val >=0)&&(val < _.slideCount);
});
_.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
'aria-hidden': 'true',
'tabindex': '-1'
}).find('a, input, button, select').attr({
'tabindex': '-1'
});
if(_.$dots!==null){
_.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i){
var slideControlIndex=tabControlIndexes.indexOf(i);
$(this).attr({
'role': 'tabpanel',
'id': 'slick-slide' + _.instanceUid + i,
'tabindex': -1
});
if(slideControlIndex!==-1){
$(this).attr({
'aria-describedby': 'slick-slide-control' + _.instanceUid + slideControlIndex
});
}});
_.$dots.attr('role', 'tablist').find('li').each(function(i){
var mappedSlideIndex=tabControlIndexes[i];
$(this).attr({
'role': 'presentation'
});
$(this).find('button').first().attr({
'role': 'tab',
'id': 'slick-slide-control' + _.instanceUid + i,
'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
'aria-label': (i + 1) + ' of ' + numDotGroups,
'aria-selected': null,
'tabindex': '-1'
});
}).eq(_.currentSlide).find('button').attr({
'aria-selected': 'true',
'tabindex': '0'
}).end();
}
for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++){
_.$slides.eq(i).attr('tabindex', 0);
}
_.activateADA();
};
Slick.prototype.initArrowEvents=function(){
var _=this;
if(_.options.arrows===true&&_.slideCount > _.options.slidesToShow){
_.$prevArrow
.off('click.slick')
.on('click.slick', {
message: 'previous'
}, _.changeSlide);
_.$nextArrow
.off('click.slick')
.on('click.slick', {
message: 'next'
}, _.changeSlide);
if(_.options.accessibility===true){
_.$prevArrow.on('keydown.slick', _.keyHandler);
_.$nextArrow.on('keydown.slick', _.keyHandler);
}}
};
Slick.prototype.initDotEvents=function(){
var _=this;
if(_.options.dots===true){
$('li', _.$dots).on('click.slick', {
message: 'index'
}, _.changeSlide);
if(_.options.accessibility===true){
_.$dots.on('keydown.slick', _.keyHandler);
}}
if(_.options.dots===true&&_.options.pauseOnDotsHover===true){
$('li', _.$dots)
.on('mouseenter.slick', $.proxy(_.interrupt, _, true))
.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
}};
Slick.prototype.initSlideEvents=function(){
var _=this;
if(_.options.pauseOnHover){
_.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
_.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
}};
Slick.prototype.initializeEvents=function(){
var _=this;
_.initArrowEvents();
_.initDotEvents();
_.initSlideEvents();
_.$list.on('touchstart.slick mousedown.slick', {
action: 'start'
}, _.swipeHandler);
_.$list.on('touchmove.slick mousemove.slick', {
action: 'move'
}, _.swipeHandler);
_.$list.on('touchend.slick mouseup.slick', {
action: 'end'
}, _.swipeHandler);
_.$list.on('touchcancel.slick mouseleave.slick', {
action: 'end'
}, _.swipeHandler);
_.$list.on('click.slick', _.clickHandler);
$(document).on(_.visibilityChange, $.proxy(_.visibility, _));
if(_.options.accessibility===true){
_.$list.on('keydown.slick', _.keyHandler);
}
if(_.options.focusOnSelect===true){
$(_.$slideTrack).children().on('click.slick', _.selectHandler);
}
$(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
$(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
$('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
$(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
$(_.setPosition);
};
Slick.prototype.initUI=function(){
var _=this;
if(_.options.arrows===true&&_.slideCount > _.options.slidesToShow){
_.$prevArrow.show();
_.$nextArrow.show();
}
if(_.options.dots===true&&_.slideCount > _.options.slidesToShow){
_.$dots.show();
}};
Slick.prototype.keyHandler=function(event){
var _=this;
if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')){
if(event.keyCode===37&&_.options.accessibility===true){
_.changeSlide({
data: {
message: _.options.rtl===true ? 'next':'previous'
}});
}else if(event.keyCode===39&&_.options.accessibility===true){
_.changeSlide({
data: {
message: _.options.rtl===true ? 'previous':'next'
}});
}}
};
Slick.prototype.lazyLoad=function(){
var _=this,
loadRange, cloneRange, rangeStart, rangeEnd;
function loadImages(imagesScope){
$('img[data-lazy]', imagesScope).each(function(){
var image=$(this),
imageSource=$(this).attr('data-lazy'),
imageSrcSet=$(this).attr('data-srcset'),
imageSizes=$(this).attr('data-sizes')||_.$slider.attr('data-sizes'),
imageToLoad=document.createElement('img');
imageToLoad.onload=function(){
image
.animate({ opacity: 0 }, 100, function(){
if(imageSrcSet){
image
.attr('srcset', imageSrcSet);
if(imageSizes){
image
.attr('sizes', imageSizes);
}}
image
.attr('src', imageSource)
.animate({ opacity: 1 }, 200, function(){
image
.removeAttr('data-lazy data-srcset data-sizes')
.removeClass('slick-loading');
});
_.$slider.trigger('lazyLoaded', [_, image, imageSource]);
});
};
imageToLoad.onerror=function(){
image
.removeAttr('data-lazy')
.removeClass('slick-loading')
.addClass('slick-lazyload-error');
_.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);
};
imageToLoad.src=imageSource;
});
}
if(_.options.centerMode===true){
if(_.options.infinite===true){
rangeStart=_.currentSlide + (_.options.slidesToShow / 2 + 1);
rangeEnd=rangeStart + _.options.slidesToShow + 2;
}else{
rangeStart=Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
rangeEnd=2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
}}else{
rangeStart=_.options.infinite ? _.options.slidesToShow + _.currentSlide:_.currentSlide;
rangeEnd=Math.ceil(rangeStart + _.options.slidesToShow);
if(_.options.fade===true){
if(rangeStart > 0) rangeStart--;
if(rangeEnd <=_.slideCount) rangeEnd++;
}}
loadRange=_.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
if(_.options.lazyLoad==='anticipated'){
var prevSlide=rangeStart - 1,
nextSlide=rangeEnd,
$slides=_.$slider.find('.slick-slide');
for (var i=0; i < _.options.slidesToScroll; i++){
if(prevSlide < 0) prevSlide=_.slideCount - 1;
loadRange=loadRange.add($slides.eq(prevSlide));
loadRange=loadRange.add($slides.eq(nextSlide));
prevSlide--;
nextSlide++;
}}
loadImages(loadRange);
if(_.slideCount <=_.options.slidesToShow){
cloneRange=_.$slider.find('.slick-slide');
loadImages(cloneRange);
} else
if(_.currentSlide >=_.slideCount - _.options.slidesToShow){
cloneRange=_.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
loadImages(cloneRange);
}else if(_.currentSlide===0){
cloneRange=_.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
loadImages(cloneRange);
}};
Slick.prototype.loadSlider=function(){
var _=this;
_.setPosition();
_.$slideTrack.css({
opacity: 1
});
_.$slider.removeClass('slick-loading');
_.initUI();
if(_.options.lazyLoad==='progressive'){
_.progressiveLazyLoad();
}};
Slick.prototype.next=Slick.prototype.slickNext=function(){
var _=this;
_.changeSlide({
data: {
message: 'next'
}});
};
Slick.prototype.orientationChange=function(){
var _=this;
_.checkResponsive();
_.setPosition();
};
Slick.prototype.pause=Slick.prototype.slickPause=function(){
var _=this;
_.autoPlayClear();
_.paused=true;
};
Slick.prototype.play=Slick.prototype.slickPlay=function(){
var _=this;
_.autoPlay();
_.options.autoplay=true;
_.paused=false;
_.focussed=false;
_.interrupted=false;
};
Slick.prototype.postSlide=function(index){
var _=this;
if(!_.unslicked){
_.$slider.trigger('afterChange', [_, index]);
_.animating=false;
if(_.slideCount > _.options.slidesToShow){
_.setPosition();
}
_.swipeLeft=null;
if(_.options.autoplay){
_.autoPlay();
}
if(_.options.accessibility===true){
_.initADA();
if(!_.options.autoplay){
var $currentSlide=$(_.$slides.get(_.currentSlide));
$currentSlide.attr('tabindex', 0).focus();
}}
}};
Slick.prototype.prev=Slick.prototype.slickPrev=function(){
var _=this;
_.changeSlide({
data: {
message: 'previous'
}});
};
Slick.prototype.preventDefault=function(event){
event.preventDefault();
};
Slick.prototype.progressiveLazyLoad=function(tryCount){
tryCount=tryCount||1;
var _=this,
$imgsToLoad=$('img[data-lazy]', _.$slider),
image,
imageSource,
imageSrcSet,
imageSizes,
imageToLoad;
if($imgsToLoad.length){
image=$imgsToLoad.first();
imageSource=image.attr('data-lazy');
imageSrcSet=image.attr('data-srcset');
imageSizes=image.attr('data-sizes')||_.$slider.attr('data-sizes');
imageToLoad=document.createElement('img');
imageToLoad.onload=function(){
if(imageSrcSet){
image
.attr('srcset', imageSrcSet);
if(imageSizes){
image
.attr('sizes', imageSizes);
}}
image
.attr('src', imageSource)
.removeAttr('data-lazy data-srcset data-sizes')
.removeClass('slick-loading');
if(_.options.adaptiveHeight===true){
_.setPosition();
}
_.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
_.progressiveLazyLoad();
};
imageToLoad.onerror=function(){
if(tryCount < 3){
setTimeout(function(){
_.progressiveLazyLoad(tryCount + 1);
}, 500);
}else{
image
.removeAttr('data-lazy')
.removeClass('slick-loading')
.addClass('slick-lazyload-error');
_.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);
_.progressiveLazyLoad();
}};
imageToLoad.src=imageSource;
}else{
_.$slider.trigger('allImagesLoaded', [ _ ]);
}};
Slick.prototype.refresh=function(initializing){
var _=this, currentSlide, lastVisibleIndex;
lastVisibleIndex=_.slideCount - _.options.slidesToShow;
if(!_.options.infinite&&(_.currentSlide > lastVisibleIndex)){
_.currentSlide=lastVisibleIndex;
}
if(_.slideCount <=_.options.slidesToShow){
_.currentSlide=0;
}
currentSlide=_.currentSlide;
_.destroy(true);
$.extend(_, _.initials, { currentSlide: currentSlide });
_.init();
if(!initializing){
_.changeSlide({
data: {
message: 'index',
index: currentSlide
}}, false);
}};
Slick.prototype.registerBreakpoints=function(){
var _=this, breakpoint, currentBreakpoint, l,
responsiveSettings=_.options.responsive||null;
if($.type(responsiveSettings)==='array'&&responsiveSettings.length){
_.respondTo=_.options.respondTo||'window';
for(breakpoint in responsiveSettings){
l=_.breakpoints.length-1;
if(responsiveSettings.hasOwnProperty(breakpoint)){
currentBreakpoint=responsiveSettings[breakpoint].breakpoint;
while(l >=0){
if(_.breakpoints[l]&&_.breakpoints[l]===currentBreakpoint){
_.breakpoints.splice(l,1);
}
l--;
}
_.breakpoints.push(currentBreakpoint);
_.breakpointSettings[currentBreakpoint]=responsiveSettings[breakpoint].settings;
}}
_.breakpoints.sort(function(a, b){
return(_.options.mobileFirst) ? a-b:b-a;
});
}};
Slick.prototype.reinit=function(){
var _=this;
_.$slides =
_.$slideTrack
.children(_.options.slide)
.addClass('slick-slide');
_.slideCount=_.$slides.length;
if(_.currentSlide >=_.slideCount&&_.currentSlide!==0){
_.currentSlide=_.currentSlide - _.options.slidesToScroll;
}
if(_.slideCount <=_.options.slidesToShow){
_.currentSlide=0;
}
_.registerBreakpoints();
_.setProps();
_.setupInfinite();
_.buildArrows();
_.updateArrows();
_.initArrowEvents();
_.buildDots();
_.updateDots();
_.initDotEvents();
_.cleanUpSlideEvents();
_.initSlideEvents();
_.checkResponsive(false, true);
if(_.options.focusOnSelect===true){
$(_.$slideTrack).children().on('click.slick', _.selectHandler);
}
_.setSlideClasses(typeof _.currentSlide==='number' ? _.currentSlide:0);
_.setPosition();
_.focusHandler();
_.paused = !_.options.autoplay;
_.autoPlay();
_.$slider.trigger('reInit', [_]);
};
Slick.prototype.resize=function(){
var _=this;
if($(window).width()!==_.windowWidth){
clearTimeout(_.windowDelay);
_.windowDelay=window.setTimeout(function(){
_.windowWidth=$(window).width();
_.checkResponsive();
if(!_.unslicked){ _.setPosition(); }}, 50);
}};
Slick.prototype.removeSlide=Slick.prototype.slickRemove=function(index, removeBefore, removeAll){
var _=this;
if(typeof(index)==='boolean'){
removeBefore=index;
index=removeBefore===true ? 0:_.slideCount - 1;
}else{
index=removeBefore===true ? --index:index;
}
if(_.slideCount < 1||index < 0||index > _.slideCount - 1){
return false;
}
_.unload();
if(removeAll===true){
_.$slideTrack.children().remove();
}else{
_.$slideTrack.children(this.options.slide).eq(index).remove();
}
_.$slides=_.$slideTrack.children(this.options.slide);
_.$slideTrack.children(this.options.slide).detach();
_.$slideTrack.append(_.$slides);
_.$slidesCache=_.$slides;
_.reinit();
};
Slick.prototype.setCSS=function(position){
var _=this,
positionProps={},
x, y;
if(_.options.rtl===true){
position=-position;
}
x=_.positionProp=='left' ? Math.ceil(position) + 'px':'0px';
y=_.positionProp=='top' ? Math.ceil(position) + 'px':'0px';
positionProps[_.positionProp]=position;
if(_.transformsEnabled===false){
_.$slideTrack.css(positionProps);
}else{
positionProps={};
if(_.cssTransitions===false){
positionProps[_.animType]='translate(' + x + ', ' + y + ')';
_.$slideTrack.css(positionProps);
}else{
positionProps[_.animType]='translate3d(' + x + ', ' + y + ', 0px)';
_.$slideTrack.css(positionProps);
}}
};
Slick.prototype.setDimensions=function(){
var _=this;
if(_.options.vertical===false){
if(_.options.centerMode===true){
_.$list.css({
padding: ('0px ' + _.options.centerPadding)
});
}}else{
_.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
if(_.options.centerMode===true){
_.$list.css({
padding: (_.options.centerPadding + ' 0px')
});
}}
_.listWidth=_.$list.width();
_.listHeight=_.$list.height();
if(_.options.vertical===false&&_.options.variableWidth===false){
_.slideWidth=Math.ceil(_.listWidth / _.options.slidesToShow);
_.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));
}else if(_.options.variableWidth===true){
_.$slideTrack.width(5000 * _.slideCount);
}else{
_.slideWidth=Math.ceil(_.listWidth);
_.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
}
var offset=_.$slides.first().outerWidth(true) - _.$slides.first().width();
if(_.options.variableWidth===false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
};
Slick.prototype.setFade=function(){
var _=this,
targetLeft;
_.$slides.each(function(index, element){
targetLeft=(_.slideWidth * index) * -1;
if(_.options.rtl===true){
$(element).css({
position: 'relative',
right: targetLeft,
top: 0,
zIndex: _.options.zIndex - 2,
opacity: 0
});
}else{
$(element).css({
position: 'relative',
left: targetLeft,
top: 0,
zIndex: _.options.zIndex - 2,
opacity: 0
});
}});
_.$slides.eq(_.currentSlide).css({
zIndex: _.options.zIndex - 1,
opacity: 1
});
};
Slick.prototype.setHeight=function(){
var _=this;
if(_.options.slidesToShow===1&&_.options.adaptiveHeight===true&&_.options.vertical===false){
var targetHeight=_.$slides.eq(_.currentSlide).outerHeight(true);
_.$list.css('height', targetHeight);
}};
Slick.prototype.setOption =
Slick.prototype.slickSetOption=function(){
var _=this, l, item, option, value, refresh=false, type;
if($.type(arguments[0])==='object'){
option=arguments[0];
refresh=arguments[1];
type='multiple';
}else if($.type(arguments[0])==='string'){
option=arguments[0];
value=arguments[1];
refresh=arguments[2];
if(arguments[0]==='responsive'&&$.type(arguments[1])==='array'){
type='responsive';
}else if(typeof arguments[1]!=='undefined'){
type='single';
}}
if(type==='single'){
_.options[option]=value;
}else if(type==='multiple'){
$.each(option , function(opt, val){
_.options[opt]=val;
});
}else if(type==='responsive'){
for(item in value){
if($.type(_.options.responsive)!=='array'){
_.options.responsive=[ value[item] ];
}else{
l=_.options.responsive.length-1;
while(l >=0){
if(_.options.responsive[l].breakpoint===value[item].breakpoint){
_.options.responsive.splice(l,1);
}
l--;
}
_.options.responsive.push(value[item]);
}}
}
if(refresh){
_.unload();
_.reinit();
}};
Slick.prototype.setPosition=function(){
var _=this;
_.setDimensions();
_.setHeight();
if(_.options.fade===false){
_.setCSS(_.getLeft(_.currentSlide));
}else{
_.setFade();
}
_.$slider.trigger('setPosition', [_]);
};
Slick.prototype.setProps=function(){
var _=this,
bodyStyle=document.body.style;
_.positionProp=_.options.vertical===true ? 'top':'left';
if(_.positionProp==='top'){
_.$slider.addClass('slick-vertical');
}else{
_.$slider.removeClass('slick-vertical');
}
if(bodyStyle.WebkitTransition!==undefined ||
bodyStyle.MozTransition!==undefined ||
bodyStyle.msTransition!==undefined){
if(_.options.useCSS===true){
_.cssTransitions=true;
}}
if(_.options.fade){
if(typeof _.options.zIndex==='number'){
if(_.options.zIndex < 3){
_.options.zIndex=3;
}}else{
_.options.zIndex=_.defaults.zIndex;
}}
if(bodyStyle.OTransform!==undefined){
_.animType='OTransform';
_.transformType='-o-transform';
_.transitionType='OTransition';
if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.webkitPerspective===undefined) _.animType=false;
}
if(bodyStyle.MozTransform!==undefined){
_.animType='MozTransform';
_.transformType='-moz-transform';
_.transitionType='MozTransition';
if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.MozPerspective===undefined) _.animType=false;
}
if(bodyStyle.webkitTransform!==undefined){
_.animType='webkitTransform';
_.transformType='-webkit-transform';
_.transitionType='webkitTransition';
if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.webkitPerspective===undefined) _.animType=false;
}
if(bodyStyle.msTransform!==undefined){
_.animType='msTransform';
_.transformType='-ms-transform';
_.transitionType='msTransition';
if(bodyStyle.msTransform===undefined) _.animType=false;
}
if(bodyStyle.transform!==undefined&&_.animType!==false){
_.animType='transform';
_.transformType='transform';
_.transitionType='transition';
}
_.transformsEnabled=_.options.useTransform&&(_.animType!==null&&_.animType!==false);
};
Slick.prototype.setSlideClasses=function(index){
var _=this,
centerOffset, allSlides, indexOffset, remainder;
allSlides=_.$slider
.find('.slick-slide')
.removeClass('slick-active slick-center slick-current')
.attr('aria-hidden', 'true');
_.$slides
.eq(index)
.addClass('slick-current');
if(_.options.centerMode===true){
var evenCoef=_.options.slidesToShow % 2===0 ? 1:0;
centerOffset=Math.floor(_.options.slidesToShow / 2);
if(_.options.infinite===true){
if(index >=centerOffset&&index <=(_.slideCount - 1) - centerOffset){
_.$slides
.slice(index - centerOffset + evenCoef, index + centerOffset + 1)
.addClass('slick-active')
.attr('aria-hidden', 'false');
}else{
indexOffset=_.options.slidesToShow + index;
allSlides
.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
.addClass('slick-active')
.attr('aria-hidden', 'false');
}
if(index===0){
allSlides
.eq(allSlides.length - 1 - _.options.slidesToShow)
.addClass('slick-center');
}else if(index===_.slideCount - 1){
allSlides
.eq(_.options.slidesToShow)
.addClass('slick-center');
}}
_.$slides
.eq(index)
.addClass('slick-center');
}else{
if(index >=0&&index <=(_.slideCount - _.options.slidesToShow)){
_.$slides
.slice(index, index + _.options.slidesToShow)
.addClass('slick-active')
.attr('aria-hidden', 'false');
}else if(allSlides.length <=_.options.slidesToShow){
allSlides
.addClass('slick-active')
.attr('aria-hidden', 'false');
}else{
remainder=_.slideCount % _.options.slidesToShow;
indexOffset=_.options.infinite===true ? _.options.slidesToShow + index:index;
if(_.options.slidesToShow==_.options.slidesToScroll&&(_.slideCount - index) < _.options.slidesToShow){
allSlides
.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
.addClass('slick-active')
.attr('aria-hidden', 'false');
}else{
allSlides
.slice(indexOffset, indexOffset + _.options.slidesToShow)
.addClass('slick-active')
.attr('aria-hidden', 'false');
}}
}
if(_.options.lazyLoad==='ondemand'||_.options.lazyLoad==='anticipated'){
_.lazyLoad();
}};
Slick.prototype.setupInfinite=function(){
var _=this,
i, slideIndex, infiniteCount;
if(_.options.fade===true){
_.options.centerMode=false;
}
if(_.options.infinite===true&&_.options.fade===false){
slideIndex=null;
if(_.slideCount > _.options.slidesToShow){
if(_.options.centerMode===true){
infiniteCount=_.options.slidesToShow + 1;
}else{
infiniteCount=_.options.slidesToShow;
}
for (i=_.slideCount; i > (_.slideCount -
infiniteCount); i -=1){
slideIndex=i - 1;
$(_.$slides[slideIndex]).clone(true).attr('id', '')
.attr('data-slick-index', slideIndex - _.slideCount)
.prependTo(_.$slideTrack).addClass('slick-cloned');
}
for (i=0; i < infiniteCount  + _.slideCount; i +=1){
slideIndex=i;
$(_.$slides[slideIndex]).clone(true).attr('id', '')
.attr('data-slick-index', slideIndex + _.slideCount)
.appendTo(_.$slideTrack).addClass('slick-cloned');
}
_.$slideTrack.find('.slick-cloned').find('[id]').each(function(){
$(this).attr('id', '');
});
}}
};
Slick.prototype.interrupt=function(toggle){
var _=this;
if(!toggle){
_.autoPlay();
}
_.interrupted=toggle;
};
Slick.prototype.selectHandler=function(event){
var _=this;
var targetElement =
$(event.target).is('.slick-slide') ?
$(event.target) :
$(event.target).parents('.slick-slide');
var index=parseInt(targetElement.attr('data-slick-index'));
if(!index) index=0;
if(_.slideCount <=_.options.slidesToShow){
_.slideHandler(index, false, true);
return;
}
_.slideHandler(index);
};
Slick.prototype.slideHandler=function(index, sync, dontAnimate){
var targetSlide, animSlide, oldSlide, slideLeft, targetLeft=null,
_=this, navTarget;
sync=sync||false;
if(_.animating===true&&_.options.waitForAnimate===true){
return;
}
if(_.options.fade===true&&_.currentSlide===index){
return;
}
if(sync===false){
_.asNavFor(index);
}
targetSlide=index;
targetLeft=_.getLeft(targetSlide);
slideLeft=_.getLeft(_.currentSlide);
_.currentLeft=_.swipeLeft===null ? slideLeft:_.swipeLeft;
if(_.options.infinite===false&&_.options.centerMode===false&&(index < 0||index > _.getDotCount() * _.options.slidesToScroll)){
if(_.options.fade===false){
targetSlide=_.currentSlide;
if(dontAnimate!==true){
_.animateSlide(slideLeft, function(){
_.postSlide(targetSlide);
});
}else{
_.postSlide(targetSlide);
}}
return;
}else if(_.options.infinite===false&&_.options.centerMode===true&&(index < 0||index > (_.slideCount - _.options.slidesToScroll))){
if(_.options.fade===false){
targetSlide=_.currentSlide;
if(dontAnimate!==true){
_.animateSlide(slideLeft, function(){
_.postSlide(targetSlide);
});
}else{
_.postSlide(targetSlide);
}}
return;
}
if(_.options.autoplay){
clearInterval(_.autoPlayTimer);
}
if(targetSlide < 0){
if(_.slideCount % _.options.slidesToScroll!==0){
animSlide=_.slideCount - (_.slideCount % _.options.slidesToScroll);
}else{
animSlide=_.slideCount + targetSlide;
}}else if(targetSlide >=_.slideCount){
if(_.slideCount % _.options.slidesToScroll!==0){
animSlide=0;
}else{
animSlide=targetSlide - _.slideCount;
}}else{
animSlide=targetSlide;
}
_.animating=true;
_.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);
oldSlide=_.currentSlide;
_.currentSlide=animSlide;
_.setSlideClasses(_.currentSlide);
if(_.options.asNavFor){
navTarget=_.getNavTarget();
navTarget=navTarget.slick('getSlick');
if(navTarget.slideCount <=navTarget.options.slidesToShow){
navTarget.setSlideClasses(_.currentSlide);
}}
_.updateDots();
_.updateArrows();
if(_.options.fade===true){
if(dontAnimate!==true){
_.fadeSlideOut(oldSlide);
_.fadeSlide(animSlide, function(){
_.postSlide(animSlide);
});
}else{
_.postSlide(animSlide);
}
_.animateHeight();
return;
}
if(dontAnimate!==true){
_.animateSlide(targetLeft, function(){
_.postSlide(animSlide);
});
}else{
_.postSlide(animSlide);
}};
Slick.prototype.startLoad=function(){
var _=this;
if(_.options.arrows===true&&_.slideCount > _.options.slidesToShow){
_.$prevArrow.hide();
_.$nextArrow.hide();
}
if(_.options.dots===true&&_.slideCount > _.options.slidesToShow){
_.$dots.hide();
}
_.$slider.addClass('slick-loading');
};
Slick.prototype.swipeDirection=function(){
var xDist, yDist, r, swipeAngle, _=this;
xDist=_.touchObject.startX - _.touchObject.curX;
yDist=_.touchObject.startY - _.touchObject.curY;
r=Math.atan2(yDist, xDist);
swipeAngle=Math.round(r * 180 / Math.PI);
if(swipeAngle < 0){
swipeAngle=360 - Math.abs(swipeAngle);
}
if((swipeAngle <=45)&&(swipeAngle >=0)){
return (_.options.rtl===false ? 'left':'right');
}
if((swipeAngle <=360)&&(swipeAngle >=315)){
return (_.options.rtl===false ? 'left':'right');
}
if((swipeAngle >=135)&&(swipeAngle <=225)){
return (_.options.rtl===false ? 'right':'left');
}
if(_.options.verticalSwiping===true){
if((swipeAngle >=35)&&(swipeAngle <=135)){
return 'down';
}else{
return 'up';
}}
return 'vertical';
};
Slick.prototype.swipeEnd=function(event){
var _=this,
slideCount,
direction;
_.dragging=false;
_.swiping=false;
if(_.scrolling){
_.scrolling=false;
return false;
}
_.interrupted=false;
_.shouldClick=(_.touchObject.swipeLength > 10) ? false:true;
if(_.touchObject.curX===undefined){
return false;
}
if(_.touchObject.edgeHit===true){
_.$slider.trigger('edge', [_, _.swipeDirection() ]);
}
if(_.touchObject.swipeLength >=_.touchObject.minSwipe){
direction=_.swipeDirection();
switch(direction){
case 'left':
case 'down':
slideCount =
_.options.swipeToSlide ?
_.checkNavigable(_.currentSlide + _.getSlideCount()) :
_.currentSlide + _.getSlideCount();
_.currentDirection=0;
break;
case 'right':
case 'up':
slideCount =
_.options.swipeToSlide ?
_.checkNavigable(_.currentSlide - _.getSlideCount()) :
_.currentSlide - _.getSlideCount();
_.currentDirection=1;
break;
default:
}
if(direction!='vertical'){
_.slideHandler(slideCount);
_.touchObject={};
_.$slider.trigger('swipe', [_, direction ]);
}}else{
if(_.touchObject.startX!==_.touchObject.curX){
_.slideHandler(_.currentSlide);
_.touchObject={};}}
};
Slick.prototype.swipeHandler=function(event){
var _=this;
if((_.options.swipe===false)||('ontouchend' in document&&_.options.swipe===false)){
return;
}else if(_.options.draggable===false&&event.type.indexOf('mouse')!==-1){
return;
}
_.touchObject.fingerCount=event.originalEvent&&event.originalEvent.touches!==undefined ?
event.originalEvent.touches.length:1;
_.touchObject.minSwipe=_.listWidth / _.options
.touchThreshold;
if(_.options.verticalSwiping===true){
_.touchObject.minSwipe=_.listHeight / _.options
.touchThreshold;
}
switch (event.data.action){
case 'start':
_.swipeStart(event);
break;
case 'move':
_.swipeMove(event);
break;
case 'end':
_.swipeEnd(event);
break;
}};
Slick.prototype.swipeMove=function(event){
var _=this,
edgeWasHit=false,
curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;
touches=event.originalEvent!==undefined ? event.originalEvent.touches:null;
if(!_.dragging||_.scrolling||touches&&touches.length!==1){
return false;
}
curLeft=_.getLeft(_.currentSlide);
_.touchObject.curX=touches!==undefined ? touches[0].pageX:event.clientX;
_.touchObject.curY=touches!==undefined ? touches[0].pageY:event.clientY;
_.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
verticalSwipeLength=Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
if(!_.options.verticalSwiping&&!_.swiping&&verticalSwipeLength > 4){
_.scrolling=true;
return false;
}
if(_.options.verticalSwiping===true){
_.touchObject.swipeLength=verticalSwipeLength;
}
swipeDirection=_.swipeDirection();
if(event.originalEvent!==undefined&&_.touchObject.swipeLength > 4){
_.swiping=true;
event.preventDefault();
}
positionOffset=(_.options.rtl===false ? 1:-1) * (_.touchObject.curX > _.touchObject.startX ? 1:-1);
if(_.options.verticalSwiping===true){
positionOffset=_.touchObject.curY > _.touchObject.startY ? 1:-1;
}
swipeLength=_.touchObject.swipeLength;
_.touchObject.edgeHit=false;
if(_.options.infinite===false){
if((_.currentSlide===0&&swipeDirection==='right')||(_.currentSlide >=_.getDotCount()&&swipeDirection==='left')){
swipeLength=_.touchObject.swipeLength * _.options.edgeFriction;
_.touchObject.edgeHit=true;
}}
if(_.options.vertical===false){
_.swipeLeft=curLeft + swipeLength * positionOffset;
}else{
_.swipeLeft=curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
}
if(_.options.verticalSwiping===true){
_.swipeLeft=curLeft + swipeLength * positionOffset;
}
if(_.options.fade===true||_.options.touchMove===false){
return false;
}
if(_.animating===true){
_.swipeLeft=null;
return false;
}
_.setCSS(_.swipeLeft);
};
Slick.prototype.swipeStart=function(event){
var _=this,
touches;
_.interrupted=true;
if(_.touchObject.fingerCount!==1||_.slideCount <=_.options.slidesToShow){
_.touchObject={};
return false;
}
if(event.originalEvent!==undefined&&event.originalEvent.touches!==undefined){
touches=event.originalEvent.touches[0];
}
_.touchObject.startX=_.touchObject.curX=touches!==undefined ? touches.pageX:event.clientX;
_.touchObject.startY=_.touchObject.curY=touches!==undefined ? touches.pageY:event.clientY;
_.dragging=true;
};
Slick.prototype.unfilterSlides=Slick.prototype.slickUnfilter=function(){
var _=this;
if(_.$slidesCache!==null){
_.unload();
_.$slideTrack.children(this.options.slide).detach();
_.$slidesCache.appendTo(_.$slideTrack);
_.reinit();
}};
Slick.prototype.unload=function(){
var _=this;
$('.slick-cloned', _.$slider).remove();
if(_.$dots){
_.$dots.remove();
}
if(_.$prevArrow&&_.htmlExpr.test(_.options.prevArrow)){
_.$prevArrow.remove();
}
if(_.$nextArrow&&_.htmlExpr.test(_.options.nextArrow)){
_.$nextArrow.remove();
}
_.$slides
.removeClass('slick-slide slick-active slick-visible slick-current')
.attr('aria-hidden', 'true')
.css('width', '');
};
Slick.prototype.unslick=function(fromBreakpoint){
var _=this;
_.$slider.trigger('unslick', [_, fromBreakpoint]);
_.destroy();
};
Slick.prototype.updateArrows=function(){
var _=this,
centerOffset;
centerOffset=Math.floor(_.options.slidesToShow / 2);
if(_.options.arrows===true &&
_.slideCount > _.options.slidesToShow &&
!_.options.infinite){
_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
if(_.currentSlide===0){
_.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
}else if(_.currentSlide >=_.slideCount - _.options.slidesToShow&&_.options.centerMode===false){
_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
}else if(_.currentSlide >=_.slideCount - 1&&_.options.centerMode===true){
_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
}}
};
Slick.prototype.updateDots=function(){
var _=this;
if(_.$dots!==null){
_.$dots
.find('li')
.removeClass('slick-active')
.end();
_.$dots
.find('li')
.eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
.addClass('slick-active');
}};
Slick.prototype.visibility=function(){
var _=this;
if(_.options.autoplay){
if(document[_.hidden]){
_.interrupted=true;
}else{
_.interrupted=false;
}}
};
$.fn.slick=function(){
var _=this,
opt=arguments[0],
args=Array.prototype.slice.call(arguments, 1),
l=_.length,
i,
ret;
for (i=0; i < l; i++){
if(typeof opt=='object'||typeof opt=='undefined')
_[i].slick=new Slick(_[i], opt);
else
ret=_[i].slick[opt].apply(_[i].slick, args);
if(typeof ret!='undefined') return ret;
}
return _;
};}));
(function($, window, document, undefined){
(function(){
var lastTime=0;
var vendors=['ms', 'moz', 'webkit', 'o'];
for(var x=0; x < vendors.length&&!window.requestAnimationFrame; ++x){
window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];
window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']||window[vendors[x]+'CancelRequestAnimationFrame'];
}
if(!window.requestAnimationFrame)
window.requestAnimationFrame=function(callback){
var currTime=new Date().getTime();
var timeToCall=Math.max(0, 16 - (currTime - lastTime));
var id=window.setTimeout(function(){ callback(currTime + timeToCall); },
timeToCall);
lastTime=currTime + timeToCall;
return id;
};
if(!window.cancelAnimationFrame)
window.cancelAnimationFrame=function(id){
clearTimeout(id);
};}());
function Parallax(element, options){
var self=this;
if(typeof options=='object'){
delete options.refresh;
delete options.render;
$.extend(this, options);
}
this.$element=$(element);
if(!this.imageSrc&&this.$element.is('img')){
this.imageSrc=this.$element.attr('src');
}
var positions=(this.position + '').toLowerCase().match(/\S+/g)||[];
if(positions.length < 1){
positions.push('center');
}
if(positions.length==1){
positions.push(positions[0]);
}
if(positions[0]=='top'||positions[0]=='bottom'||positions[1]=='left'||positions[1]=='right'){
positions=[positions[1], positions[0]];
}
if(this.positionX!==undefined) positions[0]=this.positionX.toLowerCase();
if(this.positionY!==undefined) positions[1]=this.positionY.toLowerCase();
self.positionX=positions[0];
self.positionY=positions[1];
if(this.positionX!='left'&&this.positionX!='right'){
if(isNaN(parseInt(this.positionX))){
this.positionX='center';
}else{
this.positionX=parseInt(this.positionX);
}}
if(this.positionY!='top'&&this.positionY!='bottom'){
if(isNaN(parseInt(this.positionY))){
this.positionY='center';
}else{
this.positionY=parseInt(this.positionY);
}}
this.position =
this.positionX + (isNaN(this.positionX)? '':'px') + ' ' +
this.positionY + (isNaN(this.positionY)? '':'px');
if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){
if(this.imageSrc&&this.iosFix&&!this.$element.is('img')){
this.$element.css({
backgroundImage: 'url("' + this.imageSrc + '")',
backgroundSize: 'cover',
backgroundPosition: this.position
});
}
return this;
}
if(navigator.userAgent.match(/(Android)/)){
if(this.imageSrc&&this.androidFix&&!this.$element.is('img')){
this.$element.css({
backgroundImage: 'url("' + this.imageSrc + '")',
backgroundSize: 'cover',
backgroundPosition: this.position
});
}
return this;
}
this.$mirror=$('<div />').prependTo(this.mirrorContainer);
var slider=this.$element.find('>.parallax-slider');
var sliderExisted=false;
if(slider.length==0)
this.$slider=$('<img />').prependTo(this.$mirror);
else {
this.$slider=slider.prependTo(this.$mirror)
sliderExisted=true;
}
this.$mirror.addClass('parallax-mirror').css({
visibility: 'hidden',
zIndex: this.zIndex,
position: 'fixed',
top: 0,
left: 0,
overflow: 'hidden'
});
this.$slider.addClass('parallax-slider').one('load', function(){
if(!self.naturalHeight||!self.naturalWidth){
self.naturalHeight=this.naturalHeight||this.height||1;
self.naturalWidth=this.naturalWidth||this.width||1;
}
self.aspectRatio=self.naturalWidth / self.naturalHeight;
Parallax.isSetup||Parallax.setup();
Parallax.sliders.push(self);
Parallax.isFresh=false;
Parallax.requestRender();
});
if(!sliderExisted)
this.$slider[0].src=this.imageSrc;
if(this.naturalHeight&&this.naturalWidth||this.$slider[0].complete||slider.length > 0){
this.$slider.trigger('load');
}}
$.extend(Parallax.prototype, {
speed:    0.2,
bleed:    0,
zIndex:   -100,
iosFix:   true,
androidFix: true,
position: 'center',
overScrollFix: false,
mirrorContainer: 'body',
refresh: function(){
this.boxWidth=this.$element.outerWidth();
this.boxHeight=this.$element.outerHeight() + this.bleed * 2;
this.boxOffsetTop=this.$element.offset().top - this.bleed;
this.boxOffsetLeft=this.$element.offset().left;
this.boxOffsetBottom=this.boxOffsetTop + this.boxHeight;
var winHeight=Parallax.winHeight;
var docHeight=Parallax.docHeight;
var maxOffset=Math.min(this.boxOffsetTop, docHeight - winHeight);
var minOffset=Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
var imageHeightMin=this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
var imageOffsetMin=(this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;
var margin;
if(imageHeightMin * this.aspectRatio >=this.boxWidth){
this.imageWidth=imageHeightMin * this.aspectRatio | 0;
this.imageHeight=imageHeightMin;
this.offsetBaseTop=imageOffsetMin;
margin=this.imageWidth - this.boxWidth;
if(this.positionX=='left'){
this.offsetLeft=0;
}else if(this.positionX=='right'){
this.offsetLeft=- margin;
}else if(!isNaN(this.positionX)){
this.offsetLeft=Math.max(this.positionX, - margin);
}else{
this.offsetLeft=- margin / 2 | 0;
}}else{
this.imageWidth=this.boxWidth;
this.imageHeight=this.boxWidth / this.aspectRatio | 0;
this.offsetLeft=0;
margin=this.imageHeight - imageHeightMin;
if(this.positionY=='top'){
this.offsetBaseTop=imageOffsetMin;
}else if(this.positionY=='bottom'){
this.offsetBaseTop=imageOffsetMin - margin;
}else if(!isNaN(this.positionY)){
this.offsetBaseTop=imageOffsetMin + Math.max(this.positionY, - margin);
}else{
this.offsetBaseTop=imageOffsetMin - margin / 2 | 0;
}}
},
render: function(){
var scrollTop=Parallax.scrollTop;
var scrollLeft=Parallax.scrollLeft;
var overScroll=this.overScrollFix ? Parallax.overScroll:0;
var scrollBottom=scrollTop + Parallax.winHeight;
if(this.boxOffsetBottom > scrollTop&&this.boxOffsetTop <=scrollBottom){
this.visibility='visible';
this.mirrorTop=this.boxOffsetTop  - scrollTop;
this.mirrorLeft=this.boxOffsetLeft - scrollLeft;
this.offsetTop=this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
}else{
this.visibility='hidden';
}
this.$mirror.css({
transform: 'translate3d('+this.mirrorLeft+'px, '+(this.mirrorTop - overScroll)+'px, 0px)',
visibility: this.visibility,
height: this.boxHeight,
width: this.boxWidth
});
this.$slider.css({
transform: 'translate3d('+this.offsetLeft+'px, '+this.offsetTop+'px, 0px)',
position: 'absolute',
height: this.imageHeight,
width: this.imageWidth,
maxWidth: 'none'
});
}});
$.extend(Parallax, {
scrollTop:    0,
scrollLeft:   0,
winHeight:    0,
winWidth:     0,
docHeight:    1 << 30,
docWidth:     1 << 30,
sliders:      [],
isReady:      false,
isFresh:      false,
isBusy:       false,
setup: function(){
if(this.isReady) return;
var self=this;
var $doc=$(document), $win=$(window);
var loadDimensions=function(){
Parallax.winHeight=$win.height();
Parallax.winWidth=$win.width();
Parallax.docHeight=$doc.height();
Parallax.docWidth=$doc.width();
};
var loadScrollPosition=function(){
var winScrollTop=$win.scrollTop();
var scrollTopMax=Parallax.docHeight - Parallax.winHeight;
var scrollLeftMax=Parallax.docWidth  - Parallax.winWidth;
Parallax.scrollTop=Math.max(0, Math.min(scrollTopMax,  winScrollTop));
Parallax.scrollLeft=Math.max(0, Math.min(scrollLeftMax, $win.scrollLeft()));
Parallax.overScroll=Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
};
$win.on('resize.px.parallax load.px.parallax', function(){
loadDimensions();
self.refresh();
Parallax.isFresh=false;
Parallax.requestRender();
})
.on('scroll.px.parallax load.px.parallax', function(){
loadScrollPosition();
Parallax.requestRender();
});
loadDimensions();
loadScrollPosition();
this.isReady=true;
var lastPosition=-1;
function frameLoop(){
if(lastPosition==window.pageYOffset){
window.requestAnimationFrame(frameLoop);
return false;
} else lastPosition=window.pageYOffset;
self.render();
window.requestAnimationFrame(frameLoop);
}
frameLoop();
},
configure: function(options){
if(typeof options=='object'){
delete options.refresh;
delete options.render;
$.extend(this.prototype, options);
}},
refresh: function(){
$.each(this.sliders, function(){ this.refresh(); });
this.isFresh=true;
},
render: function(){
this.isFresh||this.refresh();
$.each(this.sliders, function(){ this.render(); });
},
requestRender: function(){
var self=this;
self.render();
self.isBusy=false;
},
destroy: function(el){
var i,
parallaxElement=$(el).data('px.parallax');
parallaxElement.$mirror.remove();
for(i=0; i < this.sliders.length; i+=1){
if(this.sliders[i]==parallaxElement){
this.sliders.splice(i, 1);
}}
$(el).data('px.parallax', false);
if(this.sliders.length===0){
$(window).off('scroll.px.parallax resize.px.parallax load.px.parallax');
this.isReady=false;
Parallax.isSetup=false;
}}
});
function Plugin(option){
return this.each(function (){
var $this=$(this);
var options=typeof option=='object'&&option;
if(this==window||this==document||$this.is('body')){
Parallax.configure(options);
}
else if(!$this.data('px.parallax')){
options=$.extend({}, $this.data(), options);
$this.data('px.parallax', new Parallax(this, options));
}
else if(typeof option=='object'){
$.extend($this.data('px.parallax'), options);
}
if(typeof option=='string'){
if(option=='destroy'){
Parallax.destroy(this);
}else{
Parallax[option]();
}}
});
}
var old=$.fn.parallax;
$.fn.parallax=Plugin;
$.fn.parallax.Constructor=Parallax;
$.fn.parallax.noConflict=function (){
$.fn.parallax=old;
return this;
};
$(function (){
$('[data-parallax="scroll"]').parallax();
});
}(jQuery, window, document));
(function(e){
"use strict";
"function"==typeof define&&define.amd ? define(["jquery"], e):"object"==typeof exports ? e(require("jquery")):e(jQuery)
})(function(e){
"use strict";
var t={
wheelSpeed: 10,
wheelPropagation: !1,
minScrollbarLength: null,
useBothWheelAxes: !1,
useKeyboard: !0,
suppressScrollX: !1,
suppressScrollY: !1,
scrollXMarginOffset: 0,
scrollYMarginOffset: 0,
includePadding: !1
},
n=function(){
var e=0;
return function(){
var t=e;
return e +=1, ".perfect-scrollbar-" + t
}}();
e.fn.perfectScrollbar=function(o, r){
return this.each(function(){
var l=e.extend(!0, {}, t),
a=e(this);
if("object"==typeof o ? e.extend(!0, l, o):r=o, "update"===r) return a.data("perfect-scrollbar-update")&&a.data("perfect-scrollbar-update")(), a;
if("destroy"===r) return a.data("perfect-scrollbar-destroy")&&a.data("perfect-scrollbar-destroy")(), a;
if(a.data("perfect-scrollbar")) return a.data("perfect-scrollbar");
a.addClass("ps-container");
var s, i, c, u, d, p, f, h, v, g, b=e("<div class='ps-scrollbar-x-rail'></div>").appendTo(a),
m=e("<div class='ps-scrollbar-y-rail'></div>").appendTo(a),
w=e("<div class='ps-scrollbar-x'></div>").appendTo(b),
T=e("<div class='ps-scrollbar-y'></div>").appendTo(m),
y=parseInt(b.css("bottom"), 10),
L=parseInt(m.css("right"), 10),
S=n(),
x=function(e, t){
var n=e + t,
o=u - v;
g=0 > n ? 0:n > o ? o:n;
var r=parseInt(g * (p - u) / (u - v), 10);
a.scrollTop(r), b.css({
bottom: y - r
})
},
M=function(e, t){
var n=e + t,
o=c - f;
h=0 > n ? 0:n > o ? o:n;
var r=parseInt(h * (d - c) / (c - f), 10);
a.scrollLeft(r), m.css({
right: L - r
})
},
P=function(e){
return l.minScrollbarLength&&(e=Math.max(e, l.minScrollbarLength)), e
},
X=function(){
b.css({
left: a.scrollLeft(),
bottom: y - a.scrollTop(),
width: c,
display: s ? "inherit":"none"
}), m.css({
top: a.scrollTop(),
right: L - a.scrollLeft(),
height: u,
display: i ? "inherit":"none"
}), w.css({
left: h,
width: f
}), T.css({
top: g,
height: v
})
},
D=function(){
c=l.includePadding ? a.innerWidth():a.width(), u=l.includePadding ? a.innerHeight():a.height(), d=a.prop("scrollWidth"), p=a.prop("scrollHeight"), !l.suppressScrollX&&d > c + l.scrollXMarginOffset ? (s = !0, f=P(parseInt(c * c / d, 10)), h=parseInt(a.scrollLeft() * (c - f) / (d - c), 10)):(s = !1, f=0, h=0, a.scrollLeft(0)), !l.suppressScrollY&&p > u + l.scrollYMarginOffset ? (i = !0, v=P(parseInt(u * u / p, 10)), g=parseInt(a.scrollTop() * (u - v) / (p - u), 10)):(i = !1, v=0, g=0, a.scrollTop(0)), g >=u - v&&(g=u - v), h >=c - f&&(h=c - f), X()
},
I=function(){
var t, n;
w.bind("mousedown" + S, function(e){
n=e.pageX, t=w.position().left, b.addClass("in-scrolling"), e.stopPropagation(), e.preventDefault()
}), e(document).bind("mousemove" + S, function(e){
b.hasClass("in-scrolling")&&(M(t, e.pageX - n), e.stopPropagation(), e.preventDefault())
}), e(document).bind("mouseup" + S, function(){
b.hasClass("in-scrolling")&&b.removeClass("in-scrolling")
}), t=n = null
},
Y=function(){
var t, n;
T.bind("mousedown" + S, function(e){
n=e.pageY, t=T.position().top, m.addClass("in-scrolling"), e.stopPropagation(), e.preventDefault()
}), e(document).bind("mousemove" + S, function(e){
m.hasClass("in-scrolling")&&(x(t, e.pageY - n), e.stopPropagation(), e.preventDefault())
}), e(document).bind("mouseup" + S, function(){
m.hasClass("in-scrolling")&&m.removeClass("in-scrolling")
}), t=n = null
},
k=function(e, t){
var n=a.scrollTop();
if(0===e){
if(!i) return !1;
if(0===n&&t > 0||n >=p - u&&0 > t) return !l.wheelPropagation
}
var o=a.scrollLeft();
if(0===t){
if(!s) return !1;
if(0===o&&0 > e||o >=d - c&&e > 0) return !l.wheelPropagation
}
return !0
},
C=function(){
l.wheelSpeed /=10;
var e = !1;
a.bind("mousewheel" + S, function(t, n, o, r){
var c=t.deltaX * t.deltaFactor||o,
u=t.deltaY * t.deltaFactor||r;
e = !1, l.useBothWheelAxes ? i&&!s ? (u ? a.scrollTop(a.scrollTop() - u * l.wheelSpeed):a.scrollTop(a.scrollTop() + c * l.wheelSpeed), e = !0):s&&!i&&(c ? a.scrollLeft(a.scrollLeft() + c * l.wheelSpeed):a.scrollLeft(a.scrollLeft() - u * l.wheelSpeed), e = !0):(a.scrollTop(a.scrollTop() - u * l.wheelSpeed), a.scrollLeft(a.scrollLeft() + c * l.wheelSpeed)), D(), e=e||k(c, u), e&&(t.stopPropagation(), t.preventDefault())
}), a.bind("MozMousePixelScroll" + S, function(t){
e&&t.preventDefault()
})
},
j=function(){
var t = !1;
a.bind("mouseenter" + S, function(){
t = !0
}), a.bind("mouseleave" + S, function(){
t = !1
});
var n = !1;
e(document).bind("keydown" + S, function(o){
if(t&&!e(document.activeElement).is(":input,[contenteditable]")){
var r=0,
l=0;
switch (o.which){
case 37:
r=-30;
break;
case 38:
l=30;
break;
case 39:
r=30;
break;
case 40:
l=-30;
break;
case 33:
l=90;
break;
case 32:
case 34:
l=-90;
break;
case 35:
l=-u;
break;
case 36:
l=u;
break;
default:
return
}
a.scrollTop(a.scrollTop() - l), a.scrollLeft(a.scrollLeft() + r), n=k(r, l), n&&o.preventDefault()
}})
},
O=function(){
var e=function(e){
e.stopPropagation()
};
T.bind("click" + S, e), m.bind("click" + S, function(e){
var t=parseInt(v / 2, 10),
n=e.pageY - m.offset().top - t,
o=u - v,
r=n / o;
0 > r ? r=0:r > 1&&(r=1), a.scrollTop((p - u) * r)
}), w.bind("click" + S, e), b.bind("click" + S, function(e){
var t=parseInt(f / 2, 10),
n=e.pageX - b.offset().left - t,
o=c - f,
r=n / o;
0 > r ? r=0:r > 1&&(r=1), a.scrollLeft((d - c) * r)
})
},
E=function(){
var t=function(e, t){
a.scrollTop(a.scrollTop() - t), a.scrollLeft(a.scrollLeft() - e), D()
},
n={},
o=0,
r={},
l=null,
s = !1;
e(window).bind("touchstart" + S, function(){
s = !0
}), e(window).bind("touchend" + S, function(){
s = !1
}), a.bind("touchstart" + S, function(e){
var t=e.originalEvent.targetTouches[0];
n.pageX=t.pageX, n.pageY=t.pageY, o=(new Date).getTime(), null!==l&&clearInterval(l), e.stopPropagation()
}), a.bind("touchmove" + S, function(e){
if(!s&&1===e.originalEvent.targetTouches.length){
var l=e.originalEvent.targetTouches[0],
a={};
a.pageX=l.pageX, a.pageY=l.pageY;
var i=a.pageX - n.pageX,
c=a.pageY - n.pageY;
t(i, c), n=a;
var u=(new Date).getTime(),
d=u - o;
d > 0&&(r.x=i / d, r.y=c / d, o=u), e.preventDefault()
}}), a.bind("touchend" + S, function(){
clearInterval(l), l=setInterval(function(){
return .01 > Math.abs(r.x)&&.01 > Math.abs(r.y) ? (clearInterval(l), void 0):(t(30 * r.x, 30 * r.y), r.x *=.8, r.y *=.8, void 0)
}, 10)
})
},
H=function(){
a.bind("scroll" + S, function(){
D()
})
},
A=function(){
a.unbind(S), e(window).unbind(S), e(document).unbind(S), a.data("perfect-scrollbar", null), a.data("perfect-scrollbar-update", null), a.data("perfect-scrollbar-destroy", null), w.remove(), T.remove(), b.remove(), m.remove(), w=T = c=u = d=p = f=h = y=v = g=L = null
},
W=function(t){
a.addClass("ie").addClass("ie" + t);
var n=function(){
var t=function(){
e(this).addClass("hover")
},
n=function(){
e(this).removeClass("hover")
};
a.bind("mouseenter" + S, t).bind("mouseleave" + S, n), b.bind("mouseenter" + S, t).bind("mouseleave" + S, n), m.bind("mouseenter" + S, t).bind("mouseleave" + S, n), w.bind("mouseenter" + S, t).bind("mouseleave" + S, n), T.bind("mouseenter" + S, t).bind("mouseleave" + S, n)
},
o=function(){
X=function(){
w.css({
left: h + a.scrollLeft(),
bottom: y,
width: f
}), T.css({
top: g + a.scrollTop(),
right: L,
height: v
}), w.hide().show(), T.hide().show()
}};
6===t&&(n(), o())
},
q="ontouchstart" in window||window.DocumentTouch&&document instanceof window.DocumentTouch,
F=function(){
var e=navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);
e&&"msie"===e[1]&&W(parseInt(e[2], 10)), D(), H(), I(), Y(), O(), q&&E(), a.mousewheel&&C(), l.useKeyboard&&j(), a.data("perfect-scrollbar", a), a.data("perfect-scrollbar-update", D), a.data("perfect-scrollbar-destroy", A)
};
return F(), a
})
}}),
function(e){
"function"==typeof define&&define.amd ? define(["jquery"], e):"object"==typeof exports ? module.exports=e:e(jQuery)
}(function(e){
function t(t){
var a=t||window.event,
s=i.call(arguments, 1),
c=0,
u=0,
d=0,
p=0;
if(t=e.event.fix(a), t.type="mousewheel", "detail" in a&&(d=-1 * a.detail), "wheelDelta" in a&&(d=a.wheelDelta), "wheelDeltaY" in a&&(d=a.wheelDeltaY), "wheelDeltaX" in a&&(u=-1 * a.wheelDeltaX), "axis" in a&&a.axis===a.HORIZONTAL_AXIS&&(u=-1 * d, d=0), c=0===d ? u:d, "deltaY" in a&&(d=-1 * a.deltaY, c=d), "deltaX" in a&&(u=a.deltaX, 0===d&&(c=-1 * u)), 0!==d||0!==u){
if(1===a.deltaMode){
var f=e.data(this, "mousewheel-line-height");
c *=f, d *=f, u *=f
}else if(2===a.deltaMode){
var h=e.data(this, "mousewheel-page-height");
c *=h, d *=h, u *=h
}
return p=Math.max(Math.abs(d), Math.abs(u)), (!l||l > p)&&(l=p, o(a, p)&&(l /=40)), o(a, p)&&(c /=40, u /=40, d /=40), c=Math[c >=1 ? "floor":"ceil"](c / l), u=Math[u >=1 ? "floor":"ceil"](u / l), d=Math[d >=1 ? "floor":"ceil"](d / l), t.deltaX=u, t.deltaY=d, t.deltaFactor=l, t.deltaMode=0, s.unshift(t, c, u, d), r&&clearTimeout(r), r=setTimeout(n, 200), (e.event.dispatch||e.event.handle).apply(this, s)
}}
function n(){
l=null
}
function o(e, t){
return u.settings.adjustOldDeltas&&"mousewheel"===e.type&&0===t % 120
}
var r, l, a=["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
s="onwheel" in document||document.documentMode >=9 ? ["wheel"]:["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
i=Array.prototype.slice;
if(e.event.fixHooks)
for (var c=a.length; c;) e.event.fixHooks[a[--c]]=e.event.mouseHooks;
var u=e.event.special.mousewheel={
version: "3.1.9",
setup: function(){
if(this.addEventListener)
for (var n=s.length; n;) this.addEventListener(s[--n], t, !1);
else this.onmousewheel=t;
e.data(this, "mousewheel-line-height", u.getLineHeight(this)), e.data(this, "mousewheel-page-height", u.getPageHeight(this))
},
teardown: function(){
if(this.removeEventListener)
for (var e=s.length; e;) this.removeEventListener(s[--e], t, !1);
else this.onmousewheel=null
},
getLineHeight: function(t){
return parseInt(e(t)["offsetParent" in e.fn ? "offsetParent":"parent"]().css("fontSize"), 10)
},
getPageHeight: function(t){
return e(t).height()
},
settings: {
adjustOldDeltas: !0
}};
e.fn.extend({
mousewheel: function(e){
return e ? this.bind("mousewheel", e):this.trigger("mousewheel")
},
unmousewheel: function(e){
return this.unbind("mousewheel", e)
}})
});
(function(){
var $, win;
$=this.jQuery||window.jQuery;
win=$(window);
$.fn.stick_in_parent=function(opts){
var doc, elm, enable_bottoming, fn, i, inner_scrolling, len, manual_spacer, offset_top, parent_selector, recalc_every, sticky_class;
if(opts==null){
opts={};}
sticky_class=opts.sticky_class, inner_scrolling=opts.inner_scrolling, recalc_every=opts.recalc_every, parent_selector=opts.parent, offset_top=opts.offset_top, manual_spacer=opts.spacer, enable_bottoming=opts.bottoming;
if(offset_top==null){
offset_top=0;
}
if(parent_selector==null){
parent_selector=void 0;
}
if(inner_scrolling==null){
inner_scrolling=true;
}
if(sticky_class==null){
sticky_class="is_stuck";
}
doc=$(document);
if(enable_bottoming==null){
enable_bottoming=true;
}
fn=function(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached){
var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;
if(elm.data("sticky_kit")){
return;
}
elm.data("sticky_kit", true);
last_scroll_height=doc.height();
parent=elm.parent();
if(parent_selector!=null){
parent=parent.closest(parent_selector);
}
if(!parent.length){
throw "failed to find stick parent";
}
fixed=false;
bottomed=false;
spacer=manual_spacer!=null ? manual_spacer&&elm.closest(manual_spacer):$("<div />");
if(spacer){
spacer.css('position', elm.css('position'));
}
recalc=function(){
var border_top, padding_top, restore;
if(detached){
return;
}
last_scroll_height=doc.height();
border_top=parseInt(parent.css("border-top-width"), 10);
padding_top=parseInt(parent.css("padding-top"), 10);
padding_bottom=parseInt(parent.css("padding-bottom"), 10);
parent_top=parent.offset().top + border_top + padding_top;
parent_height=parent.height();
if(fixed){
fixed=false;
bottomed=false;
if(manual_spacer==null){
elm.insertAfter(spacer);
spacer.detach();
}
elm.css({
position: "",
top: "",
width: "",
bottom: ""
}).removeClass(sticky_class);
restore=true;
}
top=elm.offset().top - (parseInt(elm.css("margin-top"), 10)||0) - offset_top;
height=elm.outerHeight(true);
el_float=elm.css("float");
if(spacer){
spacer.css({
width: elm.outerWidth(true),
height: height,
display: elm.css("display"),
"vertical-align": elm.css("vertical-align"),
"float": el_float
});
}
if(restore){
return tick();
}};
recalc();
if(height===parent_height){
return;
}
last_pos=void 0;
offset=offset_top;
recalc_counter=recalc_every;
tick=function(){
var css, delta, recalced, scroll, will_bottom, win_height;
if(detached){
return;
}
recalced=false;
if(recalc_counter!=null){
recalc_counter -=1;
if(recalc_counter <=0){
recalc_counter=recalc_every;
recalc();
recalced=true;
}}
if(!recalced&&doc.height()!==last_scroll_height){
recalc();
recalced=true;
}
scroll=win.scrollTop();
if(last_pos!=null){
delta=scroll - last_pos;
}
last_pos=scroll;
if(fixed){
if(enable_bottoming){
will_bottom=scroll + height + offset > parent_height + parent_top;
if(bottomed&&!will_bottom){
bottomed=false;
elm.css({
position: "fixed",
bottom: "",
top: offset
}).trigger("sticky_kit:unbottom");
}}
if(scroll < top){
fixed=false;
offset=offset_top;
if(manual_spacer==null){
if(el_float==="left"||el_float==="right"){
elm.insertAfter(spacer);
}
spacer.detach();
}
css={
position: "",
width: "",
top: ""
};
elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
}
if(inner_scrolling){
win_height=win.height();
if(height + offset_top > win_height){
if(!bottomed){
offset -=delta;
offset=Math.max(win_height - height, offset);
offset=Math.min(offset_top, offset);
if(fixed){
elm.css({
top: offset + "px"
});
}}
}}
}else{
if(scroll > top){
fixed=true;
css={
position: "fixed",
top: offset
};
css.width=elm.css("box-sizing")==="border-box" ? elm.outerWidth() + "px":elm.width() + "px";
elm.css(css).addClass(sticky_class);
if(manual_spacer==null){
elm.after(spacer);
if(el_float==="left"||el_float==="right"){
spacer.append(elm);
}}
elm.trigger("sticky_kit:stick");
}}
if(fixed&&enable_bottoming){
if(will_bottom==null){
will_bottom=scroll + height + offset > parent_height + parent_top;
}
if(!bottomed&&will_bottom){
bottomed=true;
if(parent.css("position")==="static"){
parent.css({
position: "relative"
});
}
return elm.css({
position: "absolute",
bottom: padding_bottom,
top: "auto"
}).trigger("sticky_kit:bottom");
}}
};
recalc_and_tick=function(){
recalc();
return tick();
};
detach=function(){
detached=true;
win.off("touchmove", tick);
win.off("scroll", tick);
win.off("resize", recalc_and_tick);
$(document.body).off("sticky_kit:recalc", recalc_and_tick);
elm.off("sticky_kit:detach", detach);
elm.removeData("sticky_kit");
elm.css({
position: "",
bottom: "",
top: "",
width: ""
});
parent.position("position", "");
if(fixed){
if(manual_spacer==null){
if(el_float==="left"||el_float==="right"){
elm.insertAfter(spacer);
}
spacer.remove();
}
return elm.removeClass(sticky_class);
}};
win.on("touchmove", tick);
win.on("scroll", tick);
win.on("resize", recalc_and_tick);
$(document.body).on("sticky_kit:recalc", recalc_and_tick);
elm.on("sticky_kit:detach", detach);
return setTimeout(tick, 0);
};
for (i=0, len=this.length; i < len; i++){
elm=this[i];
fn($(elm));
}
return this;
};}).call(this);
$=jQuery;
jQuery(document).ready(function($){
"use strict";
var entryHeader=$('.entry-header');
if(entryHeader.attr('data-parallax')=='1'){
entryHeader.parallax({ imageSrc: entryHeader.attr('data-image') });
}
$('#top-menu, #main-menu').find('li').on('mouseenter', function(){
$(this).children('.sub-menu').stop().fadeIn(200);
}).on('mouseleave', function(){
$(this).children('.sub-menu').stop().fadeOut(200);
});
$('.mobile-menu-btn').on('click', function(){
$('.mobile-menu-container').slideToggle();
});
$('#mobile-menu .menu-item-has-children').prepend('<div class="sub-menu-btn"></div>');
$('#mobile-menu .sub-menu').before('<span class="sub-menu-btn-icon icon-angle-down"></span>');
$('.sub-menu-btn').on('click', function(){
$(this).closest('li').children('.sub-menu').slideToggle();
$(this).closest('li').children('.sub-menu-btn-icon').toggleClass('fa-rotate-270');
});
$(window).on('resize', function(){
if($('.main-menu-container').css('display')==='block'){
$('.mobile-menu-container').css({ 'display':'none' });
}});
$('.main-nav-icons').after($('.main-nav-search #searchform').remove());
var mainNavSearch=$('#main-nav #searchform');
mainNavSearch.find('#s').attr('placeholder', mainNavSearch.find('#s').data('placeholder'));
$('.main-nav-search').on('click', function(){
if(mainNavSearch.css('display')==='none'){
mainNavSearch.fadeIn();
$('.main-nav-search i:last-of-type').show();
$('.main-nav-search i:first-of-type').hide();
}else{
mainNavSearch.fadeOut();
$('.main-nav-search i:last-of-type').hide();
$('.main-nav-search i:first-of-type').show();
}});
var RTL=false;
if($('html').attr('dir')=='rtl'){
RTL=true;
}
$('#featured-slider').slick({
prevArrow: '<span class="prev-arrow icon-angle-left"></span>',
nextArrow: '<span class="next-arrow icon-angle-right"></span>',
dotsClass: 'slider-dots',
adaptiveHeight: true,
rtl: RTL,
speed: 750,
customPaging: function(slider, i){
return '';
}});
$('.sidebar-alt').perfectScrollbar({
suppressScrollX:true,
includePadding:true,
wheelSpeed: 3.5
});
$('.main-nav-sidebar').on('click', function (){
$('.sidebar-alt').css('left','0');
$('.sidebar-alt-close').fadeIn(500);
});
function bardAltSidebarClose(){
var leftPosition=parseInt($(".sidebar-alt").outerWidth(), 10) + 30;
$('.sidebar-alt').css('left','-'+ leftPosition +'px');
$('.sidebar-alt-close').fadeOut(500);
}
$('.sidebar-alt-close, .sidebar-alt-close-btn').on('click', function (){
bardAltSidebarClose();
});
var instagram=$('.footer-instagram-widget .null-instagram-feed li a'),
instagramColumn=$('.footer-instagram-widget .null-instagram-feed li').length;
instagram.css({
'width':'' + 100 / instagramColumn +'%',
'opacity':'1'
});
$('.scrolltop').on('click', function(){
$('html, body').animate({ scrollTop:0 }, 800);
return false;
});
$(window).on('resize', function(){
if($('.mobile-menu-btn').css('display')==='none'){
$('.mobile-menu-container').css({ 'display':'none' });
}
bardstickySidebar();
bardAltSidebarClose();
});
$('.slider-item, .post-media').fitVids();
});
$(window).on('load', function(){
bardstickySidebar();
bardPreloader();
});
function bardPreloader(){
if($('.bard-preloader-wrap').length){
setTimeout(function(){
$('.bard-preloader-wrap > div').fadeOut(600);
$('.bard-preloader-wrap').fadeOut(1500);
}, 300);
if($('body').hasClass('elementor-editor-active')){
setTimeout(function(){
$('.bard-preloader-wrap > div').fadeOut(600);
$('.bard-preloader-wrap').fadeOut(1500);
}, 300);
}}
}
function bardstickySidebar(){
if($('.main-content').data('sidebar-sticky')===1){
var SidebarOffset=0;
if($("#main-nav").attr('data-fixed')==='1'){
SidebarOffset=40;
}
$('.sidebar-left,.sidebar-right').stick_in_parent({
parent: ".main-content",
offset_top: SidebarOffset,
spacer: '.sidebar-left-wrap,.sidebar-right-wrap'
});
if($('.mobile-menu-btn').css('display')!=='none'){
$('.sidebar-left,.sidebar-right').trigger("sticky_kit:detach");
}}
};
window.addComment=function(v){var I,C,h,E=v.document,b={commentReplyClass:"comment-reply-link",commentReplyTitleId:"reply-title",cancelReplyId:"cancel-comment-reply-link",commentFormId:"commentform",temporaryFormId:"wp-temp-form-div",parentIdFieldId:"comment_parent",postIdFieldId:"comment_post_ID"},e=v.MutationObserver||v.WebKitMutationObserver||v.MozMutationObserver,r="querySelector"in E&&"addEventListener"in v,n=!!E.documentElement.dataset;function t(){d(),e&&new e(o).observe(E.body,{childList:!0,subtree:!0})}function d(e){if(r&&(I=g(b.cancelReplyId),C=g(b.commentFormId),I)){I.addEventListener("touchstart",l),I.addEventListener("click",l);function t(e){if((e.metaKey||e.ctrlKey)&&13===e.keyCode)return C.removeEventListener("keydown",t),e.preventDefault(),C.submit.click(),!1}C&&C.addEventListener("keydown",t);for(var n,d=function(e){var t=b.commentReplyClass;e&&e.childNodes||(e=E);e=E.getElementsByClassName?e.getElementsByClassName(t):e.querySelectorAll("."+t);return e}(e),o=0,i=d.length;o<i;o++)(n=d[o]).addEventListener("touchstart",a),n.addEventListener("click",a)}}function l(e){var t,n,d=g(b.temporaryFormId);d&&h&&(g(b.parentIdFieldId).value="0",t=d.textContent,d.parentNode.replaceChild(h,d),this.style.display="none",n=(d=(d=g(b.commentReplyTitleId))&&d.firstChild)&&d.nextSibling,d&&d.nodeType===Node.TEXT_NODE&&t&&(n&&"A"===n.nodeName&&n.id!==b.cancelReplyId&&(n.style.display=""),d.textContent=t),e.preventDefault())}function a(e){var t=g(b.commentReplyTitleId),t=t&&t.firstChild.textContent,n=this,d=m(n,"belowelement"),o=m(n,"commentid"),i=m(n,"respondelement"),r=m(n,"postid"),n=m(n,"replyto")||t;d&&o&&i&&r&&!1===v.addComment.moveForm(d,o,i,r,n)&&e.preventDefault()}function o(e){for(var t=e.length;t--;)if(e[t].addedNodes.length)return void d()}function m(e,t){return n?e.dataset[t]:e.getAttribute("data-"+t)}function g(e){return E.getElementById(e)}return r&&"loading"!==E.readyState?t():r&&v.addEventListener("DOMContentLoaded",t,!1),{init:d,moveForm:function(e,t,n,d,o){var i,r,l,a,m,c,s,e=g(e),n=(h=g(n),g(b.parentIdFieldId)),y=g(b.postIdFieldId),p=g(b.commentReplyTitleId),u=(p=p&&p.firstChild)&&p.nextSibling;if(e&&h&&n){void 0===o&&(o=p&&p.textContent),a=h,m=b.temporaryFormId,c=g(m),s=(s=g(b.commentReplyTitleId))?s.firstChild.textContent:"",c||((c=E.createElement("div")).id=m,c.style.display="none",c.textContent=s,a.parentNode.insertBefore(c,a)),d&&y&&(y.value=d),n.value=t,I.style.display="",e.parentNode.insertBefore(h,e.nextSibling),p&&p.nodeType===Node.TEXT_NODE&&(u&&"A"===u.nodeName&&u.id!==b.cancelReplyId&&(u.style.display="none"),p.textContent=o),I.onclick=function(){return!1};try{for(var f=0;f<C.elements.length;f++)if(i=C.elements[f],r=!1,"getComputedStyle"in v?l=v.getComputedStyle(i):E.documentElement.currentStyle&&(l=i.currentStyle),(i.offsetWidth<=0&&i.offsetHeight<=0||"hidden"===l.visibility)&&(r=!0),"hidden"!==i.type&&!i.disabled&&!r){i.focus();break}}catch(e){}return!1}}}}(window);