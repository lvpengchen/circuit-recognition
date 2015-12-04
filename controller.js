var _isDown, _points, _strokeID, _r, _g, _rc; // global variables
function onLoadEvent()
{
	_points = new Array(); // point array for current stroke
	_points_single = new Array(); //array of point in one stroke
	_strokeID = 0;
	_check = 0;  //check if there is a line
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
	if (typeof(document.body.parentElement) != 'undefined')
	{
		scrollY = document.body.parentElement.scrollTop; // IE
	}
	else if (typeof(window.pageYOffset) != 'undefined')
	{
		scrollY = window.pageYOffset; // FF
	}
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
		_isDown = true;
		x -= _rc.x;
		y -= _rc.y - getScrollY();
		if (_strokeID == 0) // starting a new gesture
		{
			_points.length = 0;
			//_g.clearRect(0, 0, _rc.width, _rc.height);
			_check = 0;
		}
		_points[_points.length] = new Point(x, y, ++_strokeID);
		drawText("Recording stroke #" + _strokeID + "...");
		var clr = "rgb(" + 255 + "," + 255 + "," + 255 + ")"; // stroke color
		_g.strokeStyle = clr;
		_g.fillStyle = clr;
		_g.lineWidth = 4;
		//_g.fillRect(x - 4, y - 3, 9, 9);
	}
	else if (button == 2)
	{
		drawText("Recognizing gesture...");
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

	// if(_strokeID == 1)
	// {
	// 	(isline(_points))?(_r=_r1):(_r=_r2);//check if the first stroke is line or not.
	// }

	if (button <= 1)
	{
		if (_isDown)
		{
			if (isline(_points_single)){
				_check = 1;
			}
			_isDown = false;
			// drawText("Stroke #" + _strokeID + " recorded.");
		}
	}
	else if (button == 2) // segmentation with right-click
	{
		clearPoints(_points);
		if(_check == 1){
			_r = _r1;
		}
		else{
			_r = _r2;
		}

		if (_points.length >= 10)
		{
			var result = _r.Recognize(_points);
			drawText("Result: " + result.Name + " (" + round(result.Score,2) + ").");
			drawGate(result.Name);
		}
		else
		{
			drawText("Too little input made. Please try again.");
		}
		_strokeID = 0; // signal to begin new gesture on next mouse-down
		//_check = 0;
	}
	_points_single.length = 0;
}
function drawGate(gateName)
{
	var boundBox = findBB(_points);
	var width = boundBox.maxX - boundBox.minX;
	var height = boundBox.maxY - boundBox.minY;
	var image;
	switch(gateName)
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
	}
	_g.drawImage(image, boundBox.minX, boundBox.minY, width, height);
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
function rand(low, high)
{
	return Math.floor((high - low + 1) * Math.random()) + low;
}
function round(n, d) // round 'n' to 'd' decimals
{
	d = Math.pow(10, d);
	return Math.round(n * d) / d
}
//
// Multistroke Adding and Clearing
//

function clearPoints(points)
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
}

function onClickClearStrokes()
{
	_points.length = 0;
	_check = 0;
	_strokeID = 0;
	_g.clearRect(0, 0, _rc.width, _rc.height);
	drawText("Canvas cleared.");
}

function isline(points)
{
var path = 0;
    for (var i = 0; i < points.length-1; i++) {
        path += Math.sqrt(Math.pow(points[i].X - points[i+1].X, 2) + Math.pow(points[i].Y - points[i+1].Y, 2));
    }
    var line = Math.sqrt(Math.pow(points[0].X - points[points.length-1].X, 2) + Math.pow(points[0].Y - points[points.length-1].Y, 2));
    if (line > 0.96 * path){
		drawText("is line");
    	return true;
    }
    else{
	drawText("is not line");
    	return false;
    }
}
function findBB(points)
{
	var minX = + Infinity, maxX = - Infinity, minY = + Infinity, maxY = - Infinity;
    for (var i = 0; i < points.length; i++) {
        minX = Math.min(minX, points[i].X);
        minY = Math.min(minY, points[i].Y);
        maxX = Math.max(maxX, points[i].X);
        maxY = Math.max(maxY, points[i].Y);
    }
    var cenX = (minX + maxX)/2;
    var cenY = (minY + maxY)/2;

    return {minX: minX, maxX: maxX, minY: minY, maxY: maxY, cenX: cenX, cenY: cenY};
}
