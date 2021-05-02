import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";

// Stappenplan:
// 1. install axios x
// 2. import axios x
// 3. asynchrone functie
// 4. try / catch blok
// --- error & loading state aanmaken en communiceren met de gebruiker
// 5. in try: post reqest maken naar endpoint: http://localhost:3000/register
// 6. axios post request krijgt de url en het data object mee (deze moet in dit geval minimaal email en password)
// 7. succesmelding tonen aan de gebruiker (stukje state)
// 8. gebruiker doorsturen naar inlog-formulier

function SignUp() {
    const [registerSuccess, toggleRegisterSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const history = useHistory(); // to push someone to another page to login
    const { handleSubmit, register } = useForm({
        mode: 'onchange'
        });

    async function onSubmit(data) {
        console.log(data);
        setError(false);
        toggleLoading(true);

        try {
            const result = await axios.post('http://localhost:3000/signup',{
                email: data.email,
                password: data.password,
                username: data.username,
                country: 'Hongarije',
            });

        console.log(result);
        toggleRegisterSuccess(true);
        setTimeout(() => {history.push('/SignIn')
        }, 2000); // handmatig vertragen zodat de user dit ziet voordat ie doorgaat

        toggleLoading(false);

        } catch(e) {
            console.log(e)
            setError(e);
            toggleLoading(false);
        }
    }


    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email-field">
                    Email:
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        {...register("email")}
                    />
                </label>

                <label htmlFor="username-field">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="username-field"
                        name="username"
                        {...register("username")}
                    />
                </label>

                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        {...register("password")}
                    />
                </label>
                <button
                    type="submit"
                    className="form-button"
                >
                    Maak account aan
                </button>

                {registerSuccess && <p>Registration is successfull, you can now log in on the Login page</p>}
                {error && (<span className="wrong-img-error">Something went wrong!</span>)}
                {loading && (<span>Loading...</span>)}
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;