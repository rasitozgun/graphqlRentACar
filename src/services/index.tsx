"use client";
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
} from "@apollo/client";

const GRAPH_URI = process.env.NEXT_PUBLIC_GRAPH_URI;

export const client = new ApolloClient({
	uri: GRAPH_URI,
	cache: new InMemoryCache(),
});

export function ApolloClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
