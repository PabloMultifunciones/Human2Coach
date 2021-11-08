import React from 'react';
import { Container } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import EntryFollowForm from '../../components/EntryFollowForm';
import EntryFollowFormWorker from '../../components/EntryFollowFormWorker';

import Page from '../../components/Page';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function EntryFollow() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Page title="Entry follow | Human2Coach">
        <Container maxWidth="xl">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Lider" />
            <Tab label="Colaborador" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <EntryFollowForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EntryFollowFormWorker />
          </TabPanel>
        </Container>
      </Page>
    </>
  );
}
