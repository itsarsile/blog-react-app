import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"

export default function Post() {
  const {postId} = useParams()
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
