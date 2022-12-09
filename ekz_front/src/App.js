
import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import "./App.css";
import { Navigate } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(true);
    const [Users, setUsers] = useState([])

    const Id=useRef();
    const UserName=useRef();
    const Mail=useRef();

    useEffect(() => {
        React.lazy(axios.get("https://localhost:7227/api/User")
            .then(response => {
                setUsers(response.data);
                console.log(Users);
            })
            .catch(error => {
                alert(error)
            }));
        console.log(Users);
    }, []);
    function clickPost(){
        const body = {idOfUser:0, userName:UserName.current.value,
            email:Mail.current.value};

        axios.post("https://localhost:7227/api/User", body)
            .then(response => {

            })
            .catch(error => {
                alert(error)
            });
    }

    function clickDelete(id){
        axios.delete("https://localhost:7227/api/User/"+id)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                alert(error)
            });
    }


    function clickEdit(){
        const body = {idOfUser:Id.current.value, userName:UserName.current.value,
            email:Mail.current.value};
        axios.put("https://localhost:7227/api/User/"+Id.current.value, body)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                alert(error)
            });
    }
    function clickFind(id){
        let res;
        Users.forEach(x=>{
            if(x.idOfUser==id) res=x;
        });
        Id.current.value=id;
        UserName.current.value=res.userName;
        Mail.current.value=res.email;
    }

    function clickEnter(id){
        return Navigate("http://localhost:3000/Calendar/"+id, id);
    }


    function Find(id){
        axios.get("https://localhost:7227/api/User/"+Id.current.value)
            .then(response => {
                setUsers([response.data]);
                console.log(Users);
            })
            .catch(error => {
                alert(error)
            })
    }

  return (
      <div>
          <div>
              <a href="/"><button className="btn btn-primary">User</button></a>
          </div>
          <div className="App">
              <table>
                  <tr>
                      <th>Id</th>
                      <th>UserName</th>
                      <th>Mail</th>
                      <th></th>
                  </tr>
                  {Users.map((val, key) => {
                      return (
                          <tr key={key}>
                              <td>{val.idOfUser}</td>
                              <td>{val.userName}</td>
                              <td>{val.email}</td>
                              <td>
                                  <a href={"http://localhost:3000/"+val.idOfUser}>Enter</a>
                                  <button onClick={()=> clickFind(val.idOfUser)}>edit</button>
                                  <button onClick={()=> clickDelete(val.idOfUser)}>delete</button>
                              </td>

                          </tr>
                      )
                  })}
              </table>

              <div className="container inputs">
                  <div className="mb-3">
                      <label>User Name</label>
                      <input ref={UserName} placeholder="Enter user name..."/>
                  </div>
                  <div className="mb-3">
                      <label>Mail</label>
                      <input ref={Mail} placeholder="Enter mail..."/>
                  </div>
                  <button onClick={clickPost}>Add</button>
                  <button onClick={clickEdit}>Edit</button>
              </div>
              <div className="container find">
                  <div className="mb-3">
                      <label>Id</label>
                      <input ref={Id} placeholder="Enter id of user..."/>
                  </div>
                  <button onClick={Find}>Find</button>
              </div>
          </div>
      </div>

  );
}

export default App;
