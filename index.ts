import App from "./App";

const PORT = process.env.PORT || "5173";
const appInstance = new App();

appInstance.listen(PORT);
