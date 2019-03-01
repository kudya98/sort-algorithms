import React, { Component } from 'react';
import './App.css';
import Chart from './Chart';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);
      this.state={loading:false,logarithmic:false,stats:{}};
  }
    logarithmic(){
      this.setState({logarithmic:!this.state.logarithmic})
    }
  clear(){
      if (this.state.loading){
          return false;
      }
      this.setState({stats:{}})
  }
  sort(type){
      if (this.state.loading){
          return false;
      }
      if(type==='all'){
          this.sort('bubble_sort');
          this.sort('selection_sort');
          this.sort('insertion_sort');
          this.sort('js_sort');
          return false;
      }
      let stats = this.state.stats;
      if (stats[type]){
          delete stats[type];
          this.setState({stats:stats})
      }
      if ($('#arraySizeInput').val()<2**11){
          $('#arraySizeInput').val(2**11);
      }
      this.setState({loading:true});
      fetch(`http://localhost:3000/api/sort?type=${type}&size=${$('#arraySizeInput').val()}`)
          .then(res=>res.json())
          .then(data=>{
              stats[type]=data;
              this.setState({loading:false,stats:stats})
          })
  }
  render() {
    return (
      <div>
       <Chart logarithmic={this.state.logarithmic} loading={this.state.loading} stats={this.state.stats}/>
          <div className="form-group">
              <label htmlFor="arraySizeInput">Max array size</label>
              <input type="number" className="form-control col-2" id="arraySizeInput"
                     defaultValue="10000"></input>
          </div>
          <button className="btn btn-success" onClick={()=>{this.sort('all')}}>Compare all</button>
          <button className="btn btn-primary" onClick={()=>{this.sort('bubble_sort')}}>Bubble sort</button>
          <button className="btn btn-primary" onClick={()=>{this.sort('selection_sort')}}>Selection sort</button>
          <button className="btn btn-primary" onClick={()=>{this.sort('insertion_sort')}}>Insertion sort</button>
          <button className="btn btn-primary" onClick={()=>{this.sort('js_sort')}}>Array.sort()</button>
          <button className="btn btn-danger" onClick={()=>{this.clear()}}>Clear</button>
          <button className="btn btn-warning" onClick={()=>{this.logarithmic()}}>{(this.state.logarithmic)?'logarithmic':'linear'}</button>
      </div>
    );
  }
}

export default App;
