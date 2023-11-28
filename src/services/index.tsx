"use client";
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
} from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clpgoej3aqmqe01uia8i86mw5/master",
	cache: new InMemoryCache(),
});

export function ApolloClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
