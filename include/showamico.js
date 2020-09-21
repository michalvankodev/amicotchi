var speed=10000; // set time of instances 


// last item that was over mouse
var lastItem;

// check if names are set, serves only for typing new names
var petname='';
var ownername='';
var date=new Date();

// style of headers
var headerStyle = 
{
	fillColor:'#ff0000',
	strokeColor:'#000044',
	strokeWidth:3,
	fontSize:65,
};

// style of buttons in menu
var menuItemStyle =
{
	fillColor:'#ff2233',
	strokeColor:'#002233',
	strokeWidth:1,
	fontSize: 40
};


function loadBackground()
{
	//load background
	var topLeft = new Point(0, 0);
	var bgSize = new Size(512, 512);
	var background = new Path.Rectangle(topLeft, bgSize);
	background.fillColor = '#aaaaff';
}

var Menu = Base.extend(
{
	initialize: function()
	{
		this.menuLayer = new Layer();
		this.headingPoint = new Point(256, 70);
		this.heading = new PointText(this.headingPoint);
		this.heading.style=headerStyle;
		this.heading.name='cukor';
		console.log(this.heading.name);
		this.heading.justification='center';
		this.heading.content='Amicothi';
		this.startingHeight = 150;
		this.menuItems= new Array();
		this.nItems=0;
		this.addItem('play', 'play');
		this.addItem('reset', 'reset');
	},
	changeColor: function()
	{
			this.heading.fillColor='#aaaaaa';
	},
	addItem: function(itemName, action)
	{
		//create new menuItem object and set his properties
		this.menuItems[this.nItems] = new Object();
		this.menuItems[this.nItems].itemPoint = new Point(256, this.startingHeight);
		this.menuItems[this.nItems].menuText = new PointText(this.menuItems[this.nItems].itemPoint);
		this.menuItems[this.nItems].menuText.style = menuItemStyle;
		this.menuItems[this.nItems].menuText.content=itemName;
		this.menuItems[this.nItems].menuText.justification='center';

		// add height for next new items
		this.startingHeight+=100;
		
		// get id for this menuItem
		this.menuItems[this.nItems].name=itemName;

		this.menuItems[this.nItems].Rect = new Path.Rectangle(new Point(this.menuItems[this.nItems].menuText.bounds.x, this.menuItems[this.nItems].menuText.bounds.y), new Size(this.menuItems[this.nItems].menuText.bounds.width, this.menuItems[this.nItems].menuText.bounds.height));
	//	this.menuItems[this.nItems].menuText.moveAbove(this.menuItem.Rect);
		this.menuItems[this.nItems].Rect.fillColor='#dddddd';
		this.menuItems[this.nItems].Rect.visible = false;
		this.menuItems[this.nItems].Rect.menuIndex=this.nItems;
		this.menuItems[this.nItems].Rect.clickable=1;
		this.menuItems[this.nItems].Rect.buttonFor='menu';
		this.menuItems[this.nItems].Rect.action=action;
		// add count and index for menuItems
		this.nItems++;

	},
	itemOver: function(n)
	{
		this.menuItems[n].menuText.fillColor='#000000';
	},
	itemOff: function(n)
	{
		this.menuItems[n].menuText.fillColor='#ff2233';
	}
});

function onMouseMove(event)
{
	var mousePos = project.hitTest(event.point);

// when mouse is over button
	if (mousePos.item.clickable)
	{
		lastItem = mousePos.item;
		switch(mousePos.item.buttonFor)
		{
			case 'menu':
				menu.itemOver(mousePos.item.menuIndex);
			break;
			case 'action':
				actionBar.overBar(mousePos.item);
			break;
		}
	}

// when mouse leave button
	if (mousePos.item != lastItem)
	{
		switch(lastItem.buttonFor)
		{
			case 'menu':
				menu.itemOff(lastItem.menuIndex);
			break;
			case 'action':
				actionBar.offBar(lastItem);
			break;
		}
	}
}
function onMouseDown(event)
{
	var hit = project.hitTest(event.point);	
	console.log(event.point.x);
	console.log(event.point.y);
	console.log(hit);
	
	if (hit.item.clickable)
	{
		switch(hit.item.action)
		{
			case 'play': play(); break;
			case 'reset': reset(); break;
			case 'turnOnFeedMenu': actionBar.turnFeedMenuOn(); break;
			case 'turnOffFeedMenu': actionBar.turnFeedMenuOff(); break;
			case 'feedPetCake':
				actionBar.turnFeedMenuOff();
				pet.setState("feedCake");
			break;
			case 'feedPetBur':
				actionBar.turnFeedMenuOff();
				pet.setState("feedBur");
			break;
			case 'feedPetVeg':
				actionBar.turnFeedMenuOff();
				pet.setState("feedVeg");
			break;
			case 'playGround': pet.setState("playGround"); break;
			case 'shower': pet.setState("shower"); break;
			case 'sleep': pet.setState("sleep"); break;

		}
	}
}

