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
        $products = Product::latest()->get()->map(fn ($product) => [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'featured_image' => $product->featured_image,
            'created_at' => $product->created_at->format('d-M-Y'),
        ]);

        return Inertia::render('products/index', [
            'products' => $products,
        ]);
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
    public function show(Product $manageproduct)
    {
        return Inertia::render('products/product-form', [
            'product' => [
                'id' => $manageproduct->id,
                'name' => $manageproduct->name,
                'description' => $manageproduct->description,
                'price' => $manageproduct->price,
                'featured_image' => $manageproduct->featured_image,
            ],
            'isView' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $manageproduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $manageproduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $manageproduct)
    {
        //
    }
}
