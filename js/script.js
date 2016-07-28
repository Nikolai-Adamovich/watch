window.addEventListener('load', function() {
	function createTicks(watch) {
		var ul = document.createElement('ul'),
			i,
			li;
		ul.classList.add('ticks');
		for (i = 1; i <= 30; i++) {
			li = document.createElement('li');
			li.style.transform = 'rotate(' + i*6 + 'deg)';
			ul.appendChild(li);
		}
		watch.appendChild(ul);
	}
	function createNumbers(watch) {
		var ul = document.createElement('ul'),
			i,
			li,
			alpha,
			r = 40,
			x,
			y;
		ul.classList.add('numbers');
		for (i = 1; i <= 12; i++) {
			li = document.createElement('li');
			li.textContent = i;
			alpha = Math.PI / 2 - i * (Math.PI / 6);
			x = r * Math.cos(alpha);
			y = r * Math.sin(alpha);
			li.style.left = 50 + x + '%';
			li.style.top = 50 - y + '%';
			ul.appendChild(li);
		}
		watch.appendChild(ul);
	}
	function createHands(watch) {
		var ul = document.createElement('ul'),
			hour = document.createElement('li'),
			minute = document.createElement('li'),
			second = document.createElement('li');
		ul.classList.add('hands');
		hour.classList.add('hour');
		minute.classList.add('minute');
		second.classList.add('second');
		ul.appendChild(hour);
		ul.appendChild(minute);
		ul.appendChild(second);
		watch.appendChild(ul);
	}
	function initWatches() {
		var watch = document.querySelectorAll('.watch'),
			dot = document.createElement('div'),
			i;
			dot.classList.add('dot');
		for (i = 0; i < watch.length; i++) {
			createTicks(watch[i]);
			createNumbers(watch[i]);
			createHands(watch[i]);
			watch[i].appendChild(dot);
            watch[i].querySelector('.minute').style.transform = 'rotate(' + (new Date().getMinutes())*6 + 'deg)';
            watch[i].querySelector('.hour').style.transform = 'rotate(' + (new Date().getHours() + new Date().getMinutes() / 60)*30 + 'deg)';
		}
	}
	initWatches();
	function drawHands() {
		var watch = document.querySelectorAll('.watch'),
			now = new Date(),
			seconds = now.getSeconds(),
			minutes = now.getMinutes(),
			hours = now.getHours(),
            i;
		for (i = 0; i < watch.length; i++) {
			var secondHand = watch[i].querySelector('.second'),
				minuteHand = watch[i].querySelector('.minute'),
				hourHand = watch[i].querySelector('.hour');
			secondHand.style.transform = 'rotate(' + seconds*6 + 'deg)';
            if (seconds === 0) {
                minuteHand.style.transform = 'rotate(' + minutes*6 + 'deg)';
                hourHand.style.transform = 'rotate(' + (hours + minutes / 60)*30 + 'deg)';
            }
		}
	}
    requestAnimationFrame(function drawer() {
        drawHands();
        requestAnimationFrame(drawer);
    })
});