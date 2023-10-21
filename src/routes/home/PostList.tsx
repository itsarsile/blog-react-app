import postData from '../../../mocks/postlist.json'


export default function PostList() {
  const posts = postData.map((post) => (
    <div key={post.id} className='border-[1px] p-5 rounded-md hover:shadow-white/10 hover:shadow-lg hover:py-3 hover:border-sky-900 transition-all delay-75 ease-in-out'>
      <h1 className='font-bold text-lg'>{post.title}</h1>
      <p className='text-sm text-slate-400'>{post.date}</p>
      <p>{post.content}</p>
    </div>
  ))
  return (
    <div>
      <h1 className="text-2xl font-medium">Blog Posts</h1>
      <div className="border-b-2 border-white py-1" />
      <div className="grid grid-cols-3 pt-3 gap-5">
        {posts}
      </div>
    </div>
  )
}
