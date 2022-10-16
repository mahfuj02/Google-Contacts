import Contact from './Contact'
import { Link } from 'react-router-dom'
export default function Contacts()
{
    return(
        <div className="tablebody">
            <Link className='link' to="/person"> <Contact  /> </Link>
            <Link className='link' to="/person"> <Contact  /> </Link>
            <Link className='link' to="/person"> <Contact  /> </Link>
          
        </div>
    )

}