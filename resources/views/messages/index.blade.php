@extends('layouts.app')

@section('styles')
  
@endsection


@section('content')
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <h2>Online users</h2>
        <hr>
        <h5 id="no-onlie-users">No online users</h5>
        <ul class="list-group" id="online-users">

        </ul>
      </div>

      <div class="col-md-9 flex-column" style="height: 70vh">
        <div class="mb-4 p-5" id="chat" style="overflow-y: auto; height: 100%; background-color: white; margin-bottom: 20px; padding: 20px">
          @foreach($messages as $message)
            
            <div class="m-3 p-2 w-50 p-3 {{ auth()->user()->id == $message->user_id ? 'f-right bg-primary rounded-recive' : 'f-left bg-send rounded-send' }}">
              <p>{{ $message->user->name }}</p>
              <p>{{ $message->body }}</p>
            </div>
            <div class="clearfix"></div>
            
          @endforeach
        </div>
        <form action="" style="display: flex; margin-bottom: 30px">
          <input type="text" data-url="{{ route('messages.store') }}" id="chat-text" style="margin-right: 15px" class="form-control">
          <button class="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  </div>
@endsection