import { QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { queryClient } from "./https";
import { CartContextProvider } from "./store/CartContext";

function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>
    <CartContextProvider>
    <Header/>
    <Meals/>
    </CartContextProvider>
    </QueryClientProvider>
    </>
  );
}

export default App;
