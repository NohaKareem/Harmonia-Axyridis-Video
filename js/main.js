(_ => {
	"use strict";

	const VID = document.querySelector('video');
	const PLAY_BTN = document.querySelector('.play');
	const SPEED_BTN = document.querySelector('.speed');
	const STOP_BTN = document.querySelector('.stop');
	const PLAY_FA = `<i class="fa fa-play" aria-hidden="true"></i>`;
	const PAUSE_FA = `<i class="fa fa-pause" aria-hidden="true"></i>`;
	let speed = 1;

	VID.removeAttribute('controls');

	let updateButton = (btn, html) => { btn.innerHTML = html; }

	// toggle play pause 
	PLAY_BTN.addEventListener('click', _ => {
		if(VID.paused) {
			updateButton(PLAY_BTN, PAUSE_FA);
			VID.play();
		} else {
			updateButton(PLAY_BTN, PLAY_FA);
			VID.pause();
		}
	});

	// modify speed
	SPEED_BTN.addEventListener('click', _ => {
		speed = (speed + 0.25) % 2;
		speed = speed > 0 ? speed : 2;
		SPEED_BTN.innerHTML = `${speed}X`;
		VID.playbackRate = speed;
	}); 

	// stop video event handler
	let stopVid = _ => {
		VID.pause();
		VID.currentTime = 0; 
		updateButton(PLAY_BTN, PLAY_FA);
	}

	// stop on click, or auto-stop on complete
	STOP_BTN.addEventListener('click', stopVid);
	VID.addEventListener('ended', stopVid);
	
})();

