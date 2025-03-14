
import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { FaEdit } from 'react-icons/fa'
import { MdDelete, MdRestore } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import './ArticlesByID.css';


function ArticleByID() {

  const { state } = useLocation()
  const { currentUser } = useContext(userAuthorContextObj)
  const [editArticleStatus, setEditArticleStatus] = useState(false)
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const [currentArticle,setCurrentArticle]=useState(state)
  const [commentStatus,setCommentStatus]=useState('')
  //console.log("state from articles id ",state)

  //to enable edit of article
  function enableEdit() {
    setEditArticleStatus(true)
  }


  //to save modified article
  async function onSave(modifiedArticle) {
    console.log(modifiedArticle)
    const articleAfterChanges = { ...state, ...modifiedArticle }
    const token = await getToken()
    const currentDate = new Date();
    //add date of modification
    articleAfterChanges.dateOfModification = currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear()
    console.log(articleAfterChanges)
     //make http post req
     let res = await axios.put(`http://localhost:3000/author-api/article/${articleAfterChanges.articleId}`,
      articleAfterChanges,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    

    if (res.data.message === 'Article modified') {
      //change edit article status to false
       setEditArticleStatus(false);
      navigate(`/author-profile/articles/${state.articleId}`, { state: res.data.payload })
    }


  }


  // add comment by user
  async function addComment(commentObj){
    //add name of user to comment obj
    commentObj.name=currentUser.firstName;
    console.log(commentObj)
    //http put
    let res=await axios.put(`http://localhost:3000/user-api/comment/${currentArticle.articleId}`,commentObj);
    if(res.data.message==='Comment added'){
      setCommentStatus(res.data.message)
    }
  }


 // Delete Article (Soft Delete)
async function deleteArticle() {
  state.isArticleActive=false;
  let res=await axios.put(`http://localhost:3000/author-api/articles/${state.articleId}`,state)
  if(res.data.message==='Article deleted or restored'){
    setCurrentArticle(res.data.payload)
}
}

// Restore Article
async function restoreArticle() {
state.isArticleActive=true;
let res=await axios.put(`http://localhost:3000/author-api/articles/${state.articleId}`,state)
if(res.data.message==='Article deleted or restored'){
    setCurrentArticle(res.data.payload)
}
}


  return (
    <div className='container'>
      {
        
        editArticleStatus === false ? <>
          {/* print full article */}
          <div className="d-flex justify-contnet-between">
            <div className="mb-5 author-block w-100 px-4 py-2 rounded-2 bg-info d-flex justify-content-between align-items-center">
              <div>
                <p className="display-3 me-4">{state.title}</p>
                {/* doc & dom */}
                <span className="py-3">
                  <small className="text-secondary me-4">
                    Created on : {state.dateOfCreation}
                  </small>
                  <small className="text-secondary me-4">
                    Modified on : {state.dateOfModification}
                  </small>
                </span>

              </div>
              {/* author details */}
              <div className="author-details text-center">
                <img src={state.authorData.profileImageUrl} width='60px' className='rounded-circle' alt="" />
                <p>{state.authorData.nameOfAuthor}</p>
              </div>

            </div>
  
          {currentUser.role === "author" && (
            <div className="d-flex me-3">
              {/* Edit Button */}
              <button className="me-2 btn btn-light" onClick={enableEdit}>
                <FaEdit className="text-warning" />
              </button>

              {/* Delete or Restore Button */}
              {state.isArticleActive === true ? (
                <button className="me-2 btn btn-light" onClick={deleteArticle}>
                  <MdDelete className="text-danger fs-4" />
                </button>
              ) : (
                <button className="me-2 btn btn-light" onClick={restoreArticle}>
                  <MdRestore className="text-info fs-4" />
                </button>
              )}
            </div>
            )}

          </div>
          {/* content*/}
          <p className="lead mt-3 article-content" style={{ whiteSpace: "pre-line" }}>
            {state.content}
          </p>
          {/* user comments */}
          <div>
            <div className="comments my-4">
              {
                state.comments.length === 0 ? <p className='display-3'>No comments yet..</p> :
                    
                state.comments.map(commentObj => {
                    return <div key={commentObj._id} >
                      <p className="user-name ">
                        {commentObj?.name}
                      </p>
                      <p className="comment">
                        {commentObj?.comment}
                      </p>
                    </div>
                    })
                  
              }
            </div>
          </div>
          {/* comment form */}
          <h6>{commentStatus}</h6>
          {
            currentUser.role==='user'&&<form onSubmit={handleSubmit(addComment)} >
              <input type="text"  {...register("comment")} className="form-control mb-4" />
              <button className="btn btn-success">
                Add a comment
              </button>
            </form>
          }
        </> :
        //  {/* editing form option for article for only author */}
          <form onSubmit={handleSubmit(onSave)}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                defaultValue={state.title}
                {...register("title")}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="form-label">
                Select a category
              </label>
              <select
                {...register("category")}
                id="category"
                className="form-select"
                defaultValue={state.category}
              >
                <option value="programming">Programming</option>
                <option value="AI&ML">AI&ML</option>
                <option value="database">Database</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                {...register("content")}
                className="form-control"
                id="content"
                rows="10"
                defaultValue={state.content}
              ></textarea>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
      }

    </div>
  )
}

export default ArticleByID