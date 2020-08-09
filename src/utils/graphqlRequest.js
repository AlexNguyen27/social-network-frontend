import { hera } from "hera-js";
const baseURL = "http://localhost:9000/graphql";

export const graphqlRequest = (
  url = baseURL,
  headers,
  query,
  variables,
) => {
  return hera({
    option: {
      url,
      headers,
    },
    query,
    variables,
  });
};
