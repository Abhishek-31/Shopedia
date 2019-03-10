
var itemCount = 1
function add() {
    var table = $('#tab');
    var string = `<tr id="${itemCount}row">
                      <td id="${itemCount}item"><input type="text" id="${itemCount}inputitem"></td>
                      <td id="${itemCount}num"><input type="text" id="${itemCount}inputnum"></td>
                  </tr>`
    table.append(string)
    itemCount++
    return ;
}

$('#submit').on('click', () => {
    add()
    itemNum = itemCount-2
    console.log(itemNum, `#${itemNum}inputitem`)
    var itemName = $(`#${itemNum}inputitem`).val()
    var itemNumber = $(`#${itemNum}inputnum`).val()
    console.log(itemName, itemNumber)
    $.post('/profile/postitem', {itemName, itemNumber}, function (response) {
        if(response == 200) {
            alert('Success!')
        }
    })
    var string1 = `<td>${itemName}</td>`, string2 = `<td>${itemNum}</td>`
    $(`#${itemCount}item`).replaceWith(string1)
    $(`#${itemCount}num`).replaceWith(string2)
})

$(document).ready(function () {
    console.log('Document Ready')
    $.get('/profile/getItems', function(data) {
        console.log(data)
        for(var i = 0; i < data.items.length; i++) {
            console.log(data.items[i])
            var tableRow = `<tr>
            <td id="${itemCount - 1}item"><input type="text" id="${itemCount - 1}inputitem"></td>
            <td id="${itemCount - 1}num"><input type="text" id="${itemCount - 1}inputnum"></td>
            </tr>`
            itemCount++
            $('#tab').append(tableRow)
            console.log(`ItemName: ${data.items[i].itemName}\nNumber: ${data.items[i].number.toString()}`)
            $(`#${itemCount - 2}inputitem`).val(`${data.items[i].itemName}`)
            $(`#${itemCount - 2}inputnum`).attr('value', `${data.items[i].number.toString()}`)
        }
        var lastRow = `< tr >
            <td id="${itemCount - 1}item"><input type="text" id="${itemCount - 1}inputitem"></td>
                <td id="${itemCount - 1}num"><input type="text" id="${itemCount - 1}inputnum"></td>
            </tr>`
        $('#tab').append(lastRow)        
        })
})