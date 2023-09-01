Fancybox.bind("[data-fancybox]", {
  //Thumbs:  {
  //  autoStart: false,
  //},
  //Image: {
  //  zoom: false
  //}
  	hideScrollbar: false,
  	on: {
        ready: (fancybox, slide) => {
            $(window).trigger('scrollOffsetOpen', {target: fancybox.options.target})
        },
        destroy: (fancybox, slide) => {
            $(window).trigger('scrollOffsetClose', {target: fancybox.options.target})
        }
    }
});
