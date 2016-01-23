$(function(){
	var roles = {
		entrepreneur: ['', 'Founder', 'Co-founder', 'CxO', 'Partner', 'Director', 'Proprietor', 'Other'],
		key: ['', 'CxO', 'Director', 'Managing Director', 'Other'],
		employee: [],
		investor: [],
		support: ['', 'Director', 'Founder/Co-founder', 'Mentor', 'Employee', 'Volunteer', 'Other'],
		student: [],
		corporate: []
	};
	var segments = {
		entrepreneur: ['',"Big Data","Biotechnology","Business Products","Business Services","Cloud","Construction & Real Estate","Creative","E-commerce","E-Learning","Education","Energy","Enterprise Software","Entertainment","Environment","Events","Fashion","Finance","FinTech","Food, Water & Agriculture","FoodTech","Healthcare & Pharma","Job Listing","Lifestyle","Manufacturing","Marketing/Advertising","Mobile","Multimedia","Nanotechnology","News, Media & Entertainment","Social Entrepreneurship","Software","Technology","Transportation","Other"],
		key: this.entrepreneur,
		employee: this.entrepreneur,
		investor: ['', 'Venture Capital', 'Private Equity', 'Angel Investor', 'Personal Investor', 'Incubator', 'Other']
	};
	var user_role_input = {
		text: '<input type="text" class="form-control" id="user_role" value="" required>',
		dropdown: '<select class="form-control" id="user_role" required></select>',
		other: '<input type="text" class="form-control" id="user_role_other" value="" placeholder="Please enter the value for Other here" required>'
	};
	var user_segment_input = {
		text: '<input type="text" class="form-control" id="user_segment" value="" required>',
		dropdown: '<select class="form-control" id="user_segment" required></select>',
		other: '<input type="text" class="form-control" id="user_segment_other" value="" placeholder="Please enter the value for Other here" required>'
	};
	$(':radio.user_type').change(function(){
		$('.form-group.data').each(function(index){
			if(
				$(this).attr('data-user-types').indexOf($(':radio.user_type:checked').val()) !== -1
				|| $(this).attr('data-user-types') == 'all'
				) {
				$(this).show();
				$(this).children('input').attr('required', true);
				$(this).children('label').children('.utype').hide();
				$(this).children('label').children('.utype' + '.' + $(':radio.user_type:checked').val()).show();
			}
			else {
				$(this).hide();
				$(this).children('input').attr('required', false);
				$(this).children('input[type=hidden]').val('');
			}
		});
		if(roles.hasOwnProperty($(':radio.user_type:checked').val())) {
			if(roles[$(':radio.user_type:checked').val()].length) {
				$('#user_role_container').html(user_role_input['dropdown']);
				$('#user_role').change(function(e) {
					$('#user_role_data').val($('#user_role option:selected').val());
					if($('#user_role option:selected').val() == 'Other') {
						$('#user_role_container').append(user_role_input['other']);
						$('#user_role_other').change(function(){$('#user_role_data').val('Other: ' + $('#user_role_other').val());});
					}
					else $('#user_role_other').remove();
				});
				$.each(roles[$(':radio.user_type:checked').val()], function(index, option) {
					$('#user_role').append('<option value="' + option + '">' + option + '</option>');
				});
			}
			else {
				$('#user_role_container').html(user_role_input['text']);
			}
		}
		else {
			$('#user_role_container').html('');
		}
		if(segments.hasOwnProperty($(':radio.user_type:checked').val())) {
			if(segments[$(':radio.user_type:checked').val()] && segments[$(':radio.user_type:checked').val()].length) {
				$('#user_segment_container').html(user_segment_input['dropdown']);
				$('#user_segment').change(function(e) {
					$('#user_segment_data').val($('#user_segment option:selected').val());
					if($('#user_segment option:selected').val() == 'Other') {
						$('#user_segment_container').append(user_segment_input['other']);
						$('#user_segment_other').change(function(){$('#user_segment_data').val('Other: ' + $('#user_segment_other').val());});
					}
					else $('#user_segment_other').remove();
				});
				$.each(segments[$(':radio.user_type:checked').val()], function(index, option) {
					$('#user_segment').append('<option value="' + option + '">' + option + '</option>');
				});
			}
			else {
				$('#user_segment_container').html(user_segment_input['text']);
			}
		}
		else {
			$('#user_segment_container').html('');
		}
	});

	$(':radio.user_type[value=entrepreneur]').click();
}());