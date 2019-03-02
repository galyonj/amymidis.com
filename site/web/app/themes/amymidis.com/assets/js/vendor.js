"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Bootstrap v3.4.0 (https://getbootstrap.com/)
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under the MIT license
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery');
}

+function ($) {
  'use strict';

  var version = $.fn.jquery.split(' ')[0].split('.');

  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] > 3) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4');
  }
}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap');
    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }

    return false; // explicit for ie8 (  ._.)
  } // https://blog.alexmaccaw.com/css-transitions


  $.fn.emulateTransitionEnd = function (duration) {
    var called = false;
    var $el = this;
    $(this).one('bsTransitionEnd', function () {
      called = true;
    });

    var callback = function callback() {
      if (!called) $($el).trigger($.support.transition.end);
    };

    setTimeout(callback, duration);
    return this;
  };

  $(function () {
    $.support.transition = transitionEnd();
    if (!$.support.transition) return;
    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function handle(e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
      }
    };
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]';

  var Alert = function Alert(el) {
    $(el).on('click', dismiss, this.close);
  };

  Alert.VERSION = '3.4.0';
  Alert.TRANSITION_DURATION = 150;

  Alert.prototype.close = function (e) {
    var $this = $(this);
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    selector = selector === '#' ? [] : selector;
    var $parent = $(document).find(selector);
    if (e) e.preventDefault();

    if (!$parent.length) {
      $parent = $this.closest('.alert');
    }

    $parent.trigger(e = $.Event('close.bs.alert'));
    if (e.isDefaultPrevented()) return;
    $parent.removeClass('in');

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove();
    }

    $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
  }; // ALERT PLUGIN DEFINITION
  // =======================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.alert');
      if (!data) $this.data('bs.alert', data = new Alert(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.alert;
  $.fn.alert = Plugin;
  $.fn.alert.Constructor = Alert; // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  }; // ALERT DATA-API
  // ==============


  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function Button(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
    this.isLoading = false;
  };

  Button.VERSION = '3.4.0';
  Button.DEFAULTS = {
    loadingText: 'loading...'
  };

  Button.prototype.setState = function (state) {
    var d = 'disabled';
    var $el = this.$element;
    var val = $el.is('input') ? 'val' : 'html';
    var data = $el.data();
    state += 'Text';
    if (data.resetText == null) $el.data('resetText', $el[val]()); // push to event loop to allow forms to submit

    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state]);

      if (state == 'loadingText') {
        this.isLoading = true;
        $el.addClass(d).attr(d, d).prop(d, true);
      } else if (this.isLoading) {
        this.isLoading = false;
        $el.removeClass(d).removeAttr(d).prop(d, false);
      }
    }, this), 0);
  };

  Button.prototype.toggle = function () {
    var changed = true;
    var $parent = this.$element.closest('[data-toggle="buttons"]');

    if ($parent.length) {
      var $input = this.$element.find('input');

      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false;
        $parent.find('.active').removeClass('active');
        this.$element.addClass('active');
      } else if ($input.prop('type') == 'checkbox') {
        if ($input.prop('checked') !== this.$element.hasClass('active')) changed = false;
        this.$element.toggleClass('active');
      }

      $input.prop('checked', this.$element.hasClass('active'));
      if (changed) $input.trigger('change');
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
      this.$element.toggleClass('active');
    }
  }; // BUTTON PLUGIN DEFINITION
  // ========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.button');
      var options = _typeof(option) == 'object' && option;
      if (!data) $this.data('bs.button', data = new Button(this, options));
      if (option == 'toggle') data.toggle();else if (option) data.setState(option);
    });
  }

  var old = $.fn.button;
  $.fn.button = Plugin;
  $.fn.button.Constructor = Button; // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  }; // BUTTON DATA-API
  // ===============


  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target).closest('.btn');
    Plugin.call($btn, 'toggle');

    if (!$(e.target).is('input[type="radio"], input[type="checkbox"]')) {
      // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
      e.preventDefault(); // The target component still receive the focus

      if ($btn.is('input,button')) $btn.trigger('focus');else $btn.find('input:visible,button:visible').first().trigger('focus');
    }
  }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function Carousel(element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find('.carousel-indicators');
    this.options = options;
    this.paused = null;
    this.sliding = null;
    this.interval = null;
    this.$active = null;
    this.$items = null;
    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));
    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
  };

  Carousel.VERSION = '3.4.0';
  Carousel.TRANSITION_DURATION = 600;
  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  };

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return;

    switch (e.which) {
      case 37:
        this.prev();
        break;

      case 39:
        this.next();
        break;

      default:
        return;
    }

    e.preventDefault();
  };

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);
    this.interval && clearInterval(this.interval);
    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
    return this;
  };

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item');
    return this.$items.index(item || this.$active);
  };

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active);
    var willWrap = direction == 'prev' && activeIndex === 0 || direction == 'next' && activeIndex == this.$items.length - 1;
    if (willWrap && !this.options.wrap) return active;
    var delta = direction == 'prev' ? -1 : 1;
    var itemIndex = (activeIndex + delta) % this.$items.length;
    return this.$items.eq(itemIndex);
  };

  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));
    if (pos > this.$items.length - 1 || pos < 0) return;
    if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
      that.to(pos);
    }); // yes, "slid"

    if (activeIndex == pos) return this.pause().cycle();
    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
  };

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }

    this.interval = clearInterval(this.interval);
    return this;
  };

  Carousel.prototype.next = function () {
    if (this.sliding) return;
    return this.slide('next');
  };

  Carousel.prototype.prev = function () {
    if (this.sliding) return;
    return this.slide('prev');
  };

  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find('.item.active');
    var $next = next || this.getItemForDirection(type, $active);
    var isCycling = this.interval;
    var direction = type == 'next' ? 'left' : 'right';
    var that = this;
    if ($next.hasClass('active')) return this.sliding = false;
    var relatedTarget = $next[0];
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    });
    this.$element.trigger(slideEvent);
    if (slideEvent.isDefaultPrevented()) return;
    this.sliding = true;
    isCycling && this.pause();

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active');
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
      $nextIndicator && $nextIndicator.addClass('active');
    }

    var slidEvent = $.Event('slid.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    }); // yes, "slid"

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type);

      if (_typeof($next) === 'object' && $next.length) {
        $next[0].offsetWidth; // force reflow
      }

      $active.addClass(direction);
      $next.addClass(direction);
      $active.one('bsTransitionEnd', function () {
        $next.removeClass([type, direction].join(' ')).addClass('active');
        $active.removeClass(['active', direction].join(' '));
        that.sliding = false;
        setTimeout(function () {
          that.$element.trigger(slidEvent);
        }, 0);
      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
    } else {
      $active.removeClass('active');
      $next.addClass('active');
      this.sliding = false;
      this.$element.trigger(slidEvent);
    }

    isCycling && this.cycle();
    return this;
  }; // CAROUSEL PLUGIN DEFINITION
  // ==========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.carousel');
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), _typeof(option) == 'object' && option);
      var action = typeof option == 'string' ? option : options.slide;
      if (!data) $this.data('bs.carousel', data = new Carousel(this, options));
      if (typeof option == 'number') data.to(option);else if (action) data[action]();else if (options.interval) data.pause().cycle();
    });
  }

  var old = $.fn.carousel;
  $.fn.carousel = Plugin;
  $.fn.carousel.Constructor = Carousel; // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  }; // CAROUSEL DATA-API
  // =================


  var clickHandler = function clickHandler(e) {
    var $this = $(this);
    var href = $this.attr('href');

    if (href) {
      href = href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7
    }

    var target = $this.attr('data-target') || href;
    var $target = $(document).find(target);
    if (!$target.hasClass('carousel')) return;
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr('data-slide-to');
    if (slideIndex) options.interval = false;
    Plugin.call($target, options);

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex);
    }

    e.preventDefault();
  };

  $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);
  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      Plugin.call($carousel, $carousel.data());
    });
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict'; // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function Collapse(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
    this.transitioning = null;

    if (this.options.parent) {
      this.$parent = this.getParent();
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger);
    }

    if (this.options.toggle) this.toggle();
  };

  Collapse.VERSION = '3.4.0';
  Collapse.TRANSITION_DURATION = 350;
  Collapse.DEFAULTS = {
    toggle: true
  };

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width');
    return hasWidth ? 'width' : 'height';
  };

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return;
    var activesData;
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse');
      if (activesData && activesData.transitioning) return;
    }

    var startEvent = $.Event('show.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    if (actives && actives.length) {
      Plugin.call(actives, 'hide');
      activesData || actives.data('bs.collapse', null);
    }

    var dimension = this.dimension();
    this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);
    this.$trigger.removeClass('collapsed').attr('aria-expanded', true);
    this.transitioning = 1;

    var complete = function complete() {
      this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('');
      this.transitioning = 0;
      this.$element.trigger('shown.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);
    var scrollSize = $.camelCase(['scroll', dimension].join('-'));
    this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
  };

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return;
    var startEvent = $.Event('hide.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;
    var dimension = this.dimension();
    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
    this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);
    this.$trigger.addClass('collapsed').attr('aria-expanded', false);
    this.transitioning = 1;

    var complete = function complete() {
      this.transitioning = 0;
      this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);
    this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
  };

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']();
  };

  Collapse.prototype.getParent = function () {
    return $(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
      var $element = $(element);
      this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
    }, this)).end();
  };

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in');
    $element.attr('aria-expanded', isOpen);
    $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
  };

  function getTargetFromTrigger($trigger) {
    var href;
    var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

    return $(document).find(target);
  } // COLLAPSE PLUGIN DEFINITION
  // ==========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.collapse');
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), _typeof(option) == 'object' && option);
      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
      if (!data) $this.data('bs.collapse', data = new Collapse(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.collapse;
  $.fn.collapse = Plugin;
  $.fn.collapse.Constructor = Collapse; // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  }; // COLLAPSE DATA-API
  // =================


  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this = $(this);
    if (!$this.attr('data-target')) e.preventDefault();
    var $target = getTargetFromTrigger($this);
    var data = $target.data('bs.collapse');
    var option = data ? 'toggle' : $this.data();
    Plugin.call($target, option);
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop';
  var toggle = '[data-toggle="dropdown"]';

  var Dropdown = function Dropdown(element) {
    $(element).on('click.bs.dropdown', this.toggle);
  };

  Dropdown.VERSION = '3.4.0';

  function getParent($this) {
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = selector && $(document).find(selector);
    return $parent && $parent.length ? $parent : $this.parent();
  }

  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function () {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = {
        relatedTarget: this
      };
      if (!$parent.hasClass('open')) return;
      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.attr('aria-expanded', 'false');
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget));
    });
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);
    if ($this.is('.disabled, :disabled')) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');
    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
      }

      var relatedTarget = {
        relatedTarget: this
      };
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.trigger('focus').attr('aria-expanded', 'true');
      $parent.toggleClass('open').trigger($.Event('shown.bs.dropdown', relatedTarget));
    }

    return false;
  };

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
    var $this = $(this);
    e.preventDefault();
    e.stopPropagation();
    if ($this.is('.disabled, :disabled')) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus');
      return $this.trigger('click');
    }

    var desc = ' li:not(.disabled):visible a';
    var $items = $parent.find('.dropdown-menu' + desc);
    if (!$items.length) return;
    var index = $items.index(e.target);
    if (e.which == 38 && index > 0) index--; // up

    if (e.which == 40 && index < $items.length - 1) index++; // down

    if (!~index) index = 0;
    $items.eq(index).trigger('focus');
  }; // DROPDOWN PLUGIN DEFINITION
  // ==========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.dropdown');
      if (!data) $this.data('bs.dropdown', data = new Dropdown(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.dropdown;
  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown; // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  }; // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================


  $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
    e.stopPropagation();
  }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#modals
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // MODAL CLASS DEFINITION
  // ======================

  var Modal = function Modal(element, options) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$dialog = this.$element.find('.modal-dialog');
    this.$backdrop = null;
    this.isShown = null;
    this.originalBodyPad = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = false;
    this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom';

    if (this.options.remote) {
      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal');
      }, this));
    }
  };

  Modal.VERSION = '3.4.0';
  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;
  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget);
  };

  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event('show.bs.modal', {
      relatedTarget: _relatedTarget
    });
    this.$element.trigger(e);
    if (this.isShown || e.isDefaultPrevented()) return;
    this.isShown = true;
    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass('modal-open');
    this.escape();
    this.resize();
    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
      });
    });
    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade');

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body); // don't move modals dom position
      }

      that.$element.show().scrollTop(0);
      that.adjustDialog();

      if (transition) {
        that.$element[0].offsetWidth; // force reflow
      }

      that.$element.addClass('in');
      that.enforceFocus();
      var e = $.Event('shown.bs.modal', {
        relatedTarget: _relatedTarget
      });
      transition ? that.$dialog // wait for modal to slide in
      .one('bsTransitionEnd', function () {
        that.$element.trigger('focus').trigger(e);
      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
    });
  };

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault();
    e = $.Event('hide.bs.modal');
    this.$element.trigger(e);
    if (!this.isShown || e.isDefaultPrevented()) return;
    this.isShown = false;
    this.escape();
    this.resize();
    $(document).off('focusin.bs.modal');
    this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');
    this.$dialog.off('mousedown.dismiss.bs.modal');
    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
  };

  Modal.prototype.enforceFocus = function () {
    $(document).off('focusin.bs.modal') // guard against infinite focus loop
    .on('focusin.bs.modal', $.proxy(function (e) {
      if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.trigger('focus');
      }
    }, this));
  };

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide();
      }, this));
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal');
    }
  };

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
    } else {
      $(window).off('resize.bs.modal');
    }
  };

  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.$body.removeClass('modal-open');
      that.resetAdjustments();
      that.resetScrollbar();
      that.$element.trigger('hidden.bs.modal');
    });
  };

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };

  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass('fade') ? 'fade' : '';

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;
      this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);
      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false;
          return;
        }

        if (e.target !== e.currentTarget) return;
        this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
      }, this));
      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

      this.$backdrop.addClass('in');
      if (!callback) return;
      doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');

      var callbackRemove = function callbackRemove() {
        that.removeBackdrop();
        callback && callback();
      };

      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
    } else if (callback) {
      callback();
    }
  }; // these following methods are used to handle overflowing modals


  Modal.prototype.handleUpdate = function () {
    this.adjustDialog();
  };

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    });
  };

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    });
  };

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth;

    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }

    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = this.measureScrollbar();
  };

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || '';
    var scrollbarWidth = this.scrollbarWidth;

    if (this.bodyIsOverflowing) {
      this.$body.css('padding-right', bodyPad + scrollbarWidth);
      $(this.fixedContent).each(function (index, element) {
        var actualPadding = element.style.paddingRight;
        var calculatedPadding = $(element).css('padding-right');
        $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + scrollbarWidth + 'px');
      });
    }
  };

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad);
    $(this.fixedContent).each(function (index, element) {
      var padding = $(element).data('padding-right');
      $(element).removeData('padding-right');
      element.style.paddingRight = padding ? padding : '';
    });
  };

  Modal.prototype.measureScrollbar = function () {
    // thx walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    this.$body.append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  }; // MODAL PLUGIN DEFINITION
  // =======================


  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.modal');
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), _typeof(option) == 'object' && option);
      if (!data) $this.data('bs.modal', data = new Modal(this, options));
      if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
    });
  }

  var old = $.fn.modal;
  $.fn.modal = Plugin;
  $.fn.modal.Constructor = Modal; // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  }; // MODAL DATA-API
  // ==============


  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this);
    var href = $this.attr('href');
    var target = $this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

    var $target = $(document).find(target);
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({
      remote: !/#/.test(href) && href
    }, $target.data(), $this.data());
    if ($this.is('a')) e.preventDefault();
    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown

      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus');
      });
    });
    Plugin.call($target, option, this);
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function Tooltip(element, options) {
    this.type = null;
    this.options = null;
    this.enabled = null;
    this.timeout = null;
    this.hoverState = null;
    this.$element = null;
    this.inState = null;
    this.init('tooltip', element, options);
  };

  Tooltip.VERSION = '3.4.0';
  Tooltip.TRANSITION_DURATION = 150;
  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  };

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.$viewport = this.options.viewport && $(document).find($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
    this.inState = {
      click: false,
      hover: false,
      focus: false
    };

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
    }

    var triggers = this.options.trigger.split(' ');

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i];

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != 'manual') {
        var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
      }
    }

    this.options.selector ? this._options = $.extend({}, this.options, {
      trigger: 'manual',
      selector: ''
    }) : this.fixTitle();
  };

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS;
  };

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }

    return options;
  };

  Tooltip.prototype.getDelegateOptions = function () {
    var options = {};
    var defaults = this.getDefaults();
    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value;
    });
    return options;
  };

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in';
      return;
    }

    clearTimeout(self.timeout);
    self.hoverState = 'in';
    if (!self.options.delay || !self.options.delay.show) return self.show();
    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show();
    }, self.options.delay.show);
  };

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true;
    }

    return false;
  };

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false;
    }

    if (self.isInStateTrue()) return;
    clearTimeout(self.timeout);
    self.hoverState = 'out';
    if (!self.options.delay || !self.options.delay.hide) return self.hide();
    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide();
    }, self.options.delay.hide);
  };

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);
      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (e.isDefaultPrevented() || !inDom) return;
      var that = this;
      var $tip = this.tip();
      var tipId = this.getUID(this.type);
      this.setContent();
      $tip.attr('id', tipId);
      this.$element.attr('aria-describedby', tipId);
      if (this.options.animation) $tip.addClass('fade');
      var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
      var autoToken = /\s?auto?\s?/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top';
      $tip.detach().css({
        top: 0,
        left: 0,
        display: 'block'
      }).addClass(placement).data('bs.' + this.type, this);
      this.options.container ? $tip.appendTo($(document).find(this.options.container)) : $tip.insertAfter(this.$element);
      this.$element.trigger('inserted.bs.' + this.type);
      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;

      if (autoPlace) {
        var orgPlacement = placement;
        var viewportDim = this.getPosition(this.$viewport);
        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement;
        $tip.removeClass(orgPlacement).addClass(placement);
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
      this.applyPlacement(calculatedOffset, placement);

      var complete = function complete() {
        var prevHoverState = that.hoverState;
        that.$element.trigger('shown.bs.' + that.type);
        that.hoverState = null;
        if (prevHoverState == 'out') that.leave(that);
      };

      $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    }
  };

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight; // manually read margins because getBoundingClientRect includes difference

    var marginTop = parseInt($tip.css('margin-top'), 10);
    var marginLeft = parseInt($tip.css('margin-left'), 10); // we must check for NaN for ie 8/9

    if (isNaN(marginTop)) marginTop = 0;
    if (isNaN(marginLeft)) marginLeft = 0;
    offset.top += marginTop;
    offset.left += marginLeft; // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0

    $.offset.setOffset($tip[0], $.extend({
      using: function using(props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        });
      }
    }, offset), 0);
    $tip.addClass('in'); // check to see if placing tip in new offset caused the tip to resize itself

    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight;
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
    if (delta.left) offset.left += delta.left;else offset.top += delta.top;
    var isVertical = /top|bottom/.test(placement);
    var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';
    $tip.offset(offset);
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
  };

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
  };

  Tooltip.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
    $tip.removeClass('fade in top bottom left right');
  };

  Tooltip.prototype.hide = function (callback) {
    var that = this;
    var $tip = $(this.$tip);
    var e = $.Event('hide.bs.' + this.type);

    function complete() {
      if (that.hoverState != 'in') $tip.detach();

      if (that.$element) {
        // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
      }

      callback && callback();
    }

    this.$element.trigger(e);
    if (e.isDefaultPrevented()) return;
    $tip.removeClass('in');
    $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    this.hoverState = null;
    return this;
  };

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element;

    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }
  };

  Tooltip.prototype.hasContent = function () {
    return this.getTitle();
  };

  Tooltip.prototype.getPosition = function ($element) {
    $element = $element || this.$element;
    var el = $element[0];
    var isBody = el.tagName == 'BODY';
    var elRect = el.getBoundingClientRect();

    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, {
        width: elRect.right - elRect.left,
        height: elRect.bottom - elRect.top
      });
    }

    var isSvg = window.SVGElement && el instanceof window.SVGElement; // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280

    var elOffset = isBody ? {
      top: 0,
      left: 0
    } : isSvg ? null : $element.offset();
    var scroll = {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
    };
    var outerDims = isBody ? {
      width: $(window).width(),
      height: $(window).height()
    } : null;
    return $.extend({}, elRect, scroll, outerDims, elOffset);
  };

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? {
      top: pos.top + pos.height,
      left: pos.left + pos.width / 2 - actualWidth / 2
    } : placement == 'top' ? {
      top: pos.top - actualHeight,
      left: pos.left + pos.width / 2 - actualWidth / 2
    } : placement == 'left' ? {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left - actualWidth
    } :
    /* placement == 'right' */
    {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left + pos.width
    };
  };

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return delta;
    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
    var viewportDimensions = this.getPosition(this.$viewport);

    if (/right|left/.test(placement)) {
      var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;

      if (topEdgeOffset < viewportDimensions.top) {
        // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset;
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
        // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
      }
    } else {
      var leftEdgeOffset = pos.left - viewportPadding;
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth;

      if (leftEdgeOffset < viewportDimensions.left) {
        // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset;
      } else if (rightEdgeOffset > viewportDimensions.right) {
        // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
      }
    }

    return delta;
  };

  Tooltip.prototype.getTitle = function () {
    var title;
    var $e = this.$element;
    var o = this.options;
    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
    return title;
  };

  Tooltip.prototype.getUID = function (prefix) {
    do {
      prefix += ~~(Math.random() * 1000000);
    } while (document.getElementById(prefix));

    return prefix;
  };

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template);

      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
      }
    }

    return this.$tip;
  };

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
  };

  Tooltip.prototype.enable = function () {
    this.enabled = true;
  };

  Tooltip.prototype.disable = function () {
    this.enabled = false;
  };

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  };

  Tooltip.prototype.toggle = function (e) {
    var self = this;

    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type);

      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
        $(e.currentTarget).data('bs.' + this.type, self);
      }
    }

    if (e) {
      self.inState.click = !self.inState.click;
      if (self.isInStateTrue()) self.enter(self);else self.leave(self);
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
    }
  };

  Tooltip.prototype.destroy = function () {
    var that = this;
    clearTimeout(this.timeout);
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type);

      if (that.$tip) {
        that.$tip.detach();
      }

      that.$tip = null;
      that.$arrow = null;
      that.$viewport = null;
      that.$element = null;
    });
  }; // TOOLTIP PLUGIN DEFINITION
  // =========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tooltip');
      var options = _typeof(option) == 'object' && option;
      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('bs.tooltip', data = new Tooltip(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tooltip;
  $.fn.tooltip = Plugin;
  $.fn.tooltip.Constructor = Tooltip; // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };
}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function Popover(element, options) {
    this.init('popover', element, options);
  };

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');
  Popover.VERSION = '3.4.0';
  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }); // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
  Popover.prototype.constructor = Popover;

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS;
  };

  Popover.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();
    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
    $tip.find('.popover-content').children().detach().end()[// we use append for html objects to maintain js events
    this.options.html ? typeof content == 'string' ? 'html' : 'append' : 'text'](content);
    $tip.removeClass('fade top bottom left right in'); // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.

    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
  };

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  };

  Popover.prototype.getContent = function () {
    var $e = this.$element;
    var o = this.options;
    return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
  };

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow');
  }; // POPOVER PLUGIN DEFINITION
  // =========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.popover');
      var options = _typeof(option) == 'object' && option;
      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('bs.popover', data = new Popover(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.popover;
  $.fn.popover = Plugin;
  $.fn.popover.Constructor = Popover; // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this;
  };
}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body = $(document.body);
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || '') + ' .nav li > a';
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;
    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
    this.refresh();
    this.process();
  }

  ScrollSpy.VERSION = '3.4.0';
  ScrollSpy.DEFAULTS = {
    offset: 10
  };

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };

  ScrollSpy.prototype.refresh = function () {
    var that = this;
    var offsetMethod = 'offset';
    var offsetBase = 0;
    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position';
      offsetBase = this.$scrollElement.scrollTop();
    }

    this.$body.find(this.selector).map(function () {
      var $el = $(this);
      var href = $el.data('target') || $el.attr('href');
      var $href = /^#./.test(href) && $(href);
      return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      that.offsets.push(this[0]);
      that.targets.push(this[1]);
    });
  };

  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();
    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;

    if (this.scrollHeight != scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null;
      return this.clear();
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
    }
  };

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;
    this.clear();
    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
    var active = $(selector).parents('li').addClass('active');

    if (active.parent('.dropdown-menu').length) {
      active = active.closest('li.dropdown').addClass('active');
    }

    active.trigger('activate.bs.scrollspy');
  };

  ScrollSpy.prototype.clear = function () {
    $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
  }; // SCROLLSPY PLUGIN DEFINITION
  // ===========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.scrollspy');
      var options = _typeof(option) == 'object' && option;
      if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.scrollspy;
  $.fn.scrollspy = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy; // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  }; // SCROLLSPY DATA-API
  // ==================


  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      Plugin.call($spy, $spy.data());
    });
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // TAB CLASS DEFINITION
  // ====================

  var Tab = function Tab(element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element); // jscs:enable requireDollarBeforejQueryAssignment
  };

  Tab.VERSION = '3.4.0';
  Tab.TRANSITION_DURATION = 150;

  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest('ul:not(.dropdown-menu)');
    var selector = $this.data('target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return;
    var $previous = $ul.find('.active:last a');
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    });
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    });
    $previous.trigger(hideEvent);
    $this.trigger(showEvent);
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;
    var $target = $(document).find(selector);
    this.activate($this.closest('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      });
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      });
    });
  };

  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find('> .active');
    var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

    function next() {
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);
      element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

      if (transition) {
        element[0].offsetWidth; // reflow for transition

        element.addClass('in');
      } else {
        element.removeClass('fade');
      }

      if (element.parent('.dropdown-menu').length) {
        element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
      }

      callback && callback();
    }

    $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
    $active.removeClass('in');
  }; // TAB PLUGIN DEFINITION
  // =====================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tab');
      if (!data) $this.data('bs.tab', data = new Tab(this));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tab;
  $.fn.tab = Plugin;
  $.fn.tab.Constructor = Tab; // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  }; // TAB DATA-API
  // ============


  var clickHandler = function clickHandler(e) {
    e.preventDefault();
    Plugin.call($(this), 'show');
  };

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#affix
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function Affix(element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);
    var target = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target);
    this.$target = target.on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));
    this.$element = $(element);
    this.affixed = null;
    this.unpin = null;
    this.pinnedOffset = null;
    this.checkPosition();
  };

  Affix.VERSION = '3.4.0';
  Affix.RESET = 'affix affix-top affix-bottom';
  Affix.DEFAULTS = {
    offset: 0,
    target: window
  };

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    var targetHeight = this.$target.height();
    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false;

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : 'bottom';
      return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
    }

    var initializing = this.affixed == null;
    var colliderTop = initializing ? scrollTop : position.top;
    var colliderHeight = initializing ? targetHeight : height;
    if (offsetTop != null && scrollTop <= offsetTop) return 'top';
    if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return 'bottom';
    return false;
  };

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(Affix.RESET).addClass('affix');
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    return this.pinnedOffset = position.top - scrollTop;
  };

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return;
    var height = this.$element.height();
    var offset = this.options.offset;
    var offsetTop = offset.top;
    var offsetBottom = offset.bottom;
    var scrollHeight = Math.max($(document).height(), $(document.body).height());
    if (_typeof(offset) != 'object') offsetBottom = offsetTop = offset;
    if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element);
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element);
    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '');
      var affixType = 'affix' + (affix ? '-' + affix : '');
      var e = $.Event(affixType + '.bs.affix');
      this.$element.trigger(e);
      if (e.isDefaultPrevented()) return;
      this.affixed = affix;
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;
      this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      });
    }
  }; // AFFIX PLUGIN DEFINITION
  // =======================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.affix');
      var options = _typeof(option) == 'object' && option;
      if (!data) $this.data('bs.affix', data = new Affix(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.affix;
  $.fn.affix = Plugin;
  $.fn.affix.Constructor = Affix; // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old;
    return this;
  }; // AFFIX DATA-API
  // ==============


  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this);
      var data = $spy.data();
      data.offset = data.offset || {};
      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop != null) data.offset.top = data.offsetTop;
      Plugin.call($spy, data);
    });
  });
}(jQuery);
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/*!
 * Name    : Elements Extension for Jarallax
 * Version : 1.0.0
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */

