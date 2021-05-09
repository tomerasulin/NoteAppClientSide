import Paper from '@material-ui/core/Paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuItem from '@material-ui/core/MenuItem';

export default function AddNote() {
  const history = useHistory();

  const token = useSelector((state) => {
    return state.user.token
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      priority: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      body: Yup.string().required('Required'),
      priority: Yup.number().required('required'),
    }),
    onSubmit: async values => {
      values.preventDefault();
      await fetch(
        'http://localhost:8080/note/add',
        {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

          }
        }
      )
      history.push('/notes');
    },
  });

  const backPage = () => {
    history.push("/notes");
  }
  return (
    <Paper className="p-4">
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        <div className="form-group">
          <TextField
            name="title"
            label="Enter your title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            className="w-100"
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            onChange={formik.handleChange}
            value={formik.values.body}
            onBlur={formik.handleBlur}
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
            name="body"
            label="Enter your body"
            type="text"
            className="w-100"
            variant="outlined"
            multiline
            rows={4}
          />
        </div>
        <div className="form-group">
          <TextField
            id="select"
            label="Priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.priority && Boolean(formik.errors.priority)}
            helperText={formik.touched.priority && formik.errors.priority}
            select
            className="d-flex align-items-start p-3"
            name="priority"

          >
            {
              [1, 2, 3, 4, 5].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))
            }
          </TextField>
        </div>
        <Grid container justify="center" className="d-flex justify-content-between">
          <Button
            variant="contained"
            color="primary"
            onClick={backPage}
            size="large"
            startIcon={<ArrowBackIcon />}
          >
            Back
        </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            startIcon={<SaveIcon />}
          >
            Save
        </Button>

        </Grid>
      </form>
    </Paper>
  )
}