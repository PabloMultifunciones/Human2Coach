import { SpinnerCircular } from 'spinners-react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

export default function Spinner() {
  return (
    <div className="div-spinner-modal">
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <SpinnerCircular size={90} />
        </Grid>
      </Container>
    </div>
  );
}
