<?php

namespace App;

use App\Message;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
    
    //Defining An Accessor that first letter of name capital (upper case first name)
    public function getNameAttribute($value)
    {
        return ucfirst($value);
    }

    public function messages()
    {
        return $this->hasMany('App\Message');
    }
}
