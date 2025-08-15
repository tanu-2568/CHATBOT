import { gql } from '@apollo/client';

export const CREATE_CHAT = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: { title: $title }) {
      id
      title
      created_at
    }
  }
`;

export const SEND_USER_MESSAGE = gql`
  mutation SendUserMessage($chatId: uuid!, $content: String!, $role: String!) {
    insert_messages_one(object: { 
      chat_id: $chatId, 
      content: $content, 
      role: $role 
    }) {
      id
      content
      role
      created_at
    }
  }
`;

export const TRIGGER_BOT_MESSAGE = gql`
  mutation TriggerBotMessage($chatId: uuid!) {
    sendMessage(chatId: $chatId) {
      id
      content
      role
    }
  }
`;