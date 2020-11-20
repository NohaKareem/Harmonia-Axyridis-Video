(_ => {
	"use strict";

	const VID = document.querySelector('video');
	const PLAY_BTN = document.querySelector('.play');
	const SPEED_BTN = document.querySelector('.speed');
	const STOP_BTN = document.querySelector('.stop');
	const SCRUB_SLIDER = document.querySelector('.scrubSlider');
	const SCRUB_MAX = SCRUB_SLIDER.max;
	const SWAP_VID = document.querySelector('.swapVid p');
	const TIME_LAPSED = document.querySelector('.scrubberCon span');
	const PLAY_FA = `<i class="fa fa-play" aria-hidden="true"></i>`;
	const PAUSE_FA = `<i class="fa fa-pause" aria-hidden="true"></i>`;
	const VIEW_RENDER_TXT = 'view render';
	const VIEW_EXPL_TEXT = 'view explode animation';
	let speed = 1;

	VID.removeAttribute('controls');

	// update button display
	let updateButton = (btn, html) => { btn.innerHTML = html; }
	
	// pad input with leading zero
	let padZeros = num => { return `${num}`.padStart(2, '0'); }

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

	// update scrubber time and position
	VID.addEventListener('timeupdate', e => {
		SCRUB_SLIDER.value = (SCRUB_MAX * VID.currentTime) / VID.duration;
		
		let minutes = Math.floor(VID.currentTime / 60);
		let seconds = Math.floor(VID.currentTime - minutes * 60);
		TIME_LAPSED.innerHTML = `${padZeros(minutes)}:${padZeros(seconds)}`;
	});

	// update scrub slider on input 
	SCRUB_SLIDER.addEventListener('input', e => {
		VID.currentTime = e.currentTarget.value * VID.duration / SCRUB_MAX;
	});

	// swap vid
	SWAP_VID.addEventListener('click', e => {
		
		// update menu text
		let currMenu = e.currentTarget.innerHTML;
		e.currentTarget.innerHTML = currMenu == VIEW_RENDER_TXT ? VIEW_EXPL_TEXT : VIEW_RENDER_TXT;
		
		// update video
		VID.src = currMenu == VIEW_RENDER_TXT ? "video/render.webm" : "video/vid.webm";
		// let currVid = currMenu == VIEW_RENDER_TXT ? 'render' : 'vid'; 
		// console.log(currVid);//~
		// VID.innerHTML = `<video controls poster="images/poster.jpg">
		// 					<source src="video/${currVid}.webm" type="video/webm">
		// 					<source src="video/${currVid}.mp4" type="video/mp4">
		// 					<p>It seems that the browser does not support HTML5 video. You could download it <a href="video/${currVi}.mp4">here</a>.</p>
		// 				</video>`;
		
		// stop video
		stopVid();
		SCRUB_SLIDER.value = 0;

		// play video
		VID.play();
		updateButton(PLAY_BTN, PAUSE_FA);
	});
})();