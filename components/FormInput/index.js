import {Button, Form, Input, message, Select, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import styles from './Form.module.css'
import {useEffect, useState} from "react"
import db, {firebaseAuth, storage, Timestamp} from '../../config/firebaseConfig'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


import {useRouter} from 'next/router'

const {Option} = Select;
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};


const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};


const FormInput = (props) => {
    const { fields } = props;
    const currentUser = firebaseAuth.currentUser;
    const [form] = Form.useForm();
    const [action, setAction] = useState('ADD');
    const [value, setValue] = useState("");
    useEffect(() => {
        form.setFieldsValue(fields)
    }, [fields])


    const [fileTest, setFileTest] = useState(null);
    const [post, setPost] = useState('');
    const router = useRouter();


    function handleUpload(file, post) {

        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on('state_changed',
            (snapshot) => {

                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused': // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case 'running': // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error)// Handle unsuccessful uploads
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    switch (action) {
                        case "ADD":
                            uploadPost(downloadURL, post);
                            break;
                        case "EDIT":
                            editPost(downloadURL, post)
                            break;
                        default:
                            break;
                    }
                    //after get url then uploadPost in firebases
                });
            }
        );

    }

    // -------------------------ADD POST------------
    function uploadPost(url, post) {
        const time = Timestamp.now();
        const user = firebaseAuth.currentUser;


        db.collection("todos").doc().set({
            userid: user.uid,
            title: post.title,
            website: post.website || null,
            category: post.category,
            content: post.content,
            like: [],
            dislike: [],
            url: url,
            startedAt: time
        })
            .then(() => {
                console.log("Document successfully written!");
                router.push('/');
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
    // ---------------------EDIT post-----------------
    function editPost(url, post) {
        db.collection("todos").doc(fields.id).update({
            title: post.title,
            website: post.website || null,
            category: post.category,
            url: url,
        })
            .then(() => {
                console.log("Document successfully written!");
                router.push({
                    pathname: '/Article',
                    query: { id: fields.id }
                });
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

    }

    const onFinish = (values) => {
        if (!currentUser) {
            alert("you have to login!")
            return;
        }
        const hide = message.loading('UPLOAD...', 0);
        setTimeout(hide, 10000);
        const newValues = {
            ...values,
            content: value,
        }
        setPost(newValues);
        handleUpload(fileTest, newValues);
    };


    function handleChangeFile(e) {
        console.log(e)
        setFileTest(e)
    }

    function handleChange(value) {
        setValue(value);
    }

    return (
        <div className={styles.forminput}>
            <h1>Add new article</h1>
            <Form {...layout} form={form} name="global_state" onFinish={onFinish}
                  validateMessages={validateMessages}>
                <Form.Item
                    name={'title'}
                    label="Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'category'}
                    label="Category"

                    rules={[{ required: true, message: 'Province is required' }]}
                >
                    <Select placeholder="Select category" >
                        <Option value="book">Book</Option>
                        <Option value="firm">Firm</Option>
                        <Option value="food">Food</Option>
                    </Select>
                </Form.Item>


                <Form.Item name={'website'} label="Website">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}

                    rules={[{required: true, message: 'upload 1 image'}]}
                >
                    <Upload name="logo" action={handleChangeFile} listType="picture">
                        <Button icon={<UploadOutlined/>}>Click to upload</Button>
                    </Upload>


                </Form.Item>
                <Form.Item name={'content'} label="Introduction">
                    {/*<Input.TextArea style={{ height: '100px' }} />*/}
                    <SimpleMDE onChange={handleChange} value={fields ? fields.content : value}/>;
                </Form.Item>
                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                    {
                        fields?.id ? (
                            <Button type="primary" htmlType="submit" name="action" onClick={() => setAction('EDIT')}>
                                Edit
                            </Button>) : (
                            <Button type="primary" htmlType="submit" name="action" onClick={() => setAction('ADD')}>
                                Add
                            </Button>)
                    }
                </Form.Item>
            </Form>

        </div>
    );
};
export default FormInput;
