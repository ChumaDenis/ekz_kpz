
import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Navigate, useParams} from "react-router-dom";

function User() {
    const [loading, setLoading] = useState(true);
    const [Calendar, setCalendar] = useState([])

    const Id=useRef();
    const Name=useRef();
    const Mail=useRef();
    let { IdOfUser } = useParams();

    useEffect(() => {
        console.log(IdOfUser);
        React.lazy(axios.get("https://localhost:7227/api/Calendar/"+IdOfUser)
            .then(response => {
                setCalendar(response.data);

            })
            .catch(error => {
                alert(error)
            }));
        console.log(Calendar);
    }, []);
    function clickPost(){
        const body = {idOfCalendar:0, Name:Name.current.value,
            idOfUser:IdOfUser};

        axios.post("https://localhost:7227/api/Calendar/"+IdOfUser, body)
            .then(response => {
            })
            .catch(error => {
                alert(error)
            });
    }

    function clickDelete(id){
        axios.delete("https://localhost:7227/api/Calendar/"+IdOfUser+"/"+id)
            .then(response => {
                setCalendar(response.data);
            })
            .catch(error => {
                alert(error)
            });
    }


    function clickEdit(){
        const body = {idOfCalendar:Id.current.value, Name:Name.current.value};
        axios.put("https://localhost:7227/api/Calendar/"+IdOfUser+"/"+Id.current.value, body)
            .then(response => {
            })
            .catch(error => {
                alert(error)
            });
    }
    function clickFind(id){
        let res;
        Calendar.forEach(x=>{
            if(x.idOfCalendar==id) res=x;
        });
        console.log(res);
        Id.current.value=id;
        Name.current.value=res.name;

    }

    function clickEnter(id){
        Navigate("http://localhost:3000/Calendar/"+id);
    }


    function Find(id){
        axios.get("https://localhost:7227/api/Calendar/"+IdOfUser+"/"+Id.current.value)
            .then(response => {
                setCalendar([response.data]);
                console.log(Calendar);
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
                        <th>Name</th>
                        <th>IdOfUser</th>
                        <th></th>
                    </tr>
                    {Calendar.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.idOfCalendar}</td>
                                <td>{val.name}</td>
                                <td>{val.idOfUser}</td>
                                <td>
                                    <a href={"http://localhost:3000/Calendar/"+val.idOfCalendar}>Enter</a>
                                    <button onClick={()=> clickFind(val.idOfCalendar)}>edit</button>
                                    <button onClick={()=> clickDelete(val.idOfCalendar)}>delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </table>

                <div className="container inputs">
                    <div className="mb-3">
                        <label>Name</label>
                        <input ref={Name} placeholder="Enter calendar name..."/>
                    </div>
                    <button onClick={clickPost}>Add</button>
                    <button onClick={clickEdit}>Edit</button>
                </div>
                <div className="container find">
                    <div className="mb-3">
                        <label>Id</label>
                        <input ref={Id} placeholder="Enter id of calendar..."/>
                    </div>
                    <button onClick={Find}>Find</button>
                </div>
            </div>
        </div>

    );
}

export default User;