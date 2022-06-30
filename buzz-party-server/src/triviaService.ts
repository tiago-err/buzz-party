import {IOpenDBData} from "./interfaces";

export async function retrieveSampleQuestions() {
	const result = await fetch("https://opentdb.com/api.php?amount=10");
	const data = (await result.json()) as IOpenDBData;

	return data.results;
}
