var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');

    mix.babel([
        'resources/assets/js/app.js',
        'resources/assets/js/controllers/*.js',
        'resources/assets/js/services/*.js'
    ]);

    mix.scripts([
        'node_modules/angular/angular.js',
        'node_modules/moment/moment.js',
        'node_modules/identicon.js/pnglib.js',
        'node_modules/identicon.js/identicon.js',
        'node_modules/pusher-js/dist/pusher.js',
        'node_modules/angularjs-scroll-glue/src/scrollglue.js',
        'node_modules/ng-focus-on/ng-focus-on.js',
        'node_modules/ngstorage/ngStorage.js',
        'node_modules/pusher-angular/lib/pusher-angular.js',
        'node_modules/angular-moment/angular-moment.js',
        'node_modules/angular-identicon/dist/angular-identicon.js',
        'public/js/all.js'
    ], 'public/js/all.js', '.');
});
