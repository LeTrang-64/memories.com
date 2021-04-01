import React from 'react';
import styles from './UserProfile.module.css'
import {Avatar} from "antd";
import {FacebookOutlined, SettingOutlined, StarTwoTone} from "@ant-design/icons";
import Loading from "../Loading";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBirthdayCake, faGlobeAsia, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'


function UserProfile(props) {
    const { user, rates } = props;


    if (!user) return <Loading />
    return (
        <div className={styles.user_profiles}>
            <div className={styles.user_card}>
                <Avatar size={72} src={user.photoURL} />
                <div className={styles.user_name}>{user.displayName}</div>
                <div>
                    <span>{rates?.length}</span>
                    <StarTwoTone twoToneColor="#eb2f96" />
                </div>
                <div className={styles.user_infor}>
                    <div>
                        <FacebookOutlined />
                        <span>web</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <span>Maps</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faGlobeAsia} />                        Birthday

                        Country</div>
                    <div>
                        <FontAwesomeIcon icon={faBirthdayCake} />                        Birthday
                        </div>
                    <div><SettingOutlined />Setting</div>
                </div>
            </div>


        </div>
    );
}

export default UserProfile;