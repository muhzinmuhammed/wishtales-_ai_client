
import Album from '../../components/Album/Album'
import NavBar from '../../components/NavBar/NavBar'
import { useParams } from 'react-router-dom'

const AlbumPage = () => {
  const {id} =useParams()
  return (
    <>
    <NavBar/>
    <Album albumId={id}/>
      
    </>
  )
}

export default AlbumPage
