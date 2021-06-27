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
      value : this.props.value,
    }    
  }
  /*hover pozn 
  https://upmostly.com/tutorials/react-onhover-event-handling-with-examples
  onHover event neexistuje
  */
  handleHover(i, hover){
    if (!hover) i=null; 
    this.setState({
      hoverToggle : hover,
      hoverPointer: i,
    });
  }
  resolvePrice(i){}//TODO
  handleClick(){
    //debugger;
    if (!this.state.hoverPointer)return;//error TODO
    const init = this.props.value;
    var stat = this.state.value;
    const rsrc = this.props.resource;    
    var i = this.state.hoverPointer;
    var diff = i - stat;
        
    //resource nesmie byt pod nulu, nastavi max
    if (diff>rsrc) {
      if (rsrc === 0) return; // neubere bod ked sa ho snazis pridat - mas prostor ale nie prostriedky
      i=stat+rsrc;
      diff = rsrc;     
    }
    //zamezenie ubrani bodov pod povodnu hodnotu, nastavi min   
    if (i <= init) {
      if (stat===init) return; //neprida bod
      i=init+1;
      diff+=init;
    }
    //uberam body
    if (diff <= 0) {
      diff--;
      i--;
    }
    
    //vsetko je ok menim pamet
    stat = i;  
    this.setState({
      //resource : rsrc - diff,
      value : stat,
    });
    this.props.eventResourceUpdate(rsrc-diff);                
  }
  /*WIP classNamePoint(i)*/
  classNamePoint(i){
    //debugger;
    const value = this.state.value;
    const fill = i<=value;
    const ptr = this.state.hoverPointer;
    const init = i===this.props.value;
    const bonus = false;//this.props.bonus>0;//TODO
    const hover = (ptr && (i!==ptr) && ((i>ptr) !== i>value)) ? ' mOver' : '';
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
        onClick = {()=> this.handleClick()}
        onMouseEnter = {() => this.handleHover(i , true)}
        onMouseLeave = {() => this.handleHover(i , false)}        
        value = {i}
        >
        </button>
    );
  }    
  
  render(){
  /*
  const bonus = this.props.bonus;
  const max = this.props.limits-max;
  const val = this.state.value ? this.state.value : this.props.value; TODO
            {this.renderPoint(1)}
            {this.renderPoint(2)}
            {this.renderPoint(3)}          
            {this.renderPoint(4)}
            {this.renderPoint(5)}            

  */
  const renderPoints =  () => {
    //debugger;
    var accumulator = [];
    for (var i = this.props.valueScale[0]; i<=this.props.valueScale[1];i++) accumulator.push(i);
    return accumulator.map((i)=>  this.renderPoint(i));
  }
  const pointsArray = renderPoints;
    //debugger;{this.renderPoints()}
    return(
      <div>  
        <div className={"stat" + ((this.state.hoverToggle) ? "mOver" : '')}>
          {this.props.title}
          <div className="points">  
            {renderPoints()}            
          </div>       
        </div>
      {/* TODO (bonus && ((bonus + value) > max) ? '+' bonus : ''*/}
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
  
  /*
  handleClick(i, pos){
    //debugger;
    const init = this.props.values[pos];
    var stat = this.state.values.slice();
    const rsrc = this.state.resource;
    var diff = i - stat[pos];
    
        
    //resource nesmie byt pod nulu, nastavi max
    if (diff>rsrc) {
      if (rsrc === 0) return; // neubere bod ked sa ho snazis pridat - mas prostor ale nie prostriedky
      i=stat[pos]+rsrc;
      diff = rsrc;     
    }
    //zamezenie ubrani bodov pod povodnu hodnotu, nastavi min   
    if (i <= init) {
      if (stat[pos]===init) return; //neprida bod
      i=init+1;
      diff+=init;
    }
    //uberam body
    if (diff <= 0) {
      diff--;
      i--;
    }
    
    //vsetko je ok menim pamet
    stat[pos] = i;  
    this.setState({
      resource : rsrc - diff,
      values : stat,
    });            
  }*/
  updateResource(rsrc){
    if (!rsrc && rsrc < 0) return; //error TODO
    this.props.eventResourceUpdate(this.state.resource - rsrc)
    this.setState({
      resource : rsrc
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
  //debugger;
  return(
    <li key={this.props.keys[j]}>
      <Stat 
      value= {this.props.values[j]}
      valueScale = {this.props.valueScale}
      title = {this.props.titles[j]}
      onClick ={(i, pos)=>this.handleClick(i, pos)}
      resource = {this.state.resource}
      eventResourceUpdate = {(rsrc) => this.updateResource(rsrc)}/>
    </li>
    );
  } 
  
  render(){
  //debugger;
  return(
    <div className="statList">
    <h3>{this.props.title}{this.renderResource()}</h3>
      <ul className="ulStats">
        {this.renderStat (0)}
        {this.renderStat (1)}
        {this.renderStat (2)}
      </ul>
    </div>
  );
  /*vykresluje seznam atributov, obsahuje resource pre creation */    
  }
}

//mozno budu sekcie zdielat funkciu? asi nie ale
class SheetSection extends React.Component{
  eventResourceUpdate(rsrc){
    //this.props.eventResourceUpdate(rsrc);
  }
  //no a to je ta zdielana funkcia :)
  render(){
    return;
  }
}
//sekcia statov, obsahuje sumu resource
class StatSection extends SheetSection{
  constructor(props){
    super(props);
    this.state = {
      resources : this.props.resources,
      resource : this.props.resources.reduce((a,b)=> {return a+b}),
    };
  }
  
  updateResource (rsrc){
    const tmp = this.state.resource;
    this.setState({
      resource : tmp - rsrc
    });  
  }
  renderStatList(i){
    //debugger;
    return(
      <div>
        <StatList
          resource = {this.props.resources[i]}
          keys = {this.props.keys[i]}
          values = {this.props.values[i]}
          titles = {this.props.stattitles[i]}
          title = {this.props.titles[i]}
          valueScale = {this.props.valueScale}
          eventResourceUpdate = {(rsrc) => this.updateResource(rsrc)}
        />
      </div>
    );
  }
  
  
  
  render(){
    //debugger;
    return(
      <div className="statSection">
        <h2>{this.props.title} ({this.state.resource})</h2>
        {this.renderStatList(0)}
        {this.renderStatList(1)}
        {this.renderStatList(2)}
      </div>
    );
  }
}

class FeatList extends SheetSection{}

/*<StatList
          resource = {statresources[0]}
          keys = {keys1}
          values = {statvalues1}
          titles = {stattitles1}
          title = {titles[0]}
          valueScale = {[1,5]}
        />*/
//obsahuje data, parsuje, top level environment
class Sheet extends React.Component{

  render(){
    const keys1 = ["str","dex","sta"];
    const statvalues1 = [1,1,1];
    const stattitles1 = ["Strength","Dexterity","Stamina"];
    const keys2 = ["cha","man","app"];
    const statvalues2 = [1,1,1] ;
    const stattitles2 = ["Charisma","Manipulation","Appearance"];
    const keys3 = ["per","int","wit"];
    const statvalues3 = [1,1,1] ;
    const stattitles3 = ["Perception","Intelligence","Wits"];
    
    const titles = ["Physical","Social","Mental"];
    const statresources=[3,2,1];
  /*vykresluje vsetko? */
    return(
      <div>        
        <StatSection
          resources = {statresources}
          keys = {[keys1, keys2, keys3]}
          values = {[statvalues1,statvalues2,statvalues3]}
          stattitles = {[stattitles1,stattitles2,stattitles3]}
          titles = {titles}
          title = {"Attributes"}
          valueScale = {[1, 5]}
        />
      </div>
  );}
}

export default Sheet;
//===========================================================
/*
ReactDOM.render(
  <Sheet />  
  document.getElementById('root')
);
*/
