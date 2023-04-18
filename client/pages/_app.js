import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import "../public/css/styles.css"; // Import the CSS file for custom styles

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position="top-center" />
      <TopNav />
      <div style={{fontWeight: "bold"}}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
