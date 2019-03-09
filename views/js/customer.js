var latitude = "", longitude = "", locationString = ""

$('#clickme').on('click', function () {
    console.log('Geolocation Invoked')
    // Adds latitude and longitude through geolocation, then adds address through geocode API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            $.get('http://open.mapquestapi.com/geocoding/v1/reverse?key=0HO6jMSCWxZuVAS7aMaNsT0XeezdvR09&location='+latitude+','+longitude+'&includeRoadMetadata=true&includeNearestIntersection=true', function (data) {
                locationString = data.results[0].locations[0].street + ',' + data.results[0].locations[0].adminArea6 + ',' + data.results[0].locations[0].adminArea5 + ',' + data.results[0].locations[0].adminArea4 + ',' + data.results[0].locations[0].adminArea3 + ',' + data.results[0].locations[0].adminArea1
            })
        })
    }
})
// If geolocation is rejected, the latitude and longitude is found through the address entered by the user

$('#submit').on('click', function () {
    var shopName = $('#shopName').val()
    if(!latitude || !longitude || !locationString || !shopName) {
        alert('Please make sure all fields are properly filled')
    }
    $.post('/profile/postshop', { latitude, longitude, locationString, shopName }, function(response) {
        console.log(response)
    })
})