import { RoutesMain as Routes} from "./routes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {

  return (
    <>      
      <ThemeProvider theme={theme}>
        <Routes/>
        <ToastContainer/>
      </ThemeProvider>
    </>
  )
}

export default App
