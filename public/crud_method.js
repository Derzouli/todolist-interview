function delete_event(id)
{
	$.ajax({
		type: 'DELETE',
		url: '/todo/delete/' + id
	}).done(function () {
		setTimeout(function(){
			location.reload();
		}, 500);
	}).fail(function () {
		$("#error_banner").html("ERROR: not able to delete item");
		setTimeout(function(){
			$("#error_banner").html("");
		}, 2000)
	});
}

$(document).ready(function() {
	$('form#update_item_event').submit(function(e) {
		e.preventDefault();
		var id = $('input[name=item_id]').val();
		var content = $('input[name=item_content]').val();
		var data = {
			"item_content": content
		}
		$.ajax({
			type: 'PUT',
			url: '/todo/update/' + id,
			contentType: 'application/json',
			data: JSON.stringify(data),
		}).done(function () {
			setTimeout(function(){
				location.reload();
			}, 500);
		}).fail(function () {
			$("#error_banner").html("ERROR: not able to update item");
			setTimeout(function(){
				$("#error_banner").html("");
			}, 2000)
		});
	});

	$('form#create_item_event').submit(function(e) {
		e.preventDefault();
		var content = $('input[name=create_item]').val();
		var data = {
			"create_item": content
		}
		$.ajax({
			type: 'POST',
			url: '/todo/create/',
			contentType: 'application/json',
			data: JSON.stringify(data),
		}).done(function () {
			setTimeout(function(){
				location.reload();
			}, 500);
		}).fail(function () {
			$("#error_banner").html("ERROR: not able to create item");
			setTimeout(function(){
				$("#error_banner").html("");
			}, 2000)
		});
	});
});