
function degreesToRadians (degrees) {return degrees * Math.PI / 180
}
//Send firstly latitude and secondly longitude. obj will also return the id of shopkeeper.

var filterShops = (consumer, shops) => {
    lat2 = consumer.latitude;
    lon2 = consumer.longitude;
    var a = [];
    obj.shops.forEach(function(shop){ 
        var earthRadiusKm = 6371
        lat1=shops.location.latitude;
        lon1=shops.location.longitude;
        var dLat = degreesToRadians(lat2 - lat1);
        var dLon = degreesToRadians(lon2 - lon1);

        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        a.push({distance:earthRadiusKm * c,id:obj.id});
    })
        a.sort(function (a, b) {
            return a.distance - b.distance;
        })
}

module.exports = { filterShops }