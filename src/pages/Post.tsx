import {useEffect, useState} from "react";
import {getAllPost} from "../services/post";

interface Post {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    imageUrl: string;
}

export default function Post() {
    const [post, setPost] = useState<Post[]>([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState("")

    const fetchData = async (pageNumber = 1) => {
        const data = await getAllPost(pageNumber, 10)
        console.log(data)
        setPost(data?.data)
        setPage(data?.page)
        setTotalPage(data?.totalPages)

    }

    useEffect(() => {
        fetchData()
    },[])
    return (
        <>
            <div className={"p-6"}>
                <h1 className={"font-bold text-center"}> All Post </h1>
                {post.map((p, index)=> (
                    <div key={p._id}>
                        <h3>{index}</h3>
                        <h3>{p.title}</h3>
                        <h3>{p.content}</h3>
                        <h3>{p.tags}</h3>
                        <img src={p.imageUrl} alt="" width={100}/>
                    </div>
                ))}
            </div>

            <div>
                <button onClick={() => {
                    fetchData(page - 1)
                }}>prev</button>
                <div>Page {page} of {totalPage}</div>
                <button onClick={() => {
                    fetchData(page + 1)
                }}>next</button>
            </div>
        </>

    )
}

