document.addEventListener("DOMContentLoaded",(function(){let e=document.documentElement.getBoundingClientRect().width;window.addEventListener("resize",(function(){e=document.documentElement.getBoundingClientRect().width}));let t=[],i=document.createElement("style");function n(e,i){return"open"==i?t.push(e):"close"==i&&t.splice(t.indexOf(e),1),t.length}function a(e,t){n(e,t||"open"),1===n()&&(document.body.style.overflow="hidden",document.querySelectorAll("[data-scroll-trigger]").forEach(e=>{e.classList.add("scroll-offset")})),0===n()&&(document.body.style.overflow="",document.querySelectorAll("[data-scroll-trigger]").forEach(e=>{e.classList.remove("scroll-offset")}))}i.innerHTML=".scroll-offset { padding-right:"+(window.innerWidth-e)+"px;}",document.getElementsByTagName("head")[0].appendChild(i),document.querySelectorAll("[data-scroll-trigger]").forEach(e=>{e.classList.remove("scroll-offset")});const o="+7 (999) 999-99-99";function s(e){e.required&&$(e).parent(".form-field").removeClass("_required"),"number"===e.type&&$(e).parent(".form-field").removeClass("_number"),"email"===e.type&&$(e).parent(".form-field").removeClass("_email")}function d(e){let t=[];for(let i=0;i<e.files.length;i++)t[i]=e.files[i].name;$(e).parent().attr("title",t.toString()),$(e).siblings(".form-file__quantity").children(".form-file__number").text(e.files.length),$(e).siblings(".form-file__quantity").addClass("_active")}if($('.js-form button[type="submit"]').click((function(e){$(this).parents("form").find(":input[name]").each((function(e,t){this.required&&("tel"===t.type&&0===$(t).mask(o).val().length||0===t.value.length)&&($(t).focus((function(){$(this).parent(".form-field").removeClass("_required")})),$(t).parent(".form-field").addClass("_required"))}))})),$(".form-field__input").click((function(){s(this)})),$(".form-field__input").focus((function(){s(this)})),$(".form-field__input").change((function(){"tel"!==this.type&&s(this)})),$(".form-field__input").focusout((function(){(this.required&&"text"===this.type&&0===this.value.length||this.required&&"tel"===this.type&&0===$(this).mask(o).val().length||this.required&&"password"===this.type&&0===this.value.length||this.required&&"number"===this.type&&0===this.value.length)&&$(this).parent(".form-field").addClass("_required"),"email"===this.type&&(this.required&&0===this.value.length?$(this).parent(".form-field").addClass("_required"):this.validity.valid||$(this).parent(".form-field").addClass("_email")),"number"===this.type&&this.validity.badInput&&$(this).parent(".form-field").addClass("_number")})),$(".form-file__input").change((function(){console.log(this),d(this)})),$(".form-file__input").each((function(e,t){t.files.length>=1&&d(t)})),$(".form-phone").mask(o),$(".form-textarea__input").each((function(e,t){0!==t.value.length&&$(t).next().hide(0)})),$(".form-textarea__input").click((function(){this.required?($(this).next().fadeOut(250),$(this).parent().removeClass("_required")):$(this).next().fadeOut(250)})),$(".form-textarea__input").focus((function(){this.required?($(this).next().fadeOut(250),$(this).parent().removeClass("_required")):$(this).next().fadeOut(250)})),$(".form-textarea__input").change((function(){this.required?($(this).next().fadeOut(250),$(this).parent().removeClass("_required")):$(this).next().fadeOut(250)})),$(".form-textarea__input").focusout((function(){0===this.value.length?this.required?($(this).parent().addClass("_required"),$(this).next().fadeIn(250),$(this).next().text($(this).next().data("valid"))):$(this).next().fadeIn(250):($(this).parent().removeClass("_required"),$(this).next().fadeOut(250))})),$(".js-form").submit((function(){const e=$(this);e.find("button").prop("disabled",!0),e.find(".form-send__message").fadeIn(350);var t=new FormData;return e.find(":input[name]").each((function(e,i){if("file"==i.type&&i.multiple){var n=i.files;for(e=0;e<n.length;e++)t.append("files[]",n[e])}else if("file"==i.type)t.append($(i).attr("name"),$(i).prop("files")[0]);else{var a=$(this);a.val()&&t.append(a.attr("name"),a.val())}})),$.ajax({url:"form/form.php",type:"POST",data:t,contentType:!1,cache:!1,processData:!1,success:function(t){e.find(".form-send__loading").hide(),e.find(".form-send__success").show(),e.trigger("reset"),e.find(":input[name]").each((function(e,t){t.required&&$(this).parent(".form-field").removeClass("_required")})),$(".form-textarea").removeClass("_required"),setTimeout((function(){e.find(".form-send__message").fadeOut()}),3500),e.find("button").prop("disabled",!1)},error:function(t,i,n){e.find(".form-send__loading").hide(),e.find(".form-send__error").show(),setTimeout((function(){e.find(".form-send__message").fadeOut()}),3500),e.find("button").prop("disabled",!1)}}),!1})),"loading"in HTMLImageElement.prototype){document.querySelectorAll("img.lazy").forEach(e=>{e.src=e.dataset.src})}else{(new LazyLoad).update()}$(".scroll").click((function(){var e=$(this).attr("href");return $("html, body").animate({scrollTop:$(e).offset().top+parseInt($(e).css("padding-top"))-20+"px"}),!1}));let r=[],l=document.createElement("script");l.src="https://www.youtube.com/iframe_api";let f=document.getElementsByTagName("script")[0];function u(e,t){r[e]=new YT.Player(e,{height:"100%",width:"100%",videoId:t,events:{onReady:function(e){e.target.playVideo()}}})}function m(e){setTimeout((function(){$(e).fadeOut(500)}),150),a(e.id,"close"),$(e).find("iframe").length&&r[$(e).find(".video__frame")[0].id].pauseVideo()}f.parentNode.insertBefore(l,f),$(".video__btn").click((function(){$(this).parent(".video").addClass("_active");let e=$(this).data("video-src"),t=$(this).data("video-src")+"-"+Math.floor(990001*Math.random()+1e4);$(this).parent(".video").find(".video__frame").attr("id",t),u(t,e)})),$(".menu-toggle").on("click",(function(){$(this).toggleClass("_active")})),$(".menu-modal-close").on("click",(function(){$(".menu-modal").fadeOut(),$(".menu-toggle").removeClass("_active")})),$(".menu-modal__link").click((function(){$(".menu-modal").fadeOut(),$(".menu-toggle").removeClass("_active")})),$(".modal__close").click((function(){m($(this).parents(".modal")[0])})),$(".modal").mouseup((function(e){const t=$(this).find(".modal-target");0==$(this).data("modal-target")||t.is(e.target)||0!==t.has(e.target).length||m(this)})),window.addEventListener("keyup",e=>{if("Escape"===e.key&&n()){const e=document.getElementById(t[t.length-1]);$(e).hasClass("modal")&&m(e)}}),$("[data-modal-open]").on("click",(function(){let e=$(this);return function(e,t){const i=document.getElementById(e);$("#"+e).fadeIn(500),setTimeout(()=>a(e),500),t(e,i)}(this.dataset.modalOpen,(function(t,i){if("modal-video"==t){let t=e.data("video-src")||$(i).find(".video__frame").data("video-src");$(i).find("iframe.video__frame").length?r[$(i).find(".video__frame").attr("id")].loadVideoById({videoId:t}):u($(i).find(".video__frame").attr("id"),t)}e.data("modal-title")?($(".modal-form__title").text(e.data("modal-title")),$(".modal .form-input-title").val("Pop-Up: "+e.data("modal-title"))):($(".modal-form__title").text($(".modal-form__title").data("modal-title")),$(".modal .form-input-title").val("Pop-Up: "+$(".modal-form__title").data("modal-title")))})),!1})),$(".modal__close").click((function(){m($(this).parents(".modal")[0])})),$(".modal").mouseup((function(e){const t=$(this).find(".modal-target");0==$(this).data("modal-target")||t.is(e.target)||0!==t.has(e.target).length||m(this)})),window.addEventListener("keyup",e=>{if("Escape"===e.key&&n()){const e=document.getElementById(t[t.length-1]);$(e).hasClass("modal")&&m(e)}}),$(".questions-item__header").on("click",(function(){"accordion"===$(this).parents(".questions").data("questions")?($(this).parent().siblings().children(".questions-item__body").slideUp(250),$(this).parent().siblings().children(".questions-item__header").removeClass("_active"),$(this).next().slideToggle(250),$(this).toggleClass("_active")):($(this).next().slideToggle(250),$(this).toggleClass("_active"))})),setTimeout((function(){}),1e3),(new WOW).init()}));