function onKeyDown(event)
{

	console.log(event);
	if (event.key=='enter')
	{
	  if(names.name.content!='')				 
	  {
		  names.confirmed = 1;
		  console.log(names.name.content);
		  if (ownername=='')
			  ownername=names.name.content;
		  else if (petname=='')
			  petname=names.name.content;

		  names.newLayer.remove();
		  loadPet();
	  }
	  // else type error
	  else 
	  {
		  names.error.content='You have to type your name';
	  }
	}
	else if (event.key=='backspace')
	  names.name.content=names.name.content.substr(0,names.name.content.length-1);
	else 
	  names.name.content+=event.character;
}
function onFrame(event) 
{
	if (typeof(animation) != 'undefined')
	{	
		animation.setStateText(pet.showState());
		
	}
}

var getName = Base.extend(
{
	initialize: function(heading)
	{
		this.newLayer = new Layer();
		this.confirmed = 0;

		//heading
		this.hStart = new Point(256, 70);
		this.headingfield = new PointText(this.hStart);
		this.headingfield.fillColor = '#cc4433';
		this.headingfield.fontSize = 30;
		this.headingfield.content = heading;
		this.headingfield.justification='center';

		//textfield
		this.tfStart = new Point(166, 250);
		this.tfSize = new Size(180, 30);
		this.textfield = new Path.Rectangle(this.tfStart, this.tfSize);
		this.textfield.fillColor = '#ffffff';
		this.textfield.strokeColor = '#000000';
		this.textfield.strokeWidth = 2;

		this.name = new PointText(new Point(256, 268));
		this.name.fillColor = '#000000';
		this.name.fontSize = '18';
		this.name.justification = 'center';
		
		this.error = new PointText(new Point(256, 350));
		this.error.fillColor = '#ff0000';
		this.error.fontSize = 14;
		this.error.justification = 'center';
	},
	returnName: function()
	{
		return this.name.content;
	}


});


