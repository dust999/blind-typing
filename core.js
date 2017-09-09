// OUTPUT DOM ELEMENTS
var data = false;
var statistics=false;
var notiffication=false;

// GLOBAL SWITHER LETTERS PR WORDS TYPING
var wordsTyping = false;

// KEYS ARE USED
var keymap = [];
keymap[1]=['A','S','D','F','G','H','J','K','L',';','\''];
keymap[2]=['Q','W','E','R','T','Y','U','I','O','P','[',']'];
keymap[3]=['Z','X','C','V','B','N','M',',','.','/'];
keymap[4]=['`','1','2','3','4','5','6','7','8','9','0','-','='];

// CURRENT LETTERS IN LEVEL
var letterStack=[];
var wordsStack = [];

// STATISTICS
var level = 0;
var misstakes = 0;
var right = 0;
var keypressed=0;
var keysPerMinute=0;
var timer;

// OUTPUD KEY SPEED PER MINUTE
function countKeysPerMinute(){
	if (keysPerMinute == 0) {keysPerMinute=keypressed;} // if no keys per minute kereate them
	
	keysPerMinute=Math.floor((keysPerMinute+keypressed)/2) // calc speed
	//console.log(timer + ' ' + keypressed + ' ' + keysPerMinute);	
	keypressed=0;
	
	timer = setTimeout(countKeysPerMinute,60*1000); //start recursia
	
	updateStatistics();
}

// INITIALIZING BLINDING TYPING TRANING MACHINE
function initilize(letters){
	wordsTyping=!letters;
	// GET OUPUT ELEMENT
	data = document.getElementById('data');
	if(!data) alert ('Error');
	data.innerHTML='';	
	
	// GET STATISTICS
	statistics = document.getElementById('stat');
	if(!statistics) alert ('Error');
	statistics.innerHTML='';
	
	notiffication=document.getElementById('notiffication');
	if(!notiffication) alert ('Error');
	notiffication.innerHTML='';
	
	// GENERATE LEVEL
	if ( !wordsTyping ) createLevel();
	else createWordsLevel();
	decor();
}

// INPUT PERCENT RETURN ARRAY WITH CENTER PART OF CHARS ARRAY 
function getPartOfCharsArray(chars,percent){
	if ( percent >= 1 ) return chars;
	else if (percent <= 0) return []; 
	length = chars.length;
	center = Math.floor(length/2);
	countChars = Math.round(length * percent/2);
	if (countChars>0){
		chars=chars.splice( center-countChars , countChars*2 );
	}
	return chars;
}

// GENERATE LENVEL
function createLevel(){ // IF LETTER TYPING GENERATE LETTER LEVEL (1-80)
	level++;
	data.innerHTML='';
	if (level <= 10){
		chars = getPartOfCharsArray(keymap[1].slice(),.1*level); // GET CENTER CHARS OF EACH LINE
	}
	else if ((level <= 20)&&(level > 10)){
		chars = getPartOfCharsArray(keymap[2].slice(),.1*(level-10));
	}
	else if ((level <= 30)&&(level > 20)){
		chars = getPartOfCharsArray(keymap[1].slice(),.1*(level-20));
		chars = chars.concat(getPartOfCharsArray(keymap[2].slice(),.1*(level-20)));
	}
	else if ((level <= 40)&&(level > 30)){
		chars = getPartOfCharsArray(keymap[3].slice(),.1*(level-30));
	}
	else if ((level <= 50)&&(level > 40)){
		chars = getPartOfCharsArray(keymap[1].slice(),.1*(level-40));
		chars = chars.concat(getPartOfCharsArray(keymap[3].slice(),.1*(level-40)));
	}
	else if ((level <= 60)&&(level > 50)){
		chars = getPartOfCharsArray(keymap[2].slice(),.1*(level-50));
		chars = chars.concat(getPartOfCharsArray(keymap[3].slice(),.1*(level-50)));
	}
	else if ((level <= 70)&&(level > 60)){
		chars = getPartOfCharsArray(keymap[1].slice(),.1*(level-60));
		chars = chars.concat(getPartOfCharsArray(keymap[2].slice(),.1*(level-60)));
		chars = chars.concat(getPartOfCharsArray(keymap[3].slice(),.1*(level-60)));
	}
	else if ((level <= 80)&&(level > 70)){
		chars = getPartOfCharsArray(keymap[1].slice(),.1*(level-70));
		chars = chars.concat(getPartOfCharsArray(keymap[2].slice(),.1*(level-70)));
		chars = chars.concat(getPartOfCharsArray(keymap[3].slice(),.1*(level-70)));
		chars = chars.concat(getPartOfCharsArray(keymap[4].slice(),.1*(level-70)));
	}
	generatingLetters(10* level,chars);
	countKeysPerMinute();
	// UPDATE LEVEL                                                                                                                                                                                                                                                                                                                                                                       el
	updateStatistics();
}

