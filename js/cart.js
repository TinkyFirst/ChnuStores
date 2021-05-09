'use strict';

window.cart = (function () {
    let modal = window.modal;
    let utils = window.utils;

    let elems = {
        open: '#cart-button',
        close: '.close',
        cancel: '.clear-cart',
        modal: '.modal',
        modalBody: '.modal-body',
        total: '.modal-pricetag'
    };
    elems = utils.applySelector(elems);

    let products = [];

    let self = {
        init: init,
        add: add,
        render: render,
        visible: visible
    };

    function init() {
        elems.open.addEventListener("click", modal.toggle(elems.modal));
        elems.close.addEventListener("click", modal.toggle(elems.modal));
        elems.modalBody.addEventListener('click', changeCount);
        elems.cancel.addEventListener('click', cancel);

        products = JSON.parse(localStorage.getItem('chnu-store.cart')) || [];

        render();
    }

    function add(card) {
        let product = {
            id: card.id,
            name: card.querySelector('.card-title').textContent,
            price: card.querySelector('.card-price-bold').textContent,
            count: 1
        };

        let store = findById(product.id);
        if (store) {
            product = store;
            store.count++;
        } else {
            products.push(product);
        }

        localStorage.setItem('chnu-store.cart', JSON.stringify(products));

        render();
    }

    function render() {
        elems.modalBody.textContent = '';

        products.forEach(function (item) {
            const itemCart = `
                <div class="store-row">
					<span class="store-name">${item.name}</span>
					<strong class="store-price">${item.price}</strong>
					<div class="store-counter">
						<button class="counter-button counter-minus" data-id=${item.id}>-</button>
						<span class="counter">${item.count}</span>
						<button class="counter-button counter-plus" data-id=${item.id}>+</button>
					</div>
				</div>
            `;
            elems.modalBody.insertAdjacentHTML('afterbegin', itemCart);
        });

        const sum = products.reduce(function (res, item) {
            return res + parseFloat(item.price) * item.count;
        }, 0)
        elems.total.textContent = sum + '  ₴';
    }

    function visible(isVisible) {
        elems.open.style.display = isVisible ? 'flex' : 'none';
    }

    function findById(id) {
        return products.find(function (item) { return item.id === id; });
    }

    function changeCount(event) {
        const target = event.target;
        if (target.classList.contains('counter-button')) {
            const store = findById(target.dataset.id);
            if (target.classList.contains('counter-minus')) {
                store.count--;
                if (store.count === 0) {
                    const idx = products.indexOf(store);
                    products.splice(idx, 1);
                }
            }
            if (target.classList.contains('counter-plus')) {
                store.count++;
            }
            localStorage.setItem('chnu-store.cart', JSON.stringify(products));

            render();
        }
    }

    function cancel() {
        products.length = 0;
        localStorage.removeItem('chnu-store.cart');
        render();
    }

    return self;
}());
