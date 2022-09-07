/* eslint-disable prettier/prettier */

export function EngWordApi(word: string) {
	const isExist = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
		.then((res) => res.json())
		.then(
			(result) => {
				if (result[0]) return true;
			},

			(error) => {
				return false;
			},
		);

	return isExist;
}
