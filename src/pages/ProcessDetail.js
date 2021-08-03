import React, { useState } from 'react';
import { Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { ListColors } from '../utils/colors';
import Page from '../components/Page';

import KnowledgeDialog from '../components/Dialogs/Knowledge';

export default function ProcessDetail() {
  const [dialog, setDialog] = useState(false);

  const openDialog = () => {
    setDialog(!dialog);
  };

  return (
    <>
      <Page title="KnowLedge | Minimal-UI">
        <Container maxWidth="xl" className="container-knowledge">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Link to="/dashboard/knowledge" rel="noopener noreferrer">
                <Button variant="contained">
                  <ArrowBackIosIcon />
                  Atrás
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Link to="/dashboard/sub-process/detail" rel="noopener noreferrer">
                <div
                  className="div-processes"
                  style={{ background: ListColors.RED, minHeight: '300px' }}
                >
                  Sub proceso 1
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Link to="/dashboard/sub-process/detail" rel="noopener noreferrer">
                <div
                  className="div-processes"
                  style={{ background: ListColors.BLUE, minHeight: '300px' }}
                >
                  Sub proceso 2
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Link to="/dashboard/sub-process/detail" rel="noopener noreferrer">
                <div
                  className="div-processes"
                  style={{ background: ListColors.YELLOW, minHeight: '300px' }}
                >
                  Sub proceso 3
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div
                className="div-processes"
                onClick={openDialog}
                role="presentation"
                style={{ background: ListColors.GREEN, minHeight: '300px' }}
              >
                Otros
              </div>
            </Grid>
          </Grid>
        </Container>
        {dialog && <KnowledgeDialog openDialog={() => openDialog()} />}
      </Page>
    </>
  );
}
