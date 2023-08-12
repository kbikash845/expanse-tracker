import React from 'react';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';

function PiChart() {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
      };
    
      return (
        <div>
          <h2>Pie Chart Example</h2>
          <Pie data={data} options={options} />
        </div>
      );
    };
    


export default PiChart