import React from 'react';
import { Input, Button, MessageList, ChatList } from 'react-chat-elements';
import { Grid, Container } from '@material-ui/core';

import Page from '../components/Page';

import 'react-chat-elements/dist/main.css';

export default function ChatBoss() {
  return (
    <Page title="Chat | Human2Coach">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <ChatList
              className="chat-list"
              dataSource={[
                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  alt: 'Reactjs',
                  title: 'Ródrigo',
                  subtitle: 'What are you doing?',
                  date: new Date(),
                  unread: 0
                },

                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  alt: 'Reactjs',
                  title: 'Maicol',
                  subtitle: 'What are you doing?',
                  date: new Date(),
                  unread: 2
                },

                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  alt: 'Reactjs',
                  title: 'José',
                  subtitle: 'What are you doing?',
                  date: new Date(),
                  unread: 4
                },

                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  alt: 'Reactjs',
                  title: 'Rodrigo',
                  subtitle: 'What are you doing?',
                  date: new Date(),
                  unread: 5
                },
                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  alt: 'Reactjs',
                  title: 'Rodrigo',
                  subtitle: 'What are you doing?',
                  date: new Date(),
                  unread: 5
                },
                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  alt: 'Reactjs',
                  title: 'José',
                  subtitle: 'What are you doing?',
                  date: new Date(),
                  unread: 5
                },
                {
                  avatar: '/static/mock-images/avatars/avatar_default.jpg',
                  alt: 'Reactjs',
                  title: 'Maicol',
                  subtitle: 'What are you doing?',
                  date: new Date(),
                  unread: 5
                }
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9}>
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
