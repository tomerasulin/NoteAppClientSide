import { useState, useEffect, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HelpIcon from '@material-ui/icons/Help';
import { useDispatch } from 'react-redux';
import AssignmentIcon from '@material-ui/icons/Assignment';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


const icons = [
  {
    value: <ScheduleIcon key={1}/>,
    text: 'ScheduleIcon'
  },
  {
    value: <DoneIcon key={2}/>,
    text: 'DoneIcon'
  },
  {
    value: <HelpIcon key={3}/>,
    text: 'HelpIcon'
  },
  {
    value: <AssignmentIcon key={4}/>,
    text: 'AssignmentIcon'
  },
  {
    value: <VisibilityOffIcon key={5}/>,
    text: 'VisibilityOffIcon'
  },
];

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const [isConnected, setIsConnected] = useState(true);

  const history = useHistory();

  const dispatch = useDispatch();



  const token = useSelector((state) => {
    return state.user.token
  })

  const toSearch = useSelector((state) => {
    return state.note.toSearch;
  });

  //function to delete a not
  const deleteNote = async (e) => {
    await fetch(`http://localhost:8080/note/delete?id=${e.id}`, { // to be change
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    loadNotes();
  }

  //function that loads all notes from the DB
  const loadNotes = useCallback(async () => {
    const response = await fetch('http://localhost:8080/note/getAll',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    
    const data = await response.json();
    setIsConnected(false);
    setNotes(data);
    
  },
    [
      token
    ]
  )

  const addNewNote = () => {
    history.push('/newNote');
  }

  const readNote = (element) => {
    dispatch({ type: 'SET_NOTE', payload: { id: element.id, title: element.title, body: element.body, color: element.color, icon: element.icon } });
    history.push('/readNote')
  }

  useEffect(
    () => {
      if (!token) return;
      loadNotes();
    },
    [
      token,
      loadNotes
    ]
  )


  return (
    <Paper className="p-4">
      <div className="p-2">
        <Fab color="primary" aria-label="add" variant="extended" onClick={addNewNote} disabled={isConnected}>
          <AddIcon />
                Add Note
            </Fab>
      </div>
      <List>
        {
          notes.filter((note) => { return note.title.indexOf(toSearch) > -1 }).map((element) => {
            return (
              <ListItem key={element.id} button onClick={() => { readNote(element) }}>
                <ListItemAvatar>
                  <Avatar>
                    {
                      icons.map((option) => (
                        option.text === element.icon && option.value
                      ))
                    }
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  key={element.id}
                  primary={element.title}
                  style={{ color: element.color }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={function () { deleteNote(element) }}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })
        }
      </List>
    </Paper>
  )
}


