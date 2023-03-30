import Link from 'next/link'
import Herostyles from '../styles//Hero.module.css'

const Hero = () => {
  return (
    <div className={Herostyles.hero}>
        <h1>welcome Team Heavvn.io  </h1>
        <p>This is a developement task for Senior software engineer position at Heavnn.io</p>
        <p>To see the instructions of this task/exercise visit
            <Link target={'_blank'} href={'https://docsend.com/view/xw74xnjdrjq2gx9u'}>DocSend file</Link>
        </p>
      <ul>
        <li>
        <Link href={'/users'}>Users Page</Link>
        </li>
        <li>
        <Link href={'/posts'}>Posts Page</Link>
        </li>
      </ul>
     </div>
  )
}

export default Hero