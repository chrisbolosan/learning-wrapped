import React from 'react'

const Panel = () => {
  return (
    <div className='text-white'> <h2> Teacher: Miss Doe</h2>
    <h2> </h2>
    <p style={{ color: 'Purple', border: '3px solid', padding: '10px', position: 'relative' }}>
      <span style={{ position: 'absolute', top: '-10px', left: '-10px', background: 'white', borderRadius: '50%' }}>
      🍎
      </span>
      <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'white', borderRadius: '50%' }}>
      🍎
      </span>
      <span style={{ color: 'white' }}>Teacher name: <span style={{ color: 'Purple' }}>Jane Doe</span></span><br />
      <span style={{ color: 'white' }}>Hours Taught: <span style={{ color: 'Purple' }}> 120</span></span><br />
      <span style={{ color: 'white' }}>Courses Taught: <span style={{ color: 'Purple' }}> Math 101 Science 202 History 303</span></span><br />
      <span style={{ color: 'white' }}>Papers Graded: <span style={{ color: 'Purple' }}> 200</span></span><br />
      <span style={{ color: 'white' }}>Monday: <span style={{ color: 'Purple' }}> Math 101 (9:00-11:00 AM</span></span><br />
      <span style={{ color: 'white' }}>Wednesday: <span style={{ color: 'Purple' }}> Science 202 (10:00-12:00 PM</span></span><br />
      <span style={{ color: 'white' }}>Friday: <span style={{ color: 'Purple' }}> History 303 (1:00-3:00 PM</span></span><br />
      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(128, 0, 128, 0.1)', fontSize: '5rem', pointerEvents: 'none' }}>
      GasMan
      </span>
    </p>

    
    </div>
  )
}

export default Panel