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

    mix.scripts([
        'node_modules/angular/angular.js',
        'node_modules/pusher-js/dist/pusher.js',
        'node_modules/pusher-angular/lib/pusher-angular.js',
        'resources/assets/js/app.js',
        'resources/assets/js/controllers/*.js',
        'resources/assets/js/services/*.js'
    ], 'public/js/all.js', '.');
});
