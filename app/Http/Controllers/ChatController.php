<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    function index() {

        $users = User::where('id', '!=', auth()->user()->id)->get();

        return view('dashboard', compact('users'));
    }


    /**
     * Fetch the authenticated user's details and their associated messages.
     *
     * This function retrieves a user's information from the database based on the provided `user_id`.
     * Additionally, it fetches all messages associated with the user through a defined relationship.
     * The data is returned as a JSON response, including the user's details and a list of their messages.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     */
    function fetchMessages(Request $request) {

        $user = User::findOrFail($request->user_id);

        return response()->json([
            'user' => $user,
        ]);
    }
}
