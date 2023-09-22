import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dataDisplay.css';
function DataDisplay() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
    .then( (response)=>{
      console.log(response.data);
      setData(response.data)
    })
    .catch(function (error) {
      alert(error.response.data)
      console.log(error);
    });
  }, []);
  const handleDownload = (abs,fileName) => {
    const blob = new Blob([data]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; 
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };
  if(!data){
    setData("No Abstracts")
  }
  const [isap , setisap]=useState(true);
  const [rat , setrat]=useState("");
  const [dom , setdom]=useState("");
  const [file , setfile]=useState("")
  const handleOnSubmit = async (e) => {
		e.preventDefault();
    setisap(true)
		let result = await fetch(
		'http://localhost:2001/register', {
			method: "post",
      body: JSON.stringify({ isap, rat, dom, file}),
			headers: {
				'Content-Type': 'application/json'
			}
		})  
		result = await result.json();
    if(result){
      alert("Message Sent To Investor");
      setrat("");
      setdom("");
      setfile("")
    }
		
	}
  
  return (
    <>
    <h1>Ministry Of Ayush</h1>
    <div className='cont'>
      <h1>Abstracts:</h1>
      <ul type='none'>
        {data.map((item) => (
          <li key={item._id}>
            {/* <h2>{item.abstract}</h2> */}
            <p>{item.desc}</p>
            <button onClick={()=>handleDownload(item.abs.data,item.desc)}>Download File</button>
            <input type="text"value={rat} onChange={(e) => setrat(e.target.value)} placeholder='Your rating out of 10' id='1'></input>
            <input type="text"value={dom} onChange={(e) => setdom(e.target.value)} placeholder='Domain of the Paper' id='0'></input>
            <input class="form-control" type="file" id="formFile" value={file} onChange={(e) => setfile(e.target.value)}></input>
            <button className='b2' onClick={handleOnSubmit}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default DataDisplay;