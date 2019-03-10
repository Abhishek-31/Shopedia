const mongoose = require('mongoose')

const User = require('./../models/user-models')

function degreesToRadians (degrees) {return degrees * Math.PI / 180
}
//Send firstly latitude and secondly longitude. obj will also return the id of shopkeeper.

var filterShops = (consumer, shops) => {
    lat2 = consumer.latitude;
    lon2 = consumer.longitude;
    var a = [];
    for(var i = 0; i < shops.length; i++) {
        var earthRadiusKm = 6371
        console.log(shops[i].shopId)
        User.findById(shops[i].shopId)
        .then(shopInfo => {
            lat1 = shopInfo.location.latitude;
            lon1 = shopInfo.location.longitude;
            var dLat = degreesToRadians(lat2 - lat1);
            var dLon = degreesToRadians(lon2 - lon1);
            
            lat1 = degreesToRadians(lat1);
            lat2 = degreesToRadians(lat2);
            
            var b = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.atan2(Math.sqrt(b), Math.sqrt(1 - b));
            a.push({ distance: earthRadiusKm * c, id: shopInfo._id });
        })
    }
        a.sort(function (a, b) {
            return a.distance - b.distance;
        })
        console.log(a)
        return a
}

module.exports = { filterShops }