const mongoose = require('mongoose')

const User = require('./../models/user-models')

function degreesToRadians (degrees) {return degrees * Math.PI / 180
}
//Send firstly latitude and secondly longitude. obj will also return the id of shopkeeper.

var filterShops = (consumer, shops) => {
    console.log('Inside filterSHops')
    lat2 = parseFloat(consumer.latitude);
    lon2 = parseFloat(consumer.longitude);
    var a = [], i = 0, count = 0
    while (i < shops.length) {
        console.log(i)
        User.findById(shops[i].shopId)
        .then(shopInfo => { 
            lat1 = shopInfo.location.latitude;
            lon1 = shopInfo.location.longitude;
            var distance = Math.sqrt(Math.pow(((lat1 * lat1) - (lat2 * lat2)), 2) + Math.pow((lon1 * lon1) - (lon2 * lon2), 2))
            a.push({distance, id: shopInfo._id})
            // console.log(a)
            console.log(i)
            count++;
            if(count === shops.length - 1) {
                a.sort(function (a, b) {
                    return a.distance - b.distance;
                })
                console.log(a)
                // return new Promise(function (resolve, reject) {
                //         resolve(a);
                // })
                return a
            } 
        })
        i++;
    }
}

module.exports = { filterShops }


//     var earthRadiusKm = 6371;
    //     
    //         var dLat = degreesToRadians(lat2 - lat1);
    //         var dLon = degreesToRadians(lon2 - lon1);

    //         // lat1 = degreesToRadians(lat1);
    //         // lat2 = degreesToRadians(lat2);
    //         var b = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    //         var c = 2 * Math.atan2(Math.sqrt(b), Math.sqrt(1 - b));
    //         a.push({ distance: earthRadiusKm * c, id: shopInfo._id });
    //         // console.log(a)
    //         i++;
    //         console.log(i, shops.length)
    //         if (i === shops.length - 1) {
    //             console.log(a, i)
    //           
    //         }
    //     })