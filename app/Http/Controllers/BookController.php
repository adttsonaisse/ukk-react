<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::with(['category', 'publisher', 'author'])->get();

        return Inertia::render('books/index', compact('books'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $authors = Author::all();
        $publishers = Publisher::all();

        return Inertia::render('books/create', compact('categories', 'authors', 'publishers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'author_id' => 'required|exists:authors,id',
            'publisher_id' => 'required|exists:publishers,id',
            'year' => 'required|digits:4|integer|min:1900|max:' . (date('Y') + 1),
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'stock' => 'required|integer|min:0'
        ]);

        if ($request->hasFile('image_url')) {
            $validated['image_url'] = $request->file('image_url')->store('books', 'public');
        }

        Book::create($validated);

        return redirect()->route('books.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        $categories = Category::all();
        $authors = Author::all();
        $publishers = Publisher::all();

        return Inertia::render('books/edit', compact('book', 'categories', 'authors', 'publishers'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'author_id' => 'required|exists:authors,id',
            'publisher_id' => 'required|exists:publishers,id',
            'year' => 'required|digits:4|integer|min:1900|max:' . (date('Y') + 1),
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'stock' => 'required|integer|min:0'
        ]);

        if ($request->hasFile('image_url')) {
            if ($book->image_url && Storage::disk('public')->exists($book->image_url)) {
                Storage::disk('public')->delete($book->image_url);
            }
            $validated['image_url'] = $request->file('image_url')->store('books', 'public');
        } else {
            unset($validated['image_url']);
        }

        /**
         * destroy
         *
         * @param Book $book
         * @return void
         */
        $book->update($validated);

        return redirect()->route('books.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        if ($book->image_url && Storage::disk('public')->exists($book->image_url)) {
            Storage::disk('public')->delete($book->image_url);
        }

        $book->delete();

        return redirect()->route('books.index');
    }
}
