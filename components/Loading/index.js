import React from 'react';
import {Spin} from "antd";
import styles from "./Loading.module.css"

function Loading(props) {
    const {isNormal} = props
    return (
        <div className={ isNormal ? styles.normal : styles.loading}>
            <Spin size="large" />
        </div>
    );
};

export default Loading;