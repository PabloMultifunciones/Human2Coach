import Alert from '@material-ui/core/Alert';
import { useTranslation } from 'react-i18next';

// material
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
// material
import {
  // Link,
  Stack

  // FormControlLabel
} from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import environment from '../../../libs/environment';
import 'toastr/build/toastr.min.css';

import { loginRequest, loginTalkDeskRequest } from '../../../actions/loginActions';

// ----------------------------------------------------------------------
function LoginFeedbackForm(props) {
  const { i18n } = useTranslation();

  const loginGmailHandler = async (data) => {
    await props.loginRequest({
      company: 'PedidosYa',
      tokenId: data.tokenId,
      useremail: '',
      type: 'gmail',
      modeFeedback: true
    });
    const session = JSON.parse(localStorage.getItem('sesion'));
    i18n.changeLanguage(session ? session.user.lang : 'es');
  };

  if (props.userLogged) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      {props.error && (
        <Alert className="mb-2" severity="error">
          {props.error.message}
        </Alert>
      )}
      <Stack direction="row" spacing={2} className="d-flex justify-center">
        <GoogleLogin
          clientId={`${environment.googleClientID}`}
          buttonText="Log in with Google"
          onSuccess={loginGmailHandler}
          cookiePolicy="single_host_origin"
          className="mb-1"
        />
      </Stack>
    </>
  );
}

const mapStateToProps = ({ loginReducer }) => loginReducer;

const mapDispatchToProps = {
  loginRequest,
  loginTalkDeskRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFeedbackForm);
