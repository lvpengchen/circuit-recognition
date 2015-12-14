//helper function of exlusive or
function xor(v1,v2)
{
  return ( v1 && !v2 ) || ( !v1 && v2 );
}

//Circuit class
function Circuit(gateArray, wireArray, inputArray, outputArray)
{
  this._gateArray = gateArray;
  this._wireArray = wireArray;
  this._inputArray = inputArray;
  this._outputArray = outputArray.slice();

  this.findOutputWireIndex = function(wireIndex)
  {
    var gateIndex = this._wireArray[wireIndex].endgate;
    var items = new Array();
    for (var i = 0; i < this._wireArray.length; i++)
    {
      if (this._wireArray[i].startgate == gateIndex)
      {
        items[items.length] = i;
      }
    }
    return items;
  }

  this.findInputWireIndex = function(wireIndex)
  {
    var gateIndex = this._wireArray[wireIndex].startgate;
    var items = new Array();
    for (var i = 0; i < this._wireArray.length; i++)
    {
      if (this._wireArray[i].endgate == gateIndex)
      {
        items[items.length] = i;
      }
    }
    return items;
  }

  //recursive call this function to compute the output of the circuit.
  this.calc = function(node)
  {
    for (var i = 0; i < this._inputArray.length; i++)
    {
      if (this._inputArray[i].wireIndex == node){
        return this._inputArray[i].symbolValue
      }
    }// if node is leaf return node.value;

    var gateName = this._gateArray[this._wireArray[node].startgate].Name;
    var inputWireIndices = this.findInputWireIndex(node);

    switch (gateName) {
      case "AND": return this.calc(inputWireIndices[0]) && this.calc(inputWireIndices[1]);
      case "NAND": return !(this.calc(inputWireIndices[0]) && this.calc(inputWireIndices[1]));
      case "NOT": return !this.calc(inputWireIndices[0]);
      case "OR": return this.calc(inputWireIndices[0]) || this.calc(inputWireIndices[1]);
      case "NOR": return !(this.calc(inputWireIndices[0]) || this.calc(inputWireIndices[1]));
      case "XOR": return xor(this.calc(inputWireIndices[0]), this.calc(inputWireIndices[1]));
      case "XNOR": return !xor(this.calc(inputWireIndices[0]), this.calc(inputWireIndices[1]));
      default: return true;
    }
  }

  //finds all output symbols and recursively call this.calc to compute all outputs.
  this.calcAll = function()
  {
    var resultArray = new Array();
    for (var i = 0; i < this._outputArray.length; i++)
    {
      resultArray[resultArray.length] = new IO(this._outputArray[i].symbolName,calc(this._outputArray[i].wireIndex),this._outputArray[i].wireIndex);
    }
    return resultArray;
  }
}
