<?php

namespace Chatty\Providers;

use Illuminate\Support\ServiceProvider;

class PusherServiceProvider extends ServiceProvider
{
    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('Pusher', function($app) {
            $keys = $app['config']->get('broadcasting.connections.pusher');
            return new \Pusher($keys['key'], $keys['secret'], $keys['app_id']);
        });
    }
}
