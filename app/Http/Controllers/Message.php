<?php

namespace Chatty\Http\Controllers;

use Chatty\Http\Requests;
use Illuminate\Http\Request;
use Chatty\Events\MessagePublished;
use Chatty\Message as MessageModel;
use Chatty\Http\Controllers\Controller;
use Illuminate\Contracts\Events\Dispatcher;

class Message extends Controller
{
    private $messages;

    public function __construct(MessageModel $messages)
    {
        $this->messages = $messages;
    }

    /**
     * Display last 20 messages
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->messages->orderBy('id', 'desc')->take(20)->get()->reverse();
    }

    /**
     * Store a newly created message
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Dispatcher $event)
    {
        $message = $this->messages->create($request->input());

        $event->fire(new MessagePublished($message));

        return response($message, 201);
    }
}
