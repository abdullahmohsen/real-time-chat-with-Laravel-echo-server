

require('./bootstrap');


import { data } from "jquery";
import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});

let onlineUsersLength = 0;

window.Echo.join(`online`)
    .here((users) => {

        onlineUsersLength = users.length;

        if (users.length > 1) {
            $('#no-onlie-users').css('display', 'none');
        }

        //Get the Id of user that make login 
        let userId = $('meta[name=user-id]').attr('content');
        // console.log(userId);

        users.forEach(function(user){
            if (userId == user.id) {
                return;
            }

            $('#online-users').append(`<li id="user-${user.id}" class="list-group-item"><span style="color:green;" class="fas fa-circle"></span> ${user.name}</li>`);
        })
        // console.log(users);
    })
    .joining((user) => {
        onlineUsersLength++;
        $('#no-onlie-users').css('display', 'none');
        $('#online-users').append(`<li id="user-${user.id}" class="list-group-item"><span style="color:green;" class="fas fa-circle"></span> ${user.name}</li>`);

    })
    .leaving((user) => {
        onlineUsersLength--;
        if (onlineUsersLength == 1) {
            $('#no-onlie-users').css('display', 'block');
        }
        $('#user-' + user.id).remove();
    });

$('#chat-text').keypress(function(e){

    if (e.which == 13) {
        e.preventDefault();
        let body = $(this).val();
        // console.log(body);
        let url = $(this).data('url');
        // console.log(url);
        let userName = $('meta[name=user-name]').attr('content');
        // console.log(userName);

        $(this).val('');

        $('#chat').append(`
            <div class="m-3 p-2 w-50 p-3 f-right bg-primary rounded-recive">
                <p>${userName}</p>
                <p>${body}</p>
            </div>
            <div class="clearfix"></div>
        `)

        let data = {
            '_token': $('meta[name=csrf-token]').attr('content'),
            body //bod: body
        }
        // console.log(data);

        $.ajax({
            url: url,
            method: 'post',
            data: data,
        })
    }
    // console.log(e.which);

})


window.Echo.channel('chat-group')
    .listen('MessageDelivered', (e) => {
        // console.log(e.message.body);
        // console.log(e.message);
        // console.log(e);
        let userName = $('meta[name=user-name]').attr('content');
        // console.log(userName);


        // <p>${e.message.user.name}</p>

        $('#chat').append(`
            <div class="m-3 p-2 w-50 p-3 f-left bg-send rounded-send">
                
                <p>${userName}</p>
                <p>${e.message.body}</p>
            </div>
            <div class="clearfix"></div>
        `)
    });
    