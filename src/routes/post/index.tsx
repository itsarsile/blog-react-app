import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"

export default function Post() {
  let {postId} = useParams()
  console.log(postId)
  return (
    <>
      <Helmet>
        <title>Post {postId} - hello-world</title>
      </Helmet>
    <div>Post {postId}</div>
    </>
  )
}
