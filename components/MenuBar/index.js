import React from 'react';
import styles from './MenuBar.module.css'
import {Menu} from 'antd';
import {MailOutlined} from '@ant-design/icons';

function MenuBar(props) {

    const { SubMenu } = Menu;
    const {handleClick}=props;

// submenu keys of first level
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    const [openKeys, setOpenKeys] = React.useState(['sub1']);

    const onOpenChange = keys => {
            const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
            if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                setOpenKeys(keys);
            } else {
                setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
            }

        };
    return (
        <div className={styles.menubar}>
            <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} >
                <SubMenu key="sub1" icon={<MailOutlined/>} title="Menu">
                    <Menu.Item key="book" onClick={handleClick}>Book</Menu.Item>
                    <Menu.Item key="food" onClick={handleClick}>Food</Menu.Item>
                    <Menu.Item key="film" onClick={handleClick}>Film</Menu.Item>
                    <Menu.Item key="all" onClick={handleClick}>All category</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
}

export default MenuBar;