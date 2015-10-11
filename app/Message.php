<?php

namespace Chatty;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['username', 'message'];
}
