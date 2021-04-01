import React from 'react';
import {Input} from "antd";
import styles from "./SearchBar.module.css"

const { Search } = Input;

function SearchBar(props) {
    const {handleSearch}=props;

    const onSearch = (value) =>{
       handleSearch(value);
    }
    return (
        <div className={styles.search_box}>
            <Search bordered={false} placeholder="Search..." onSearch={onSearch} style={{ width: "100%" }} />
        </div>
    );
}

export default SearchBar;