import Paper from '@material-ui/core/Paper';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/Palette';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import DoneIcon from '@material-ui/icons/Done';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HelpIcon from '@material-ui/icons/Help';
import AssignmentIcon from '@material-ui/icons/Assignment';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const colors = [
  'black',
  'red',
  'blue',
  'green',
  'pink',
  'purple',
  'white',
  'grey',
  'yellow'
];

const icons = [
  {
    value: <ScheduleIcon key={1} />,
    text: 'ScheduleIcon'
  },
  {
    value: <DoneIcon key={2} />,
    text: 'DoneIcon'
  },
  {
    value: <HelpIcon key={3} />,
    text: 'HelpIcon'
  },
  {
    value: <AssignmentIcon key={4} />,
    text: 'AssignmentIcon'
  },
  {
    value: <VisibilityOffIcon key={5} />,
    text: 'VisibilityOffIcon'
  },
];

export default function ReadNote() {

  const history = useHistory();

  const [note, setNote] = useState([]);

  const [colorMenu, setColorMenu] = useState(null);

  const [iconMenu, setIconMenu] = useState(null);

  const id = useSelector((state) => {
    return state.note.id;
  });

  const token = useSelector((state) => {
    return state.user.token;
  });

  const updateColor = async (values) => {
    setColorMenu(null);
    await fetch(
      'http://localhost:8080/note/updateColor',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        body: JSON.stringify(values),
      }
    )

    getNote();
  }

  const updateIcon = async (values) => {
    setIconMenu(null);
    await fetch(
      'http://localhost:8080/note/updateIcon',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        body: JSON.stringify(values),
      }
    )

    getNote();
  }

  const getNote = useCallback(async () => {
    const response = await fetch(
      `http://localhost:8080/note/getNote?id=${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    const data = await response.json();
    setNote(data);
  },
    [
      token,
      id
    ]
  )

  useEffect(
    () => {
      if (!token) return;
      getNote();
      return () => {
        setNote([]);
      };
    },
    [
      token,
      getNote
    ]
  )

  const backPage = () => {
    history.push("/notes");
  }

  const openColorMenu = (event) => {
    setColorMenu(event.currentTarget);
  };

  const closeColorMenu = () => {
    setColorMenu(null);
  };


  const openIconMenu = (event) => {
    setIconMenu(event.currentTarget);
  };

  const closeIconMenu = () => {
    setIconMenu(null);
  };

  return (
    <div>
      <Paper elevation={3} className="d-flex justify-content-between">
        <Container fixed>
          <Container fixed className="d-flex align-items-center">
            <IconButton>
              {
                icons.map((option) => (
                  option.text === note.icon && option.value
                ))
              }
            </IconButton>

            <h1 className="text-center" style={{ color: note.color }}>
              {
                note.title
              }
            </h1>
          </Container>

          <p style={{ color: note.color, padding: "35px" }}>
            {
              note.body
            }
          </p>
          <Container fixed className="d-flex justify-content-between">
            <IconButton>
              <PaletteIcon
                fontSize='large'
                aria-controls="color-menu"
                aria-haspopup="true"
                variant="containd"
                color="primary"
                onClick={openColorMenu}
              />
            </IconButton>
            <Menu
              id="color-menu"
              anchorEl={colorMenu}
              keepMounted
              open={Boolean(colorMenu)}
              onClose={closeColorMenu}
            >
              {
                colors.map((option) => (
                  <MenuItem style={{ color: option }} key={option} onClick={() => { updateColor({ id: note.id, color: option }) }}>
                    {option}
                  </MenuItem>
                ))
              }
            </Menu>
            <IconButton>
              <SettingsIcon
                fontSize='large'
                aria-controls="icon-menu"
                aria-haspopup="true"
                variant="containd"
                color="primary"
                onClick={openIconMenu}
                className="d-flex justify-content-between"
              />
            </IconButton>
            <Menu
              id="icon-menu"
              anchorEl={iconMenu}
              keepMounted
              open={Boolean(iconMenu)}
              onClose={closeIconMenu}
            >
              {
                icons.map((option) => (
                  <MenuItem key={option.text} onClick={() => { updateIcon({ id: note.id, icon: option.text }) }}>
                    {option.value}
                  </MenuItem>
                ))
              }
            </Menu>
          </Container>

        </Container>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={backPage}
        size="large"
        startIcon={<ArrowBackIcon />}
        className="p-2 mb-4 "
      >
        Back
      </Button>
    </div>

  )
}