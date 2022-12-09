
import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Navigate, useParams} from "react-router-dom";

function Event() {
    const [loading, setLoading] = useState(true);
    const [Calendar, setCalendar] = useState([])

    const Id=useRef();
    const Header=useRef();
    const Time=useRef();
    const Frequency=useRef();
    let { IdOfUser: IdOfCalendar } = useParams();

    useEffect(() => {
        console.log(IdOfCalendar);
        React.lazy(axios.get("https://localhost:7227/api/Event/"+IdOfCalendar)
            .then(response => {
                setCalendar(response.data);

            })
            .catch(error => {
                alert(error)
            }));
        console.log(Calendar);
    }, []);
    function clickPost(){
        const body = {idOfCalendar:0, Name:Header.current.value, Time:Time.current.value, Frequency:Frequency.current.value,
            idOfUser:IdOfCalendar};

        axios.post("https://localhost:7227/api/Event/"+IdOfCalendar, body)
            .then(response => {
            })
            .catch(error => {
                alert(error)
            });
    }

    function clickDelete(id){
        axios.delete("https://localhost:7227/api/Event/"+IdOfCalendar+"/"+id)
            .then(response => {
                setCalendar(response.data);
            })
            .catch(error => {
                alert(error)
            });
    }


    function clickEdit(){
        const body = {idOfCalendar:0, Name:Header.current.value, Time:Time.current.value, Frequency:Frequency.current.value,
            idOfUser:IdOfCalendar};
        axios.put("https://localhost:7227/api/Event/"+IdOfCalendar+"/"+Id.current.value, body)
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
        Header.current.value=res.name;

    }

    function clickEnter(id){
        Navigate("http://localhost:3000/Event/"+id);
    }


    function Find(id){
        axios.get("https://localhost:7227/api/Event/"+IdOfCalendar+"/"+Id.current.value)
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
                        <th>Header</th>
                        <th>Time</th>
                        <th>Frequency</th>
                        <th>IdOfCalendar</th>
                        <th></th>
                    </tr>
                    {Calendar.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.idOfIvent}</td>
                                <td>{val.header}</td>
                                <td>{val.time}</td>
                                <td>{val.frequency}</td>
                                <td>{val.idOfCalendar}</td>
                                <td>
                                    <a href={"http://localhost:3000/Calendar/"+val.idOfIvent}>Enter</a>
                                    <button onClick={()=> clickFind(val.idOfIvent)}>edit</button>
                                    <button onClick={()=> clickDelete(val.idOfIvent)}>delete</button>
                                </td>

                            </tr>
                        )
                    })}
                </table>

                <div className="container inputs">
                    <div className="mb-3">
                        <label>Name</label>
                        <input ref={Header} placeholder="Enter event header..."/>
                    </div>
                    <div className="mb-3">
                        <label>Time</label>
                        <input ref={Time} placeholder="Enter event time..."/>
                    </div>
                    <div className="mb-3">
                        <label>Frequency</label>
                        <input ref={Frequency} placeholder="Enter event frequency..."/>
                    </div>
                    <button onClick={clickPost}>Add</button>
                    <button onClick={clickEdit}>Edit</button>
                </div>
                <div className="container find">
                    <div className="mb-3">
                        <label>Id</label>
                        <input ref={Id} placeholder="Enter id of event..."/>
                    </div>
                    <button onClick={Find}>Find</button>
                </div>
            </div>
        </div>

    );
}

export default Event;