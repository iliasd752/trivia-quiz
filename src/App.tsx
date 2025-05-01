import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import QuizForm from "./components/QuizForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <QuizForm />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
