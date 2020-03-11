'use strict';

const goods = [
    {title: 'Samsung', price: '15000 &#8381;'},
    {title: 'Iphone 11 Pro', price: '75000 &#8381;', img: "img/phone.png"},
    {title: 'Iphone 11 ProMax', price: '125000 &#8381;', img: "img/phone2.png"},
    {title: 'Iphone 11', price: '65000 &#8381;', img: "img/phone3.png"},
];

const renderGoodsItem = (title, price, img = "http://unsplash.it/250/349?random&gravity=center") => {
    return `<div class="goods-item">
                    <h3>${title}</h3>
                    <img src=${img} alt="${title}">
                    <p>${price}</p>
                    <button>Добавить в корзину</button>
                </div>`;
};

const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.img)).join('');
    document.querySelector('.goods-list').insertAdjacentHTML('beforeend', goodsList);
};

renderGoodsList(goods);
window.addEventListener('load', function () {
    document.querySelector('.goods-item').classList.add('first')
});
let dropCart = window.document.getElementsByClassName('fa-cart-arrow-down')[0];
let dropAll = document.querySelector('.droplist');
dropCart.addEventListener('mouseenter', (event) => {
    dropAll.style.display="flex";
    dropAll.classList.add('zoomIn');
    dropAll.classList.remove('zoomOut');

});
dropAll.addEventListener('mouseleave', (event) => {
    dropAll.classList.remove('zoomIn');
    dropAll.classList.add('zoomOut');
    setTimeout(() => {
        dropAll.style.display="none"}, 1000)
});