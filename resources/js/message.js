const selectedUser = $('meta[name="selected_user"]');
const baseUrl = $('meta[name="base_url"]').attr('content');
const authUserId = $('meta[name="auth_user_id"]').attr('content');
const inbox = $('.messages ul');


function toggleLoader(){
    $('.loader').toggleClass('d-none');
}

function messageTemplate(text, className){
    return  `<li class="${className}"><img src="${baseUrl}/default-image/avatar.jpeg" alt="" /><p>${text}</p>`
}

function fetchMessages() {
    let userId = selectedUser.attr('content');
    $.ajax({
        method: 'GET',
        url: baseUrl + '/fetch-messages',
        data: { user_id: userId },
        beforeSend: function () {
            toggleLoader()
        },
        success: function (data) {
            setSelectedUserInfo(data.user);

            // append messages to DOM
            inbox.empty();
            data.messages.forEach(value => {
                if(value.sender_id == userId){
                    inbox.append(messageTemplate(value.message, 'sent'));
                }else{
                    inbox.append(messageTemplate(value.message, 'replies'));
                }
            })

            scrollToBottom()
        },
        error: function (xhr, status, error) {},
        complete: function () {
            toggleLoader()
        }
    })
}

function sendMessage() {
    let messageField = $('.message-field');
    let userId = selectedUser.attr('content');
    let formData = $('.message-form').serialize();
    $.ajax({
        method: 'POST',
        url: baseUrl + '/send-message',
        data: formData + '&user_id=' + userId,
        beforeSend: function () {
            let message = messageField.val();
            inbox.append(messageTemplate(message, 'replies'));
            messageField.val('');
        },
        success: function () {

            scrollToBottom()
        },
        error: function (xhr, status, error) {},
    })
}

function setSelectedUserInfo(user) {
    $('.selected-user-name').text(user.name);
}

function scrollToBottom() {
    $('.messages').stop().animate({
        scrollTop: $('.messages')[0].scrollHeight
    })
}

$(document).ready(function () {
    //set selected user id on meta
    $('.contact').on('click', function () {
        let userId = $(this).data('id');
        selectedUser.attr('content', userId);

        // hide the blank wrap
        $('.blank-wrap').addClass('d-none');

        // fetch messages
        fetchMessages();
    })

    $('.message-form').on('submit', function (e) {
        e.preventDefault();
        sendMessage();
    })
})

// Listen to live events.
// You're always listening to your own channel.
window.Echo.private('chat.' + authUserId)
    .listen('SendMessageEvent', (event) => {
        if(event.senderId == selectedUser.attr('content')) {
            inbox.append(messageTemplate(event.message, 'sent'));
            scrollToBottom()
        }
    });


window.Echo.join('online')
    .here(users => {
        users.forEach(user => {
            let element = $(`.contact[data-id='${user.id}']`)
            if(element.length > 0){
                element.find('.contact-status').removeClass('offline');
                element.find('.contact-status').addClass('online');
            }else{
                element.find('.contact-status').addClass('online');
                element.find('.contact-status').removeClass('offline');
            }
        });
    })
    .joining(user => {
        let element = $(`.contact[data-id='${user.id}']`)
        element.find('.contact-status').removeClass('offline');
        element.find('.contact-status').addClass('online');
    })
    .leaving(user => {
        let element = $(`.contact[data-id='${user.id}']`)
        element.find('.contact-status').removeClass('online');
        element.find('.contact-status').addClass('offline');
    });


