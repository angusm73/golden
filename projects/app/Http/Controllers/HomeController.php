<?php

namespace Angus\Http\Controllers;

use Angus\Project;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application home page
     *
     * @return void
     */
    public function index()
    {
        return view('index');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function dashboard()
    {
        $this->middleware('auth');
        $projects = Project::all();
        return view('home', compact('projects'));
    }
}
