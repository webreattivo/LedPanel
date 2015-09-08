$(document).ready(function() {

    var server = location.protocol + '//' + location.host;
    var showButtonPlay = $('#showButtonPlay');
    var showButtonPause = $('#showButtonPause');
    var showButtonResume = $('#showButtonResume');
    var showButtonQuit = $('#showButtonQuit');

    $(showButtonPlay).show();
    $(showButtonPause).hide();
    $(showButtonResume).hide();
    $(showButtonQuit).hide();

    $(showButtonPlay).click(function() {
        $(showButtonPlay).hide();
        $(showButtonPause).show();
        $(showButtonQuit).show();
        $.get(server + '/raspberry/play/' + $(this).data('id'));
    });

    $(showButtonPause).click(function() {
        $(showButtonPause).hide();
        $(showButtonResume).show();
        $(showButtonQuit).show();
        $.get(server + '/raspberry/pause');
    });

    $(showButtonResume).click(function() {
        $(showButtonPause).show();
        $(showButtonResume).hide();
        $(showButtonQuit).show();
        $.get(server + '/raspberry/resume');
    });

    $(showButtonQuit).click(function() {
        $(showButtonPlay).show();
        $(showButtonPause).hide();
        $(showButtonResume).hide();
        $(showButtonQuit).hide();
        $.get(server + '/raspberry/quit');
    });
});