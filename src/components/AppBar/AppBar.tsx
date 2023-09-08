import {FC} from 'react'
import { Link } from 'react-router-dom'

const AppBar: FC = () => {
  return (
    <div>
      <Link to={"/lookup"}>Look Up</Link>
      <Link to={"/image"}>Image</Link>
    </div>
  );
}

export default AppBar