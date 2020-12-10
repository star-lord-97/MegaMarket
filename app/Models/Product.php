<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function getImageAttribute($value)
    {
        return asset('storage/' . $value ?: 'storage/products/default-product.png');
    }


    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
