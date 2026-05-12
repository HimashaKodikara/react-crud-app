<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\RedirectResponse;
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
        return Inertia::render('products/product-form', [
            'product' => $manageproduct,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductFormRequest $request, Product $manageproduct)
    {
        try {
            $manageproduct->name = $request->name;
            $manageproduct->description = $request->description;
            $manageproduct->price = $request->price;

            if ($request->file('featured_image')) {
                $featuredImage = $request->file('featured_image');
                $featuredImageOriginalName = $featuredImage->getClientOriginalName();
                $featuredImageName = $featuredImage->store('products', 'public');

                $manageproduct->featured_image = $featuredImageName;
                $manageproduct->featured_image_original_name = $featuredImageOriginalName;
            }

            $manageproduct->save();

            return redirect()->route('manageproduct.index')->with('success', 'Product updated successfully');
        } catch (Exception $e) {
            Log::error('Product update failed: '.$e->getMessage());

            return redirect()->back()->with('error', 'Unable to update product.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $manageproduct)
    {
        try {
            if ($manageproduct) {
                $manageproduct->delete();

                return redirect()->back()->with('success', 'Product deleted successfuly');
            }

            return redirect()->back()->with('error', 'Unable to delete product. Please try again later');
        } catch (Exception $e) {
            Log::error('Product deletion failed: '.$e->getMessage());

            return redirect()->back()->with('error', 'Unable to delete product.Please try again later');
        }
    }
}
