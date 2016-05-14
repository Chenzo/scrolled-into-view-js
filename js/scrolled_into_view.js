

var latestKnownScrollY = 0,
	ticking = false,
	classToLookFor = "js-scrolled-into-view",
	classToAdd = "nowVisible",
	bottomPadding = 100;

function checkForInView() {
	latestKnownScrollY = window.scrollY;
	requestTick();
}

function requestTick() {
	if(!ticking) {
		requestAnimationFrame(update);
	}
	ticking = true;
}

function update() {
	ticking = false;

	var currentScrollY = latestKnownScrollY;
	var wH = window.innerHeight;

	var hiddenElms = document.getElementsByClassName(classToLookFor);
	for (var x=0; x<hiddenElms.length; x++) {
		var m = hiddenElms[x];
		var mT = m.getBoundingClientRect().top;

		if (mT < wH - bottomPadding) {
			var classes = m.className.replace(classToLookFor,'') + " " + classToAdd;

			m.className = classes;
			console.log("VISIBLE: " + m.className);
		}
	}


}

window.addEventListener('resize', checkForInView, false);
window.addEventListener('scroll', checkForInView, false);
checkForInView(); //do it once to start.

