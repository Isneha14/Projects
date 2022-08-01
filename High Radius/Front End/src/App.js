import React from 'react' ;
import './index.css';
import './App.css';
import Header from './components/Header';
import Grid from './components/MyGrid';
import Table from './Table';
import Foot from './components/Footer'



function App() { 
  return ( 
    <>
      <div className="Upper">
        <Header />
      </div>
      <div className='BtnBody'>
        <div className="Mag">
          <Grid />  
        </div>
        {/* <Table></Table> */}
      </div>
        <Foot className= 'Lower'/>
    </>
   ) 
} 

export default App