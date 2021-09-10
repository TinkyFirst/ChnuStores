'use strict';

window.modal = (function() {
    let self = {
        toggle: toggleModal
    };

    function toggleModal(elem) {
        return function() {
            elem.classList.toggle("is-open");
        }
    }

    return self;
}());
