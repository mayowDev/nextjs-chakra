
import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import Pagination from "../components/common/pagination";
import SearchBox from "../components/common/searchBox";
import { paginate } from "../utils/paginate";
import CardItem from '../components/card';
import postsStyles from '../styles/Posts.module.css'

export const getServerSideProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    let allPosts = await res.json();   
    return {props: {allPosts}}
}


  
const Posts = ({ allPosts }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(allPosts)

  useEffect(()=>{
      if(localStorage.getItem('posts') !== null){
        setFilteredPosts(JSON.parse(localStorage.getItem("posts")));  
      }else{
        localStorage.setItem('posts', JSON.stringify(allPosts))
      }
  },[])

  const paginatedPosts = paginate(filteredPosts, currentPage, pageSize);
  const  handlePageChange = page => {
    setCurrentPage(page );
  };

  const handleSearch = query => {
      setSearchQuery(query);
      setCurrentPage(1)
      let filtered = allPosts
      if (searchQuery)
        filtered = allPosts.filter(p =>
          p.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );

        setFilteredPosts(filtered)

  };  

  const handleDeletePost = (id)=> {
    const newPosts =  filteredPosts.filter((itm) => itm.id !== id);
    localStorage.setItem('posts', JSON.stringify(newPosts))//delete from state
    setFilteredPosts(newPosts)
  }
 
    return (
        
          <section>
            <Link className={postsStyles.backLink} href="/">Back to home</Link>
            <div>
              <p>Search posts: <SearchBox value={searchQuery} onChange={handleSearch}/></p>
            <ul className={postsStyles.items}>

              {paginatedPosts.map(post => {
                if(post)  
                return(
                <li key={post.title}>
                    <CardItem 
                      route={`/post/${post.id}`}
                      id={post.id} 
                      title={post.title} 
                      description={[post.body]} 
                      handleDelete={handleDeletePost}
                      handleEdit={()=>console.log('edit post')}
                    />
                </li>
)})}
            </ul>
            </div>

            <Pagination
            itemsCount={allPosts.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          </section>
    )
}
  
export default Posts