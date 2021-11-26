import React from 'react';
import { Container } from '@material-ui/core';
import EntryFollowForm from '../../components/EntryFollowForm';

import Page from '../../components/Page';

export default function EntryFollow() {
  return (
    <>
      <Page title="Entry follow | Human2Coach">
        <Container maxWidth="xl">
          <EntryFollowForm />
        </Container>
      </Page>
    </>
  );
}
