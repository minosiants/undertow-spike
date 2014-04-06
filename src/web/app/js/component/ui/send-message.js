define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(sendMessage);

  function sendMessage() {
    this.defaultAttrs({
      formSelector: '.js-message-form',
      sendSelector: '.js-message-form button',
      messageTextSelector: '.js-text'
    });

    this.send = function(ev){
      ev.preventDefault();
      var data = {
        text: this.select('messageTextSelector').val()
      };
      this.trigger('ui-send-message', data);
      
    };

    this.showSuccessMessage=function(ev, data){
      console.log("showSuccessMessage");
    };
    this.showFailMessage=function(ev, data){
      console.log("showFailMessage");
    };

    this.after('initialize', function () {
      this.on('click', {
        sendSelector: this.send
      });
      this.on('data-send-message-done', this.showSuccessMessage);
      this.on('data-send-message-fail', this.showFailMessage);      
    });
  }
});