import Head from 'next/head';
import {Container,Typography,Button,Grid,TextField,FormControl,InputLabel,Select,MenuItem,Dialog,DialogTitle,DialogContent,Box,} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { useState } from 'react';

// Validation Schema
const validationSchema = Yup.object().shape({
  userAddress: Yup.string()
    .required('Address is required')
    .matches(/^[a-zA-Z\s]+$/, 'Address must contain only letters and spaces'),
  userName: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  userType: Yup.string().oneOf(['coffee', 'tea'], 'Invalid Type').required('Type is required'),
  coordinates1: Yup.number().required('Latitude is required'),
  coordinates2: Yup.number().required('Longitude is required'),
});

// Interface for Form Values
interface FormValues {
  userName: string;
  userAddress: string;
  userType: string;
  coordinates1: number;
  coordinates2: number;
}

PageOne.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function PageOne() {
  const { themeStretch } = useSettingsContext();
  const [open, setOpen] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const char = String.fromCharCode(event.which);
    if (!/^[a-zA-Z\s]*$/.test(char)) {
      event.preventDefault();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Event | Minimal UI</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h3" component="h1" paragraph>
          Event
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Event
        </Button>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <Formik<FormValues>
              initialValues={{
                userAddress: '',
                userName: '',
                userType: '',
                coordinates1: 0,
                coordinates2: 0,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                try {
                  const geopoint = {
                    lat: values.coordinates1,
                    lng: values.coordinates2,
                  };
                  console.log('Geopoint:', geopoint);
                  console.log('Form Data:', values);
                  handleClose();
                } catch (error) {
                  console.error('Submission error:', error);
                }
              }}
            >
              {({ handleChange, values, errors, touched }) => (
                <Form>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        name="userName"
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        value={values.userName}
                        error={touched.userName && Boolean(errors.userName)}
                        helperText={touched.userName && errors.userName}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="coordinates1"
                        label="Latitude"
                        variant="outlined"
                        onChange={handleChange}
                        type="number"
                        value={values.coordinates1}
                        error={touched.coordinates1 && Boolean(errors.coordinates1)}
                        helperText={touched.coordinates1 && errors.coordinates1}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="coordinates2"
                        label="Longitude"
                        variant="outlined"
                        onChange={handleChange}
                        type="number"
                        value={values.coordinates2}
                        error={touched.coordinates2 && Boolean(errors.coordinates2)}
                        helperText={touched.coordinates2 && errors.coordinates2}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={9}>
                      <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel id="userType-label">Type</InputLabel>
                        <Select
                          labelId="userType-label"
                          name="userType"
                          value={values.userType}
                          onChange={handleChange}
                          error={touched.userType && Boolean(errors.userType)}
                        >
                          <MenuItem value="coffee">Coffee</MenuItem>
                          <MenuItem value="tea">Tea</MenuItem>
                        </Select>
                        {touched.userType && errors.userType && (
                          <Typography color="error" variant="caption">
                            {errors.userType}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="contained" color="primary">
                        Type Button
                      </Button>
                    </Grid>

                    <Grid item xs={9}>
                      <TextField
                        name="userAddress"
                        label="Address"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        value={values.userAddress}
                        error={touched.userAddress && Boolean(errors.userAddress)}
                        helperText={touched.userAddress && errors.userAddress}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="contained" color="primary">
                        Push Button
                      </Button>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop:2, marginBottom:1}}>
                    <Button onClick={handleClose} color="secondary">
                      Cancel
                    </Button>
                    
                      <Button type="submit" variant="contained" color="primary">
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
