/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/**
 * 1、定义一个立即调用的函数声明
 */
+function ($) {
  'use strict'; // 1.使用严格模式ES5支持

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
    /**
     * 2、插件类的定义
     * @param el
     * @constructor
     */
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

    /**
     * 3、插件类的原型方法定义
     * @param e
     */
  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

    /**
     * 4、在jQuery上定义alert插件，并重设插件构造器
     * @param option
     * @returns {*}
     * @constructor
     */
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
        //Bootstrap的对象数据缓存
      var data  = $this.data('bs.alert')// 获取存储的Alert对象，如果是第一次执行变量data的值为undefined

        // 创建Alert对象: new Alert(this, options)，
        // 并赋值给变量data: data = new Alert(this, options)
        // 存储在元素的jQuery对象上的‘bs.alert’数据字段 $this.data('bs.alert', data)
      if (!data) $this.data('bs.alert', (data = new Alert(this)))
        // data是一个Alert对象，可以调用Alert的原生方法
      if (typeof option == 'string') data[option].call($this)
    })
  }

    /**
     *  5、重设插件构造器，可以通过该属性获取插件的真实类函数
     * @type {Function|alert|Plugin|$.alert|$.fn.alert.$.alert|.$.alert}
     */
  var old = $.fn.alert // 将原先的button插件对象赋值给一个临时变量old
  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert //将闭包内的Button类赋值给jQuery的button对象的Constructor属性


  // ALERT NO CONFLICT
  // =================

    /**
     * 5、防冲突处理：执行该函数，恢复原先的button定义，并返回Bootstrap定义的button插件
     * @returns {$.fn.alert}
     */
  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

    /**
     * 6、绑定触发事件。用on事件代理的方式触发事件，并使用命名空间
     */
//  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);


/**
 * 外部调用两个相冲突的alert插件的方式：
 */
//$.fn.button = $.fn.button.noConflict()
//$('a').button() // 'Bootstrap button'
//$.fn.button.noConflict()
//$('a').button() // 'Old button'
/**
 * 外部使用Alert类
 */
//var Alert = $.fn.alert.Constructor
