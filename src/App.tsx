import { HeroesList } from "./components/HeroesList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroProvider } from "./contexts/index";

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <HeroProvider>
            <Header />
            <HeroesList />
          </HeroProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
