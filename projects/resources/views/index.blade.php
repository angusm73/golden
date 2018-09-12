@extends('layouts.app')

@section('content')
<div class="container" id="app">
    <div class="content">
        <div class="title m-b-md">
            Angus.Digital Projects
        </div>

        <div class="links">
            <a href="{{ route('login') }}">Login</a>
        </div>
    </div>
</div>
@endsection
