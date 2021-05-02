import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";

// 1. install axios
// 2. import axios
// 3. asynch function
// 4. try / catch blok
// --- error & loading state aanmaken en communiceren met de gebruiker
// 5. in de try: axios post request naar endpoint: http://localhost:3000/login
// 6. het post request bevat het endpoint en het data object met email en wachtwoord
// 7. wat we terugkrijgen is: JWT token (local storage)
// 8. gebruiker doorsturen naar profiel pagina
// 9. de gebruikersdata moet in de context worden geplaatsd zodat alle componeneten erbij kunnen


function SignIn() {
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const  history = useHistory();
    const { handleSubmit, register } = useForm();

    async function onSubmit(data) {
        console.log(data);
        setError(false);
        toggleLoading(true);

        try {
            const result = await axios.post('http://localhost:3000/signin', data);
            console.log(result.data.accessToken);

            localStorage.setItem('banaan', result.data.accessToken);
            history.push('/Profile');

            toggleLoading(false);

        } catch(e) {
            console.error(e)
            setError(e);
            toggleLoading(false);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email-field">
                    Emailadres:
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        {...register("email")}
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
                    Inloggen
                </button>

                {error && (<span className="wrong-img-error">Something went wrong!</span>)}
                {loading && (<span>Loading...</span>)}

            </form>
            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;