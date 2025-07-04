import React from "react";
import './middlebar.css';

function Middle_bar() {
    return (
        <>
            <div id="middle_bar">
                <div id="search_bar">
                    <input type="text" placeholder="Search Locations .." />
                    <button>search</button>
                </div>
            </div>

            
        </>
    );
}

export default Middle_bar;
