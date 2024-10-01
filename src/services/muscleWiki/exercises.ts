interface ExerciseResponse {
	results: Array<any>;
	next: string;
}

interface ExerciseFilter {
	muscle_id: number;
}
export const getExercises = async (filter?: ExerciseFilter) => {
	const requestOptions = {
		method: 'GET',
	};

	try {
		let exerciseList: Array<any> = [];
		let moreExercises = true;
		let url = `https://musclewiki.com/newapi/exercise/exercises/`;
		let response;
		while (moreExercises) {
			response = await fetch(url, requestOptions);
			const responseJSON = (await response.json()) as ExerciseResponse;
			exerciseList = [...exerciseList, ...responseJSON.results];
			console.log(responseJSON.next);
			if (responseJSON.next) {
				url = responseJSON.next;
			}else {
				moreExercises = false;
			}
		}
		console.log(`Founded ${exerciseList.length} exercises`);

		return exerciseList;
 	} catch (error) {
		console.error(error);
		return [];
	}
};
