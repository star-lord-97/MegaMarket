<?php

namespace App\Http\Controllers;

use App\Models\Product;

class CategoryController extends Controller
{
    public function index()
    {
        return Product::pluck('category');
    }

    public function show($category)
    {
        if ($category == 'sale') {
            return Product::where('sale', true)->with('mainImage')->get();
        } else {
            return Product::where('category', $category)->with('mainImage')->get();
        }
    }
}
