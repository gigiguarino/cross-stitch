
function submit_func(){

	var img_link = document.getElementById('image-link').value;
	var max_height = document.getElementById('max-height').value;
	var max_width = document.getElementById('max-width').value;
	var fabric_count = document.getElementById('fabric-count').value;
	var num_colors = document.getElementById('num-colors').value;

	var error_found = 0;
	var error_print = "";
	var valid_print = "Valid inputs\n";

	if (isNaN(max_height)) {
		error_print += "Your max height is not a number\n";
		error_found = 1;
	} else {
		if (max_height <= 0 || max_height > 12) {
			error_print += "Your max height is not in desired range: 1 - 12\n";
			error_found = 1;
		} else {
			valid_print += "Max height: ";
			valid_print += String(max_height);
			valid_print += "\n";
		}
	}

	if (isNaN(max_width)) {
		error_print += "Your max width is not a number\n";
		error_found = 1;
	} else {
		if (max_width <= 0 || max_width > 12) {
			error_print += "Your max width is not in desired range: 1 - 12\n";
			error_found = 1;
		} else {
			valid_print += "Max width: ";
			valid_print += String(max_width);
			valid_print += "\n";
		}
	}

	if (isNaN(fabric_count)) {
		error_print += "Your fabric count is not a number\n";
		error_found = 1;
	} else {
		if (fabric_count > 20 || fabric_count <= 0) {
			error_print += "Your fabric count is not in desired range: 1 - 20\n";
			error_found = 1;
		} else {
			valid_print += "Fabric count: ";
			valid_print += String(fabric_count);
			valid_print += "\n";
		}
	}

	if (isNaN(num_colors)) {
		error_print += "Your number of colors is not a number\n";
		error_found = 1;
	} else {
		if (num_colors > 10 || num_colors <= 0) {
			error_print += "Your number of colors is not in desired range: 1 - 10\n";
			error_found = 1;
		} else {
			valid_print += "Num colors: ";
			valid_print += String(num_colors);
			valid_print += "\n";
		}
	}

	if (error_found) {
		alert(error_print);
	} else {
		alert(valid_print);
		//start(img_link, max_height, max_width, fabric_count, num_colors);
	}	
}






