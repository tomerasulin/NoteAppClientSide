import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import { Route, Switch } from 'react-router';
import Notes from './pages/Notes';
import AddNote from './pages/AddNote';
import ReadNote from './pages/ReadNote';
import Register from './pages/Register';

function App() {
  return (
    <div className="h-100 d-flex flex-column justify-content-between">
		<Header />
		<div className="container mt-3">
			<div className="row justify-content-center">
				<div className="col-4">
					<Switch>
						<Route path="/" exact>
							<Login />
						</Route>
            <Route path="/notes" exact>
							<Notes />
						</Route>
            <Route path="/newNote" exact>
							<AddNote />
						</Route>
						<Route path="/readNote" exact>
							<ReadNote />
						</Route>
						<Route path="/register" exact>
							<Register />
						</Route>
					</Switch>			
				</div>
			</div>
		</div>	
		<Footer />		
	</div>
  );
}

export default App;
