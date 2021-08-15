import React from 'react';

function Ex(){
    const state = {
        text: "",
    };

    const handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    return(
        <div>
            <input name="text" onChange={handleChange}></input>
            <button>전송</button>
            <h3>{state.text}</h3>
        </div>
    );
}