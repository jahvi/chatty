<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::post('pusher/auth', function (Illuminate\Http\Request $request) {
    $pusher = new Pusher(
        config('broadcasting.connections.pusher.key'),
        config('broadcasting.connections.pusher.secret'),
        config('broadcasting.connections.pusher.app_id')
    );

    return $pusher->presence_auth(
        $request->input('channel_name'),
        $request->input('socket_id'),
        uniqid(),
        ['username' => $request->input('username')]
    );
});

Route::resource('messages', 'Message', ['only' => ['index', 'store']]);
