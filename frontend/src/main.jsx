import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { client } from "./apollo/ApolloClient.jsx";
import { store } from "./app/store.jsx";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </StrictMode>
);
