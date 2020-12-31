import React from 'react';
import './rankTable.css'

const Posts = ({ posts, loading }) => {
    let index =0;
    console.log("posts=",posts)
  if (loading) {
    return <h2>Loading...</h2>;
  }
//does the key become the primary key like a database or do i need a special key from ther sever to the other coloumns
  return (
        <div >
            <table id="rankings">
                <tr> 
                    <th>User</th>
                    <th>Score</th>
                </tr>
                {posts.map(post => (
                    <tr>
                        <td key={post.id} >
                            {post.title}
                        </td>
                        <td>
                            {post.body}
                        </td>
                    </tr>

                ))}
            </table>

        </div>
  );
};

export default Posts;



