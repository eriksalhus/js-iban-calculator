requirejs.config({
    urlArgs: 'v=' + Math.random(),

    paths: {
        'jquery': 'vendor/jquery',
        'backbone': 'vendor/backbone',
        'underscore': 'vendor/underscore',
        'hogan': 'vendor/hogan',
        'hgn': 'vendor/plugin/hgn',
        'text': 'vendor/plugin/text',
        'handlebars': 'vendor/customHandlebars',
        'hb': 'vendor/plugin/hb',
        'json': 'vendor/plugin/json'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        }

    }
});


define(['jquery', 'modules/app/app'],

    function ($, App) {

        $(document).ready(function () {
            var app = new App({el: $(".iban")});
            app.run();
        });

    });

