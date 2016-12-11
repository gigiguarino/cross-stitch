
<?php

$image_link 	= $_POST['image-link'];
$new_height 	= $_POST['max-height'];
$new_width 		= $_POST['max-width'];
$num_colors 	= $_POST['num-colors'];
$fabric_count 	= $_POST['fabric-count'];
$symbol_bool 	= $_POST['symbol-enable'];
$colored_bool 	= $_POST['color-enable'];

$last_line = system('python project.py', $retval);



?>