(function (a) {
  a.fn.twentytwenty = function (b) {
    var b = a.extend(
      {
        default_offset_pct: 0.5,
        orientation: "horizontal",
        before_label: "Before",
        after_label: "After",
        no_overlay: true,
        move_slider_on_hover: false,
        move_with_handle_only: true,
        click_to_move: false,
      },
      b
    );
    return this.each(function () {
      var x = b.default_offset_pct;
      var h = a(this);
      var c = b.orientation;
      var m = c === "vertical" ? "down" : "left";
      var e = c === "vertical" ? "up" : "right";
      h.wrap("<div class='twentytwenty-wrapper twentytwenty-" + c + "'></div>");
      if (!b.no_overlay) {
        h.append("<div class='twentytwenty-overlay'></div>");
        var t = h.find(".twentytwenty-overlay");
        t.append(
          "<div class='twentytwenty-before-label' data-content='" +
            b.before_label +
            "'></div>"
        );
        t.append(
          "<div class='twentytwenty-after-label' data-content='" +
            b.after_label +
            "'></div>"
        );
      }
      var n = h.find("img:first");
      var l = h.find("img:last");
      h.append("<div class='twentytwenty-handle'></div>");
      var k = h.find(".twentytwenty-handle");
      k.append('<svg class="icon"><use xlink:href="svg-sprite/sprite.svg#arrow"></use></svg>');
      k.append('<svg class="icon rotate"><use xlink:href="svg-sprite/sprite.svg#arrow"></use></svg>');
      h.addClass("twentytwenty-container");
      n.addClass("twentytwenty-before");
      l.addClass("twentytwenty-after");
      var v = function (z) {
        var y = n.width();
        var A = n.height();
        return { w: y + "px", h: A + "px", cw: z * y + "px", ch: z * A + "px" };
      };
      var o = function (y) {
        if (c === "vertical") {
          n.css("clip", "rect(0," + y.w + "," + y.ch + ",0)");
          l.css("clip", "rect(" + y.ch + "," + y.w + "," + y.h + ",0)");
        } else {
          n.css("clip", "rect(0," + y.cw + "," + y.h + ",0)");
          l.css("clip", "rect(0," + y.w + "," + y.h + "," + y.cw + ")");
        }
        //h.css("height", y.h);
      };
      var d = function (y) {
        var z = v(y);
        k.css(
          c === "vertical" ? "top" : "left",
          c === "vertical" ? z.ch : z.cw
        );
        o(z);
      };
      var i = function (z, A, y) {
        return Math.max(A, Math.min(y, z));
      };
      var j = function (A, z) {
        var y = c === "vertical" ? (z - s) / r : (A - u) / g;
        return i(y, 0, 1);
      };
      a(window).on("resize.twentytwenty", function (y) {
        d(x);
      });
      var u = 0;
      var s = 0;
      var g = 0;
      var r = 0;
      var w = function (y) {
        if (
          ((y.distX > y.distY && y.distX < -y.distY) ||
            (y.distX < y.distY && y.distX > -y.distY)) &&
          c !== "vertical"
        ) {
          y.preventDefault();
        } else {
          if (
            ((y.distX < y.distY && y.distX < -y.distY) ||
              (y.distX > y.distY && y.distX > -y.distY)) &&
            c === "vertical"
          ) {
            y.preventDefault();
          }
        }
        h.addClass("active");
        u = h.offset().left;
        s = h.offset().top;
        g = n.width();
        r = n.height();
      };
      var f = function (y) {
        if (h.hasClass("active")) {
          x = j(y.pageX, y.pageY);
          d(x);
        }
      };
      var q = function () {
        h.removeClass("active");
      };
      var p = b.move_with_handle_only ? k : h;
      p.on("movestart", w);
      p.on("move", f);
      p.on("moveend", q);
      if (b.move_slider_on_hover) {
        h.on("mouseenter", w);
        h.on("mousemove", f);
        h.on("mouseleave", q);
      }
      k.on("touchmove", function (y) {
        y.preventDefault();
      });
      h.find("img").on("mousedown", function (y) {
        y.preventDefault();
      });
      if (b.click_to_move) {
        h.on("click", function (y) {
          u = h.offset().left;
          s = h.offset().top;
          g = n.width();
          r = n.height();
          x = j(y.pageX, y.pageY);
          d(x);
        });
      }
      a(window).trigger("resize.twentytwenty");
    });
  };
})(jQuery);
