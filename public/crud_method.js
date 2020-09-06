function delete_event(id, list)
{
    var data = {
        "list" : list
    }
    $.ajax({
        type: 'DELETE',
        url: '/items/' + id,
        contentType: 'application/json',
        data: JSON.stringify(data),
    }).done(function () {
        setTimeout(function(){
            location.reload();
        }, 500);
    }).fail(function (error) {
        var msg = error.responseText;
        $("#error_banner").html(msg);
        setTimeout(function(){
            $("#error_banner").html("");
        }, 2000)
    });
}

function delete_list_event(name)
{
    $.ajax({
        type: 'DELETE',
        url: '/lists/' + name
    }).done(function () {
        setTimeout(function(){
            location.reload();
        }, 500);
    }).fail(function (error) {
        var msg = error.responseText;
        $("#error_banner").html(msg);
        setTimeout(function(){
            $("#error_banner").html("");
        }, 2000)
    });
}

$(document).ready(function() {
    $('#update_done').on("change", function() {
        if($(this).is(':checked')) {
            $(this).attr('value', "true");
        }
        else {
            $(this).attr('value', "false");
        }
    });
    $('form#update_item_event').submit(function(e) {
        e.preventDefault();
        var id = $('input[name=item_id]').val();
        var content = $('input[name=update_content]').val();
        var list = $('input[name=current_list]').val();
        var done = ($('input[name=update_done]').val() == "true") ? true : false;
        var data = {
            "content": content,
            "list": list,
            "done": done
        }
        $.ajax({
            type: 'PUT',
            url: '/items/' + id,
            contentType: 'application/json',
            data: JSON.stringify(data),
        }).done(function () {
            setTimeout(function(){
                location.reload();
            }, 500);
        }).fail(function (error) {
            var msg = error.responseText;
            $("#error_banner").html(msg);
            setTimeout(function(){
                $("#error_banner").html("");
            }, 2000)
        });
    });

    $('form#create_item_event').submit(function(e) {
        e.preventDefault();
        var content = $('input[name=create_content]').val();
        var list = $('input[name=current_list]').val();
        var data = {
            "content": content,
            "list": list
        }
        $.ajax({
            type: 'POST',
            url: '/items/',
            contentType: 'application/json',
            data: JSON.stringify(data),
        }).done(function () {
            setTimeout(function(){
                location.reload();
            }, 500);
        }).fail(function (error) {
            var msg = error.responseText;
            $("#error_banner").html(msg);
            setTimeout(function(){
                $("#error_banner").html("");
            }, 2000)
        });
    });

    $('form#create_list_event').submit(function(e) {
        e.preventDefault();
        var content = $('input[name=list_name]').val();
        var data = {
            "list_name": content
        }
        $.ajax({
            type: 'POST',
            url: '/lists',
            contentType: 'application/json',
            data: JSON.stringify(data),
        }).done(function () {
            setTimeout(function(){
                location.reload();
            }, 500);
        }).fail(function (error) {
            var msg = error.responseText;
            $("#error_banner").html(msg);
            setTimeout(function(){
                $("#error_banner").html("");
            }, 2000)
        });
    });
});