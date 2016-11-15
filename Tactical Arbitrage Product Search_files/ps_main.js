(function($) {

	$("body").on("click", '#note code',function() {
		if ( $(this).find('b').length > 0 ) {
			$('#category').val( $(this).find('b').html().replace(/\&amp;/g,'&') );
		} else {
			$('#category').val( $(this).html().replace(/\&amp;/g,'&') );
		}
	});

	if ($('#use_bulk').prop('checked')) {
		if ($('.bulk_categories').length > 0) {
			$('.bulk_categories').show();
			$('#category, #spage, #lpage').prop('disabled', true);
		} else {
			$(this).prop('checked', false);
		}
	}

	$("#use_bulk").on("change", function() {
		if ($(this).prop('checked')) {
			if ($('.bulk_categories').length > 0) {
           		$('.bulk_categories').show();
           		$('#post_domain_select').val( $('#sel_domain option:selected').first().val() );
           	} else {
            	$('#bulk_categories').modal('show');
			}
			$('#use_csv_wholesale').prop('checked', false).change();
			$('#category, #spage, #lpage').prop('disabled', true);
		} else {
			$('.bulk_categories').hide();
			$('#category, #spage, #lpage').prop('disabled', false);
		}
	});

   	$('#sel_domain').on('change', function(){
   		selected_cat = $('#sel_domain option:selected');
   		$('.selected_domain').val( selected_cat.attr('data-domain') );
       	if (selected_cat.attr('data-type') == '1') {
           	$('#note').html( selected_cat.attr('data-user_note') );
       	} else {
           	$('#note').html( selected_cat.attr('data-user_note') );
       	}
   	});

	if ($('#sel_domain option:selected').length > 0) {
		$('#sel_domain option:selected').first().click();
		$('#sel_domain').change().trigger('change');
	} else {
    	$('#sel_domain option').first().click();
    	$('#sel_domain').change().trigger('change');
  	}

  	$('a.helper').on('mouseover', function() {
    	$(this).trigger('click');
    });

    $('a.helper').on('mouseout', function() {
    	$(this).trigger('click');
    	$('.popover').remove();
    });

    if ($('#use_csv_wholesale').prop('checked')) {
		if ($('.csv_wholesale_file').length > 0) {
			$('#ws_params').show();
			$('#sel_domain, #category, #spage, #lpage').prop('disabled', true).change();
		} else {
			$(this).prop('checked', false);
		}
	}

	$("#use_csv_wholesale").on("change", function() {
		if ($(this).prop('checked')) {
			if ($('.csv_wholesale_file').length > 0) {
           		$('#ws_params').show();
           	} else {
            	$('#csv_wholesale').modal('show');
			}
			$('#use_bulk').prop('checked', false).change();
			$('#sel_domain, #category, #spage, #lpage').prop('disabled', true).change();
		} else {
			$('#ws_params').hide();
			$('#sel_domain, #category, #spage, #lpage').prop('disabled', false).change();
		}
	});

})(jQuery);

