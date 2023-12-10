(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // src/js/utility/util.js
  var isObject = (val) => toString.call(val).slice(8, -1) === "Object";
  var isString = (val) => typeof val === "string";
  var isFunction = (val) => typeof val === "function";
  var isHTMLElement = (val) => val instanceof HTMLElement;
  var isNumber = (val) => !!Number(val);

  // src/components/scroll-offset/scroll-offset.js
  var SOList = [];
  function scrollOffsetEscape(e) {
    if (e.key === "Escape") {
      const $root = SOList[SOList.length - 1];
      $($root).trigger("scrollOffsetClose", { target: $root });
    }
  }
  $(window).on("scrollOffsetOpen", (e, data) => {
    if (data && data.target) {
      if (isHTMLElement(data.target)) {
        SOList.push(data.target);
        if (SOList.length === 1) {
          document.body.classList.add("scroll-offset");
          window.addEventListener("keyup", scrollOffsetEscape);
        }
      }
    }
  });
  $(window).on("scrollOffsetClose", (e, data) => {
    if (data && data.target) {
      if (isHTMLElement(data.target)) {
        if (SOList.includes(data.target))
          SOList.splice(SOList.indexOf(data.target), 1);
        if (SOList.length === 0) {
          document.body.classList.remove("scroll-offset");
          window.removeEventListener("keyup", scrollOffsetEscape);
        }
      }
    }
  });
  $(window).on("scrollOffsetAllClose", (e) => {
    const SOItems = [];
    SOList.forEach(($item) => {
      SOItems.unshift($item);
    });
    SOItems.forEach(($item) => {
      $($item).trigger("scrollOffsetClose", { target: $item });
    });
  });
  var addStyleOffset = document.createElement("style");
  var bodyWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
  $(window).one("scrollOffsetOpen", null, () => {
    addStyleOffset.innerHTML = ":root{--scroll-offset-init: " + bodyWidth + "px;}";
    document.getElementsByTagName("head")[0].appendChild(addStyleOffset);
  });
  window.addEventListener("resize", function() {
    addStyleOffset.innerHTML = ":root{ --scroll-offset-init:" + (window.innerWidth - document.documentElement.getBoundingClientRect().width) + "px;}";
  });

  // src/components/modal/modal.js
  var Modal = class {
    constructor(config) {
      this.config = isObject(config) ? config : {};
      if (isHTMLElement(config.root)) {
        this.init(config.root);
      } else if (config.name) {
        config.name = config.name.trim();
        if (modalList[config.name]) {
          modalList[config.name].forEach(($modal) => {
            this.init($modal);
          });
        }
      } else {
        console.log('Error: {name: "modal" || root: HTMLElement}');
      }
    }
    init($root) {
      const config = this.config;
      $($root).on("modalOpen", (e, data, $trigger) => {
        this.open($root, data, $trigger);
        return false;
      });
      $($root).on("scrollOffsetClose", (e, data, $trigger) => {
        this.close($root, data);
        return false;
      });
      $($root).on("modalClose", (e, data, $trigger) => {
        this.close($root, data, $trigger);
        return false;
      });
      $(window).on("modalCloseAll", (e, data, $trigger) => {
        this.close($root, data, $trigger);
      });
      $($root).find("[data-modal-close]").on("click", (e) => {
        this.close($root, config);
      });
      if (config.setup && isFunction(config.setup))
        config.setup($root);
    }
    open($root, data, $trigger) {
      const config = this.config;
      if (config.onOpen && isFunction(config.onOpen))
        config.onOpen($root, data, $trigger);
      if (config.onOpenReplace && isFunction(config.onOpenReplace))
        config.onOpenReplace($root, data, $trigger);
      else {
        $($root).fadeIn(400);
      }
      $(window).trigger("scrollOffsetOpen", { target: $root });
      if (config.onOpenAfter && isFunction(config.onOpenAfter))
        config.onOpenAfter($root, data, $trigger);
    }
    close($root, data, $trigger) {
      const config = this.config;
      if (config.onClose && isFunction(config.onClose))
        config.onClose($root, data, $trigger);
      if (config.onCloseReplace && isFunction(config.onCloseReplace))
        config.onCloseReplace($root, data, $trigger);
      else {
        $($root).fadeOut(400);
      }
      $(window).trigger("scrollOffsetClose", { target: $root });
      if (config.onCloseAfter && isFunction(config.onCloseAfter))
        config.onCloseAfter($root, data, $trigger);
    }
  };
  var modalList = {};
  $("[data-modal]").each((indexModal, $modal) => {
    const modalName = $modal.dataset.modal.trim();
    if (modalName.length) {
      if (!modalList[modalName])
        modalList[modalName] = [];
      modalList[modalName].push($modal);
    } else {
      new Modal({
        root: $modal
      });
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

  // src/js/utility/units.js
  var Units = class {
    constructor($root, stop) {
      __publicField(this, "unitList", {});
      __publicField(this, "unitNameList", /* @__PURE__ */ new Map());
      if (!($root instanceof HTMLElement)) {
        console.error($root, "only HTMLElement");
        return;
      }
      if (stop && !(typeof stop === "function")) {
        console.group("Error stop");
        console.error('Argument "', stop, '" only function');
        console.error("root: ", $root);
        console.groupEnd();
        stop = () => {
          return true;
        };
      }
      this.stop = stop ? stop : () => {
        return true;
      };
      this.$root = $root;
    }
    //*
    init() {
      this.parseUnits(this.$root);
      const unit = this.unit.bind(this);
      return unit;
    }
    update() {
      this.unitList = {};
      this.unitNameList = /* @__PURE__ */ new Map();
      this.parseUnits(this.$root);
    }
    destroy() {
      this.unitNameList = {};
      this.unitList = {};
    }
    parseUnits($units) {
      if ($units.children.length) {
        for (let index = 0; index < $units.children.length; index++) {
          const $unit = $units.children[index];
          let unitValue = $unit.dataset["unit:stop"] || $unit.dataset.unit;
          if (unitValue && unitValue.trim().length) {
            if (unitValue.includes(" ")) {
              let unitList = unitValue.split(" ");
              unitList.forEach((unitName) => {
                this.createUnit($unit, unitName);
              });
              this.unitNameList.set($unit, unitList.filter((unit) => unit.trim()));
            } else {
              this.createUnit($unit, unitValue);
              this.unitNameList.set($unit, [unitValue]);
            }
          }
          if (!$unit.dataset["unit:stop"] && this.stop($unit) && $unit.children.length)
            this.parseUnits($unit);
        }
      }
    }
    createUnit($unit, unitName) {
      unitName = unitName.trim();
      if (unitName.startsWith("#") && unitName.length >= 2) {
        if (!this.unitList[unitName]) {
          this.unitList[unitName] = [];
          this.unitList[unitName].push($unit);
        }
      } else if (unitName.length) {
        if (!this.unitList[unitName])
          this.unitList[unitName] = [];
        this.unitList[unitName].push($unit);
      }
    }
    unit(unitValue, unitHandler) {
      let unitList = [];
      if (!unitValue) {
        console.log("Missing value unit");
        return;
      }
      if (!isString(unitValue)) {
        console.log("value only String");
        return;
      }
      unitValue = unitValue.trim();
      if (!unitValue.length)
        return void 0;
      if (unitValue.includes(" ")) {
        let unitValueList = unitValue.split(" ").filter((unit) => unit.trim()).sort();
        const unitValueListStr = unitValueList.join(" ");
        if (this.unitList[unitValueListStr])
          unitList = this.unitList[unitValueListStr];
        else {
          unitValueList.forEach((unitName) => {
            if (this.unitList[unitName]) {
              unitList = unitList.concat(unitList, this.unitList[unitName]);
            }
          });
          unitList = Array.from(new Set(unitList));
          this.unitList[unitValueListStr] = unitList;
        }
      } else {
        if (this.unitList[unitValue])
          unitList = this.unitList[unitValue];
      }
      if (unitHandler && typeof unitHandler === "function") {
        unitList.forEach(($unit, indexUnit) => {
          unitHandler($unit, indexUnit, this.unitNameList.get($unit));
        });
      }
      return unitList;
    }
  };

  // src/components/slider/scripts/core.js
  var sliderWidth = window.innerWidth;
  function _slider(e) {
    if (e) {
      if (sliderWidth === e.target.innerWidth)
        return;
      else
        sliderWidth = e.target.innerWidth;
    }
    document.querySelectorAll("[data-slider]").forEach((slider) => {
      const units = new Units(slider, (item) => item.dataset.slider === void 0);
      const $unit = units.init();
      const $sliderInit = $unit("#init")[0];
      if (!$sliderInit)
        return;
      const $wrapper = $unit("#wrapper")[0];
      const $slides = $unit("slide");
      let sliderConfig = {
        slidesPerView: 1,
        spaceBetween: 10,
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
          nextEl: $unit("#next"),
          prevEl: $unit("#prev")
        },
        pagination: {
          el: $unit("#pagination"),
          type: "bullets",
          clickable: true
        },
        //*
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2
        }
      };
      let sliderDataConfig = slider.dataset.config.split(",") || void 0;
      function sliderData(element, callback) {
        if (sliderDataConfig && sliderDataConfig.find((el) => el.trim() == element)) {
          callback();
        }
      }
      if ($sliderInit.swiper) {
        if ($wrapper)
          $wrapper.removeAttribute("style");
        if ($slides)
          $slides.forEach((element) => element.removeAttribute("style"));
        $sliderInit.swiper.detachEvents();
        $sliderInit.swiper.destroy();
      }
      if (sliderConfig)
        new Swiper($sliderInit, sliderConfig);
    });
    window.addEventListener("resize", _slider);
  }
  _slider();

  // src/components/video/video.js
  var player = [];
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  function initVideo(id, src) {
    player[id] = new YT.Player(id, {
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
      initVideo(idVideo, srcVideo);
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
          const dataValue = $root.dataset[data].trim();
          triggerData[data] = Number(dataValue) ? Number(dataValue) : dataValue === "true" ? true : dataValue === "false" ? false : dataValue;
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
        if (!($input.__mask !== void 0 && !$input.__mask) && ($input.value.length !== 0 || $input.type === "number" && !$input.validity.valid)) {
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
      } else if ($input.type == "radio" || $input.type == "checkbox") {
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

  // src/template/menu-modal/menu-modal.js
  var menuToggle = false;
  $("#menu-modal-open").each((index, $menuToggle) => {
    $($menuToggle).on("click", function() {
      $("#menu-modal").fadeToggle();
      $($menuToggle).toggleClass("_active");
      $("#header").toggleClass("_menu-active");
      $("html, body").animate({ scrollTop: 0 }, 0);
      if (!menuToggle) {
        menuToggle = true;
        $(window).trigger("scrollOffsetOpen", { target: $menuToggle });
      } else {
        menuToggle = false;
        $(window).trigger("scrollOffsetClose", { target: $menuToggle });
      }
    });
    function menuClose() {
      $("#menu-modal").fadeOut();
      $("#header").removeClass("_menu-active");
      $("#menu-modal-open").removeClass("_active");
      $(window).trigger("scrollOffsetClose", { target: $menuToggle });
      menuToggle = false;
      return false;
    }
    $($menuToggle).on("scrollOffsetClose", menuClose);
    $(".menu-modal__link.scroll").click(menuClose);
  });

  // src/template/modal/modal-form/modal-form.js
  new Modal({
    name: "form",
    setup($modal) {
    },
    onOpen($root, data, $trigger) {
      if (Object.keys(data).length) {
        if (data.modalTitle) {
          $($root).find('[name="form-title"]').val("PopUp: " + data.modalTitle);
          $($root).find("[data-modal-title]").text(data.modalTitle);
        } else {
          const textTitle = $($root).find("[data-modal-title]").data("modal-title");
          $($root).find('[name="form-title"]').val("PopUp: " + textTitle);
          $($root).find("[data-modal-title]").text(textTitle);
        }
        if (data.info) {
          $($root).find('[name="info"]').val(data.info);
        }
      }
    },
    onClose($root) {
      $($root).find('[name="info"]').val("");
    }
  });

  // src/template/modal/modal-video/modal-video.js
  new Modal({
    name: "youtube-video",
    onOpen($modal, data, $trigger) {
      if (data.videoSrc) {
        if (!$($modal).find("iframe.video__frame").length) {
          initVideo($($modal).find(".video__frame").attr("id"), data.videoSrc);
        } else {
          player[$($modal).find(".video__frame").attr("id")].loadVideoById({ videoId: data.videoSrc });
        }
      }
    },
    onClose($modal) {
      if ($($modal).find("iframe").length) {
        player[$($modal).find(".video__frame")[0].id].pauseVideo();
      }
    }
  });

  // src/js/preloader.js
  new WOW().init();
})();
