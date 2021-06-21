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
      resetSwitch: false,
    }    
  }
  /*hover note 
  https://upmostly.com/tutorials/react-onhover-event-handling-with-examples
  onHover event does not exist
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
    //TODO make so that
    //debugger;
    if (!this.state.hoverPointer)return;//error TODO
    const init = this.props.value;
    var stat = this.state.value;
    const rsrc = this.props.resource;  
    var i = this.state.hoverPointer;  
    var rsrcindex = this.props.resourceVals.indexOf(i);
    var diff = i - stat;
    let tmp
    
    
     
    //adding points over limit
    if (!rsrc[rsrcindex] && (diff > 0)) {
      rsrcindex = (rsrc[rsrcindex]===false) ? rsrc.indexOf(true,rsrcindex) :rsrc.indexOf(true,0);
      tmp = this.props.resourceVals[rsrcindex];
      if(!rsrc[rsrcindex] || stat > tmp) return;// illogical to add max if max is lower than current value
      //else if (i<tmp);//dont use higher value than user points to              
      else i=tmp;              
    }
    //clicked filled point -> removing points, not below limit
    if ((diff <= 0)&&(i>init)) i--;     
    
    //OK setting values  
    this.setState({
      //resource : rsrc - diff,
      value : i,
    });
    this.props.eventResourceUpdate(i, stat); 
    //if creation end             
  }
  /*WIP classNamePoint(i)*/
  classNamePoint(i){
    //debugger;
    let value = this.state.value;
    let fill = i<=value;
    let ptr = this.state.hoverPointer;
    let init = i===this.props.value;
    let bonus = false;//this.props.bonus>0;//TODO
    let hover = (ptr && ((i>ptr) !== (i>value))) ? ' mOver' : '';
    let picker = init ? ' init' : fill ? ' fill' : bonus ? ' bonus' : '';
    let name = 'point' + picker + hover;
    return name;
  }
  renderPoint (i){
    return (
      <span        
        className={this.classNamePoint(i)}
        onClick = {()=> this.handleClick()}
        onMouseEnter = {() => this.handleHover(i , true)}
        onMouseLeave = {() => this.handleHover(i , false)}        
        value = {i}
        >
        </span>
    );
  }    
  reset(){
    //debugger;
    //alert(this.props.title + ' reset \n ' + (this.props.resource + this.state.value - this.props.value));
    //this.props.eventResourceUpdate(this.props.resource -this.props.value + this.state.value);
    this.setState({ value : this.props.value });
    this.props.eventReset();    
    //this.props.reset=false;
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
  if (this.state.resetSwitch !== this.props.reset) {
      this.setState({resetSwitch : this.props.reset});
      if (this.props.reset) this.reset();
    }
  const renderPoints =  () => {
    //debugger;
    var accumulator = [];
    for (var i = this.props.valueRange[0]; i<=this.props.valueRange[1];i++) accumulator.push(i);
    return accumulator.map((i)=>  this.renderPoint(i));
  } 
    //debugger;
    return(
      <div>  
        <div className={"stat" + ((this.state.hoverToggle) ? "mOver" : '')}>        
          <div className='statName'>{this.props.title}</div>
          <div className="points">  
            {renderPoints()}            
          </div>       
        </div>
      {/* TODO (bonus && ((bonus + value) > max) ? '+' bonus : ''*/}
      </div>  
);
  }
}

class StatList extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      resetCount : 0,
    };
  }
  
  
  //TODO
  resourceUpdate(rsrc){
    if (!rsrc && rsrc < 0) return; //error TODO
    this.props.eventResourceUpdate(this.state.resource - rsrc)
    this.setState({
      resource : rsrc
    });
    
  }  
  
  renderStat (j){
  //debugger;
  return(
    <li key={this.props.keys[j]}>
      <Stat 
      value= {this.props.values[j]}
      valueRange = {this.props.valueRange}
      title = {this.props.titles[j]}
      onClick ={(i, pos)=>this.handleClick(i, pos)}
      reset = {this.props.reset}
      eventReset = {()=> this.handleReset()}
      resource = {this.props.resource}
      resourceVals = {this.props.resourceVals}
      eventResourceUpdate = {(x,y) => this.props.eventResourceUpdate(x,y)}/>
    </li>
    );
  } 
  
  renderStats(){
    return this.props.keys.map((elem,index)=>(this.renderStat(index)))
  }
  
  render(){
  //debugger;
  return(
    <div className="statList">
    <h3>{this.props.title}</h3>
      <ul className="ulStats">
        {this.renderStats()}
      </ul>
    </div>
  );  
  }
}

