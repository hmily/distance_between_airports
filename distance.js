var isfilled_from;
var isfilled_to;
var jfk_cl = las_cl = lax_cl = pdx_cl = 0;
var from_text, to_text;

function clickicon(airport) {

	//toggleicon(airport);

	isfilled_from = 0;
	isfilled_to = 0;

	var from_form = document.getElementById("from_box");
	var to_form = document.getElementById("to_box");

	from_text = from_form.value;
	to_text = to_form.value;
	
	if (from_text != null && from_text != "") { isfilled_from = 1; }
	if (to_text != null && to_text != "") { isfilled_to = 1; }
	
	if(isfilled_from && isfilled_to ) {
		isfilled_from = 1;
		isfilled_to = 0;
		turnofficon(from_text);
		turnofficon(to_text);
		turnonicon(airport);
		from_form.value = airport;
		to_form.value = "";
	} else if (isfilled_from) {
		if (airport != from_text) {
			to_form.value = airport;
			isfilled_to = 1;
			turnonicon(airport);
		} 
	} else if (isfilled_to) {
		if (airport != to_text) {
			from_form.value = airport;
			isfilled_from = 1;
			turnonicon(airport);
		}
	} else if (!isfilled_from && !isfilled_to) {
		from_form.value = airport;
		isfilled_from = 1;
		turnonicon(airport);
	}
}

function checkinput(box) {
	var input_box = document.getElementById(box);
	var text = input_box.value;
	if (text.length == 3) { 
		if (!IntentMedia.Airports.airport_exists(text)) return;
		if (box === "from_box") {
			isfilled_from = 1;
			isfilled_to = 1;
			from_text = text;
		} else {
			isfilled_to = 1;
			to_text = text;
		}
		if (isfilled_from && isfilled_to) {
			displayairportdistance();
		}
	}
}

function displayairportdistance() {
	window.alert(IntentMedia.Distances.distance_between_airports(from_text, "LAX"));
}


function toggleicon(airport) {
	switch (airport) {
		case 'jfk':
			if (!jfk_cl) {
				jfk_cl = 1;	
				turnonicon(airport);
			} else {
				jfk_cl = 0;
				turnofficon(airport);
			}
		break;
		case 'las':
			if (!las_cl) {
				las_cl = 1;	
				turnonicon(airport);
			} else {
				las_cl = 0;
				turnofficon(airport);
			}
		break;
		case 'lax':
			if (!lax_cl) {
				lax_cl = 1;	
				turnonicon(airport);
			} else {
				lax_cl = 0;
				turnofficon(airport);
			}
		break;
		case 'pdx':
			if (!pdx_cl) {
				lax_cl = 1;	
				turnonicon(airport);
			} else {
				pdx_cl = 0;
				turnofficon(airport);
			}
		break;
		default: break;
		
	}
}


function turnonicon(airport_code) {
	var icon, text;
	icon = document.getElementById(airport_code + "_icon");
	text = document.getElementById(airport_code + "_text");
	icon.style.width = "35px";
	icon.style.height = "35px";
	icon.style.opacity = 1.0;
	icon.style.backgroundColor = "#08aac2";
	text.style.visibility = "visible";
}

function turnofficon(airport_code) {
	var icon, text;
	icon = document.getElementById(airport_code + "_icon");
	text = document.getElementById(airport_code + "_text");
	icon.style.width = "25px";
	icon.style.height = "25px";
	icon.style.opacity = 0.6;
	icon.style.backgroundColor = "#1d626c";
	text.style.visibility = "hidden";
}