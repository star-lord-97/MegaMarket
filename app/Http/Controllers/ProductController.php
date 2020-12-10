<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        return Product::latest()->paginate(8);
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
            'image' => 'file|required',
        ]);

        $attributes['image'] = $request->image->store('products');

        Product::create($attributes);
    }

    public function update(Request $request, Product $product)
    {
        $attributes = $request->validate([
            'name' => 'required|string|max:255',
            'discreption' => 'required|string',
            'units' => 'required',
            'price' => 'required',
        ]);

        $product->update($attributes);
    }

    public function destroy(Product $product)
    {
        $product->delete();
    }
}
