<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BorrowingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $borrowings = Borrowing::with(['student', 'book'])->get();

        return Inertia::render('borrowings/index', compact('borrowings'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $students = Student::orderBy('name')->get();
        $books = Book::where('stock', '>', 0)->orderBy('title')->get();

        return Inertia::render('borrowings/create', compact('students', 'books'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'book_id' => 'required|exists:books,id',
            'borrowing_date' => 'required|date',
            'return_date' => 'nullable|date|after_or_equal:borrowing_date',
        ]);

        $book = Book::findOrFail($validated['book_id']);

        if ($book->stock < 1) {
            return back()->withErrors(['book_id' => 'Stok buku sudah habis']);
        }

        Borrowing::create($validated);
        $book->decrement('stock');

        return redirect()->route('borrowings.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Borrowing $borrowing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Borrowing $borrowing)
    {
        $borrowing->load(['student', 'book']);
        $students = Student::orderBy('name')->get();
        $books = Book::orderBy('title')->get();

        return Inertia::render('borrowings/edit', compact('borrowing', 'students', 'books'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Borrowing $borrowing)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'book_id' => 'required|exists:books,id',
            'borrowing_date' => 'required|date',
            'return_date' => 'nullable|date|after_or_equal:borrowing_date',
        ]);

        // Jika sebelumnya belum dikembalikan dan sekarang diisi return_date, kembalikan stok buku                                                                                                                                    
        if (empty($borrowing->return_date) && !empty($validated['return_date'])) {
            $borrowing->book->increment('stock');
        }

        $borrowing->update($validated);

        return redirect()->route('borrowings.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Borrowing $borrowing)
    {
        if (empty($borrowing->return_date)) {
            $borrowing->book->increment('stock');
        }

        $borrowing->delete();

        return redirect()->route('borrowings.index');
    }
}
