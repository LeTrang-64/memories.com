import React from 'react';
import Post from './Post';
import styles from './Posts.module.css'
import { Row, Col } from 'antd';

function Posts(props) {
    const { posts } = props;
    // console.log(posts)
    return (
        <div className={styles.posts} >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                {
                    posts.map((post, index) => {
                        return (<Col className="gutter-row" span={8} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Post post={post} key={post.id} />
                        </Col>);
                    })
                }



            </Row>




        </div>
    );
}

export default Posts;