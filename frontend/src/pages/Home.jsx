
import '../App1.css';
import {MdClose} from "react-icons/md"
import { useEffect, useState } from 'react';
import axios from "axios"
import Formtable from '../pages/Formtable';

axios.defaults.baseURL = "http://localhost:4000/"

function Home() {
  const [addSection,setAddSection] = useState(false)
  const [editSection,setEditSection] = useState(false)
  const [formData,setFormData] = useState({
    name : "",
    salary : "",
    position : "",
  })
  const [formDataEdit,setFormDataEdit] = useState({
    name : "",
    salary : "",
    position : "",
    _id : ""
  })
  const [dataList,setDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }


  const handleSubmit = async(e)=>{
      e.preventDefault()
      const data = await axios.post("/create",formData)
      console.log(data)
      if(data.data.success){
          setAddSection(false)
          alert(data.data.message)
          getFetchData()
          setFormData({
            name : "",
            position : "",
            salary : ""
          })

      }
  }
  const getFetchData = async()=>{
    const data = await axios.get("/get")
    console.log(data)
    if(data.data.success){
        setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])

  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    
      if(data.data.success){
        getFetchData()
        alert(data.data.message)
      }
  }

  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update",formDataEdit)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }
  const handleEditOnChange = async(e)=>{
    const {value,name} = e.target
    setFormDataEdit((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }
  const handleEdit = (el)=>{
    setFormDataEdit(el)
    setEditSection(true)
  }
  return (
   <>
      <div className="container">
        
      {
        addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose = {()=>setAddSection(false)}
            rest={formData}
          />
        )
      }
      {
        editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose = {()=>setEditSection(false)}
            rest={formDataEdit}
          />
        )
      }


      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Employee_Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>
              
              </th>
            </tr>
          </thead>
          <tbody>
            { dataList[0] ? (
              dataList.map((el)=>{
                console.log(el)
                return(
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.position}</td>
                    <td>{el.salary}</td>
                  </tr>
                )
              }))
              : (
                <p style={{textAlign : "center"}}>No data</p>
              )
            }
          </tbody>
        </table>
      </div>
     


      </div>
   </>
  );
}

export default Home;
