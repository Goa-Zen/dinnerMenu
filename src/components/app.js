import React, { Component } from 'react';
import { MainOptions, timeMessage } from './main-options';
import  { showTypeDescription, showDishes } from './menu-data';
import moment from 'moment';

export default class App extends Component {
  render() {
    return (
      
      <div className='app'>
        
        <div id="abs-offers">
          {/* <div className="code-buttons">
              <button id="btn-exit" className="btn" type="submit" > X </button>
          </div>           */}
          <div className='abs-container'>
            <div className='abs-left'>
              <div className='header'>
                <h1>Welcome to The Three</h1>
              </div>
              <div className='logo'></div>
              <div className='door'></div>
            </div>
            <div className='abs-right'>
              <div>
                <h1> TODAY'S SPECIAL OFFERS: { moment().format('YYYY-MM-DD HH:mm:ss') }</h1>
                {MainOptions.map(off => <div className="text-wrapper"><h2 key={off}>{`${off.name}`}</h2><h3>{`${off.offer}`}<strong>{` ${off.bold}`}</strong></h3><span>{`${off.watch}`}</span></div>)}
              </div>
              <div className="notice">
                <div className="text-wrapper">
                  <h2>Considering the actual time { moment().format('HH:mm') }</h2>
                  <h3>{ timeMessage(moment().format('HH')) }</h3>
                  <span></span>
                </div>   
                <div className="text-wrapper">
                  <h3>In case you want another choice, please select below:</h3>
                </div> 
                
                <div className='main-options-wrapper'>
                   {MainOptions.map(option => <div className='main-option' key={option.name}><button className="main-option-link" id={`${option.div_id}`}>{`${option.name}`} </button></div>)}
                </div> 
              </div>

            </div>
          </div>
        </div>

        <div id="options-container">
          <div className='header'>
            <div className='logo'></div>
          </div>        
          <div className="main-options-container">
            <div id="div-zero">
              <div className="header">
                <h2>{ MainOptions[0].name }</h2>
              </div>
              <div className='type_meal_dishes'>
                <div className="main-dishes">
                  <div className="sub-header">
                    <h4>{ showTypeDescription("Breakfast", 0) }</h4>
                  </div>                
                  <div className='main-option-container'>
                    {showDishes("Breakfast",0).map(option => <div><div className="hidden" key={option}>{`${option.type}`}</div><h4>{`${option.dish}`}</h4><h5>{`${option.price}`}</h5><button className="btn-main-option">Add</button> </div>)}
                  </div> 
                </div>
                <div className="siders-dishes">
                  <div className="sub-header">
                    <h4>{ showTypeDescription("Breakfast", 1) }</h4>
                  </div>                
                  <div className='main-option-container'>
                    {showDishes("Breakfast",1).map(option => <div><div className="hidden" key={option}>{`${option.type}`}</div><h4>{`${option.dish}`}</h4><h5>{`${option.price}`}</h5><button className="btn-main-option">Add</button> </div>)}
                  </div>   
                </div>
              </div>
            </div>    

            <div id="div-one">
              <div className="header">
                <h2> { MainOptions[1].name }</h2>
              </div>
              <div className='type_meal_dishes'>
                <div className="main-dishes">
                  <div className="sub-header">
                    <h4>{ showTypeDescription("Lunch", 0) }</h4>
                  </div>  
                  <div className='main-option-container'>
                    {showDishes("Lunch",0).map(option => <div><div className="hidden" key={option}>{`${option.type}`}</div><h4>{`${option.dish}`}</h4><h5>{`${option.price}`}</h5><button className="btn-main-option">Add</button> </div>)}
                  </div>  
                </div>
                <div className="siders-dishes">
                  <div className="sub-header">
                    <h4>{ showTypeDescription("Lunch", 1) }</h4>
                  </div>  
                  <div className='main-option-container'>
                    {showDishes("Lunch",1).map(option => <div><div className="hidden" key={option}>{`${option.type}`}</div><h4>{`${option.dish}`}</h4><h5>{`${option.price}`}</h5><button className="btn-main-option">Add</button> </div>)}
                  </div> 
                </div>   
              </div>          
            </div> 

            <div id="div-two">
              <div className="header">
                <h2> { MainOptions[2].name }</h2>
              </div>
              <div className='type_meal_dishes'>
                <div className="main-dishes">
                  <div className="sub-header">
                    <h4>{ showTypeDescription("Dinner", 0) }</h4>
                  </div>                  
                  <div className='main-option-container'>
                    {showDishes("Dinner",0).map(option => <div><div className="hidden" key={option}>{`${option.type}`}</div><h4>{`${option.dish}`}</h4><h5>{`${option.price}`}</h5><button className="btn-main-option">Add</button> </div>)}
                  </div>    
                </div>
                <div className="siders-dishes">
                  <div className="sub-header">
                    <h4>{ showTypeDescription("Dinner", 1) }</h4>
                  </div>                  
                  <div className='main-option-container'>
                    {showDishes("Dinner",1).map(option => <div><div className="hidden" key={option}>{`${option.type}`}</div><h4>{`${option.dish}`}</h4><h5>{`${option.price}`}</h5><button className="btn-main-option">Add</button> </div>)}
                  </div> 
                </div>   
              </div>  
            </div>
          </div>
        </div>
        <div></div>

        <div id='orders-wrapper'>
          {/* <div id="orders-offer-today"></div> */}

          <div id="orders-total-dishes"></div>
          <div id="orders-total-at-moment"></div>
          <div id="orders-offer-price"></div>
          <div id="orders-offer-price-applied"></div>
          <div id="orders-offer-price-out"></div>

          <div id="orders-container"></div>
          <div id="orders-total-final-price"></div>
          
          <div id="orders-submit-button">
            <button id="btn-submit" className="btn" type="submit" > Order now </button>
          </div>
          <div id="orders-saved-amount"></div>
          <div id="orders-promises"></div>
          <div id="orders-promises-ad"></div>
        </div>

        <div id='comment-wrapper'>
          <div id="comment-dishes"></div>
        </div>
      </div>
    );
  }
}

