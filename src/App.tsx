import { HeroesList } from "./components/HeroesList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "./components/Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <HeroesList />
      </ThemeProvider>
    </div>
  );
}

export default App;
