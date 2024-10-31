import Head from 'next/head';
import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { useState } from 'react';
import EventCard from '../../components/Card/eventcard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { formatDateTime } from 'src/utils/conversion';

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  imageUrl: Yup.string().required('Image URL is required').url('Must be a valid URL'),
  time: Yup.date().required('Date and time are required'),
});

// Interface for Form Values
interface FormValues {
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  time: dayjs.Dayjs | null;
}

Pagetwo.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Pagetwo() {
  const { themeStretch } = useSettingsContext();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormValues[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Events | ThirdPlac3</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h3" component="h1" paragraph>
          Events
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Event
          </Button>
        </div>

        <Grid container spacing={2} marginTop={2}>
          {formData.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <EventCard
                name={event.name}
                description={event.description}
                location={event.location}
                time={event.time?.format('YYYY-MM-DD HH:mm') || ''}
              />
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle style={{ marginBottom: '-25px' }}>Add Event</DialogTitle>
          <DialogContent>
            <Formik<FormValues>
              initialValues={{
                name: '',
                description: '',
                location: '',
                imageUrl: '',
                time: null,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                const timestamp = formatDateTime(values.time);
                console.log(timestamp);
                setFormData([...formData, values]);
                handleClose();
              }}
            >
              {({ handleChange, values, errors, touched, setFieldValue }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChange}
                        type="text"
                        value={values.name}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.description}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="location"
                        label="Location"
                        variant="outlined"
                        onChange={handleChange}
                        type="text"
                        value={values.location}
                        error={touched.location && Boolean(errors.location)}
                        helperText={touched.location && errors.location}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="imageUrl"
                        label="Image URL"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.imageUrl}
                        error={touched.imageUrl && Boolean(errors.imageUrl)}
                        helperText={touched.imageUrl && errors.imageUrl}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Date and Time"
                          value={values.time}
                          onChange={(newValue) => setFieldValue('time', newValue)}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: 2,
                      marginBottom: 1,
                    }}
                  >
                    <Button onClick={handleClose} color="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}