var Pet = Base.extend(
{
	initialize: function(name, birthday, ownername, age, hunger, weight, fatigue, happiness, hygiene, bladder, state, capacity)
	{
		// not changing vars
		this.name=name;
		this.birthday=birthday;
		this.ownername=ownername;

		// other vars
		this.age=age;
		this.hunger=hunger;
		this.weight=weight;
		this.fatigue=fatigue;
		this.happiness=happiness;
		this.hygiene=hygiene;
		this.bladder=bladder;
		this.currentState=state;
		this.capacity=capacity;
	},
	// methods
	save: function()
	{
		localStorage.isTherePet=1;
		
		// need convert date to string for saving date value and then get it back to date object
		var change = this.birthday;
		this.birthday=this.birthday.toString();
		localStorage.pet=JSON.stringify(this);
		this.birthday=change;

		/*
		localStorage.name=this.name;
		localStorage.birthday=this.birthday;
		localStorage.ownername=this.ownername;
		localStorage.age=this.age;
		localStorage.hunger=this.hunger;
		localStorage.weight=this.weight;
		localStorage.fatigue=this.fatigue;
		localStorage.happiness=this.happiness;
		localStorage.hygiene=this.hygiene;
		localStorage.bladder=this.bladder;
		localStorage.currentState=this.currentState;
		localStorage.capacity=this.capacity;
*/	},
	showState: function()
	{
		return this.currentState;
	},
	updatePet: function()
	{
		//get age, set capacity for properties
		var dateParse = Date.parse();
		if (dateParse-Date.parse(this.birthday) > 30*60*60*24*1000)
		{
			 this.age=4;
			 this.capacity=1000;
		}
		else if (dateParse-Date.parse(this.birthday) > 15*60*60*24*1000)
		{
			this.age=3;
			this.capacity=700;
		}
		else if (dateParse-Date.parse(this.birthday) > 8*60*60*24*1000)
		{
			this.age=2;
			this.capacity=450;
		}
		else if (dateParse-Date.parse(this.birthday) > 4*60*60*24*1000)
		{
			this.age=1;
			this.capacity=300;
		}
		else 
		{
			this.age=0;
			this.capacity=200;
		}
		//stateType: 1 - state will not change if its in hard state (eating, showering...)
		if (this.stateType!=1)
		{
			this.currentState = this.getState();
		}
		this.runState(this.currentState);
	},
	runState: function(state)
	{
		// a_ - amplifiers
		this.a_hunger = 1;
		this.a_happy = 1;
		this.a_fatigue = 1;
		this.a_weight = 0.5;
		this.a_hygiene = 1;
		this.a_bladder = 1.5;

		switch (state)
		{
			case 'fine': this.s_fine(); break;
			case 'hungry': this.s_hungry(); break;
			case 'unhappy': this.s_unhappy(); break;
			case 'tired': this.s_tired(); break;
			case 'dirty': this.s_dirty(); break;
			case 'hungryUnhappy': this.s_hungryUnhappy(); break;
			case 'hungryUnhappyTired': this.s_hungryUnhappyTired(); break;
			case 'hungryUnhappyTiredDirty': this.s_hungryUnhappyTiredDirty(); break;
			case 'hungryUnhappyDirty': this.s_hungryUnhappyDirty(); break;
			case 'hungryTired': this.s_hungryTired(); break;
			case 'hungryTiredDirty': this.s_hungryTiredDirty(); break;
			case 'hungryDirty': this.s_hungryDirty(); break;
			case 'unhappyTired': this.s_unhappyTired(); break;
			case 'unhappyTiredDirty': this.s_unhappyTiredDirty(); break;
			case 'unhappyDirty': this.s_unhappyDirty(); break;
			case 'tiredDirty': this.s_tiredDirty(); break;
			case 'feedCake': this.s_feedCake(); break;
			case 'feedBur': this.s_feedBur(); break;
			case 'feedVeg': this.s_feedVeg(); break;
			case 'playing': this.s_playing(); break;
			case 'shower': this.s_shower(); break;
			case 'sleep': this.s_sleep(); break;
		}

		//amplify current properties
		
		this.hunger-=this.a_hunger;
		this.happiness-=this.a_happy;
		this.fatigue-=this.a_fatigue;
		this.weight-=this.a_weight;
		this.hygiene-=this.a_hygiene;
		this.bladder-=this.a_bladder;
		
		// control if below 0

		if (this.hunger < 0) this.hunger = 0;
		if (this.happiness < 0) this.happiness = 0;
		if (this.fatigue < 0) this.fatigue = 0;
		if (this.weight < 0) this.weight = 0;
		if (this.hygiene < 0) this.hygiene = 0;
		if (this.bladder < 0) this.bladder = 0;

		// control max capacity
		
		if (this.hunger > this.capacity) this.hunger = this.capacity;
		if (this.happiness > this.capacity) this.happiness = this.capacity;
		if (this.fatigue > this.capacity) this.fatigue = this.capacity;
		if (this.weight > this.capacity) this.weight = this.capacity;
		if (this.hygiene > this.capacity) this.hygiene = this.capacity;
		if (this.bladder > this.capacity) this.bladder = this.capacity;

	},
	getState: function()
	{
		if (this.fatigue < 0.1 * this.capacity)
			return 'sleep';
			
		switch (this.getFines())
		{
			case 'F,F,F,F': return 'fine'; break;
			case 'NF,F,F,F': return 'hungry'; break;
			case 'F,NF,F,F': return 'unhappy'; break;
			case 'F,F,NF,F': return 'tired'; break;
			case 'F,F,F,NF': return 'dirty'; break;

			case 'NF,NF,F,F': return 'hungryUnhappy'; break;
			case 'NF,NF,NF,F': return 'hungryUnhappyTired'; break;
			case 'NF,NF,NF,NF': return 'hungryUnhappyTiredDirty'; break;
			case 'NF,F,NF,F': return 'hungryTired'; break;
			case 'NF,F,NF,NF': return 'hungryTiredDirty'; break;
			case 'NF,NF,F,NF': return 'hungryUnhappyDirty'; break;
			case 'NF,F,F,NF': return 'hungryDirty'; break;

			case 'F,NF,F,NF': return 'unhappyDirty'; break;
			case 'F,NF,NF,F': return 'unhappyTired'; break;
			case 'F,NF,NF,NF': return 'unhappyTiredDirty'; break;
			case 'F,F,NF,NF': return 'tiredDirty'; break;


			default: return 'fine'; break;
		}
	},
	getFines: function()
	{
		var fines = new Array;

		if (this.hunger > 0.3*this.capacity)
			fines[0]='F';
		else fines[0]='NF';

		if (this.happiness > 0.33*this.capacity)
			fines[1]='F';
		else fines[1]='NF';

		if (this.fatigue > 0.25*this.capacity)
			fines[2]='F';
		else fines[2]='NF';

		if (this.hygiene > 0.28*this.capacity)
			fines[3]='F';
		else fines[3]='NF';
console.log(fines.toString());
		return fines.toString();
	},
	setState: function(s)
	{
		switch (s)
		{
			case 'feedCake': 
				this.currentState = 'feedCake';
				this.stateType = 1;
				this.stateRem = 2;
			break;
			case 'feedBur':
				this.currentState = 'feedBur';
				this.stateType = 1;
				this.stateRem = 4;
			break;
			case 'feedVeg':
				this.currentState = 'feedVeg';
				this.stateType = 1;
				this.stateRem = 3;
			break;
			case 'shower':
				this.currentState = 'shower';
				this.stateType = 1;
				this.stateRem = 2;
			break;
			case 'playGround':
				this.currentState = 'playing';
				this.stateType = 1;
				this.stateRem = 4;
			break;
			case 'sleep':
			{
				this.currentState = 'sleep';
				this.stateType = 1;
				if (this.fatigue > 0.35 * this.capacity)
					this.stateRem = 1;
				else 
					this.stateRem = 40;
					
			}
			break;

		}
	},

	//STATES
	s_fine: function()
	{
		this.a_hunger *= 1;
		this.a_happy *= 1;
		this.a_fatigue *= 1;
		this.a_weight *= 1;
		this.a_hygiene *= 1;
		this.a_bladder *= 1;
	},
	s_hungry: function()
	{
		this.a_hunger *= 0.8;
		this.a_happy *= 2;
		this.a_fatigue *= 1.5;
		this.a_weight *= 1.3;
		this.a_hygiene *= 1;
		this.a_bladder *= 0.8;
	},
	s_unhappy: function()
	{
		this.a_hunger *= 0.8;
		this.a_happy *= 1;
		this.a_fatigue *= 1.5;
		this.a_weight *= 1.3;
		this.a_hygiene *= 1.1;
		this.a_bladder *= 1.1;
	},	
	s_tired: function()
	{
		this.a_hunger *= 1.3;
		this.a_happy *= 1;
		this.a_fatigue *= 1;
		this.a_weight *= 0.8;
		this.a_hygiene *= 1.1;
		this.a_bladder *= 0.9;
	},	
	s_dirty: function()
	{
		this.a_hunger *= 1;
		this.a_happy *= 2.4;
		this.a_fatigue *= 1;
		this.a_weight *= 1;
		this.a_hygiene *= 1.2;
		this.a_bladder *= 1;
	},
	s_hungryUnhappy: function()
	{
		this.a_hunger *= 1.2;
		this.a_happy *= 1.5;
		this.a_fatigue *= 2.5;
		this.a_weight *= 2;
		this.a_hygiene *= 1.3;
		this.a_bladder *= 1;
	},
	s_hungryUnhappyTired: function()
	{
		this.a_hunger *= 0.7;
		this.a_happy *= 1.4;
		this.a_fatigue *= 1;
		this.a_weight *= 0.9;
		this.a_hygiene *= 1.3;
		this.a_bladder *= 0.8;
	},
	s_hungryUnhappyTiredDirty: function()
	{
		this.a_hunger *= 0.7;
		this.a_happy *= 1.3;
		this.a_fatigue *= 1.4;
		this.a_weight *= 0.7;
		this.a_hygiene *= 1.8;
		this.a_bladder *= 0.9;
	},
	s_hungryTired: function()
	{
		this.a_hunger *= 0.6;
		this.a_happy *= 1.5;
		this.a_fatigue *= 1.2;
		this.a_weight *= 0.5;
		this.a_hygiene *= 1;
		this.a_bladder *= 0.6;
	},
	s_hungryTiredDirty: function()
	{
		this.a_hunger *= 1.2;
		this.a_happy *= 2.8;
		this.a_fatigue *= 1.2;
		this.a_weight *= 0.7;
		this.a_hygiene *= 1.8;
		this.a_bladder *= 0.8;
	},	
	s_hungryDirty: function()
	{
		this.a_hunger *= 0.8;
		this.a_happy *= 2.5;
		this.a_fatigue *= 1;
		this.a_weight *= 0.8;
		this.a_hygiene *= 1.4;
		this.a_bladder *= 0.9;
	},
	s_hungryUnhappyDirty: function()
	{
		this.a_hunger *= 0.8;
		this.a_happy *= 1.5;
		this.a_fatigue *= 2.2;
		this.a_weight *= 0.8;
		this.a_hygiene *= 0.8;
		this.a_bladder *= 0.7;
	},
	s_unhappyTiredDirty: function()
	{
		this.a_hunger *= 1.7;
		this.a_happy *= 1.5;
		this.a_fatigue *= 1.4;
		this.a_weight *= 0.8;
		this.a_hygiene *= 1.6;
		this.a_bladder *= 1;
	},
	s_unhappyTired: function()
	{
		this.a_hunger *= 1.7;
		this.a_happy *= 1.1;
		this.a_fatigue *= 1.4;
		this.a_weight *= 0.7;
		this.a_hygiene *= 1.9;
		this.a_bladder *= 1;
	},	
	s_unhappyDirty: function()
	{
		this.a_hunger *= 1;
		this.a_happy *= 1.4;
		this.a_fatigue *= 1.3;
		this.a_weight *= 1;
		this.a_hygiene *= 1.6;
		this.a_bladder *= 1.2;
	},
	s_tiredDirty: function()
	{
		this.a_hunger *= 0.8;
		this.a_happy *= 1.8;
		this.a_fatigue *= 0.8;
		this.a_weight *= 0.7;
		this.a_hygiene *= 1.6;
		this.a_bladder *= 0.8;
	},
	s_feedCake: function()
	{
		this.a_hunger *= -17;
		this.a_happy *= -17;
		this.a_fatigue *= 1.2;
		this.a_weight *= -12;
		this.a_hygiene *= 1.1;
		this.a_bladder *= -3;
		
		this.stateRem--;
		if (this.stateRem <= 0) this.stateType = 0;
	},
	s_feedBur: function()
	{
		this.a_hunger *= -20;
		this.a_happy *= -12;
		this.a_fatigue *= 1.6;
		this.a_weight *= -12;
		this.a_hygiene *= 1.2;
		this.a_bladder *= -2;
		
		this.stateRem--;
		if (this.stateRem <= 0) this.stateType = 0;
	},
	s_feedVeg: function()
	{
		this.a_hunger *= -18;
		this.a_happy *= 0.3;
		this.a_fatigue *= 1.1;
		this.a_weight *= -7;
		this.a_hygiene *= 1.0;
		this.a_bladder *= -1;
		
		this.stateRem--;
		if (this.stateRem <= 0) this.stateType = 0;
	},
	s_shower: function()
	{
		this.a_hunger *= 0.9;
		this.a_happy *= 1.30;
		this.a_fatigue *= 0.9;
		this.a_weight *= 1.1;
		this.a_hygiene *= -25;
		this.a_bladder *= -25;
		this.stateRem--;
		if (this.stateRem <= 0) this.stateType = 0;
	},
	s_playing: function()
	{
		this.a_hunger *= 1.1; 
		this.a_happy *= -20;
		this.a_fatigue *= 1.5;
		this.a_weight *= -1.70;
		this.a_hygiene *= 1.5;
		this.a_bladder *= 1;
		
		this.stateRem--;
		if (this.stateRem <= 0) this.stateType = 0;
	},
	s_sleep: function()
	{
		this.a_hunger *= 0.1; 
		this.a_happy *= 0.1;
		this.a_fatigue *= -5;
		this.a_weight *= 0.1;
		this.a_hygiene *= 0.1;
		this.a_bladder *= 0.1;
		
		this.stateRem--;
		if (this.stateRem <= 0) this.stateType = 0;
	}
});

