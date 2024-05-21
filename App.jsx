import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post_title", title);
    formData.append("post_description", description);
    formData.append("post_content", content);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://goblogpost-867025111c75.herokuapp.com/api/blog/1",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    alert("Post created successfully");
  };
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://goblogpost-867025111c75.herokuapp.com/api/blog/all",
          { withCredentials: true }
        );
        const data = response.data;
        const posts = data.map((item) => item.Post);
        setBlogs(posts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit">Create</button>
        </form>
        <br />
      </div>
      {Array.isArray(blogs) &&
        blogs.map((blog, index) => (
          <div key={index}>
            <h2>{blog.post_title}</h2>
            <p>{blog.post_description}</p>
            <p>{blog.post_content}</p>
            <img src={blog.image_url} alt={blog.post_title} />
          </div>
        ))}
    </>
  );
}

export default App;
