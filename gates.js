function Point(x, y){
	this.X = x;
	this.Y = y;
}

function Gate(name, points){

	this.findBB = function()
	{
		var minX = + Infinity, maxX = - Infinity, minY = + Infinity, maxY = - Infinity;
	    for (var i = 0; i < this.Points.length; i++) {
	        minX = Math.min(minX, this.Points[i].X);
	        minY = Math.min(minY, this.Points[i].Y);
	        maxX = Math.max(maxX, this.Points[i].X);
	        maxY = Math.max(maxY, this.Points[i].Y);
	    }
	    var cenX = Math.round((minX + maxX)/2);
	    var cenY = Math.round((minY + maxY)/2);

	    return {minX: minX, maxX: maxX, minY: minY, maxY: maxY, cenX: cenX, cenY: cenY};
	};

	this.Name = name;
	this.Points = points.slice();
	this.BoundBox = this.findBB();
	this.Height = this.BoundBox.maxY - this.BoundBox.minY;
	this.Width = Math.round(this.Height * 9.0 / 4.0);
	this.Pin = new Array();

	var center = {X:this.BoundBox.cenX, Y:this.BoundBox.cenY};
	var offsetX = center.X - Math.round(this.Width/2.0);
	var offsetY = center.Y - Math.round(this.Height/2.0);
	switch(name)
	{
		case "AND":
		case "NAND":
		case "OR":
		case "NOR":
		case "XOR":
		case "XNOR":
			this.Pin = new Array(
				new Point(offsetX + 0.03 * this.Width, offsetY + 0.3 * this.Height),
				new Point(offsetX + 0.03 * this.Width, offsetY + 0.7 * this.Height),
				new Point(offsetX + 0.97 * this.Width, offsetY + 1 / 2 * this.Height)
			)
			this.Input = 2;
			this.Output = 1;
			break;
		case "NOT":
			this.Pin = new Array(
				new Point(offsetX + 0.03 * this.Width, offsetY + 1 / 2 * this.Height),
				new Point(offsetX + 0.97 * this.Width, offsetY+ 1 / 2 * this.Height)
			)
			this.Input = 1;
			this.Output = 1;
			break;
	}


}

function Wire(points, gates)
{
	var minDis_start = Infinity;
	var minDis_end = Infinity;
	this.isinput = false;
	this.isoutput = false;

	for (var i = 0; i < gates.length; i++) {
		var Dis_start;
		var Dis_end;
	    if (gates[i].Name == "NOT"){
			Dis_start = Math.min(Math.pow(gates[i].Pin[0].X - points[0].X, 2) + Math.pow(gates[i].Pin[0].Y - points[0].Y, 2),
			Math.pow(gates[i].Pin[1].X - points[0].X, 2) + Math.pow(gates[i].Pin[1].Y - points[0].Y, 2));

			Dis_end = Math.min(Math.pow(gates[i].Pin[0].X - points[points.length - 1].X, 2) + Math.pow(gates[i].Pin[0].Y - points[points.length - 1].Y, 2),
			Math.pow(gates[i].Pin[1].X - points[points.length - 1].X, 2) + Math.pow(gates[i].Pin[1].Y - points[points.length - 1].Y, 2));
		}
		else if (gates[i].Name != "IO"){
			Dis_start = Math.min(Math.pow(gates[i].Pin[0].X - points[0].X, 2) + Math.pow(gates[i].Pin[0].Y - points[0].Y, 2),
			Math.pow(gates[i].Pin[1].X - points[0].X, 2) + Math.pow(gates[i].Pin[1].Y - points[0].Y, 2));
			Dis_start = Math.min(Math.pow(gates[i].Pin[2].X - points[0].X, 2) + Math.pow(gates[i].Pin[2].Y - points[0].Y, 2), Dis_start);

			Dis_end = Math.min(Math.pow(gates[i].Pin[0].X - points[points.length - 1].X, 2) + Math.pow(gates[i].Pin[0].Y - points[points.length - 1].Y, 2),
			Math.pow(gates[i].Pin[1].X - points[points.length - 1].X, 2) + Math.pow(gates[i].Pin[1].Y - points[points.length - 1].Y, 2));
			Dis_end = Math.min(Math.pow(gates[i].Pin[2].X - points[points.length - 1].X, 2) + Math.pow(gates[i].Pin[2].Y - points[points.length - 1].Y, 2), Dis_end);
		}
		else{
			// Dis_start = Infinity;
			// Dis_end = Infinity;
			// for(var j = 0; j < gates[i].Points.length; j++){
			// 	Dis_start = Math.min(Math.pow(gates[i].Points[j].X - points[0].X, 2) + Math.pow(gates[i].Points[j].Y - points[0].Y, 2),Dis_start);
			// 	Dis_end = Math.min(Math.pow(gates[i].Points[j].X - points[points.length - 1].X, 2) + Math.pow(gates[i].Points[j].Y - points[points.length - 1].Y, 2),Dis_end);
			// }
			Dis_start = Math.pow(gates[i].BoundBox.cenX - points[0].X, 2) + Math.pow(gates[i].BoundBox.cenY - points[0].Y, 2) - Math.pow(gates[i].Height/2,2);
			Dis_end = Math.pow(gates[i].BoundBox.cenX - points[points.length - 1].X, 2) + Math.pow(gates[i].BoundBox.cenY - points[points.length - 1].Y, 2) - Math.pow(gates[i].Height/2,2);
		}

		if (Dis_start < minDis_start){
			this.startgate = i;
			minDis_start = Dis_start;
			if(gates[i].Name == "IO"){
				this.isinput = true;
			}
			else{
				this.isinput = false;
			}
		}

		if (Dis_end < minDis_end){
			this.endgate = i;
			minDis_end = Dis_end;
			if(gates[i].Name == "IO"){
				this.isoutput = true;
			}
			else{
				this.isoutput = false;
			}
		}
	}
	if(minDis_start < gates[0].Height * 0.25 && minDis_end < gates[0].Height * 0.25){
		this.isWire = true;
	}
}

function IO(symbolName, symbolValue, wireIndex){
	this.symbolName = symbolName;
	this.symbolValue = symbolValue;
	this.wireIndex = wireIndex;
}
