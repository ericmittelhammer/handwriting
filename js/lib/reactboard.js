 /**
   * @jsx React.DOM
   */


var Pixel = React.createClass({
    
    handleMouseEnter: function(e) {
  		this.props.onPixelActive(this.props.x, this.props.y)
    },

    getStyle: function() {
    	return { fill: 'rgb(' + this.props.r + ',' + this.props.g + ',' + this.props.b + ')' }
    },
    
    render: function() {
        return (<rect onMouseEnter={this.handleMouseEnter} onMouseDown={this.handleMouseDown}
        		style={this.getStyle()} x={this.props.x} y={this.props.y} 
        		width={this.props.width} height={this.props.height}/>);
    }
});


var Grid = React.createClass({

	getInitialState: function() {
		var pixels = new Array(this.props.x);
		for(var i=0; i<this.props.x; i++){
				pixels[i] = new Array(this.props.y);
				for(var j=0; j<this.props.y; j++){
					pixels[i][j] = {r:255, g:255, b:255};
				}
			}	
        return {pixels:pixels, drawing:false};
    },

    handleMouseDown: function(e) {
    	this.setState({drawing:true});
    },

    handleMouseUp: function(e) {
    	this.setState({drawing:false});
    },

    handlePixelActive: function(x, y){
    	//console.log(x + "," + y);
    	if(this.state.drawing) {
    		var newPixels = this.state.pixels.slice();
    		newPixels[x][y] = {r:0, g:0, b:0};
    		this.setState({pixels:newPixels});
    		/*this.state.pixels[x][y] = {r:0, g:0, b:0};
    		this.forceUpdate();*/
    	}
    },

    render: function() {
    	var pixelList = [];
    	for(var i=0; i<this.props.y; i++){
				for(var j=0; j<this.props.x; j++) {
					var p = this.state.pixels[j][i];
    				pixelList.push(<Pixel height="1" width="1" x={j} y={i} r={p.r} g={p.g} b={p.b} onPixelActive={this.handlePixelActive}/>);
    			}
    		}
    	var viewBox = "0 0 " + this.props.x + " " + this.props.y;
        return (<svg style={{border:"1px solid black"}} width={this.props.width} height={this.props.height} 
        	viewBox={viewBox} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} >{pixelList}</svg>);
    }
});