var isfilled_from = 0;
var isfilled_to = 0;
var jfk_cl = las_cl = lax_cl = pdx_cl = 0;
var from_text = "";
var to_text = "";

function clickicon(airport) {

	brightenbackground();
	
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
		from_text = airport;
		to_text = "";
	} else if (isfilled_from) {
		if (airport != from_text) {
			isfilled_to = 1;
			turnonicon(airport);
			to_text = airport;		
		} 
	} else if (isfilled_to) {
		if (airport != to_text) {
			isfilled_from = 1;
			turnonicon(airport);
			from_text = airport;
		}
	} else if (!isfilled_from && !isfilled_to) {
		isfilled_from = 1;
		turnonicon(airport);
		from_text = airport;
		to_text = "";
	}

	from_form.value = from_text;
	to_form.value = to_text;
	from_text = from_text.toUpperCase();
	to_text = to_text.toUpperCase();
	displayairportdistance()
}

function checkinput(box) {
	var input_box = document.getElementById(box);
	var text = input_box.value;
	if (text.length == 3) {
		text = text.toUpperCase(); 
		if (!IntentMedia.Airports.airport_exists(text)) {
			document.getElementById("invalid_" + box).style.visibility = "visible";
			return;
		}
		document.getElementById("invalid_" + box).style.visibility = "hidden";
		if (box === "from_box") {
			isfilled_from = 1;
			if (from_text == "" || from_text == NULL) {
				
			}
			from_text = text;
			turnonicon(text);
		} else {
			isfilled_to = 1;
			to_text = text;
			turnonicon(text);
		}
		displayairportdistance();
	} else if (text.length == 0) {
		if (box === "from_box") {
			isfilled_from = 0;
		} else isfilled_to = 0;
		document.getElementById("invalid_" + box).style.visibility = "hidden";
	} else {
		if (box === "from_box") {
			isfilled_from = 0;
			turnofficon(from_text);
			from_text = "";
		} else {
			isfilled_to = 0;
			turnofficon(to_text);
			to_text = "";
		}
	}
}

function clearinput(box) {
	document.getElementById(box).value = "";
	document.getElementById("invalid_" + box).style.visibility = "hidden";
	if (box === "from_box") {
		turnofficon(from_text);
		from_text = "";
		isfilled_from = 0;
		displayairportdistance();
	} else {
		turnofficon(to_text);
		to_text = "";
		isfilled_to = 0;
		displayairportdistance();
	}
	brightenbackground();
}

function displayairportdistance() {
	if (isfilled_from && isfilled_to) {
		var distance = IntentMedia.Distances.distance_between_airports(from_text, to_text);
		if (distance >= 0) {
			var miles = document.createElement('div');
			miles.setAttribute("id", "miles");
			miles.innerHTML = "miles";
			document.getElementById("distance_display").innerHTML = distance;
			document.getElementById("distance_display").appendChild(miles);
			dimbackground();
		} else document.getElementById("distance_display").innerHTML = "";
	} else document.getElementById("distance_display").innerHTML = "";
}

function brightenbackground() {
	document.getElementById("map").style.opacity = 1.0;
	document.getElementById("background").style.visibility = "visible";
}

function dimbackground() {
	document.getElementById("map").style.opacity = 0.6;
	document.getElementById("background").style.visibility = "hidden";
}

function turnofficons()	{
	turnofficon(document.getElementById("from_box").value);
	turnofficon(document.getElementById("to_box").value);
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
	airport_code = airport_code.toLowerCase();
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
	airport_code = airport_code.toLowerCase();
	icon = document.getElementById(airport_code + "_icon");
	text = document.getElementById(airport_code + "_text");
	icon.style.width = "25px";
	icon.style.height = "25px";
	icon.style.opacity = 0.6;
	icon.style.backgroundColor = "#1d626c";
	text.style.visibility = "hidden";
}