var World = Base.extend(
{
	initialize: function()
	{
		this.playedtime=playedtime;
		this.night=night;
		this.date = new Date();
	},
	isNight: function()
	{
		var sunset, sunrise;
		var month = this.date.getMonth();
		var hour = this.date.getHour();
		
		switch (month)
		{
			case 10:
			case 11:
			case 0:	sunset=7; sunrise=16; break;
			case 1: sunset=7; sunrise=17; break;
			case 2: sunset=6; sunrise=18; break;
			case 8:
			case 3: sunset=6; sunrise=19; break;
			case 7:
			case 4: sunset=5; sunrise=20; break;
			case 5:
			case 6: sunset=5; sunrise=21; break;
			case 9: sunset=7; sunrise=18; break;
		}
			
		if (hour < sunset || hour > sunrise) return 1;
		else return 0;
	}
});

var Banner = Base.extend(
{
	initialize: function()
	{ 
		// initializations counter
		this.initCount = new PointText(new Point(490, 20));
		this.initCount.content = 0;
		this.initCount.style = { fontSize: 15, fillColor: '#ff0000' };
		
		//styles of bars
		this.bordersStyle={ strokeWidth: 2, strokeColor: '#000000', fillColor: '#888888' };
		
		// hunger bar
		this.hungerBarBorder = new Path.Rectangle(14, 14, 22, 102);
		this.hungerBarBorder.style = this.bordersStyle;
		this.hungerBar = new Path.Rectangle(15, 15, 20, 100);
		this.hungerBarGradient = new Gradient(['#ff8888', '#dd2222', '#ff5555']);
		this.hungerBar.fillColor = new GradientColor(this.hungerBarGradient, this.hungerBar.bounds.leftCenter, this.hungerBar.bounds.rightCenter);
		this.hungerBarPicture = new Raster('hungerIcon');
		this.hungerBarPicture.position = new Point(15, 120);
		this.hungerBarPicture.fitBounds(new Rectangle(this.hungerBarPicture.position, new Size(20,20)));


		//happiness bar
		this.happyBarBorder = new Path.Rectangle(44, 14, 22, 102);
		this.happyBarBorder.style = this.bordersStyle;
		this.happyBar = new Path.Rectangle(45, 15, 20, 100);
		this.happyBarGradient = new Gradient(['#01DF01', '#088A08', '#04B404']);
		this.happyBar.fillColor = new GradientColor(this.happyBarGradient,this.happyBar.bounds.leftCenter, this.happyBar.bounds.rightCenter);
		this.happyBarPicture = new Raster('happyIcon');
		this.happyBarPicture.position = new Point(45, 120);
		this.happyBarPicture.fitBounds(new Rectangle(this.happyBarPicture.position, new Size(20,20)));


		//fatigue bar
		this.fatigueBarBorder = new Path.Rectangle(74, 14, 22, 102);
		this.fatigueBarBorder.style = this.bordersStyle;
		this.fatigueBar = new Path.Rectangle(75, 15, 20, 100);
		this.fatigueBarGradient = new Gradient(['#A4A4A4', '#424242', '#6E6E6E']);
		this.fatigueBar.fillColor = new GradientColor(this.fatigueBarGradient,this.fatigueBar.bounds.leftCenter, this.fatigueBar.bounds.rightCenter);

		this.fatigueBarPicture = new Raster('fatigueIcon');
		this.fatigueBarPicture.position = new Point(75, 120);
		this.fatigueBarPicture.fitBounds(new Rectangle(this.fatigueBarPicture.position, new Size(20,20)));

		//hygiene bar
		this.hygieneBarBorder = new Path.Rectangle(104, 14, 22, 102);
		this.hygieneBarBorder.style = this.bordersStyle;
		this.hygieneBar = new Path.Rectangle(105, 15 , 20, 100);
		this.hygieneBarGradient = new Gradient(['#2E64FE', '#0101DF', '#0040FF']);
		this.hygieneBar.fillColor = new GradientColor(this.hygieneBarGradient,this.hygieneBar.bounds.leftCenter, this.hygieneBar.bounds.rightCenter);

		this.hygieneBarPicture = new Raster('hygieneIcon');
		this.hygieneBarPicture.position = new Point(105, 120);
		this.hygieneBarPicture.fitBounds(new Rectangle(this.hygieneBarPicture.position, new Size(20,20)));
	
		//bladder bar
		this.bladderBarBorder = new Path.Rectangle(134, 14, 22, 102);
		this.bladderBarBorder.style = this.bordersStyle;
		this.bladderBar = new Path.Rectangle(135, 15, 20, 100);
		this.bladderBarGradient = new Gradient(['#B45F04', '#61380B', '#8A2908']);
		this.bladderBar.fillColor = new GradientColor(this.bladderBarGradient,this.bladderBar.bounds.leftCenter, this.bladderBar.bounds.rightCenter);

		this.bladderBarPicture = new Raster('bladderIcon');
		this.bladderBarPicture.position = new Point(135, 120);
		this.bladderBarPicture.fitBounds(new Rectangle(this.bladderBarPicture.position, new Size(20,20)));
	

		//weigth bar
		this.weightBarBorder = new Path.Rectangle(164, 14, 22, 102);
		this.weightBarBorder.style = this.bordersStyle;
		this.weightBar = new Path.Rectangle(165, 15, 20, 100);
		this.weightBarGradient = new Gradient(['#F4FA58', '#AEB404', '#FFFF00']);
		this.weightBar.fillColor = new GradientColor(this.weightBarGradient,this.weightBar.bounds.leftCenter, this.weightBar.bounds.rightCenter);
		this.weightBarPicture = new Raster('weightIcon');
		this.weightBarPicture.position = new Point(165, 120);
		this.weightBarPicture.fitBounds(new Rectangle(this.weightBarPicture.position, new Size(20,20)));

	},
	incCounter: function()
	{
		this.initCount.content++;
	},
	
	updateBar: function(pet)
	{
		
		this.hungerBar.bounds.top = 15 + 100 - ((100/pet.capacity) * pet.hunger);
		this.happyBar.bounds.top = 15 + 100 - ((100/pet.capacity) * pet.happiness);
		this.fatigueBar.bounds.top = 15 + 100 - ((100/pet.capacity) * pet.fatigue);
		this.hygieneBar.bounds.top = 15 + 100 - ((100/pet.capacity) * pet.hygiene);
		this.bladderBar.bounds.top = 15 + 100 - ((100/pet.capacity) * pet.bladder);
		this.weightBar.bounds.top = 15 + 100 - ((100/pet.capacity) * pet.weight);
	}
});

