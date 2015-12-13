//parameters
var noMatchScoreThreshold = -0.5;
var waitTimeForNextStroke = 2000;//ms

//global variables
var _isDown, _points, _points_single, _strokeID, _r, _r1, _r2, _check, _check_wire, _g, _rc, timerForRecognize,_gatesArray; // global variables
//page instantiation
function onLoadEvent()
{
	_points = new Array(); // point array for current stroke
	_points_single = new Array(); //array of point in one stroke
	_strokeID = 0;
	_check = 0;  //check if there is a line
	_check_wire = 0;
	_gatesArray = new Array();
	_r = new PDollarRecognizer();
	_r1 = new PDollarRecognizer();
	_r1.addGates(
		new Array(
			new PointCloud("AND", new Array(
				new Point(499,291,1),new Point(499,337,1),new Point(499,366,1),new Point(499,400,1),
				new Point(499,290,2),new Point(531,290,2),new Point(561,290,2),new Point(589,302,2),new Point(607,327,2),new Point(611,347,2),new Point(603,372,2),new Point(587,391,2),new Point(563,401,2),new Point(536,402,2),new Point(500,401,2)
			)),
			new PointCloud("NAND", new Array(
				new Point(499,291,1),new Point(499,337,1),new Point(499,366,1),new Point(499,400,1),
				new Point(499,290,2),new Point(531,290,2),new Point(561,290,2),new Point(589,302,2),new Point(607,327,2),new Point(611,347,2),new Point(603,372,2),new Point(587,391,2),new Point(563,401,2),new Point(536,402,2),new Point(500,401,2),
				new Point(628,334,3),new Point(617,340,3),new Point(616,348,3),new Point(623,357,3),new Point(636,356,3),new Point(642,346,3),new Point(635,336,3),new Point(629,334,3)
			)),
			new PointCloud("NOT", new Array(
				new Point(323,600,1),new Point(323,619,1),new Point(323,639,1),
				new Point(323,600,2),new Point(362,619,2),new Point(323,638,2),//619
				new Point(363,619,3),new Point(365,622,3),new Point(367,623,3),new Point(370,622,3),new Point(371,620,3),new Point(370,617,3),new Point(367,616,3),new Point(364,617,3),new Point(363,619,3)
			))
			// new PointCloud("INPUT", new Array(
			// 	new Point(445,382,1),new Point(445,520,1),
			// 	new Point(445,382,2),new Point(594,382,2),new Point(594,520,2),
			// 	new Point(445,520,3),new Point(594,520,3)
			// )),
			// new PointCloud("OUTPUT", new Array(
			// 	new Point(346,339,1),new Point(265,569,1),
			// 	new Point(346,339,2),new Point(708,339,2),new Point(627,569,2),
			// 	new Point(256,569,3),new Point(627,569,3)
			// ))
		)
	);
	_r2 = new PDollarRecognizer();
	_r2.addGates(
		new Array(
	        new PointCloud("OR", new Array(
	            new Point(493,320,1),new Point(500,334,1),new Point(506,349,1),new Point(510,373,1),new Point(509,390,1),new Point(504,407,1),new Point(498,422,1),new Point(491,432,1),
	            new Point(492,319,2),new Point(518,319,2),new Point(541,319,2),new Point(553,321,2),new Point(571,326,2),new Point(586,334,2),new Point(601,346,2),new Point(614,361,2),new Point(622,376,2),new Point(610,395,2),new Point(596,410,2),new Point(579,421,2),new Point(557,428,2),new Point(542,431,2),new Point(521,430,2),new Point(493,430,2)
        	)),
	        new PointCloud("XOR", new Array(
	            new Point(472,318,1),new Point(482,332,1),new Point(486,346,1),new Point(492,362,1),new Point(493,374,1),new Point(490,393,1),new Point(485,411,1),new Point(473,431,1),
	            new Point(493,320,2),new Point(500,334,2),new Point(506,349,2),new Point(510,373,2),new Point(509,390,2),new Point(504,407,2),new Point(498,422,2),new Point(491,432,2),
	            new Point(492,319,3),new Point(518,319,3),new Point(541,319,3),new Point(553,321,3),new Point(571,326,3),new Point(586,334,3),new Point(601,346,3),new Point(614,361,3),new Point(622,376,3),new Point(610,395,3),new Point(596,410,3),new Point(579,421,3),new Point(557,428,3),new Point(542,431,3),new Point(521,430,3),new Point(493,430,3)
	        )),
	        new PointCloud("NOR", new Array(
	            new Point(493,320,1),new Point(500,334,1),new Point(506,349,1),new Point(510,373,1),new Point(509,390,1),new Point(504,407,1),new Point(498,422,1),new Point(491,432,1),
	            new Point(492,319,2),new Point(518,319,2),new Point(541,319,2),new Point(553,321,2),new Point(571,326,2),new Point(586,334,2),new Point(601,346,2),new Point(614,361,2),new Point(622,376,2),new Point(610,395,2),new Point(596,410,2),new Point(579,421,2),new Point(557,428,2),new Point(542,431,2),new Point(521,430,2),new Point(493,430,2),
	            new Point(635,363,3),new Point(625,368,3),new Point(622,379,3),new Point(631,385,3),new Point(635,387,3),new Point(645,382,3),new Point(648,375,3),new Point(641,365,3),new Point(635,363,3)
	        )),
	        new PointCloud("XNOR", new Array(
	            new Point(472,318,1),new Point(482,332,1),new Point(486,346,1),new Point(492,362,1),new Point(493,374,1),new Point(490,393,1),new Point(485,411,1),new Point(473,431,1),
	            new Point(493,320,2),new Point(500,334,2),new Point(506,349,2),new Point(510,373,2),new Point(509,390,2),new Point(504,407,2),new Point(498,422,2),new Point(491,432,2),
	            new Point(492,319,3),new Point(518,319,3),new Point(541,319,3),new Point(553,321,3),new Point(571,326,3),new Point(586,334,3),new Point(601,346,3),new Point(614,361,3),new Point(622,376,3),new Point(610,395,3),new Point(596,410,3),new Point(579,421,3),new Point(557,428,3),new Point(542,431,3),new Point(521,430,3),new Point(493,430,3),
	            new Point(635,363,4),new Point(625,368,4),new Point(622,379,4),new Point(631,385,4),new Point(635,387,4),new Point(645,382,4),new Point(648,375,4),new Point(641,365,4),new Point(635,363,4)
	        )),
					new PointCloud("IO", new Array(
							new Point(524,295,1),new Point(539,296,1),new Point(566,300,1),new Point(584,305,1),new Point(594,309,1),new Point(600,312,1),new Point(612,317,1),new Point(623,324,1),new Point(633,331,1),
							new Point(643,340,1),new Point(655,350,1),new Point(663,360,1),new Point(670,369,1),new Point(676,377,1),new Point(682,388,1),new Point(688,401,1),new Point(693,411,1),new Point(694,415,1),
							new Point(698,428,1),new Point(701,440,1),new Point(703,455,1),new Point(704,465,1),new Point(704,475,1),new Point(703,502,1),new Point(700,518,1),new Point(696,532,1),new Point(689,548,1),
							new Point(682,563,1),new Point(670,582,1),new Point(660,595,1),new Point(648,608,1),new Point(638,616,1),new Point(620,629,1),new Point(604,638,1),new Point(587,654,1),new Point(570,650,1),
							new Point(554,654,1),new Point(542,655,1),new Point(524,656,1),new Point(509,656,1),new Point(498,654,1),new Point(486,652,1),new Point(472,648,1),new Point(463,645,1),new Point(448,639,1),
							new Point(438,634,1),new Point(429,628,1),new Point(417,621,1),new Point(406,612,1),new Point(397,603,1),new Point(385,590,1),new Point(378,581,1),new Point(371,570,1),new Point(363,557,1),
							new Point(363,557,1),new Point(357,541,1),new Point(352,529,1),new Point(348,513,1),new Point(344,491,1),new Point(344,476,1),new Point(347,448,1),new Point(350,427,1),new Point(357,407,1),
							new Point(367,389,1),new Point(378,371,1),new Point(390,355,1),new Point(402,343,1),new Point(415,333,1),new Point(432,321,1),new Point(451,310,1),new Point(472,303,1),new Point(499,296,1),
							new Point(519,295,1),new Point(529,295,1)
					))
    	)
	);

	var canvas = document.getElementById('myCanvas');
	_g = canvas.getContext('2d');
	_g.lineWidth = 3;
	_g.font = "16px Gentilis";
	_rc = getCanvasRect(canvas); // canvas rect on page
	_g.fillStyle = "rgb(255,255,136)";
	_g.fillRect(0, 0, _rc.width, 20);
	_isDown = false;
}
function getCanvasRect(canvas)
{
	var w = canvas.width;
	var h = canvas.height;

	var cx = canvas.offsetLeft;
	var cy = canvas.offsetTop;
	while (canvas.offsetParent != null)
	{
		canvas = canvas.offsetParent;
		cx += canvas.offsetLeft;
		cy += canvas.offsetTop;
	}
	return {x: cx, y: cy, width: w, height: h};
}
function getScrollY()
{
	var scrollY = 0;
	scrollY = window.scrollY;
	// if (typeof(document.body.parentElement) != 'undefined')
	// {
	// 	scrollY = document.body.parentElement.scrollTop; // IE
	// }
	// else if (typeof(window.pageYOffset) != 'undefined')
	// {
	// 	scrollY = window.pageYOffset; // FF
	// }
	return scrollY;
}
//
// Mouse Events
//
function mouseDownEvent(x, y, button)
{
	document.onselectstart = function() { return false; } // disable drag-select
	document.onmousedown = function() { return false; } // disable drag-select
	if (button <= 1)
	{

		x -= _rc.x;
		y -= _rc.y - getScrollY();

		_isDown = true;
		if (_strokeID == 0) // starting a new gesture
		{
			_points.length = 0;
			//_g.clearRect(0, 0, _rc.width, _rc.height);
			_check = 0;
			_check_wire = 0
		}
		_points[_points.length] = new Point(x, y, ++_strokeID);

		var clr = "rgb(" + 255 + "," + 255 + "," + 255 + ")"; // stroke color
		_g.strokeStyle = clr;
		_g.fillStyle = clr;
		_g.lineWidth = 4;

		// check if the position of the cursor is at a pin
		if (check_wire(x, y, _gatesArray)){
			_check_wire = 1;
			drawText("Pin!");
			return;
		}

		drawText("Recording stroke #" + _strokeID + "...");
		//_g.fillRect(x - 4, y - 3, 9, 9);

		window.clearTimeout(timerForRecognize);
	}
	else if (button == 2)
	{
		drawText("Recognizing gesture...");
		window.clearTimeout(timerForRecognize);
	}
}
function mouseMoveEvent(x, y, button)
{
	if (_isDown)
	{
		x -= _rc.x;
		y -= _rc.y - getScrollY();
		_points[_points.length] = new Point(x, y, _strokeID); // append
		_points_single[_points_single.length] = new Point(x, y, _strokeID);
		drawConnectedPoint(_points.length - 2, _points.length - 1);
	}
}
function mouseUpEvent(x, y, button)
{
	document.onselectstart = function() { return true; } // enable drag-select
	document.onmousedown = function() { return true; } // enable drag-select

	if (button <= 1)
	{
		if (_isDown)
		{
			x -= _rc.x;
			y -= _rc.y - getScrollY();
			if ((_check_wire) && check_wire(x,y,_gatesArray))
			{
				_points_single.length = 0;
				_strokeID = 0;
				drawText("is wire!");
				_isDown = false;
				return;
			}
			else if (_check_wire)
			{
				_points_single.length = 0;
				_strokeID = 0;
				drawText("is not wire!");
				_isDown = false;
				return;
			}


			if (isline(_points_single)){
				_check = 1;
			}
			_isDown = false;
			// drawText("Stroke #" + _strokeID + " recorded.");
			timerForRecognize = window.setTimeout(recognize, waitTimeForNextStroke, _points);
		}
	}
	else if (button == 2) // segmentation with right-click
	{
		recognize(_points);
	}
	_points_single.length = 0;
}


