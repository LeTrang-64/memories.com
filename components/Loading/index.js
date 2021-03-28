import React from 'react';
import styles from "./Loading.module.css"
import {
    LoadingOutlined
} from '@ant-design/icons'


function Loading(props) {
    return (
        <div className={styles.loading}>
            <LoadingOutlined  twoToneColor="#eb2f96" style={{fontSize:"60px"}}/>
        </div>
    );
}

export default Loading;