/******/
(function (modules) {
  // webpackBootstrap

  /******/
  // The module cache

  /******/
  var installedModules = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/

    /******/
    // Check if module is in cache

    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,

      /******/
      l: false,

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/

    /******/
    // Flag the module as loaded

    /******/

    module.l = true;
    /******/

    /******/
    // Return the exports of the module

    /******/

    return module.exports;
    /******/
  }
  /******/

  /******/

  /******/
  // expose the modules object (__webpack_modules__)

  /******/


  __webpack_require__.m = modules;
  /******/

  /******/
  // expose the module cache

  /******/

  __webpack_require__.c = installedModules;
  /******/

  /******/
  // define getter function for harmony exports

  /******/

  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/

  };
  /******/

  /******/
  // define __esModule on exports

  /******/


  __webpack_require__.r = function (exports) {
    /******/
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
      /******/
    }
    /******/


    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    /******/
  };
  /******/

  /******/
  // create a fake namespace object

  /******/
  // mode & 1: value is a module id, require it

  /******/
  // mode & 2: merge all properties of value into the ns

  /******/
  // mode & 4: return value when already ns object

  /******/
  // mode & 8|1: behave like require

  /******/


  __webpack_require__.t = function (value, mode) {
    /******/
    if (mode & 1) value = __webpack_require__(value);
    /******/

    if (mode & 8) return value;
    /******/

    if (mode & 4 && _typeof2(value) === 'object' && value && value.__esModule) return value;
    /******/

    var ns = Object.create(null);
    /******/

    __webpack_require__.r(ns);
    /******/


    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    /******/

    if (mode & 2 && typeof value != 'string') for (var key in value) {
      __webpack_require__.d(ns, key, function (key) {
        return value[key];
      }.bind(null, key));
    }
    /******/

    return ns;
    /******/
  };
  /******/

  /******/
  // getDefaultExport function for compatibility with non-harmony modules

  /******/


  __webpack_require__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
    /******/
    function getDefault() {
      return module['default'];
    } :
    /******/
    function getModuleExports() {
      return module;
    };
    /******/

    __webpack_require__.d(getter, 'a', getter);
    /******/


    return getter;
    /******/
  };
  /******/

  /******/
  // Object.prototype.hasOwnProperty.call

  /******/


  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/

  /******/
  // __webpack_public_path__

  /******/


  __webpack_require__.p = "";
  /******/

  /******/

  /******/
  // Load entry module and return exports

  /******/

  return __webpack_require__(__webpack_require__.s = 0);
  /******/
})(
/************************************************************************/

/******/
[
/* 0 */

/***/
function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__(1);
  /***/
},
/* 1 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  var _liteReady = __webpack_require__(2);

  var _liteReady2 = _interopRequireDefault(_liteReady);

  var _jarallaxElement = __webpack_require__(3);

  var _jarallaxElement2 = _interopRequireDefault(_jarallaxElement);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  (0, _jarallaxElement2.default)(); // data-jarallax-element initialization

  (0, _liteReady2.default)(function () {
    if (typeof jarallax !== 'undefined') {
      jarallax(document.querySelectorAll('[data-jarallax-element]'));
    }
  });
  /***/
},
/* 2 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  module.exports = function (callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Already ready or interactive, execute callback
      callback.call();
    } else if (document.attachEvent) {
      // Old browsers
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'interactive') callback.call();
      });
    } else if (document.addEventListener) {
      // Modern browsers
      document.addEventListener('DOMContentLoaded', callback);
    }
  };
  /***/

},
/* 3 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = jarallaxElement;

  var _global = __webpack_require__(4);

  var _global2 = _interopRequireDefault(_global);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function jarallaxElement() {
    var jarallax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _global2.default.jarallax;

    if (typeof jarallax === 'undefined') {
      return;
    }

    var Jarallax = jarallax.constructor; // redefine default methods

    ['initImg', 'canInitParallax', 'init', 'destroy', 'clipContainer', 'coverImage', 'isVisible', 'onScroll', 'onResize'].forEach(function (key) {
      var def = Jarallax.prototype[key];

      Jarallax.prototype[key] = function () {
        var self = this;
        var args = arguments || [];

        if (key === 'initImg' && self.$item.getAttribute('data-jarallax-element') !== null) {
          self.options.type = 'element';
          self.pureOptions.speed = self.$item.getAttribute('data-jarallax-element') || self.pureOptions.speed;
        }

        if (self.options.type !== 'element') {
          return def.apply(self, args);
        }

        self.pureOptions.threshold = self.$item.getAttribute('data-threshold') || '';

        switch (key) {
          case 'init':
            var speedArr = self.pureOptions.speed.split(' ');
            self.options.speed = self.pureOptions.speed || 0;
            self.options.speedY = speedArr[0] ? parseFloat(speedArr[0]) : 0;
            self.options.speedX = speedArr[1] ? parseFloat(speedArr[1]) : 0;
            var thresholdArr = self.pureOptions.threshold.split(' ');
            self.options.thresholdY = thresholdArr[0] ? parseFloat(thresholdArr[0]) : null;
            self.options.thresholdX = thresholdArr[1] ? parseFloat(thresholdArr[1]) : null;
            break;

          case 'onResize':
            var defTransform = self.css(self.$item, 'transform');
            self.css(self.$item, {
              transform: ''
            });
            var rect = self.$item.getBoundingClientRect();
            self.itemData = {
              width: rect.width,
              height: rect.height,
              y: rect.top + self.getWindowData().y,
              x: rect.left
            };
            self.css(self.$item, {
              transform: defTransform
            });
            break;

          case 'onScroll':
            var wnd = self.getWindowData();
            var centerPercent = (wnd.y + wnd.height / 2 - self.itemData.y - self.itemData.height / 2) / (wnd.height / 2);
            var moveY = centerPercent * self.options.speedY;
            var moveX = centerPercent * self.options.speedX;
            var my = moveY;
            var mx = moveX;
            if (self.options.thresholdY !== null && moveY > self.options.thresholdY) my = 0;
            if (self.options.thresholdX !== null && moveX > self.options.thresholdX) mx = 0;
            self.css(self.$item, {
              transform: 'translate3d(' + mx + 'px,' + my + 'px,0)'
            });
            break;

          case 'initImg':
          case 'isVisible':
          case 'clipContainer':
          case 'coverImage':
            return true;
          // no default
        }

        return def.apply(self, args);
      };
    });
  }
  /* eslint no-case-declarations: "off" */

  /***/

},
/* 4 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";
  /* WEBPACK VAR INJECTION */

  (function (global) {
    var win;

    if (typeof window !== "undefined") {
      win = window;
    } else if (typeof global !== "undefined") {
      win = global;
    } else if (typeof self !== "undefined") {
      win = self;
    } else {
      win = {};
    }

    module.exports = win;
    /* WEBPACK VAR INJECTION */
  }).call(this, __webpack_require__(5));
  /***/
},
/* 5 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  var g; // This works in non-strict mode

  g = function () {
    return this;
  }();

  try {
    // This works if eval is allowed (see CSP)
    g = g || Function("return this")() || (1, eval)("this");
  } catch (e) {
    // This works if the window reference is available
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
  } // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}


  module.exports = g;
  /***/
}]);
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/*!
 * Name    : Video Background Extension for Jarallax
 * Version : 1.0.1
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */

/******/
(function (modules) {
  // webpackBootstrap

  /******/
  // The module cache

  /******/
  var installedModules = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/

    /******/
    // Check if module is in cache

    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,

      /******/
      l: false,

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/

    /******/
    // Flag the module as loaded

    /******/

    module.l = true;
    /******/

    /******/
    // Return the exports of the module

    /******/

    return module.exports;
    /******/
  }
  /******/

  /******/

  /******/
  // expose the modules object (__webpack_modules__)

  /******/


  __webpack_require__.m = modules;
  /******/

  /******/
  // expose the module cache

  /******/

  __webpack_require__.c = installedModules;
  /******/

  /******/
  // define getter function for harmony exports

  /******/

  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/

  };
  /******/

  /******/
  // define __esModule on exports

  /******/


  __webpack_require__.r = function (exports) {
    /******/
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
      /******/
    }
    /******/


    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    /******/
  };
  /******/

  /******/
  // create a fake namespace object

  /******/
  // mode & 1: value is a module id, require it

  /******/
  // mode & 2: merge all properties of value into the ns

  /******/
  // mode & 4: return value when already ns object

  /******/
  // mode & 8|1: behave like require

  /******/


  __webpack_require__.t = function (value, mode) {
    /******/
    if (mode & 1) value = __webpack_require__(value);
    /******/

    if (mode & 8) return value;
    /******/

    if (mode & 4 && _typeof2(value) === 'object' && value && value.__esModule) return value;
    /******/

    var ns = Object.create(null);
    /******/

    __webpack_require__.r(ns);
    /******/


    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    /******/

    if (mode & 2 && typeof value != 'string') for (var key in value) {
      __webpack_require__.d(ns, key, function (key) {
        return value[key];
      }.bind(null, key));
    }
    /******/

    return ns;
    /******/
  };
  /******/

  /******/
  // getDefaultExport function for compatibility with non-harmony modules

  /******/


  __webpack_require__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
    /******/
    function getDefault() {
      return module['default'];
    } :
    /******/
    function getModuleExports() {
      return module;
    };
    /******/

    __webpack_require__.d(getter, 'a', getter);
    /******/


    return getter;
    /******/
  };
  /******/

  /******/
  // Object.prototype.hasOwnProperty.call

  /******/


  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/

  /******/
  // __webpack_public_path__

  /******/


  __webpack_require__.p = "";
  /******/

  /******/

  /******/
  // Load entry module and return exports

  /******/

  return __webpack_require__(__webpack_require__.s = 6);
  /******/
})(
/************************************************************************/

/******/
[,,
/* 0 */

/* 1 */

/* 2 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  module.exports = function (callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Already ready or interactive, execute callback
      callback.call();
    } else if (document.attachEvent) {
      // Old browsers
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'interactive') callback.call();
      });
    } else if (document.addEventListener) {
      // Modern browsers
      document.addEventListener('DOMContentLoaded', callback);
    }
  };
  /***/

},,
/* 3 */

/* 4 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";
  /* WEBPACK VAR INJECTION */

  (function (global) {
    var win;

    if (typeof window !== "undefined") {
      win = window;
    } else if (typeof global !== "undefined") {
      win = global;
    } else if (typeof self !== "undefined") {
      win = self;
    } else {
      win = {};
    }

    module.exports = win;
    /* WEBPACK VAR INJECTION */
  }).call(this, __webpack_require__(5));
  /***/
},
/* 5 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  var g; // This works in non-strict mode

  g = function () {
    return this;
  }();

  try {
    // This works if eval is allowed (see CSP)
    g = g || Function("return this")() || (1, eval)("this");
  } catch (e) {
    // This works if the window reference is available
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
  } // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}


  module.exports = g;
  /***/
},
/* 6 */

/***/
function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__(7);
  /***/
},
/* 7 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  var _videoWorker = __webpack_require__(8);

  var _videoWorker2 = _interopRequireDefault(_videoWorker);

  var _global = __webpack_require__(4);

  var _global2 = _interopRequireDefault(_global);

  var _liteReady = __webpack_require__(2);

  var _liteReady2 = _interopRequireDefault(_liteReady);

  var _jarallaxVideo = __webpack_require__(10);

  var _jarallaxVideo2 = _interopRequireDefault(_jarallaxVideo);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // add video worker globally to fallback jarallax < 1.10 versions


  _global2.default.VideoWorker = _global2.default.VideoWorker || _videoWorker2.default;
  (0, _jarallaxVideo2.default)(); // data-jarallax-video initialization

  (0, _liteReady2.default)(function () {
    if (typeof jarallax !== 'undefined') {
      jarallax(document.querySelectorAll('[data-jarallax-video]'));
    }
  });
  /***/
},
/* 8 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  module.exports = __webpack_require__(9);
  /***/
},
/* 9 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  } // Deferred
  // thanks http://stackoverflow.com/questions/18096715/implement-deferred-object-without-using-jquery


  function Deferred() {
    this._done = [];
    this._fail = [];
  }

  Deferred.prototype = {
    execute: function execute(list, args) {
      var i = list.length;
      args = Array.prototype.slice.call(args);

      while (i--) {
        list[i].apply(null, args);
      }
    },
    resolve: function resolve() {
      this.execute(this._done, arguments);
    },
    reject: function reject() {
      this.execute(this._fail, arguments);
    },
    done: function done(callback) {
      this._done.push(callback);
    },
    fail: function fail(callback) {
      this._fail.push(callback);
    }
  };
  var ID = 0;
  var YoutubeAPIadded = 0;
  var VimeoAPIadded = 0;
  var loadingYoutubePlayer = 0;
  var loadingVimeoPlayer = 0;
  var loadingYoutubeDefer = new Deferred();
  var loadingVimeoDefer = new Deferred();

  var VideoWorker = function () {
    function VideoWorker(url, options) {
      _classCallCheck(this, VideoWorker);

      var self = this;
      self.url = url;
      self.options_default = {
        autoplay: false,
        loop: false,
        mute: false,
        volume: 100,
        showContols: true,
        // start / end video time in seconds
        startTime: 0,
        endTime: 0
      };
      self.options = self.extend({}, self.options_default, options); // check URL

      self.videoID = self.parseURL(url); // init

      if (self.videoID) {
        self.ID = ID++;
        self.loadAPI();
        self.init();
      }
    } // Extend like jQuery.extend


    _createClass(VideoWorker, [{
      key: 'extend',
      value: function extend(out) {
        var _arguments = arguments;
        out = out || {};
        Object.keys(arguments).forEach(function (i) {
          if (!_arguments[i]) {
            return;
          }

          Object.keys(_arguments[i]).forEach(function (key) {
            out[key] = _arguments[i][key];
          });
        });
        return out;
      }
    }, {
      key: 'parseURL',
      value: function parseURL(url) {
        // parse youtube ID
        function getYoutubeID(ytUrl) {
          // eslint-disable-next-line no-useless-escape
          var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
          var match = ytUrl.match(regExp);
          return match && match[1].length === 11 ? match[1] : false;
        } // parse vimeo ID


        function getVimeoID(vmUrl) {
          // eslint-disable-next-line no-useless-escape
          var regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
          var match = vmUrl.match(regExp);
          return match && match[3] ? match[3] : false;
        } // parse local string


        function getLocalVideos(locUrl) {
          // eslint-disable-next-line no-useless-escape
          var videoFormats = locUrl.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/);
          var result = {};
          var ready = 0;
          videoFormats.forEach(function (val) {
            // eslint-disable-next-line no-useless-escape
            var match = val.match(/^(mp4|webm|ogv|ogg)\:(.*)/);

            if (match && match[1] && match[2]) {
              // eslint-disable-next-line prefer-destructuring
              result[match[1] === 'ogv' ? 'ogg' : match[1]] = match[2];
              ready = 1;
            }
          });
          return ready ? result : false;
        }

        var Youtube = getYoutubeID(url);
        var Vimeo = getVimeoID(url);
        var Local = getLocalVideos(url);

        if (Youtube) {
          this.type = 'youtube';
          return Youtube;
        } else if (Vimeo) {
          this.type = 'vimeo';
          return Vimeo;
        } else if (Local) {
          this.type = 'local';
          return Local;
        }

        return false;
      }
    }, {
      key: 'isValid',
      value: function isValid() {
        return !!this.videoID;
      } // events

    }, {
      key: 'on',
      value: function on(name, callback) {
        this.userEventsList = this.userEventsList || []; // add new callback in events list

        (this.userEventsList[name] || (this.userEventsList[name] = [])).push(callback);
      }
    }, {
      key: 'off',
      value: function off(name, callback) {
        var _this = this;

        if (!this.userEventsList || !this.userEventsList[name]) {
          return;
        }

        if (!callback) {
          delete this.userEventsList[name];
        } else {
          this.userEventsList[name].forEach(function (val, key) {
            if (val === callback) {
              _this.userEventsList[name][key] = false;
            }
          });
        }
      }
    }, {
      key: 'fire',
      value: function fire(name) {
        var _this2 = this;

        var args = [].slice.call(arguments, 1);

        if (this.userEventsList && typeof this.userEventsList[name] !== 'undefined') {
          this.userEventsList[name].forEach(function (val) {
            // call with all arguments
            if (val) {
              val.apply(_this2, args);
            }
          });
        }
      }
    }, {
      key: 'play',
      value: function play(start) {
        var self = this;

        if (!self.player) {
          return;
        }

        if (self.type === 'youtube' && self.player.playVideo) {
          if (typeof start !== 'undefined') {
            self.player.seekTo(start || 0);
          }

          if (YT.PlayerState.PLAYING !== self.player.getPlayerState()) {
            self.player.playVideo();
          }
        }

        if (self.type === 'vimeo') {
          if (typeof start !== 'undefined') {
            self.player.setCurrentTime(start);
          }

          self.player.getPaused().then(function (paused) {
            if (paused) {
              self.player.play();
            }
          });
        }

        if (self.type === 'local') {
          if (typeof start !== 'undefined') {
            self.player.currentTime = start;
          }

          if (self.player.paused) {
            self.player.play();
          }
        }
      }
    }, {
      key: 'pause',
      value: function pause() {
        var self = this;

        if (!self.player) {
          return;
        }

        if (self.type === 'youtube' && self.player.pauseVideo) {
          if (YT.PlayerState.PLAYING === self.player.getPlayerState()) {
            self.player.pauseVideo();
          }
        }

        if (self.type === 'vimeo') {
          self.player.getPaused().then(function (paused) {
            if (!paused) {
              self.player.pause();
            }
          });
        }

        if (self.type === 'local') {
          if (!self.player.paused) {
            self.player.pause();
          }
        }
      }
    }, {
      key: 'mute',
      value: function mute() {
        var self = this;

        if (!self.player) {
          return;
        }

        if (self.type === 'youtube' && self.player.mute) {
          self.player.mute();
        }

        if (self.type === 'vimeo' && self.player.setVolume) {
          self.player.setVolume(0);
        }

        if (self.type === 'local') {
          self.$video.muted = true;
        }
      }
    }, {
      key: 'unmute',
      value: function unmute() {
        var self = this;

        if (!self.player) {
          return;
        }

        if (self.type === 'youtube' && self.player.mute) {
          self.player.unMute();
        }

        if (self.type === 'vimeo' && self.player.setVolume) {
          self.player.setVolume(self.options.volume);
        }

        if (self.type === 'local') {
          self.$video.muted = false;
        }
      }
    }, {
      key: 'setVolume',
      value: function setVolume() {
        var volume = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var self = this;

        if (!self.player || !volume) {
          return;
        }

        if (self.type === 'youtube' && self.player.setVolume) {
          self.player.setVolume(volume);
        }

        if (self.type === 'vimeo' && self.player.setVolume) {
          self.player.setVolume(volume);
        }

        if (self.type === 'local') {
          self.$video.volume = volume / 100;
        }
      }
    }, {
      key: 'getVolume',
      value: function getVolume(callback) {
        var self = this;

        if (!self.player) {
          callback(false);
          return;
        }

        if (self.type === 'youtube' && self.player.getVolume) {
          callback(self.player.getVolume());
        }

        if (self.type === 'vimeo' && self.player.getVolume) {
          self.player.getVolume().then(function (volume) {
            callback(volume);
          });
        }

        if (self.type === 'local') {
          callback(self.$video.volume * 100);
        }
      }
    }, {
      key: 'getMuted',
      value: function getMuted(callback) {
        var self = this;

        if (!self.player) {
          callback(null);
          return;
        }

        if (self.type === 'youtube' && self.player.isMuted) {
          callback(self.player.isMuted());
        }

        if (self.type === 'vimeo' && self.player.getVolume) {
          self.player.getVolume().then(function (volume) {
            callback(!!volume);
          });
        }

        if (self.type === 'local') {
          callback(self.$video.muted);
        }
      }
    }, {
      key: 'getImageURL',
      value: function getImageURL(callback) {
        var self = this;

        if (self.videoImage) {
          callback(self.videoImage);
          return;
        }

        if (self.type === 'youtube') {
          var availableSizes = ['maxresdefault', 'sddefault', 'hqdefault', '0'];
          var step = 0;
          var tempImg = new Image();

          tempImg.onload = function () {
            // if no thumbnail, youtube add their own image with width = 120px
            if ((this.naturalWidth || this.width) !== 120 || step === availableSizes.length - 1) {
              // ok
              self.videoImage = 'https://img.youtube.com/vi/' + self.videoID + '/' + availableSizes[step] + '.jpg';
              callback(self.videoImage);
            } else {
              // try another size
              step++;
              this.src = 'https://img.youtube.com/vi/' + self.videoID + '/' + availableSizes[step] + '.jpg';
            }
          };

          tempImg.src = 'https://img.youtube.com/vi/' + self.videoID + '/' + availableSizes[step] + '.jpg';
        }

        if (self.type === 'vimeo') {
          var request = new XMLHttpRequest();
          request.open('GET', 'https://vimeo.com/api/v2/video/' + self.videoID + '.json', true);

          request.onreadystatechange = function () {
            if (this.readyState === 4) {
              if (this.status >= 200 && this.status < 400) {
                // Success!
                var response = JSON.parse(this.responseText);
                self.videoImage = response[0].thumbnail_large;
                callback(self.videoImage);
              } else {// Error :(
              }
            }
          };

          request.send();
          request = null;
        }
      } // fallback to the old version.

    }, {
      key: 'getIframe',
      value: function getIframe(callback) {
        this.getVideo(callback);
      }
    }, {
      key: 'getVideo',
      value: function getVideo(callback) {
        var self = this; // return generated video block

        if (self.$video) {
          callback(self.$video);
          return;
        } // generate new video block


        self.onAPIready(function () {
          var hiddenDiv = void 0;

          if (!self.$video) {
            hiddenDiv = document.createElement('div');
            hiddenDiv.style.display = 'none';
          } // Youtube


          if (self.type === 'youtube') {
            self.playerOptions = {};
            self.playerOptions.videoId = self.videoID;
            self.playerOptions.playerVars = {
              autohide: 1,
              rel: 0,
              autoplay: 0,
              // autoplay enable on mobile devices
              playsinline: 1
            }; // hide controls

            if (!self.options.showContols) {
              self.playerOptions.playerVars.iv_load_policy = 3;
              self.playerOptions.playerVars.modestbranding = 1;
              self.playerOptions.playerVars.controls = 0;
              self.playerOptions.playerVars.showinfo = 0;
              self.playerOptions.playerVars.disablekb = 1;
            } // events


            var ytStarted = void 0;
            var ytProgressInterval = void 0;
            self.playerOptions.events = {
              onReady: function onReady(e) {
                // mute
                if (self.options.mute) {
                  e.target.mute();
                } else if (self.options.volume) {
                  e.target.setVolume(self.options.volume);
                } // autoplay


                if (self.options.autoplay) {
                  self.play(self.options.startTime);
                }

                self.fire('ready', e); // For seamless loops, set the endTime to 0.1 seconds less than the video's duration
                // https://github.com/nk-o/video-worker/issues/2

                if (self.options.loop && !self.options.endTime) {
                  var secondsOffset = 0.1;
                  self.options.endTime = self.player.getDuration() - secondsOffset;
                } // volumechange


                setInterval(function () {
                  self.getVolume(function (volume) {
                    if (self.options.volume !== volume) {
                      self.options.volume = volume;
                      self.fire('volumechange', e);
                    }
                  });
                }, 150);
              },
              onStateChange: function onStateChange(e) {
                // loop
                if (self.options.loop && e.data === YT.PlayerState.ENDED) {
                  self.play(self.options.startTime);
                }

                if (!ytStarted && e.data === YT.PlayerState.PLAYING) {
                  ytStarted = 1;
                  self.fire('started', e);
                }

                if (e.data === YT.PlayerState.PLAYING) {
                  self.fire('play', e);
                }

                if (e.data === YT.PlayerState.PAUSED) {
                  self.fire('pause', e);
                }

                if (e.data === YT.PlayerState.ENDED) {
                  self.fire('ended', e);
                } // progress check


                if (e.data === YT.PlayerState.PLAYING) {
                  ytProgressInterval = setInterval(function () {
                    self.fire('timeupdate', e); // check for end of video and play again or stop

                    if (self.options.endTime && self.player.getCurrentTime() >= self.options.endTime) {
                      if (self.options.loop) {
                        self.play(self.options.startTime);
                      } else {
                        self.pause();
                      }
                    }
                  }, 150);
                } else {
                  clearInterval(ytProgressInterval);
                }
              }
            };
            var firstInit = !self.$video;

            if (firstInit) {
              var div = document.createElement('div');
              div.setAttribute('id', self.playerID);
              hiddenDiv.appendChild(div);
              document.body.appendChild(hiddenDiv);
            }

            self.player = self.player || new window.YT.Player(self.playerID, self.playerOptions);

            if (firstInit) {
              self.$video = document.getElementById(self.playerID); // get video width and height

              self.videoWidth = parseInt(self.$video.getAttribute('width'), 10) || 1280;
              self.videoHeight = parseInt(self.$video.getAttribute('height'), 10) || 720;
            }
          } // Vimeo


          if (self.type === 'vimeo') {
            self.playerOptions = {
              id: self.videoID,
              autopause: 0,
              transparent: 0,
              autoplay: self.options.autoplay ? 1 : 0,
              loop: self.options.loop ? 1 : 0,
              muted: self.options.mute ? 1 : 0
            };

            if (self.options.volume) {
              self.playerOptions.volume = self.options.volume;
            } // hide controls


            if (!self.options.showContols) {
              self.playerOptions.badge = 0;
              self.playerOptions.byline = 0;
              self.playerOptions.portrait = 0;
              self.playerOptions.title = 0;
            }

            if (!self.$video) {
              var playerOptionsString = '';
              Object.keys(self.playerOptions).forEach(function (key) {
                if (playerOptionsString !== '') {
                  playerOptionsString += '&';
                }

                playerOptionsString += key + '=' + encodeURIComponent(self.playerOptions[key]);
              }); // we need to create iframe manually because when we create it using API
              // js events won't triggers after iframe moved to another place

              self.$video = document.createElement('iframe');
              self.$video.setAttribute('id', self.playerID);
              self.$video.setAttribute('src', 'https://player.vimeo.com/video/' + self.videoID + '?' + playerOptionsString);
              self.$video.setAttribute('frameborder', '0');
              self.$video.setAttribute('mozallowfullscreen', '');
              self.$video.setAttribute('allowfullscreen', '');
              hiddenDiv.appendChild(self.$video);
              document.body.appendChild(hiddenDiv);
            }

            self.player = self.player || new Vimeo.Player(self.$video, self.playerOptions); // set current time for autoplay

            if (self.options.startTime && self.options.autoplay) {
              self.player.setCurrentTime(self.options.startTime);
            } // get video width and height


            self.player.getVideoWidth().then(function (width) {
              self.videoWidth = width || 1280;
            });
            self.player.getVideoHeight().then(function (height) {
              self.videoHeight = height || 720;
            }); // events

            var vmStarted = void 0;
            self.player.on('timeupdate', function (e) {
              if (!vmStarted) {
                self.fire('started', e);
                vmStarted = 1;
              }

              self.fire('timeupdate', e); // check for end of video and play again or stop

              if (self.options.endTime) {
                if (self.options.endTime && e.seconds >= self.options.endTime) {
                  if (self.options.loop) {
                    self.play(self.options.startTime);
                  } else {
                    self.pause();
                  }
                }
              }
            });
            self.player.on('play', function (e) {
              self.fire('play', e); // check for the start time and start with it

              if (self.options.startTime && e.seconds === 0) {
                self.play(self.options.startTime);
              }
            });
            self.player.on('pause', function (e) {
              self.fire('pause', e);
            });
            self.player.on('ended', function (e) {
              self.fire('ended', e);
            });
            self.player.on('loaded', function (e) {
              self.fire('ready', e);
            });
            self.player.on('volumechange', function (e) {
              self.fire('volumechange', e);
            });
          } // Local


          function addSourceToLocal(element, src, type) {
            var source = document.createElement('source');
            source.src = src;
            source.type = type;
            element.appendChild(source);
          }

          if (self.type === 'local') {
            if (!self.$video) {
              self.$video = document.createElement('video'); // show controls

              if (self.options.showContols) {
                self.$video.controls = true;
              } // mute


              if (self.options.mute) {
                self.$video.muted = true;
              } else if (self.$video.volume) {
                self.$video.volume = self.options.volume / 100;
              } // loop


              if (self.options.loop) {
                self.$video.loop = true;
              } // autoplay enable on mobile devices


              self.$video.setAttribute('playsinline', '');
              self.$video.setAttribute('webkit-playsinline', '');
              self.$video.setAttribute('id', self.playerID);
              hiddenDiv.appendChild(self.$video);
              document.body.appendChild(hiddenDiv);
              Object.keys(self.videoID).forEach(function (key) {
                addSourceToLocal(self.$video, self.videoID[key], 'video/' + key);
              });
            }

            self.player = self.player || self.$video;
            var locStarted = void 0;
            self.player.addEventListener('playing', function (e) {
              if (!locStarted) {
                self.fire('started', e);
              }

              locStarted = 1;
            });
            self.player.addEventListener('timeupdate', function (e) {
              self.fire('timeupdate', e); // check for end of video and play again or stop

              if (self.options.endTime) {
                if (self.options.endTime && this.currentTime >= self.options.endTime) {
                  if (self.options.loop) {
                    self.play(self.options.startTime);
                  } else {
                    self.pause();
                  }
                }
              }
            });
            self.player.addEventListener('play', function (e) {
              self.fire('play', e);
            });
            self.player.addEventListener('pause', function (e) {
              self.fire('pause', e);
            });
            self.player.addEventListener('ended', function (e) {
              self.fire('ended', e);
            });
            self.player.addEventListener('loadedmetadata', function () {
              // get video width and height
              self.videoWidth = this.videoWidth || 1280;
              self.videoHeight = this.videoHeight || 720;
              self.fire('ready'); // autoplay

              if (self.options.autoplay) {
                self.play(self.options.startTime);
              }
            });
            self.player.addEventListener('volumechange', function (e) {
              self.getVolume(function (volume) {
                self.options.volume = volume;
              });
              self.fire('volumechange', e);
            });
          }

          callback(self.$video);
        });
      }
    }, {
      key: 'init',
      value: function init() {
        var self = this;
        self.playerID = 'VideoWorker-' + self.ID;
      }
    }, {
      key: 'loadAPI',
      value: function loadAPI() {
        var self = this;

        if (YoutubeAPIadded && VimeoAPIadded) {
          return;
        }

        var src = ''; // load Youtube API

        if (self.type === 'youtube' && !YoutubeAPIadded) {
          YoutubeAPIadded = 1;
          src = 'https://www.youtube.com/iframe_api';
        } // load Vimeo API


        if (self.type === 'vimeo' && !VimeoAPIadded) {
          VimeoAPIadded = 1;
          src = 'https://player.vimeo.com/api/player.js';
        }

        if (!src) {
          return;
        } // add script in head section


        var tag = document.createElement('script');
        var head = document.getElementsByTagName('head')[0];
        tag.src = src;
        head.appendChild(tag);
        head = null;
        tag = null;
      }
    }, {
      key: 'onAPIready',
      value: function onAPIready(callback) {
        var self = this; // Youtube

        if (self.type === 'youtube') {
          // Listen for global YT player callback
          if ((typeof YT === 'undefined' || YT.loaded === 0) && !loadingYoutubePlayer) {
            // Prevents Ready event from being called twice
            loadingYoutubePlayer = 1; // Creates deferred so, other players know when to wait.

            window.onYouTubeIframeAPIReady = function () {
              window.onYouTubeIframeAPIReady = null;
              loadingYoutubeDefer.resolve('done');
              callback();
            };
          } else if ((typeof YT === 'undefined' ? 'undefined' : _typeof(YT)) === 'object' && YT.loaded === 1) {
            callback();
          } else {
            loadingYoutubeDefer.done(function () {
              callback();
            });
          }
        } // Vimeo


        if (self.type === 'vimeo') {
          if (typeof Vimeo === 'undefined' && !loadingVimeoPlayer) {
            loadingVimeoPlayer = 1;
            var vimeoInterval = setInterval(function () {
              if (typeof Vimeo !== 'undefined') {
                clearInterval(vimeoInterval);
                loadingVimeoDefer.resolve('done');
                callback();
              }
            }, 20);
          } else if (typeof Vimeo !== 'undefined') {
            callback();
          } else {
            loadingVimeoDefer.done(function () {
              callback();
            });
          }
        } // Local


        if (self.type === 'local') {
          callback();
        }
      }
    }]);

    return VideoWorker;
  }();

  exports.default = VideoWorker;
  /***/
},
/* 10 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = jarallaxVideo;

  var _videoWorker = __webpack_require__(8);

  var _videoWorker2 = _interopRequireDefault(_videoWorker);

  var _global = __webpack_require__(4);

  var _global2 = _interopRequireDefault(_global);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function jarallaxVideo() {
    var jarallax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _global2.default.jarallax;

    if (typeof jarallax === 'undefined') {
      return;
    }

    var Jarallax = jarallax.constructor; // append video after init Jarallax

    var defInit = Jarallax.prototype.init;

    Jarallax.prototype.init = function () {
      var self = this;
      defInit.apply(self);

      if (self.video && !self.options.disableVideo()) {
        self.video.getVideo(function (video) {
          var $parent = video.parentNode;
          self.css(video, {
            position: self.image.position,
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            width: '100%',
            height: '100%',
            maxWidth: 'none',
            maxHeight: 'none',
            margin: 0,
            zIndex: -1
          });
          self.$video = video;
          self.image.$container.appendChild(video); // remove parent video element (created by VideoWorker)

          $parent.parentNode.removeChild($parent);
        });
      }
    }; // cover video


    var defCoverImage = Jarallax.prototype.coverImage;

    Jarallax.prototype.coverImage = function () {
      var self = this;
      var imageData = defCoverImage.apply(self);
      var node = self.image.$item ? self.image.$item.nodeName : false;

      if (imageData && self.video && node && (node === 'IFRAME' || node === 'VIDEO')) {
        var h = imageData.image.height;
        var w = h * self.image.width / self.image.height;
        var ml = (imageData.container.width - w) / 2;
        var mt = imageData.image.marginTop;

        if (imageData.container.width > w) {
          w = imageData.container.width;
          h = w * self.image.height / self.image.width;
          ml = 0;
          mt += (imageData.image.height - h) / 2;
        } // add video height over than need to hide controls


        if (node === 'IFRAME') {
          h += 400;
          mt -= 200;
        }

        self.css(self.$video, {
          width: w + 'px',
          marginLeft: ml + 'px',
          height: h + 'px',
          marginTop: mt + 'px'
        });
      }

      return imageData;
    }; // init video


    var defInitImg = Jarallax.prototype.initImg;

    Jarallax.prototype.initImg = function () {
      var self = this;
      var defaultResult = defInitImg.apply(self);

      if (!self.options.videoSrc) {
        self.options.videoSrc = self.$item.getAttribute('data-jarallax-video') || null;
      }

      if (self.options.videoSrc) {
        self.defaultInitImgResult = defaultResult;
        return true;
      }

      return defaultResult;
    };

    var defCanInitParallax = Jarallax.prototype.canInitParallax;

    Jarallax.prototype.canInitParallax = function () {
      var self = this;
      var defaultResult = defCanInitParallax.apply(self);

      if (!self.options.videoSrc) {
        return defaultResult;
      }

      var video = new _videoWorker2.default(self.options.videoSrc, {
        autoplay: true,
        loop: self.options.videoLoop,
        showContols: false,
        startTime: self.options.videoStartTime || 0,
        endTime: self.options.videoEndTime || 0,
        mute: self.options.videoVolume ? 0 : 1,
        volume: self.options.videoVolume || 0
      });

      if (video.isValid()) {
        // if parallax will not be inited, we can add thumbnail on background.
        if (!defaultResult) {
          if (!self.defaultInitImgResult) {
            video.getImageURL(function (url) {
              // save default user styles
              var curStyle = self.$item.getAttribute('style');

              if (curStyle) {
                self.$item.setAttribute('data-jarallax-original-styles', curStyle);
              } // set new background


              self.css(self.$item, {
                'background-image': 'url("' + url + '")',
                'background-position': 'center',
                'background-size': 'cover'
              });
            });
          } // init video

        } else {
          video.on('ready', function () {
            if (self.options.videoPlayOnlyVisible) {
              var oldOnScroll = self.onScroll;

              self.onScroll = function () {
                oldOnScroll.apply(self);

                if (self.options.videoLoop || !self.options.videoLoop && !self.videoEnded) {
                  if (self.isVisible()) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }
              };
            } else {
              video.play();
            }
          });
          video.on('started', function () {
            self.image.$default_item = self.image.$item;
            self.image.$item = self.$video; // set video width and height

            self.image.width = self.video.videoWidth || 1280;
            self.image.height = self.video.videoHeight || 720;
            self.coverImage();
            self.clipContainer();
            self.onScroll(); // hide image

            if (self.image.$default_item) {
              self.image.$default_item.style.display = 'none';
            }
          });
          video.on('ended', function () {
            self.videoEnded = true;

            if (!self.options.videoLoop) {
              // show image if Loop disabled
              if (self.image.$default_item) {
                self.image.$item = self.image.$default_item;
                self.image.$item.style.display = 'block'; // set image width and height

                self.coverImage();
                self.clipContainer();
                self.onScroll();
              }
            }
          });
          self.video = video; // set image if not exists

          if (!self.defaultInitImgResult) {
            if (video.type !== 'local') {
              video.getImageURL(function (url) {
                self.image.src = url;
                self.init();
              });
              return false;
            } // set empty image on local video if not defined


            self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            return true;
          }
        }
      }

      return defaultResult;
    }; // Destroy video parallax


    var defDestroy = Jarallax.prototype.destroy;

    Jarallax.prototype.destroy = function () {
      var self = this;

      if (self.image.$default_item) {
        self.image.$item = self.image.$default_item;
        delete self.image.$default_item;
      }

      defDestroy.apply(self);
    };
  }
  /***/

}]);
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 1.10.7
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */

