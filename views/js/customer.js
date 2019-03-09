document.getElementById("clickme").onclick = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        }
        )
    }
};
module.exports={
    latitude:latitude,
    longitude:longitude
}