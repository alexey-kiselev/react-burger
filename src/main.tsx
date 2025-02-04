import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./components/app/App.tsx"
import "./index.css"
import { store } from "./services/store.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
