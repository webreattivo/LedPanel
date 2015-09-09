Dropzone.options.uploadMedia = {
    url: "/media/upload",
    maxFiles: 1,
    init: function () {
        this.on("success", function (file, response) {
            $('#nameMedia').val(file.name);
            $('#submitSave').prop('disabled', false);
        });
    }
};