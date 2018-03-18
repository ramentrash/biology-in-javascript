var data;
var generations;

var host_frequencies;
var parasite_frequencies;

var sh;
var sp;
var random_effects;

function initialize_frequencies() {
	host_frequencies[0] = Math.random();
	data.push([host_frequencies[0]]);
	host_frequencies[1] = 1 - host_frequencies[0];
	data.push([host_frequencies[1]]);
	
	parasite_frequencies[0] = Math.random();
	data.push([parasite_frequencies[0]]);
	parasite_frequencies[1] = 1 - parasite_frequencies[0];
	data.push([parasite_frequencies[1]]);
}

function host_selection() {
	var sum_host_frequencies = 0;
	for (var i = 0; i < host_frequencies.length; i++) {
		var host_fitness = 0;
		for (var j = 0; j < parasite_frequencies.length; j++) {
			host_fitness += get_host_w_f(i,j);
		}
		host_frequencies[i] *= host_fitness;
		host_frequencies[i] += (Math.random() * random_effects);
		sum_host_frequencies += host_frequencies[i];
	}
	for (var i = 0; i < host_frequencies.length; i++) {
		host_frequencies[i] /= sum_host_frequencies;
	}
}

function get_host_w_f(i,j) {
	return (i==j ? 1-sh : 1) * parasite_frequencies[j];
}

function parasite_selection() {
	var sum_parasite_frequencies = 0;
	for (var i = 0; i < parasite_frequencies.length; i++) {
		var parasite_fitness = 0;
		for (var j = 0; j < host_frequencies.length; j++) {
			parasite_fitness += get_parasite_w_f(i,j);
		}
		parasite_frequencies[i] *= parasite_fitness;
		sum_parasite_frequencies += parasite_frequencies[i];
	}
	for (var i = 0; i < parasite_frequencies.length; i++) {
		parasite_frequencies[i] /= sum_parasite_frequencies;
	}
}

function get_parasite_w_f(i,j) {
	return (i==j ? 1 : 1-sp) * host_frequencies[j];
}

function coevolution() {
	data = [];

	host_frequencies = [0, 0];
	parasite_frequencies = [0, 0];
	
	generations = Number(document.getElementById('generations').value);
	sh = Number(document.getElementById('sh').value);
	sp = Number(document.getElementById('sp').value);
	random_effects = Number(document.getElementById('randomEffects').value);
	
	initialize_frequencies();
	
	for (var i = 0; i < generations; i++) {
		host_selection();
		parasite_selection();
		data[0].push(host_frequencies[0]);
		data[1].push(host_frequencies[1]);
		data[2].push(parasite_frequencies[0]);
		data[3].push(parasite_frequencies[1]);
	}
	
	draw_line_chart(data, "Generations", "p", []);
}