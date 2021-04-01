import React from 'react';
import styles from './MenuBar.module.css'
import {Menu} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';

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
                <SubMenu key="sub1" icon={<MailOutlined />} title="Menu">
                    <Menu.Item key="book" onClick={handleClick}>Book</Menu.Item>
                    <Menu.Item key="food" onClick={handleClick}>Food</Menu.Item>
                    <Menu.Item key="firm" onClick={handleClick}>Firm</Menu.Item>
                    <Menu.Item key="4" onClick={handleClick}>Option 4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
}

export default MenuBar;