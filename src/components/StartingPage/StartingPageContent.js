import { useEffect, useState } from 'react';
import './StartingPageContent.css'
import ExpanseSubmitDetails from './ExpanseSubmitDetails';

const StartingPageContent = () => {
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [submittedData, setSubmittedData] = useState([]);

   // Load submitted data from localStorage on component mount
   useEffect(() => {
    const storedData = localStorage.getItem('submittedData'); 
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
  }, []);

  // Save submitted data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('submittedData', JSON.stringify(submittedData));
  }, [submittedData]);


  const submitHandler = async(event) => {
    event.preventDefault();

    const expenseData = {
      title,
      amount: +amount, // Convert amount to a number
      description,
      category,
    };

    try{
      const Response=await fetch("https://expanse-tracker-app-f33f0-default-rtdb.firebaseio.com/expanse.json",
      {
       method:"post",
       body:JSON.stringify(expenseData),
       headers:{
        "Content-Type": "application/json",
       },
      });
      if(!Response.ok){
        throw new Error("Failed to store data to firebase")
      }
      const data=await Response.json();
      console.log(data);
      setSubmittedData((preItems)=> [...preItems, { ...expenseData, id: data.name }]);
      setTitle('');
        setAmount('');
      setDescription('');
      setCategory('');
    }catch (error) {
      console.error("Error:", error);
    }

    // You can now send expenseData to your backend or handle it as needed
    
    
    // Clear the form after submission
    
  };


  const deleteExpense = (id) => {
    fetch(`https://expanse-tracker-app-f33f0-default-rtdb.firebaseio.com/expense/${id}.json`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Expense successfully deleted');
          setSubmittedData((preItems) => preItems.filter((expense) => expense.id !== id));
        } else {
          throw new Error('Failed to delete expense');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //Edit the expense
  const editExpense=(id)=>{
    //Find the expense proper id
    const editItem=submittedData.find((expense)=> expense.id === id)

    //populating the selected expense
    if(editItem){
       setTitle(editItem.title)
        setAmount(editItem.amount);
        setDescription(editItem.description);
        setCategory(editItem.category)
    }
    fetch(`https://expanse-tracker-app-f33f0-default-rtdb.firebaseio.com/expense/${id}.json`, {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          console.log('Expense successfully deleted from database & its populate successfully!');
          setSubmittedData((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
        } else {
          throw new Error('Failed to delete expense');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
    <div className="container">
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <label> Expanse-title:-</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  required/>
      </div>
      <div className="form-control">
        <label>Amount:-</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div className="form-control">
        <label>Description</label>
        <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="form-control">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="salary">Salary</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="vegetable">vegetables</option>
          <option value="grocery">grocery</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className='btnsubmit'>Submit</button>
      </div>
    </form>
    </div>
    {submittedData.map((item, index) => (
        <ExpanseSubmitDetails key={index} expenseData={item}
        onEdit={() => editExpense(item.id)}
        onDelete={() => deleteExpense(item.id)}
        />
      ))}
    </>
  );
};
  
 

export default StartingPageContent;
