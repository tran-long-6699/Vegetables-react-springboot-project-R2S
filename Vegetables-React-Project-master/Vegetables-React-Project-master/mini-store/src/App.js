import './App.css';
import Home from './components/TrangChu/Home';
import Header from './components/TrangChu/Header';
import Footer from './components/TrangChu/Footer';
import {Route, Switch} from 'react-router-dom';
import Admin from './components/TrangChu/QuanTri/Admin';
import Provider from './components/TrangChu/QuanTri/Provider/Provider';
import SagaComponent from './components/Saga/SagaComponent';
import LoadingComponent from './components/Setting/LoadingComponent/LoadingComponent';
import Authorities from './components/TrangChu/QuanTri/Authority/Authorities';
import user from './components/TrangChu/QuanTri/User/user';
import ProtectedAdmin from './ProtectedAdmin';
import GetToken from './components/TrangChu/Home/Login/GetToken';
function App(){
    return (
      <>
      <div className="App">
         <Header />
         <LoadingComponent />
          <main>
            <Switch> 
             <Route exact path="/home" component ={Home} />
             <Route exact path="/admin" component={Admin} /> 
             <Route exact path="/" component ={Home} />
             <Route exact path="/saga" component={SagaComponent} />
             <Route exact path="/gettoken" component={GetToken} />
             <ProtectedAdmin exact path="/admin/provider" component={Provider} />
             <ProtectedAdmin exact path="/admin/authorities" component={Authorities} />
             <ProtectedAdmin exact path="/admin/users" component={user} />
             {/* <Route exact path="/demo" component={Demo} /> */}
             <Route path="*" component={Home} />
             {/* <Home /> */}
             {/* <Demo /> */}
             </Switch>
          </main>
        <Footer />
       
       
      </div>
      </>
    );
  } 
  export default App;
