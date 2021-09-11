function Delete(e) {
    let items = [];
    JSON.parse(localStorage.getItem('items')).map(data => {
        if (data.id != e.parentElement.parentElement.children[1].textContent) {
            alert(e.parentElement.parentElement.children[1].textContent)
            items.push(data);

        }
    });
    localStorage.setItem('items', JSON.stringify(items));
    window.location.reload();
};

function cartUpdate(id, no) {

    var cartObj = JSON.parse(localStorage.getItem('items'));

    var oldItem = this.find(id, cartObj)
    var itemIndex = cartObj.findIndex(x => x.id === id);

    var quantityCurrent = document.getElementsByClassName('quantity form-control input-number')[itemIndex].value;

    var updatedItem = Object.assign({}, cartObj[itemIndex], { no: quantityCurrent })

    cartObj[itemIndex] = updatedItem;
    alert(JSON.stringify(cartObj[itemIndex]))
    // //Save back to storage
    localStorage.setItem('items', JSON.stringify(cartObj))
    window.location.reload();
}
window.onload = function () {
    //cart box
    const iconShopping = document.querySelector('.iconShopping');
    // const cartCloseBtn = document.querySelector('.fa-close');
    const cartBox = document.querySelector('.mycartlala');
    // iconShopping.addEventListener("click", function () {
    // 	cartBox.classList.add('active');
    // });
    // cartCloseBtn.addEventListener("click", function () {
    // 	cartBox.classList.remove('active');
    // });

    // adding data to localstorage
    const attToCartBtn = document.getElementsByClassName('text py-3 pb-4 px-3 text-center');


    const attToCartBtn = document.getElementsByClassName('product add');

    const attImage = document.getElementsByClassName('img-fluid');

    let items = [];
    for (let i = 0; i < attToCartBtn.length; i++) {

        attToCartBtn[i].addEventListener("click", function (e) {
            // alert('Name: ' + attToCartBtn[i].children[0].children[0].textContent)
            if (typeof (Storage) !== 'undefined') {
                let item = {
                    id: i + 1,
                    name: attToCartBtn[i].parentElement.children[0].children[1].children[0].textContent,
                    price: attToCartBtn[i].children[1].children[1].children[0].children[0].textContent,
                    sale: attToCartBtn[i].parentElement.children[0].children[0].children[1].textContent,
                    image: attImage[i].src,
                    no: 1
                };

                if (JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("items"));
                    localItems.map(data => {
                        if (item.id == data.id) {
                            item.no = data.no + 1;
                        } else {
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
                    window.location.reload();
                }
            } else {
                alert('local storage is not working on your browser');
            }
        });
    }

    // adding data to shopping cart 
    const iconShoppingP = document.querySelector('.iconShopping a');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(data => {
        no = no + Number.parseInt(data.no);
    });
    iconShoppingP.innerHTML = no;


    const cardBoxTable = cartBox.querySelector('table');
    let tableData = '';
    tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';
    if (JSON.parse(localStorage.getItem('items'))[0] === null) {
        tableData += '<tr><td colspan="5">No items found</td></tr>'
    } else {
        JSON.parse(localStorage.getItem('items')).map(data => {
            tableData += '<tr><th>' + data.id + '</th><th>' + data.name + '</th><th>' + data.no + '</th><th>' + data.price + '</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
        });
    }
    cardBoxTable.innerHTML = tableData;

    //adding cartbox data in table
    const cardBoxTable = cartBox.querySelector('table');
    let tableData = '';
    tableData +=
        '<thead class="thead-primary">' +
        '<tr class="text-center">' +
        '<th>&nbsp;</th>' +
        '<th>&nbsp;</th>' +
        '<th>Image</th>' +
        '<th>Product Name</th>' +
        '<th>Quantity</th>' +
        '<th>Price</th>' +
        '</tr>' +
        '</thead>';

    if (JSON.parse(localStorage.getItem('items'))[0] === null) {
        tableData += '<tr><td colspan="5">No items found</td></tr>'
    } else {
        JSON.parse(localStorage.getItem('items')).map(data => {
            tableData +=
                '<tbody>' +
                '<tr class="text-center">' +
                '<td class="product-remove"><a href="#" onclick=Delete(this);><span class="ion-ios-close"></span></a></td>' +
                '<td class="idUpdate">' + data.id + '</td>' +
                '<td class="image-prod">' + '<div class="img" style="background-image:url(' + data.image + ');"></div>' + '</td>' +
                '<td class="product-name">' + data.name + '</td>' +
                '<td class="quantity">' + '<div class="input-group mb-3">' + '<input id="quantities" onChange=cartUpdate(' + data.id + ',' + data.no + '); type="number" name="quantity" class="quantity form-control input-number" value="' + data.no + '" min="1" max="100"></div>' + '</td>' +
                '<td class="price">' + data.price + '</td>' +
                '</tr>' +
                '</tbody>';

        });
    }
    cardBoxTable.innerHTML = tableData;
}