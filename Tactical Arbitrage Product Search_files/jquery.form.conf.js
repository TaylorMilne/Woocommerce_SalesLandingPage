$('#br_subject').on('change', function() {
	if ($(this).val() == 'Bug Report - Search') {
		$('.bugreport_fields').show();
	} else {
		$('.bugreport_fields').hide();
	}
});

function processJson(data) {
	if (data.error > 0) {
	} else {
		$('#bugreport .modal-body').html( data.message );
	}
}

(function($) {
	$(document).ready(function() {
		$("#bugreport_form").submit(function() {
			if ($('#br_subject').val() == 'Bug Report - Search') {
				if ($("#br_process_url").val()=="") {
					$("#br_process_url").css('border', '1px solid #f00');
					return false;
				} else {
					$("#br_process_url").css('border', '1px solid #ccc');
				}
			}

			if ($("#br_message").val()=="") {
				$("#br_message").css('border', '1px solid #f00');
				return false;
			} else {
				$("#br_message").css('border', '1px solid #ccc');
			}

			$('#bugreport_form').ajaxSubmit({
				dataType:  'json',
				success: processJson
			});
			return false;
		});

	});
})(jQuery);