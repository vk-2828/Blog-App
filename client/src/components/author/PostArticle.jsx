import { useContext ,useState} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { useNavigate } from 'react-router-dom'

function PostArticle() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { currentUser } = useContext(userAuthorContextObj)
  const navigate = useNavigate()
  const [postError, setPostError] = useState("")
  
  async function postArticle(articleObj) {
    try{
    setPostError("")
    console.log(articleObj)
    //create article object as per article schema
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl
    }
    articleObj.authorData = authorData;

    //article id(timestapm)
    articleObj.articleId = Date.now();

    //add date of creation & date of modification
    let currentDate = new Date();
    articleObj.dateOfCreation = currentDate.getDate() + "-"
      + currentDate.getMonth() + "-"
      + currentDate.getFullYear() + " "
      + currentDate.toLocaleTimeString("en-US", { hour12: true })

    articleObj.dateOfModification = currentDate.getDate() + "-"
      + currentDate.getMonth() + "-"
      + currentDate.getFullYear() + " "
      + currentDate.toLocaleTimeString("en-US", { hour12: true })

    //add comments array
    articleObj.comments = [];

    //add article active state
    articleObj.isArticleActive = true;
    console.log(articleObj);
    //make HTTP POST req to create new article in backend
    let res = await axios.post('http://localhost:3000/author-api/article', articleObj)
    if (res.status === 201) {
      // Navigate to the articles page after successful submission
      navigate(`/author-profile/${currentUser.email}/articles`);
    } else {
      setPostError("Failed to post article. Please try again.");
    }
  } catch (err) {
    setPostError(err.response?.data?.message || "An error occurred while posting. Please try again.");
  }
  }

  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3 " style={{ color: "#dc3545" }}>
                Write an Article
              </h2>
            </div>
            <div className="card-body bg-light">
              {/* {err.length!==0&&<p className='text-danger fs-5'>{err}</p>} */}
              <form onSubmit={handleSubmit(postArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title",{required:true})}
                  />
                  {errors.title && <p className='text-danger'>*title required</p>}

                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select
                    {...register("category",{required:true})}
                    id="category"
                    className="form-select"
                    defaultValue=""
                  >
                    <option value="" disabled>--categories--</option>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
                  </select>
                  {errors.category && <p className='text-danger'>*Category is required</p>}

                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    {...register("content",{required:true})}
                    className="form-control"
                    id="content"
                    rows="10"
                  ></textarea>
                  {errors.content && <p className='text-danger'>*Content is required</p>}

                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-outline-success roounded add-article-btn">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostArticle