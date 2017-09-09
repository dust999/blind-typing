// decor
var decor;
var blocks = [];
var countBlocks = 15;
var launchedBloks = [];
function decor(){
	decor = document.getElementById('decor');
	if (decor == null) return false;
	for (i=0;i<countBlocks;i++){
		blocks [i] = createBlock();
	}
}

function createBlock(){
	var block = document.createElement('B');
	var size = (50+random2(170) );
	
	block.style.left = random2(86) + '%';
	block.style.width = size + 'px';
	block.style.height = size + 'px';
	block.style.animationDuration = (3+random2(12)) + 's';
	block.className = 'decor';
	decor.appendChild(block);
	return block;
}

function launchBlock(){
	var block = document.createElement('B');
	var size = (50+random2(50) );
	block.style.left = random2(86) + '%';
	block.style.width = size + 'px';
	block.style.height = size + 'px';
	block.style.animationDuration = (1+random2(2)) + 's';
	block.className = 'flyout';
	decor.appendChild(block);
	setTimeout( deleteBlock, 1700, block);
}

function deleteBlock(block){
	decor.removeChild(block);
}