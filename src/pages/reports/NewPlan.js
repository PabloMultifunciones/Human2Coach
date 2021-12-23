import React from 'react';
import { Icon } from '@iconify/react';

import { Container, Stack, Typography } from '@material-ui/core';
import clipboardOutline from '@iconify/icons-eva/clipboard-outline';

import NewPlanForm from '../../components/NewPlanForm';

import Page from '../../components/Page';

export default function NewPlan() {
  return (
    <>
      <Page title="Entry follow | Human2Coach">
        <Container maxWidth="xl">
          <Stack direction="row" mb={5} className="custom-title-blue">
            <Typography variant="h4" gutterBottom className="d-flex">
              <Icon icon={clipboardOutline} width={30} height={30} className="mr-1" />
              New record
            </Typography>
          </Stack>
          <NewPlanForm />
        </Container>
      </Page>
    </>
  );
}
