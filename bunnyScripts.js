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
	var w = 800;
	var h = 800;
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
	
	ctx.font = "8px Arial";
	let l=arrBunnies.length;
	for(let i=0; i<l; i++)
	{
		ctx.strokeText(arrBunnies[i]._char, arrBunnies[i]._xPos*10 + 2, arrBunnies[i]._yPos*10 - 2);
	}
	
}

function tempAlert(msg,duration) {
 var el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:grey;border-style: groove;");
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
		nextTurn();
		setTimeout(automateTurns, 2000);
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
		"Wedge"
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
	let posAvailable = false;
	let bunXPos = Math.floor(Math.random() * 80);
	let bunYPos = Math.floor(Math.random() * 80);
	
	var bunnyToAdd = {
		_id : bunnyID,
		_sex: sex,
		_colour: bunColour,
		_age: 0,
		_name: bunName,
		_radioactive: radioactive,
		_xPos: bunXPos,
		_yPos: bunYPos,
		_char: bunChar
	}
	
	arrBunnies.push(bunnyToAdd);	
	newBunnies.push(bunnyToAdd._id);
	bunniesTable();
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
	{
		if(arrBunnies[i]._radioactive == false) //If not zombies
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
	let n = toTurnZombie.length;
	for(let i=l-1; i >= 0; i--)  //Loop through all bunnies
	{
		for(let j = n-1; j >= 0; j--) //Loop through bunnies to turn
		{
			if(toTurnZombie[j] == arrBunnies[i]._id) 
			{
				arrBunnies[i]._radioactive = true;
				newZombies.push(arrBunnies[i]._id);
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
	console.log(arrBunnies);
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
	
	for(let i = document.getElementById("itemTable").rows.length; i > 1;i--)
	{
		document.getElementById("itemTable").deleteRow(i-1);
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
		cell1.innerHTML = arrBunnies[i]._id;
		cell2.innerHTML = arrBunnies[i]._name;
		cell3.innerHTML = arrBunnies[i]._sex;
		cell4.innerHTML = arrBunnies[i]._age;
		cell5.innerHTML = arrBunnies[i]._colour;
		cell6.innerHTML = arrBunnies[i]._radioactive;
	}
	
}
