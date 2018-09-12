<?php

namespace Angus;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public $fillable = ['name', 'description', 'start_date', 'deadline', 'status', 'progress', 'project_url'];

    public function client()
    {
        $this->belongsTo(User::class);
    }
}
