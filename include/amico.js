function pet()
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

	// methods
	
}

function world()
{
	this.playedtime=playedtime;
	this.night=night;
	this.date = new Date();

	//methods
	this.isNight=isNight; // check if its night time
	function isNight()
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
			
		if (hour < sunset || hour > sunrise) this.isNight=1;
		else this.isNight=0;
	}
}