/******/
(function (modules) {
  // webpackBootstrap

  /******/
  // The module cache

  /******/
  var installedModules = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/

    /******/
    // Check if module is in cache

    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,

      /******/
      l: false,

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/

    /******/
    // Flag the module as loaded

    /******/

    module.l = true;
    /******/

    /******/
    // Return the exports of the module

    /******/

    return module.exports;
    /******/
  }
  /******/

  /******/

  /******/
  // expose the modules object (__webpack_modules__)

  /******/


  __webpack_require__.m = modules;
  /******/

  /******/
  // expose the module cache

  /******/

  __webpack_require__.c = installedModules;
  /******/

  /******/
  // define getter function for harmony exports

  /******/

  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/

  };
  /******/

  /******/
  // define __esModule on exports

  /******/


  __webpack_require__.r = function (exports) {
    /******/
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
      /******/
    }
    /******/


    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    /******/
  };
  /******/

  /******/
  // create a fake namespace object

  /******/
  // mode & 1: value is a module id, require it

  /******/
  // mode & 2: merge all properties of value into the ns

  /******/
  // mode & 4: return value when already ns object

  /******/
  // mode & 8|1: behave like require

  /******/


  __webpack_require__.t = function (value, mode) {
    /******/
    if (mode & 1) value = __webpack_require__(value);
    /******/

    if (mode & 8) return value;
    /******/

    if (mode & 4 && _typeof2(value) === 'object' && value && value.__esModule) return value;
    /******/

    var ns = Object.create(null);
    /******/

    __webpack_require__.r(ns);
    /******/


    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    /******/

    if (mode & 2 && typeof value != 'string') for (var key in value) {
      __webpack_require__.d(ns, key, function (key) {
        return value[key];
      }.bind(null, key));
    }
    /******/

    return ns;
    /******/
  };
  /******/

  /******/
  // getDefaultExport function for compatibility with non-harmony modules

  /******/


  __webpack_require__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
    /******/
    function getDefault() {
      return module['default'];
    } :
    /******/
    function getModuleExports() {
      return module;
    };
    /******/

    __webpack_require__.d(getter, 'a', getter);
    /******/


    return getter;
    /******/
  };
  /******/

  /******/
  // Object.prototype.hasOwnProperty.call

  /******/


  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/

  /******/
  // __webpack_public_path__

  /******/


  __webpack_require__.p = "";
  /******/

  /******/

  /******/
  // Load entry module and return exports

  /******/

  return __webpack_require__(__webpack_require__.s = 11);
  /******/
})(
/************************************************************************/

/******/
[,,
/* 0 */

/* 1 */

/* 2 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  module.exports = function (callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Already ready or interactive, execute callback
      callback.call();
    } else if (document.attachEvent) {
      // Old browsers
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'interactive') callback.call();
      });
    } else if (document.addEventListener) {
      // Modern browsers
      document.addEventListener('DOMContentLoaded', callback);
    }
  };
  /***/

},,
/* 3 */

/* 4 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";
  /* WEBPACK VAR INJECTION */

  (function (global) {
    var win;

    if (typeof window !== "undefined") {
      win = window;
    } else if (typeof global !== "undefined") {
      win = global;
    } else if (typeof self !== "undefined") {
      win = self;
    } else {
      win = {};
    }

    module.exports = win;
    /* WEBPACK VAR INJECTION */
  }).call(this, __webpack_require__(5));
  /***/
},
/* 5 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  var g; // This works in non-strict mode

  g = function () {
    return this;
  }();

  try {
    // This works if eval is allowed (see CSP)
    g = g || Function("return this")() || (1, eval)("this");
  } catch (e) {
    // This works if the window reference is available
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
  } // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}


  module.exports = g;
  /***/
},,,,,,
/* 6 */

/* 7 */

/* 8 */

/* 9 */

/* 10 */

/* 11 */

