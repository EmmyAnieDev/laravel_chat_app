const selectedUser = $('meta[name="selected_user"]');
const baseUrl = $('meta[name="base_url"]').attr('content');

function fetchMessages() {
    let userId = selectedUser.attr('content');
    console.log(userId);
    $.ajax({
        method: 'GET',
        url: baseUrl + '/fetch-messages',
        data: { user_id: userId },
        beforeSend: function () {},
        success: function (data) {
            setSelectedUserInfo(data.user);
        },
        error: function (xhr, status, error) {}
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
})
