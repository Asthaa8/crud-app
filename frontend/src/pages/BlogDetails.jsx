import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function BlogDetails(){

    const { slug } = useParams();

    const [blog,setBlog] = useState(null);


    useEffect(()=>{

        fetch(
          `http://localhost:3000/api/blogs?where[slug][equals]=${slug}&depth=1`
        )
        .then(res=>res.json())
        .then(data=>{
            setBlog(data.docs[0]);
        })

    },[slug]);



    if(!blog){
        return <h2>Loading...</h2>
    }


    return(

        <div className="blog-details">


            <h1>
                {blog.title}
            </h1>


            <p>
                Author: {blog.author}
            </p>


            <p>
                Category: {blog.category}
            </p>


            <p>
                Status: {blog.status}
            </p>


            <p>
                Published Date:
                {
                  blog.publishedDate
                  ? new Date(blog.publishedDate)
                    .toLocaleDateString()
                  : "Not Published"
                }
            </p>



            {
              blog.featuredImage && (

                <img
                 src={
                   `http://localhost:3000${blog.featuredImage.url}`
                 }
                 width="500"
                 alt={blog.title}
                />

              )
            }



            {/* <h4>
              Content
            </h4> */}


            <p>
                Content:
              {
                blog.content?.root?.children?.map(
                  (item,index)=>(
                    <span key={index}>
                       {item.children?.[0]?.text}
                    </span>
                  )
                )
              }
            </p>



        </div>

    )

}


export default BlogDetails;