/***/
function (module, exports, __webpack_require__) {
  module.exports = __webpack_require__(12);
  /***/
},
/* 12 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  var _liteReady = __webpack_require__(2);

  var _liteReady2 = _interopRequireDefault(_liteReady);

  var _global = __webpack_require__(4);

  var _jarallax = __webpack_require__(13);

  var _jarallax2 = _interopRequireDefault(_jarallax);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // no conflict


  var oldPlugin = _global.window.jarallax;
  _global.window.jarallax = _jarallax2.default;

  _global.window.jarallax.noConflict = function () {
    _global.window.jarallax = oldPlugin;
    return this;
  }; // jQuery support


  if (typeof _global.jQuery !== 'undefined') {
    var jQueryPlugin = function jQueryPlugin() {
      var args = arguments || [];
      Array.prototype.unshift.call(args, this);

      var res = _jarallax2.default.apply(_global.window, args);

      return (typeof res === 'undefined' ? 'undefined' : _typeof(res)) !== 'object' ? res : this;
    };

    jQueryPlugin.constructor = _jarallax2.default.constructor; // no conflict

    var oldJqPlugin = _global.jQuery.fn.jarallax;
    _global.jQuery.fn.jarallax = jQueryPlugin;

    _global.jQuery.fn.jarallax.noConflict = function () {
      _global.jQuery.fn.jarallax = oldJqPlugin;
      return this;
    };
  } // data-jarallax initialization


  (0, _liteReady2.default)(function () {
    (0, _jarallax2.default)(document.querySelectorAll('[data-jarallax]'));
  });
  /***/
},
/* 13 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";
  /* WEBPACK VAR INJECTION */

  (function (global) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _slicedToArray = function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };

    var _liteReady = __webpack_require__(2);

    var _liteReady2 = _interopRequireDefault(_liteReady);

    var _rafl = __webpack_require__(14);

    var _rafl2 = _interopRequireDefault(_rafl);

    var _global = __webpack_require__(4);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var isIE = navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident/') > -1 || navigator.userAgent.indexOf('Edge/') > -1;

    var supportTransform = function () {
      var prefixes = 'transform WebkitTransform MozTransform'.split(' ');
      var div = document.createElement('div');

      for (var i = 0; i < prefixes.length; i++) {
        if (div && div.style[prefixes[i]] !== undefined) {
          return prefixes[i];
        }
      }

      return false;
    }(); // Window data


    var wndW = void 0;
    var wndH = void 0;
    var wndY = void 0;
    var forceResizeParallax = false;
    var forceScrollParallax = false;

    function updateWndVars(e) {
      wndW = _global.window.innerWidth || document.documentElement.clientWidth;
      wndH = _global.window.innerHeight || document.documentElement.clientHeight;

      if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && (e.type === 'load' || e.type === 'dom-loaded')) {
        forceResizeParallax = true;
      }
    }

    updateWndVars();

    _global.window.addEventListener('resize', updateWndVars);

    _global.window.addEventListener('orientationchange', updateWndVars);

    _global.window.addEventListener('load', updateWndVars);

    (0, _liteReady2.default)(function () {
      updateWndVars({
        type: 'dom-loaded'
      });
    }); // list with all jarallax instances
    // need to render all in one scroll/resize event

    var jarallaxList = []; // Animate if changed window size or scrolled page

    var oldPageData = false;

    function updateParallax() {
      if (!jarallaxList.length) {
        return;
      }

      if (_global.window.pageYOffset !== undefined) {
        wndY = _global.window.pageYOffset;
      } else {
        wndY = (document.documentElement || document.body.parentNode || document.body).scrollTop;
      }

      var isResized = forceResizeParallax || !oldPageData || oldPageData.width !== wndW || oldPageData.height !== wndH;
      var isScrolled = forceScrollParallax || isResized || !oldPageData || oldPageData.y !== wndY;
      forceResizeParallax = false;
      forceScrollParallax = false;

      if (isResized || isScrolled) {
        jarallaxList.forEach(function (item) {
          if (isResized) {
            item.onResize();
          }

          if (isScrolled) {
            item.onScroll();
          }
        });
        oldPageData = {
          width: wndW,
          height: wndH,
          y: wndY
        };
      }

      (0, _rafl2.default)(updateParallax);
    } // ResizeObserver


    var resizeObserver = global.ResizeObserver ? new global.ResizeObserver(function (entry) {
      if (entry && entry.length) {
        (0, _rafl2.default)(function () {
          entry.forEach(function (item) {
            if (item.target && item.target.jarallax) {
              if (!forceResizeParallax) {
                item.target.jarallax.onResize();
              }

              forceScrollParallax = true;
            }
          });
        });
      }
    }) : false;
    var instanceID = 0; // Jarallax class

    var Jarallax = function () {
      function Jarallax(item, userOptions) {
        _classCallCheck(this, Jarallax);

        var self = this;
        self.instanceID = instanceID++;
        self.$item = item;
        self.defaults = {
          type: 'scroll',
          // type of parallax: scroll, scale, opacity, scale-opacity, scroll-opacity
          speed: 0.5,
          // supported value from -1 to 2
          imgSrc: null,
          imgElement: '.jarallax-img',
          imgSize: 'cover',
          imgPosition: '50% 50%',
          imgRepeat: 'no-repeat',
          // supported only for background, not for <img> tag
          keepImg: false,
          // keep <img> tag in it's default place
          elementInViewport: null,
          zIndex: -100,
          disableParallax: false,
          disableVideo: false,
          automaticResize: true,
          // use ResizeObserver to recalculate position and size of parallax image
          // video
          videoSrc: null,
          videoStartTime: 0,
          videoEndTime: 0,
          videoVolume: 0,
          videoLoop: true,
          videoPlayOnlyVisible: true,
          // events
          onScroll: null,
          // function(calculations) {}
          onInit: null,
          // function() {}
          onDestroy: null,
          // function() {}
          onCoverImage: null // function() {}

        }; // DEPRECATED: old data-options

        var deprecatedDataAttribute = self.$item.getAttribute('data-jarallax');
        var oldDataOptions = JSON.parse(deprecatedDataAttribute || '{}');

        if (deprecatedDataAttribute) {
          // eslint-disable-next-line no-console
          console.warn('Detected usage of deprecated data-jarallax JSON options, you should use pure data-attribute options. See info here - https://github.com/nk-o/jarallax/issues/53');
        } // prepare data-options


        var dataOptions = self.$item.dataset || {};
        var pureDataOptions = {};
        Object.keys(dataOptions).forEach(function (key) {
          var loweCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);

          if (loweCaseOption && typeof self.defaults[loweCaseOption] !== 'undefined') {
            pureDataOptions[loweCaseOption] = dataOptions[key];
          }
        });
        self.options = self.extend({}, self.defaults, oldDataOptions, pureDataOptions, userOptions);
        self.pureOptions = self.extend({}, self.options); // prepare 'true' and 'false' strings to boolean

        Object.keys(self.options).forEach(function (key) {
          if (self.options[key] === 'true') {
            self.options[key] = true;
          } else if (self.options[key] === 'false') {
            self.options[key] = false;
          }
        }); // fix speed option [-1.0, 2.0]

        self.options.speed = Math.min(2, Math.max(-1, parseFloat(self.options.speed))); // deprecated noAndroid and noIos options

        if (self.options.noAndroid || self.options.noIos) {
          // eslint-disable-next-line no-console
          console.warn('Detected usage of deprecated noAndroid or noIos options, you should use disableParallax option. See info here - https://github.com/nk-o/jarallax/#disable-on-mobile-devices'); // prepare fallback if disableParallax option is not used

          if (!self.options.disableParallax) {
            if (self.options.noIos && self.options.noAndroid) {
              self.options.disableParallax = /iPad|iPhone|iPod|Android/;
            } else if (self.options.noIos) {
              self.options.disableParallax = /iPad|iPhone|iPod/;
            } else if (self.options.noAndroid) {
              self.options.disableParallax = /Android/;
            }
          }
        } // prepare disableParallax callback


        if (typeof self.options.disableParallax === 'string') {
          self.options.disableParallax = new RegExp(self.options.disableParallax);
        }

        if (self.options.disableParallax instanceof RegExp) {
          var disableParallaxRegexp = self.options.disableParallax;

          self.options.disableParallax = function () {
            return disableParallaxRegexp.test(navigator.userAgent);
          };
        }

        if (typeof self.options.disableParallax !== 'function') {
          self.options.disableParallax = function () {
            return false;
          };
        } // prepare disableVideo callback


        if (typeof self.options.disableVideo === 'string') {
          self.options.disableVideo = new RegExp(self.options.disableVideo);
        }

        if (self.options.disableVideo instanceof RegExp) {
          var disableVideoRegexp = self.options.disableVideo;

          self.options.disableVideo = function () {
            return disableVideoRegexp.test(navigator.userAgent);
          };
        }

        if (typeof self.options.disableVideo !== 'function') {
          self.options.disableVideo = function () {
            return false;
          };
        } // custom element to check if parallax in viewport


        var elementInVP = self.options.elementInViewport; // get first item from array

        if (elementInVP && (typeof elementInVP === 'undefined' ? 'undefined' : _typeof(elementInVP)) === 'object' && typeof elementInVP.length !== 'undefined') {
          var _elementInVP = elementInVP;

          var _elementInVP2 = _slicedToArray(_elementInVP, 1);

          elementInVP = _elementInVP2[0];
        } // check if dom element


        if (!(elementInVP instanceof Element)) {
          elementInVP = null;
        }

        self.options.elementInViewport = elementInVP;
        self.image = {
          src: self.options.imgSrc || null,
          $container: null,
          useImgTag: false,
          // position fixed is needed for the most of browsers because absolute position have glitches
          // on MacOS with smooth scroll there is a huge lags with absolute position - https://github.com/nk-o/jarallax/issues/75
          // on mobile devices better scrolled with absolute position
          position: /iPad|iPhone|iPod|Android/.test(navigator.userAgent) ? 'absolute' : 'fixed'
        };

        if (self.initImg() && self.canInitParallax()) {
          self.init();
        }
      } // add styles to element


      _createClass(Jarallax, [{
        key: 'css',
        value: function css(el, styles) {
          if (typeof styles === 'string') {
            return _global.window.getComputedStyle(el).getPropertyValue(styles);
          } // add transform property with vendor prefix


          if (styles.transform && supportTransform) {
            styles[supportTransform] = styles.transform;
          }

          Object.keys(styles).forEach(function (key) {
            el.style[key] = styles[key];
          });
          return el;
        } // Extend like jQuery.extend

      }, {
        key: 'extend',
        value: function extend(out) {
          var _arguments = arguments;
          out = out || {};
          Object.keys(arguments).forEach(function (i) {
            if (!_arguments[i]) {
              return;
            }

            Object.keys(_arguments[i]).forEach(function (key) {
              out[key] = _arguments[i][key];
            });
          });
          return out;
        } // get window size and scroll position. Useful for extensions

      }, {
        key: 'getWindowData',
        value: function getWindowData() {
          return {
            width: wndW,
            height: wndH,
            y: wndY
          };
        } // Jarallax functions

      }, {
        key: 'initImg',
        value: function initImg() {
          var self = this; // find image element

          var $imgElement = self.options.imgElement;

          if ($imgElement && typeof $imgElement === 'string') {
            $imgElement = self.$item.querySelector($imgElement);
          } // check if dom element


          if (!($imgElement instanceof Element)) {
            $imgElement = null;
          }

          if ($imgElement) {
            if (self.options.keepImg) {
              self.image.$item = $imgElement.cloneNode(true);
            } else {
              self.image.$item = $imgElement;
              self.image.$itemParent = $imgElement.parentNode;
            }

            self.image.useImgTag = true;
          } // true if there is img tag


          if (self.image.$item) {
            return true;
          } // get image src


          if (self.image.src === null) {
            self.image.src = self.css(self.$item, 'background-image').replace(/^url\(['"]?/g, '').replace(/['"]?\)$/g, '');
          }

          return !(!self.image.src || self.image.src === 'none');
        }
      }, {
        key: 'canInitParallax',
        value: function canInitParallax() {
          return supportTransform && !this.options.disableParallax();
        }
      }, {
        key: 'init',
        value: function init() {
          var self = this;
          var containerStyles = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none'
          };
          var imageStyles = {};

          if (!self.options.keepImg) {
            // save default user styles
            var curStyle = self.$item.getAttribute('style');

            if (curStyle) {
              self.$item.setAttribute('data-jarallax-original-styles', curStyle);
            }

            if (self.image.useImgTag) {
              var curImgStyle = self.image.$item.getAttribute('style');

              if (curImgStyle) {
                self.image.$item.setAttribute('data-jarallax-original-styles', curImgStyle);
              }
            }
          } // set relative position and z-index to the parent


          if (self.css(self.$item, 'position') === 'static') {
            self.css(self.$item, {
              position: 'relative'
            });
          }

          if (self.css(self.$item, 'z-index') === 'auto') {
            self.css(self.$item, {
              zIndex: 0
            });
          } // container for parallax image


          self.image.$container = document.createElement('div');
          self.css(self.image.$container, containerStyles);
          self.css(self.image.$container, {
            'z-index': self.options.zIndex
          }); // fix for IE https://github.com/nk-o/jarallax/issues/110

          if (isIE) {
            self.css(self.image.$container, {
              opacity: 0.9999
            });
          }

          self.image.$container.setAttribute('id', 'jarallax-container-' + self.instanceID);
          self.$item.appendChild(self.image.$container); // use img tag

          if (self.image.useImgTag) {
            imageStyles = self.extend({
              'object-fit': self.options.imgSize,
              'object-position': self.options.imgPosition,
              // support for plugin https://github.com/bfred-it/object-fit-images
              'font-family': 'object-fit: ' + self.options.imgSize + '; object-position: ' + self.options.imgPosition + ';',
              'max-width': 'none'
            }, containerStyles, imageStyles); // use div with background image
          } else {
            self.image.$item = document.createElement('div');

            if (self.image.src) {
              imageStyles = self.extend({
                'background-position': self.options.imgPosition,
                'background-size': self.options.imgSize,
                'background-repeat': self.options.imgRepeat,
                'background-image': 'url("' + self.image.src + '")'
              }, containerStyles, imageStyles);
            }
          }

          if (self.options.type === 'opacity' || self.options.type === 'scale' || self.options.type === 'scale-opacity' || self.options.speed === 1) {
            self.image.position = 'absolute';
          } // check if one of parents have transform style (without this check, scroll transform will be inverted if used parallax with position fixed)
          // discussion - https://github.com/nk-o/jarallax/issues/9


          if (self.image.position === 'fixed') {
            var parentWithTransform = 0;
            var $itemParents = self.$item;

            while ($itemParents !== null && $itemParents !== document && parentWithTransform === 0) {
              var parentTransform = self.css($itemParents, '-webkit-transform') || self.css($itemParents, '-moz-transform') || self.css($itemParents, 'transform');

              if (parentTransform && parentTransform !== 'none') {
                parentWithTransform = 1;
                self.image.position = 'absolute';
              }

              $itemParents = $itemParents.parentNode;
            }
          } // add position to parallax block


          imageStyles.position = self.image.position; // insert parallax image

          self.css(self.image.$item, imageStyles);
          self.image.$container.appendChild(self.image.$item); // set initial position and size

          self.onResize();
          self.onScroll(true); // ResizeObserver

          if (self.options.automaticResize && resizeObserver) {
            resizeObserver.observe(self.$item);
          } // call onInit event


          if (self.options.onInit) {
            self.options.onInit.call(self);
          } // remove default user background


          if (self.css(self.$item, 'background-image') !== 'none') {
            self.css(self.$item, {
              'background-image': 'none'
            });
          }

          self.addToParallaxList();
        } // add to parallax instances list

      }, {
        key: 'addToParallaxList',
        value: function addToParallaxList() {
          jarallaxList.push(this);

          if (jarallaxList.length === 1) {
            updateParallax();
          }
        } // remove from parallax instances list

      }, {
        key: 'removeFromParallaxList',
        value: function removeFromParallaxList() {
          var self = this;
          jarallaxList.forEach(function (item, key) {
            if (item.instanceID === self.instanceID) {
              jarallaxList.splice(key, 1);
            }
          });
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var self = this;
          self.removeFromParallaxList(); // return styles on container as before jarallax init

          var originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');
          self.$item.removeAttribute('data-jarallax-original-styles'); // null occurs if there is no style tag before jarallax init

          if (!originalStylesTag) {
            self.$item.removeAttribute('style');
          } else {
            self.$item.setAttribute('style', originalStylesTag);
          }

          if (self.image.useImgTag) {
            // return styles on img tag as before jarallax init
            var originalStylesImgTag = self.image.$item.getAttribute('data-jarallax-original-styles');
            self.image.$item.removeAttribute('data-jarallax-original-styles'); // null occurs if there is no style tag before jarallax init

            if (!originalStylesImgTag) {
              self.image.$item.removeAttribute('style');
            } else {
              self.image.$item.setAttribute('style', originalStylesTag);
            } // move img tag to its default position


            if (self.image.$itemParent) {
              self.image.$itemParent.appendChild(self.image.$item);
            }
          } // remove additional dom elements


          if (self.$clipStyles) {
            self.$clipStyles.parentNode.removeChild(self.$clipStyles);
          }

          if (self.image.$container) {
            self.image.$container.parentNode.removeChild(self.image.$container);
          } // call onDestroy event


          if (self.options.onDestroy) {
            self.options.onDestroy.call(self);
          } // delete jarallax from item


          delete self.$item.jarallax;
        } // it will remove some image overlapping
        // overlapping occur due to an image position fixed inside absolute position element

      }, {
        key: 'clipContainer',
        value: function clipContainer() {
          // needed only when background in fixed position
          if (this.image.position !== 'fixed') {
            return;
          }

          var self = this;
          var rect = self.image.$container.getBoundingClientRect();
          var width = rect.width,
              height = rect.height;

          if (!self.$clipStyles) {
            self.$clipStyles = document.createElement('style');
            self.$clipStyles.setAttribute('type', 'text/css');
            self.$clipStyles.setAttribute('id', 'jarallax-clip-' + self.instanceID);
            var head = document.head || document.getElementsByTagName('head')[0];
            head.appendChild(self.$clipStyles);
          }

          var styles = '#jarallax-container-' + self.instanceID + ' {\n           clip: rect(0 ' + width + 'px ' + height + 'px 0);\n           clip: rect(0, ' + width + 'px, ' + height + 'px, 0);\n        }'; // add clip styles inline (this method need for support IE8 and less browsers)

          if (self.$clipStyles.styleSheet) {
            self.$clipStyles.styleSheet.cssText = styles;
          } else {
            self.$clipStyles.innerHTML = styles;
          }
        }
      }, {
        key: 'coverImage',
        value: function coverImage() {
          var self = this;
          var rect = self.image.$container.getBoundingClientRect();
          var contH = rect.height;
          var speed = self.options.speed;
          var isScroll = self.options.type === 'scroll' || self.options.type === 'scroll-opacity';
          var scrollDist = 0;
          var resultH = contH;
          var resultMT = 0; // scroll parallax

          if (isScroll) {
            // scroll distance and height for image
            if (speed < 0) {
              scrollDist = speed * Math.max(contH, wndH);

              if (wndH < contH) {
                scrollDist -= speed * (contH - wndH);
              }
            } else {
              scrollDist = speed * (contH + wndH);
            } // size for scroll parallax


            if (speed > 1) {
              resultH = Math.abs(scrollDist - wndH);
            } else if (speed < 0) {
              resultH = scrollDist / speed + Math.abs(scrollDist);
            } else {
              resultH += (wndH - contH) * (1 - speed);
            }

            scrollDist /= 2;
          } // store scroll distance


          self.parallaxScrollDistance = scrollDist; // vertical center

          if (isScroll) {
            resultMT = (wndH - resultH) / 2;
          } else {
            resultMT = (contH - resultH) / 2;
          } // apply result to item


          self.css(self.image.$item, {
            height: resultH + 'px',
            marginTop: resultMT + 'px',
            left: self.image.position === 'fixed' ? rect.left + 'px' : '0',
            width: rect.width + 'px'
          }); // call onCoverImage event

          if (self.options.onCoverImage) {
            self.options.onCoverImage.call(self);
          } // return some useful data. Used in the video cover function


          return {
            image: {
              height: resultH,
              marginTop: resultMT
            },
            container: rect
          };
        }
      }, {
        key: 'isVisible',
        value: function isVisible() {
          return this.isElementInViewport || false;
        }
      }, {
        key: 'onScroll',
        value: function onScroll(force) {
          var self = this;
          var rect = self.$item.getBoundingClientRect();
          var contT = rect.top;
          var contH = rect.height;
          var styles = {}; // check if in viewport

          var viewportRect = rect;

          if (self.options.elementInViewport) {
            viewportRect = self.options.elementInViewport.getBoundingClientRect();
          }

          self.isElementInViewport = viewportRect.bottom >= 0 && viewportRect.right >= 0 && viewportRect.top <= wndH && viewportRect.left <= wndW; // stop calculations if item is not in viewport

          if (force ? false : !self.isElementInViewport) {
            return;
          } // calculate parallax helping variables


          var beforeTop = Math.max(0, contT);
          var beforeTopEnd = Math.max(0, contH + contT);
          var afterTop = Math.max(0, -contT);
          var beforeBottom = Math.max(0, contT + contH - wndH);
          var beforeBottomEnd = Math.max(0, contH - (contT + contH - wndH));
          var afterBottom = Math.max(0, -contT + wndH - contH);
          var fromViewportCenter = 1 - 2 * (wndH - contT) / (wndH + contH); // calculate on how percent of section is visible

          var visiblePercent = 1;

          if (contH < wndH) {
            visiblePercent = 1 - (afterTop || beforeBottom) / contH;
          } else if (beforeTopEnd <= wndH) {
            visiblePercent = beforeTopEnd / wndH;
          } else if (beforeBottomEnd <= wndH) {
            visiblePercent = beforeBottomEnd / wndH;
          } // opacity


          if (self.options.type === 'opacity' || self.options.type === 'scale-opacity' || self.options.type === 'scroll-opacity') {
            styles.transform = 'translate3d(0,0,0)';
            styles.opacity = visiblePercent;
          } // scale


          if (self.options.type === 'scale' || self.options.type === 'scale-opacity') {
            var scale = 1;

            if (self.options.speed < 0) {
              scale -= self.options.speed * visiblePercent;
            } else {
              scale += self.options.speed * (1 - visiblePercent);
            }

            styles.transform = 'scale(' + scale + ') translate3d(0,0,0)';
          } // scroll


          if (self.options.type === 'scroll' || self.options.type === 'scroll-opacity') {
            var positionY = self.parallaxScrollDistance * fromViewportCenter; // fix if parallax block in absolute position

            if (self.image.position === 'absolute') {
              positionY -= contT;
            }

            styles.transform = 'translate3d(0,' + positionY + 'px,0)';
          }

          self.css(self.image.$item, styles); // call onScroll event

          if (self.options.onScroll) {
            self.options.onScroll.call(self, {
              section: rect,
              beforeTop: beforeTop,
              beforeTopEnd: beforeTopEnd,
              afterTop: afterTop,
              beforeBottom: beforeBottom,
              beforeBottomEnd: beforeBottomEnd,
              afterBottom: afterBottom,
              visiblePercent: visiblePercent,
              fromViewportCenter: fromViewportCenter
            });
          }
        }
      }, {
        key: 'onResize',
        value: function onResize() {
          this.coverImage();
          this.clipContainer();
        }
      }]);

      return Jarallax;
    }(); // global definition


    var plugin = function plugin(items) {
      // check for dom element
      // thanks: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
      if ((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? items instanceof HTMLElement : items && (typeof items === 'undefined' ? 'undefined' : _typeof(items)) === 'object' && items !== null && items.nodeType === 1 && typeof items.nodeName === 'string') {
        items = [items];
      }

      var options = arguments[1];
      var args = Array.prototype.slice.call(arguments, 2);
      var len = items.length;
      var k = 0;
      var ret = void 0;

      for (k; k < len; k++) {
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' || typeof options === 'undefined') {
          if (!items[k].jarallax) {
            items[k].jarallax = new Jarallax(items[k], options);
          }
        } else if (items[k].jarallax) {
          // eslint-disable-next-line prefer-spread
          ret = items[k].jarallax[options].apply(items[k].jarallax, args);
        }

        if (typeof ret !== 'undefined') {
          return ret;
        }
      }

      return items;
    };

    plugin.constructor = Jarallax;
    exports.default = plugin;
    /* WEBPACK VAR INJECTION */
  }).call(this, __webpack_require__(5));
  /***/
},
/* 14 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  var global = __webpack_require__(4);
  /**
   * `requestAnimationFrame()`
   */


  var request = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || fallback;
  var prev = +new Date();

  function fallback(fn) {
    var curr = +new Date();
    var ms = Math.max(0, 16 - (curr - prev));
    var req = setTimeout(fn, ms);
    return prev = curr, req;
  }
  /**
   * `cancelAnimationFrame()`
   */


  var cancel = global.cancelAnimationFrame || global.webkitCancelAnimationFrame || global.mozCancelAnimationFrame || clearTimeout;

  if (Function.prototype.bind) {
    request = request.bind(global);
    cancel = cancel.bind(global);
  }

  exports = module.exports = request;
  exports.cancel = cancel;
  /***/
}]);
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/*!
* jquery.inputmask.bundle.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2019 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.6
*/
(function (modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }

  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;

  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
    }
  };

  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module"
      });
    }

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  };

  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && _typeof2(value) === "object" && value && value.__esModule) return value;
    var ns = Object.create(null);

    __webpack_require__.r(ns);

    Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value
    });
    if (mode & 2 && typeof value != "string") for (var key in value) {
      __webpack_require__.d(ns, key, function (key) {
        return value[key];
      }.bind(null, key));
    }
    return ns;
  };

  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ? function getDefault() {
      return module["default"];
    } : function getModuleExports() {
      return module;
    };

    __webpack_require__.d(getter, "a", getter);

    return getter;
  };

  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  __webpack_require__.p = "";
  return __webpack_require__(__webpack_require__.s = 0);
})([function (module, exports, __webpack_require__) {
  "use strict";

  __webpack_require__(1);

  __webpack_require__(6);

  __webpack_require__(7);

  var _inputmask = __webpack_require__(2);

  var _inputmask2 = _interopRequireDefault(_inputmask);

  var _inputmask3 = __webpack_require__(3);

  var _inputmask4 = _interopRequireDefault(_inputmask3);

  var _jquery = __webpack_require__(4);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  if (_inputmask4.default === _jquery2.default) {
    __webpack_require__(8);
  }

  window.Inputmask = _inputmask2.default;
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function (Inputmask) {
    Inputmask.extendDefinitions({
      A: {
        validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
        casing: "upper"
      },
      "&": {
        validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
        casing: "upper"
      },
      "#": {
        validator: "[0-9A-Fa-f]",
        casing: "upper"
      }
    });
    Inputmask.extendAliases({
      cssunit: {
        regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
      },
      url: {
        regex: "(https?|ftp)//.*",
        autoUnmask: false
      },
      ip: {
        mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
        definitions: {
          i: {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
                chrs = maskset.buffer[pos - 1] + chrs;

                if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
                  chrs = maskset.buffer[pos - 2] + chrs;
                } else chrs = "0" + chrs;
              } else chrs = "00" + chrs;

              return new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
            }
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return maskedValue;
        },
        inputmode: "numeric"
      },
      email: {
        mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
        greedy: false,
        casing: "lower",
        onBeforePaste: function onBeforePaste(pastedValue, opts) {
          pastedValue = pastedValue.toLowerCase();
          return pastedValue.replace("mailto:", "");
        },
        definitions: {
          "*": {
            validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5!#$%&'*+/=?^_`{|}~-]"
          },
          "-": {
            validator: "[0-9A-Za-z-]"
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return maskedValue;
        },
        inputmode: "email"
      },
      mac: {
        mask: "##:##:##:##:##:##"
      },
      vin: {
        mask: "V{13}9{4}",
        definitions: {
          V: {
            validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
            casing: "upper"
          }
        },
        clearIncomplete: true,
        autoUnmask: true
      }
    });
    return Inputmask;
  });
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function ($, window, undefined) {
    var document = window.document,
        ua = navigator.userAgent,
        ie = ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0,
        mobile = isInputEventSupported("touchstart"),
        iemobile = /iemobile/i.test(ua),
        iphone = /iphone/i.test(ua) && !iemobile;

    function Inputmask(alias, options, internal) {
      if (!(this instanceof Inputmask)) {
        return new Inputmask(alias, options, internal);
      }

      this.el = undefined;
      this.events = {};
      this.maskset = undefined;
      this.refreshValue = false;

      if (internal !== true) {
        if ($.isPlainObject(alias)) {
          options = alias;
        } else {
          options = options || {};
          if (alias) options.alias = alias;
        }

        this.opts = $.extend(true, {}, this.defaults, options);
        this.noMasksCache = options && options.definitions !== undefined;
        this.userOptions = options || {};
        this.isRTL = this.opts.numericInput;
        resolveAlias(this.opts.alias, options, this.opts);
      }
    }

    Inputmask.prototype = {
      dataAttribute: "data-inputmask",
      defaults: {
        placeholder: "_",
        optionalmarker: ["[", "]"],
        quantifiermarker: ["{", "}"],
        groupmarker: ["(", ")"],
        alternatormarker: "|",
        escapeChar: "\\",
        mask: null,
        regex: null,
        oncomplete: $.noop,
        onincomplete: $.noop,
        oncleared: $.noop,
        repeat: 0,
        greedy: false,
        autoUnmask: false,
        removeMaskOnSubmit: false,
        clearMaskOnLostFocus: true,
        insertMode: true,
        clearIncomplete: false,
        alias: null,
        onKeyDown: $.noop,
        onBeforeMask: null,
        onBeforePaste: function onBeforePaste(pastedValue, opts) {
          return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
        },
        onBeforeWrite: null,
        onUnMask: null,
        showMaskOnFocus: true,
        showMaskOnHover: true,
        onKeyValidation: $.noop,
        skipOptionalPartCharacter: " ",
        numericInput: false,
        rightAlign: false,
        undoOnEscape: true,
        radixPoint: "",
        _radixDance: false,
        groupSeparator: "",
        keepStatic: null,
        positionCaretOnTab: true,
        tabThrough: false,
        supportsInputType: ["text", "tel", "url", "password", "search"],
        ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
        isComplete: null,
        preValidation: null,
        postValidation: null,
        staticDefinitionSymbol: undefined,
        jitMasking: false,
        nullable: true,
        inputEventOnly: false,
        noValuePatching: false,
        positionCaretOnClick: "lvp",
        casing: null,
        inputmode: "verbatim",
        colorMask: false,
        disablePredictiveText: false,
        importDataAttributes: true,
        shiftPositions: true
      },
      definitions: {
        9: {
          validator: "[0-9\uFF11-\uFF19]",
          definitionSymbol: "*"
        },
        a: {
          validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
          definitionSymbol: "*"
        },
        "*": {
          validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]"
        }
      },
      aliases: {},
      masksCache: {},
      mask: function mask(elems) {
        var that = this;

        function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
          if (opts.importDataAttributes === true) {
            var importOption = function importOption(option, optionData) {
              optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option);

              if (optionData !== null) {
                if (typeof optionData === "string") {
                  if (option.indexOf("on") === 0) optionData = window[optionData];else if (optionData === "false") optionData = false;else if (optionData === "true") optionData = true;
                }

                userOptions[option] = optionData;
              }
            };

            var attrOptions = npt.getAttribute(dataAttribute),
                option,
                dataoptions,
                optionData,
                p;

            if (attrOptions && attrOptions !== "") {
              attrOptions = attrOptions.replace(/'/g, '"');
              dataoptions = JSON.parse("{" + attrOptions + "}");
            }

            if (dataoptions) {
              optionData = undefined;

              for (p in dataoptions) {
                if (p.toLowerCase() === "alias") {
                  optionData = dataoptions[p];
                  break;
                }
              }
            }

            importOption("alias", optionData);

            if (userOptions.alias) {
              resolveAlias(userOptions.alias, userOptions, opts);
            }

            for (option in opts) {
              if (dataoptions) {
                optionData = undefined;

                for (p in dataoptions) {
                  if (p.toLowerCase() === option.toLowerCase()) {
                    optionData = dataoptions[p];
                    break;
                  }
                }
              }

              importOption(option, optionData);
            }
          }

          $.extend(true, opts, userOptions);

          if (npt.dir === "rtl" || opts.rightAlign) {
            npt.style.textAlign = "right";
          }

          if (npt.dir === "rtl" || opts.numericInput) {
            npt.dir = "ltr";
            npt.removeAttribute("dir");
            opts.isRTL = true;
          }

          return Object.keys(userOptions).length;
        }

        if (typeof elems === "string") {
          elems = document.getElementById(elems) || document.querySelectorAll(elems);
        }

        elems = elems.nodeName ? [elems] : elems;
        $.each(elems, function (ndx, el) {
          var scopedOpts = $.extend(true, {}, that.opts);

          if (importAttributeOptions(el, scopedOpts, $.extend(true, {}, that.userOptions), that.dataAttribute)) {
            var maskset = generateMaskSet(scopedOpts, that.noMasksCache);

            if (maskset !== undefined) {
              if (el.inputmask !== undefined) {
                el.inputmask.opts.autoUnmask = true;
                el.inputmask.remove();
              }

              el.inputmask = new Inputmask(undefined, undefined, true);
              el.inputmask.opts = scopedOpts;
              el.inputmask.noMasksCache = that.noMasksCache;
              el.inputmask.userOptions = $.extend(true, {}, that.userOptions);
              el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput;
              el.inputmask.el = el;
              el.inputmask.maskset = maskset;
              $.data(el, "_inputmask_opts", scopedOpts);
              maskScope.call(el.inputmask, {
                action: "mask"
              });
            }
          }
        });
        return elems && elems[0] ? elems[0].inputmask || this : this;
      },
      option: function option(options, noremask) {
        if (typeof options === "string") {
          return this.opts[options];
        } else if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
          $.extend(this.userOptions, options);

          if (this.el && noremask !== true) {
            this.mask(this.el);
          }

          return this;
        }
      },
      unmaskedvalue: function unmaskedvalue(value) {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "unmaskedvalue",
          value: value
        });
      },
      remove: function remove() {
        return maskScope.call(this, {
          action: "remove"
        });
      },
      getemptymask: function getemptymask() {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "getemptymask"
        });
      },
      hasMaskedValue: function hasMaskedValue() {
        return !this.opts.autoUnmask;
      },
      isComplete: function isComplete() {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "isComplete"
        });
      },
      getmetadata: function getmetadata() {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "getmetadata"
        });
      },
      isValid: function isValid(value) {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "isValid",
          value: value
        });
      },
      format: function format(value, metadata) {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "format",
          value: value,
          metadata: metadata
        });
      },
      setValue: function setValue(value) {
        if (this.el) {
          $(this.el).trigger("setvalue", [value]);
        }
      },
      analyseMask: function analyseMask(mask, regexMask, opts) {
        var tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?(?:\|[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
            regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            escaped = false,
            currentToken = new MaskToken(),
            match,
            m,
            openenings = [],
            maskTokens = [],
            openingToken,
            currentOpeningToken,
            alternator,
            lastMatch,
            groupToken;

        function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
          this.matches = [];
          this.openGroup = isGroup || false;
          this.alternatorGroup = false;
          this.isGroup = isGroup || false;
          this.isOptional = isOptional || false;
          this.isQuantifier = isQuantifier || false;
          this.isAlternator = isAlternator || false;
          this.quantifier = {
            min: 1,
            max: 1
          };
        }

        function insertTestDefinition(mtoken, element, position) {
          position = position !== undefined ? position : mtoken.matches.length;
          var prevMatch = mtoken.matches[position - 1];

          if (regexMask) {
            if (element.indexOf("[") === 0 || escaped && /\\d|\\s|\\w]/i.test(element) || element === ".") {
              mtoken.matches.splice(position++, 0, {
                fn: new RegExp(element, opts.casing ? "i" : ""),
                optionality: false,
                newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element,
                casing: null,
                def: element,
                placeholder: undefined,
                nativeDef: element
              });
            } else {
              if (escaped) element = element[element.length - 1];
              $.each(element.split(""), function (ndx, lmnt) {
                prevMatch = mtoken.matches[position - 1];
                mtoken.matches.splice(position++, 0, {
                  fn: null,
                  optionality: false,
                  newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== lmnt && prevMatch.fn !== null,
                  casing: null,
                  def: opts.staticDefinitionSymbol || lmnt,
                  placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
                  nativeDef: (escaped ? "'" : "") + lmnt
                });
              });
            }

            escaped = false;
          } else {
            var maskdef = (opts.definitions ? opts.definitions[element] : undefined) || Inputmask.prototype.definitions[element];

            if (maskdef && !escaped) {
              mtoken.matches.splice(position++, 0, {
                fn: maskdef.validator ? typeof maskdef.validator == "string" ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
                  this.test = maskdef.validator;
                }() : new RegExp("."),
                optionality: false,
                newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                casing: maskdef.casing,
                def: maskdef.definitionSymbol || element,
                placeholder: maskdef.placeholder,
                nativeDef: element
              });
            } else {
              mtoken.matches.splice(position++, 0, {
                fn: null,
                optionality: false,
                newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element && prevMatch.fn !== null,
                casing: null,
                def: opts.staticDefinitionSymbol || element,
                placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
                nativeDef: (escaped ? "'" : "") + element
              });
              escaped = false;
            }
          }
        }

        function verifyGroupMarker(maskToken) {
          if (maskToken && maskToken.matches) {
            $.each(maskToken.matches, function (ndx, token) {
              var nextToken = maskToken.matches[ndx + 1];

              if ((nextToken === undefined || nextToken.matches === undefined || nextToken.isQuantifier === false) && token && token.isGroup) {
                token.isGroup = false;

                if (!regexMask) {
                  insertTestDefinition(token, opts.groupmarker[0], 0);

                  if (token.openGroup !== true) {
                    insertTestDefinition(token, opts.groupmarker[1]);
                  }
                }
              }

              verifyGroupMarker(token);
            });
          }
        }

        function defaultCase() {
          if (openenings.length > 0) {
            currentOpeningToken = openenings[openenings.length - 1];
            insertTestDefinition(currentOpeningToken, m);

            if (currentOpeningToken.isAlternator) {
              alternator = openenings.pop();

              for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                if (alternator.matches[mndx].isGroup) alternator.matches[mndx].isGroup = false;
              }

              if (openenings.length > 0) {
                currentOpeningToken = openenings[openenings.length - 1];
                currentOpeningToken.matches.push(alternator);
              } else {
                currentToken.matches.push(alternator);
              }
            }
          } else {
            insertTestDefinition(currentToken, m);
          }
        }

        function reverseTokens(maskToken) {
          function reverseStatic(st) {
            if (st === opts.optionalmarker[0]) st = opts.optionalmarker[1];else if (st === opts.optionalmarker[1]) st = opts.optionalmarker[0];else if (st === opts.groupmarker[0]) st = opts.groupmarker[1];else if (st === opts.groupmarker[1]) st = opts.groupmarker[0];
            return st;
          }

          maskToken.matches = maskToken.matches.reverse();

          for (var match in maskToken.matches) {
            if (maskToken.matches.hasOwnProperty(match)) {
              var intMatch = parseInt(match);

              if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                var qt = maskToken.matches[match];
                maskToken.matches.splice(match, 1);
                maskToken.matches.splice(intMatch + 1, 0, qt);
              }

              if (maskToken.matches[match].matches !== undefined) {
                maskToken.matches[match] = reverseTokens(maskToken.matches[match]);
              } else {
                maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
              }
            }
          }

          return maskToken;
        }

        function groupify(matches) {
          var groupToken = new MaskToken(true);
          groupToken.openGroup = false;
          groupToken.matches = matches;
          return groupToken;
        }

        if (regexMask) {
          opts.optionalmarker[0] = undefined;
          opts.optionalmarker[1] = undefined;
        }

        while (match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask)) {
          m = match[0];

          if (regexMask) {
            switch (m.charAt(0)) {
              case "?":
                m = "{0,1}";
                break;

              case "+":
              case "*":
                m = "{" + m + "}";
                break;
            }
          }

          if (escaped) {
            defaultCase();
            continue;
          }

          switch (m.charAt(0)) {
            case "(?=":
              break;

            case "(?!":
              break;

            case "(?<=":
              break;

            case "(?<!":
              break;

            case opts.escapeChar:
              escaped = true;

              if (regexMask) {
                defaultCase();
              }

              break;

            case opts.optionalmarker[1]:
            case opts.groupmarker[1]:
              openingToken = openenings.pop();
              openingToken.openGroup = false;

              if (openingToken !== undefined) {
                if (openenings.length > 0) {
                  currentOpeningToken = openenings[openenings.length - 1];
                  currentOpeningToken.matches.push(openingToken);

                  if (currentOpeningToken.isAlternator) {
                    alternator = openenings.pop();

                    for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                      alternator.matches[mndx].isGroup = false;
                      alternator.matches[mndx].alternatorGroup = false;
                    }

                    if (openenings.length > 0) {
                      currentOpeningToken = openenings[openenings.length - 1];
                      currentOpeningToken.matches.push(alternator);
                    } else {
                      currentToken.matches.push(alternator);
                    }
                  }
                } else {
                  currentToken.matches.push(openingToken);
                }
              } else defaultCase();

              break;

            case opts.optionalmarker[0]:
              openenings.push(new MaskToken(false, true));
              break;

            case opts.groupmarker[0]:
              openenings.push(new MaskToken(true));
              break;

            case opts.quantifiermarker[0]:
              var quantifier = new MaskToken(false, false, true);
              m = m.replace(/[{}]/g, "");
              var mqj = m.split("|"),
                  mq = mqj[0].split(","),
                  mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                  mq1 = mq.length === 1 ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);

              if (mq0 === "*" || mq0 === "+") {
                mq0 = mq1 === "*" ? 0 : 1;
              }

              quantifier.quantifier = {
                min: mq0,
                max: mq1,
                jit: mqj[1]
              };
              var matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
              match = matches.pop();

              if (match.isAlternator) {
                matches.push(match);
                matches = match.matches;
                var groupToken = new MaskToken(true);
                var tmpMatch = matches.pop();
                matches.push(groupToken);
                matches = groupToken.matches;
                match = tmpMatch;
              }

              if (!match.isGroup) {
                match = groupify([match]);
              }

              matches.push(match);
              matches.push(quantifier);
              break;

            case opts.alternatormarker:
              var groupQuantifier = function groupQuantifier(matches) {
                var lastMatch = matches.pop();

                if (lastMatch.isQuantifier) {
                  lastMatch = groupify([matches.pop(), lastMatch]);
                }

                return lastMatch;
              };

              if (openenings.length > 0) {
                currentOpeningToken = openenings[openenings.length - 1];
                var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];

                if (currentOpeningToken.openGroup && (subToken.matches === undefined || subToken.isGroup === false && subToken.isAlternator === false)) {
                  lastMatch = openenings.pop();
                } else {
                  lastMatch = groupQuantifier(currentOpeningToken.matches);
                }
              } else {
                lastMatch = groupQuantifier(currentToken.matches);
              }

              if (lastMatch.isAlternator) {
                openenings.push(lastMatch);
              } else {
                if (lastMatch.alternatorGroup) {
                  alternator = openenings.pop();
                  lastMatch.alternatorGroup = false;
                } else {
                  alternator = new MaskToken(false, false, false, true);
                }

                alternator.matches.push(lastMatch);
                openenings.push(alternator);

                if (lastMatch.openGroup) {
                  lastMatch.openGroup = false;
                  var alternatorGroup = new MaskToken(true);
                  alternatorGroup.alternatorGroup = true;
                  openenings.push(alternatorGroup);
                }
              }

              break;

            default:
              defaultCase();
          }
        }

        while (openenings.length > 0) {
          openingToken = openenings.pop();
          currentToken.matches.push(openingToken);
        }

        if (currentToken.matches.length > 0) {
          verifyGroupMarker(currentToken);
          maskTokens.push(currentToken);
        }

        if (opts.numericInput || opts.isRTL) {
          reverseTokens(maskTokens[0]);
        }

        return maskTokens;
      }
    };

    Inputmask.extendDefaults = function (options) {
      $.extend(true, Inputmask.prototype.defaults, options);
    };

    Inputmask.extendDefinitions = function (definition) {
      $.extend(true, Inputmask.prototype.definitions, definition);
    };

    Inputmask.extendAliases = function (alias) {
      $.extend(true, Inputmask.prototype.aliases, alias);
    };

    Inputmask.format = function (value, options, metadata) {
      return Inputmask(options).format(value, metadata);
    };

    Inputmask.unmask = function (value, options) {
      return Inputmask(options).unmaskedvalue(value);
    };

    Inputmask.isValid = function (value, options) {
      return Inputmask(options).isValid(value);
    };

    Inputmask.remove = function (elems) {
      if (typeof elems === "string") {
        elems = document.getElementById(elems) || document.querySelectorAll(elems);
      }

      elems = elems.nodeName ? [elems] : elems;
      $.each(elems, function (ndx, el) {
        if (el.inputmask) el.inputmask.remove();
      });
    };

    Inputmask.setValue = function (elems, value) {
      if (typeof elems === "string") {
        elems = document.getElementById(elems) || document.querySelectorAll(elems);
      }

      elems = elems.nodeName ? [elems] : elems;
      $.each(elems, function (ndx, el) {
        if (el.inputmask) el.inputmask.setValue(value);else $(el).trigger("setvalue", [value]);
      });
    };

    Inputmask.escapeRegex = function (str) {
      var specials = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
      return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
    };

    Inputmask.keyCode = {
      BACKSPACE: 8,
      BACKSPACE_SAFARI: 127,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      INSERT: 45,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      X: 88,
      CONTROL: 17
    };
    Inputmask.dependencyLib = $;

    function resolveAlias(aliasStr, options, opts) {
      var aliasDefinition = Inputmask.prototype.aliases[aliasStr];

      if (aliasDefinition) {
        if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts);
        $.extend(true, opts, aliasDefinition);
        $.extend(true, opts, options);
        return true;
      } else if (opts.mask === null) {
        opts.mask = aliasStr;
      }

      return false;
    }

    function generateMaskSet(opts, nocache) {
      function generateMask(mask, metadata, opts) {
        var regexMask = false;

        if (mask === null || mask === "") {
          regexMask = opts.regex !== null;

          if (regexMask) {
            mask = opts.regex;
            mask = mask.replace(/^(\^)(.*)(\$)$/, "$2");
          } else {
            regexMask = true;
            mask = ".*";
          }
        }

        if (mask.length === 1 && opts.greedy === false && opts.repeat !== 0) {
          opts.placeholder = "";
        }

        if (opts.repeat > 0 || opts.repeat === "*" || opts.repeat === "+") {
          var repeatStart = opts.repeat === "*" ? 0 : opts.repeat === "+" ? 1 : opts.repeat;
          mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
        }

        var masksetDefinition,
            maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;

        if (Inputmask.prototype.masksCache[maskdefKey] === undefined || nocache === true) {
          masksetDefinition = {
            mask: mask,
            maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
            validPositions: {},
            _buffer: undefined,
            buffer: undefined,
            tests: {},
            excludes: {},
            metadata: metadata,
            maskLength: undefined,
            jitOffset: {}
          };

          if (nocache !== true) {
            Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition;
            masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[maskdefKey]);
          }
        } else masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[maskdefKey]);

        return masksetDefinition;
      }

      var ms;

      if ($.isFunction(opts.mask)) {
        opts.mask = opts.mask(opts);
      }

      if ($.isArray(opts.mask)) {
        if (opts.mask.length > 1) {
          if (opts.keepStatic === null) {
            opts.keepStatic = "auto";

            for (var i = 0; i < opts.mask.length; i++) {
              if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
                opts.keepStatic = true;
                break;
              }
            }
          }

          var altMask = opts.groupmarker[0];
          $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
            if (altMask.length > 1) {
              altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0];
            }

            if (msk.mask !== undefined && !$.isFunction(msk.mask)) {
              altMask += msk.mask;
            } else {
              altMask += msk;
            }
          });
          altMask += opts.groupmarker[1];
          return generateMask(altMask, opts.mask, opts);
        } else opts.mask = opts.mask.pop();
      }

      if (opts.mask && opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask)) {
        ms = generateMask(opts.mask.mask, opts.mask, opts);
      } else {
        ms = generateMask(opts.mask, opts.mask, opts);
      }

      return ms;
    }

    function isInputEventSupported(eventName) {
      var el = document.createElement("input"),
          evName = "on" + eventName,
          isSupported = evName in el;

      if (!isSupported) {
        el.setAttribute(evName, "return;");
        isSupported = typeof el[evName] === "function";
      }

      el = null;
      return isSupported;
    }

    function maskScope(actionObj, maskset, opts) {
      maskset = maskset || this.maskset;
      opts = opts || this.opts;
      var inputmask = this,
          el = this.el,
          isRTL = this.isRTL,
          undoValue,
          $el,
          skipKeyPressEvent = false,
          skipInputEvent = false,
          ignorable = false,
          maxLength,
          mouseEnter = false,
          colorMask,
          originalPlaceholder;

      function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
        var greedy = opts.greedy;
        if (clearOptionalTail) opts.greedy = false;
        minimalPos = minimalPos || 0;
        var maskTemplate = [],
            ndxIntlzr,
            pos = 0,
            test,
            testPos,
            lvp = getLastValidPosition();

        do {
          if (baseOnInput === true && getMaskSet().validPositions[pos]) {
            testPos = clearOptionalTail && getMaskSet().validPositions[pos].match.optionality === true && getMaskSet().validPositions[pos + 1] === undefined && (getMaskSet().validPositions[pos].generatedInput === true || getMaskSet().validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0) ? determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1)) : getMaskSet().validPositions[pos];
            test = testPos.match;
            ndxIntlzr = testPos.locator.slice();
            maskTemplate.push(includeMode === true ? testPos.input : includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
          } else {
            testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
            test = testPos.match;
            ndxIntlzr = testPos.locator.slice();
            var jitMasking = noJit === true ? false : opts.jitMasking !== false ? opts.jitMasking : test.jit;

            if (jitMasking === false || jitMasking === undefined || typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos) {
              maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
            }
          }

          if (opts.keepStatic === "auto") {
            if (test.newBlockMarker && test.fn !== null) {
              opts.keepStatic = pos - 1;
            }
          }

          pos++;
        } while ((maxLength === undefined || pos < maxLength) && (test.fn !== null || test.def !== "") || minimalPos > pos);

        if (maskTemplate[maskTemplate.length - 1] === "") {
          maskTemplate.pop();
        }

        if (includeMode !== false || getMaskSet().maskLength === undefined) getMaskSet().maskLength = pos - 1;
        opts.greedy = greedy;
        return maskTemplate;
      }

      function getMaskSet() {
        return maskset;
      }

      function resetMaskSet(soft) {
        var maskset = getMaskSet();
        maskset.buffer = undefined;

        if (soft !== true) {
          maskset.validPositions = {};
          maskset.p = 0;
        }
      }

      function getLastValidPosition(closestTo, strict, validPositions) {
        var before = -1,
            after = -1,
            valids = validPositions || getMaskSet().validPositions;
        if (closestTo === undefined) closestTo = -1;

        for (var posNdx in valids) {
          var psNdx = parseInt(posNdx);

          if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
            if (psNdx <= closestTo) before = psNdx;
            if (psNdx >= closestTo) after = psNdx;
          }
        }

        return before === -1 || before == closestTo ? after : after == -1 ? before : closestTo - before < after - closestTo ? before : after;
      }

      function getDecisionTaker(tst) {
        var decisionTaker = tst.locator[tst.alternation];

        if (typeof decisionTaker == "string" && decisionTaker.length > 0) {
          decisionTaker = decisionTaker.split(",")[0];
        }

        return decisionTaker !== undefined ? decisionTaker.toString() : "";
      }

      function getLocator(tst, align) {
        var locator = (tst.alternation != undefined ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
        if (locator !== "") while (locator.length < align) {
          locator += "0";
        }
        return locator;
      }

      function determineTestTemplate(pos, tests) {
        pos = pos > 0 ? pos - 1 : 0;
        var altTest = getTest(pos),
            targetLocator = getLocator(altTest),
            tstLocator,
            closest,
            bestMatch;

        for (var ndx = 0; ndx < tests.length; ndx++) {
          var tst = tests[ndx];
          tstLocator = getLocator(tst, targetLocator.length);
          var distance = Math.abs(tstLocator - targetLocator);

          if (closest === undefined || tstLocator !== "" && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && bestMatch.match.newBlockMarker === "master" && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) {
            closest = distance;
            bestMatch = tst;
          }
        }

        return bestMatch;
      }

      function getTestTemplate(pos, ndxIntlzr, tstPs) {
        return getMaskSet().validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
      }

      function getTest(pos, tests) {
        if (getMaskSet().validPositions[pos]) {
          return getMaskSet().validPositions[pos];
        }

        return (tests || getTests(pos))[0];
      }

      function positionCanMatchDefinition(pos, def) {
        var valid = false,
            tests = getTests(pos);

        for (var tndx = 0; tndx < tests.length; tndx++) {
          if (tests[tndx].match && tests[tndx].match.def === def) {
            valid = true;
            break;
          }
        }

        return valid;
      }

      function getTests(pos, ndxIntlzr, tstPs) {
        var maskTokens = getMaskSet().maskToken,
            testPos = ndxIntlzr ? tstPs : 0,
            ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
            matches = [],
            insertStop = false,
            latestMatch,
            cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

        function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
          function handleMatch(match, loopNdx, quantifierRecurse) {
            function isFirstMatch(latestMatch, tokenGroup) {
              var firstMatch = $.inArray(latestMatch, tokenGroup.matches) === 0;

              if (!firstMatch) {
                $.each(tokenGroup.matches, function (ndx, match) {
                  if (match.isQuantifier === true) firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]);else if (match.hasOwnProperty("matches")) firstMatch = isFirstMatch(latestMatch, match);
                  if (firstMatch) return false;
                });
              }

              return firstMatch;
            }

            function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
              var bestMatch, indexPos;

              if (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) {
                $.each(getMaskSet().tests[pos] || [getMaskSet().validPositions[pos]], function (ndx, lmnt) {
                  if (lmnt.mloc[alternateNdx]) {
                    bestMatch = lmnt;
                    return false;
                  }

                  var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation,
                      ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;

                  if ((indexPos === undefined || ndxPos < indexPos) && ndxPos !== -1) {
                    bestMatch = lmnt;
                    indexPos = ndxPos;
                  }
                });
              }

              if (bestMatch) {
                var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation];
                var locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                return locator.slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1);
              } else {
                return targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
              }
            }

            function isSubsetOf(source, target) {
              function expand(pattern) {
                var expanded = [],
                    start,
                    end;

                for (var i = 0, l = pattern.length; i < l; i++) {
                  if (pattern.charAt(i) === "-") {
                    end = pattern.charCodeAt(i + 1);

                    while (++start < end) {
                      expanded.push(String.fromCharCode(start));
                    }
                  } else {
                    start = pattern.charCodeAt(i);
                    expanded.push(pattern.charAt(i));
                  }
                }

                return expanded.join("");
              }

              if (opts.regex && source.match.fn !== null && target.match.fn !== null) {
                return expand(target.match.def.replace(/[\[\]]/g, "")).indexOf(expand(source.match.def.replace(/[\[\]]/g, ""))) !== -1;
              }

              return source.match.def === target.match.nativeDef;
            }

            function staticCanMatchDefinition(source, target) {
              var sloc = source.locator.slice(source.alternation).join(""),
                  tloc = target.locator.slice(target.alternation).join(""),
                  canMatch = sloc == tloc;
              canMatch = canMatch && source.match.fn === null && target.match.fn !== null ? target.match.fn.test(source.match.def, getMaskSet(), pos, false, opts, false) : false;
              return canMatch;
            }

            function setMergeLocators(targetMatch, altMatch) {
              if (altMatch === undefined || targetMatch.alternation === altMatch.alternation && targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) === -1) {
                targetMatch.mloc = targetMatch.mloc || {};
                var locNdx = targetMatch.locator[targetMatch.alternation];
                if (locNdx === undefined) targetMatch.alternation = undefined;else {
                  if (typeof locNdx === "string") locNdx = locNdx.split(",")[0];
                  if (targetMatch.mloc[locNdx] === undefined) targetMatch.mloc[locNdx] = targetMatch.locator.slice();

                  if (altMatch !== undefined) {
                    for (var ndx in altMatch.mloc) {
                      if (typeof ndx === "string") ndx = ndx.split(",")[0];
                      if (targetMatch.mloc[ndx] === undefined) targetMatch.mloc[ndx] = altMatch.mloc[ndx];
                    }

                    targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",");
                  }

                  return true;
                }
              }

              return false;
            }

            if (testPos > 500 && quantifierRecurse !== undefined) {
              throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
            }

            if (testPos === pos && match.matches === undefined) {
              matches.push({
                match: match,
                locator: loopNdx.reverse(),
                cd: cacheDependency,
                mloc: {}
              });
              return true;
            } else if (match.matches !== undefined) {
              if (match.isGroup && quantifierRecurse !== match) {
                match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx, quantifierRecurse);
                if (match) return true;
              } else if (match.isOptional) {
                var optionalToken = match;
                match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);

                if (match) {
                  $.each(matches, function (ndx, mtch) {
                    mtch.match.optionality = true;
                  });
                  latestMatch = matches[matches.length - 1].match;

                  if (quantifierRecurse === undefined && isFirstMatch(latestMatch, optionalToken)) {
                    insertStop = true;
                    testPos = pos;
                  } else return true;
                }
              } else if (match.isAlternator) {
                var alternateToken = match,
                    malternateMatches = [],
                    maltMatches,
                    currentMatches = matches.slice(),
                    loopNdxCnt = loopNdx.length;
                var altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;

                if (altIndex === -1 || typeof altIndex === "string") {
                  var currentPos = testPos,
                      ndxInitializerClone = ndxInitializer.slice(),
                      altIndexArr = [],
                      amndx;

                  if (typeof altIndex == "string") {
                    altIndexArr = altIndex.split(",");
                  } else {
                    for (amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                      altIndexArr.push(amndx.toString());
                    }
                  }

                  if (getMaskSet().excludes[pos]) {
                    var altIndexArrClone = altIndexArr.slice();

                    for (var i = 0, el = getMaskSet().excludes[pos].length; i < el; i++) {
                      altIndexArr.splice(altIndexArr.indexOf(getMaskSet().excludes[pos][i].toString()), 1);
                    }

                    if (altIndexArr.length === 0) {
                      getMaskSet().excludes[pos] = undefined;
                      altIndexArr = altIndexArrClone;
                    }
                  }

                  if (opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) altIndexArr = altIndexArr.slice(0, 1);
                  var unMatchedAlternation = false;

                  for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                    amndx = parseInt(altIndexArr[ndx]);
                    matches = [];
                    ndxInitializer = typeof altIndex === "string" ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();
                    if (alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse)) match = true;else if (ndx === 0) {
                      unMatchedAlternation = true;
                    }
                    maltMatches = matches.slice();
                    testPos = currentPos;
                    matches = [];

                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                      var altMatch = maltMatches[ndx1],
                          dropMatch = false;
                      altMatch.match.jit = altMatch.match.jit || unMatchedAlternation;
                      altMatch.alternation = altMatch.alternation || loopNdxCnt;
                      setMergeLocators(altMatch);

                      for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                        var altMatch2 = malternateMatches[ndx2];

                        if (typeof altIndex !== "string" || altMatch.alternation !== undefined && $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr) !== -1) {
                          if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                            dropMatch = true;
                            setMergeLocators(altMatch2, altMatch);
                            break;
                          } else if (isSubsetOf(altMatch, altMatch2)) {
                            if (setMergeLocators(altMatch, altMatch2)) {
                              dropMatch = true;
                              malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                            }

                            break;
                          } else if (isSubsetOf(altMatch2, altMatch)) {
                            setMergeLocators(altMatch2, altMatch);
                            break;
                          } else if (staticCanMatchDefinition(altMatch, altMatch2)) {
                            if (setMergeLocators(altMatch, altMatch2)) {
                              dropMatch = true;
                              malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                            }

                            break;
                          }
                        }
                      }

                      if (!dropMatch) {
                        malternateMatches.push(altMatch);
                      }
                    }
                  }

                  matches = currentMatches.concat(malternateMatches);
                  testPos = pos;
                  insertStop = matches.length > 0;
                  match = malternateMatches.length > 0;
                  ndxInitializer = ndxInitializerClone.slice();
                } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);

                if (match) return true;
              } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) {
                var qt = match;

                for (var qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                  var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                  match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup);

                  if (match) {
                    latestMatch = matches[matches.length - 1].match;
                    latestMatch.optionalQuantifier = qndx >= qt.quantifier.min;
                    latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit;

                    if (latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                      insertStop = true;
                      testPos = pos;
                      break;
                    }

                    if (latestMatch.jit) {
                      getMaskSet().jitOffset[pos] = tokenGroup.matches.indexOf(latestMatch);
                    }

                    return true;
                  }
                }
              } else {
                match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                if (match) return true;
              }
            } else {
              testPos++;
            }
          }

          for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) {
            if (maskToken.matches[tndx].isQuantifier !== true) {
              var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);

              if (match && testPos === pos) {
                return match;
              } else if (testPos > pos) {
                break;
              }
            }
          }
        }

        function mergeLocators(pos, tests) {
          var locator = [];
          if (!$.isArray(tests)) tests = [tests];

          if (tests.length > 0) {
            if (tests[0].alternation === undefined) {
              locator = determineTestTemplate(pos, tests.slice()).locator.slice();
              if (locator.length === 0) locator = tests[0].locator.slice();
            } else {
              $.each(tests, function (ndx, tst) {
                if (tst.def !== "") {
                  if (locator.length === 0) locator = tst.locator.slice();else {
                    for (var i = 0; i < locator.length; i++) {
                      if (tst.locator[i] && locator[i].toString().indexOf(tst.locator[i]) === -1) {
                        locator[i] += "," + tst.locator[i];
                      }
                    }
                  }
                }
              });
            }
          }

          return locator;
        }

        if (pos > -1) {
          if (ndxIntlzr === undefined) {
            var previousPos = pos - 1,
                test;

            while ((test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) === undefined && previousPos > -1) {
              previousPos--;
            }

            if (test !== undefined && previousPos > -1) {
              ndxInitializer = mergeLocators(previousPos, test);
              cacheDependency = ndxInitializer.join("");
              testPos = previousPos;
            }
          }

          if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) {
            return getMaskSet().tests[pos];
          }

          for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
            var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);

            if (match && testPos === pos || testPos > pos) {
              break;
            }
          }
        }

        if (matches.length === 0 || insertStop) {
          matches.push({
            match: {
              fn: null,
              optionality: false,
              casing: null,
              def: "",
              placeholder: ""
            },
            locator: [],
            mloc: {},
            cd: cacheDependency
          });
        }

        if (ndxIntlzr !== undefined && getMaskSet().tests[pos]) {
          return $.extend(true, [], matches);
        }

        getMaskSet().tests[pos] = $.extend(true, [], matches);
        return getMaskSet().tests[pos];
      }

      function getBufferTemplate() {
        if (getMaskSet()._buffer === undefined) {
          getMaskSet()._buffer = getMaskTemplate(false, 1);
          if (getMaskSet().buffer === undefined) getMaskSet().buffer = getMaskSet()._buffer.slice();
        }

        return getMaskSet()._buffer;
      }

      function getBuffer(noCache) {
        if (getMaskSet().buffer === undefined || noCache === true) {
          getMaskSet().buffer = getMaskTemplate(true, getLastValidPosition(), true);
          if (getMaskSet()._buffer === undefined) getMaskSet()._buffer = getMaskSet().buffer.slice();
        }

        return getMaskSet().buffer;
      }

      function refreshFromBuffer(start, end, buffer) {
        var i, p;

        if (start === true) {
          resetMaskSet();
          start = 0;
          end = buffer.length;
        } else {
          for (i = start; i < end; i++) {
            delete getMaskSet().validPositions[i];
          }
        }

        p = start;

        for (i = start; i < end; i++) {
          resetMaskSet(true);

          if (buffer[i] !== opts.skipOptionalPartCharacter) {
            var valResult = isValid(p, buffer[i], true, true);

            if (valResult !== false) {
              resetMaskSet(true);
              p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1;
            }
          }
        }
      }

      function casing(elem, test, pos) {
        switch (opts.casing || test.casing) {
          case "upper":
            elem = elem.toUpperCase();
            break;

          case "lower":
            elem = elem.toLowerCase();
            break;

          case "title":
            var posBefore = getMaskSet().validPositions[pos - 1];

            if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE)) {
              elem = elem.toUpperCase();
            } else {
              elem = elem.toLowerCase();
            }

            break;

          default:
            if ($.isFunction(opts.casing)) {
              var args = Array.prototype.slice.call(arguments);
              args.push(getMaskSet().validPositions);
              elem = opts.casing.apply(this, args);
            }

        }

        return elem;
      }

      function checkAlternationMatch(altArr1, altArr2, na) {
        var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
            isMatch = false,
            naArr = na !== undefined ? na.split(",") : [],
            naNdx;

        for (var i = 0; i < naArr.length; i++) {
          if ((naNdx = altArr1.indexOf(naArr[i])) !== -1) {
            altArr1.splice(naNdx, 1);
          }
        }

        for (var alndx = 0; alndx < altArr1.length; alndx++) {
          if ($.inArray(altArr1[alndx], altArrC) !== -1) {
            isMatch = true;
            break;
          }
        }

        return isMatch;
      }

      function alternate(pos, c, strict, fromSetValid, rAltPos) {
        var validPsClone = $.extend(true, {}, getMaskSet().validPositions),
            lastAlt,
            alternation,
            isValidRslt = false,
            altPos,
            prevAltPos,
            i,
            validPos,
            decisionPos,
            lAltPos = rAltPos !== undefined ? rAltPos : getLastValidPosition();

        if (lAltPos === -1 && rAltPos === undefined) {
          lastAlt = 0;
          prevAltPos = getTest(lastAlt);
          alternation = prevAltPos.alternation;
        } else {
          for (; lAltPos >= 0; lAltPos--) {
            altPos = getMaskSet().validPositions[lAltPos];

            if (altPos && altPos.alternation !== undefined) {
              if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
                break;
              }

              lastAlt = lAltPos;
              alternation = getMaskSet().validPositions[lastAlt].alternation;
              prevAltPos = altPos;
            }
          }
        }

        if (alternation !== undefined) {
          decisionPos = parseInt(lastAlt);
          getMaskSet().excludes[decisionPos] = getMaskSet().excludes[decisionPos] || [];

          if (pos !== true) {
            getMaskSet().excludes[decisionPos].push(getDecisionTaker(prevAltPos));
          }

          var validInputsClone = [],
              staticInputsBeforePos = 0;

          for (i = decisionPos; i < getLastValidPosition(undefined, true) + 1; i++) {
            validPos = getMaskSet().validPositions[i];

            if (validPos && validPos.generatedInput !== true) {
              validInputsClone.push(validPos.input);
            } else if (i < pos) staticInputsBeforePos++;

            delete getMaskSet().validPositions[i];
          }

          while (getMaskSet().excludes[decisionPos] && getMaskSet().excludes[decisionPos].length < 10) {
            var posOffset = staticInputsBeforePos * -1,
                validInputs = validInputsClone.slice();
            getMaskSet().tests[decisionPos] = undefined;
            resetMaskSet(true);
            isValidRslt = true;

            while (validInputs.length > 0) {
              var input = validInputs.shift();

              if (!(isValidRslt = isValid(getLastValidPosition(undefined, true) + 1, input, false, fromSetValid, true))) {
                break;
              }
            }

            if (isValidRslt && c !== undefined) {
              var targetLvp = getLastValidPosition(pos) + 1;

              for (i = decisionPos; i < getLastValidPosition() + 1; i++) {
                validPos = getMaskSet().validPositions[i];

                if ((validPos === undefined || validPos.match.fn == null) && i < pos + posOffset) {
                  posOffset++;
                }
              }

              pos = pos + posOffset;
              isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid, true);
            }

            if (!isValidRslt) {
              resetMaskSet();
              prevAltPos = getTest(decisionPos);
              getMaskSet().validPositions = $.extend(true, {}, validPsClone);

              if (getMaskSet().excludes[decisionPos]) {
                var decisionTaker = getDecisionTaker(prevAltPos);

                if (getMaskSet().excludes[decisionPos].indexOf(decisionTaker) !== -1) {
                  isValidRslt = alternate(pos, c, strict, fromSetValid, decisionPos - 1);
                  break;
                }

                getMaskSet().excludes[decisionPos].push(decisionTaker);

                for (i = decisionPos; i < getLastValidPosition(undefined, true) + 1; i++) {
                  delete getMaskSet().validPositions[i];
                }
              } else {
                isValidRslt = alternate(pos, c, strict, fromSetValid, decisionPos - 1);
                break;
              }
            } else break;
          }
        }

        getMaskSet().excludes[decisionPos] = undefined;
        return isValidRslt;
      }

      function isValid(pos, c, strict, fromSetValid, fromAlternate, validateOnly) {
        function isSelection(posObj) {
          return isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end === 1 : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin === 1;
        }

        strict = strict === true;
        var maskPos = pos;

        if (pos.begin !== undefined) {
          maskPos = isRTL ? pos.end : pos.begin;
        }

        function _isValid(position, c, strict) {
          var rslt = false;
          $.each(getTests(position), function (ndx, tst) {
            var test = tst.match;
            getBuffer(true);
            rslt = test.fn != null ? test.fn.test(c, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" ? {
              c: getPlaceholder(position, test, true) || test.def,
              pos: position
            } : false;

            if (rslt !== false) {
              var elem = rslt.c !== undefined ? rslt.c : c,
                  validatedPos = position;
              elem = elem === opts.skipOptionalPartCharacter && test.fn === null ? getPlaceholder(position, test, true) || test.def : elem;

              if (rslt.remove !== undefined) {
                if (!$.isArray(rslt.remove)) rslt.remove = [rslt.remove];
                $.each(rslt.remove.sort(function (a, b) {
                  return b - a;
                }), function (ndx, lmnt) {
                  revalidateMask({
                    begin: lmnt,
                    end: lmnt + 1
                  });
                });
              }

              if (rslt.insert !== undefined) {
                if (!$.isArray(rslt.insert)) rslt.insert = [rslt.insert];
                $.each(rslt.insert.sort(function (a, b) {
                  return a - b;
                }), function (ndx, lmnt) {
                  isValid(lmnt.pos, lmnt.c, true, fromSetValid);
                });
              }

              if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) {
                validatedPos = rslt.pos;
              }

              if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
                return false;
              }

              if (!revalidateMask(pos, $.extend({}, tst, {
                input: casing(elem, test, validatedPos)
              }), fromSetValid, validatedPos)) {
                rslt = false;
              }

              return false;
            }
          });
          return rslt;
        }

        var result = true,
            positionsClone = $.extend(true, {}, getMaskSet().validPositions);

        if ($.isFunction(opts.preValidation) && !strict && fromSetValid !== true && validateOnly !== true) {
          result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts, getMaskSet());
        }

        if (result === true) {
          trackbackPositions(undefined, maskPos, true);

          if (maxLength === undefined || maskPos < maxLength) {
            result = _isValid(maskPos, c, strict);

            if ((!strict || fromSetValid === true) && result === false && validateOnly !== true) {
              var currentPosValid = getMaskSet().validPositions[maskPos];

              if (currentPosValid && currentPosValid.match.fn === null && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
                result = {
                  caret: seekNext(maskPos)
                };
              } else {
                if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined) && (!isMask(maskPos, true) || getMaskSet().jitOffset[maskPos])) {
                  if (getMaskSet().jitOffset[maskPos] && getMaskSet().validPositions[seekNext(maskPos)] === undefined) {
                    result = isValid(maskPos + getMaskSet().jitOffset[maskPos], c, strict);
                    if (result !== false) result.caret = maskPos;
                  } else for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) {
                    result = _isValid(nPos, c, strict);

                    if (result !== false) {
                      result = trackbackPositions(maskPos, result.pos !== undefined ? result.pos : nPos) || result;
                      maskPos = nPos;
                      break;
                    }
                  }
                }
              }
            }
          }

          if (result === false && opts.keepStatic !== false && (opts.regex == null || isComplete(getBuffer())) && !strict && fromAlternate !== true) {
            result = alternate(maskPos, c, strict, fromSetValid);
          }

          if (result === true) {
            result = {
              pos: maskPos
            };
          }
        }

        if ($.isFunction(opts.postValidation) && result !== false && !strict && fromSetValid !== true && validateOnly !== true) {
          var postResult = opts.postValidation(getBuffer(true), pos.begin !== undefined ? isRTL ? pos.end : pos.begin : pos, result, opts);

          if (postResult !== undefined) {
            if (postResult.refreshFromBuffer && postResult.buffer) {
              var refresh = postResult.refreshFromBuffer;
              refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, postResult.buffer);
            }

            result = postResult === true ? result : postResult;
          }
        }

        if (result && result.pos === undefined) {
          result.pos = maskPos;
        }

        if (result === false || validateOnly === true) {
          resetMaskSet(true);
          getMaskSet().validPositions = $.extend(true, {}, positionsClone);
        }

        return result;
      }

      function trackbackPositions(originalPos, newPos, fillOnly) {
        var result;

        if (originalPos === undefined) {
          for (originalPos = newPos - 1; originalPos > 0; originalPos--) {
            if (getMaskSet().validPositions[originalPos]) break;
          }
        }

        for (var ps = originalPos; ps < newPos; ps++) {
          if (getMaskSet().validPositions[ps] === undefined && !isMask(ps, true)) {
            var vp = ps == 0 ? getTest(ps) : getMaskSet().validPositions[ps - 1];

            if (vp) {
              var tests = getTests(ps).slice();
              if (tests[tests.length - 1].match.def === "") tests.pop();
              var bestMatch = determineTestTemplate(ps, tests);
              bestMatch = $.extend({}, bestMatch, {
                input: getPlaceholder(ps, bestMatch.match, true) || bestMatch.match.def
              });
              bestMatch.generatedInput = true;
              revalidateMask(ps, bestMatch, true);

              if (fillOnly !== true) {
                var cvpInput = getMaskSet().validPositions[newPos].input;
                getMaskSet().validPositions[newPos] = undefined;
                result = isValid(newPos, cvpInput, true, true);
              }
            }
          }
        }

        return result;
      }

      function revalidateMask(pos, validTest, fromSetValid, validatedPos) {
        function IsEnclosedStatic(pos, valids, selection) {
          var posMatch = valids[pos];

          if (posMatch !== undefined && (posMatch.match.fn === null && posMatch.match.optionality !== true || posMatch.input === opts.radixPoint)) {
            var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && valids[pos - 1].match.fn === null && valids[pos - 1] : valids[pos - 1],
                nextMatch = selection.end > pos + 1 ? valids[pos + 1] && valids[pos + 1].match.fn === null && valids[pos + 1] : valids[pos + 1];
            return prevMatch && nextMatch;
          }

          return false;
        }

        var begin = pos.begin !== undefined ? pos.begin : pos,
            end = pos.end !== undefined ? pos.end : pos;

        if (pos.begin > pos.end) {
          begin = pos.end;
          end = pos.begin;
        }

        validatedPos = validatedPos !== undefined ? validatedPos : begin;

        if (begin !== end || opts.insertMode && getMaskSet().validPositions[validatedPos] !== undefined && fromSetValid === undefined) {
          var positionsClone = $.extend(true, {}, getMaskSet().validPositions),
              lvp = getLastValidPosition(undefined, true),
              i;
          getMaskSet().p = begin;

          for (i = lvp; i >= begin; i--) {
            if (getMaskSet().validPositions[i] && getMaskSet().validPositions[i].match.nativeDef === "+") {
              opts.isNegative = false;
            }

            delete getMaskSet().validPositions[i];
          }

          var valid = true,
              j = validatedPos,
              vps = getMaskSet().validPositions,
              needsValidation = false,
              posMatch = j,
              i = j;

          if (validTest) {
            getMaskSet().validPositions[validatedPos] = $.extend(true, {}, validTest);
            posMatch++;
            j++;
            if (begin < end) i++;
          }

          for (; i <= lvp; i++) {
            var t = positionsClone[i];

            if (t !== undefined && (i >= end || i >= begin && t.generatedInput !== true && IsEnclosedStatic(i, positionsClone, {
              begin: begin,
              end: end
            }))) {
              while (getTest(posMatch).match.def !== "") {
                if (needsValidation === false && positionsClone[posMatch] && positionsClone[posMatch].match.nativeDef === t.match.nativeDef) {
                  getMaskSet().validPositions[posMatch] = $.extend(true, {}, positionsClone[posMatch]);
                  getMaskSet().validPositions[posMatch].input = t.input;
                  trackbackPositions(undefined, posMatch, true);
                  j = posMatch + 1;
                  valid = true;
                } else if (opts.shiftPositions && positionCanMatchDefinition(posMatch, t.match.def)) {
                  var result = isValid(posMatch, t.input, true, true);
                  valid = result !== false;
                  j = result.caret || result.insert ? getLastValidPosition() : posMatch + 1;
                  needsValidation = true;
                } else {
                  valid = t.generatedInput === true || t.input === opts.radixPoint && opts.numericInput === true;
                }

                if (valid) break;

                if (!valid && posMatch > end && isMask(posMatch, true) && (t.match.fn !== null || posMatch > getMaskSet().maskLength)) {
                  break;
                }

                posMatch++;
              }

              if (getTest(posMatch).match.def == "") valid = false;
              posMatch = j;
            }

            if (!valid) break;
          }

          if (!valid) {
            getMaskSet().validPositions = $.extend(true, {}, positionsClone);
            resetMaskSet(true);
            return false;
          }
        } else if (validTest) {
          getMaskSet().validPositions[validatedPos] = $.extend(true, {}, validTest);
        }

        resetMaskSet(true);
        return true;
      }

      function isMask(pos, strict) {
        var test = getTestTemplate(pos).match;
        if (test.def === "") test = getTest(pos).match;

        if (test.fn != null) {
          return test.fn;
        }

        if (strict !== true && pos > -1) {
          var tests = getTests(pos);
          return tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0);
        }

        return false;
      }

      function seekNext(pos, newBlock) {
        var position = pos + 1;

        while (getTest(position).match.def !== "" && (newBlock === true && (getTest(position).match.newBlockMarker !== true || !isMask(position)) || newBlock !== true && !isMask(position))) {
          position++;
        }

        return position;
      }

      function seekPrevious(pos, newBlock) {
        var position = pos,
            tests;
        if (position <= 0) return 0;

        while (--position > 0 && (newBlock === true && getTest(position).match.newBlockMarker !== true || newBlock !== true && !isMask(position) && (tests = getTests(position), tests.length < 2 || tests.length === 2 && tests[1].match.def === ""))) {}

        return position;
      }

      function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
        if (event && $.isFunction(opts.onBeforeWrite)) {
          var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);

          if (result) {
            if (result.refreshFromBuffer) {
              var refresh = result.refreshFromBuffer;
              refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
              buffer = getBuffer(true);
            }

            if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
          }
        }

        if (input !== undefined) {
          input.inputmask._valueSet(buffer.join(""));

          if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
            caret(input, caretPos);
          } else renderColorMask(input, caretPos, buffer.length === 0);

          if (triggerEvents === true) {
            var $input = $(input),
                nptVal = input.inputmask._valueGet();

            skipInputEvent = true;
            $input.trigger("input");
            setTimeout(function () {
              if (nptVal === getBufferTemplate().join("")) {
                $input.trigger("cleared");
              } else if (isComplete(buffer) === true) {
                $input.trigger("complete");
              }
            }, 0);
          }
        }
      }

      function getPlaceholder(pos, test, returnPL) {
        test = test || getTest(pos).match;

        if (test.placeholder !== undefined || returnPL === true) {
          return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
        } else if (test.fn === null) {
          if (pos > -1 && getMaskSet().validPositions[pos] === undefined) {
            var tests = getTests(pos),
                staticAlternations = [],
                prevTest;

            if (tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
              for (var i = 0; i < tests.length; i++) {
                if (tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true && (tests[i].match.fn === null || prevTest === undefined || tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, true, opts) !== false)) {
                  staticAlternations.push(tests[i]);
                  if (tests[i].match.fn === null) prevTest = tests[i];

                  if (staticAlternations.length > 1) {
                    if (/[0-9a-bA-Z]/.test(staticAlternations[0].match.def)) {
                      return opts.placeholder.charAt(pos % opts.placeholder.length);
                    }
                  }
                }
              }
            }
          }

          return test.def;
        }

        return opts.placeholder.charAt(pos % opts.placeholder.length);
      }

      function HandleNativePlaceholder(npt, value) {
        if (ie) {
          if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || npt.placeholder === "")) {
            var buffer = getBuffer().slice(),
                nptValue = npt.inputmask._valueGet();

            if (nptValue !== value) {
              var lvp = getLastValidPosition();

              if (lvp === -1 && nptValue === getBufferTemplate().join("")) {
                buffer = [];
              } else if (lvp !== -1) {
                clearOptionalTail(buffer);
              }

              writeBuffer(npt, buffer);
            }
          }
        } else if (npt.placeholder !== value) {
          npt.placeholder = value;
          if (npt.placeholder === "") npt.removeAttribute("placeholder");
        }
      }

      var EventRuler = {
        on: function on(input, eventName, eventHandler) {
          var ev = function ev(e) {
            var that = this;

            if (that.inputmask === undefined && this.nodeName !== "FORM") {
              var imOpts = $.data(that, "_inputmask_opts");
              if (imOpts) new Inputmask(imOpts).mask(that);else EventRuler.off(that);
            } else if (e.type !== "setvalue" && this.nodeName !== "FORM" && (that.disabled || that.readOnly && !(e.type === "keydown" && e.ctrlKey && e.keyCode === 67 || opts.tabThrough === false && e.keyCode === Inputmask.keyCode.TAB))) {
              e.preventDefault();
            } else {
              switch (e.type) {
                case "input":
                  if (skipInputEvent === true) {
                    skipInputEvent = false;
                    return e.preventDefault();
                  }

                  if (mobile) {
                    var args = arguments;
                    setTimeout(function () {
                      eventHandler.apply(that, args);
                      caret(that, that.inputmask.caretPos, undefined, true);
                    }, 0);
                    return false;
                  }

                  break;

                case "keydown":
                  skipKeyPressEvent = false;
                  skipInputEvent = false;
                  break;

                case "keypress":
                  if (skipKeyPressEvent === true) {
                    return e.preventDefault();
                  }

                  skipKeyPressEvent = true;
                  break;

                case "click":
                  if (iemobile || iphone) {
                    var args = arguments;
                    setTimeout(function () {
                      eventHandler.apply(that, args);
                    }, 0);
                    return false;
                  }

                  break;
              }

              var returnVal = eventHandler.apply(that, arguments);

              if (returnVal === false) {
                e.preventDefault();
                e.stopPropagation();
              }

              return returnVal;
            }
          };

          input.inputmask.events[eventName] = input.inputmask.events[eventName] || [];
          input.inputmask.events[eventName].push(ev);

          if ($.inArray(eventName, ["submit", "reset"]) !== -1) {
            if (input.form !== null) $(input.form).on(eventName, ev);
          } else {
            $(input).on(eventName, ev);
          }
        },
        off: function off(input, event) {
          if (input.inputmask && input.inputmask.events) {
            var events;

            if (event) {
              events = [];
              events[event] = input.inputmask.events[event];
            } else {
              events = input.inputmask.events;
            }

            $.each(events, function (eventName, evArr) {
              while (evArr.length > 0) {
                var ev = evArr.pop();

                if ($.inArray(eventName, ["submit", "reset"]) !== -1) {
                  if (input.form !== null) $(input.form).off(eventName, ev);
                } else {
                  $(input).off(eventName, ev);
                }
              }

              delete input.inputmask.events[eventName];
            });
          }
        }
      };
      var EventHandlers = {
        keydownEvent: function keydownEvent(e) {
          var input = this,
              $input = $(input),
              k = e.keyCode,
              pos = caret(input);

          if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !isInputEventSupported("cut")) {
            e.preventDefault();
            handleRemove(input, k, pos);
            writeBuffer(input, getBuffer(true), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join(""));
          } else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
            e.preventDefault();
            var caretPos = seekNext(getLastValidPosition());
            caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
          } else if (k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP) {
            e.preventDefault();
            caret(input, 0, e.shiftKey ? pos.begin : 0, true);
          } else if ((opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || k === 90 && e.ctrlKey) && e.altKey !== true) {
            checkVal(input, true, false, undoValue.split(""));
            $input.trigger("click");
          } else if (k === Inputmask.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) {
            opts.insertMode = !opts.insertMode;
            input.setAttribute("im-insert", opts.insertMode);
          } else if (opts.tabThrough === true && k === Inputmask.keyCode.TAB) {
            if (e.shiftKey === true) {
              if (getTest(pos.begin).match.fn === null) {
                pos.begin = seekNext(pos.begin);
              }

              pos.end = seekPrevious(pos.begin, true);
              pos.begin = seekPrevious(pos.end, true);
            } else {
              pos.begin = seekNext(pos.begin, true);
              pos.end = seekNext(pos.begin, true);
              if (pos.end < getMaskSet().maskLength) pos.end--;
            }

            if (pos.begin < getMaskSet().maskLength) {
              e.preventDefault();
              caret(input, pos.begin, pos.end);
            }
          }

          opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts);
          ignorable = $.inArray(k, opts.ignorables) !== -1;
        },
        keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
          var input = this,
              $input = $(input),
              k = e.which || e.charCode || e.keyCode;

          if (checkval !== true && !(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) {
            if (k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("")) {
              undoValue = getBuffer().join("");
              setTimeout(function () {
                $input.trigger("change");
              }, 0);
            }

            return true;
          } else {
            if (k) {
              if (k === 46 && e.shiftKey === false && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
              var pos = checkval ? {
                begin: ndx,
                end: ndx
              } : caret(input),
                  forwardPosition,
                  c = String.fromCharCode(k),
                  offset = 0;

              if (opts._radixDance && opts.numericInput) {
                var caretPos = getBuffer().indexOf(opts.radixPoint.charAt(0)) + 1;

                if (pos.begin <= caretPos) {
                  if (k === opts.radixPoint.charCodeAt(0)) offset = 1;
                  pos.begin -= 1;
                  pos.end -= 1;
                }
              }

              getMaskSet().writeOutBuffer = true;
              var valResult = isValid(pos, c, strict);

              if (valResult !== false) {
                resetMaskSet(true);
                forwardPosition = valResult.caret !== undefined ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos);
                getMaskSet().p = forwardPosition;
              }

              forwardPosition = (opts.numericInput && valResult.caret === undefined ? seekPrevious(forwardPosition) : forwardPosition) + offset;

              if (writeOut !== false) {
                setTimeout(function () {
                  opts.onKeyValidation.call(input, k, valResult, opts);
                }, 0);

                if (getMaskSet().writeOutBuffer && valResult !== false) {
                  var buffer = getBuffer();
                  writeBuffer(input, buffer, forwardPosition, e, checkval !== true);
                }
              }

              e.preventDefault();

              if (checkval) {
                if (valResult !== false) valResult.forwardPosition = forwardPosition;
                return valResult;
              }
            }
          }
        },
        pasteEvent: function pasteEvent(e) {
          var input = this,
              ev = e.originalEvent || e,
              $input = $(input),
              inputValue = input.inputmask._valueGet(true),
              caretPos = caret(input),
              tempValue;

          if (isRTL) {
            tempValue = caretPos.end;
            caretPos.end = caretPos.begin;
            caretPos.begin = tempValue;
          }

          var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
              valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
          if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
          if (valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("")) valueAfterCaret = "";

          if (window.clipboardData && window.clipboardData.getData) {
            inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
          } else if (ev.clipboardData && ev.clipboardData.getData) {
            inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret;
          } else return true;

          var pasteValue = inputValue;

          if ($.isFunction(opts.onBeforePaste)) {
            pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts);

            if (pasteValue === false) {
              return e.preventDefault();
            }

            if (!pasteValue) {
              pasteValue = inputValue;
            }
          }

          checkVal(input, false, false, pasteValue.toString().split(""));
          writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join(""));
          return e.preventDefault();
        },
        inputFallBackEvent: function inputFallBackEvent(e) {
          function radixPointHandler(input, inputValue, caretPos) {
            if (inputValue.charAt(caretPos.begin - 1) === "." && opts.radixPoint !== "") {
              inputValue = inputValue.split("");
              inputValue[caretPos.begin - 1] = opts.radixPoint.charAt(0);
              inputValue = inputValue.join("");
            }

            return inputValue;
          }

          function ieMobileHandler(input, inputValue, caretPos) {
            if (iemobile) {
              var inputChar = inputValue.replace(getBuffer().join(""), "");

              if (inputChar.length === 1) {
                var iv = inputValue.split("");
                iv.splice(caretPos.begin, 0, inputChar);
                inputValue = iv.join("");
              }
            }

            return inputValue;
          }

          var input = this,
              inputValue = input.inputmask._valueGet();

          if (getBuffer().join("") !== inputValue) {
            var caretPos = caret(input);
            inputValue = radixPointHandler(input, inputValue, caretPos);
            inputValue = ieMobileHandler(input, inputValue, caretPos);

            if (getBuffer().join("") !== inputValue) {
              var buffer = getBuffer().join(""),
                  offset = !opts.numericInput && inputValue.length > buffer.length ? -1 : 0,
                  frontPart = inputValue.substr(0, caretPos.begin),
                  backPart = inputValue.substr(caretPos.begin),
                  frontBufferPart = buffer.substr(0, caretPos.begin + offset),
                  backBufferPart = buffer.substr(caretPos.begin + offset);
              var selection = caretPos,
                  entries = "",
                  isEntry = false;

              if (frontPart !== frontBufferPart) {
                var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length,
                    i;

                for (i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) {}

                if (isEntry) {
                  selection.begin = i - offset;
                  entries += frontPart.slice(i, selection.end);
                }
              }

              if (backPart !== backBufferPart) {
                if (backPart.length > backBufferPart.length) {
                  entries += backPart.slice(0, 1);
                } else {
                  if (backPart.length < backBufferPart.length) {
                    selection.end += backBufferPart.length - backPart.length;

                    if (!isEntry && opts.radixPoint !== "" && backPart === "" && frontPart.charAt(selection.begin + offset - 1) === opts.radixPoint) {
                      selection.begin--;
                      entries = opts.radixPoint;
                    }
                  }
                }
              }

              writeBuffer(input, getBuffer(), {
                begin: selection.begin + offset,
                end: selection.end + offset
              });

              if (entries.length > 0) {
                $.each(entries.split(""), function (ndx, entry) {
                  var keypress = new $.Event("keypress");
                  keypress.which = entry.charCodeAt(0);
                  ignorable = false;
                  EventHandlers.keypressEvent.call(input, keypress);
                });
              } else {
                if (selection.begin === selection.end - 1) {
                  selection.begin = seekPrevious(selection.begin + 1);

                  if (selection.begin === selection.end - 1) {
                    caret(input, selection.begin);
                  } else {
                    caret(input, selection.begin, selection.end);
                  }
                }

                var keydown = new $.Event("keydown");
                keydown.keyCode = opts.numericInput ? Inputmask.keyCode.BACKSPACE : Inputmask.keyCode.DELETE;
                EventHandlers.keydownEvent.call(input, keydown);
              }

              e.preventDefault();
            }
          }
        },
        beforeInputEvent: function beforeInputEvent(e) {
          if (e.cancelable) {
            var input = this;

            switch (e.inputType) {
              case "insertText":
                $.each(e.data.split(""), function (ndx, entry) {
                  var keypress = new $.Event("keypress");
                  keypress.which = entry.charCodeAt(0);
                  ignorable = false;
                  EventHandlers.keypressEvent.call(input, keypress);
                });
                return e.preventDefault();

              case "deleteContentBackward":
                var keydown = new $.Event("keydown");
                keydown.keyCode = Inputmask.keyCode.BACKSPACE;
                EventHandlers.keydownEvent.call(input, keydown);
                return e.preventDefault();

              case "deleteContentForward":
                var keydown = new $.Event("keydown");
                keydown.keyCode = Inputmask.keyCode.DELETE;
                EventHandlers.keydownEvent.call(input, keydown);
                return e.preventDefault();
            }
          }
        },
        setValueEvent: function setValueEvent(e) {
          this.inputmask.refreshValue = false;

          var input = this,
              value = e && e.detail ? e.detail[0] : arguments[1],
              value = value || input.inputmask._valueGet(true);

          if ($.isFunction(opts.onBeforeMask)) value = opts.onBeforeMask.call(inputmask, value, opts) || value;
          value = value.split("");
          checkVal(input, true, false, value);
          undoValue = getBuffer().join("");

          if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("")) {
            input.inputmask._valueSet("");
          }
        },
        focusEvent: function focusEvent(e) {
          var input = this,
              nptValue = input.inputmask._valueGet();

          if (opts.showMaskOnFocus) {
            if (nptValue !== getBuffer().join("")) {
              writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()));
            } else if (mouseEnter === false) {
              caret(input, seekNext(getLastValidPosition()));
            }
          }

          if (opts.positionCaretOnTab === true && mouseEnter === false) {
            EventHandlers.clickEvent.apply(input, [e, true]);
          }

          undoValue = getBuffer().join("");
        },
        mouseleaveEvent: function mouseleaveEvent(e) {
          var input = this;
          mouseEnter = false;

          if (opts.clearMaskOnLostFocus && document.activeElement !== input) {
            HandleNativePlaceholder(input, originalPlaceholder);
          }
        },
        clickEvent: function clickEvent(e, tabbed) {
          function doRadixFocus(clickPos) {
            if (opts.radixPoint !== "") {
              var vps = getMaskSet().validPositions;

              if (vps[clickPos] === undefined || vps[clickPos].input === getPlaceholder(clickPos)) {
                if (clickPos < seekNext(-1)) return true;
                var radixPos = $.inArray(opts.radixPoint, getBuffer());

                if (radixPos !== -1) {
                  for (var vp in vps) {
                    if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) {
                      return false;
                    }
                  }

                  return true;
                }
              }
            }

            return false;
          }

          var input = this;
          setTimeout(function () {
            if (document.activeElement === input) {
              var selectedCaret = caret(input);

              if (tabbed) {
                if (isRTL) {
                  selectedCaret.end = selectedCaret.begin;
                } else {
                  selectedCaret.begin = selectedCaret.end;
                }
              }

              if (selectedCaret.begin === selectedCaret.end) {
                switch (opts.positionCaretOnClick) {
                  case "none":
                    break;

                  case "select":
                    caret(input, 0, getBuffer().length);
                    break;

                  case "ignore":
                    caret(input, seekNext(getLastValidPosition()));
                    break;

                  case "radixFocus":
                    if (doRadixFocus(selectedCaret.begin)) {
                      var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                      caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
                      break;
                    }

                  default:
                    var clickPosition = selectedCaret.begin,
                        lvclickPosition = getLastValidPosition(clickPosition, true),
                        lastPosition = seekNext(lvclickPosition);

                    if (clickPosition < lastPosition) {
                      caret(input, !isMask(clickPosition, true) && !isMask(clickPosition - 1, true) ? seekNext(clickPosition) : clickPosition);
                    } else {
                      var lvp = getMaskSet().validPositions[lvclickPosition],
                          tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp),
                          placeholder = getPlaceholder(lastPosition, tt.match);

                      if (placeholder !== "" && getBuffer()[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true || !isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
                        var newPos = seekNext(lastPosition);

                        if (clickPosition >= newPos || clickPosition === lastPosition) {
                          lastPosition = newPos;
                        }
                      }

                      caret(input, lastPosition);
                    }

                    break;
                }
              }
            }
          }, 0);
        },
        cutEvent: function cutEvent(e) {
          var input = this,
              $input = $(input),
              pos = caret(input),
              ev = e.originalEvent || e;
          var clipboardData = window.clipboardData || ev.clipboardData,
              clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
          clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join(""));
          if (document.execCommand) document.execCommand("copy");
          handleRemove(input, Inputmask.keyCode.DELETE, pos);
          writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join(""));
        },
        blurEvent: function blurEvent(e) {
          var $input = $(this),
              input = this;

          if (input.inputmask) {
            HandleNativePlaceholder(input, originalPlaceholder);

            var nptValue = input.inputmask._valueGet(),
                buffer = getBuffer().slice();

            if (nptValue !== "" || colorMask !== undefined) {
              if (opts.clearMaskOnLostFocus) {
                if (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("")) {
                  buffer = [];
                } else {
                  clearOptionalTail(buffer);
                }
              }

              if (isComplete(buffer) === false) {
                setTimeout(function () {
                  $input.trigger("incomplete");
                }, 0);

                if (opts.clearIncomplete) {
                  resetMaskSet();

                  if (opts.clearMaskOnLostFocus) {
                    buffer = [];
                  } else {
                    buffer = getBufferTemplate().slice();
                  }
                }
              }

              writeBuffer(input, buffer, undefined, e);
            }

            if (undoValue !== getBuffer().join("")) {
              undoValue = buffer.join("");
              $input.trigger("change");
            }
          }
        },
        mouseenterEvent: function mouseenterEvent(e) {
          var input = this;
          mouseEnter = true;

          if (document.activeElement !== input && opts.showMaskOnHover) {
            HandleNativePlaceholder(input, (isRTL ? getBuffer().slice().reverse() : getBuffer()).join(""));
          }
        },
        submitEvent: function submitEvent(e) {
          if (undoValue !== getBuffer().join("")) {
            $el.trigger("change");
          }

          if (opts.clearMaskOnLostFocus && getLastValidPosition() === -1 && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("")) {
            el.inputmask._valueSet("");
          }

          if (opts.clearIncomplete && isComplete(getBuffer()) === false) {
            el.inputmask._valueSet("");
          }

          if (opts.removeMaskOnSubmit) {
            el.inputmask._valueSet(el.inputmask.unmaskedvalue(), true);

            setTimeout(function () {
              writeBuffer(el, getBuffer());
            }, 0);
          }
        },
        resetEvent: function resetEvent(e) {
          el.inputmask.refreshValue = true;
          setTimeout(function () {
            $el.trigger("setvalue");
          }, 0);
        }
      };

      function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
        var inputmask = this || input.inputmask,
            inputValue = nptvl.slice(),
            charCodes = "",
            initialNdx = -1,
            result = undefined;

        function isTemplateMatch(ndx, charCodes) {
          var charCodeNdx = getMaskTemplate(true, 0, false).slice(ndx, seekNext(ndx)).join("").replace(/'/g, "").indexOf(charCodes);
          return charCodeNdx !== -1 && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || getTest(ndx).match.fn === null && getTest(ndx).match.nativeDef === "'" + charCodes.charAt(0) || getTest(ndx).match.nativeDef === " " && (getTest(ndx + 1).match.nativeDef === charCodes.charAt(0) || getTest(ndx + 1).match.fn === null && getTest(ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
        }

        resetMaskSet();

        if (!strict && opts.autoUnmask !== true) {
          var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""),
              matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));

          if (matches && matches.length > 0) {
            inputValue.splice(0, matches.length * staticInput.length);
            initialNdx = seekNext(initialNdx);
          }
        } else {
          initialNdx = seekNext(initialNdx);
        }

        if (initialNdx === -1) {
          getMaskSet().p = seekNext(initialNdx);
          initialNdx = 0;
        } else getMaskSet().p = initialNdx;

        inputmask.caretPos = {
          begin: initialNdx
        };
        $.each(inputValue, function (ndx, charCode) {
          if (charCode !== undefined) {
            if (getMaskSet().validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, true) && isValid(ndx, inputValue[ndx], true, undefined, undefined, true) === false) {
              getMaskSet().p++;
            } else {
              var keypress = new $.Event("_checkval");
              keypress.which = charCode.charCodeAt(0);
              charCodes += charCode;
              var lvp = getLastValidPosition(undefined, true);

              if (!isTemplateMatch(initialNdx, charCodes)) {
                result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, inputmask.caretPos.begin);

                if (result) {
                  initialNdx = inputmask.caretPos.begin + 1;
                  charCodes = "";
                }
              } else {
                result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, lvp + 1);
              }

              if (result) {
                writeBuffer(undefined, getBuffer(), result.forwardPosition, keypress, false);
                inputmask.caretPos = {
                  begin: result.forwardPosition,
                  end: result.forwardPosition
                };
              }
            }
          }
        });
        if (writeOut) writeBuffer(input, getBuffer(), result ? result.forwardPosition : undefined, initiatingEvent || new $.Event("checkval"), initiatingEvent && initiatingEvent.type === "input");
      }

      function unmaskedvalue(input) {
        if (input) {
          if (input.inputmask === undefined) {
            return input.value;
          }

          if (input.inputmask && input.inputmask.refreshValue) {
            EventHandlers.setValueEvent.call(input);
          }
        }

        var umValue = [],
            vps = getMaskSet().validPositions;

        for (var pndx in vps) {
          if (vps[pndx].match && vps[pndx].match.fn != null) {
            umValue.push(vps[pndx].input);
          }
        }

        var unmaskedValue = umValue.length === 0 ? "" : (isRTL ? umValue.reverse() : umValue).join("");

        if ($.isFunction(opts.onUnMask)) {
          var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
          unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
        }

        return unmaskedValue;
      }

      function caret(input, begin, end, notranslate) {
        function translatePosition(pos) {
          if (isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "") && el) {
            pos = el.inputmask._valueGet().length - pos;
          }

          return pos;
        }

        var range;

        if (begin !== undefined) {
          if ($.isArray(begin)) {
            end = isRTL ? begin[0] : begin[1];
            begin = isRTL ? begin[1] : begin[0];
          }

          if (begin.begin !== undefined) {
            end = isRTL ? begin.begin : begin.end;
            begin = isRTL ? begin.end : begin.begin;
          }

          if (typeof begin === "number") {
            begin = notranslate ? begin : translatePosition(begin);
            end = notranslate ? end : translatePosition(end);
            end = typeof end == "number" ? end : begin;
            var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
            input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
            input.inputmask.caretPos = {
              begin: begin,
              end: end
            };

            if (input === document.activeElement) {
              if ("selectionStart" in input) {
                input.selectionStart = begin;
                input.selectionEnd = end;
              } else if (window.getSelection) {
                range = document.createRange();

                if (input.firstChild === undefined || input.firstChild === null) {
                  var textNode = document.createTextNode("");
                  input.appendChild(textNode);
                }

                range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
                range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
                range.collapse(true);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
              } else if (input.createTextRange) {
                range = input.createTextRange();
                range.collapse(true);
                range.moveEnd("character", end);
                range.moveStart("character", begin);
                range.select();
              }

              renderColorMask(input, {
                begin: begin,
                end: end
              });
            }
          }
        } else {
          if ("selectionStart" in input) {
            begin = input.selectionStart;
            end = input.selectionEnd;
          } else if (window.getSelection) {
            range = window.getSelection().getRangeAt(0);

            if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
              begin = range.startOffset;
              end = range.endOffset;
            }
          } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length);
            end = begin + range.text.length;
          }

          return {
            begin: notranslate ? begin : translatePosition(begin),
            end: notranslate ? end : translatePosition(end)
          };
        }
      }

      function determineLastRequiredPosition(returnDefinition) {
        var buffer = getMaskTemplate(true, getLastValidPosition(), true, true),
            bl = buffer.length,
            pos,
            lvp = getLastValidPosition(),
            positions = {},
            lvTest = getMaskSet().validPositions[lvp],
            ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
            testPos;

        for (pos = lvp + 1; pos < buffer.length; pos++) {
          testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
          ndxIntlzr = testPos.locator.slice();
          positions[pos] = $.extend(true, {}, testPos);
        }

        var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;

        for (pos = bl - 1; pos > lvp; pos--) {
          testPos = positions[pos];

          if ((testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.fn != null || testPos.match.fn === null && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && getTests(pos)[0].def !== "")) && buffer[pos] === getPlaceholder(pos, testPos.match)) {
            bl--;
          } else break;
        }

        return returnDefinition ? {
          l: bl,
          def: positions[bl] ? positions[bl].match : undefined
        } : bl;
      }

      function clearOptionalTail(buffer) {
        buffer.length = 0;
        var template = getMaskTemplate(true, 0, true, undefined, true),
            lmnt,
            validPos;

        while (lmnt = template.shift(), lmnt !== undefined) {
          buffer.push(lmnt);
        }

        return buffer;
      }

      function isComplete(buffer) {
        if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
        if (opts.repeat === "*") return undefined;
        var complete = false,
            lrp = determineLastRequiredPosition(true),
            aml = seekPrevious(lrp.l);

        if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
          complete = true;

          for (var i = 0; i <= aml; i++) {
            var test = getTestTemplate(i).match;

            if (test.fn !== null && getMaskSet().validPositions[i] === undefined && test.optionality !== true && test.optionalQuantifier !== true || test.fn === null && buffer[i] !== getPlaceholder(i, test)) {
              complete = false;
              break;
            }
          }
        }

        return complete;
      }

      function handleRemove(input, k, pos, strict, fromIsValid) {
        if (opts.numericInput || isRTL) {
          if (k === Inputmask.keyCode.BACKSPACE) {
            k = Inputmask.keyCode.DELETE;
          } else if (k === Inputmask.keyCode.DELETE) {
            k = Inputmask.keyCode.BACKSPACE;
          }

          if (isRTL) {
            var pend = pos.end;
            pos.end = pos.begin;
            pos.begin = pend;
          }
        }

        if (k === Inputmask.keyCode.BACKSPACE && pos.end - pos.begin < 1) {
          pos.begin = seekPrevious(pos.begin);

          if (getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator) {
            pos.begin--;
          }
        } else if (k === Inputmask.keyCode.DELETE && pos.begin === pos.end) {
          pos.end = isMask(pos.end, true) && getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint ? pos.end + 1 : seekNext(pos.end) + 1;

          if (getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator) {
            pos.end++;
          }
        }

        revalidateMask(pos);

        if (strict !== true && opts.keepStatic !== false || opts.regex !== null) {
          var result = alternate(true);

          if (result) {
            var newPos = result.caret !== undefined ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, true);

            if (k !== Inputmask.keyCode.DELETE || pos.begin > newPos) {
              pos.begin == newPos;
            }
          }
        }

        var lvp = getLastValidPosition(pos.begin, true);

        if (lvp < pos.begin || pos.begin === -1) {
          getMaskSet().p = seekNext(lvp);
        } else if (strict !== true) {
          getMaskSet().p = pos.begin;

          if (fromIsValid !== true) {
            while (getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined) {
              getMaskSet().p++;
            }
          }
        }
      }

      function initializeColorMask(input) {
        var computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null);

        function findCaretPos(clientx) {
          var e = document.createElement("span"),
              caretPos;

          for (var style in computedStyle) {
            if (isNaN(style) && style.indexOf("font") !== -1) {
              e.style[style] = computedStyle[style];
            }
          }

          e.style.textTransform = computedStyle.textTransform;
          e.style.letterSpacing = computedStyle.letterSpacing;
          e.style.position = "absolute";
          e.style.height = "auto";
          e.style.width = "auto";
          e.style.visibility = "hidden";
          e.style.whiteSpace = "nowrap";
          document.body.appendChild(e);

          var inputText = input.inputmask._valueGet(),
              previousWidth = 0,
              itl;

          for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
            e.innerHTML += inputText.charAt(caretPos) || "_";

            if (e.offsetWidth >= clientx) {
              var offset1 = clientx - previousWidth;
              var offset2 = e.offsetWidth - clientx;
              e.innerHTML = inputText.charAt(caretPos);
              offset1 -= e.offsetWidth / 3;
              caretPos = offset1 < offset2 ? caretPos - 1 : caretPos;
              break;
            }

            previousWidth = e.offsetWidth;
          }

          document.body.removeChild(e);
          return caretPos;
        }

        var template = document.createElement("div");
        template.style.width = computedStyle.width;
        template.style.textAlign = computedStyle.textAlign;
        colorMask = document.createElement("div");
        input.inputmask.colorMask = colorMask;
        colorMask.className = "im-colormask";
        input.parentNode.insertBefore(colorMask, input);
        input.parentNode.removeChild(input);
        colorMask.appendChild(input);
        colorMask.appendChild(template);
        input.style.left = template.offsetLeft + "px";
        $(colorMask).on("mouseleave", function (e) {
          return EventHandlers.mouseleaveEvent.call(input, [e]);
        });
        $(colorMask).on("mouseenter", function (e) {
          return EventHandlers.mouseenterEvent.call(input, [e]);
        });
        $(colorMask).on("click", function (e) {
          caret(input, findCaretPos(e.clientX));
          return EventHandlers.clickEvent.call(input, [e]);
        });
      }

      Inputmask.prototype.positionColorMask = function (input, template) {
        input.style.left = template.offsetLeft + "px";
      };

      function renderColorMask(input, caretPos, clear) {
        var maskTemplate = [],
            isStatic = false,
            test,
            testPos,
            ndxIntlzr,
            pos = 0;

        function setEntry(entry) {
          if (entry === undefined) entry = "";

          if (!isStatic && (test.fn === null || testPos.input === undefined)) {
            isStatic = true;
            maskTemplate.push("<span class='im-static'>" + entry);
          } else if (isStatic && (test.fn !== null && testPos.input !== undefined || test.def === "")) {
            isStatic = false;
            var mtl = maskTemplate.length;
            maskTemplate[mtl - 1] = maskTemplate[mtl - 1] + "</span>";
            maskTemplate.push(entry);
          } else maskTemplate.push(entry);
        }

        function setCaret() {
          if (document.activeElement === input) {
            maskTemplate.splice(caretPos.begin, 0, caretPos.begin === caretPos.end || caretPos.end > getMaskSet().maskLength ? '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">' : '<mark class="im-caret-select">');
            maskTemplate.splice(caretPos.end + 1, 0, "</mark>");
          }
        }

        if (colorMask !== undefined) {
          var buffer = getBuffer();

          if (caretPos === undefined) {
            caretPos = caret(input);
          } else if (caretPos.begin === undefined) {
            caretPos = {
              begin: caretPos,
              end: caretPos
            };
          }

          if (clear !== true) {
            var lvp = getLastValidPosition();

            do {
              if (getMaskSet().validPositions[pos]) {
                testPos = getMaskSet().validPositions[pos];
                test = testPos.match;
                ndxIntlzr = testPos.locator.slice();
                setEntry(buffer[pos]);
              } else {
                testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                test = testPos.match;
                ndxIntlzr = testPos.locator.slice();

                if (opts.jitMasking === false || pos < lvp || typeof opts.jitMasking === "number" && isFinite(opts.jitMasking) && opts.jitMasking > pos) {
                  setEntry(getPlaceholder(pos, test));
                } else isStatic = false;
              }

              pos++;
            } while ((maxLength === undefined || pos < maxLength) && (test.fn !== null || test.def !== "") || lvp > pos || isStatic);

            if (isStatic) setEntry();
            setCaret();
          }

          var template = colorMask.getElementsByTagName("div")[0];
          template.innerHTML = maskTemplate.join("");
          input.inputmask.positionColorMask(input, template);
        }
      }

      function mask(elem) {
        function isElementTypeSupported(input, opts) {
          function patchValueProperty(npt) {
            var valueGet;
            var valueSet;

            function patchValhook(type) {
              if ($.valHooks && ($.valHooks[type] === undefined || $.valHooks[type].inputmaskpatch !== true)) {
                var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                  return elem.value;
                };
                var valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                  elem.value = value;
                  return elem;
                };
                $.valHooks[type] = {
                  get: function get(elem) {
                    if (elem.inputmask) {
                      if (elem.inputmask.opts.autoUnmask) {
                        return elem.inputmask.unmaskedvalue();
                      } else {
                        var result = valhookGet(elem);
                        return getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
                      }
                    } else return valhookGet(elem);
                  },
                  set: function set(elem, value) {
                    var $elem = $(elem),
                        result;
                    result = valhookSet(elem, value);

                    if (elem.inputmask) {
                      $elem.trigger("setvalue", [value]);
                    }

                    return result;
                  },
                  inputmaskpatch: true
                };
              }
            }

            function getter() {
              if (this.inputmask) {
                return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : getLastValidPosition() !== -1 || opts.nullable !== true ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "";
              } else return valueGet.call(this);
            }

            function setter(value) {
              valueSet.call(this, value);

              if (this.inputmask) {
                $(this).trigger("setvalue", [value]);
              }
            }

            function installNativeValueSetFallback(npt) {
              EventRuler.on(npt, "mouseenter", function (event) {
                var $input = $(this),
                    input = this,
                    value = input.inputmask._valueGet();

                if (value !== getBuffer().join("")) {
                  $input.trigger("setvalue");
                }
              });
            }

            if (!npt.inputmask.__valueGet) {
              if (opts.noValuePatching !== true) {
                if (Object.getOwnPropertyDescriptor) {
                  if (typeof Object.getPrototypeOf !== "function") {
                    Object.getPrototypeOf = _typeof("test".__proto__) === "object" ? function (object) {
                      return object.__proto__;
                    } : function (object) {
                      return object.constructor.prototype;
                    };
                  }

                  var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;

                  if (valueProperty && valueProperty.get && valueProperty.set) {
                    valueGet = valueProperty.get;
                    valueSet = valueProperty.set;
                    Object.defineProperty(npt, "value", {
                      get: getter,
                      set: setter,
                      configurable: true
                    });
                  } else if (npt.tagName !== "INPUT") {
                    valueGet = function valueGet() {
                      return this.textContent;
                    };

                    valueSet = function valueSet(value) {
                      this.textContent = value;
                    };

                    Object.defineProperty(npt, "value", {
                      get: getter,
                      set: setter,
                      configurable: true
                    });
                  }
                } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                  valueGet = npt.__lookupGetter__("value");
                  valueSet = npt.__lookupSetter__("value");

                  npt.__defineGetter__("value", getter);

                  npt.__defineSetter__("value", setter);
                }

                npt.inputmask.__valueGet = valueGet;
                npt.inputmask.__valueSet = valueSet;
              }

              npt.inputmask._valueGet = function (overruleRTL) {
                return isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
              };

              npt.inputmask._valueSet = function (value, overruleRTL) {
                valueSet.call(this.el, value === null || value === undefined ? "" : overruleRTL !== true && isRTL ? value.split("").reverse().join("") : value);
              };

              if (valueGet === undefined) {
                valueGet = function valueGet() {
                  return this.value;
                };

                valueSet = function valueSet(value) {
                  this.value = value;
                };

                patchValhook(npt.type);
                installNativeValueSetFallback(npt);
              }
            }
          }

          var elementType = input.getAttribute("type");
          var isSupported = input.tagName === "INPUT" && $.inArray(elementType, opts.supportsInputType) !== -1 || input.isContentEditable || input.tagName === "TEXTAREA";

          if (!isSupported) {
            if (input.tagName === "INPUT") {
              var el = document.createElement("input");
              el.setAttribute("type", elementType);
              isSupported = el.type === "text";
              el = null;
            } else isSupported = "partial";
          }

          if (isSupported !== false) {
            patchValueProperty(input);
          } else input.inputmask = undefined;

          return isSupported;
        }

        EventRuler.off(elem);
        var isSupported = isElementTypeSupported(elem, opts);

        if (isSupported !== false) {
          el = elem;
          $el = $(el);
          originalPlaceholder = el.placeholder;
          maxLength = el !== undefined ? el.maxLength : undefined;
          if (maxLength === -1) maxLength = undefined;

          if (opts.colorMask === true) {
            initializeColorMask(el);
          }

          if (mobile) {
            if ("inputmode" in el) {
              el.inputmode = opts.inputmode;
              el.setAttribute("inputmode", opts.inputmode);
            }

            if (opts.disablePredictiveText === true) {
              if ("autocorrect" in el) {
                el.autocorrect = false;
              } else {
                if (opts.colorMask !== true) {
                  initializeColorMask(el);
                }

                el.type = "password";
              }
            }
          }

          if (isSupported === true) {
            el.setAttribute("im-insert", opts.insertMode);
            EventRuler.on(el, "submit", EventHandlers.submitEvent);
            EventRuler.on(el, "reset", EventHandlers.resetEvent);
            EventRuler.on(el, "blur", EventHandlers.blurEvent);
            EventRuler.on(el, "focus", EventHandlers.focusEvent);

            if (opts.colorMask !== true) {
              EventRuler.on(el, "click", EventHandlers.clickEvent);
              EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent);
              EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent);
            }

            EventRuler.on(el, "paste", EventHandlers.pasteEvent);
            EventRuler.on(el, "cut", EventHandlers.cutEvent);
            EventRuler.on(el, "complete", opts.oncomplete);
            EventRuler.on(el, "incomplete", opts.onincomplete);
            EventRuler.on(el, "cleared", opts.oncleared);

            if (!mobile && opts.inputEventOnly !== true) {
              EventRuler.on(el, "keydown", EventHandlers.keydownEvent);
              EventRuler.on(el, "keypress", EventHandlers.keypressEvent);
            } else {
              el.removeAttribute("maxLength");
            }

            EventRuler.on(el, "input", EventHandlers.inputFallBackEvent);
            EventRuler.on(el, "beforeinput", EventHandlers.beforeInputEvent);
          }

          EventRuler.on(el, "setvalue", EventHandlers.setValueEvent);
          undoValue = getBufferTemplate().join("");

          if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || document.activeElement === el) {
            var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, el.inputmask._valueGet(true), opts) || el.inputmask._valueGet(true) : el.inputmask._valueGet(true);
            if (initialValue !== "") checkVal(el, true, false, initialValue.split(""));
            var buffer = getBuffer().slice();
            undoValue = buffer.join("");

            if (isComplete(buffer) === false) {
              if (opts.clearIncomplete) {
                resetMaskSet();
              }
            }

            if (opts.clearMaskOnLostFocus && document.activeElement !== el) {
              if (getLastValidPosition() === -1) {
                buffer = [];
              } else {
                clearOptionalTail(buffer);
              }
            }

            if (opts.clearMaskOnLostFocus === false || opts.showMaskOnFocus && document.activeElement === el || el.inputmask._valueGet(true) !== "") writeBuffer(el, buffer);

            if (document.activeElement === el) {
              caret(el, seekNext(getLastValidPosition()));
            }
          }
        }
      }

      var valueBuffer;

      if (actionObj !== undefined) {
        switch (actionObj.action) {
          case "isComplete":
            el = actionObj.el;
            return isComplete(getBuffer());

          case "unmaskedvalue":
            if (el === undefined || actionObj.value !== undefined) {
              valueBuffer = actionObj.value;
              valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer : valueBuffer).split("");
              checkVal.call(this, undefined, false, false, valueBuffer);
              if ($.isFunction(opts.onBeforeWrite)) opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts);
            }

            return unmaskedvalue(el);

          case "mask":
            mask(el);
            break;

          case "format":
            valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value : actionObj.value).split("");
            checkVal.call(this, undefined, true, false, valueBuffer);

            if (actionObj.metadata) {
              return {
                value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                metadata: maskScope.call(this, {
                  action: "getmetadata"
                }, maskset, opts)
              };
            }

            return isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

          case "isValid":
            if (actionObj.value) {
              valueBuffer = actionObj.value.split("");
              checkVal.call(this, undefined, true, true, valueBuffer);
            } else {
              actionObj.value = getBuffer().join("");
            }

            var buffer = getBuffer();
            var rl = determineLastRequiredPosition(),
                lmib = buffer.length - 1;

            for (; lmib > rl; lmib--) {
              if (isMask(lmib)) break;
            }

            buffer.splice(rl, lmib + 1 - rl);
            return isComplete(buffer) && actionObj.value === getBuffer().join("");

          case "getemptymask":
            return getBufferTemplate().join("");

          case "remove":
            if (el && el.inputmask) {
              $.data(el, "_inputmask_opts", null);
              $el = $(el);

              el.inputmask._valueSet(opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(true));

              EventRuler.off(el);

              if (el.inputmask.colorMask) {
                colorMask = el.inputmask.colorMask;
                colorMask.removeChild(el);
                colorMask.parentNode.insertBefore(el, colorMask);
                colorMask.parentNode.removeChild(colorMask);
              }

              var valueProperty;

              if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
                valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value");

                if (valueProperty) {
                  if (el.inputmask.__valueGet) {
                    Object.defineProperty(el, "value", {
                      get: el.inputmask.__valueGet,
                      set: el.inputmask.__valueSet,
                      configurable: true
                    });
                  }
                }
              } else if (document.__lookupGetter__ && el.__lookupGetter__("value")) {
                if (el.inputmask.__valueGet) {
                  el.__defineGetter__("value", el.inputmask.__valueGet);

                  el.__defineSetter__("value", el.inputmask.__valueSet);
                }
              }

              el.inputmask = undefined;
            }

            return el;
            break;

          case "getmetadata":
            if ($.isArray(maskset.metadata)) {
              var maskTarget = getMaskTemplate(true, 0, false).join("");
              $.each(maskset.metadata, function (ndx, mtdt) {
                if (mtdt.mask === maskTarget) {
                  maskTarget = mtdt;
                  return false;
                }
              });
              return maskTarget;
            }

            return maskset.metadata;
        }
      }
    }

    return Inputmask;
  });
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function ($) {
    return $;
  });
}, function (module, exports) {
  module.exports = jQuery;
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return typeof window !== "undefined" ? window : new (eval("require('jsdom').JSDOM"))("").window;
  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function (Inputmask) {
    var $ = Inputmask.dependencyLib;
    var formatCode = {
      d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
      dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
        return pad(Date.prototype.getDate.call(this), 2);
      }],
      ddd: [""],
      dddd: [""],
      m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
        return Date.prototype.getMonth.call(this) + 1;
      }],
      mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
        return pad(Date.prototype.getMonth.call(this) + 1, 2);
      }],
      mmm: [""],
      mmmm: [""],
      yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
        return pad(Date.prototype.getFullYear.call(this), 2);
      }],
      yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
        return pad(Date.prototype.getFullYear.call(this), 4);
      }],
      h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
      hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
        return pad(Date.prototype.getHours.call(this), 2);
      }],
      hhh: ["[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours],
      H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
      HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
        return pad(Date.prototype.getHours.call(this), 2);
      }],
      HHH: ["[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours],
      M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
      MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
        return pad(Date.prototype.getMinutes.call(this), 2);
      }],
      ss: ["[0-5][0-9]", Date.prototype.setSeconds, "seconds", function () {
        return pad(Date.prototype.getSeconds.call(this), 2);
      }],
      l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
        return pad(Date.prototype.getMilliseconds.call(this), 3);
      }],
      L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
        return pad(Date.prototype.getMilliseconds.call(this), 2);
      }],
      t: ["[ap]"],
      tt: ["[ap]m"],
      T: ["[AP]"],
      TT: ["[AP]M"],
      Z: [""],
      o: [""],
      S: [""]
    },
        formatAlias = {
      isoDate: "yyyy-mm-dd",
      isoTime: "HH:MM:ss",
      isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
      isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    function getTokenizer(opts) {
      if (!opts.tokenizer) {
        var tokens = [];

        for (var ndx in formatCode) {
          if (tokens.indexOf(ndx[0]) === -1) tokens.push(ndx[0]);
        }

        opts.tokenizer = "(" + tokens.join("+|") + ")+?|.";
        opts.tokenizer = new RegExp(opts.tokenizer, "g");
      }

      return opts.tokenizer;
    }

    function isValidDate(dateParts, currentResult) {
      return !isFinite(dateParts.rawday) || dateParts.day == "29" && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day ? currentResult : false;
    }

    function isDateInRange(dateParts, opts) {
      var result = true;

      if (opts.min) {
        if (dateParts["rawyear"]) {
          var rawYear = dateParts["rawyear"].replace(/[^0-9]/g, ""),
              minYear = opts.min.year.substr(0, rawYear.length);
          result = minYear <= rawYear;
        }

        if (dateParts["year"] === dateParts["rawyear"]) {
          if (opts.min.date.getTime() === opts.min.date.getTime()) {
            result = opts.min.date.getTime() <= dateParts.date.getTime();
          }
        }
      }

      if (result && opts.max && opts.max.date.getTime() === opts.max.date.getTime()) {
        result = opts.max.date.getTime() >= dateParts.date.getTime();
      }

      return result;
    }

    function parse(format, dateObjValue, opts, raw) {
      var mask = "",
          match;

      while (match = getTokenizer(opts).exec(format)) {
        if (dateObjValue === undefined) {
          if (formatCode[match[0]]) {
            mask += "(" + formatCode[match[0]][0] + ")";
          } else {
            switch (match[0]) {
              case "[":
                mask += "(";
                break;

              case "]":
                mask += ")?";
                break;

              default:
                mask += Inputmask.escapeRegex(match[0]);
            }
          }
        } else {
          if (formatCode[match[0]]) {
            if (raw !== true && formatCode[match[0]][3]) {
              var getFn = formatCode[match[0]][3];
              mask += getFn.call(dateObjValue.date);
            } else if (formatCode[match[0]][2]) mask += dateObjValue["raw" + formatCode[match[0]][2]];else mask += match[0];
          } else mask += match[0];
        }
      }

      return mask;
    }

    function pad(val, len) {
      val = String(val);
      len = len || 2;

      while (val.length < len) {
        val = "0" + val;
      }

      return val;
    }

    function analyseMask(maskString, format, opts) {
      var dateObj = {
        date: new Date(1, 0, 1)
      },
          targetProp,
          mask = maskString,
          match,
          dateOperation,
          targetValidator;

      function extendProperty(value) {
        var correctedValue = value.replace(/[^0-9]/g, "0");

        if (correctedValue != value) {
          var enteredPart = value.replace(/[^0-9]/g, ""),
              min = (opts.min && opts.min[targetProp] || value).toString(),
              max = (opts.max && opts.max[targetProp] || value).toString();
          correctedValue = enteredPart + (enteredPart < min.slice(0, enteredPart.length) ? min.slice(enteredPart.length) : enteredPart > max.slice(0, enteredPart.length) ? max.slice(enteredPart.length) : correctedValue.toString().slice(enteredPart.length));
        }

        return correctedValue;
      }

      function setValue(dateObj, value, opts) {
        dateObj[targetProp] = extendProperty(value);
        dateObj["raw" + targetProp] = value;
        if (dateOperation !== undefined) dateOperation.call(dateObj.date, targetProp == "month" ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
      }

      if (typeof mask === "string") {
        while (match = getTokenizer(opts).exec(format)) {
          var value = mask.slice(0, match[0].length);

          if (formatCode.hasOwnProperty(match[0])) {
            targetValidator = formatCode[match[0]][0];
            targetProp = formatCode[match[0]][2];
            dateOperation = formatCode[match[0]][1];
            setValue(dateObj, value, opts);
          }

          mask = mask.slice(value.length);
        }

        return dateObj;
      } else if (mask && (typeof mask === "undefined" ? "undefined" : _typeof(mask)) === "object" && mask.hasOwnProperty("date")) {
        return mask;
      }

      return undefined;
    }

    Inputmask.extendAliases({
      datetime: {
        mask: function mask(opts) {
          formatCode.S = opts.i18n.ordinalSuffix.join("|");
          opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat;
          opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat;
          opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat;
          opts.placeholder = opts.placeholder !== "" ? opts.placeholder : opts.inputFormat.replace(/[\[\]]/, "");
          opts.regex = parse(opts.inputFormat, undefined, opts);
          return null;
        },
        placeholder: "",
        inputFormat: "isoDateTime",
        displayFormat: undefined,
        outputFormat: undefined,
        min: null,
        max: null,
        i18n: {
          dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          ordinalSuffix: ["st", "nd", "rd", "th"]
        },
        postValidation: function postValidation(buffer, pos, currentResult, opts) {
          opts.min = analyseMask(opts.min, opts.inputFormat, opts);
          opts.max = analyseMask(opts.max, opts.inputFormat, opts);
          var result = currentResult,
              dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);

          if (result && dateParts.date.getTime() === dateParts.date.getTime()) {
            result = isValidDate(dateParts, result);
            result = result && isDateInRange(dateParts, opts);
          }

          if (pos && result && currentResult.pos !== pos) {
            return {
              buffer: parse(opts.inputFormat, dateParts, opts),
              refreshFromBuffer: {
                start: pos,
                end: currentResult.pos
              }
            };
          }

          return result;
        },
        onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
          var input = this;

          if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
            var today = new Date(),
                match,
                date = "";

            while (match = getTokenizer(opts).exec(opts.inputFormat)) {
              if (match[0].charAt(0) === "d") {
                date += pad(today.getDate(), match[0].length);
              } else if (match[0].charAt(0) === "m") {
                date += pad(today.getMonth() + 1, match[0].length);
              } else if (match[0] === "yyyy") {
                date += today.getFullYear().toString();
              } else if (match[0].charAt(0) === "y") {
                date += pad(today.getYear(), match[0].length);
              }
            }

            input.inputmask._valueSet(date);

            $(input).trigger("setvalue");
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, true);
        },
        casing: function casing(elem, test, pos, validPositions) {
          if (test.nativeDef.indexOf("[ap]") == 0) return elem.toLowerCase();
          if (test.nativeDef.indexOf("[AP]") == 0) return elem.toUpperCase();
          return elem;
        },
        insertMode: false,
        shiftPositions: false
      }
    });
    return Inputmask;
  });
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function (Inputmask) {
    var $ = Inputmask.dependencyLib;

    function autoEscape(txt, opts) {
      var escapedTxt = "";

      for (var i = 0; i < txt.length; i++) {
        if (Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i)) {
          escapedTxt += "\\" + txt.charAt(i);
        } else escapedTxt += txt.charAt(i);
      }

      return escapedTxt;
    }

    function alignDigits(buffer, digits, opts) {
      if (digits > 0) {
        var radixPosition = $.inArray(opts.radixPoint, buffer);

        if (radixPosition === -1) {
          buffer.push(opts.radixPoint);
          radixPosition = buffer.length - 1;
        }

        for (var i = 1; i <= digits; i++) {
          buffer[radixPosition + i] = buffer[radixPosition + i] || "0";
        }
      }

      return buffer;
    }

    Inputmask.extendAliases({
      numeric: {
        mask: function mask(opts) {
          if (opts.repeat !== 0 && isNaN(opts.integerDigits)) {
            opts.integerDigits = opts.repeat;
          }

          opts.repeat = 0;

          if (opts.groupSeparator === opts.radixPoint && opts.digits && opts.digits !== "0") {
            if (opts.radixPoint === ".") {
              opts.groupSeparator = ",";
            } else if (opts.radixPoint === ",") {
              opts.groupSeparator = ".";
            } else opts.groupSeparator = "";
          }

          if (opts.groupSeparator === " ") {
            opts.skipOptionalPartCharacter = undefined;
          }

          opts.autoGroup = opts.autoGroup && opts.groupSeparator !== "";

          if (opts.autoGroup) {
            if (typeof opts.groupSize == "string" && isFinite(opts.groupSize)) opts.groupSize = parseInt(opts.groupSize);

            if (isFinite(opts.integerDigits)) {
              var seps = Math.floor(opts.integerDigits / opts.groupSize);
              var mod = opts.integerDigits % opts.groupSize;
              opts.integerDigits = parseInt(opts.integerDigits) + (mod === 0 ? seps - 1 : seps);

              if (opts.integerDigits < 1) {
                opts.integerDigits = "*";
              }
            }
          }

          if (opts.placeholder.length > 1) {
            opts.placeholder = opts.placeholder.charAt(0);
          }

          if (opts.positionCaretOnClick === "radixFocus" && opts.placeholder === "" && opts.integerOptional === false) {
            opts.positionCaretOnClick = "lvp";
          }

          opts.definitions[";"] = opts.definitions["~"];
          opts.definitions[";"].definitionSymbol = "~";

          if (opts.numericInput === true) {
            opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
            opts.digitsOptional = false;
            if (isNaN(opts.digits)) opts.digits = 2;
            opts.decimalProtect = false;
          }

          var mask = "[+]";
          mask += autoEscape(opts.prefix, opts);

          if (opts.integerOptional === true) {
            mask += "~{1," + opts.integerDigits + "}";
          } else mask += "~{" + opts.integerDigits + "}";

          if (opts.digits !== undefined) {
            var radixDef = opts.decimalProtect ? ":" : opts.radixPoint;
            var dq = opts.digits.toString().split(",");

            if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
              mask += radixDef + ";{" + opts.digits + "}";
            } else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
              if (opts.digitsOptional) {
                mask += "[" + radixDef + ";{1," + opts.digits + "}]";
              } else mask += radixDef + ";{" + opts.digits + "}";
            }
          }

          mask += autoEscape(opts.suffix, opts);
          mask += "[-]";
          opts.greedy = false;
          return mask;
        },
        placeholder: "",
        greedy: false,
        digits: "*",
        digitsOptional: true,
        enforceDigitsOnBlur: false,
        radixPoint: ".",
        positionCaretOnClick: "radixFocus",
        groupSize: 3,
        groupSeparator: "",
        autoGroup: false,
        allowMinus: true,
        negationSymbol: {
          front: "-",
          back: ""
        },
        integerDigits: "+",
        integerOptional: true,
        prefix: "",
        suffix: "",
        rightAlign: true,
        decimalProtect: true,
        min: null,
        max: null,
        step: 1,
        insertMode: true,
        autoUnmask: false,
        unmaskAsNumber: false,
        inputType: "text",
        inputmode: "numeric",
        preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset) {
          if (c === "-" || c === opts.negationSymbol.front) {
            if (opts.allowMinus !== true) return false;
            opts.isNegative = opts.isNegative === undefined ? true : !opts.isNegative;
            if (buffer.join("") === "") return true;
            return {
              caret: maskset.validPositions[pos] ? pos : undefined,
              dopost: true
            };
          }

          if (isSelection === false && c === opts.radixPoint && opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
            var radixPos = $.inArray(opts.radixPoint, buffer);

            if (radixPos !== -1 && maskset.validPositions[radixPos] !== undefined) {
              if (opts.numericInput === true) {
                return pos === radixPos;
              }

              return {
                caret: radixPos + 1
              };
            }
          }

          return true;
        },
        postValidation: function postValidation(buffer, pos, currentResult, opts) {
          function buildPostMask(buffer, opts) {
            var postMask = "";
            postMask += "(" + opts.groupSeparator + "*{" + opts.groupSize + "}){*}";

            if (opts.radixPoint !== "") {
              var radixSplit = buffer.join("").split(opts.radixPoint);

              if (radixSplit[1]) {
                postMask += opts.radixPoint + "*{" + radixSplit[1].match(/^\d*\??\d*/)[0].length + "}";
              }
            }

            return postMask;
          }

          var suffix = opts.suffix.split(""),
              prefix = opts.prefix.split("");
          if (currentResult.pos === undefined && currentResult.caret !== undefined && currentResult.dopost !== true) return currentResult;
          var caretPos = currentResult.caret !== undefined ? currentResult.caret : currentResult.pos;
          var maskedValue = buffer.slice();

          if (opts.numericInput) {
            caretPos = maskedValue.length - caretPos - 1;
            maskedValue = maskedValue.reverse();
          }

          var charAtPos = maskedValue[caretPos];

          if (charAtPos === opts.groupSeparator) {
            caretPos += 1;
            charAtPos = maskedValue[caretPos];
          }

          if (caretPos === maskedValue.length - opts.suffix.length - 1 && charAtPos === opts.radixPoint) return currentResult;

          if (charAtPos !== undefined) {
            if (charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back) {
              maskedValue[caretPos] = "?";

              if (opts.prefix.length > 0 && caretPos >= (opts.isNegative === false ? 1 : 0) && caretPos < opts.prefix.length - 1 + (opts.isNegative === false ? 1 : 0)) {
                prefix[caretPos - (opts.isNegative === false ? 1 : 0)] = "?";
              } else if (opts.suffix.length > 0 && caretPos >= maskedValue.length - opts.suffix.length - (opts.isNegative === false ? 1 : 0)) {
                suffix[caretPos - (maskedValue.length - opts.suffix.length - (opts.isNegative === false ? 1 : 0))] = "?";
              }
            }
          }

          prefix = prefix.join("");
          suffix = suffix.join("");
          var processValue = maskedValue.join("").replace(prefix, "");
          processValue = processValue.replace(suffix, "");
          processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
          processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "");
          processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");

          if (isNaN(opts.placeholder)) {
            processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "");
          }

          if (processValue.length > 1 && processValue.indexOf(opts.radixPoint) !== 1) {
            if (charAtPos === "0") {
              processValue = processValue.replace(/^\?/g, "");
            }

            processValue = processValue.replace(/^0/g, "");
          }

          if (processValue.charAt(0) === opts.radixPoint && opts.radixPoint !== "" && opts.numericInput !== true) {
            processValue = "0" + processValue;
          }

          if (processValue !== "") {
            processValue = processValue.split("");

            if ((!opts.digitsOptional || opts.enforceDigitsOnBlur && currentResult.event === "blur") && isFinite(opts.digits)) {
              var radixPosition = $.inArray(opts.radixPoint, processValue);
              var rpb = $.inArray(opts.radixPoint, maskedValue);

              if (radixPosition === -1) {
                processValue.push(opts.radixPoint);
                radixPosition = processValue.length - 1;
              }

              for (var i = 1; i <= opts.digits; i++) {
                if ((!opts.digitsOptional || opts.enforceDigitsOnBlur && currentResult.event === "blur") && (processValue[radixPosition + i] === undefined || processValue[radixPosition + i] === opts.placeholder.charAt(0))) {
                  processValue[radixPosition + i] = currentResult.placeholder || opts.placeholder.charAt(0);
                } else if (rpb !== -1 && maskedValue[rpb + i] !== undefined) {
                  processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i];
                }
              }
            }

            if (opts.autoGroup === true && opts.groupSeparator !== "" && (charAtPos !== opts.radixPoint || currentResult.pos !== undefined || currentResult.dopost)) {
              var addRadix = processValue[processValue.length - 1] === opts.radixPoint && currentResult.c === opts.radixPoint;
              processValue = Inputmask(buildPostMask(processValue, opts), {
                numericInput: true,
                jitMasking: true,
                definitions: {
                  "*": {
                    validator: "[0-9?]",
                    cardinality: 1
                  }
                }
              }).format(processValue.join(""));
              if (addRadix) processValue += opts.radixPoint;

              if (processValue.charAt(0) === opts.groupSeparator) {
                processValue.substr(1);
              }
            } else processValue = processValue.join("");
          }

          if (opts.isNegative && currentResult.event === "blur") {
            opts.isNegative = processValue !== "0";
          }

          processValue = prefix + processValue;
          processValue += suffix;

          if (opts.isNegative) {
            processValue = opts.negationSymbol.front + processValue;
            processValue += opts.negationSymbol.back;
          }

          processValue = processValue.split("");

          if (charAtPos !== undefined) {
            if (charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back) {
              caretPos = $.inArray("?", processValue);

              if (caretPos > -1) {
                processValue[caretPos] = charAtPos;
              } else caretPos = currentResult.caret || 0;
            } else if (charAtPos === opts.radixPoint || charAtPos === opts.negationSymbol.front || charAtPos === opts.negationSymbol.back) {
              var newCaretPos = $.inArray(charAtPos, processValue);
              if (newCaretPos !== -1) caretPos = newCaretPos;
            }
          }

          if (opts.numericInput) {
            caretPos = processValue.length - caretPos - 1;
            processValue = processValue.reverse();
          }

          var rslt = {
            caret: (charAtPos === undefined || currentResult.pos !== undefined) && caretPos !== undefined ? caretPos + (opts.numericInput ? -1 : 1) : caretPos,
            buffer: processValue,
            refreshFromBuffer: currentResult.dopost || buffer.join("") !== processValue.join("")
          };
          return rslt.refreshFromBuffer ? rslt : currentResult;
        },
        onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
          function parseMinMaxOptions(opts) {
            if (opts.parseMinMaxOptions === undefined) {
              if (opts.min !== null) {
                opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
                opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN;
                if (isNaN(opts.min)) opts.min = Number.MIN_VALUE;
              }

              if (opts.max !== null) {
                opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
                opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN;
                if (isNaN(opts.max)) opts.max = Number.MAX_VALUE;
              }

              opts.parseMinMaxOptions = "done";
            }
          }

          if (e) {
            switch (e.type) {
              case "keydown":
                return opts.postValidation(buffer, caretPos, {
                  caret: caretPos,
                  dopost: true
                }, opts);

              case "blur":
              case "checkval":
                var unmasked;
                parseMinMaxOptions(opts);

                if (opts.min !== null || opts.max !== null) {
                  unmasked = opts.onUnMask(buffer.join(""), undefined, $.extend({}, opts, {
                    unmaskAsNumber: true
                  }));

                  if (opts.min !== null && unmasked < opts.min) {
                    opts.isNegative = opts.min < 0;
                    return opts.postValidation(opts.min.toString().replace(".", opts.radixPoint).split(""), caretPos, {
                      caret: caretPos,
                      dopost: true,
                      placeholder: "0"
                    }, opts);
                  } else if (opts.max !== null && unmasked > opts.max) {
                    opts.isNegative = opts.max < 0;
                    return opts.postValidation(opts.max.toString().replace(".", opts.radixPoint).split(""), caretPos, {
                      caret: caretPos,
                      dopost: true,
                      placeholder: "0"
                    }, opts);
                  }
                }

                return opts.postValidation(buffer, caretPos, {
                  caret: caretPos,
                  placeholder: "0",
                  event: "blur"
                }, opts);

              case "_checkval":
                return {
                  caret: caretPos
                };

              default:
                break;
            }
          }
        },
        regex: {
          integerPart: function integerPart(opts, emptyCheck) {
            return emptyCheck ? new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?") : new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?\\d+");
          },
          integerNPart: function integerNPart(opts) {
            return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
          }
        },
        definitions: {
          "~": {
            validator: function validator(chrs, maskset, pos, strict, opts, isSelection) {
              var isValid, l;

              if (chrs === "k" || chrs === "m") {
                isValid = {
                  insert: [],
                  c: 0
                };

                for (var i = 0, l = chrs === "k" ? 2 : 5; i < l; i++) {
                  isValid.insert.push({
                    pos: pos + i,
                    c: 0
                  });
                }

                isValid.pos = pos + l;
                return isValid;
              }

              isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);

              if (isValid === true) {
                if (opts.numericInput !== true && maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].match.def === "~" && !isSelection) {
                  var processValue = maskset.buffer.join("");
                  processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "");
                  processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
                  var pvRadixSplit = processValue.split(opts.radixPoint);

                  if (pvRadixSplit.length > 1) {
                    pvRadixSplit[1] = pvRadixSplit[1].replace(/0/g, opts.placeholder.charAt(0));
                  }

                  if (pvRadixSplit[0] === "0") {
                    pvRadixSplit[0] = pvRadixSplit[0].replace(/0/g, opts.placeholder.charAt(0));
                  }

                  processValue = pvRadixSplit[0] + opts.radixPoint + pvRadixSplit[1] || "";

                  var bufferTemplate = maskset._buffer.join("");

                  if (processValue === opts.radixPoint) {
                    processValue = bufferTemplate;
                  }

                  while (processValue.match(Inputmask.escapeRegex(bufferTemplate) + "$") === null) {
                    bufferTemplate = bufferTemplate.slice(1);
                  }

                  processValue = processValue.replace(bufferTemplate, "");
                  processValue = processValue.split("");

                  if (processValue[pos] === undefined) {
                    isValid = {
                      pos: pos,
                      remove: pos
                    };
                  } else {
                    isValid = {
                      pos: pos
                    };
                  }
                }
              } else if (!strict && chrs === opts.radixPoint && maskset.validPositions[pos - 1] === undefined) {
                isValid = {
                  insert: {
                    pos: pos,
                    c: 0
                  },
                  pos: pos + 1
                };
              }

              return isValid;
            },
            cardinality: 1
          },
          "+": {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              return opts.allowMinus && (chrs === "-" || chrs === opts.negationSymbol.front);
            },
            cardinality: 1,
            placeholder: ""
          },
          "-": {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              return opts.allowMinus && chrs === opts.negationSymbol.back;
            },
            cardinality: 1,
            placeholder: ""
          },
          ":": {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]";
              var isValid = new RegExp(radix).test(chrs);

              if (isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint) {
                isValid = {
                  caret: pos + 1
                };
              }

              return isValid;
            },
            cardinality: 1,
            placeholder: function placeholder(opts) {
              return opts.radixPoint;
            }
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          if (unmaskedValue === "" && opts.nullable === true) {
            return unmaskedValue;
          }

          var processValue = maskedValue.replace(opts.prefix, "");
          processValue = processValue.replace(opts.suffix, "");
          processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");

          if (opts.placeholder.charAt(0) !== "") {
            processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0");
          }

          if (opts.unmaskAsNumber) {
            if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".");
            processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
            processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
            return Number(processValue);
          }

          return processValue;
        },
        isComplete: function isComplete(buffer, opts) {
          var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
          maskedValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
          maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
          maskedValue = maskedValue.replace(opts.prefix, "");
          maskedValue = maskedValue.replace(opts.suffix, "");
          maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1");
          if (opts.radixPoint === ",") maskedValue = maskedValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
          return isFinite(maskedValue);
        },
        onBeforeMask: function onBeforeMask(initialValue, opts) {
          opts.isNegative = undefined;
          var radixPoint = opts.radixPoint || ",";

          if ((typeof initialValue == "number" || opts.inputType === "number") && radixPoint !== "") {
            initialValue = initialValue.toString().replace(".", radixPoint);
          }

          var valueParts = initialValue.split(radixPoint),
              integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
              decimalPart = valueParts.length > 1 ? valueParts[1].replace(/[^0-9]/g, "") : "";
          initialValue = integerPart + (decimalPart !== "" ? radixPoint + decimalPart : decimalPart);
          var digits = 0;

          if (radixPoint !== "") {
            digits = decimalPart.length;

            if (decimalPart !== "") {
              var digitsFactor = Math.pow(10, digits || 1);

              if (isFinite(opts.digits)) {
                digits = parseInt(opts.digits);
                digitsFactor = Math.pow(10, digits);
              }

              initialValue = initialValue.replace(Inputmask.escapeRegex(radixPoint), ".");
              if (isFinite(initialValue)) initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor;
              initialValue = initialValue.toString().replace(".", radixPoint);
            }
          }

          if (opts.digits === 0 && initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) !== -1) {
            initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)));
          }

          return alignDigits(initialValue.toString().split(""), digits, opts).join("");
        },
        onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
          var $input = $(this);

          if (e.ctrlKey) {
            switch (e.keyCode) {
              case Inputmask.keyCode.UP:
                $input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));
                $input.trigger("setvalue");
                break;

              case Inputmask.keyCode.DOWN:
                $input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));
                $input.trigger("setvalue");
                break;
            }
          }
        }
      },
      currency: {
        prefix: "$ ",
        groupSeparator: ",",
        alias: "numeric",
        placeholder: "0",
        autoGroup: true,
        digits: 2,
        digitsOptional: false,
        clearMaskOnLostFocus: false
      },
      decimal: {
        alias: "numeric"
      },
      integer: {
        alias: "numeric",
        digits: 0,
        radixPoint: ""
      },
      percentage: {
        alias: "numeric",
        digits: 2,
        digitsOptional: true,
        radixPoint: ".",
        placeholder: "0",
        autoGroup: false,
        min: 0,
        max: 100,
        suffix: " %",
        allowMinus: false
      }
    });
    return Inputmask;
  });
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function ($, Inputmask) {
    if ($.fn.inputmask === undefined) {
      $.fn.inputmask = function (fn, options) {
        var nptmask,
            input = this[0];
        if (options === undefined) options = {};

        if (typeof fn === "string") {
          switch (fn) {
            case "unmaskedvalue":
              return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();

            case "remove":
              return this.each(function () {
                if (this.inputmask) this.inputmask.remove();
              });

            case "getemptymask":
              return input && input.inputmask ? input.inputmask.getemptymask() : "";

            case "hasMaskedValue":
              return input && input.inputmask ? input.inputmask.hasMaskedValue() : false;

            case "isComplete":
              return input && input.inputmask ? input.inputmask.isComplete() : true;

            case "getmetadata":
              return input && input.inputmask ? input.inputmask.getmetadata() : undefined;

            case "setvalue":
              Inputmask.setValue(input, options);
              break;

            case "option":
              if (typeof options === "string") {
                if (input && input.inputmask !== undefined) {
                  return input.inputmask.option(options);
                }
              } else {
                return this.each(function () {
                  if (this.inputmask !== undefined) {
                    return this.inputmask.option(options);
                  }
                });
              }

              break;

            default:
              options.alias = fn;
              nptmask = new Inputmask(options);
              return this.each(function () {
                nptmask.mask(this);
              });
          }
        } else if (Array.isArray(fn)) {
          options.alias = fn;
          nptmask = new Inputmask(options);
          return this.each(function () {
            nptmask.mask(this);
          });
        } else if ((typeof fn === "undefined" ? "undefined" : _typeof(fn)) == "object") {
          nptmask = new Inputmask(fn);

          if (fn.mask === undefined && fn.alias === undefined) {
            return this.each(function () {
              if (this.inputmask !== undefined) {
                return this.inputmask.option(fn);
              } else nptmask.mask(this);
            });
          } else {
            return this.each(function () {
              nptmask.mask(this);
            });
          }
        } else if (fn === undefined) {
          return this.each(function () {
            nptmask = new Inputmask(options);
            nptmask.mask(this);
          });
        }
      };
    }

    return $.fn.inputmask;
  });
}]);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * smooth-scroll v15.0.0: Animate scrolling to anchor links
 * (c) 2018 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/smooth-scroll
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory(root);
  } else {
    root.SmoothScroll = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : void 0, function (window) {
  'use strict'; //
  // Default settings
  //

  var defaults = {
    // Selectors
    ignore: '[data-scroll-ignore]',
    header: null,
    topOnEmptyHash: true,
    // Speed & Duration
    speed: 500,
    speedAsDuration: false,
    durationMax: null,
    durationMin: null,
    clip: true,
    offset: 0,
    // Easing
    easing: 'easeInOutCubic',
    customEasing: null,
    // History
    updateURL: true,
    popstate: true,
    // Custom Events
    emitEvents: true
  }; //
  // Utility Methods
  //

  /**
   * Check if browser supports required methods
   * @return {Boolean} Returns true if all required methods are supported
   */

  var supports = function supports() {
    return 'querySelector' in document && 'addEventListener' in window && 'requestAnimationFrame' in window && 'closest' in window.Element.prototype;
  };
  /**
   * Merge two or more objects together.
   * @param   {Object}   objects  The objects to merge together
   * @returns {Object}            Merged values of defaults and options
   */


  var extend = function extend() {
    var merged = {};
    Array.prototype.forEach.call(arguments, function (obj) {
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) return;
        merged[key] = obj[key];
      }
    });
    return merged;
  };
  /**
   * Check to see if user prefers reduced motion
   * @param  {Object} settings Script settings
   */


  var reduceMotion = function reduceMotion(settings) {
    if ('matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches) {
      return true;
    }

    return false;
  };
  /**
   * Get the height of an element.
   * @param  {Node} elem The element to get the height of
   * @return {Number}    The element's height in pixels
   */


  var getHeight = function getHeight(elem) {
    return parseInt(window.getComputedStyle(elem).height, 10);
  };
  /**
   * Decode a URI, with error check
   * @param  {String} hash The URI to decode
   * @return {String}      A decoded URI (or the original string if an error is thrown)
   */


  var decode = function decode(hash) {
    var decoded;

    try {
      decoded = decodeURIComponent(hash);
    } catch (e) {
      decoded = hash;
    }

    return decoded;
  };
  /**
   * Escape special characters for use with querySelector
   * @author Mathias Bynens
   * @link https://github.com/mathiasbynens/CSS.escape
   * @param {String} id The anchor ID to escape
   */


  var escapeCharacters = function escapeCharacters(id) {
    // Remove leading hash
    if (id.charAt(0) === '#') {
      id = id.substr(1);
    }

    var string = String(id);
    var length = string.length;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = string.charCodeAt(0);

    while (++index < length) {
      codeUnit = string.charCodeAt(index); // Note: there’s no need to special-case astral symbols, surrogate
      // pairs, or lone surrogates.
      // If the character is NULL (U+0000), then throw an
      // `InvalidCharacterError` exception and terminate these steps.

      if (codeUnit === 0x0000) {
        throw new InvalidCharacterError('Invalid character: the input contains U+0000.');
      }

      if ( // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit == 0x007F || // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 || // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
      index === 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit === 0x002D) {
        // http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
        result += '\\' + codeUnit.toString(16) + ' ';
        continue;
      } // If the character is not handled by one of the above rules and is
      // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
      // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
      // U+005A), or [a-z] (U+0061 to U+007A), […]


      if (codeUnit >= 0x0080 || codeUnit === 0x002D || codeUnit === 0x005F || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
        // the character itself
        result += string.charAt(index);
        continue;
      } // Otherwise, the escaped character.
      // http://dev.w3.org/csswg/cssom/#escape-a-character


      result += '\\' + string.charAt(index);
    } // Return sanitized hash


    var hash;

    try {
      hash = decodeURIComponent('#' + result);
    } catch (e) {
      hash = '#' + result;
    }

    return hash;
  };
  /**
   * Calculate the easing pattern
   * @link https://gist.github.com/gre/1650294
   * @param {String} type Easing pattern
   * @param {Number} time Time animation should take to complete
   * @returns {Number}
   */


  var easingPattern = function easingPattern(settings, time) {
    var pattern; // Default Easing Patterns

    if (settings.easing === 'easeInQuad') pattern = time * time; // accelerating from zero velocity

    if (settings.easing === 'easeOutQuad') pattern = time * (2 - time); // decelerating to zero velocity

    if (settings.easing === 'easeInOutQuad') pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration

    if (settings.easing === 'easeInCubic') pattern = time * time * time; // accelerating from zero velocity

    if (settings.easing === 'easeOutCubic') pattern = --time * time * time + 1; // decelerating to zero velocity

    if (settings.easing === 'easeInOutCubic') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration

    if (settings.easing === 'easeInQuart') pattern = time * time * time * time; // accelerating from zero velocity

    if (settings.easing === 'easeOutQuart') pattern = 1 - --time * time * time * time; // decelerating to zero velocity

    if (settings.easing === 'easeInOutQuart') pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * --time * time * time * time; // acceleration until halfway, then deceleration

    if (settings.easing === 'easeInQuint') pattern = time * time * time * time * time; // accelerating from zero velocity

    if (settings.easing === 'easeOutQuint') pattern = 1 + --time * time * time * time * time; // decelerating to zero velocity

    if (settings.easing === 'easeInOutQuint') pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * --time * time * time * time * time; // acceleration until halfway, then deceleration
    // Custom Easing Patterns

    if (!!settings.customEasing) pattern = settings.customEasing(time);
    return pattern || time; // no easing, no acceleration
  };
  /**
   * Determine the document's height
   * @returns {Number}
   */


  var getDocumentHeight = function getDocumentHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  };
  /**
   * Calculate how far to scroll
   * Clip support added by robjtede - https://github.com/cferdinandi/smooth-scroll/issues/405
   * @param {Element} anchor       The anchor element to scroll to
   * @param {Number}  headerHeight Height of a fixed header, if any
   * @param {Number}  offset       Number of pixels by which to offset scroll
   * @param {Boolean} clip         If true, adjust scroll distance to prevent abrupt stops near the bottom of the page
   * @returns {Number}
   */


  var getEndLocation = function getEndLocation(anchor, headerHeight, offset, clip) {
    var location = 0;

    if (anchor.offsetParent) {
      do {
        location += anchor.offsetTop;
        anchor = anchor.offsetParent;
      } while (anchor);
    }

    location = Math.max(location - headerHeight - offset, 0);

    if (clip) {
      location = Math.min(location, getDocumentHeight() - window.innerHeight);
    }

    return location;
  };
  /**
   * Get the height of the fixed header
   * @param  {Node}   header The header
   * @return {Number}        The height of the header
   */


  var getHeaderHeight = function getHeaderHeight(header) {
    return !header ? 0 : getHeight(header) + header.offsetTop;
  };
  /**
   * Calculate the speed to use for the animation
   * @param  {Number} distance The distance to travel
   * @param  {Object} settings The plugin settings
   * @return {Number}          How fast to animate
   */


  var getSpeed = function getSpeed(distance, settings) {
    var speed = settings.speedAsDuration ? settings.speed : Math.abs(distance / 1000 * settings.speed);
    if (settings.durationMax && speed > settings.durationMax) return settings.durationMax;
    if (settings.durationMin && speed < settings.durationMin) return settings.durationMin;
    return speed;
  };
  /**
   * Update the URL
   * @param  {Node}    anchor  The anchor that was scrolled to
   * @param  {Boolean} isNum   If true, anchor is a number
   * @param  {Object}  options Settings for Smooth Scroll
   */


  var updateURL = function updateURL(anchor, isNum, options) {
    // Bail if the anchor is a number
    if (isNum) return; // Verify that pushState is supported and the updateURL option is enabled

    if (!history.pushState || !options.updateURL) return; // Update URL

    history.pushState({
      smoothScroll: JSON.stringify(options),
      anchor: anchor.id
    }, document.title, anchor === document.documentElement ? '#top' : '#' + anchor.id);
  };
  /**
   * Bring the anchored element into focus
   * @param {Node}     anchor      The anchor element
   * @param {Number}   endLocation The end location to scroll to
   * @param {Boolean}  isNum       If true, scroll is to a position rather than an element
   */


  var adjustFocus = function adjustFocus(anchor, endLocation, isNum) {
    // Is scrolling to top of page, blur
    if (anchor === 0) {
      document.body.focus();
    } // Don't run if scrolling to a number on the page


    if (isNum) return; // Otherwise, bring anchor element into focus

    anchor.focus();

    if (document.activeElement !== anchor) {
      anchor.setAttribute('tabindex', '-1');
      anchor.focus();
      anchor.style.outline = 'none';
    }

    window.scrollTo(0, endLocation);
  };
  /**
   * Emit a custom event
   * @param  {String} type    The event type
   * @param  {Object} options The settings object
   * @param  {Node}   anchor  The anchor element
   * @param  {Node}   toggle  The toggle element
   */


  var emitEvent = function emitEvent(type, options, anchor, toggle) {
    if (!options.emitEvents || typeof window.CustomEvent !== 'function') return;
    var event = new CustomEvent(type, {
      bubbles: true,
      detail: {
        anchor: anchor,
        toggle: toggle
      }
    });
    document.dispatchEvent(event);
  }; //
  // SmoothScroll Constructor
  //


  var SmoothScroll = function SmoothScroll(selector, options) {
    //
    // Variables
    //
    var smoothScroll = {}; // Object for public APIs

    var settings, anchor, toggle, fixedHeader, headerHeight, eventTimeout, animationInterval; //
    // Methods
    //

    /**
     * Cancel a scroll-in-progress
     */

    smoothScroll.cancelScroll = function (noEvent) {
      cancelAnimationFrame(animationInterval);
      animationInterval = null;
      if (noEvent) return;
      emitEvent('scrollCancel', settings);
    };
    /**
     * Start/stop the scrolling animation
     * @param {Node|Number} anchor  The element or position to scroll to
     * @param {Element}     toggle  The element that toggled the scroll event
     * @param {Object}      options
     */


    smoothScroll.animateScroll = function (anchor, toggle, options) {
      // Local settings
      var _settings = extend(settings || defaults, options || {}); // Merge user options with defaults
      // Selectors and variables


      var isNum = Object.prototype.toString.call(anchor) === '[object Number]' ? true : false;
      var anchorElem = isNum || !anchor.tagName ? null : anchor;
      if (!isNum && !anchorElem) return;
      var startLocation = window.pageYOffset; // Current location on the page

      if (_settings.header && !fixedHeader) {
        // Get the fixed header if not already set
        fixedHeader = document.querySelector(_settings.header);
      }

      if (!headerHeight) {
        // Get the height of a fixed header if one exists and not already set
        headerHeight = getHeaderHeight(fixedHeader);
      }

      var endLocation = isNum ? anchor : getEndLocation(anchorElem, headerHeight, parseInt(typeof _settings.offset === 'function' ? _settings.offset(anchor, toggle) : _settings.offset, 10), _settings.clip); // Location to scroll to

      var distance = endLocation - startLocation; // distance to travel

      var documentHeight = getDocumentHeight();
      var timeLapsed = 0;
      var speed = getSpeed(distance, _settings);
      var start, percentage, position;
      /**
       * Stop the scroll animation when it reaches its target (or the bottom/top of page)
       * @param {Number} position Current position on the page
       * @param {Number} endLocation Scroll to location
       * @param {Number} animationInterval How much to scroll on this loop
       */

      var stopAnimateScroll = function stopAnimateScroll(position, endLocation) {
        // Get the current location
        var currentLocation = window.pageYOffset; // Check if the end location has been reached yet (or we've hit the end of the document)

        if (position == endLocation || currentLocation == endLocation || (startLocation < endLocation && window.innerHeight + currentLocation) >= documentHeight) {
          // Clear the animation timer
          smoothScroll.cancelScroll(true); // Bring the anchored element into focus

          adjustFocus(anchor, endLocation, isNum); // Emit a custom event

          emitEvent('scrollStop', _settings, anchor, toggle); // Reset start

          start = null;
          animationInterval = null;
          return true;
        }
      };
      /**
       * Loop scrolling animation
       */


      var loopAnimateScroll = function loopAnimateScroll(timestamp) {
        if (!start) {
          start = timestamp;
        }

        timeLapsed += timestamp - start;
        percentage = timeLapsed / parseInt(speed, 10);
        percentage = percentage > 1 ? 1 : percentage;
        position = startLocation + distance * easingPattern(_settings, percentage);
        window.scrollTo(0, Math.floor(position));

        if (!stopAnimateScroll(position, endLocation)) {
          animationInterval = window.requestAnimationFrame(loopAnimateScroll);
          start = timestamp;
        }
      };
      /**
       * Reset position to fix weird iOS bug
       * @link https://github.com/cferdinandi/smooth-scroll/issues/45
       */


      if (window.pageYOffset === 0) {
        window.scrollTo(0, 0);
      } // Update the URL


      updateURL(anchor, isNum, _settings); // Emit a custom event

      emitEvent('scrollStart', _settings, anchor, toggle); // Start scrolling animation

      smoothScroll.cancelScroll(true);
      window.requestAnimationFrame(loopAnimateScroll);
    };
    /**
     * If smooth scroll element clicked, animate scroll
     */


    var clickHandler = function clickHandler(event) {
      // Don't run if the user prefers reduced motion
      if (reduceMotion(settings)) return; // Don't run if right-click or command/control + click

      if (event.button !== 0 || event.metaKey || event.ctrlKey) return; // Check if event.target has closest() method
      // By @totegi - https://github.com/cferdinandi/smooth-scroll/pull/401/

      if (!('closest' in event.target)) return; // Check if a smooth scroll link was clicked

      toggle = event.target.closest(selector);
      if (!toggle || toggle.tagName.toLowerCase() !== 'a' || event.target.closest(settings.ignore)) return; // Only run if link is an anchor and points to the current page

      if (toggle.hostname !== window.location.hostname || toggle.pathname !== window.location.pathname || !/#/.test(toggle.href)) return; // Get an escaped version of the hash

      var hash = escapeCharacters(decode(toggle.hash)); // Get the anchored element

      var anchor = settings.topOnEmptyHash && hash === '#' ? document.documentElement : document.querySelector(hash);
      anchor = !anchor && hash === '#top' ? document.documentElement : anchor; // If anchored element exists, scroll to it

      if (!anchor) return;
      event.preventDefault();
      smoothScroll.animateScroll(anchor, toggle);
    };
    /**
     * Animate scroll on popstate events
     */


    var popstateHandler = function popstateHandler(event) {
      // Stop if history.state doesn't exist (ex. if clicking on a broken anchor link).
      // fixes `Cannot read property 'smoothScroll' of null` error getting thrown.
      if (history.state === null) return; // Only run if state is a popstate record for this instantiation

      if (!history.state.smoothScroll || history.state.smoothScroll !== JSON.stringify(settings)) return; // Only run if state includes an anchor

      if (!history.state.anchor) return; // Get the anchor

      var anchor = document.querySelector(escapeCharacters(decode(history.state.anchor)));
      if (!anchor) return; // Animate scroll to anchor link

      smoothScroll.animateScroll(anchor, null, {
        updateURL: false
      });
    };
    /**
     * On window scroll and resize, only run events at a rate of 15fps for better performance
     */


    var resizeThrottler = function resizeThrottler(event) {
      if (!eventTimeout) {
        eventTimeout = setTimeout(function () {
          eventTimeout = null; // Reset timeout

          headerHeight = getHeaderHeight(fixedHeader); // Get the height of a fixed header if one exists
        }, 66);
      }
    };
    /**
     * Destroy the current initialization.
     */


    smoothScroll.destroy = function () {
      // If plugin isn't already initialized, stop
      if (!settings) return; // Remove event listeners

      document.removeEventListener('click', clickHandler, false);
      window.removeEventListener('resize', resizeThrottler, false);
      window.removeEventListener('popstate', popstateHandler, false); // Cancel any scrolls-in-progress

      smoothScroll.cancelScroll(); // Reset variables

      settings = null;
      anchor = null;
      toggle = null;
      fixedHeader = null;
      headerHeight = null;
      eventTimeout = null;
      animationInterval = null;
    };
    /**
     * Initialize Smooth Scroll
     * @param {Object} options User settings
     */


    smoothScroll.init = function (options) {
      // feature test
      if (!supports()) throw 'Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.'; // Destroy any existing initializations

      smoothScroll.destroy(); // Selectors and variables

      settings = extend(defaults, options || {}); // Merge user options with defaults

      fixedHeader = settings.header ? document.querySelector(settings.header) : null; // Get the fixed header

      headerHeight = getHeaderHeight(fixedHeader); // When a toggle is clicked, run the click handler

      document.addEventListener('click', clickHandler, false); // If window is resized and there's a fixed header, recalculate its size

      if (fixedHeader) {
        window.addEventListener('resize', resizeThrottler, false);
      } // If updateURL and popState are enabled, listen for pop events


      if (settings.updateURL && settings.popstate) {
        window.addEventListener('popstate', popstateHandler, false);
      }
    }; //
    // Initialize plugin
    //


    smoothScroll.init(options); //
    // Public APIs
    //

    return smoothScroll;
  };

  return SmoothScroll;
});
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * smooth-scroll v15.0.0: Animate scrolling to anchor links
 * (c) 2018 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/smooth-scroll
 */

