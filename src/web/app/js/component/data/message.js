define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  
  var defineComponent = require('flight/lib/component');
  var $ = require('jquery');
  /**
   * Module exports
   */

  return defineComponent(message);

  /**
   * Module function
   */

  function message() {
    this.send = function(ev, data){
      $.ajax({
        url:'/rs/message',
        type:'POST',
        contentType:'application/json',        
        data:JSON.stringify(data),
        context:this

      }).done(function(resp){
        this.trigger('data-send-message-done',{message:data});
      }).fail(function(resp){
        this.trigger('data-send-message-fail',{message:data});
      }); 
    };

    this.after('initialize', function () {
      this.on('ui-send-message', this.send);      
    });
  }

});
