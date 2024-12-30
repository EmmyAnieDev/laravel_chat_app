<x-app-layout>
    <div id="frame">
        @include('layouts.sidebar')
        <div class="content">
            <div class="blank-wrap">
                <div class="inner-blank-wrap">Select a user to start messaging</div>
            </div>
            <div class="loader d-none">
                <div class="loader-inner">
                    <l-dot-spinner
                        size="40"
                        speed="0.9"
                        color="green"
                    ></l-dot-spinner>
                </div>
            </div>
            <div class="contact-profile">
                <img src="{{ asset('default-image/avatar.jpeg') }}" alt="" />
                <p class="selected-user-name"></p>
                <div class="social-media">

                </div>
            </div>
            <div class="messages">
                <ul>
{{--                   Dynamic content will go here --}}
                </ul>
            </div>
            <div class="message-input">
                <form action="" method="POST" class="message-form">
                    @csrf
                    <div class="wrap">
                        <input autocomplete="off" type="text" placeholder="Write your message..." name="message" class="message-field"/>
                        <button type="submit" class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <x-slot name="scripts">
        @vite(['resources/js/app.js', 'resources/js/message.js'])
    </x-slot>
</x-app-layout>
