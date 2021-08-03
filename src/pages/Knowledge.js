import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ListColors } from '../utils/colors';
import Page from '../components/Page';

export default function Knowledge() {
  return (
    <>
      <Page title="KnowLedge | Minimal-UI">
        <Container maxWidth="xl" className="container-knowledge">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Link to="/dashboard/process/detail" rel="noopener noreferrer">
                <div
                  className="div-processes"
                  style={{ background: ListColors.RED, minHeight: '300px' }}
                >
                  Proceso 1
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Link to="/dashboard/process/detail" rel="noopener noreferrer">
                <div
                  className="div-processes"
                  style={{ background: ListColors.BLUE, minHeight: '300px' }}
                >
                  Proceso 2
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Link to="/dashboard/process/detail" rel="noopener noreferrer">
                <div
                  className="div-processes"
                  style={{ background: ListColors.YELLOW, minHeight: '300px' }}
                >
                  Proceso 3
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Link to="/dashboard/process/detail" rel="noopener noreferrer">
                <div
                  className="div-processes"
                  role="presentation"
                  style={{ background: ListColors.GREEN, minHeight: '300px' }}
                >
                  Otros
                </div>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
}
