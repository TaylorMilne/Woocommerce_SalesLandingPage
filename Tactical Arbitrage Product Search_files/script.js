$(document).ready(function()
{
    /*
	$('button.btn-danger, .glyphicon-remove').click(function(){
      	if (confirm("Are you sure, Click OK to continue?")) return true;
      	else return false;
	});
    */
	$('form#selectCategory').submit(function() {
		var level0 = $('select[name="level0"]').val();
		var level1 = $('select[name="level1"]').val();
		var level2 = $('select[name="level2"]').val();
		var level3 = $('select[name="level3"]').val();
		var selectedstring = 'level0='+ level0 + '&level1='+ level1 + '&level2='+ level2 + '&level3='+ level3;
		//alert(selectedstring);
		$("div#result").html("");
		$.ajax
		({
			type: "GET",
			url: "addAjaxCategory.php",
			data: selectedstring,
			cache: false,
			success: function(html)
			{
				$("div#result").html(html);
			}
		});
		return false;
	});

	/*for (var postKey in postData){
	    if (typeof postData[postKey] !== 'function') {
	       //  alert("Key is " + k + ", value is" + target[k]);
	         $('select[name="' + postKey + '"]').val(postData[postKey]);
	         $('input[name="' + postKey + '"]').val(postData[postKey]);

			 var categories = postData["category"].split(':');
			 $.each(categories, function(i, category) {
				$('input[value="' + category + '"]').prop('checked', true);
			});
	    }
	}*/

	$(".category").change(function()
	{
		var level = parseInt($(this).attr('id'));

		for (i = level; i <= 3; i++) {
			var selection = "div#level" + i;
			$(selection + " select").attr("disabled", true);
			$(selection).hide();
		}
		var id=$(this).val();
		var dataString = 'id='+ id;

		$.ajax
		({
			type: "POST",
			url: "subcategory.php",
			data: dataString,
			cache: false,
			success: function(html)
			{
				$("div#level" + level).show();
				$("div#level" + level + " select").removeAttr('disabled');
				$("select." + level).html(html);
			}
		});
	});

	$('[data-toggle="popover"]').popover();

});