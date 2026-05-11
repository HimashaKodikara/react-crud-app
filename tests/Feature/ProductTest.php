<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

// ─── index.tsx: Product list page ────────────────────────────────────────────

test('guest cannot view product list', function () {
    $this->get(route('manageproduct.index'))
        ->assertRedirect(route('login'));
});

test('authenticated user can view product list page', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('manageproduct.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('products/index'));
});

test('product list includes existing products', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create(['name' => 'Test Widget']);

    $this->actingAs($user)
        ->get(route('manageproduct.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('products/index')
            ->has('products', 1)
            ->where('products.0.name', 'Test Widget')
        );
});

// ─── product-form.tsx: Create page ───────────────────────────────────────────

test('authenticated user can view the create product page', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('manageproduct.create'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('products/product-form'));
});

test('authenticated user can create a product without image', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('manageproduct.store'), [
            'name'        => 'New Product',
            'description' => 'A nice product',
            'price'       => 199.99,
        ])
        ->assertRedirect(route('manageproduct.index'));

    $this->assertDatabaseHas('products', ['name' => 'New Product', 'price' => 199.99]);
});

test('authenticated user can create a product with an image', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('manageproduct.store'), [
            'name'           => 'Product With Image',
            'description'    => 'Has a photo',
            'price'          => 50,
            'featured_image' => UploadedFile::fake()->image('photo.jpg'),
        ])
        ->assertRedirect(route('manageproduct.index'));

    $this->assertDatabaseHas('products', ['name' => 'Product With Image']);
    Storage::disk('public')->assertExists(
        Product::where('name', 'Product With Image')->first()->featured_image
    );
});

test('product name is required on create', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('manageproduct.store'), [
            'description' => 'Missing name',
            'price'       => 10,
        ])
        ->assertSessionHasErrors('name');
});

test('product price is required on create', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('manageproduct.store'), [
            'name'        => 'No Price Product',
            'description' => 'Missing price',
        ])
        ->assertSessionHasErrors('price');
});

// ─── product-form.tsx: View page ─────────────────────────────────────────────

test('authenticated user can view a product detail page', function () {
    $user    = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($user)
        ->get(route('manageproduct.show', $product))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('products/product-form')
            ->where('isView', true)
            ->where('product.id', $product->id)
        );
});

// ─── product-form.tsx: Edit page ─────────────────────────────────────────────

test('authenticated user can view the edit product page', function () {
    $user    = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($user)
        ->get(route('manageproduct.edit', $product))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('products/product-form')
            ->where('isEdit', true)
        );
});

test('authenticated user can update a product', function () {
    $user    = User::factory()->create();
    $product = Product::factory()->create(['name' => 'Old Name']);

    $this->actingAs($user)
        ->put(route('manageproduct.update', $product), [
            'name'        => 'Updated Name',
            'description' => 'Updated description',
            'price'       => 99,
        ])
        ->assertRedirect(route('manageproduct.index'));

    $this->assertDatabaseHas('products', ['id' => $product->id, 'name' => 'Updated Name']);
});

// ─── index.tsx: Delete action ─────────────────────────────────────────────────

test('authenticated user can delete a product', function () {
    $user    = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($user)
        ->delete(route('manageproduct.destroy', $product))
        ->assertRedirect();

    $this->assertDatabaseMissing('products', ['id' => $product->id]);
});

test('guest cannot delete a product', function () {
    $product = Product::factory()->create();

    $this->delete(route('manageproduct.destroy', $product))
        ->assertRedirect(route('login'));

    $this->assertDatabaseHas('products', ['id' => $product->id]);
});