var actionBar = Base.extend(
{
	initialize: function()
	{
		// Create actionBar on bottom in two groups
//		this.barRectangle = new Path.Rectangle(new Point(0, 412), new Size(512,100));
//		this.barRectangle.fillColor = '#aaaaaa';
		
		this.feedOn = new Raster('feedOn');
		this.feedOff = new Raster('feedOff');
		this.feedOff.position = this.feedOn.position = new Point(64, 462);
		this.feedOn.visible = 0;
		this.feedOff.clickable = true;
	//	this.feedOn.clickable = true;
		this.feedOff.goTo = this.feedOn;
		this.feedOn.goTo = this.feedOff;
		this.feedOff.buttonFor = 'action';
		this.feedOff.action = 'turnOnFeedMenu';

		this.playOn = new Raster('playOn');
		this.playOff = new Raster('playOff');
		this.playOff.position = this.playOn.position = new Point(192, 462);
		this.playOn.visible = 0;
		this.playOff.clickable = true;
	//	this.playOn.clickable = true;
		this.playOff.goTo = this.playOn;
		this.playOn.goTo = this.playOff;
		this.playOff.buttonFor = 'action';
		this.playOff.action = 'playGround';

		this.washOn = new Raster('washOn');
		this.washOff = new Raster('washOff');
		this.washOff.position = this.washOn.position = new Point(320, 462);
		this.washOn.visible = 0;
		this.washOff.clickable = true;
	//	this.washOn.clickable = true;
		this.washOff.goTo = this.washOn;
		this.washOn.goTo = this.washOff;
		this.washOff.buttonFor = 'action';
		this.washOff.action = 'shower';

		this.sleepOn = new Raster('sleepOn');
		this.sleepOff = new Raster('sleepOff');
		this.sleepOff.position = this.sleepOn.position = new Point(448, 462);
		this.sleepOn.visible = 0;
		this.sleepOff.clickable = true;
	//	this.sleepOn.clickable = true;
		this.sleepOff.goTo = this.sleepOn;
		this.sleepOn.goTo = this.sleepOff;
		this.sleepOff.buttonFor = 'action';
		this.sleepOff.action = 'sleep';

		// Create group of this icons
		this.mainActionBarOn = new Group([this.playOn, this.feedOn, this.washOn, this.sleepOn]);
		this.mainActionBarOff = new Group([this.playOff, this.feedOff, this.washOff, this.sleepOff]);

		// Back arrow for next groups
		this.arrowBackOn = new Raster('arrowBackOn');
		this.arrowBackOff = new Raster('arrowBackOff');
		this.arrowBackOn.position = this.arrowBackOff.position = new Point(64, 462);
		this.arrowBackOff.goTo = this.arrowBackOn;
		this.arrowBackOff.clickable = true;
		this.arrowBackOff.buttonFor = 'action';
		this.arrowBackOff.action = 'turnOffFeedMenu';


		// feed Group
		this.feedCakeOn = new Raster('feedCakeOn');
		this.feedCakeOff = new Raster('feedCakeOff');
		this.feedCakeOn.position = this.feedCakeOff.position = new Point(192, 462);
		this.feedCakeOff.goTo = this.feedCakeOn;
		this.feedCakeOff.clickable = true;
		this.feedCakeOff.buttonFor = 'action';
		this.feedCakeOff.action = 'feedPetCake';

		this.feedBurOn = new Raster('feedBurOn');
		this.feedBurOff = new Raster('feedBurOff');
		this.feedBurOn.position = this.feedBurOff.position = new Point(320, 462);
		this.feedBurOff.goTo = this.feedBurOn;
		this.feedBurOff.clickable = true;
		this.feedBurOff.buttonFor = 'action';
		this.feedBurOff.action = 'feedPetBur';
		
		this.feedVegOn = new Raster('feedVegOn');
		this.feedVegOff = new Raster('feedVegOff');
		this.feedVegOn.position = this.feedVegOff.position = new Point(448, 462);
		this.feedVegOff.goTo = this.feedVegOn;
		this.feedVegOff.clickable = true;
		this.feedVegOff.buttonFor = 'action';
		this.feedVegOff.action = 'feedPetVeg';
		
		this.feedActionBarOn = new Group([this.arrowBackOn, this.feedCakeOn, this.feedBurOn, this.feedVegOn]);
		this.feedActionBarOff = new Group([this.arrowBackOff, this.feedCakeOff, this.feedBurOff, this.feedVegOff]);

		//SET STARTUP PROPERTIES
		this.feedActionBarOn.moveBelow(this.mainActionBarOn);
		this.feedActionBarOff.moveBelow(this.mainActionBarOn);
		this.feedActionBarOn.visible = 0;
		this.feedActionBarOff.visible = 0;
		

	},
	overBar: function(icon)
	{
		icon.visible = 0;
		icon.goTo.visible = 1;
	},
	offBar: function(icon)
	{
		icon.visible = 1;
		icon.goTo.visible = 0;
	},
	turnFeedMenuOn: function()
	{
		this.mainActionBarOn.visible = 0;
		this.mainActionBarOff.visible = 0;
		this.feedActionBarOn.moveAbove(this.mainActionBarOff);
		this.feedActionBarOff.moveAbove(this.feedActionBarOn);
		this.feedActionBarOff.visible = 1;
		this.feedActionBarOn.visible = 1;
	},
	turnFeedMenuOff: function()
	{
		this.mainActionBarOff.moveAbove(this.feedActionBarOff);
		this.mainActionBarOn.moveBelow(this.mainActionBarOff);
		this.feedActionBarOff.visible = 0;
		this.feedActionBarOn.visible = 0;
		this.mainActionBarOff.visible = 1;
		this.mainActionBarOn.visible = 1;
	}
	
	

});

