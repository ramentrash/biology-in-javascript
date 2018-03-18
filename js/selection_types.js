function selection_types() {
	
	var s = Number(document.getElementById('s').value); //selection coefficient - how much is A1A1 preferred to A2A2
	var h = Number(document.getElementById('h').value); //heterozygote coefficient
	var lowest_p = 1 / Number(document.getElementById('simulations').value);
	var generations = Number(document.getElementById('generations').value);
	
	var data=[];
	
	for (var i = lowest_p; i < 1; i += lowest_p) {
		var results = [];
		var p = i;
		for (var j = 0; j < generations; j++) {
			var q = 1-p;
			var delta_p = (p*q*s * ( p*h + q*(1-h))) / (1 - 2*p*q*h*s -q*q*s);
			p = p + delta_p;
			results.push(p);
		}
		data.push(results);
	}

	draw_line_chart(data,"Generation","p",[],generations);
	
	s = Number(document.getElementById('s').value); 
	h = Number(document.getElementById('h').value); 

	data=[];
	var x_max = 1;

	for (var i = 0; i <= x_max + 0.005; i = i + 0.01) {
		var p = i;
		var q = 1-p;
		var delta_p = (p*q*s * ( p*h + q*(1-h))) / (1 - 2*p*q*h*s -q*q*s);
		data.push(delta_p);
	}

	draw_line_chart(data,"p","\u0394 p",[],x_max,true);

}