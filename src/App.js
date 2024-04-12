import React, { useState } from "react";
import Signup from "./Components/Signup"
import Login from "./Components/Login"

function App(){
    const[token,setToken]=useState("");
    return(
        <div className="App">
            {/* <Signup setToken={setToken}/> */}
            <Login setToken={setToken}/>
        </div>
    )

}

export default App;