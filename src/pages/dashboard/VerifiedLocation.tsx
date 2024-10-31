import Head from 'next/head';
import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography as MUI_Typography,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import EventTable from '../../sections/events/table';
import { useEffect, useState } from 'react';

// Validation Schema
const validationSchema = Yup.object().shape({
  userAddress: Yup.string()
    .required('Address is required')
    .matches(/^[a-zA-Z\s]+$/, 'Address must contain only letters and spaces'),
  userName: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  userType: Yup.string().oneOf(['coffee', 'tea'], 'Invalid Type').required('Type is required'),
  coordinates1: Yup.string().required('Latitude is required'),
  coordinates2: Yup.string().required('Longitude is required'),
  diameter: Yup.string().required('Diameter is required'),
});

// Interface for Form Values
interface FormValues {
  userName: string;
  userAddress: string;
  userType: string;
  coordinates1: string;
  coordinates2: string;
  diameter: string;
}

PageOne.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function PageOne() {
  const { themeStretch } = useSettingsContext();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<FormValues[]>([
    {
      userName: 'Rdx',
      userAddress: '123',
      userType: 'coffee',
      coordinates1: '407128',
      coordinates2: '740060',
      diameter: '321',
    },
  ]);

  console.log('LIst data', formData);
  function handleKeyPress(event: React.KeyboardEvent) {
    const char = String.fromCharCode(event.which);
    if (!/^[a-zA-Z\s]*$/.test(char)) {
      event.preventDefault();
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Verified Location | ThirdPlac3</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h3" component="h1" paragraph>
          Verified Location
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Location
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle style={{ marginBottom: '-25px' }}>Add Location</DialogTitle>
          <DialogContent>
            <Formik<FormValues>
              initialValues={{
                userAddress: '',
                userName: '',
                userType: '',
                coordinates1: '',
                coordinates2: '',
                diameter: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setFormData([...formData, values]);

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
                  <Grid container spacing={2}>
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

                    <Grid item xs={12}>
                      <TextField
                        name="diameter"
                        label="Diameter (feet)"
                        variant="outlined"
                        onChange={handleChange}
                        type="number"
                        value={values.diameter}
                        error={touched.diameter && Boolean(errors.diameter)}
                        helperText={touched.diameter && errors.diameter}
                        placeholder="Enter diameter in feet"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={9}>
                          <FormControl
                            fullWidth
                            error={touched.userType && Boolean(errors.userType)}
                          >
                            <InputLabel>Type</InputLabel>
                            <Select
                              name="userType"
                              value={values.userType}
                              onChange={handleChange}
                              label="Type"
                            >
                              <MenuItem value="coffee">Coffee</MenuItem>
                              <MenuItem value="tea">Tea</MenuItem>
                            </Select>
                            {touched.userType && errors.userType && (
                              <MUI_Typography color="error" variant="caption">
                                {errors.userType}
                              </MUI_Typography>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={3} sx={{ paddingLeft: 6 }}>
                          <Button variant="contained" color="primary" size="medium" fullWidth>
                            Type
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={9}>
                          <TextField
                            name="userAddress"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            value={values.userAddress}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            error={touched.userAddress && Boolean(errors.userAddress)}
                          />
                          {touched.userAddress && errors.userAddress && (
                            <MUI_Typography color="error" variant="caption">
                              {errors.userAddress}
                            </MUI_Typography>
                          )}
                        </Grid>
                        <Grid item xs={3} sx={{ paddingLeft: 6 }}>
                          <Button variant="contained" color="primary" size="medium" fullWidth>
                            Address
                          </Button>
                        </Grid>
                      </Grid>
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

        <EventTable formData={formData} />
      </Container>
    </>
  );
}
