import React from 'react'
import './ExpanseSubmitDetails.css'


function ExpanseSubmitDetails({expenseData,onDelete, onEdit}) {

    
    return (
        <div className="details-container">
      {/*  */}

      <ul className="detail-list">
        <li className='amount-date'>
          
        <span className="detail-value"> ${expenseData.amount} </span>
          <span className="detail-value">
          {new Date(expenseData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
             </span>
          </li>
          <li className='title-delete'>
            <div>
             <span className="detail-value">{expenseData.title} </span>
             </div>
             <div style={{display:"flex",gap:"1.8rem"}}>
             <span><button onClick={onEdit}  className="edit">Edit</button></span>
          <span ><button onClick={onDelete} className="delete">Delete</button></span>
        
          </div>
         
           </li>
      </ul>
    </div>
  );
};

export default ExpanseSubmitDetails