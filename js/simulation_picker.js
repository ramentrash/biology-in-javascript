function reset_setInterval_and_graphics() {
	if (intervalID != 123456) {
		clearInterval(intervalID);
	}
	d3.select("#graphicsDiv").selectAll("*").remove();
}

function simulation_picker() {
	
	var inputFields = document.getElementsByClassName("inputWrapper");
	
	for (var i = 0; i < inputFields.length; i++) { 
		inputFields[i].style.display = "none";
	}
	
	d3.select("#graphicsDiv").selectAll("*").remove();
	
	var simulation = document.getElementById('selection').value;
	
	if (simulation == " ") {
		reset_setInterval_and_graphics();
	}
	
	if (simulation == "drift") {
		document.getElementById('description').innerHTML = "Simulation of the random effects arising from a finite population size in the distribution of two alleles of a gene in a population uninfluenced by natural selection. The y-axis value represents the part of alleles of one type in the total gene pool.";
		document.getElementById('descriptionWrapper').style.display = "block";
		
		document.getElementById('frequency').value = 0.5;
		document.getElementById('frequencyWrapper').style.display = "initial";
		document.getElementById('population').value = 400;
		document.getElementById('populationWrapper').style.display = "initial";
		document.getElementById('simulations').value = 10;
		document.getElementById('simulationsWrapper').style.display = "initial";
		document.getElementById('generations').value = 400;
		document.getElementById('generationsWrapper').style.display = "initial";
		
		document.getElementById('simulateButtonWrapper').style.display = "initial";
		document.getElementById('simulateButtonWrapper').onclick = 
			function() {
				reset_setInterval_and_graphics();
				genetic_drift();
			};
	}
	if (simulation == "breeding") {
		document.getElementById('description').innerHTML = "Simulation of the effects of spatial considerations on the distribution of possible allele combinations of two alleles in a population of diploid organisms. <br>A1A1 is represented by white, A1A2 by blue and A2A2 by black.";
		document.getElementById('descriptionWrapper').style.display = "block";
		
		document.getElementById('frequency').value = 0.5;
		document.getElementById('frequencyWrapper').style.display = "initial";
		document.getElementById('population').value = 4900;
		document.getElementById('populationWrapper').style.display = "initial";
		document.getElementById('matingDistanceWrapper').style.display = "initial";
		
		document.getElementById('simulateButtonWrapper').style.display = "initial";
		document.getElementById('simulateButtonWrapper').onclick = 
			function() {
				reset_setInterval_and_graphics();
				spatial_breeding();
			};
	}
	if (simulation == "natural_selection") {
		document.getElementById('description').innerHTML = "Simulation of the change of the popularity of a (possibly new) allele with an evolutionary advantage in a population of diploid organisms.";
		document.getElementById('descriptionWrapper').style.display = "block";
		
		document.getElementById('frequency').value = 0.02;
		document.getElementById('frequencyWrapper').style.display = "initial";
		document.getElementById('population').value = 300;
		document.getElementById('populationWrapper').style.display = "initial";
		document.getElementById('simulations').value = 10;
		document.getElementById('simulationsWrapper').style.display = "initial";
		document.getElementById('generations').value = 300;
		document.getElementById('generationsWrapper').style.display = "initial";
		document.getElementById('fitnessWrapper').style.display = "initial";
		
		document.getElementById('simulateButtonWrapper').style.display = "initial";
		document.getElementById('simulateButtonWrapper').onclick = 
			function() {
				reset_setInterval_and_graphics();
				natural_selection();
			};
	}
	if (simulation == "selection_types") {
		document.getElementById('description').innerHTML = "The first graph is a simulation of the effects of different evolutionary fitnesses of different two-allele combinations with various starting distributions of alleles in an infinite population of diploid organisms.<br>The second graph displays the change rate of the proportion of one allele at every proportion value.<br>A value between 0 and 1 in the last field will cause <b>directional selection</b>, a value above 1 will cause <b>disruptive selection</b> and a negative value will cause <b>balancing selection</b>. ";
		document.getElementById('descriptionWrapper').style.display = "block";
		
		document.getElementById('simulations').value = 50;
		document.getElementById('simulationsWrapper').style.display = "initial";
		document.getElementById('generations').value = 300;
		document.getElementById('generationsWrapper').style.display = "initial";
		document.getElementById('sWrapper').style.display = "initial";
		document.getElementById('hWrapper').style.display = "initial";
		
		document.getElementById('simulateButtonWrapper').style.display = "initial";
		document.getElementById('simulateButtonWrapper').onclick = 
			function() {
				reset_setInterval_and_graphics();
				selection_types();
			};
	}
	if (simulation == "coevolution") {
		document.getElementById('description').innerHTML = "Simulation of allele frequencies of a gene with two possible alleles in a system of two haploid organisms who influence each other. Parasites with allele 1 (blue) and 2 (orange) can only infect host organisms with alleles 1 (red) and 2 (green), respectively.";
		document.getElementById('descriptionWrapper').style.display = "block";
		
		document.getElementById('generations').value = 300;
		document.getElementById('generationsWrapper').style.display = "initial";
		document.getElementById('randomEffectsWrapper').style.display = "initial";
		document.getElementById('shWrapper').style.display = "initial";
		document.getElementById('spWrapper').style.display = "initial";
		
		document.getElementById('simulateButtonWrapper').style.display = "initial";
		document.getElementById('simulateButtonWrapper').onclick = 
			function() {
				reset_setInterval_and_graphics();
				coevolution();
			};
	}
	if (simulation == "disease") {
		document.getElementById('description').innerHTML = "Simulation of the effects of spatial considerations on the spreading of a non-lethal virus, to which previously exposed individuals are immune.<br>Individuals susceptible to the virus are represented by grey cells, sick/contagious individuals by red and recovered individuals by green.";
		document.getElementById('descriptionWrapper').style.display = "block";
		
		document.getElementById('population').value = 4900;
		document.getElementById('populationWrapper').style.display = "initial";
		document.getElementById('infectionFrequencyWrapper').style.display = "initial";
		document.getElementById('rangeInfectionFrequencyWrapper').style.display = "initial";
		document.getElementById('recoveryFrequencyWrapper').style.display = "initial";
		
		document.getElementById('simulateButtonWrapper').style.display = "initial";
		document.getElementById('simulateButtonWrapper').onclick = 
			function() {
				reset_setInterval_and_graphics();
				disease_spread();
			};
	}
}