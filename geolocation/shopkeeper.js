document.getElementById("clickme").onclick = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            var position = "Latitude is " + latitude + " Longitude is " + longitude;
            document.getElementById("result").innerHTML = position;
        }
        )
    }
};
module.exports = {
    slatitude: latitude,
    slongitude: longitude
}