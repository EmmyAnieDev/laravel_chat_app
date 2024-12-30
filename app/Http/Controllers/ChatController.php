<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendMessageRequest;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use function Symfony\Component\String\s;

class ChatController extends Controller
{
    function index()
    {

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
    function fetchMessages(Request $request)
    {

        $user = User::findOrFail($request->user_id);

        $messages = Message::where('sender_id', Auth::user()->id)->where('receiver_id', $request->user_id)
           ->orWhere('sender_id', $request->user_id)->where('receiver_id', Auth::user()->id)->get();

        return response()->json([
            'user' => $user,
            'messages' => $messages
        ]);
    }


    function sendMessage(SendMessageRequest $request)
    {

        $message = Message::create([
            'sender_id' => Auth::user()->id,
            'receiver_id' => $request->user_id,
            'message' => $request->message,
        ]);

        return response()->json([
            'success' => true,
            'message' => $message,
        ]);
    }

}
