import { useParams } from "react-router-dom"

export default function Post() {
  let {postId} = useParams()
  console.log(postId)
  return (
    <div>Post {postId}</div>
  )
}
