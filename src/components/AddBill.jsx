import React, {useState} from "react"

function AddBill({updateList}) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const current = new Date()
  const todayDate = `${current.getFullYear()}-${(current.getMonth()+1 < 10)? ("0" + String(current.getMonth()+1)) : current.getMonth()+1}-${current.getDate()}`
  const [date, setDate] = useState(todayDate)

  const addItemHandler = () => {
    if (name.trim() !== "" && price !== "" && date !== "" && !isNaN(price)){
      updateList(name.trim(), price, date)
      setDate(todayDate)
    }
  }

  const handleFocus = (event) => event.target.select();

  return (
    <div className="bill-add">
      <input type="text" placeholder="Name" onFocus={handleFocus} onChange={(e) => setName(e.target.value)}></input>
      <input type="float" placeholder="Price" onFocus={handleFocus} onChange={(e) => setPrice(e.target.value)}></input>
      <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)}></input><br></br>
      <button className="add-btn" onClick={addItemHandler}>Add</button>
    </div>
  )
}

export default AddBill