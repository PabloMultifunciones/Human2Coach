import * as Yup from 'yup';
import { Icon } from '@iconify/react';
// material
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Alert from '@material-ui/core/Alert';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Button,
  Divider,
  Typography,
  // Link,
  Stack,
  // Checkbox,
  TextField,
  IconButton,
  InputAdornment
  // FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { loginRequest, loginTalkDeskRequest } from '../../../actions/loginActions';

// ----------------------------------------------------------------------
function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    company: Yup.string().required('The company is required'),
    username: Yup.string().required('The username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      company: '',
      username: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => props.loginRequest(values)
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik; // values

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const talkDeskLogin = () => {
    props.loginTalkDeskRequest({ ...formik.values, type: 'talkdesk' });
  };

  if (props.user_logged) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            size="large"
            color="primary"
            variant="contained"
            onClick={() => talkDeskLogin()}
            disabled={formik.values.company === ''}
          >
            TALDESK LOGIN
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>
        <Stack spacing={3} sx={{ my: 2 }}>
          {props.error && <Alert severity="error">{props.error.message}</Alert>}

          <TextField
            fullWidth
            autoComplete="company"
            type="text"
            label="Company"
            {...getFieldProps('company')}
            error={Boolean(touched.company && errors.company)}
            helperText={touched.company && errors.company}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        {/**  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />
  
            <Link component={RouterLink} variant="subtitle2" to="/recover-password">
              Forgot password?
            </Link>
          </Stack> */}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

const mapStateToProps = ({ loginReducer }) => loginReducer;

const mapDispatchToProps = {
  loginRequest,
  loginTalkDeskRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
