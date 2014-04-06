define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');
  var withTemplate = require('component/ui/withTemplate');

  return defineComponent(alert, withTemplate);

  function alert() {
    this.defaultAttrs({
      formSelector: '.js-message-form',
      sendSelector: '.js-message-form button',
      messageTextSelector: '.js-text'
    });

    this.showError = function(ev){            
      this.render('alert',{type:'error', message:'lalalal'})
    };  
    this.showSuccess = function(ev){            
      this.render('alert',{type:'success', message:'success'})
    };  
    this.after('initialize', function () {      
      this.on('ui-alert-error', this.showError);      
      this.on('ui-alert-success', this.showSuccess);
    });
  }
});