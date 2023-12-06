import React from "react";

function Home({ params }: { params: { username: string } }) {
	return <div>{params.username}</div>;
}

export default Home;
