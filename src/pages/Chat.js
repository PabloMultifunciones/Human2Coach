import React from 'react';
import { Input, Button, MessageList } from 'react-chat-elements';
import { Grid, Container } from '@material-ui/core';

import Page from '../components/Page';

import 'react-chat-elements/dist/main.css';

export default function Chat() {
  return (
    <Page title="Chat | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <MessageList
              className="message-list"
              toBottomHeight="100%"
              dataSource={[
                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  position: 'right',
                  type: 'text',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                  date: new Date()
                },
                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  position: 'left',
                  type: 'text',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                  date: new Date()
                },
                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  position: 'right',
                  type: 'text',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                  date: new Date()
                },
                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  position: 'right',
                  type: 'text',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                  date: new Date()
                },

                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  position: 'left',
                  type: 'text',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                  date: new Date()
                },

                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  position: 'left',
                  type: 'text',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                  date: new Date()
                },

                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  position: 'right',
                  type: 'text',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                  date: new Date()
                },
                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  position: 'left',
                  type: 'text',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                  date: new Date()
                },
                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  position: 'right',
                  type: 'text',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                  date: new Date()
                }
              ]}
            />
            <Input
              placeholder="Type here..."
              rightButtons={<Button color="white" backgroundColor="#ff5e3e" text="Enviar" />}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
