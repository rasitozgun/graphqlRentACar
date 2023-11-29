import { ApolloClientProvider } from "../services/index";

function Providers({ children }: { children: React.ReactNode }) {
	return <ApolloClientProvider>{children}</ApolloClientProvider>;
}
export default Providers;
