import gql from 'graphql-tag';

export const CREATE_SESSION = gql`
  mutation createSession {
    createSession(input:{
      created:  "1930-01-01T16:00:00-07:00"
      products:[]
    }) {
      id
      created
      products
    }
  }
`;


export const UPDATE_SESSION = gql`
  mutation updateSession(
    $products: [String]!
    $id: ID!
  ) {
    updateSession(input:{
      id: $id
      created:  "1930-01-01T16:00:00-07:00"
      products: $products
    }) {
      id
      created
      products
    }
  }
`;

export const ALL_SESSIONS = gql`
	query allSessions {
    listSessions {
      items {
        id
        created
        products  
      }
    }
  }
`;

export const GET_SESSION = gql`
	query getSession($id: ID!) {
    getSession(id: $id) {
      id
      created
      products
    }
  }
`;