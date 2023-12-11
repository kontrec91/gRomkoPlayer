
import { Button, notification } from "antd";



// export let url = "/graphql";
// export let headers = {
//   Authorization: "Bearer " + localStorage.authToken,
//   // Authorization: `Bearer ${localStorage.authToken}`,
// };



// const originalFetch = fetch;
// fetch = (
//   url,
//   params = {
//     headers: {},
//   }
// )

// const proxy = "http://player.asmer.fs.a-level.com.ua/"

export const getGQL = ( url, headers = {}) => (query = "", variables = {}) =>
  fetch( url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

  // export const gql = getGQL( "/graphql", {Authorization: "Bearer " + localStorage.authToken});
 
// export let headers = {
//   Authorization: "Bearer " + localStorage.authToken,


//когда проходит разлогин, то токен удаляется!!!!
//localStorage.AuthTocken = ""-- something like this shold be
//When sheet happen, first of all check your code
//getGQL()() first we call function getGQL (getGQL()), after that we call the retsul of function ()


export const openNotification = (
  type = "info",
  title = "info",
  description = "Some params are missing"
) => {
  notification[type]({
    message: title,
    description: description,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};
