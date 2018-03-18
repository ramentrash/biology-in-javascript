var N;
var generations;
var simulations;
var p;
var fitness;

var data;

function next_generation_natural(simulation_data) {
	var draws = 2 * N;
	var a1 = 0;
	var a2 = 0;

	for (var i = 0; i < draws; i++) {

		if (Math.random() <= p * fitness) {
			a1++;
		} else {
			a2++;
		}
	}
	p = a1 / draws;
	simulation_data.push(p);
}

function simulation_natural(simulation_counter) {
	p = Number(document.getElementById('frequency').value);
	
	for (var i = 0; i < generations; i++) {
		next_generation_natural(data[simulation_counter]);
	}
}

function natural_selection() {
	N = Number(document.getElementById('population').value);
	generations = Number(document.getElementById('generations').value);
	simulations = Number(document.getElementById('simulations').value);
	p = Number(document.getElementById('frequency').value);
	fitness = Number(document.getElementById('fitness').value);
	
	data = [];
	
	for (var i = 0; i < simulations; i++) {
		data.push([]);
		simulation_natural(i);
	}
	
	draw_line_chart(data, "Generation", "p", ["Generations:", generations]);
}