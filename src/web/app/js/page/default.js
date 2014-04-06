define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

   var SendMessageUI = require('component/ui/send-message');
   var MessageData = require('component/data/message');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    SendMessageUI.attachTo(document);
    MessageData.attachTo(document);
  }

});
