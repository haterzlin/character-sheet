import React from 'react';
import './vtm.css';



class Stat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hoverToggle : false,
      hoverPointer : null,
    }    
  }
  
  handleHover(i, hover){
    if (!hover) i=null; 
    this.setState({
      hoverToggle : hover,
      hoverPointer: i,
    });
  }
  
  classNamePoint(i){
    
    const value = this.props.value;
    const fill = i<=value;
    const ptr = this.state.hoverPointer;
    const init = false;
    const bonus = false;
    const hover = (ptr && (i!=ptr) &&!(i>ptr) === i>value) ? ' mOver' : '';
    const picker = init ? ' init' : fill ? ' fill' : bonus ? ' bonus' : '';
    const name = 'point' + picker + hover;
    return name;
  }
  renderPoint (i){
    return (
      <button
        
        className={this.classNamePoint(i)}
        onClick = {()=> this.props.onClick(i, this.props.pos)}
        onMouseEnter = {() => this.handleHover(i , true)}
        onMouseLeave = {() => this.handleHover(i , false)}        
        value = {i}
        >
        </button>
    );
  }
  
  render(){
    return(
      <div className="stat">
        {this.props.title}
        <div className="points">
          {this.renderPoint(1)}
          {this.renderPoint(2)}
          {this.renderPoint(3)}
          {this.renderPoint(4)}
          {this.renderPoint(5)}
        </div>       
      </div>
    );
    
  }
}

class StatList extends React.Component{
  constructor (props) {
    super(props);
    this.setState ({
      resource: this.props.resource,  
      values : this.props.values, 
    });
  }
  
  handleClick(i, pos){
    
    const init = this.props.values[pos];
    var stat = this.state.values.slice();
    const rsrc = this.state.resource;
    var diff = i - stat[pos];

    if (diff>rsrc) {
      if (rsrc === 0) return; 
      i=stat[pos]+rsrc;
      diff = rsrc;     
    }      
    if (i <= init) {
      if (stat[pos]===init) return; 
      i=init+1;
      diff+=init;
    }    
    if (diff <= 0) {
      diff--;
      i--;
    }
        
    stat[pos] = i;  
    this.setState({
      resource : rsrc - diff,
      values : stat,
    });            
  }
  renderResource(){
    const rsrc = this.state.resource;    
    const space = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';
    const render = rsrc>0 ? ' ('+ rsrc +')' : space;
    return render;    
  }
  
  renderStat (j){
  return(
    <li key={this.props.keys[j]}>
      <Stat 
      value= {this.state.values[j]}
      title = {this.props.titles[j]}
      onClick ={(i, pos)=>this.handleClick(i, pos)} 
      pos = {j}/>
    </li>
    );
  } 
  
  render(){
  return(
    <div className="statList">
    <h3>{this.props.title}{this.renderResource()}</h3>
      <ul className="ul">
        {this.renderStat (0)}
        {this.renderStat (1)}
        {this.renderStat (2)}
      </ul>
    </div>
  );   
  }
}

class Sheet extends React.Component{
  render(){
  const keys = ["str","dex","sta"]
  const values = [1,1,1]
  const titles = ["Strength","Dexterity","Stamina"]
  return(
    <div>
      <StatList
        resource = {3}
        keys = {keys}
        values = {values}
        titles = {titles}
        title = {"Physical"}
      />
    </div>
  );
  }
}

export default Sheet;
//===========================================================
/*
ReactDOM.render(
  <Sheet />  
  document.getElementById('root')
);
*/
