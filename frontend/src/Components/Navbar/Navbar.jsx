import './Navbar.css'
import { Link ,Outlet } from 'react-router-dom';

function Navbar (){
return(

    <>
<div>
<nav className='navbar'> 
    <div className='logo'>
<h1>Movie Recommendation App</h1>
    </div>
    <div className='nav-links'>

      {/* <Link to='/' className='nav-link'>Movielist</Link>    */}
     <Link to ={'/movielist'} className='nav-link'>Movielist</Link> 

 <Link to ={'/search'} className='nav-link'>Search</Link> 

      {/* <Link to ={'/filters'} className='nav-link'>Filters</Link>  */}
     
      <Link to ={'/header'} className='nav-link'>Header</Link> 
     


          
     
</div>
</nav>
<Outlet/>
</div>

    </>
)

}
export default Navbar;