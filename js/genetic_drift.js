var p;
var N;
var generations;
var simulations;
var data;

function next_generation_drift(simulation_data, current_N) {
	var draws = 2 * current_N;
	var a1 = 0;
	var a2 = 0;

	for (var i = 0; i < draws; i++) {

		if (Math.random() <= p) {
			a1++;
		} else {
			a2++;
		}
	}
	p = a1 / draws;
	simulation_data.push(p);
}

function simulation_drift(simulation_counter) {
	p = Number(document.getElementById('frequency').value);
	
	for (var i = 0; i < generations; i++) {
		next_generation_drift(data[simulation_counter], N);
	}
}

function genetic_drift() {
	p = Number(document.getElementById('frequency').value);
	N = Number(document.getElementById('population').value);
	generations = Number(document.getElementById('generations').value);
	simulations = Number(document.getElementById('simulations').value);
	data = [];

	for (var i = 0; i < simulations; i++) {
		data.push([]);
		simulation_drift(i);
	}
	
	draw_line_chart(data, "Generation", "p", ["Generations:", generations]);
}