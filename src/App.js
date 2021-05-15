
import './App.css';
import {BrowserRouter,Route,Link} from "react-router-dom";
import AddPatient from "./AddPatient";
import AddDoctor from './AddDoctor';

import UpdatePatient from "./UpdatePatient";

import Create from "./Create.jsx";
import Doctorhome from "./Doctorhome.jsx";
import Dropdown from "./Dropdown.jsx";
import Patient from "./Patient.jsx";
import ViewVital from "./ViewVital.jsx";
import UpdateVital from "./UpdateVital.jsx";
import PortalHome from "./PortalHome.jsx"
import DeletePatient from "./DeletePatient.jsx";
import Delete from "./Delete.jsx";
import Download from "./Download.jsx";
import ChangeAdmin from "./ChangeAdmin.jsx"
import ChangeDoctor from "./ChangeDoctor.jsx";


function App() {
  return (
     <>
        <BrowserRouter>
            <Route exact path="/adddoctor" component={()=>  <AddDoctor/>}/>
            <Route exact path="/addpatient" component={()=><AddPatient/>}/>
            <Route exact path="/delete" component={()=><DeletePatient/>}/>
            <Route exact path="/updatepatient/:id" component={(props)=><UpdatePatient patientno={props.match.params.id} />}/>
            <Route exact path="/create" component={()=> <Create/>}/>
            <Route exact path="/" component={()=> <Doctorhome/>}/>
            <Route exact path="/dropdown/:id" component={(props)=> <Dropdown regno={props.match.params.id}/>}/>
            <Route exact path="/patient/:id" component={(props)=> <Patient patientno={props.match.params.id}/>}/>
            <Route exact path="/view/:id" component={(props)=> <ViewVital patientno={props.match.params.id}/>}/>
            <Route exact path="/update/:id" component={(props)=> <UpdateVital patientno={props.match.params.id}/>}/>
            <Route exact path="/portal" component={()=> <PortalHome/>}/>
            <Route exact path="/delete/:id" component={(props)=> <Delete patientno={props.match.params.id}/>}/>
            <Route exact path="/pdf" component={()=> <Download/>}/>
            <Route exact path="/changedoctor" component={()=> <ChangeDoctor/>}/>
            <Route exact path="/changeadmin" component={()=> <ChangeAdmin />}/>

        </BrowserRouter>
     </>
  );
}

export default App;
