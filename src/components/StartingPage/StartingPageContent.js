import { useEffect, useState } from 'react';
import './StartingPageContent.css'
import ExpanseSubmitDetails from './ExpanseSubmitDetails';
import { useDispatch } from 'react-redux';
import { authAction } from '../Store/auth';


import ApexChart from 'react-apexcharts';
// import moment from 'moment';



const StartingPageContent = () => {
   const dispatch=useDispatch()
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  // const [description, setDescription] = useState('');
  const[Enterdate,setDate]= useState('')
  const [category, setCategory] = useState('');
  const [submittedData, setSubmittedData] = useState([]);

   // Load submitted data from localStorage on component mount

   const downloadfileHandler=()=>{

    
    const csvData = submittedData.map((expense) => {
      return [
        expense.amount,
        expense.title,
        expense.category,
        new Date(expense.date).toLocaleDateString(),
      ].join(",");
    });

    console.log("csvData",csvData)
  
    const csvHeader = "Amount,Expanse-Name,Category,Date";
    const csvContent = csvHeader + "\n" + csvData.join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "expenses.csv";
    link.click();
  
    URL.revokeObjectURL(url);
   }
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
      date:new Date(Enterdate).toISOString(),
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
      setDate('');
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
        setDate(editItem.date);
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
  
  
  const sum = submittedData.reduce(
    (total, expense) => total + parseInt(expense.amount),
    0
  );
  if(sum){
    dispatch(authAction.ispremium(sum))
  }

  const categories = Array.from(new Set(submittedData.map((expense) => expense.category)));
  const categoryAmounts = categories.map((category) =>
    submittedData.reduce((total, expense) => (expense.category === category ? total + expense.amount : total), 0)
  );

 
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
        <input type='date' min="2019-01-01" max="2024-01-01"  value={Enterdate} onChange={(e) => setDate(e.target.value)} />
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
          <option value="fruits">friuts</option>
        </select>
      </div>
      <div className="form-actions">
        <button className='btnsubmit'>Submit</button>
        <h2>Total Amount:={sum} </h2>
      </div>
    </form>
    </div>
    <div className='mains'>
      <div>
    {submittedData.length === 0 ? (
          <p style={{ textAlign: "center" }}>No items added. Please add an item.</p>
        ) : (
          submittedData.map((item, index) => (
            <ExpanseSubmitDetails
              key={index}
              expenseData={item}
              onEdit={() => editExpense(item.id)}
              onDelete={() => deleteExpense(item.id)}
            />
          ))
        )}
        </div>
        <div className='main-chart'>
        <div className="pie-chart"  style={{ width: '400px', }}>
        <h3>Expense Categories Distribution</h3>
        <ApexChart
          options={{
            chart: {
              type: 'pie',
            },
            labels: categories,
            
          }}
          series={categoryAmounts}
          type="pie"
        />
      </div>
      </div>
      </div>
     
      <div className="total-amount">
     <button onClick={downloadfileHandler} className='btnDownload'>Download File</button>
      </div>
    </>
  );
};
  
 

export default StartingPageContent;
