interface MuscleResponse {
  results: Array<any>;
}
export const getMuscles = async () => {
	const requestOptions = {
		method: 'GET',
	};
	const url = `https://musclewiki.com/newapi/muscle/muscles/`;

	const response = await fetch(url, requestOptions);
	const responseJSON = (await response.json()) as MuscleResponse;

	return responseJSON.results;
};
