interface ExerciseResponse {
	results: Array<any>;
}

interface ExerciseFilter {
	muscle_id: number;
}
export const getExercises = async (filter?: ExerciseFilter) => {
	const requestOptions = {
		method: 'GET',
	};

	const params = filter?.muscle_id ? `?muscles=${filter.muscle_id}&limit=10` : '?limit=10';
	const url = `https://musclewiki.com/newapi/exercise/exercises/${params}`;

	console.log({ url });

	try {
		const response = await fetch(url, requestOptions);
		const responseJSON = (await response.json()) as ExerciseResponse;

		return responseJSON.results;
 	} catch (error) {
		console.error(error);
		return [];
	}
};
