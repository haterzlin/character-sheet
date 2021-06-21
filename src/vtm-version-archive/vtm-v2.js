import React from 'react';
//import ReactDOM from 'react-dom';
import './vtm.css';

/*
function Point(props) {
  return (
    <button 
      className={props.className}
      onClick={props.onClick}
      value={props.value}>      
    </button>
  );
}*/

class Stat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hoverToggle : false,
      hoverPointer : null,
    }    
  }
  /*hover pozn 
  https://upmostly.com/tutorials/react-onhover-event-handling-with-examples
  onHover event neexistuje
  */
  /*TODO hover Point*/
  handleHover(i, hover){
    if (!hover) i=null; 
    this.setState({
      hoverToggle : hover,
      hoverPointer: i,
    });
  }
  /*TODO classNamePoint(i)*/
  classNamePoint(i){
    //debugger;
    const value = this.props.value;
    const fill = i<=value;
    const ptr = this.state.hoverPointer;
    const init = false;//TODO
    const bonus = false;//this.props.bonus>0;//TODO
    const hover = (ptr && (i!=ptr) &&!(i>ptr) === i>value) ? ' mOver' : '';
    const picker = init ? ' init' : fill ? ' fill' : bonus ? ' bonus' : '';
    const name = 'point' + picker + hover;
    return name;
  }
  renderPoint (i){
    return (
      <button
        /*value - nieco ako i>this.state.value tak je prazdna else neni*/
        /*az bude state.value tak treba init point (i<=state je point fill i<=props je point init*/
/*        className={(i>this.props.value) ? 'point' : 'point fill'}       */
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
    /*vykresluje nody, a name/title? */    
  }
}

class StatList extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      resource: this.props.resource,  
      values : this.props.values, 
    };
  }
  
  handleClick(i, pos){
    //debugger;
    const init = this.props.values[pos];
    var stat = this.state.values.slice();
    const rsrc = this.state.resource;
    var diff = i - stat[pos];
    
        
    /*resource nesmie byt pod nulu, nastavi max*/
    if (diff>rsrc) {
      if (rsrc === 0) return; // neubere bod ked sa ho snazis pridat - mas prostor ale nie prostriedky
      i=stat[pos]+rsrc;
      diff = rsrc;     
    }
    /*zamezenie ubrani bodov pod povodnu hodnotu, nastavi min*/    
    if (i <= init) {
      if (stat[pos]===init) return; //neprida bod
      i=init+1;
      diff+=init;
    }
    /*uberam body*/
    if (diff <= 0) {
      diff--;
      i--;
    }
    
    /**/
    stat[pos] = i;  
    this.setState({
      resource : rsrc - diff,
      values : stat,
    });            
  }
  renderResource(){
    const rsrc = this.state.resource;
    /*TODO mozno nastavit ako aligh right alebo nieco... vizualne je lepsie ked text neplave ak je align center*/
    const space = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';
    const render = rsrc>0 ? ' ('+ rsrc +')' : space;
    return render;
    /*pozn nefungovalo return ( kod s {}) PRECO?*/
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
      <ul classNade="ul">
        {this.renderStat (0)}
        {this.renderStat (1)}
        {this.renderStat (2)}
      </ul>
    </div>
  );
  /*vykresluje seznam atributov, obsahuje resource pre creation */    
  }
}

class Sheet extends React.Component{
  render(){
  const keys = ["str","dex","sta"]
  const values = [1,1,1]
  const titles = ["Strength","Dexterity","Stamina"]
  /*vykresluje vsetko? */
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
