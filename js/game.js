
var scene, camera, renderer, textureLoader;
var height=600, width=750;
var tileSize = 50;
var bgMap = {"grass": [0,5,11], "road": [1,2,3,4], "water": [6,7,8,9,10]};
var currentCars = [], currentLogs = [];
var speed = 1;
var carSize = tileSize;
var logSize = tileSize*2;
var frog;
var lives = 3;


function createBackground(){
    var gtexture = textureLoader.load('img/grass.jpg', function() {
        for (var i = 0; i < bgMap.grass.length; i++) {
        	var geometry = new THREE.BoxGeometry(1, 1, 5);
        	var material = new THREE.MeshBasicMaterial({map: gtexture});
			for(var j=0; j<width/tileSize; j++){
				var cube = new THREE.Mesh(geometry, material);
				cube.scale.set(tileSize, tileSize, 10);
				cube.position.set((j*tileSize)+(tileSize/2), (bgMap.grass[i]*tileSize)+(tileSize/2), 0);
				scene.add(cube);
			}
        }
    });
    var rtexture = textureLoader.load('img/road.jpg', function() {
        for (var i = 0; i < bgMap.road.length; i++) {
        	var geometry = new THREE.BoxGeometry(1, 1, 5);
        	var material = new THREE.MeshBasicMaterial({map: rtexture});
			for(var j=0; j<width/tileSize; j++){
				var cube = new THREE.Mesh(geometry, material);
				cube.scale.set(tileSize, tileSize, 10);
				cube.position.set((j*tileSize)+(tileSize/2), (bgMap.road[i]*tileSize)+(tileSize/2), 0);
				scene.add(cube);
			}
        }
    });
    var wtexture = textureLoader.load('img/water.jpg', function() {
        for (var i = 0; i < bgMap.water.length; i++) {
        	var geometry = new THREE.BoxGeometry(1, 1, 5);
        	var material = new THREE.MeshBasicMaterial({map: wtexture});
			for(var j=0; j<width/tileSize; j++){
				var cube = new THREE.Mesh(geometry, material);
				cube.scale.set(tileSize, tileSize, 10);
				cube.position.set((j*tileSize)+(tileSize/2), (bgMap.water[i]*tileSize)+(tileSize/2), 0);
				scene.add(cube);
			}
        }
    });
}

function createFrog(){
    var texture = textureLoader.load('img/frog.png', function() {
    	var geometry = new THREE.BoxGeometry(1, 1, 5);
    	var material = new THREE.MeshBasicMaterial({map: texture});
		var cube = new THREE.Mesh(geometry, material);
		cube.scale.set(tileSize, tileSize, 10);
		cube.position.set(width/2, tileSize/2, 10);
		scene.add(cube);
		frog = cube;
    });
}

function isCarPresent(x, y) {
    for(var i=0; i<currentCars.length; i++){
    	var newX= x*tileSize;
        var newY= (y*tileSize)+(tileSize/2);
        var oldX = currentCars[i].position.x - (tileSize/2);
        var oldY = currentCars[i].position.y;
        if(newY != oldY){
        	continue;
        }
        if(oldX+tileSize < newX+1 || oldX+1 > newX+tileSize){
        	continue;
        }
        return true;
    }
    return false;
}

function isLogPresent(x, y) {
    for(var i=0; i<currentLogs.length; i++){
    	var newX= x*(2*tileSize);
        var newY= (y*tileSize)+(tileSize/2);
        var oldX = currentLogs[i].position.x - tileSize;
        var oldY = currentLogs[i].position.y;
        if(newY != oldY){
        	continue;
        }
        if(oldX+(2*tileSize) < newX+1 || oldX+1 > newX+(2*tileSize)){
        	continue;
        }
        return true;
    }
    return false;
}

function createCars(){
	var texture = textureLoader.load('img/car.png', function() {
        for(var i=0; i<bgMap.road.length; i++){
        	var x = Math.random()*(width/carSize);
        	var count = 0;
	        for (var j=0; j<5; j++) {
	            var y = bgMap.road[i];
	            if(isCarPresent(x,y) || count > 2){
	            	x = Math.random()*(width/carSize);
	            	count = 0;
	            	j--;
	            	continue;
	            }
	            var geometry = new THREE.BoxGeometry(1, 1, 5);
		    	var material = new THREE.MeshBasicMaterial({map: texture});
				var cube = new THREE.Mesh(geometry, material);
	            cube.scale.set(carSize, tileSize, 10);
	            cube.position.set((x*carSize)+(carSize/2), (y*tileSize)+(tileSize/2), 15);
	            scene.add(cube);
	            currentCars.push(cube);
	            x = x+1;
	            count++;
        	}
	    }
    });
}

function createLogs(){
	var texture = textureLoader.load('img/log.jpg', function() {
        for(var i=0; i<bgMap.water.length; i++){
        	var x = Math.random()*(width/logSize);
        	var count = 0;
	        for (var j=0; j<3; j++) {
	            var y = bgMap.water[i];
	            if(isLogPresent(x,y) || count > 1){
	            	x = Math.random()*(width/logSize);
	            	count = 0;
	            	j--;
	            	continue;
	            }
	            var geometry = new THREE.BoxGeometry(1, 1, 5);
		    	var material = new THREE.MeshBasicMaterial({map: texture});
				var cube = new THREE.Mesh(geometry, material);
	            cube.scale.set(logSize, tileSize, 10);
	            cube.position.set((x*logSize)+(logSize/2), (y*tileSize)+(tileSize/2), 5);
	            scene.add(cube);
	            currentLogs.push(cube);
	            x = x+1;
	            count++;
        	}
	    }
    });
}

