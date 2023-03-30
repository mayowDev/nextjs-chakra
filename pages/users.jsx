import React, {useState} from 'react'
import Link from 'next/link'
import SearchBox from "../components/common/searchBox";
import Card from '../components/card'
import postsStyles from '../styles/Posts.module.css'


export const getServerSideProps = async () => {

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    let allUsers = await res.json();
    return {
        props: { allUsers}
    }
}

  
const Users = ({ allUsers }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredUsers, setFilteredUsers] = useState(allUsers)
  
    const handleSearch = query => {
        setSearchQuery(query);
        let filtered = allUsers
        if (searchQuery){
          filtered = allUsers.filter(p =>p.name.toLowerCase().includes(searchQuery.toLowerCase()));
          setFilteredUsers(filtered)
        }
          else{
            setFilteredUsers(allUsers)
          }
  
    };  
    return (
        <section>
            <Link className={postsStyles.backLink} href="/">Back to home</Link>

            <p>Search user: <SearchBox value={searchQuery} onChange={handleSearch}/></p>
            <div className={postsStyles.items}>

            {filteredUsers.map((user, idx) => (
                <ul >
                    <li key={idx}>
                         <Card 
                            route={`/user/${user.id}`}
                         id={user.id} 
                         title={user.name} 
                         description={[user.email]} 
                         handleDelete={()=>console.log('user deleted')} 
                         handleEdit={()=>console.log('user edited')}
                         />

                     </li>
                    
                </ul>
                

            ))}
            </div>

        </section>
    )
}
  
export default Users