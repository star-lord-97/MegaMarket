<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        return Product::paginate(10);
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required|string|max:255',
            'discreption' => 'required|string',
            'units' => 'required',
            'price' => 'required',
            'image' => '',
        ]);

        // if ($request->image) {
        //     $attributes['image'] = $request->avatar->store('products');
        // }

        Product::create($attributes);
    }

    public function update(Request $request, Product $product)
    {
        $attributes = $request->validate([
            'name' => 'required|string|max:255',
            'discreption' => 'required|string',
            'units' => 'required',
            'price' => 'required',
            'image' => '',
        ]);

        // if ($request->image) {
        //     $attributes['image'] = $request->avatar->store('products');
        // }

        $product->update($attributes);
    }

    public function destroy(Product $product)
    {
        $product->delete();
    }
}
