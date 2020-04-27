var arrBunnies = [];
var newBunnies = [];
var newDeaths = [];
var newZombies = [];
var numTurns = 0;
var automate = false;
var bunnyID = 100;
var numBunnies = 0;
var numMales = 0;
var numFemales = 0;
var numBlack = 0;
var numWhite = 0;
var numBrown = 0;
var numSpotted = 0;
var numRadioactive = 0;
const canvRows = 40;
const canvCols = 40;
const popCap = 1000;

class Bunnies {
  constructor(_id, _sex, _colour, _age, _name, _radioactive, _x, _y, _char) {
    this.id = _id;
	this.sex = _sex;
	this.colour = _colour;
	this.age = _age;
	this.name = _name;
	this.radioactive = _radioactive;
	this.xPos = _x;
	this.yPos = _y;
	this.charac = _char;
  }

}

function updateCanvas() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var w = canvCols * 10;
	var h = canvRows * 10;
	ctx.canvas.width  = w;
    ctx.canvas.height = h;

    for (x=0;x<=w;x+=10) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		ctx.stroke();
	}
	for (y=0;y<=h;y+=10) {
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
		ctx.stroke();
    }
	
	let l = arrBunnies.length;
	for(let i = 0; i < l; i++)	{
		for(let j = 0; j < l; j++)	{
			if(!i==j){
				if(arrBunnies[i]._xPos == arrBunnies[j]._xPos && arrBunnies[i]._yPos == arrBunnies[j]._yPos) {
					console.log("Overlap! bunny " + i + " and bunny " + j);
					ctx.fillStyle = "#FF0000";
					let bunnyXY = checkAvailable(arrBunnies[i]._xPos, arrBunnies[i]._yPos, arrBunnies[i]._age);
					arrBunnies[i]._xPos = bunnyXY.x;
					arrBunnies[i]._yPos = bunnyXY.y;
					ctx.fillRect(arrBunnies[i]._xPos*10, (arrBunnies[i]._yPos+1)*10, 10, 10);
				}
			}
		}	
	}

	ctx.font = "8px Arial";
//	let l=arrBunnies.length;
	for(let i = 0; i < l; i++) {
		ctx.strokeText("", arrBunnies[i]._xPos*10 + 2, arrBunnies[i]._yPos*10 - 2);
		ctx.strokeText(arrBunnies[i]._char, arrBunnies[i]._xPos*10 + 2, (arrBunnies[i]._yPos+1)*10 - 2);
	}
	
}

