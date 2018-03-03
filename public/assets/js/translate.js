
define(function (require) {
    var translate = require('translate');
    translate.engine = 'yandex';
    translate.key = 'trnsl.1.1.20180228T235240Z.c50a73fab700d266.d87e32c47eece8504a90611e96df3157747050fe';
    translate("Hello", "es").then(text => {
        console.log(text);
    });
    //Define this module as exporting a function
    return function () {
        translate.doSomething();
    };
})