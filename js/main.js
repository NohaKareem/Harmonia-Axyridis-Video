(_ => {
	"use strict";

	const ctrl = document.querySelector('.controls');
	const vid = document.querySelector('video');
	const playBtn = document.querySelector('.play');
	const PLAY_FA = `<i class="fa fa-play" aria-hidden="true"></i>`;
	const PAUSE_FA = `<i class="fa fa-pause" aria-hidden="true"></i>`;
	
	vid.removeAttribute('controls');
	// controls.style.visibility = 'visible';

	playBtn.addEventListener('click', _ => {
		if(vid.paused) {
			playBtn.innerHTML = PAUSE_FA;
			vid.play();
		} else {
			playBtn.innerHTML = PLAY_FA;
			vid.pause();
		}
	});

})();

