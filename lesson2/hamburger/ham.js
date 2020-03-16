'use strict';

class Gamburger {
    constructor(container = '.main_product') {
        this.container = container;
        this.goods = [];
        this.stuffing = [];
        this.topping = [];
        this.addBurger = [];
        this.addToppingsInObject = [];
        this._fetchProducts();
        this._renderProduct();
        this._renderStuffing();
        this._renderTopping();
    }

    _fetchProducts() {
        this.goods = [
            {title: 'Gamburger', price: 50, calories: 20, img: "img/Gamburger.png"},
            {title: 'BigTasty', price: 100, calories: 40, img: "img/big_tasty.png"},
        ];
        this.stuffing = [
            {title: 'cheese', price: 10, calories: 20, img: "img/4.png"},
            {title: 'salad', price: 20, calories: 5, img: "img/1.png"},
            {title: 'potato', price: 15, calories: 10, img: "img/3.png"},
        ];
        this.topping = [
            {title: 'seasoning', price: 15, calories: 0, img: "img/5.png"},
            {title: 'mayonnaise', price: 20, calories: 5, img: "img/2.png"},
        ]
    }

    _renderProduct() {
        const divForProducts = document.querySelector(this.container);
        this.goods.forEach(product => {
            const productObject = new ProductItem(product.title, product.price, product.calories, product.img);
            divForProducts.insertAdjacentHTML('afterbegin', productObject.render());
        })
    }

    _renderStuffing() {
        const divForStuffing = document.querySelector('.stuffing');
        this.stuffing.forEach(product => {
            const stuffingObject = new StuffingItem(product.title, product.price, product.calories, product.img);
            divForStuffing.insertAdjacentHTML('beforeend', stuffingObject.render())
        })
    }

    _renderTopping(){
        const divForTopping = document.querySelector('.topping');
        this.topping.forEach(product => {
            const toppingObject = new ToppingItem(product.title, product.price, product.calories, product.img);
            divForTopping.insertAdjacentHTML('beforeend', toppingObject.render())
        })
    }

    addTopping(event){
        let parentDiv = event.currentTarget.parentNode.parentNode;
        let title = parentDiv.dataset.name;
        let id = parentDiv.dataset.id;
        let img = parentDiv.children[0].dataset.img;
        let price = parentDiv.dataset.price;
        let calories = parentDiv.dataset.calories;
        let objectTopping = {id: id, title: title, img: img, price: price, calories: calories};
        this.addToppingsInObject.push(objectTopping);
    }

    removeTopping(event){
        let parentDiv = event.currentTarget.parentNode.parentNode;
        let title = parentDiv.dataset.name;
        this.addToppingsInObject.forEach((object, index) =>{
            if(object.title === title){
                this.addToppingsInObject.splice(index, 1);
            }
        });
    }

    addBurToObj(event){
        let parentDiv = event.currentTarget.parentNode.parentNode;
        let title = parentDiv.dataset.name;
        let img = parentDiv.children[0].dataset.img;
        let price = parentDiv.dataset.price;
        let calories = parentDiv.dataset.calories;
        let objectBurger = {title: title, img: img, price: price, calories: calories};
        if(this.addBurger.length === 0){
            this.addBurger.push(objectBurger);
        }else {
            this.addBurger = [];
            this.addBurger.push(objectBurger);
        }
    }

    getToppings(){
        let toppings = '';
        for(let elem of this.addToppingsInObject){
            if(elem.id === "topping"){
                toppings += `${elem.title} \n`
            }
        }
        return toppings;
    }
    getSize(){
        let burgerSize = '';
        if(this.addBurger.length > 0){
            burgerSize = this.addBurger[0].title === "Gamburger" ? "Маленький" : "Большой";
        }
        return burgerSize;
    }
    getStuffing(){
        let stuffing = '';
        for (let elem of this.addToppingsInObject){
            if(elem.id === "stuffing"){
                stuffing += `${elem.title} \n`
            }
        }
        return stuffing;
    }
    calculatePrice(){
        let gamburgerPrice = 0;
        if(this.addBurger.length > 0){
            gamburgerPrice = +this.addBurger[0].price
        }
        let sum = this.addToppingsInObject.reduce((accumulator, good) => accumulator + Number(good.price), gamburgerPrice);
        return sum;
    }

