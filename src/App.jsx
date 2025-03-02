import { QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { queryClient } from "./https";

function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>
    <Header/>
    <Meals/>
    </QueryClientProvider>
    </>
  );
}

export default App;
