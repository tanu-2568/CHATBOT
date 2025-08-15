import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useAuthenticationStatus, useSignIn, useSignOut } from '@nhost/react';
import { 
  GET_CHATS, 
  GET_MESSAGES, 
  MESSAGES_SUBSCRIPTION 
} from '../graphql/queries';
import { 
  CREATE_CHAT, 
  INSERT_MESSAGE, 
  SEND_MESSAGE_ACTION 
} from '../graphql/mutations';

// Replace mock authentication
const { isAuthenticated, isLoading: authLoading } = useAuthenticationStatus();
const { signIn, isLoading: signInLoading } = useSignIn();
const { signOut } = useSignOut();

// Replace mock chat queries
const { data: chatsData, loading: chatsLoading } = useQuery(GET_CHATS);
const { data: messagesData } = useQuery(GET_MESSAGES, {
  variables: { chatId: activeChat?.id },
  skip: !activeChat
});

// Real-time messages
const { data: subscriptionData } = useSubscription(MESSAGES_SUBSCRIPTION, {
  variables: { chatId: activeChat?.id },
  skip: !activeChat
});

// Mutations
const [createChat] = useMutation(CREATE_CHAT);
const [insertMessage] = useMutation(INSERT_MESSAGE);
const [sendMessageAction] = useMutation(SEND_MESSAGE_ACTION);