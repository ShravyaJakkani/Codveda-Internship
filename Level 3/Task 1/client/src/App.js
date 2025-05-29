import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    pin:'',
    image: null
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0]
    }));
  };
  const handleDelete = async (id) => {
    const pin = prompt("Enter the secret PIN to delete:");
  
    if (!pin) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {

        headers: { 'Content-Type': 'application/json' },
        data: { pin }, // pass pin in request body
      });
      alert("Deleted successfully");
      fetchBlogs(); // refresh blog list
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('author', formData.author);
    data.append("pin", formData.pin);

    if (formData.image) data.append('image', formData.image);

    for(let [key,value] of data.entries()){
      console.log(key,value);
    }
    try {
      await axios.post('http://localhost:5000/api/blogs', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowForm(false);
      setFormData({ title: '', content: '', author: '', image: null ,pin:''});
      fetchBlogs();
    } catch (err) {
      console.error('Error submitting blog:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }} id="blog">
      <h1>📝 Blog Platform</h1>

      {!showForm ? (
        <>
          <button onClick={() => setShowForm(true)}>+ Create Blog</button>
          <div style={{ marginTop: '2rem' }}>
            {blogs.map((blog) => (
              <div key={blog._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                {blog.image && (
                  <img
                    src={`http://localhost:5000${blog.image}`}
                    alt="blog"
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
                <p><i>By {blog.author}</i></p>
                <button onClick={() => handleDelete(blog._id)}>Delete</button>

              </div>
            ))}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} required />
          <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
          <input type="password" name="pin" placeholder="Secret PIN to delete"
  value={formData.pin}
  onChange={handleChange}
  required
/>
    
          <input type="file" accept="image/*" onChange={handleFileChange} />
          

          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: '1rem' }}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;