function animateCars() {
    for(var i=0; i<currentCars.length; i++){
        var y = (currentCars[i].position.y - tileSize/2)/tileSize;
        if(y%2 == 0){
            currentCars[i].position.x += speed;
            if(currentCars[i].position.x > (width+carSize)){
                currentCars[i].position.x = 0;
            }
        }
        else {
            currentCars[i].position.x -= speed;
            if(currentCars[i].position.x < -carSize){
                currentCars[i].position.x = width-1;
            }
        }
    }
}

function animateLogs() {
	for(var i=0; i<currentLogs.length; i++){
        var y = (currentLogs[i].position.y - tileSize/2)/tileSize;
        if(y%2 == 0){
            currentLogs[i].position.x += speed;
            if(currentLogs[i].position.x > (width+logSize)){
                currentLogs[i].position.x = 0;
            }
        }
        else {
            currentLogs[i].position.x -= speed;
            if(currentLogs[i].position.x < -logSize){
                currentLogs[i].position.x = width-1;
            }
        }
        if(frog.position.y == currentLogs[i].position.y){
        	if(frog.position.x < currentLogs[i].position.x-tileSize || currentLogs[i].position.x+tileSize < frog.position.x){
	        	continue;
	        }
            if(y%2 == 0){
                frog.position.x += speed;
	    		if(frog.position.x > width-tileSize/2){
	    			frog.position.x -= speed;
	    		}
            }
            else{
                frog.position.x -= speed;
	    		if(frog.position.x < tileSize/2){
	    			frog.position.x += speed;
	    		}
        	}
        }
    }
}

function isFrogHit(){
	var frogCurrentRow = (frog.position.y - tileSize/2)/tileSize;
	if(bgMap.grass.indexOf(frogCurrentRow) != -1){
		return false;
	}
	if(bgMap.road.indexOf(frogCurrentRow) != -1){
	    for(var i=0; i<currentCars.length; i++){
	    	var newX= frog.position.x - (tileSize/2);
	        var newY= frog.position.y;
	        var oldX = currentCars[i].position.x - (tileSize/2);
	        var oldY = currentCars[i].position.y;
	        if(newY != oldY){
	        	continue;
	        }
	        if(oldX+tileSize < newX || oldX > newX+tileSize){
	        	continue;
	        }
	        return true;
	    }
	}
	if(bgMap.water.indexOf(frogCurrentRow) != -1){
	    var flag = true;
	    for(var i=0; i<currentLogs.length; i++){
	    	var newX= frog.position.x - (tileSize/2);
	        var newY= frog.position.y;
	        var oldX = currentLogs[i].position.x - tileSize;
	        var oldY = currentLogs[i].position.y;
	        if(newY != oldY){
	        	continue;
	        }
	        if(oldX+(2*tileSize) < newX || oldX > newX+(tileSize/2)){
	        	continue;
	        }
	        flag = false;
	    }
	    return flag;
	}
	return false;
}

function isWin(){
	var frogCurrentRow = (frog.position.y - tileSize/2)/tileSize;
	return (frogCurrentRow == 11);
}

function keyPressed(event) {
    switch(event.keyCode){
    	case 87: //UP
    		frog.position.y += tileSize;
    		if(frog.position.y > height){
    			frog.position.y -= tileSize;
    		}
    		break;
    	case 65: //LEFT
    		frog.position.x -= tileSize;
    		if(frog.position.x < 0){
    			frog.position.x += tileSize;
    		}
    		break;
    	case 68: //RIGHT
    		frog.position.x += tileSize;
    		if(frog.position.x > width){
    			frog.position.x -= tileSize;
    		}
    		break;
    	case 83: //DOWN
    		frog.position.y -= tileSize;
    		if(frog.position.y < 0){
    			frog.position.y += tileSize;
    		}
    		break;
    }
}

function main(){
	var aspectRatio = width/height;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
	camera.position.set(width/2, height/2, 418);
    camera.lookAt(new THREE.Vector3(width/2, height/2, 0));
	textureLoader = new THREE.TextureLoader();
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);
	createBackground();
	createFrog();
	createCars();
	createLogs();
    document.onkeydown = keyPressed;
    document.getElementById("total_lives").innerHTML = lives;
    document.getElementById("lives").innerHTML = lives;
	renderLoop();
}

function renderLoop(){
	animationRequest = requestAnimationFrame(renderLoop);
	animateCars();
	animateLogs();
	if(frog != null && isFrogHit()){
		frog.position.set(width/2, tileSize/2, 10);
		lives--;
		if(lives < 0){
			lives = 0;
		}
		document.getElementById("lives").innerHTML = lives;
		if(lives == 0){
			document.getElementsByTagName("canvas")[0].style["display"] = "none";
		}
	}
	if(frog != null && isWin()){
		frog.position.set(width/2, tileSize/2, 10);
	}
	renderer.render(scene, camera);
}