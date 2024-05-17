import React from 'react'
import image from '../assests/arrow-down-long-solid.svg'
import './Home.css'
import {useState} from 'react';

const Home = () => {

    const [id, setid] = useState('');
    const [Name, setName] = useState('');
    const [Position, setPosition] = useState('');
    const [Salary, setSalary] = useState('');
    const [isAnchorVisible, setIsAnchorVisible] = useState(false);

    const sendDataToServer = () => {
        const data = { id, Name, Position, Salary };
        
        fetch('http://localhost:5000/receive_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const toggleAnchor = () => {
        setIsAnchorVisible(prevState => !prevState);
        
      };






  return (
    <div className='page'>
        <div className="about" onClick={toggleAnchor}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
        <div className="about-1" style={{backgroundColor : isAnchorVisible ? 'aqua' : 'transparent'}}>
            {isAnchorVisible && (
                
                <a href="/Details">Employee details</a>
                
            )}
        </div>
        <div className="header">
            <h1>Welcome</h1>
            <h2>To</h2>
            <h3>Dashboard</h3>
        </div>
        <div className="detail">
            <h2>Enter your Details Here<img src={image} alt='' style={{height: '20px',backgroundColor: 'white'}} /></h2>
        </div>
        <div className="body">
            <form action="body1">
                <div className="container1">
                    <label htmlFor="ID">Employee ID:</label>
                    <input type="number" placeholder='Enter your ID'
                        value={id} 
                        onChange={(e) => setid(e.target.value)} 
                    />
                </div>
                <div className="container2">
                    <label htmlFor="Name">Employee Name:</label>
                    <input type="text" placeholder='Enter your Text'
                        value={Name} 
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="container3">
                    <label htmlFor="Position">Employee Position:</label>
                    <input type="text" placeholder='Enter your Position'
                        value={Position} 
                        onChange={(e) => setPosition(e.target.value)} />
                </div>
                <div className="container4">
                    <label htmlFor="Salary">Employee Salary:</label>
                    <input type="number" placeholder='Enter your Salary'
                        value={Salary} 
                        onChange={(e) => setSalary(e.target.value)} />
                </div>
                <div className="button">
                    <button type='button' onClick={sendDataToServer}>Save</button>
                </div>
            </form>
            <footer className='footer'>
                <p>@Employee</p>
            </footer>
        </div>
    </div>
  )
}

export default Home