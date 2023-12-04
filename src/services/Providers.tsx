import { CarProvider } from "@/context/CarContext";
import { ApolloClientProvider } from "../services/index";
import { BookingToastProvider } from "@/context/BookingToastContext";

function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ApolloClientProvider>
			<CarProvider>
				<BookingToastProvider>{children}</BookingToastProvider>
			</CarProvider>
		</ApolloClientProvider>
	);
}
export default Providers;
