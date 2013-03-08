//load background
var topLeft = new Point(0, 0);
var bgSize = new Size(512, 512);
var background = new Path.Rectangle(topLeft, bgSize);
background.fillColor = '#aaaaff';

function onKeyDown(event)
{  if (createdGetName == 1)
	{
		console.log(event);
		if (event.key=='enter')
		{
	   }
		  // else type error
		
		else if (event.key=='backspace')
		  names.name.content=names.name.content.substr(0,names.name.content.length-1);
		else 
		  names.name.content+=event.character;
	}
}
var createdGetName = 0;
function createGetName(heading)
{	
	createdGetName = 1;
	//new layer
	//heading
	var hStart = new Point(256, 70);
	var headingfield = new PointText(hStart);
	headingfield.fillColor = '#cc4433';
	headingfield.fontSize = 50;
	headingfield.content = heading;
	headingfield.justification='center';

	//textfield
	var tfStart = new Point(166, 250);
	var tfSize = new Size(180, 30);
	var textfield = new Path.Rectangle(tfStart, tfSize);
	textfield.fillColor = '#ffffff';
	textfield.strokeColor = '#000000';
	textfield.strokeWidth = 2;

	var name = new PointText(new Point(256, 268));
	name.fillColor = '#000000';
	name.fontSize = '18';
	name.justification = 'center';
}

var names = new createGetName("Whats your name");

