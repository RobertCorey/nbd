$(() => {
  let id = encodeURIComponent(new URL(window.location.href).searchParams.get('id'));
  $.get('/getOrder?id=' + id).then((data) => {
    if(data.status != 'quoted') {return;}
    let orderDetails = `
    ${data.status}
    <h2> Order Cost: ${data.cost}</h2>
    <ul class="actions">
      <li><a id="accept" href="#" class="button primary">Accept</a></li>
      <li><a id="decline" href="#" class="button">Decline</a></li>
    </ul>
    <ul>
      <li>Name: ${data.customerName}</li>
      <li>Email: ${data.customerEmail}</li>
      <li>Phone: ${data.customerPhone}</li>
      <li>Details: ${data.details}</li>
      <li>Start Address: ${data.startAddress.formatted_address}</li>
      <li>End Address: ${data.endAddress.formatted_address}</li>
    </ul>`;
    document.getElementById('wrapper').innerHTML = orderDetails;
    $('#accept').click(function() {
      $('#spinner').show();
      $('#wrapper').hide();
      $.get('/customerAcceptOrder?id=' + id).then(() => {
        window.location.replace('/accept-redirect.html');
      });
    });

    $('#decline').click(function() {
      $('#spinner').show();
      $('#wrapper').hide();
      $.get('/customerRejectOrder?id=' + id).then(() => {
        window.location.replace('/decline-redirect.html')
      });
    });
  });
});
