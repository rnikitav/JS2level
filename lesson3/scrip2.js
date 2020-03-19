'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

//Переделать в ДЗ
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error'); //reject
                } else {
                    resolve(xhr.responseText);   //resolve
                }
            }
        };
        xhr.send();
    });
};

class ProductList {
    constructor(container = '.goods-list', totalPrice = '.totalPriceMain') {
        this.container = container;
        this.totalPrice = totalPrice;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
        // this._getProducts()
        //     .then((data) => {
        //         this.goods = [...data];
        //         this._render();
        //         this._renderSum();
        //     });
    }

    _fetchProducts() {
        getRequest(`${API}/catalogData.json`).then((data) => {
            data = JSON.parse(data);
            this.goods = [...data];
            this._render();
            this._renderSum();
            new EventListenerToBasket();
        }).catch((error) => {
            console.log(error);
        })
    }

    // _getProducts() {
        //     return fetch(`${API}/catalogData.json`)
        //         .then(result => result.json())
        //         .catch(error => {
        //             console.log('Не удалось загрузить файл', error);
        //         });
        // }

    _render() {
        const divForProducts = document.querySelector(this.container);
        this.goods.forEach(product => {
            const productObject = new ProductItem(product.product_name, product.id_product, product.price, product.img);
            this.allProducts.push(productObject);
            divForProducts.insertAdjacentHTML('beforeend', productObject.render());
        })
    }

    _renderSum() {
        let divForPrice = document.querySelector(this.totalPrice);
        let sum = this.goods.reduce((accumulator, good) => accumulator + +good.price, 0);
        let sumPrice = `Общая сумма товаров равна: ${sum}  &#8381;`;
        divForPrice.insertAdjacentHTML('afterbegin', sumPrice);
    }
}

class ProductItem {
    constructor(title, id, price, img = 'https://placehold.it/200x150') {
        this.title = title;
        this.id = id;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="${this.title} img">
                <div class="desc" data-price="${this.price}">
                    <h3>${this.title}</h3>
                    <p>${this.price}  &#8381;</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}

new ProductList();


class Basket {


    constructor(container = '.Cartdroplist') {
        this.container = container;
        this.productsObjectInBasket = [];
    }

    _renderProductInBasket(product) {
        let showProductInDiv = `
                <div class="myCartdrop__one" data-id="${product.id}">
                    <a href="#"><img src=${product.img} alt="${product.title}"> </a>
                    <div class="myCart__drop_right">
                        <a href="#">
                            <h3>${product.title}</h3>
                        </a>
                        <p><span class="totalSpan">1</span><span class="basket-span"> x </span> ${product.price} &#8381;</p>
                    </div>
                    <i class="fas fa-trash-alt btn-delete"></i>
                </div>
        `;
        let divInnerCart = document.querySelector(this.container);
        divInnerCart.insertAdjacentHTML('afterbegin', showProductInDiv);
    }


    _renderTotalPrice() {
        let sum = this.productsObjectInBasket.reduce((accumulator, good) => accumulator + (Number(good.price) * Number(good.count)), 0);
        document.querySelector('.totalPrice_basket').innerText = sum;
        console.log(sum);
    }


    _eventListenerDelete() {
        let deleteBtns = document.querySelectorAll('.btn-delete');
        deleteBtns.forEach(function (button) {
            button.addEventListener('click', myCart._deleteProductFromBasket)
        })
    }

    _deleteProductFromBasket(event){
        let deleteDiv = event.target.parentNode;
        let totalSpan = deleteDiv.querySelector('.totalSpan');
        let idOfDel = deleteDiv.dataset.id;
        if(totalSpan.innerText === "1"){
            deleteDiv.remove();
            for (let elem = 0; elem < myCart.productsObjectInBasket.length; elem++){
                if (myCart.productsObjectInBasket[elem].id === idOfDel){
                myCart.productsObjectInBasket.splice(elem, 1);
                }
            }
        }else {
            totalSpan.innerText--;
            myCart.productsObjectInBasket.forEach(product => {
                if(product.id === idOfDel){
                    product.count--;
                }
            })
        }
       myCart._renderTotalPrice();
    }


    _fetchProductsInBasket(event) {
        let parentDivOfBtn = event.currentTarget.parentNode.parentNode;
        let id = parentDivOfBtn.dataset.id;
        let img = parentDivOfBtn.children[0].currentSrc;
        let title = parentDivOfBtn.children[1].children[0].innerText;
        let price = parentDivOfBtn.children[1].dataset.price;
        let find = this.productsObjectInBasket.find(elem => elem.id === id);
        if (find) {
            let productExist = document.querySelector(`.myCartdrop__one[data-id="${id}"]`);
            productExist.querySelector('.totalSpan').innerText++;
            find.count += 1;
        } else {
            let product = {
                id: id,
                title: title,
                img: img,
                price: price,
                count: 1,
            };
            this.productsObjectInBasket.push(product);
            this._renderProductInBasket(product);

        }
        this._renderTotalPrice();
        this._eventListenerDelete();
    }
}

let myCart = new Basket();



// Добавляем слушатель событий для кнопки корзины
class EventListenerToBasket {
    constructor(containerForBasketIconClick = '.fa-cart-arrow-down', containerForDropList = '.Cartdroplist') {
        this.dropCart = document.querySelector(containerForBasketIconClick);
        this.dropList = document.querySelector(containerForDropList);
        this._addClick();
        this._addMouseLeave();
        this._addButton();
    }

    _addClick(){
        this.dropCart.addEventListener('click', () => {
            this.dropList.style.display = "flex";
            this.dropList.classList.add('zoomIn');
            this.dropList.classList.remove('zoomOut');

        });
    }

    _addButton(){
        const buttons = document.querySelectorAll('.buy-btn');
        buttons.forEach(function (button) {
            button.addEventListener('click', function (event) {
                myCart._fetchProductsInBasket(event);
            })
        });
    }

    _addMouseLeave(){
        this.dropList.addEventListener('mouseleave', () => {
            this.dropList.classList.remove('zoomIn');
            this.dropList.classList.add('zoomOut');
            setTimeout(() => {
                this.dropList.style.display = "none"
            }, 1000)
        })
    }
}