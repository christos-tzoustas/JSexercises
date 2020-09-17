class Validators {
	static REQUIRED = 'REQUIRED';
    static MIN_LENGTH = 'MIN_LENGTH';
    
	static validateInput(inputVal, flag, validOptions) {
		const trimmedInput = inputVal.trim();

		if (flag === this.REQUIRED && trimmedInput.length === 0) {
			throw new Error('Username must not be empty');
		} else if (flag === this.MIN_LENGTH && trimmedInput.length < validOptions) {
			throw new Error(`Password must be ${validOptions} characters or more `);
		}
	}
}

class User {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	greet() {
		console.log(this.username + ' says hi.');
	}
}

class Form {
	constructor(formId) {
		this.form = document.querySelector(formId);
		this.username = this.form.querySelector('#username');
		this.password = this.form.querySelector('#password');

		this.form.addEventListener('submit', this.handleSubmit.bind(this));
	}

	handleSubmit(event) {
        event.preventDefault();
        
		const UserVal = this.username.value;
		const PassVal = this.password.value;

		try {
			Validators.validateInput(UserVal, 'REQUIRED');
			Validators.validateInput(PassVal, 'MIN_LENGTH', 5);
		} catch (err) {
			alert(err);
			return;
		}

		const newUser = new User(UserVal, PassVal);
		console.log(newUser);
		newUser.greet();
	}
}

new Form('#form');
