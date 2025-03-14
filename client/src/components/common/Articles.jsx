import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import "bootstrap/dist/css/bootstrap.min.css";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]); // Stores filtered articles
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default: Show all articles
  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Fetch articles from DB
  async function getArticles() {
    try {
      const token = await getToken();
      const res = await axios.get("http://localhost:3000/author-api/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.message === "Articles") {
        setArticles(res.data.payload);
        setFilteredArticles(res.data.payload); // Initially show all articles
        setError("");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Failed to fetch articles");
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  // Filter articles when category is selected
  function handleCategoryChange(event) {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredArticles(articles); // Show all articles
    } else {
      const filtered = articles.filter((article) => article.category === category);
      setFilteredArticles(filtered);
    }
  }

  // Navigate to a specific article
  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  return (
    <div className="container mt-4">
      {/* Category Dropdown */}
      <div className="mb-4 text-center">
        <label className="me-2 fw-bold">Filter by Category:</label>
        <select className="form-select w-25 d-inline-block" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="programming">Programming</option>
          <option value="AI&ML">AI & ML</option>
          <option value="database">Database</option>
        </select>
      </div>

      {error && <p className="display-4 text-center mt-5 text-danger">{error}</p>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {filteredArticles.length === 0 ? (
          <p className="text-center text-muted">No articles found for this category.</p>
        ) : (
          filteredArticles.map((articleObj) => (
            <div className="col" key={articleObj.articleId}>
              <div className="card shadow-lg border-0 rounded-3 h-100">
                <div className="card-body d-flex flex-column">
                  {/* Author Details */}
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <img
                      src={articleObj.authorData.profileImageUrl}
                      width="40"
                      height="40"
                      className="rounded-circle border"
                      alt="Author"
                    />
                    <p className="mb-0 text-secondary small">{articleObj.authorData.nameOfAuthor}</p>
                  </div>

                  {/* Article Title */}
                  <h5 className="card-title">{articleObj.title}</h5>

                  {/* Article Content (limited to 80 chars) */}
                  <p className="card-text text-muted flex-grow-1">
                    {articleObj.content.substring(0, 80) + "..."}
                  </p>

                  {/* Read More Link */}
                  <div className="d-flex justify-content-end mt-auto">
                    <a
                      onClick={() => gotoArticleById(articleObj)}
                      className="fw-bold text-decoration-none"
                      style={{ cursor: "pointer" }}
                    >
                      Read More →
                    </a>
                  </div>
                </div>

                {/* Card Footer - Date */}
                <div className="card-footer bg-light text-muted text-center small">
                  Last updated on {articleObj.dateOfModification}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Articles;