//prototype for sharing methods, may be deleted
class SheetSection extends React.Component{
  eventResourceUpdate(rsrc){
    //this.props.eventResourceUpdate(rsrc);
  }  
  render(){
    return;
  }
}
//component rendering sections such as attributes, skills and disciplines
class StatSection extends SheetSection{
  constructor(props){
    super(props);
    this.state = {
      resource: Array(this.props.resource.length).fill(0),
      resetCount : 0,
    };
  }
  
  //findAndUpdateCounter(value,counter)
  
  resourceUpdate (nextVal, oldVal){
    //debugger;
    const nxtUpdate = this.props.resourceVals.indexOf(nextVal);
    const oldUpdate = this.props.resourceVals.indexOf(oldVal);
    var tmp = this.state.resource.slice();
    if (nxtUpdate!==-1) tmp[nxtUpdate]++;
    if (oldUpdate!==-1) tmp[oldUpdate]--;     
    this.setState({
      resource : tmp,
    });
    this.forceUpdate();
  /*
    const tmp = this.state.resource;
    this.setState({
      resource : tmp - rsrc
    });
    */  
  }
  handleReset(){
  this.setState({
        resetCount : this.state.resetCount + 1
      });
    if (this.state.resetCount === this.props.keys.length){
      this.setState({
        resetCount : 0,        
      });
      this.props.eventResetSwitch();
      return;
    }
  }
  
  renderStatList(i){
    //debugger;
    return(
      <div>
        <StatList
          resource = {this.props.resource.map((elem, i)  =>
            (this.props.resource[i]>this.state.resource[i]))}
          eventResourceUpdate = {(x,y) => this.resourceUpdate(x,y)}
          resourceVals = {this.props.resourceVals}
          keys = {this.props.keys[i]}
          values = {this.props.values[i]}
          titles = {this.props.stattitles[i]}
          title = {this.props.titles[i]}
          valueRange = {this.props.valueRange}
          reset = {this.props.reset}
          eventReset = {() => this.handleReset}          
        />
      </div>
    );
  }
  renderStatLists(){
    return this.props.keys.map((elem,index)=>(this.renderStatList(index)))
  }
  
  classNameResourcePoint (i,index){
    //debugger;
    let frac = this.state.resource[index]/this.props.resource[index];
    frac*=this.props.resourceVals[index];
    let fill = (frac >= i) ? ' init' : '';
    return 'point' + fill;
  }
  
  renderResource(i, index){    
    //debugger;
    let tmp = [];
    for (var j = this.props.valueRange[0]; j <= i; j++) tmp.push(j);
    return tmp.map((x)=>(
      <span
        className = {this.classNameResourcePoint(x,index)}>
      </span>
    ));
    //return Array(this.props.resource.length). this.props.valueRange[0] i))
  }
  renderResources(){
    return this.props.resourceVals.map((i, index)=>(
      <div className = {(this.state.resource[index] <= this.props.resource[index])?'resourcePoints':'resourcePoints highlight'}>
        {this.renderResource(i, index)}
        &#215;
        {this.props.resource[index]}
      </div>));        
  }
  
  render(){
    //debugger;
    return(
      <div className="statSection">
        <h2>{this.props.title}</h2>        
        {/*TODO resource*/}
        <div className="statResource">{this.renderResources()}</div>
        {this.renderStatLists()}        
      </div>
    );
  }
}
// contains basic character info health, willpower, name, age, humanity etc, and maybe character creation controls
class CharInfo extends SheetSection{
  constructor(props){
    super(props)
    this.state = {
      name : this.props.name,
      age : this.props.age,
    }
  }
  //TODO
  handleClick(){
    this.props.eventResetSwitch();
  }
  handleChange(event) {
    this.setState({name: event.target.value});  
  }
  
