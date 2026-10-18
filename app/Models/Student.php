<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'classroom',
        'gender',
    ];

    public function borrowing(): HasMany
    {
        return $this->hasMany(Borrowing::class);
    }
}
