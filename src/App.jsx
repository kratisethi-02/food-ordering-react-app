import { QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { queryClient } from "./https";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from './store/UserProgressContext';
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
    
     <QueryClientProvider client={queryClient}>
      <UserProgressContextProvider>
    <CartContextProvider>
    <Header/>
    <Meals/>
    <Cart/>
    <Checkout/>
    </CartContextProvider>
    </UserProgressContextProvider>
    </QueryClientProvider>
    </>
  );
}

export default App;
