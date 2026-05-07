<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('products/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/product-form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return RedirectResponse
     */
    public function store(ProductFormRequest $request)
    {
        try {
            $featuredImage = null;
            $featuredImageOriginalName = null;

            if ($request->hasFile('featured_image')) {
                $file = $request->file('featured_image');
                $featuredImageOriginalName = $file->getClientOriginalName();
                $featuredImage = $file->store('products', 'public');
            }

            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'featured_image' => $featuredImage,
                'Featured_image_original_name' => $featuredImageOriginalName,
            ]);

            if ($product) {
                return redirect()->route('manageproduct.index')->with('success', 'Product created successfully');
            }

            return redirect()->route('manageproduct.index')->with('error', 'Unable to create product.');
        } catch (Exception $e) {
            Log::error('Product creation failed: '.$e->getMessage());

            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
