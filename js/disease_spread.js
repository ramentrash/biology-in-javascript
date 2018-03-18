var grid;
var temp_grid;
var infected_count;
var recovered_count;

var grid_length;
var beta; //infection transmission probability
var long_beta; //long distance infection transmission probability
var gamma; //recovering probability

var intervalID = 123456;

function get_random_int(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init_grid_disease() {
	for (var i = 0; i < grid_length; i++) {
		grid[i] = [];
		for (var j = 0; j < grid_length; j++) {
			grid[i][j] = "S";
		}
	}
	grid[get_random_int(0,grid_length-1)][get_random_int(0,grid_length-1)] = "I";
	infected_count++;
}

function get_bounded_index(index) {
	var bounded_index = index;
	if (index < 0) {
		bounded_index = index + grid_length;
	}
	else if (bounded_index >= grid_length) {
		bounded_index = index - grid_length;
	}
	return bounded_index;
}

function try_infection(x, y) {
	if (grid[x][y] == "S") {
		if (Math.random() < beta) {
			if (temp_grid[x][y] == "S") { //if it is yet uninfected in this time step
				infected_count++;
			}
			temp_grid[x][y] = "I";
		}
	}
}

function expose_neighbors(x, y) {
	for (var i = x - 1; i <= x + 1; i++) {
		for (var j = y - 1; j <= y + 1; j++) {
			try_infection(get_bounded_index(i), get_bounded_index(j));
		}
	}
}

function run_time_step() {
	for (var i = 0; i < grid_length; i++) {
		temp_grid[i] = [];
		for (var j = 0; j < grid_length; j++) {
			temp_grid[i][j] = grid[i][j];
		}
	}
	for (var i = 0; i < grid_length; i++) {
		for (var j = 0; j < grid_length; j++) {
			if (grid[i][j] == "I") {
				expose_neighbors(i, j);
				if (Math.random() < long_beta) {
					try_infection(get_random_int(0, grid_length-1), get_random_int(0, grid_length-1));
				}
				if (Math.random() < gamma) {
					temp_grid[i][j] = "R";
					recovered_count++;
					infected_count--;
				}
			}
		}
	}
	for (var i = 0; i < grid_length; i++) {
		for (var j = 0; j < grid_length; j++) {
			grid[i][j] = temp_grid[i][j];
		}
	}
}

function simulate_and_visualize_disease() {
	run_time_step();
	update_grid(grid, ["S", "#dcdcdc", "I", "#c82605", "R", "#6fc401"]);
}

function disease_spread() {
	grid = [];
	temp_grid = [];
	infected_count = 0;
	recovered_count = 0;
	
	grid_length = grid_length = Math.ceil(Math.sqrt(Number(document.getElementById('population').value)));
	beta = Number(document.getElementById('infectionFrequency').value);
	long_beta = Number(document.getElementById('rangeInfectionFrequency').value);
	gamma = Number(document.getElementById('recoveryFrequency').value);
	
	init_grid_disease();
	draw_grid(grid, ["S", "#dcdcdc", "I", "#c82605", "R", "6fc401"]);
	intervalID = setInterval(simulate_and_visualize_disease, (grid_length+30));
}