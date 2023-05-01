// write a kintone function to update the stock of an item when an order is placed

// code to be used directl in the kintone app - IIFE

(function() {
  'use strict';
  let handler =  (event) => {
    console.log(event);
  }
  kintone.events.on('app.record.detail.process.proceed', handler);
})();