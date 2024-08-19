import { useFetch } from "../hooks/useFetch"


export function ExoApi()
{
    const {loading,data, errors} = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_delay=2000')

    return (
        <div>
            <h1>ExoApi</h1>
            <div>
                contenu API: {loading && <span>Chargement...</span>}
                {data &&
                <ul>{data.map(post => (<li key={post.id}>{post.title}</li>))}</ul>}
            </div>
            
        </div>
    )
}