<?php

use Mockery as m;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class PusherAuthTest extends \TestCase
{
    use WithoutMiddleware;

    /**
     * Pusher instance mock
     *
     * @var Pusher
     */
    protected $pusher;

    /**
     * Http request mock
     *
     * @var Illuminate\Http\Request
     */
    protected $request;

    /**
     * Set up mocks for dependencies
     */
    public function setUp()
    {
        parent::setUp();

        $this->pusher  = m::mock(Pusher::class);
        $this->request = m::mock(Illuminate\Http\Request::class);

        $this->app->instance(Pusher::class, $this->pusher);
        $this->app->instance(Illuminate\Http\Request::class, $this->request);
    }

    /**
     * Test that a user can subscribe to a pusher channel
     *
     * @return void
     */
    public function testCanSubscribeMemberToPusherChannel()
    {
        $this->request
            ->shouldReceive('input')
            ->times(3)
            ->andReturn('foo');

        $this->pusher
            ->shouldReceive('presence_auth')
            ->once()
            ->with('foo', 'foo', m::type('string'), ['username' => 'foo']);

        $this->call('POST', 'pusher/auth');

        $this->assertResponseOk();
    }
}
