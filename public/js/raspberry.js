$(document).ready(function() {

    var server = location.protocol + '//' + location.host;
    var showButtonPlay = $('#showButtonPlay');
    var showButtonPause = $('#showButtonPause');
    var showButtonResume = $('#showButtonResume');
    var showButtonQuit = $('#showButtonQuit');
    var container = $('#error-message');

    $(showButtonPlay).show();
    $(showButtonPause).hide();
    $(showButtonResume).hide();
    $(showButtonQuit).hide();

    $(showButtonPlay).click(function() {
        $.ajax({
            url: server + '/raspberry/play/' + $(this).data('id'),
            type: 'GET',
            cache: false,
            statusCode: {
                200: function (response) {
                    $(showButtonPlay).hide();
                    $(showButtonPause).show();
                    $(showButtonQuit).show();
                },
                404: function (response) {
                    var output = '<div class="alert alert-danger alert-dismissable">' + response.responseJSON.message + '</div>';
                    $(container).show().html(output).delay(3000).fadeOut();
                },
                500: function (response) {
                    var output = '<div class="alert alert-danger alert-dismissable">' + response.responseJSON.message + '</div>';
                    $(container).show().html(output).delay(3000).fadeOut();
                }
            }
        });
    });

    $(showButtonPause).click(function() {
        $.ajax({
            url: server + '/raspberry/pause',
            type: 'GET',
            cache: false,
            statusCode: {
                200: function (response) {
                    $(showButtonPause).hide();
                    $(showButtonResume).show();
                    $(showButtonQuit).show();
                },
                500: function (response) {
                    var output = '<div class="alert alert-danger alert-dismissable">500 Error</div>';
                    $(container).show().html(output).delay(3000).fadeOut();
                }
            }
        });
    });

    $(showButtonResume).click(function() {
        $.ajax({
            url: server + '/raspberry/resume/' + $(this).data('id'),
            type: 'GET',
            cache: false,
            statusCode: {
                200: function (response) {
                    $(showButtonPause).show();
                    $(showButtonResume).hide();
                    $(showButtonQuit).show();
                },
                404: function (response) {
                    var output = '<div class="alert alert-danger alert-dismissable">' + response.responseJSON.message + '</div>';
                    $(container).show().html(output).delay(3000).fadeOut();
                },
                500: function (response) {
                    var output = '<div class="alert alert-danger alert-dismissable">' + response.responseJSON.message + '</div>';
                    $(container).show().html(output).delay(3000).fadeOut();
                }
            }
        });
    });

    $(showButtonQuit).click(function() {
        $.ajax({
            url: server + '/raspberry/quit',
            type: 'GET',
            cache: false,
            statusCode: {
                200: function (response) {
                    $(showButtonPlay).show();
                    $(showButtonPause).hide();
                    $(showButtonResume).hide();
                    $(showButtonQuit).hide();
                },
                500: function (response) {
                    var output = '<div class="alert alert-danger alert-dismissable">500 Error</div>';
                    $(container).show().html(output).delay(3000).fadeOut();
                }
            }
        });
    });
});