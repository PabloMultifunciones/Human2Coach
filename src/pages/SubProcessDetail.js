import React from 'react';
import { Grid, Container } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';

import Page from '../components/Page';

export default function SubProcessDetail() {
  return (
    <>
      <Page title="KnowLedge | Human2Coach">
        <Container maxWidth="xl" className="container-knowledge">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Link to="/dashboard/process/detail" rel="noopener noreferrer">
                <Button variant="contained">
                  <ArrowBackIosIcon />
                  Atrás
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h1>Sub proceso #1</h1>

              <p>
                It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that
                it has a more-or-less normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many desktop publishing
                packages and web page editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
                versions have evolved over the years, sometimes by accident, sometimes on purpose
                (injected humour and the like).
              </p>

              <p className="mt-1">
                It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that
                it has a more-or-less normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many desktop publishing
                packages and web page editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
                versions have evolved over the years, sometimes by accident, sometimes on purpose
                (injected humour and the like).
              </p>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className="d-flex mt-1">
                <ThumbUpIcon className="cursor-pointer" />
                <ThumbDownIcon className="cursor-pointer ml-1" />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
}
