'use strict';

window.utils = (function() {
    let self = {
        applyFunction: applyFunction,
        applySelector: applySelector,
        getData: getData
    };

    function applyFunction(obj, fun, context) {
        let res = {};
        Object.keys(obj).forEach(function(key) {
            res[key] = fun.call(context, obj[key]);
        });
        return res;
    }

    function applySelector(obj) {
        return self.applyFunction(obj, document.querySelector, document);
    }

    async function getData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Can\'t read data from ${url}. Status code: ${response.status}`);
        }
        return await response.json();
    }

    return self;
}());
