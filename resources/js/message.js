const selectedUser = $('meta[name="selected_user"]');
const baseUrl = $('meta[name="base_url"]').attr('content');
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
        success: function () { },
        error: function (xhr, status, error) {},
    })
}

function setSelectedUserInfo(user) {
    $('.selected-user-name').text(user.name);
}

$(document).ready(function () {
    //set selected user id on meta
    $('.contact').on('click', function () {
        let userId = $(this).data('id');
        selectedUser.attr('content', userId);

        // fetch messages
        fetchMessages();
    })

    $('.message-form').on('submit', function (e) {
        e.preventDefault();
        sendMessage();
    })
})
