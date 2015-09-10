$(document).ready(function() {

    var server = location.protocol + '//' + location.host;
    var buttonPlay = $('#buttonPlay');
    var buttonPause = $('#buttonPause');
    var buttonResume = $('#buttonResume');
    var buttonQuit = $('#buttonQuit');
    var buttonVolUp = $('#buttonVolUp');
    var buttonVolDown = $('#buttonVolDown');
    var container = $('#errorMessage');
    var containerResponseVolume = $('#volMessage');
    var volume = $('#volume');

    $(buttonPlay).show();
    $(buttonPause).hide();
    $(buttonResume).hide();
    $(buttonQuit).hide();
    $(containerResponseVolume).hide();
    $(volume).hide();

    $(buttonPlay).click(function() {
        $.ajax({
            url: server + '/raspberry/play/' + $(this).data('id'),
            type: 'GET',
            cache: false,
            statusCode: {
                200: function (response) {
                    $(buttonPlay).hide();
                    $(buttonPause).show();
                    $(buttonQuit).show();
                    $(volume).show();
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

    $(buttonPause).click(function() {
        $.ajax({
            url: server + '/raspberry/pause',
            type: 'GET',
            cache: false,
            statusCode: {
                200: function (response) {
                    $(buttonPause).hide();
                    $(buttonResume).show();
                    $(buttonQuit).show();
                    $(volume).hide();
                },
                500: function (response) {
                    var output = '<div class="alert alert-danger alert-dismissable">500 Error</div>';
                    $(container).show().html(output).delay(3000).fadeOut();
                }
            }
        });
    });

    $(buttonResume).click(function() {
        $.ajax({
            url: server + '/raspberry/resume/' + $(this).data('id'),
            type: 'GET',
            cache: false,
            statusCode: {
                200: function (response) {
                    $(buttonPause).show();
                    $(buttonResume).hide();
                    $(buttonQuit).show();
                    $(volume).show();
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

    $(buttonQuit).click(function() {
        $.ajax({
            url: server + '/raspberry/quit',
            type: 'GET',
            cache: false,
            statusCode: {
                200: function (response) {
                    $(buttonPlay).show();
                    $(buttonPause).hide();
                    $(buttonResume).hide();
                    $(buttonQuit).hide();
                    $(volume).hide();
                },
                500: function (response) {
                    var output = '<div class="alert alert-danger alert-dismissable">500 Error</div>';
                    $(container).show().html(output).delay(3000).fadeOut();
                }
            }
        });
    });

    $(buttonVolUp).click(function() {
        $.ajax({
            url: server + '/raspberry/vol/up',
            type: 'GET',
            cache: false,
            statusCode: {
                200: function (response) {
                    var output = '<div class="alert alert-success">Vol Up</div>';
                    $(containerResponseVolume).show().html(output).delay(3000).fadeOut();
                },
                500: function (response) {
                    var output = '<div class="alert alert-danger alert-dismissable">500 Error</div>';
                    $(containerResponseVolume).show().html(output).delay(3000).fadeOut();
                }
            }
        });
    });

    $(buttonVolDown).click(function() {
        $.ajax({
            url: server + '/raspberry/vol/down',
            type: 'GET',
            cache: false,
            statusCode: {
                200: function (response) {
                    var output = '<div class="alert alert-success">Vol Down</div>';
                    $(containerResponseVolume).show().html(output).delay(3000).fadeOut();
                },
                500: function (response) {
                    var output = '<div class="alert alert-danger">500 Error</div>';
                    $(containerResponseVolume).show().html(output).delay(3000).fadeOut();
                }
            }
        });
    });
});