var Animation = Base.extend(
{
	initialize: function()
	{
		this.petStateText = new PointText(new Point(286,20));
		this.petStateText.fillColor = '#dd1155';
		this.petStateText.justification = 'center';
		this.petStateText.fontSize = 20;
		
		this.petBody = new Path();
		this.petBody.strokeColor = 'red';
		this.petBody.strokeWidth = 3;
		this.petBody.add(new Point(200, 200));
		this.petBody.add(new Point(300, 200));
		this.petBody.add(new Point(300, 300));
		this.petBody.add(new Point(200, 300));
		this.petBody.closed = true;
		this.petBody.smooth();
		
		this.leftEye = new Path();
		this.leftEye.strokeColor = 'red';
		this.leftEye.strokeWidth = 2;
		this.leftEye.add(new Point (215,215));
		this.leftEye.add(new Point (220,225));
		this.leftEye.add(new Point (215,225));
		this.leftEye.closed = true;
		//this.leftEye.add(new Point (210,215));
				
		this.rigEye = new Path();
		this.rigEye.strokeColor = 'red';
		this.rigEye.strokeWidth = 2;
		this.rigEye.add(new Point (285,215));
		this.rigEye.add(new Point (280,225));
		this.rigEye.add(new Point (290,225));
		this.rigEye.closed = true;
		
		this.smileMid = new Point (248,285);
		this.smile = new Path();
		this.smile.strokeColor = 'red';
		this.smile.strokeWidth = 3;
		this.smile.add(new Point (215,285));
		this.smile.add(this.smileMid);
		this.smile.add(new Point (280,285));
		this.smile.smooth();
		
	},

	updateSmile: function(happy, cap)
	{
		var start = 274;
		var move = (happy/cap)*35;
		this.smile.segments[1].point.y = start + move;
	},
	
	setStateText: function(state)
	{
		this.petStateText.content = state;
	}


});