//core functions
function recognize(strokePoints)
{
	clearStrokeOnCanvas(strokePoints);
	if(_check == 1){
		_r = _r1;
	}
	else{
		_r = _r2;
	}
	if (strokePoints.length >= 10)
	{
		var result = _r.Recognize(strokePoints);
		if (result.Score <= noMatchScoreThreshold)
		{
			drawText("Result: No Match");
		}
		else
		{
			drawText("Result: " + result.Name + " (" + round(result.Score,2) + ").");
			_gatesArray[_gatesArray.length] = new Gate(result.Name, strokePoints);
			drawGate(_gatesArray[_gatesArray.length-1]);
			console.log(_gatesArray.length);
		}
	}
	else
	{
		drawText("Too little input made. Please try again.");
	}
	_strokeID = 0; // signal to begin new gesture on next mouse-downs
}
function drawGate(gate)
{
	var boundBox = gate.BoundBox;
	var height = boundBox.maxY - boundBox.minY;
	var width = Math.round(height * 9.0 / 4.0);
	var center = {X:boundBox.cenX, Y:boundBox.cenY};
	var image;
	switch(gate.Name)
	{
			case "AND":
				image = document.getElementById("ANDSVG");
				break;
			case "NAND":
				image = document.getElementById("NANDSVG");
				break;
			case "NOT":
				image = document.getElementById("NOTSVG");
				break;
			case "OR":
				image = document.getElementById("ORSVG");
				break;
			case "NOR":
				image = document.getElementById("NORSVG");
				break;
			case "XOR":
				image = document.getElementById("XORSVG");
				break;
			case "XNOR":
				image = document.getElementById("XNORSVG");
				break;
			case "IO":
				width = width * 4.0 / 9.0;
				image = document.getElementById("IOSVG");
				break;
	}
	var offsetX = center.X - Math.round(width/2.0);
	var offsetY = center.Y - Math.round(height/2.0);
	_g.drawImage(image, offsetX, offsetY, width, height);

	// var pin = new Gate(gateName, strokePoints);
	// if (pin.Name == "IO") return;// no pin drawing for IO
	for(var i = 0; i < gate.Pin.length; i++){
			drawPin(gate.Pin[i].X, gate.Pin[i].Y, 0.05 * gate.Height);
	}

}
function drawPin(x, y, radius)
{
	_g.beginPath();
	_g.lineWidth = 2;
	_g.arc(x,y,radius,0,2 * Math.PI, false);
	_g.closePath()
	_g.stroke();
	_g.lineWidth = 6;
}
function drawConnectedPoint(from, to)
{
	_g.beginPath();
	_g.moveTo(_points[from].X, _points[from].Y);
	_g.lineTo(_points[to].X, _points[to].Y);
	_g.closePath();
	_g.stroke();
}
function drawText(str)
{
	_g.fillStyle = "rgb(255,255,136)";
	_g.fillRect(0, 0, _rc.width, 20);
	_g.fillStyle = "rgb(0,0,255)";
	_g.fillText(str, 1, 14);
}
//
// Multistroke Adding and Clearing
//
function clearStrokeOnCanvas(points)
{
	var clr = "rgb(" + 0 + "," + 0 + "," + 0 + ")";
	_g.strokeStyle = clr;
	_g.fillStyle = clr;
	_g.lineWidth = 8;
	var strokeID = 0;
	for(var i = 0; i < points.length; i++)
	{
			if (points[i].ID != strokeID)
			{
					strokeID = points[i].ID;
					continue;
			}
			drawConnectedPoint(i, i-1);
	}

	//resotre the settings for canvas context
	clr = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
	_g.strokeStyle = clr;
	_g.fillStyle = clr;
}
function clearLastBeautifiedGate()
{
	// this function actually redraws every beautified gate except the last one
	// help user to correct the mistake made by whosoever.
	if(_gatesArray.length == 0)
	{
		drawText("No gate to be cleared");
		return;
	}
  _gatesArray.length--;
	clearStrokes();
	for (var i = 0; i < _gatesArray.length; i++)
	{
		drawGate(_gatesArray[i]);
	}
	drawText("Last Gate Cleared");
}
function clearStrokes()
{
	_points.length = 0;
	_check = 0;
	_strokeID = 0;
	_g.clearRect(0, 0, _rc.width, _rc.height);
	drawText("Canvas cleared.");

	//resotre the settings for canvas context
	clr = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
	_g.strokeStyle = clr;
	_g.fillStyle = clr;
}
function clearAll()
{
	_points.length = 0;
	_check = 0;
	_strokeID = 0;
	_gatesArray.length = 0;
	_g.clearRect(0, 0, _rc.width, _rc.height);
	drawText("Canvas cleared.");

	//resotre the settings for canvas context
	clr = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
	_g.strokeStyle = clr;
	_g.fillStyle = clr;
}
function check_wire(x, y, gates)
{
	if (gates.length == 0 || gates.length == 1) return false;
	var minDis = Infinity;
	for (var i = 0; i < gates.length; i++) {
		var Dis;
	  if (gates[i].Name == "NOT"){
			Dis = Math.min(Math.pow(gates[i].Pin[0].X - x, 2) + Math.pow(gates[i].Pin[0].Y - y, 2),
			Math.pow(gates[i].Pin[1].X - x, 2) + Math.pow(gates[i].Pin[1].Y - y, 2));
		}
		else{
			Dis = Math.min(Math.pow(gates[i].Pin[0].X - x, 2) + Math.pow(gates[i].Pin[0].Y - y, 2),
			Math.pow(gates[i].Pin[1].X - x, 2) + Math.pow(gates[i].Pin[1].Y - y, 2));
			Dis = Math.min(Math.pow(gates[i].Pin[2].X - x, 2) + Math.pow(gates[i].Pin[2].Y - y, 2), Dis);
		}

		if (Dis < minDis){
			this.startgate = gates[i];
			minDis = Dis;
		}
   }
	if(minDis < gates[0].Height * 0.2){
		return true;
	}
		return false;
}


//helper functions
function isline(points)
{
var path = 0;
    for (var i = 0; i < points.length-1; i++) {
        path += Math.sqrt(Math.pow(points[i].X - points[i+1].X, 2) + Math.pow(points[i].Y - points[i+1].Y, 2));
    }
    var line = Math.sqrt(Math.pow(points[0].X - points[points.length-1].X, 2) + Math.pow(points[0].Y - points[points.length-1].Y, 2));
    if (line > 0.96 * path){
		//drawText("is line");
    	return true;
    }
    else{
		//drawText("is not line");
    	return false;
    }
}
function rand(low, high)
{
	return Math.floor((high - low + 1) * Math.random()) + low;
}
function round(n, d) // round 'n' to 'd' decimals
{
	d = Math.pow(10, d);
	return Math.round(n * d) / d
}