function createWordsLevel (){ // IF WORDS TYPING GENERATE WORD LEVEL
	level++;
	data.innerHTML='';
	for (var i=0 ; i< (level) * 3 ; i++){
		var div = document.createElement("DIV");
		div.className = "word";
		wordsStack [wordsStack.length] = words[random2(words.length-1)].toUpperCase();
		generatingLetters(0,0,wordsStack[wordsStack.length-1],div);
		//div.innerHTML = wordsStack [wordsStack.length-1];
		data.appendChild(div);
	}
	countKeysPerMinute();
	// UPDATE LEVEL                                                                                                                                                                                                                                                                                                                                                                       el
	updateStatistics();
	//alert(wordsStack);
}

// CREATING RANDOM LETTERS FORM KEYMAP ARRAY
function generatingLetters(num,chars,word,parentObj){
	if(!wordsTyping){ // IF LETTERS TYPING
		
		if (num<=0) return false;
		for(var i=0;i<num;i++){
			// output random letter from stack
			createLetter(chars[random2(chars.length)]);
		}
		
	} else {	// IF WORDS TYPING
		
		for(var i=0;i<word.length;i++){
			// output random letter from words
			createLetter(word[i],parentObj);
		}
		
	}
	
	//console.log(letterStack);
}

//CREATING LETTERS BLOCKS ONTO PARENT OBJECT #data FOR LETTERS AND DIV FOR WORDS
function createLetter(letter,parentObj){
	if(!parentObj) parentObj = data;
	//GENERATE DOM ELEMENT
	var b = document.createElement("B");
	b.innerText=letter;
	b.className="button";
	// OUTPUT IT
	parentObj.appendChild(b);
	// ADD TO LEVEL STACK
	letterStack[letterStack.length]=b;	
}

// GET PRESSED KEY
function keyDown(e){
	//console.log(e)
	if (letterStack.length <=0 ) return; // if no letters in stack
	//console.log(e.key.toUpperCase());
	
	// IF RIGHT LETTER
	if(letterStack[0].innerText==e.key.toUpperCase()){
		letterStack[0].className="button green";
		setTimeout( deleteLetter, 500, letterStack[0]);
		letterStack.shift();
		keypressed++;
		right++;
	}
	// IF MISSTAKE
	else{
		letterStack[0].className="button red";
		misstakes++;
	}
	if (letterStack.length<=0) {
		endLevel();
		
	}
	// UPDATE STATISTICS RIGHT & MISSTAKES
	updateStatistics();
	launchBlock(); // DECOR FUNCTION - LAUNCH ANIMATION "FLYING BLOCK"
}
// END OF LEVEL CLEAR TIMER FOR SPEED TEST AND CREATE NEW LEVEL
function endLevel(){
	clearTimeout(timer);
	if(!wordsTyping) setTimeout( createLevel, 500); // IF LETTERS
	else setTimeout( createWordsLevel, 500); // IF WORDS
}
//REMOVE LETTER BLOCK
function deleteLetter(node){
	parentObj = node.parentNode;
	parentObj.removeChild(node);
}
// UPDATE BLOCK WITH STATISTICS
function updateStatistics(){
	statistics.innerHTML='<div class="info"><h5>CHARS IN MINUTE</h5><b>'+keysPerMinute+'</b></div> <div class="divider"></div> <div class="info"><h5>MISSTAKES</h5><b>'+misstakes+'</b></div><div class="level">LEVEL<h3>'+level+'</h3></div>';
}
// CUSTOM RANDOM FUNCTION (0 - num)
function random2(num){
	return Math.floor(Math.random() * num);
	
}

// function build notification
function notiffication(wrongKey){
	notiffication.innerHTML='';
	for (var i=0;i<keymap[4].length;i++){
		notifficationAddButton(keymap[4][i],wrongKey);
	}
	for (var i=0;i<keymap[2].length;i++){
		notifficationAddButton(keymap[2][i],wrongKey);
	}
	for (var i=0;i<keymap[1].length;i++){
		notifficationAddButton(keymap[1][i],wrongKey);
	}
	for (var i=0;i<keymap[3].length;i++){
		notifficationAddButton(keymap[3][i],wrongKey);
	}
}
function notifficationAddButton(letter,wrongKey){
		var b = document.createElement('B');
		b.className='button';
		b.innerHTML=letter;
		notffication.addChild(b);
		if(wrongKey==letter) b.className +=' wrong';
		if(letter==letterStack[0]) b.className +=' neddle';
}