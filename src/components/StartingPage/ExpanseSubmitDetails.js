import React from 'react'
import './ExpanseSubmitDetails.css'


function ExpanseSubmitDetails({expenseData}) {
    return (
        <div className="details-container">
      {/* <h2>Expense Details</h2> */}

      <ul className="detail-list">
        <li>
          <span className="detail-label">Title:</span>
          <span className="detail-value">{expenseData.title}</span>
        
        
          <span className="detail-label">Amount:</span>
          <span className="detail-value">{expenseData.amount}</span>
        
        
          <span className="detail-label">Description:</span>
          <span className="detail-value">{expenseData.description}</span>
        
        
          <span className="detail-label">Category:</span>
          <span className="detail-value">{expenseData.category}</span>
        </li>
      </ul>
    </div>
  );
};

export default ExpanseSubmitDetails