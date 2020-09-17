const REQUIRED = 'REQUIRED';
const MIN_LENGTH = 'MIN_LENGTH';

function getData(elId) {
	return document.querySelector(elId).value;
}

function validateData(inputVal, flag, validOptions) {
	return new Promise((resolve, reject) => {
		const trimmedInput = inputVal.trim();
		if (flag === 'REQUIRED') {
			if (trimmedInput.length === 0) {
				reject('Username must not be empty');
			} else {
				resolve();
			}
		} else if (flag === 'MIN_LENGTH') {
			if (trimmedInput.length < validOptions) {
				reject(`Password must be more than ${validOptions} characters`);
			} else {
				resolve();
			}
		}
	});
}

async function handleSubmit(event, username, password) {
	event.preventDefault();

	const userVal = getData(username);
	const passVal = getData(password);

	try {
		const val1 = validateData(userVal, REQUIRED);
		const val2 = validateData(passVal, MIN_LENGTH, 5);
		await Promise.all([ val1, val2 ]);
		const user = await Promise.resolve(createUser(userVal, passVal));
		printData(user);
	} catch (err) {
		alert(err);
	}
}

function createUser(username, password) {
	return {
		username,
		password
	};
}
function printData(...data) {
	for (value of data) {
		console.log(value);
	}
}

function handleForm(formId, usernameInput, passwordInput) {
	const form = document.querySelector(formId);
	form.addEventListener('submit', (event) => handleSubmit(event, usernameInput, passwordInput));
}

handleForm('#form', '#username', '#password');
