import "./SearchBar.css";
import { useState } from "react";

function SearchBar(props)
{
    const [searchValue,setSearchValue]=useState("");

    const searchHandler=(e)=>{
        setSearchValue(e.target.value);
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        const data=searchValue;
        props.searchDataFromChild(data);
        setSearchValue("");
    }

    return(
        <>
            <div className="search-bar-container">
                <form className="search-form" onSubmit={submitHandler}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for recipes..."
                        value={searchValue}
                        onChange={searchHandler}
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>
        
        
        </>
    )
}
export default SearchBar;