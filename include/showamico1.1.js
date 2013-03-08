//load background
var topLeft = new Point(0, 0);
var bgSize = new Size(512, 512);
var background = new Path.Rectangle(topLeft, bgSize);
background.fillColor = '#aaaaff';

function getName(heading)
{
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
	
	var confirmed = 0;
	myI = window.setInterval(getThatName(),100);
	if (confirmed==1) window.clearInterval(myI);

	var pressedKey;
	function getThatName()
	{
		if (pressedKey=='enter')
		confirmed=1;
	}

	function onKeyDown(event)
	{
		console.log(event);
		pressedKey=event.key;
		if (event.key=='enter')
		{
		  if(name.content!='')				 
		  {
			  confirmed = 1;
			  return(name.content);

		  }
		  // else type error
		}
		else if (event.key=='backspace')
		  name.content=name.content.substr(0,name.content.length-1);
		else 
		  name.content+=event.character;
	}

}
var names = getName("Whats your name");
console.log(names);
