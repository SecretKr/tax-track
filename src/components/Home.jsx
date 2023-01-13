import React, { useState, useEffect } from "react"
import { ref, set, onValue, remove, push } from "firebase/database";

import Bill from "./Bill"
import AddBill from "./AddBill";

function Home({db, uid, user, picURL}){
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const [taxList, setTaxlist] = useState([])
    const [haveItem, setHaveItem] = useState(false)
    const [totalValue, setTotalValue] = useState(0)
  
    useEffect(() => {
      onValue(ref(db, 'users/'+uid), (snapshot) => {
        const bills = [];
        var total = 0;
        snapshot.forEach((doc) => {
          bills.push({ id:doc.key, name:doc.val().name, price:doc.val().price, date:doc.val().date});
          total += parseFloat(doc.val().price)
        });
        // alarms.sort((a,b) => {
        //   return a.id-b.id;
        // });
        setTaxlist(bills);
        setTotalValue(total)
        if (bills.length > 0){
          setHaveItem(true)
        }
        else{
          setHaveItem(false)
        }
      });
    }, [db]);

    async function updateList(name, price, date) {
        try{
          await set(push(ref(db, 'users/'+uid)), {
            name:name,
            price:price,
            date:date
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    
    async function deleteBill(id) {
    remove(ref(db, 'users/'+uid+'/'+id));
    }

    return(
        <div className="HomePage">
            <div className="Header">
              <img className="ProfilePic" src={picURL} alt="pic"></img>
                <h2>{user}</h2>
                <button onClick={logout}>Logout</button>
            </div>
            <br/><br/>
            <h1 className="total-value">Total {totalValue}</h1>
            <br/><br/><br/>
            <AddBill
              updateList={updateList}
            />
            <br/><br/>
            <div className={haveItem? "bills-list active": "bills-list"}>
                { taxList && taxList.map( (item, index) =>
                <Bill
                    name={item.name}
                    price={item.price}
                    date={item.date}
                    key={item.id}
                    id={item.id}
                    deleteBill={deleteBill}
                />
                )}
                <div className="frame"></div>
            </div>
        </div>
    )
}

export default Home