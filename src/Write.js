import React, { useState, useEffect } from "react";
import "./write.css";

export default function Write() {
  const [blogPosts, setBlogPosts] = useState(() => {
    const storedBlogPosts = localStorage.getItem("blogPosts");
    return storedBlogPosts ? JSON.parse(storedBlogPosts) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchInput, setSearchInput] = useState(""); // State for the search input

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Title cannot be empty");
      return;
    }

    if (!content) {
      alert("Blog cannot be empty");
      return;
    }

    const newBlogPost = {
      title,
      content
    };

    setBlogPosts((prevBlogPosts) => [...prevBlogPosts, newBlogPost]);

    setTitle("");
    setContent("");
  };

  const handleDelete = (index) => {
    const updatedBlogPosts = [...blogPosts];
    updatedBlogPosts.splice(index, 1);
    setBlogPosts(updatedBlogPosts);
  };

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Start your Blog...."
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>

      <div className="searchBox">
        <input
          className="searchInput"
          placeholder="Search by Title"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {blogPosts.length > 0 && (
        <div className="submittedData">
          {blogPosts
            .filter((post) =>
              post.title.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((post, index) => (
              <div key={index} className="card">
                <h3>Title: {post.title}</h3>
                <p>{post.content}</p>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
