(() => {
  // src/components/modal/modal.js
  $("[data-modal-open]").on("click", function() {
    let modalBtn = $(this);
    modalOpen(this.dataset.modalOpen, function(modalId, modal) {
      if (modalId == "modal-video") {
        let modalVideoSrc = modalBtn.data("video-src") || $(modal).find(".video__frame").data("video-src");
        if (!$(modal).find("iframe.video__frame").length) {
          initVideo($(modal).find(".video__frame").attr("id"), modalVideoSrc);
        } else {
          player[$(modal).find(".video__frame").attr("id")].loadVideoById({ videoId: modalVideoSrc });
        }
      }
      if (modalBtn.data("modal-title")) {
        $(".modal [data-modal-title]").text(modalBtn.data("modal-title"));
        $(".modal .form-input-title").val("Pop-Up: " + modalBtn.data("modal-title"));
      } else {
        $(".modal [data-modal-title]").text($(".modal [data-modal-title]").data("modal-title"));
        $(".modal .form-input-title").val("Pop-Up: " + $(".modal [data-modal-title]").data("modal-title"));
      }
      if (modalBtn.data("info")) {
        $("#input-info").val(modalBtn.data("info"));
      } else {
        $("#input-info").val("");
      }
    });
    return false;
  });
  function modalOpen(modalId, callback) {
    const modal = document.getElementById(modalId);
    $("#" + modalId).fadeIn(500);
    setTimeout(() => scrollOffset(modalId), 500);
    if (callback)
      callback(modalId, modal);
  }
  function modalClose(modal) {
    setTimeout(function() {
      $(modal).fadeOut(500);
    }, 150);
    scrollOffset(modal.id, "close");
    if ($(modal).find("iframe").length) {
      player[$(modal).find(".video__frame")[0].id].pauseVideo();
    }
  }
  $(".modal__close").click(function() {
    modalClose($(this).parents(".modal")[0]);
  });
  $(".modal").mouseup(function(e) {
    const modalBox = $(this).find(".modal-target");
    if ($(this).data("modal-target") != false && !modalBox.is(e.target) && modalBox.has(e.target).length === 0) {
      modalClose(this);
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && conditionScrollOffset()) {
      const modalCloseId = document.getElementById(scrollOffsetlist[scrollOffsetlist.length - 1]);
      if ($(modalCloseId).hasClass("modal")) {
        modalClose(modalCloseId);
      }
    }
  });

  // src/components/questions/questions.js
  $(".questions-item__header").on("click", function() {
    if ($(this).parents(".questions").data("questions") === "accordion") {
      if (!$(this).parent().hasClass("_active")) {
        $(this).parents(".questions").find(".questions-item").children(".questions-item__body").slideUp(250);
        $(this).parents(".questions").find(".questions-item").children(".questions-item__header").removeClass("_active");
        $(this).parents(".questions").find(".questions-item").removeClass("_active");
        $(this).next().slideDown(250);
        $(this).parent().addClass("_active");
      } else {
        $(this).next().slideUp(250);
        $(this).parent().removeClass("_active");
      }
    } else {
      $(this).next().slideToggle(250);
      $(this).parent().toggleClass("_active");
    }
  });

  // src/components/slider/scripts/core.js
  function _slider() {
    document.querySelectorAll(".slider").forEach((slider) => {
      const sliderInit = slider.querySelector(".slider-init");
      let sliderConfig = {
        slidesPerView: 1,
        spaceBetween: 25,
        watchOverflow: true,
        simulateTouch: false,
        //*
        //autoHeight:true,
        //*
        //breakpoints: {
        //    1024: {
        //        slidesPerView: 2,
        //        spaceBetween: 20
        //    },
        //},
        //*
        navigation: {
          nextEl: slider.querySelector(".slider-button-next"),
          prevEl: slider.querySelector(".slider-button-prev")
        },
        pagination: {
          el: slider.querySelector(".slider-pagination"),
          type: "bullets",
          clickable: true
        },
        //*
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2
        }
      };
      if (slider.dataset.config) {
        let sliderData = function(element, callback) {
          if (sliderDataConfig.find((el) => el.trim() == element)) {
            callback();
          }
        };
        let sliderDataConfig = slider.dataset.config.split(",");
        sliderData("addClassGrid-lg", () => {
          if (window.screen.width >= 1024) {
            sliderConfig = false;
            $(sliderInit.querySelector("[data-wrapper]")).addClass("grid");
            $(sliderInit.querySelector("[data-wrapper]")).removeClass("swiper-wrapper");
            $(sliderInit.querySelectorAll("[data-slide]")).removeClass("swiper-slide");
            $(sliderInit).removeClass("swiper");
          } else {
            $(sliderInit.querySelector("[data-wrapper]")).removeClass("grid");
            $(sliderInit.querySelector("[data-wrapper]")).addClass("swiper-wrapper");
            $(sliderInit.querySelectorAll("[data-slide]")).addClass("swiper-slide");
            $(sliderInit).addClass("swiper");
          }
        });
      }
      if (sliderInit.swiper) {
        if (sliderInit.querySelector("[data-wrapper]"))
          sliderInit.querySelector("[data-wrapper]").removeAttribute("style");
        if (sliderInit.querySelectorAll("[data-slide]"))
          sliderInit.querySelectorAll("[data-slide]").forEach((element) => element.removeAttribute("style"));
        sliderInit.swiper.detachEvents();
        sliderInit.swiper.destroy();
      }
      if (sliderConfig)
        new Swiper(sliderInit, sliderConfig);
    });
    window.addEventListener("resize", _slider);
  }
  _slider();

  // src/components/video/video.js
  var player2 = [];
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  function initVideo2(id, src) {
    player2[id] = new YT.Player(id, {
      height: "100%",
      width: "100%",
      videoId: src,
      events: {
        "onReady": onPlayerReady
      }
    });
    function onPlayerReady(event) {
      event.target.playVideo();
    }
  }
  function videoOpen(selector) {
    $(selector).off("click");
    $(selector).click(function() {
      $(this).parent(".video").addClass("_active");
      let srcVideo = $(this).data("video-src");
      let idVideo = $(this).data("video-src") + "-" + Math.floor(Math.random() * (1e6 - 1e4 + 1) + 1e4);
      $(this).parent(".video").find(".video__frame").attr("id", idVideo);
      initVideo2(idVideo, srcVideo);
    });
  }
  videoOpen(".video__btn");

  // src/js/modules/toogle.js
  $("[data-toggle]").each((index, $toggle) => {
    toggle($toggle);
  });
  var effectList = {
    "toggle": (box, duration) => box.toggle(),
    "show": (box, duration) => box.show(),
    "hide": (box, duration) => box.hide(),
    "fadeIn": (box, duration) => box.fadeIn(Number(duration)),
    "fadeOut": (box, duration) => box.fadeOut(Number(duration)),
    "fadeToggle": (box, duration) => box.fadeToggle(Number(duration)),
    "slideDown": (box, duration) => box.slideDown(Number(duration)),
    "slideUp": (box, duration) => box.slideUp(Number(duration)),
    "slideToggle": (box, duration) => box.slideToggle(Number(duration)),
    "addClass": (box, elClass) => box.addClass(elClass),
    "removeClass": (box, elClass) => box.removeClass(elClass),
    "toggleClass": (box, elClass) => box.toggleClass(elClass)
  };
  function toggle($root) {
    if ($root.__toggle)
      return;
    $root.__toggle = true;
    if ($root.dataset.toggle.includes(";")) {
      const configs = $root.dataset.toggle.split(";");
      configs.forEach((config) => {
        config = config.split(",");
        toggleBox(config);
      });
    } else {
      const config = $root.dataset.toggle.split(",");
      toggleBox(config);
    }
    function toggleBox(config) {
      const box = $($root).parents("[data-toggle-wrapper]").length ? $($root).parents("[data-toggle-wrapper]").find('[data-toggle-box="'.concat(config[0].trim(), '"]')) : $('[data-toggle-box="'.concat(config[0].trim(), '"]'));
      const effect = config[1] || "toggle";
      const duration = config[2] || 400;
      const toggleClass = config[3] || null;
      if (box.length) {
        let toggleClick = function() {
          effectList[effect.trim()](box, duration);
          if (toggleClass)
            $($root).toggleClass(toggleClass);
        };
        $($root).click(toggleClick);
      }
    }
  }

  // src/js/modules/scroll.js
  $(".scroll").click(function() {
    var _href = $(this).attr("href");
    if (_href) {
      $("html, body").animate({
        scrollTop: $(_href).offset().top + parseInt($(_href).css("padding-top")) - 20 + "px"
      });
    }
    return false;
  });

  // src/js/modules/scroll-offset.js
  var bodyWidth = document.documentElement.getBoundingClientRect().width;
  window.addEventListener("resize", function() {
    bodyWidth = document.documentElement.getBoundingClientRect().width;
  });
  var addStyleOffset = document.createElement("style");
  addStyleOffset.innerHTML = ".scroll-offset { padding-right:" + (window.innerWidth - bodyWidth) + "px;}";
  document.getElementsByTagName("head")[0].appendChild(addStyleOffset);
  document.querySelectorAll("[data-scroll-trigger]").forEach((element) => {
    element.classList.remove("scroll-offset");
  });

  // src/js/utility/util.js
  var isString = (val) => typeof val === "string";
  var isNumber = (val) => !!Number(val);

  // src/js/utility/parseData.js
  function parseData(data) {
    if (isString(data)) {
      data = data.trim();
      data = data.includes(",") ? data.split(",") : [data];
      const dataList = {};
      data.forEach((dataValue) => {
        if (dataValue.includes(":")) {
          dataValue = dataValue.split(":");
          const _key = dataValue[0].trim();
          const _value = dataValue[1].trim();
          dataList[_key.trim()] = Number(_value) ? Number(_value) : _value;
        } else {
          dataList[dataValue.trim()] = true;
        }
      });
      return dataList;
    }
    return {};
  }

  // src/js/modules/scroll-trigger.js
  ScrollTrigger.matchMedia({
    // desktop
    "(min-width: 1024px)": function() {
      document.querySelectorAll("[data-scroll-trigger]").forEach(($trigger) => {
        const animationConfig = parseData($trigger.dataset.scrollTrigger);
        console.log(animationConfig);
        gsap.to($trigger, {
          scrollTrigger: {
            trigger: document.querySelector(animationConfig.trigger) || $trigger,
            start: animationConfig.start || "top 100%",
            end: animationConfig.end || "bottom",
            scrub: animationConfig.scrub || 1,
            markers: animationConfig.marker || false
          },
          y: animationConfig.y || 0,
          x: animationConfig.x || 0
        });
      });
    }
  });

  // src/js/modules/mask.js
  $("[data-mask]").each((index, $mask) => {
    $($mask).mask($mask.dataset.mask);
  });

  // src/js/utility/parseDataList.js
  function parseDataList(data) {
    if (isString(data)) {
      data = data.trim();
      const dataList = {};
      if (data.includes(";")) {
        data.split(";").forEach((dataItem, index) => {
          dataList[index] = dataItem.trim().split(",").filter((item) => item.trim()).map((item) => item.trim());
        });
      } else {
        dataList[0] = data.split(",").filter((item) => item.trim()).map((item) => item.trim());
      }
      return dataList;
    }
    return {};
  }

  // src/js/modules/trigger.js
  $("[data-trigger]").each((index, $trigger) => {
    trigger($trigger, $trigger.dataset.trigger, "trigger", "click");
  });
  function trigger($root, config, configName, eventName) {
    if ($root.__trigger)
      return;
    $root.__trigger = true;
    config = parseDataList(config);
    Object.keys(config).forEach((index) => {
      const data = config[index];
      let triggerElement = data[0] || false;
      const triggerEvent = data[1] || false;
      const triggerDelay = data[2];
      if (triggerElement === "window")
        triggerElement = window;
      if (triggerElement === "document")
        triggerElement = document;
      if (triggerElement && triggerEvent) {
        if (triggerDelay) {
          if (!isNumber(triggerDelay)) {
            console.error("trigger delay error: ", triggerDelay, " only Number");
            return;
          }
          $($root).on(eventName, () => {
            setTimeout(
              () => {
                $(triggerElement).trigger(triggerEvent, [parceDataset(), $root]);
              },
              triggerDelay
            );
          });
        } else {
          $($root).on(eventName, () => {
            $(triggerElement).trigger(triggerEvent, [parceDataset(), $root]);
          });
        }
      }
    });
    function parceDataset() {
      let triggerData = {};
      Object.keys($root.dataset).forEach((data) => {
        if (data != configName) {
          triggerData[data] = $root.dataset[data];
        }
      });
      return triggerData;
    }
  }

  // src/js/form/control.js
  $('.js-form button[type="submit"]').click(function(event) {
    $(this).parents("form").find(":input[name]").each(function(index, $input) {
      if ($input.required) {
        $($input).trigger("inputRequired");
      }
    });
  });

  // src/js/utility/validInput.js
  function validInput($input, box) {
    if ($input.__mask !== void 0) {
      return $input.__mask;
    } else if ($input.type === "radio") {
      if (!$input.required) {
        if ($input.value.length) {
          return true;
        } else {
          return false;
        }
      }
      let radioList = document.querySelectorAll('input[type="radio"][name="' + $input.name + '"]');
      if (box && box instanceof HTMLElement) {
        radioList = box.querySelectorAll('input[type="radio"][name="' + $input.name + '"]');
      }
      for (var i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) {
          if (radioList[i].value.length) {
            return true;
          } else {
            return false;
          }
        }
      }
      return false;
    } else if ($input.type === "checkbox") {
      if (!$input.required) {
        return true;
      }
      return $input.checked;
    } else if ($input.type === "email") {
      if ($input.validity.patternMismatch) {
        return $input.validity.valid;
      }
      if ($input.value.length !== 0 && $input.validity.valid) {
        return true;
      }
      if (!$input.required && $input.validity.valid) {
        return true;
      }
      return false;
    } else if ($input.type === "number") {
      if ($input.validity.patternMismatch) {
        return $input.validity.valid;
      }
      if ($input.value.length !== 0 && !$input.validity.badInput) {
        return true;
      }
      if (!$input.required && !$input.validity.badInput) {
        return true;
      }
      return false;
    } else {
      if ($input.validity.patternMismatch) {
        return $input.validity.valid;
      }
      return !!$input.value.length;
    }
  }

  // src/js/form/input.js
  $("[data-input]").each((index, $input) => {
    const $box = $($input).parents("[data-input-box]").length ? $($input).parents("[data-input-box]")[0] : false;
    inputSetup($input, $box);
  });
  function inputSetup($input, $box) {
    if ($input.__input)
      return;
    $input.__input = true;
    const $validBox = $box ? $($box) : $($input);
    $($input).on("change focus", (e) => {
      if ($input.required) {
        $validBox.removeClass("_required");
      }
      $validBox.removeClass("_error _" + $input.type);
    });
    $($input).on("inputRequired", (e) => {
      if ($input.required && !validInput($input, $box)) {
        $validBox.addClass("_required");
      }
    });
    $($input).on("focusout", (e) => {
      if ($input.required) {
        if ($input.__mask !== void 0 && !$input.__mask) {
          setTimeout(function() {
            $validBox.addClass("_required");
          }, 0);
        } else if ($input.value.length === 0) {
          $validBox.addClass("_required");
        } else if (!validInput($input, $box)) {
          $validBox.addClass("_error _" + $input.type);
        }
      } else if (!validInput($input, $box)) {
        if (!($input.__mask !== void 0 && !$input.__mask) && $input.value.length !== 0) {
          $validBox.addClass("_error _" + $input.type);
        }
      }
    });
  }

  // src/js/form/file.js
  function formFiles(element) {
    let files = [];
    for (let index = 0; index < element.files.length; index++) {
      files[index] = element.files[index].name;
    }
    $(element).parent().attr("title", files.toString());
    $(element).parents(".form-file").find(".form-file__quantity").children(".form-file__number").text(element.files.length);
    $(element).parents(".form-file").find(".form-file__quantity").addClass("_active");
  }
  $(".form-file__input").change(function() {
    formFiles(this);
  });
  $(".form-file__input").each(function(i, element) {
    if (element.files.length >= 1) {
      formFiles(element);
    }
  });

  // src/js/form/ajax.js
  $(".js-form").submit(function() {
    const formName = $(this);
    const formNameThis = this;
    formName.find("button").prop("disabled", true);
    $.extend({
      getUrlVars: function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
        for (var i = 0; i < hashes.length; i++) {
          hash = hashes[i].split("=");
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
        }
        return vars;
      },
      getUrlVar: function(name) {
        return $.getUrlVars()[name];
      }
    });
    var utm_source = $.getUrlVar("utm_source");
    var utm_medium = $.getUrlVar("utm_medium");
    var utm_campaign = $.getUrlVar("utm_campaign");
    const data = new FormData();
    if (utm_source)
      data.append("utm_source", utm_source);
    if (utm_medium)
      data.append("utm_medium", utm_medium);
    if (utm_campaign)
      data.append("utm_campaign", utm_campaign);
    data.append("url-page", window.location.href);
    if (window.matchMedia("(max-width: 500px)").matches) {
      data.append("device", "mobile");
    } else {
      data.append("device", "pk");
    }
    formName.find(":input[name]").each(function(i, $input) {
      if ($input.type == "file" && $input.multiple) {
        let files = $input.files;
        for (var i = 0; i < files.length; i++) {
          data.append("files[]", files[i]);
        }
      } else if ($input.type == "file") {
        data.append($($input).attr("name"), $($input).prop("files")[0]);
      } else if ($input.type == "radio" && $input.type == "checkbox") {
        let field = $(this);
        if ($input.checked) {
          data.append(field.attr("name"), field.val());
        }
      } else {
        let field = $(this);
        if (field.val()) {
          data.append(field.attr("name"), field.val());
        }
      }
    });
    $.ajax({
      url: formNameThis.attributes.action ? formNameThis.attributes.action.value : "form/form.php",
      type: "POST",
      data,
      contentType: false,
      cache: false,
      processData: false,
      success: function(e) {
        formName.trigger("reset"), formName.find(":input").trigger("form-reset"), formName.find("button").prop("disabled", false);
        window.location.href = formName.data("next-page") || "/thanks.html";
      },
      error: function(e, i, t) {
        formName.find(".form-send__message").fadeIn(350);
        setTimeout(function() {
          formName.find(".form-send__loading").hide();
          formName.find(".form-send__error").show();
        }, 350);
        setTimeout(function() {
          formName.find(".form-send__message").fadeOut();
        }, 3500);
        formName.find("button").prop("disabled", false);
      }
    });
    return false;
  });

  // src/js/plugins/lazy.js
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img.lazy");
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    let myLazyLoad = new LazyLoad();
    myLazyLoad.update();
  }

  // src/js/plugins/gsap.js
  gsap.registerPlugin(ScrollTrigger);

  // src/template/menu-modal/menu-modal.js
  var menuToggle = false;
  $("#menu-modal-open").on("click", function() {
    $("#menu-modal").fadeToggle();
    $(this).toggleClass("_active");
    $("#header").toggleClass("_menu-active");
    $("html, body").animate({ scrollTop: 0 }, 0);
    if (!menuToggle) {
      menuToggle = true;
      scrollOffset("menu-modal-open");
    } else {
      menuToggle = false;
      scrollOffset("menu-modal-open", "close");
    }
  });
  $(".menu-modal__link.scroll").click(function() {
    $("#menu-modal").fadeOut();
    $("#header").removeClass("_menu-active");
    $("#menu-modal-open").removeClass("_active");
    scrollOffset("menu-modal-open", "close");
    menuToggle = false;
  });

  // src/js/preloader.js
  new WOW().init();
})();
