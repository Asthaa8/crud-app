import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Blogs(){

  const [blogs,setBlogs] = useState([]);


  useEffect(()=>{

    fetch("http://localhost:3000/api/blogs")
    .then(res=>res.json())
    .then(data=>{
      setBlogs(data.docs);
    })

  },[]);



  return(
    <div>

      <h1>Blogs</h1>


      {
        blogs.map((blog)=>(

          <div key={blog.id}>

            <h2>
              <Link to={`/blogs/${blog.slug}`}>
                {blog.title}
              </Link>
            </h2>

            <p>
              Author: {blog.author}
            </p>

            <p>
              Slug: {blog.slug}
            </p>

          </div>

        ))
      }


    </div>
  )

}


export default Blogs;