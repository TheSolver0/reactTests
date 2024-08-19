import { Suspense } from "react";
import { Await, NavLink, useAsyncValue, useLoaderData } from "react-router-dom"
import { Spinner } from "../components/Spinner";

export function ExoBlog()
{
    const {posts} = useLoaderData();

    return (
        <div>
            <h1>ExoBlog</h1>
            <Suspense fallback={<Spinner/>}>
                <Await resolve={posts}>
                   <PostsList/>
                </Await>
            </Suspense>
            
        </div>
    )
}
function PostsList ()
{
    const posts = useAsyncValue();
    
    return (
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <NavLink to={post.id}>{post.title}</NavLink>
                    </li>
                ))}
            </ul>   
    ) 
}