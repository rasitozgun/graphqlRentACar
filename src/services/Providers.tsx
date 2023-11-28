import { ApolloClientProvider } from "../services/index";
import { ClerkProvider } from "@clerk/nextjs";

function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<ApolloClientProvider>{children}</ApolloClientProvider>
		</ClerkProvider>
	);
}
export default Providers;