  render(){
    return(
      <div>
        <h1>{this.state.name}</h1>
      </div>);
  }
}
class FeatList extends SheetSection{}

/*<StatList
          resource = {statresources[0]}
          keys = {keys1}
          values = {statvalues1}
          titles = {stattitles1}
          title = {titles[0]}
          valueRange = {[1,5]}
        />*/
//contains data, parsing/import/export, top level environment
class Sheet extends React.Component{
  constructor (props){
    super(props)
    this.state = {
      resetAttributes : false,      
    }
  }
  resetSwitch(){  
    this.setState({
      resetAttributes : !this.state.resetAttributes,
    });
  }
  //reset
  render(){
  
    const keys1 = ["str","dex","sta"];
    const statvalues1 = [1,1,1];
    const stattitles1 = ["Strength","Dexterity","Stamina"];
    
    const keys2 = ["cha","man","com"];
    const statvalues2 = [1,1,1] ;
    const stattitles2 = ["Charisma","Manipulation","Composure"];
    
    const keys3 = ["int","wit","res"];
    const statvalues3 = [1,1,1] ;
    const stattitles3 = ["Intelligence","Wits","Resolve"];
    
    const keys4 = ["ath","bwl","crt","drv", "fir", "lar", "mle", "sth","sur"];
    const statvalues4 = [0,0,0,0,0,0,0,0,0];
    const stattitles4 = ["Athlethics","Brawl","Craft", "Drive", "Firearms", "Larceny", "Melee", "Stealth", "Survival"];
    
    const keys5 = ["ank","etq","sgt","tmd", "ldr", "prf", "prs", "eet","sed"];
    const statvalues5 =  [0,0,0,0,0,0,0,0,0]; ;
    const stattitles5 = ["Animal Ken","Etiquette","Insight", "Intimidation", "Leadership", "Performance", "Persuasion", "Streetwise", "Subterfuge"];
    
    const keys6 = ["ath","bwl","crt","drv", "fir", "lar", "mle", "sth","sur"];
    const statvalues6 =  [0,0,0,0,0,0,0,0,0];;
    const stattitles6 = ["Academics","Awareness","Finance", "Investigation", "Medicine", "Occult", "Politics", "Science", "Technology"];
    
    
    
    const titles = ["Physical","Social","Mental"];
    const statresource1=[1,3,4]; // 0: 4pts, 1: 3pts, 2: 2pts
    const statresourcevals1 = [4,3,2];
    const statresource2=[3,5,7]; // 0: 4pts, 1: 3pts, 2: 2pts
    const statresourcevals2 = [3,2,1];
  /*vykresluje vsetko? */
    return(
      <div> 
        <CharInfo
          name = {'A Kindred Who Is Not To Be Named'}
          age = {21}
          eventResetSwitch = {() => this.resetSwitch()}
        />
        <StatSection
          resource = {statresource1}
          resourceVals = {statresourcevals1}
          keys = {[keys1, keys2, keys3]}
          values = {[statvalues1,statvalues2,statvalues3]}
          stattitles = {[stattitles1,stattitles2,stattitles3]}
          titles = {titles}
          title = {"Attributes"}
          valueRange = {[1, 5]}
          reset = {this.state.resetAttributes}
          eventResetSwitch = {() => this.resetSwitch()}
        />
        <StatSection
          resource = {statresource2}
          resourceVals = {statresourcevals2}
          keys = {[keys4, keys5, keys6]}
          values = {[statvalues4,statvalues5,statvalues6]}
          stattitles = {[stattitles4,stattitles5,stattitles6]}
          titles = {titles}
          title = {"Skills"}
          valueRange = {[1, 5]}
          reset = {this.state.resetAttributes}
          eventResetSwitch = {() => this.resetSwitch()}
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
