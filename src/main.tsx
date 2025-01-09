import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/app/App.tsx"
import { INGREDIENTS_URL } from "./constants.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App ingredientsUrl={INGREDIENTS_URL} />
  </React.StrictMode>
)