(function($) {
    $('#ranks_max').bind("keyup", function() {
	    var elem = $(this)
	        , return_val;
	    return_val = elem.val().replace(/[^\d]/g, "").replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
	    elem.val(return_val);
	});

	$('#sel_domain').on('change', function(event){
       	event.preventDefault();
       	var domain = '';
		var myRe = /([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/g;
		while ((myArray = myRe.exec($('#sel_domain option:selected').attr('data-domain'))) != null) {
			domain = myArray[0];
			break;
		}
		// window.open("http://www."+domain, '_blank');
		if (domain != '') {
        	$('#site_url').attr('href', "http://www."+domain).show();
        } else {
        	$('#site_url').hide();
        }
        $('#price_reduce_1').val($('#sel_domain option:selected').attr('data-adj1'));
        $('#price_reduce_2').val($('#sel_domain option:selected').attr('data-adj2'));
        $('#price_reduce_3').val($('#sel_domain option:selected').attr('data-adj3'));
   	});
})(jQuery);


function cb(start, end) {
    $('.daterange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
}
cb(moment().subtract(29, 'days'), moment());

$('.daterange').daterangepicker({
	locale: {
		format: 'YYYY-MM-DD'
	},
	startDate: moment().subtract(7, 'days'),
	maxDate: new Date(),
	endDate: moment(),
	ranges: {
	   'Last 7 Days': [moment().subtract(7, 'days'), moment()],
	   'Last 14 Days': [moment().subtract(14, 'days'), moment()],
	   'Last 30 Days': [moment().subtract(30, 'days'), moment()],
	   'This Month': [moment().startOf('month'), moment().endOf('month')],
	   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	}
}, cb);


// SAVED FILTER SET
$('#save_filter_set').on('click', function() {
    if ($('#new_filter_set_name').val() != '0') {
		var serialize = $('#filters input').serializeArray();
		var value = JSON.stringify(serialize);
		var name = $('#new_filter_set_name').val();

		jQuery.ajax({
			url:  window.location.href,
			type: 'post',
			data: {
				ajax: true,
				action: 'save_filter_set',
				name: name,
				value: value,
				type: 'ps'
			},
			success: function(data) {
				data = jQuery.parseJSON(data);
				if (data.id) {
					$('#saved_filters').append("<option value='"+data.id+"' data-value='"+value+"'>"+name+"</option>");
					$('#saved_filters option').prop('selected', false);
					$('#saved_filters option').last().prop('selected', true);
					$('#remove_filter_set').prop('disabled', false);
					$('#new_filter_set_name').val('');
					$('#new_filter_set_name, #save_filter_set').prop('disabled', true);
				}
			}
		});
	}
});

$('#remove_filter_set').on('click', function() {
	var id = $('#saved_filters').val();
    if (id != '') {
		jQuery.ajax({
			url:  window.location.href,
			type: 'post',
			data: {
				ajax: true,
				action: 'remove_filter_set',
				id: id,
				type: 'ps'
			},
			success: function(data) {
				data = jQuery.parseJSON(data);
				if (data.success) {
					$('#saved_filters option[value="'+id+'"]').remove();
					$('#saved_filters option').first().prop('selected', true);
					$('#saved_filters').val('0').change();
				}
			}
		});
	}
});

$('#saved_filters').on('change', function() {
    // $('#filters input[type="text"]').val('');
	$('#filters input[type="text"]').each(function() {
		if ( $.inArray( $(this).attr("name"), ['price_reduce_1', 'price_reduce_2', 'price_reduce_3'] ) == -1 ) {
			$(this).val('');
		}
	});
	$('#filters input[type="checkbox"]').prop('checked', false);
	if ($(this).val() == '0') {
		$('#remove_filter_set, #new_filter_set_name, #save_filter_set').prop('disabled', true);
		if ( $(this).find('option:selected').html() != 'select' ) {
			data = jQuery.parseJSON( $(this).find('option:selected').attr('data-value') );
	        jQuery.each(data, function(index,obj) {
	        	if ( ($.inArray( this.name, [ 'remove_oversize', 'remove_outofstock', 'remove_nosize', 'get_amazon_lowest_price', 'see_also_no_match', 'see_only_no_match', 'see_also_oos', 'see_only_oos', 'remove_amazon_seller', 'see_also_rs_upc', 'see_also_rs_title', 'use_roi_date_period' ] ) > -1) && (this.value == "on") ) {
	        		$('#filters input[name="'+this.name+'"]').prop('checked', true);
	        	} else {
	        		if ( $.inArray( this.name, [ 'price_reduce_1', 'price_reduce_2', 'price_reduce_3' ] ) == -1 ) {
	        			$('#filters input[name="'+this.name+'"]').val(this.value);
	        		}
	        	}
			});
		}
	} else {
        $('#remove_filter_set').prop('disabled', false);

        data = jQuery.parseJSON( $(this).find('option:selected').attr('data-value') );
        jQuery.each(data, function(index,obj) {
        	if ( $.inArray( this.name, [ 'remove_oversize', 'remove_outofstock', 'remove_nosize', 'get_amazon_lowest_price', 'see_also_no_match', 'see_only_no_match', 'see_also_oos', 'see_only_oos', 'remove_amazon_seller', 'see_also_rs_upc', 'see_also_rs_title', 'use_roi_date_period' ] ) > -1 ) {
        		$('#filters input[name="'+this.name+'"]').prop('checked', true);
        	} else {
        		if ( $.inArray( this.name, [ 'price_reduce_1', 'price_reduce_2', 'price_reduce_3' ] ) == -1 ) {
        			$('#filters input[name="'+this.name+'"]').val(this.value);
        		}
        	}
		});
	}

});

$('#filters').on('change', function() {
	$('#new_filter_set_name, #save_filter_set').prop('disabled', false);
});