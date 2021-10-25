import React, { useState, useEffect } from 'react';
import './App.css';
import api from '../api'

function App() {

  const [ message, setMessage ] = useState('');
  const [ commentHistory, setCommentHistrory ] = useState([]);
  const [ replyMessage, setReplyMessage ] = useState('');

  useEffect(() => {
    readComments();
  }, [])

  const addComment = async () => {
    if(message) {
    let payload = {
        comment: message,
        replies: []
    }    
    await api.insertComment(payload).then(res => {
        setCommentHistrory(res.data.data);
        setMessage('');
    })
 
    }
  };

  const addMessage = (e) => {
    setMessage(e.target.value);
  };

  const addReplyMessage = (e) => {
    setReplyMessage(e.target.value);
  };
  
  const toggleReply = (ind) => {
    setReplyMessage('');
    let newArr = [...commentHistory];
    newArr.map(comment => {
        comment.showTextarea = 'none';
    });
    newArr[ind].showTextarea = 'block';
    setCommentHistrory(newArr);
  }

  const hideReply = (ind) => {
    setReplyMessage('');
    let newArr = [...commentHistory];
    newArr[ind].showTextarea = 'none';
    setCommentHistrory(newArr);
  }
  
  const saveReplyMessage = async (id) => {
    if(replyMessage) {
      const newArr = [...commentHistory];
      const cmtInd = newArr.findIndex(x => x._id == id);
      if(cmtInd >= 0) {
        let payload = {
            message: replyMessage,
            time: new Date()
        }    
        await api.updateCommentById(id,payload).then(res => {
            setCommentHistrory(res.data.data);
            setReplyMessage('');
        })
      }
    }
  }

  const readComments = async () => {
    await api.getAllComments().then(res => {
        setCommentHistrory(res.data.data);
        return;
    })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <img height="60%" width="100%" src="https://www.w3schools.com/howto/img_nature.jpg" className="img-fluid" alt="Sheep 2"/>
          </div>
        </div>
        <br></br>   
        <div className="body_comment">
          <div className="row">
            <div className="avatar_comment col-md-1">
              <img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar"/>
            </div>
            <div className="box_comment col-md-11">
              <textarea className="commentar" value={message} onChange={addMessage} placeholder="Add a comment..."></textarea>
              <div className="box_post">
                <div className="pull-right">
                  <button onClick={addComment}>Post</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <ul className="col-md-12">
              {
                commentHistory.map((comment, index) => {
                  if(!commentHistory[index].showTextarea) {
                    commentHistory[index].showTextarea = 'none';
                  }
                  return <li className="box_result row" key={comment._id}>
                    <div className="avatar_comment col-md-1">
                      <img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar"/>
                    </div>
                    <div className="result_comment col-md-11">
                      <p>{comment.comment}</p>
                      <div className="tools_comment">
                        <a className="replay" onClick={() => toggleReply(index)}>Reply</a>
                        <span aria-hidden="true"> · </span>
                      </div>

                      <ul className="child_replay">
                        <li className="box_reply row" style={{ display : commentHistory[index].showTextarea }}>
                          <div className="col-md-12 reply_comment">
                            <div className="row">
                              <div className="avatar_comment col-md-1">
                                <img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar"/>
                              </div>
                              <div className="box_comment col-md-10">
                                <textarea className="comment_replay" value={replyMessage} onChange={addReplyMessage} placeholder="Add a comment..."></textarea>
                                <div className="box_post">
                                <div className="pull-right">
                                  <span>
                                  <img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar" />
                                  <i className="fa fa-caret-down"></i>
                                  </span>
                                  <button className="cancel" onClick={() => hideReply(index)} type="button">Cancel</button>
                                  <button type="button" onClick={() => saveReplyMessage(comment._id)}>Reply</button>
                                </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        {
                          comment.replies.map(replyMsg => {
                            return <li className="box_reply row" key={replyMsg._id}>
                              <div className="avatar_comment col-md-1">
                                <img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar"/>
                              </div>
                              <div className="result_comment col-md-11">
                                <p>{replyMsg.message}</p>
                              </div>
                            </li>
                          })
                        }
                      </ul>
                    </div>
                  </li>
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
