import Link from 'next/link'
import NavStyles from '../styles//Nav.module.css'

const Nav = () => {
  return (
    <nav className={NavStyles.nav}>
        <h1>welcome to Next js and Chakra Ui</h1>
      <ul>
        <li>
        <Link href={'/users'}>Users Page</Link>
        </li>
        <li>
        <Link href={'/posts'}>Posts Page</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav