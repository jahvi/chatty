<?php

namespace Chatty\Http\Controllers;

use Event;
use Chatty\Events\MessagePublished;
use Chatty\Http\Controllers\Controller;
use Chatty\Http\Requests;
use Chatty\Message as MessageModel;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {
        $message = $this->messages->create($request->input());

        Event::fire(new MessagePublished($message));

        return response($message, 201);
    }
}
