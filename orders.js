(function() {
  'use strict';
  function test(event){
    return event;
  }
  function changeStock (event) {
    const order_type = event.record.order_type.value;
    const lookup = event.record.item_lookup.value;
    const currentStock = event.record.current_stock.value;
    const quantity = event.record.qty.value;
    const endQty = order_type === 'Sale' ? currentStock - quantity : Number(currentStock) + Number(quantity);

    const body = {
      'app': 6,
      'updateKey': {
        'field': 'item_code',
        'value': lookup
      },
      'record': {
        'stock': {
          'value': endQty
        },
      }
    };
    kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', body, function(response) {
  // success
  console.log('response: ', response);
}, function(error) {
  // error
  console.log(error);
});
  }
  kintone.events.on('app.record.detail.process.proceed', function(event) {
    if (event.nextStatus.value === 'In progress') {
      changeStock(event);
    }
  });
})();