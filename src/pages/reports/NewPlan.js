import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Icon } from '@iconify/react';

import { Container, Stack, Typography } from '@material-ui/core';
import clipboardOutline from '@iconify/icons-eva/clipboard-outline';

import NewPlanForm from '../../components/NewPlanForm';
import EditPlanForm from '../../components/EditPlanForm';

import Page from '../../components/Page';

export default function NewPlan() {
  const params = useParams();

  const { t } = useTranslation();

  return (
    <>
      <Page title="Entry follow | Human2Coach">
        <Container maxWidth="xl">
          <Stack direction="row" mb={5} className="custom-title-blue">
            <Typography variant="h4" gutterBottom className="d-flex">
              <Icon icon={clipboardOutline} width={30} height={30} className="mr-1" />
              {t('new-plan', 'Nuevo plan')}{' '}
            </Typography>
          </Stack>

          {params.id && params.id !== 'undefined' ? (
            <EditPlanForm id={params.id} />
          ) : (
            <NewPlanForm />
          )}
        </Container>
      </Page>
    </>
  );
}
