<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProductFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    /**
     * Summary of message
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please enter the product name is required',
            'name.string' => 'Product name must be a string',
            'name.max' => 'Product name must be at most 255 characters',
            'description.required' => 'Please enter the product description is required',
            'description.string' => 'Product description must be a string',
            'description.max' => 'Product description must be at most 1000 characters',
            'price.required' => 'Please enter the product price is required',
            'price.numeric' => 'Product price must be a number',
            'price.min' => 'Product price must be at least 0',
            'featured_image.required' => 'Please enter the product featured image is required',
            'featured_image.image' => 'Product featured image must be an image',
            'featured_image.mimes' => 'Product featured image must be a jpeg, png, jpg, gif',
            'featured_image.max' => 'Product featured image must be at most 2048 KB',
        ];
    }
}
