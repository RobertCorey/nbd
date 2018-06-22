var name, number, email, message, startAddress, endAddress;

function getDataFromDom(event) {
  name = document.getElementById("name").value;
  number = document.getElementById("number").value;
  email = document.getElementById("email").value;
  message = document.getElementById("message").value;

  return {
    customerName: name,
    customerPhone: number,
    customerEmail: email,
    startAddress: getAddress(startAddress),
    endAddress: getAddress(endAddress),
    details: message
  };
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  startAddress = new google.maps.places.Autocomplete(document.getElementById('startAddress'));
  endAddress = new google.maps.places.Autocomplete(document.getElementById('endAddress'));
}

function getAddress (address) {
  let placeObj = address.getPlace();
  if (!!placeObj) {
    return {
      "formatted_address": placeObj.formatted_address,
      "url": encodeURIComponent(placeObj.url)
    };
  } else {
    return 'error';
  }
}

function createNewOrder() {
  $.post('/createOrder', getDataFromDom())
}

$('#orderForm').submit(ev => {
  ev.preventDefault();
  let data = getDataFromDom();
  if(data.startAddress === 'error' || data.endAddress === 'error') {
    return alert("There's a problem with an Address you put in. Make sure you choose an address from the dropdown.");
  }
  $.ajax({
    method: 'POST',
    url: '/createOrder',
    contentType: 'application/json',
    data: JSON.stringify(data)
  }).then(() => {
    window.location.replace('/confirmation-page.html');
  });
});