function loadPet()
{
	if (localStorage.isTherePet==1)
	{
		var storedPet = JSON.parse(localStorage.pet);
		pet = new Pet(storedPet.name, new Date(storedPet.birthday), storedPet.ownername, storedPet.age, storedPet.hunger, storedPet.weight, storedPet.fatigue, storedPet.happiness, storedPet.hygiene, storedPet.bladder, storedPet.currentState, storedPet.capacity);
	}
	else 
	{
		if (ownername=='')
		{
			names = new getName("What's your name?");
			console.log(names.name.content);
		}
		else if (petname=='')
		{
			names = new getName("What's your Pet name?");
		}
		else if (ownername!='' && petname!='')
		{
			var date = new Date();
			pet = new Pet(petname, date, ownername, 0, 150, 150, 150, 100, 100, 150, 'fine', 200);
			pet.save();
		}
	}
	console.log(pet);
	init();
}
function start()
{
	loadBackground();
	menu = new Menu;
}
function play()
{
	menu.menuLayer.remove();
	loadPet();
}
function reset()
{
	localStorage.isTherePet=0;
	localStorage.removeItem("pet");
}
function init()
{
	var layer = new Layer();
	banner = new Banner;
	actionBar = new actionBar;
	animation = new Animation;
	var instance = setInterval(live,speed);

	live();
}

function live()
{
	banner.incCounter();
	animation.setStateText(pet.showState());
	animation.updateSmile(pet.happiness, pet.capacity);
	pet.updatePet();
	banner.updateBar(pet);
	pet.save();
	console.log(banner);
	
}



start();
console.log(localStorage);
