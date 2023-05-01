(function() {
  'use strict';
    let events = ['app.record.create.submit', 'app.record.edit.submit']
  kintone.events.on(events, function(event){
    console.log(event)
  let order_type = event.record.order_type.value;
  let currentStock = event.record.current_stock.value
  let quantity = event.record.qty.value
    if (order_type === 'Sale' && quantity > currentStock) {
    event.record.qty.error = 'Cannot sell more than current stock.';
    return event;
    }
    event.record.qty.error = null;
    return event;
  });
})();