    renderPriceAndCalories(){
        document.querySelector('.totalPrice').innerText = `${this.calculatePrice()}`;
        document.querySelector('.totalCalories').innerText = `${this.calculateCalories()}`;
    }
    calculateCalories(){
        let gamburgerKkal = 0;
        if(this.addBurger.length > 0){
            gamburgerKkal = +this.addBurger[0].calories
        }
        let sum = this.addToppingsInObject.reduce((accumulator, good) => accumulator + Number(good.calories), gamburgerKkal);
        return sum;
    }

}


class ToppingItem  {
    constructor(title, price, calories, img) {
        this.title = title;
        this.price = price;
        this.calories = calories;
        this.img = img;
    }

    render(){
        return `<div class="topping_one" data-id="topping" data-name="${this.title}" data-price="${this.price}" data-calories="${this.calories}">
                    <img src="${this.img}" alt="${this.title} img" data-img="${this.img}">
                    <div class="desc" data-price="${this.price}">
                        <h3>${this.title}</h3>
                        <p>${this.price}  &#8381;</p>
                        <p>${this.calories}  kkal</p>
                    </div>
                    <div>
                        <input type="checkbox" name="choose">
                    </div>
                </div>`;
    }
}

class StuffingItem {
    constructor(title, price, calories, img) {
        this.title = title;
        this.price = price;
        this.calories = calories;
        this.img = img;
    }

    render() {
        return `<div class="stuffing_one" data-id="stuffing" data-name="${this.title}" data-price="${this.price}" data-calories="${this.calories}">
                    <img src="${this.img}" alt="${this.title} img" data-img="${this.img}">
                    <div class="desc" data-price="${this.price}">
                        <h3>${this.title}</h3>
                        <p>${this.price}  &#8381;</p>
                        <p>${this.calories}  kkal</p>
                    </div>
                    <div><input type="checkbox" class="required" name="choose"></div>
                    
                </div>`;
    }
}

class ProductItem {
    constructor(title, price, calories, img = 'https://placehold.it/200x150') {
        this.title = title;
        this.calories = calories;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<div class="product_item" data-name="${this.title}" data-price="${this.price}" data-calories="${this.calories}">
                <img src="${this.img}" alt="${this.title} img" data-img="${this.img}">
                <div class="checkbox"><input type="radio" name="ham"></div>
                <div class="desc" data-price="${this.price}">
                    <h3>${this.title}</h3>
                    <p>${this.price}  &#8381;</p>
                    <p>${this.calories}  kkal</p>
                </div>
            </div>`;
    }
}


const myMag = new Gamburger();

const ham = document.getElementsByName('ham');

document.querySelectorAll('input[name=choose]').forEach(check =>{
    check.addEventListener('change', function (event) {
        let status = false;

        for (let i = 0; i < ham.length; i++){
            if(ham[i].checked){
                status = true;
            }
        }
        if(status){
            if(check.checked){
                myMag.addTopping(event)
            }else {
                myMag.removeTopping(event)
            }
        }else{
            check.checked = false;
            alert('Выберите гамбургер');
        }
        myMag.renderPriceAndCalories();
    })
});

ham.forEach(radiobtn => {
    radiobtn.addEventListener('change', function (event) {
        if(radiobtn.checked){
            document.querySelectorAll('input[name=choose]').forEach(check =>{
                check.checked = false;
                myMag.addToppingsInObject = [];
            });
            myMag.addBurToObj(event)
        }
        myMag.renderPriceAndCalories();
    })
});

document.querySelector('.btn_topAndSuf').addEventListener('click', () => {
    alert(`Размер Вашего бургера: \n\n${myMag.getSize()}\n\n
    Ваши добавки: \n\n${myMag.getToppings()}\n\n 
    Ваши начинки: \n\n${myMag.getStuffing()}`)
});

document.querySelector('.btn_buy').addEventListener('click' , (event) => {
    let count = 0;
    document.querySelectorAll('.required').forEach( checkRequred =>{
        if (checkRequred.checked){
            count++
        }
    });
    if(count === 0){
        event.stopPropagation();
        alert("Нужно выбрать хотя бы одну добавку")
    }
});