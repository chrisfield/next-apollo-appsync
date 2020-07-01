import gql from 'graphql-tag';

export const ALL_PRODUCTS = gql`
	query allProducts {
    listProducts{
      items {
        id
        name
        description
        sku
        price
      }
    }
	}
`;


export const PRODUCTS_WITH_SKU = gql`
  query getProduct($sku: String!) {
    listProducts(filter: {sku: {eq: $sku}}){
      items {
        id
        name
        description
        sku
        price
      }
    }
  }
`;
