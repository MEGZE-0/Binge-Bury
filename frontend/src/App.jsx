
import{ BrowserRouter , Routes ,Route} from "react-router-dom" ;

// import {Provider} from 'react-redux';
import Movielist from './Components/Movielist/Movielist';
import Search from './Components/Search/Search';
// import Filters from './Components/Filters/Filters';
import Navbar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header'

import './App.css'

function App() {
  

  return (
    <>
    
    <BrowserRouter>
    <Routes>
<Route path= '/' element={<Navbar/>}>
<Route index element={<Search/>} />

<Route path='/movielist' element={<Movielist/>}/>
<Route path='/search'    element ={<Search/>} />
{/* <Route path='/filters'    element={<Filters/>} /> */}

<Route path='/header'   element={<Header/>} />

</Route>
    </Routes>
    </BrowserRouter>
      
      
     
    </>
  )
}

export default App;
