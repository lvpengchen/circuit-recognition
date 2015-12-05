function Point(x, y){
	this.X = x;
	this.Y = y;
}

function Gate(name, points){
	this.Name = name;
	this.BoundBox = findBB(_points);
	this.Height = this.BoundBox.maxY - this.BoundBox.minY;
	this.Width = Math.round(this.Height * 9.0 / 4.0);
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
			break;
		case "NOT":
			this.Pin = new Array(
				new Point(offsetX + 0.03 * this.Width, offsetY + 1 / 2 * this.Height),
				new Point(offsetX + 0.97 * this.Width, offsetY+ 1 / 2 * this.Height)
			)
			break;
	}
}