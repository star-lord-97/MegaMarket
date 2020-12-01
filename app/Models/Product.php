<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function setImageAttribute($value)
    {
        $this->attributes['image'] = asset('/img/default-product.png');
    }

    // public function getImageAttribute($value)
    // {
    //     return asset($value ?: '/img/default-product.png');
    // }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
