import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Header() {

  const location = useLocation();

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');

  const search = (event) => {
    setSearchValue(event);
    dispatch(
      {
        type: 'SEARCH_NOTE',
        payload: {toSearch: event}
      }
    );
  }
  return (
    <AppBar position="static">
      <Toolbar className="d-flex justify-content-between">
        <Avatar alt="notepic" src="note-taking.png" />
        {location.pathname === '/notes' && (
          <div className="d-flex flex-start">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <InputBase
              value={searchValue}
              onChange={(event) => search(event.target.value)}
              className="h-100 text-white"
              placeholder="Search…"
              type="text"
            />
          </div>
        )}
        <nav className="navbar navbar-expand-lg navbar-light d-flex">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/notes">
                Notes
              </Link>
            </li>
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  )
}