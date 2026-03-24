<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Instrument extends Model
{
    /** @use HasFactory<\Database\Factories\InstrumentFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'year',
        'image',
        'amount',
        'category_id'
    ];

    public function category() {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    protected static function booted()
    {
        self::deleted(function (Instrument $instrument) {
            try {
                if (empty($instrument->image)) {
                    return;
                }
                $parsedPath = parse_url($instrument->image, PHP_URL_PATH);
                if (! is_string($parsedPath) || ! str_starts_with($parsedPath, '/storage/')) {
                    return;
                }
                $relative = ltrim(substr($parsedPath, strlen('/storage/')), '/');
                if ($relative !== '') {
                    Storage::disk('public')->delete($relative);
                }
            } catch (Throwable) {
            }
        });
    }
}
