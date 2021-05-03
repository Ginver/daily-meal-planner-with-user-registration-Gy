import React from 'react';
import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();

    return (
        <header>
            <div>
                <button
                    type="button"
                    onClick={() => history.push('/SignIn')}
                >
                    Log in
                </button>
                <button
                    type="button"
                    onClick={() => history.push('/SignUp')}
                >
                    Registreren
                </button>
            </div>
        </header>
    );
};

export default Header;