/**
 * closest() polyfill
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this;

    do {
      i = matches.length;

      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));

    return el;
  };
}
/**
 * CustomEvent() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */


(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
/**
 * requestAnimationFrame() polyfill
 * By Erik Möller. Fixes from Paul Irish and Tino Zijdel.
 * @link http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @link http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * @license MIT
 */


(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
})();

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory(root);
  } else {
    root.SmoothScroll = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : void 0, function (window) {
  'use strict'; //
  // Default settings
  //

  var defaults = {
    // Selectors
    ignore: '[data-scroll-ignore]',
    header: null,
    topOnEmptyHash: true,
    // Speed & Duration
    speed: 500,
    speedAsDuration: false,
    durationMax: null,
    durationMin: null,
    clip: true,
    offset: 0,
    // Easing
    easing: 'easeInOutCubic',
    customEasing: null,
    // History
    updateURL: true,
    popstate: true,
    // Custom Events
    emitEvents: true
  }; //
  // Utility Methods
  //

  /**
   * Check if browser supports required methods
   * @return {Boolean} Returns true if all required methods are supported
   */

  var supports = function supports() {
    return 'querySelector' in document && 'addEventListener' in window && 'requestAnimationFrame' in window && 'closest' in window.Element.prototype;
  };
  /**
   * Merge two or more objects together.
   * @param   {Object}   objects  The objects to merge together
   * @returns {Object}            Merged values of defaults and options
   */


  var extend = function extend() {
    var merged = {};
    Array.prototype.forEach.call(arguments, function (obj) {
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) return;
        merged[key] = obj[key];
      }
    });
    return merged;
  };
  /**
   * Check to see if user prefers reduced motion
   * @param  {Object} settings Script settings
   */


  var reduceMotion = function reduceMotion(settings) {
    if ('matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches) {
      return true;
    }

    return false;
  };
  /**
   * Get the height of an element.
   * @param  {Node} elem The element to get the height of
   * @return {Number}    The element's height in pixels
   */


  var getHeight = function getHeight(elem) {
    return parseInt(window.getComputedStyle(elem).height, 10);
  };
  /**
   * Decode a URI, with error check
   * @param  {String} hash The URI to decode
   * @return {String}      A decoded URI (or the original string if an error is thrown)
   */


  var decode = function decode(hash) {
    var decoded;

    try {
      decoded = decodeURIComponent(hash);
    } catch (e) {
      decoded = hash;
    }

    return decoded;
  };
  /**
   * Escape special characters for use with querySelector
   * @author Mathias Bynens
   * @link https://github.com/mathiasbynens/CSS.escape
   * @param {String} id The anchor ID to escape
   */


  var escapeCharacters = function escapeCharacters(id) {
    // Remove leading hash
    if (id.charAt(0) === '#') {
      id = id.substr(1);
    }

    var string = String(id);
    var length = string.length;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = string.charCodeAt(0);

    while (++index < length) {
      codeUnit = string.charCodeAt(index); // Note: there’s no need to special-case astral symbols, surrogate
      // pairs, or lone surrogates.
      // If the character is NULL (U+0000), then throw an
      // `InvalidCharacterError` exception and terminate these steps.

      if (codeUnit === 0x0000) {
        throw new InvalidCharacterError('Invalid character: the input contains U+0000.');
      }

      if ( // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit == 0x007F || // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 || // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
      index === 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit === 0x002D) {
        // http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
        result += '\\' + codeUnit.toString(16) + ' ';
        continue;
      } // If the character is not handled by one of the above rules and is
      // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
      // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
      // U+005A), or [a-z] (U+0061 to U+007A), […]


      if (codeUnit >= 0x0080 || codeUnit === 0x002D || codeUnit === 0x005F || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
        // the character itself
        result += string.charAt(index);
        continue;
      } // Otherwise, the escaped character.
      // http://dev.w3.org/csswg/cssom/#escape-a-character


      result += '\\' + string.charAt(index);
    } // Return sanitized hash


    var hash;

    try {
      hash = decodeURIComponent('#' + result);
    } catch (e) {
      hash = '#' + result;
    }

    return hash;
  };
  /**
   * Calculate the easing pattern
   * @link https://gist.github.com/gre/1650294
   * @param {String} type Easing pattern
   * @param {Number} time Time animation should take to complete
   * @returns {Number}
   */


  var easingPattern = function easingPattern(settings, time) {
    var pattern; // Default Easing Patterns

    if (settings.easing === 'easeInQuad') pattern = time * time; // accelerating from zero velocity

    if (settings.easing === 'easeOutQuad') pattern = time * (2 - time); // decelerating to zero velocity

    if (settings.easing === 'easeInOutQuad') pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration

    if (settings.easing === 'easeInCubic') pattern = time * time * time; // accelerating from zero velocity

    if (settings.easing === 'easeOutCubic') pattern = --time * time * time + 1; // decelerating to zero velocity

    if (settings.easing === 'easeInOutCubic') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration

    if (settings.easing === 'easeInQuart') pattern = time * time * time * time; // accelerating from zero velocity

    if (settings.easing === 'easeOutQuart') pattern = 1 - --time * time * time * time; // decelerating to zero velocity

    if (settings.easing === 'easeInOutQuart') pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * --time * time * time * time; // acceleration until halfway, then deceleration

    if (settings.easing === 'easeInQuint') pattern = time * time * time * time * time; // accelerating from zero velocity

    if (settings.easing === 'easeOutQuint') pattern = 1 + --time * time * time * time * time; // decelerating to zero velocity

    if (settings.easing === 'easeInOutQuint') pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * --time * time * time * time * time; // acceleration until halfway, then deceleration
    // Custom Easing Patterns

    if (!!settings.customEasing) pattern = settings.customEasing(time);
    return pattern || time; // no easing, no acceleration
  };
  /**
   * Determine the document's height
   * @returns {Number}
   */


  var getDocumentHeight = function getDocumentHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  };
  /**
   * Calculate how far to scroll
   * Clip support added by robjtede - https://github.com/cferdinandi/smooth-scroll/issues/405
   * @param {Element} anchor       The anchor element to scroll to
   * @param {Number}  headerHeight Height of a fixed header, if any
   * @param {Number}  offset       Number of pixels by which to offset scroll
   * @param {Boolean} clip         If true, adjust scroll distance to prevent abrupt stops near the bottom of the page
   * @returns {Number}
   */


  var getEndLocation = function getEndLocation(anchor, headerHeight, offset, clip) {
    var location = 0;

    if (anchor.offsetParent) {
      do {
        location += anchor.offsetTop;
        anchor = anchor.offsetParent;
      } while (anchor);
    }

    location = Math.max(location - headerHeight - offset, 0);

    if (clip) {
      location = Math.min(location, getDocumentHeight() - window.innerHeight);
    }

    return location;
  };
  /**
   * Get the height of the fixed header
   * @param  {Node}   header The header
   * @return {Number}        The height of the header
   */


  var getHeaderHeight = function getHeaderHeight(header) {
    return !header ? 0 : getHeight(header) + header.offsetTop;
  };
  /**
   * Calculate the speed to use for the animation
   * @param  {Number} distance The distance to travel
   * @param  {Object} settings The plugin settings
   * @return {Number}          How fast to animate
   */


  var getSpeed = function getSpeed(distance, settings) {
    var speed = settings.speedAsDuration ? settings.speed : Math.abs(distance / 1000 * settings.speed);
    if (settings.durationMax && speed > settings.durationMax) return settings.durationMax;
    if (settings.durationMin && speed < settings.durationMin) return settings.durationMin;
    return speed;
  };
  /**
   * Update the URL
   * @param  {Node}    anchor  The anchor that was scrolled to
   * @param  {Boolean} isNum   If true, anchor is a number
   * @param  {Object}  options Settings for Smooth Scroll
   */


  var updateURL = function updateURL(anchor, isNum, options) {
    // Bail if the anchor is a number
    if (isNum) return; // Verify that pushState is supported and the updateURL option is enabled

    if (!history.pushState || !options.updateURL) return; // Update URL

    history.pushState({
      smoothScroll: JSON.stringify(options),
      anchor: anchor.id
    }, document.title, anchor === document.documentElement ? '#top' : '#' + anchor.id);
  };
  /**
   * Bring the anchored element into focus
   * @param {Node}     anchor      The anchor element
   * @param {Number}   endLocation The end location to scroll to
   * @param {Boolean}  isNum       If true, scroll is to a position rather than an element
   */


  var adjustFocus = function adjustFocus(anchor, endLocation, isNum) {
    // Is scrolling to top of page, blur
    if (anchor === 0) {
      document.body.focus();
    } // Don't run if scrolling to a number on the page


    if (isNum) return; // Otherwise, bring anchor element into focus

    anchor.focus();

    if (document.activeElement !== anchor) {
      anchor.setAttribute('tabindex', '-1');
      anchor.focus();
      anchor.style.outline = 'none';
    }

    window.scrollTo(0, endLocation);
  };
  /**
   * Emit a custom event
   * @param  {String} type    The event type
   * @param  {Object} options The settings object
   * @param  {Node}   anchor  The anchor element
   * @param  {Node}   toggle  The toggle element
   */


  var emitEvent = function emitEvent(type, options, anchor, toggle) {
    if (!options.emitEvents || typeof window.CustomEvent !== 'function') return;
    var event = new CustomEvent(type, {
      bubbles: true,
      detail: {
        anchor: anchor,
        toggle: toggle
      }
    });
    document.dispatchEvent(event);
  }; //
  // SmoothScroll Constructor
  //


  var SmoothScroll = function SmoothScroll(selector, options) {
    //
    // Variables
    //
    var smoothScroll = {}; // Object for public APIs

    var settings, anchor, toggle, fixedHeader, headerHeight, eventTimeout, animationInterval; //
    // Methods
    //

    /**
     * Cancel a scroll-in-progress
     */

    smoothScroll.cancelScroll = function (noEvent) {
      cancelAnimationFrame(animationInterval);
      animationInterval = null;
      if (noEvent) return;
      emitEvent('scrollCancel', settings);
    };
    /**
     * Start/stop the scrolling animation
     * @param {Node|Number} anchor  The element or position to scroll to
     * @param {Element}     toggle  The element that toggled the scroll event
     * @param {Object}      options
     */


    smoothScroll.animateScroll = function (anchor, toggle, options) {
      // Local settings
      var _settings = extend(settings || defaults, options || {}); // Merge user options with defaults
      // Selectors and variables


      var isNum = Object.prototype.toString.call(anchor) === '[object Number]' ? true : false;
      var anchorElem = isNum || !anchor.tagName ? null : anchor;
      if (!isNum && !anchorElem) return;
      var startLocation = window.pageYOffset; // Current location on the page

      if (_settings.header && !fixedHeader) {
        // Get the fixed header if not already set
        fixedHeader = document.querySelector(_settings.header);
      }

      if (!headerHeight) {
        // Get the height of a fixed header if one exists and not already set
        headerHeight = getHeaderHeight(fixedHeader);
      }

      var endLocation = isNum ? anchor : getEndLocation(anchorElem, headerHeight, parseInt(typeof _settings.offset === 'function' ? _settings.offset(anchor, toggle) : _settings.offset, 10), _settings.clip); // Location to scroll to

      var distance = endLocation - startLocation; // distance to travel

      var documentHeight = getDocumentHeight();
      var timeLapsed = 0;
      var speed = getSpeed(distance, _settings);
      var start, percentage, position;
      /**
       * Stop the scroll animation when it reaches its target (or the bottom/top of page)
       * @param {Number} position Current position on the page
       * @param {Number} endLocation Scroll to location
       * @param {Number} animationInterval How much to scroll on this loop
       */

      var stopAnimateScroll = function stopAnimateScroll(position, endLocation) {
        // Get the current location
        var currentLocation = window.pageYOffset; // Check if the end location has been reached yet (or we've hit the end of the document)

        if (position == endLocation || currentLocation == endLocation || (startLocation < endLocation && window.innerHeight + currentLocation) >= documentHeight) {
          // Clear the animation timer
          smoothScroll.cancelScroll(true); // Bring the anchored element into focus

          adjustFocus(anchor, endLocation, isNum); // Emit a custom event

          emitEvent('scrollStop', _settings, anchor, toggle); // Reset start

          start = null;
          animationInterval = null;
          return true;
        }
      };
      /**
       * Loop scrolling animation
       */


      var loopAnimateScroll = function loopAnimateScroll(timestamp) {
        if (!start) {
          start = timestamp;
        }

        timeLapsed += timestamp - start;
        percentage = timeLapsed / parseInt(speed, 10);
        percentage = percentage > 1 ? 1 : percentage;
        position = startLocation + distance * easingPattern(_settings, percentage);
        window.scrollTo(0, Math.floor(position));

        if (!stopAnimateScroll(position, endLocation)) {
          animationInterval = window.requestAnimationFrame(loopAnimateScroll);
          start = timestamp;
        }
      };
      /**
       * Reset position to fix weird iOS bug
       * @link https://github.com/cferdinandi/smooth-scroll/issues/45
       */


      if (window.pageYOffset === 0) {
        window.scrollTo(0, 0);
      } // Update the URL


      updateURL(anchor, isNum, _settings); // Emit a custom event

      emitEvent('scrollStart', _settings, anchor, toggle); // Start scrolling animation

      smoothScroll.cancelScroll(true);
      window.requestAnimationFrame(loopAnimateScroll);
    };
    /**
     * If smooth scroll element clicked, animate scroll
     */


    var clickHandler = function clickHandler(event) {
      // Don't run if the user prefers reduced motion
      if (reduceMotion(settings)) return; // Don't run if right-click or command/control + click

      if (event.button !== 0 || event.metaKey || event.ctrlKey) return; // Check if event.target has closest() method
      // By @totegi - https://github.com/cferdinandi/smooth-scroll/pull/401/

      if (!('closest' in event.target)) return; // Check if a smooth scroll link was clicked

      toggle = event.target.closest(selector);
      if (!toggle || toggle.tagName.toLowerCase() !== 'a' || event.target.closest(settings.ignore)) return; // Only run if link is an anchor and points to the current page

      if (toggle.hostname !== window.location.hostname || toggle.pathname !== window.location.pathname || !/#/.test(toggle.href)) return; // Get an escaped version of the hash

      var hash = escapeCharacters(decode(toggle.hash)); // Get the anchored element

      var anchor = settings.topOnEmptyHash && hash === '#' ? document.documentElement : document.querySelector(hash);
      anchor = !anchor && hash === '#top' ? document.documentElement : anchor; // If anchored element exists, scroll to it

      if (!anchor) return;
      event.preventDefault();
      smoothScroll.animateScroll(anchor, toggle);
    };
    /**
     * Animate scroll on popstate events
     */


    var popstateHandler = function popstateHandler(event) {
      // Stop if history.state doesn't exist (ex. if clicking on a broken anchor link).
      // fixes `Cannot read property 'smoothScroll' of null` error getting thrown.
      if (history.state === null) return; // Only run if state is a popstate record for this instantiation

      if (!history.state.smoothScroll || history.state.smoothScroll !== JSON.stringify(settings)) return; // Only run if state includes an anchor

      if (!history.state.anchor) return; // Get the anchor

      var anchor = document.querySelector(escapeCharacters(decode(history.state.anchor)));
      if (!anchor) return; // Animate scroll to anchor link

      smoothScroll.animateScroll(anchor, null, {
        updateURL: false
      });
    };
    /**
     * On window scroll and resize, only run events at a rate of 15fps for better performance
     */


    var resizeThrottler = function resizeThrottler(event) {
      if (!eventTimeout) {
        eventTimeout = setTimeout(function () {
          eventTimeout = null; // Reset timeout

          headerHeight = getHeaderHeight(fixedHeader); // Get the height of a fixed header if one exists
        }, 66);
      }
    };
    /**
     * Destroy the current initialization.
     */


    smoothScroll.destroy = function () {
      // If plugin isn't already initialized, stop
      if (!settings) return; // Remove event listeners

      document.removeEventListener('click', clickHandler, false);
      window.removeEventListener('resize', resizeThrottler, false);
      window.removeEventListener('popstate', popstateHandler, false); // Cancel any scrolls-in-progress

      smoothScroll.cancelScroll(); // Reset variables

      settings = null;
      anchor = null;
      toggle = null;
      fixedHeader = null;
      headerHeight = null;
      eventTimeout = null;
      animationInterval = null;
    };
    /**
     * Initialize Smooth Scroll
     * @param {Object} options User settings
     */


    smoothScroll.init = function (options) {
      // feature test
      if (!supports()) throw 'Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.'; // Destroy any existing initializations

      smoothScroll.destroy(); // Selectors and variables

      settings = extend(defaults, options || {}); // Merge user options with defaults

      fixedHeader = settings.header ? document.querySelector(settings.header) : null; // Get the fixed header

      headerHeight = getHeaderHeight(fixedHeader); // When a toggle is clicked, run the click handler

      document.addEventListener('click', clickHandler, false); // If window is resized and there's a fixed header, recalculate its size

      if (fixedHeader) {
        window.addEventListener('resize', resizeThrottler, false);
      } // If updateURL and popState are enabled, listen for pop events


      if (settings.updateURL && settings.popstate) {
        window.addEventListener('popstate', popstateHandler, false);
      }
    }; //
    // Initialize plugin
    //


    smoothScroll.init(options); //
    // Public APIs
    //

    return smoothScroll;
  };

  return SmoothScroll;
});