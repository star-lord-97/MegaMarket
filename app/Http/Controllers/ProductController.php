<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::latest()->with('mainImage')->get();
    }

    public function show(Product $product)
    {
        return $product->load('mainImage', 'sizes');
    }
}
