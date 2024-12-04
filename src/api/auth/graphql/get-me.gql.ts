import { gql } from '@apollo/client';

export const GET_ME_QUERY = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      role {
        id
        name
        description
        permissions {
          id
          name
          description
          resource
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
