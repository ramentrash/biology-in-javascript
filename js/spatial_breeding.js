var grid;

var grid_length;
var p;
var max_mating_distance;

var intervalID = 123456;

function init_grid_breeding() {
	for (var i = 0; i < grid_length; i++) {
		grid[i] = [];
		for (var ii = 0; ii < grid_length; ii++) {
			var random_number = Math.random();
			if (random_number < p*p) {
				grid[i][ii] = "A1A1";
			}
			else if (random_number > 1 - (1-p)*(1-p)) {
				grid[i][ii] = "A2A2";
			}
			else {
				grid[i][ii] = "A1A2";
			}
		}
	}
}

function simulate_and_visualize_breeding() {
	run_generation();
	update_grid(grid);
}

function run_generation() {
	var temp_grid = [];
	for (var i = 0; i < grid_length; i++) {
		temp_grid[i] = [];
		for (var ii = 0; ii < grid_length; ii++) {
			var mating_partner = pick_mating_partner(i, ii);
			temp_grid[i][ii] = get_offspring(grid[i][ii], mating_partner);
		}
	}
	for (var i = 0; i < grid_length; i++) {
		for (var ii = 0; ii < grid_length; ii++) {
			grid[i][ii] = temp_grid[i][ii];
		}
	}
}

function get_random_int_breeding(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_bounded_index(index) {
    var bounded_index = index;
    while (bounded_index < 0) {
        bounded_index = index + grid_length;
    }
    while (bounded_index >= grid_length) {
        bounded_index = index - grid_length;
    }
    return bounded_index;
}

function pick_mating_partner(i, ii) {
	do {
		j = get_random_int(i - max_mating_distance, i + max_mating_distance);
		jj = get_random_int(ii - max_mating_distance, ii + max_mating_distance);
	} while (j == i && jj == ii);
    j  = get_bounded_index(j);
    jj = get_bounded_index(jj);
	return grid[j][jj];
}

function get_offspring(parent1, parent2) {
	var p1 = parent1;
	var p2 = parent2;
	
	if(p1 == "A1A1" && p2 == "A1A1") {
		return "A1A1";
	}
	else if ((p1 == "A1A1" && p2 == "A1A2")||(p2 == "A1A1" && p1 == "A1A2")) {
		if (Math.random() < 0.5) {
			return "A1A1";
		}
		else {
			return "A1A2";
		}
	} 
	else if ((p1 == "A1A1" && p2 == "A2A2")||(p2 == "A1A1" && p1 == "A2A2")) {
		return "A1A2";
	}
	else if (p1 == "A1A2" && p2 == "A1A2") {
		var rand = Math.random();
		if (rand < 0.25) {
			return "A1A1"
		} else if (rand > 0.75) {
			return "A2A2";
		}
		else {
			return "A1A2";
		}
	}
	else if ((p1 == "A2A2" && p2 == "A1A2")||(p2 == "A2A2" && p1 == "A1A2")) {
		if (Math.random() < 0.5) {
			return "A1A2";
		}
		else {
			return "A2A2";
		}
	}
	else if (p1 == "A2A2" && p2 == "A2A2") {
		return "A2A2";
	}
}

function spatial_breeding() {
	grid = [];
	
	grid_length = Math.ceil(Math.sqrt(Number(document.getElementById('population').value)));
	p = Number(document.getElementById('frequency').value);
	max_mating_distance = Number(document.getElementById('matingDistance').value);
	if (max_mating_distance > grid_length/2) {
		max_mating_distance = Math.floor(grid_length/2);
	}
	
	init_grid_breeding();
	draw_grid(grid);

	intervalID = setInterval(simulate_and_visualize_breeding, (grid_length+50));
}