function tempAlert(msg,duration) {
 var el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:40%;left:60%;background-color:grey;border-style: groove;");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}

function startAuto() {
	automate = !automate;
	automateTurns();
}

function automateTurns() {
	if(automate){
		document.getElementById("autoTurn").innerHTML = "Stop autoplay";
		nextTurn();
		setTimeout(automateTurns, 2000);
	} else {
		document.getElementById("autoTurn").innerHTML = "Start autoplay";
	}
}

function createFive(){
	for(let i=0; i < 5; i++)
	{
		createBunny();
	}
}

function createBunny(_col){
	bunnyID ++;
	var bunnyNames = [
		"Joe",
		"Mary",
		"Cloud",
		"Tifa",
		"Aeris",
		"Barret",
		"Cid",
		"Vincent",
		"Biggs",
		"Wedge",
		"Luke",
		"Leia",
		"Han",
		"Spot",
		"Fred",
		"George"
	];
	var bunnyColours = [
		"Black",
		"White",
		"Brown",
		"Spotted"
	];
	
	//Get sex of Bunny
	let sex = (Math.random() < 0.5) ? "Male" : "Female";
	//Get whether bunny is radioactive
	let radioactive = (Math.random() < 0.02) ? true : false;
	//Get bunny name
	let x1 = Math.floor(Math.random() * bunnyNames.length)
	let bunName = bunnyNames[x1];
	
	//Get bunny colour
	let bunColour = _col;
	if(bunColour == null)
	{
		let x2 = Math.floor(Math.random() * bunnyColours.length)
		bunColour = bunnyColours[x2];
	}
	
	let bunChar = "m";
	if(sex == "Male") {
		bunChar = "m";
	} else {
		bunChar = "f";
	}
	if(radioactive)
	{
		bunChar = "x";
	}
	
	//Check position is available
	let tempXY = chooseRandSpot();
	let bunXPos = tempXY.x;
	let bunYPos = tempXY.y;
	let bunnyXY = checkAvailable(bunXPos, bunYPos, 0);
	//let bunnyXY = { bunXPos: bunXPos, bunYPos : bunYPos };
	//console.log(bunnyXY);
	var bunnyToAdd = {
		_id : bunnyID,
		_sex: sex,
		_colour: bunColour,
		_age: 0,
		_name: bunName,
		_radioactive: radioactive,
		_xPos: bunnyXY.x,
		_yPos: bunnyXY.y,
		_char: bunChar
	}
	
	arrBunnies.push(bunnyToAdd);	
	newBunnies.push(bunnyToAdd._id);
	bunniesTable();
	//updateCanvas();
}

function bunniesTable(){
	numBunnies = arrBunnies.length;
	numMales = 0;
	numFemales = 0;
	numBlack = 0;
	numWhite = 0;
	numBrown = 0;
	numSpotted = 0;
	numRadioactive = 0;

	for(let i=numBunnies-1; i >= 0; i--)
	{
		if(arrBunnies[i]._sex == "Male") {numMales++}
		if(arrBunnies[i]._sex == "Female") {numFemales++}
		if(arrBunnies[i]._colour == "Black") {numBlack++}
		if(arrBunnies[i]._colour == "White") {numWhite++}
		if(arrBunnies[i]._colour == "Brown") {numBrown++}
		if(arrBunnies[i]._colour == "Spotted") {numSpotted++}
		if(arrBunnies[i]._radioactive) {numRadioactive++}
	}
	
	document.getElementById("total").innerHTML = numBunnies;
	document.getElementById("male").innerHTML = numMales;
	document.getElementById("female").innerHTML = numFemales;
	document.getElementById("black").innerHTML = numBlack;
	document.getElementById("white").innerHTML = numWhite;
	document.getElementById("brown").innerHTML = numBrown;
	document.getElementById("spotted").innerHTML = numSpotted;
	document.getElementById("radioactive").innerHTML = numRadioactive;
	
	document.getElementById("turns").innerHTML = "Number of turns: " + numTurns;
	
	updateItemTable();
}

function nextTurn() {
	let l = arrBunnies.length;
	let malesTwoPlus = 0;
	let femalesTwoPlus = 0;
	numTurns++;
	for(let i=l-1; i >= 0; i--)
	{if(arrBunnies[i]._radioactive == false) //If not zombies
		{
			//Kill bunny if ages over 10
			if(arrBunnies[i]._age > 10) 
			{
				newDeaths.push(arrBunnies[i]._id);
				arrBunnies.splice(i,1);
				continue;
			}
			//Get number of adult males
			if(arrBunnies[i]._age > 1 && arrBunnies[i]._sex == "Male") 
			{
				malesTwoPlus++;
				arrBunnies[i]._char = "M";
			}
			// Get number of adult females
			if(arrBunnies[i]._age > 1 && arrBunnies[i]._sex == "Female") 
			{
				femalesTwoPlus++;
				arrBunnies[i]._char = "F";
			}
		} else //If zombies
		{
			arrBunnies[i]._char = "X";
			if(arrBunnies[i]._age > 50) 
			{
				newDeaths.push(arrBunnies[i]._id);
				arrBunnies.splice(i,1);
				continue;
			}
		}
		arrBunnies[i]._age++;
	}
	//New bunny born with same colour as mother
	if(malesTwoPlus)
	{
		for(let i=0; i < femalesTwoPlus; i++)
		{
			let motherColour = arrBunnies[i].bunnyColours
			createBunny(motherColour);
		}
	};	
	
	turnRadioactive();
	l = arrBunnies.length;
	if(l > popCap)
	{ 
		halfPop(); 
	}
	
	bunniesTable();
	displayEvents();
	moveBunnies(l);
	updateCanvas();
}

function moveBunnies(len) {
	let l = len;
	for(let i = 0; i < l; i++)
	{
		if(arrBunnies[i]._age > 0) {
			let bunnyXY = checkAvailable(arrBunnies[i]._xPos, arrBunnies[i]._yPos, arrBunnies[i]._age);
			arrBunnies[i]._xPos = bunnyXY.x;
			arrBunnies[i]._yPos = bunnyXY.y;
		}
		
	}
}

function checkAvailable(x, y, _age) {
	let posAvailable = false;
	let bunXPos = x;
	let bunYPos = y;
	let age = _age;
	let posChange = 0;
	
	l = arrBunnies.length;
	if(l > 0) {		
		for(let i=0; i < l; i++) {
			let cnt = 0;
			while (!posAvailable) {
				bunXPos = x;
				bunYPos = y;
				if(cnt > 10) {
					let tempXY = chooseRandSpot();
				//	console.log("count = " + cnt);
					bunXPos = tempXY.x;
					bunYPos = tempXY.y;
				}
				if(age == 0) {
					//Check doesn't go out of bounds
					if(bunXPos < 0 || bunXPos >= canvCols || bunYPos < 0 || bunYPos >= canvRows ) {
						posAvailable = false;
						break;
					}
					//Check the spot is not already taken
					if (bunXPos == arrBunnies[i]._xPos && bunYPos == arrBunnies[i]._yPos) {
					//	console.log("Spot taken, new bunny.");
						let tempXY = chooseRandSpot();
						bunXPos = tempXY.x;
						bunYPos = tempXY.y;
						posAvailable = false;
						break;
					}
					posAvailable = true;
				} else {
					bunXPos = x;
					bunYPos = y;
					posChange = Math.floor(Math.random() * 4);
					switch(posChange) {
						case 0:
						bunXPos++;
						break;
						case 1:
						bunXPos--;
						break;
						case 2:
						bunYPos++;
						break;
						case 3:
						bunYPos--;
						break;
					}
					//Check doesn't go out of bounds
					if(bunXPos < 0 || bunXPos >= canvCols || bunYPos < 0 || bunYPos >= canvRows ) {
				//		console.log("Out of bounds, older");
						cnt++;
						posAvailable = false;
						break;
					}
					//Check the spot is not already taken
					if (bunXPos == arrBunnies[i]._xPos && bunYPos == arrBunnies[i]._yPos) {
				//		console.log("Spot taken, older bunny.");
						posAvailable = false;
						break;
					}
					posAvailable = true;
				}
			}
		}
	}
	let bunXY = { x: bunXPos, y:bunYPos };
	return bunXY;
}

function chooseRandSpot(){
	let ranX = Math.floor(Math.random() * (canvCols-1));
	let ranY = Math.floor(Math.random() * (canvRows-1));
	let ranXY = { x: ranX, y : ranY };
	return ranXY;
}

function displayEvents() {
	let l = arrBunnies.length;
	let announcement = "";
	//Display new bunnies
	let outRad = "";
	
	let m = newBunnies.length;
	for(let i = l-m; i < l; i++)
	{
		outRad = (arrBunnies[i]._radioactive) ? "Radioactive Mutant Vampire " : "";
		announcement = announcement + outRad + "Bunny " + arrBunnies[i]._name + " was born!<br/>";
	}
	
	//Display deaths
	l = newDeaths.length;
	for(let i = 0; i < l; i++)
	{
		announcement = announcement + "Bunny " + arrBunnies[i]._name + " has died!<br/>";
	}
	
	//Display new Zombies
	l = newZombies.length;
	for(let i = 0; i < l; i++)
	{
		announcement = announcement + "Bunny " + arrBunnies[i]._name + " has been turned into a vampire zombie bunny!<br/>";
	}
	
	if(announcement.length>0)
	{
		//alert(announcement);
		tempAlert(announcement,2000);
	}
	//Reset counters
	newBunnies = [];
	newDeaths = [];
	newZombies = [];
	
}

function turnRadioactive(){
	let l = arrBunnies.length;
	let nRadioactive = 0;
	var nonZombies = [];
	var toTurnZombie = [];
	let x1 = 0;
	for(let i=l-1; i >= 0; i--)
	{
		// Get number of radioactive bunnies
		if(arrBunnies[i]._radioactive)
		{
			nRadioactive++;
		} else 
		{	
			//Make new array of nonZombie bunnies
			nonZombies.push(arrBunnies[i]._id);
		}
	}
	
	//Get new bunnies to turn
	for(let i = nRadioactive; i > 0; i--)
	{
		x1 = Math.floor(Math.random() * nonZombies.length)
		if(!toTurnZombie.includes(arrBunnies[x1]._id))
		{
			toTurnZombie.push(arrBunnies[x1]._id);
			nonZombies.splice(x1,1);
		}
	}
	
	if (nonZombies.length > 0){		
		for(let i=l-1; i >= 0; i--)  //Loop through all bunnies
		{
			for(let j = toTurnZombie.length-1; j >= 0; j--) //Loop through bunnies to turn
			{
				if(toTurnZombie[j] == arrBunnies[i]._id) 
				{
					arrBunnies[i]._radioactive = true;
					newZombies.push(arrBunnies[i]._id);
				}
			}
		}
	}
}

function halfPop(){
	//Kill half of bunnies if population exceeds 1000
	let l = arrBunnies.length;
	let ranNum = 0;
	var toCull = [];
	
	for(let i = l/2; i > 0; i--)
	{
		ranNum = Math.floor(Math.random() * l);
		if(!toCull.includes(arrBunnies[ranNum]._id))
		{
			toCull.push(arrBunnies[ranNum]._id);
		}
	}
	
	let n = toCull.length;
	//console.log(arrBunnies);
	for(let i=l-1; i >= 0; i--)  //Loop through all bunnies
	{
		if(toCull.includes(arrBunnies[i]._id))
		{
			newDeaths.push(arrBunnies[i]._id);
			arrBunnies.splice(i,1);
			
		}
	}
	bunniesTable();
}

function updateItemTable(){	
	var table = document.getElementById("itemTable");
	
	for(let i = table.rows.length; i > 1;i--)
	{
		table.deleteRow(i-1);
	}
	
	let l = arrBunnies.length;
	
	for(let i=0; i < l; i++)
	{
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		var cell7 = row.insertCell(6);
		cell1.innerHTML = arrBunnies[i]._id;
		cell2.innerHTML = arrBunnies[i]._name;
		cell3.innerHTML = arrBunnies[i]._sex;
		cell4.innerHTML = arrBunnies[i]._age;
		cell5.innerHTML = arrBunnies[i]._colour;
		cell6.innerHTML = arrBunnies[i]._radioactive;
		cell7.innerHTML = "x: " + arrBunnies[i]._xPos + " , y:" + arrBunnies[i]._yPos;
	}
	
}

