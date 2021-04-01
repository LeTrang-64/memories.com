import React from 'react';
import {Avatar, Button, Form, Input} from "antd";
import styles from './Comments.module.css';


import db, {firebaseAuth, Timestamp} from "../../config/firebaseConfig";
import {UserOutlined} from "@ant-design/icons";

function Message(props) {
    const {idArticle}=props;
    const [form]= Form.useForm();
    const currentUser=firebaseAuth.currentUser;


    const onFinish = (values) => {
        if(values.comment.length>0){
            sendComment(values,currentUser);
        }

    };
    const docRef = db.collection("todos").doc(idArticle);

    function sendComment(value,user){
        const time = Timestamp.now();

        docRef.collection("comments").doc().set({
            idUser:user.uid,
            cmtLine:value.comment,
            timeSend:time,
            like:[],
            dislike:[],
        }).then(() => {
            console.log("User successfully cmt!")


        })
            .catch((error) => {
                console.error("Error writing cmt: ", error);
            });
        form.resetFields();


    }


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { span: 16 },
    };
    return (
        <div className={styles.message_box}>
            <div className={styles.message_user}>
                {currentUser ? <div><Avatar size={48} src={currentUser.photoURL} />
                        <p>{currentUser.displayName}</p></div> :
                    <div><Avatar size={48} icon={<UserOutlined/>}/>
                    <p>Đăng nhập</p>
                    </div>

                }

            </div>
            <Form form={form}
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item

                    name="comment"
                >
                    <Input.TextArea placeholder=""  autoSize={{ minRows: 4, maxRows: 6 }} style={{ width: 640.5, maxWidth: 640.5, }} />
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button htmlType="submit" type="primary" shape="round" size={200}>
                        Send comment
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Message;