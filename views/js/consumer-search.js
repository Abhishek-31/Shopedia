
var latitude = "", longitude = "", locationString = ""

$('#clickme').on('click', function () {
    // Adds latitude and longitude through geolocation, then adds address through geocode API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log(latitude, longitude)
            $.get('http://open.mapquestapi.com/geocoding/v1/reverse?key=0HO6jMSCWxZuVAS7aMaNsT0XeezdvR09&location=' + latitude + ',' + longitude + '&includeRoadMetadata=true&includeNearestIntersection=true', function (data) {
                locationString = data.results[0].locations[0].street + ',' + data.results[0].locations[0].adminArea6 + ',' + data.results[0].locations[0].adminArea5 + ',' + data.results[0].locations[0].adminArea4 + ',' + data.results[0].locations[0].adminArea3 + ',' + data.results[0].locations[0].adminArea1
                // Remove adjacent commas
                locationString = locationString.replace(/,*,/g, ',')
                if (locationString[0] === ',') {
                    locationString = locationString.replace(',', '')
                }
                $('input[name=location]').val(locationString)
            })
        })
    }
})

$('#submit').on('click', function (e) {
    var itemName = $('#itemName').val()
    e.preventDefault()
    if (!latitude || !longitude || !itemName) {
        alert('Please make sure all fields are properly filled')
    }
    console.log(itemName)
    $.post('/consumer/search', { latitude, longitude, itemName }, function (response) {
        // console.log(response)
        if (response === 'No item found') {
            alert('No Shops found selling this item')
        } else {
            console.log(response)
        }
    })
})