function getDataFromDom(event) {
  var name = document.getElementById("name").value;
  var number = document.getElementById("number").value;
  var email = document.getElementById("email").value;
  var address1 = document.getElementById("address1").value;
  var address2 = document.getElementById("address2").value;
  var message = document.getElementById("message").value;

  return {
    customerName: name,
    customerNumber: number,
    customerEmail: email,
    startAddress: address1,
    endAddress: address2,
    details: message
  };
}

function createNewOrder() {
  $.post('/createOrder', getDataFromDom())
}
$('#orderForm').submit(ev => {
  console.log(ev);
  ev.preventDefault();
})