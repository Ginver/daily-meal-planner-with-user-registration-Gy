import React, { useState, createContext } from 'react';

export const UserContext = createContext({});

// [] Context maken en exporteren (CounterContext)
//    -- Context importeren,
//    -- map context aanmaken en CounterContext.js aanmaken
// [] Context Provider maken en die omwikkelen om het hoogste element
// [] stukje data maken die in via Provider in context gaat
//    -- Context importeren
// [] componenenten abbonneren op de context met useContext
// [] apart component maken voor de contextProvider zodat we de logica kunnen bundelen

function UserContextProvider({ children }) {
    const [userData, setUserData] = useState({});

    // function userDataFunction() {
    //     setUserData(userData);
    // }
    // function userDataFunction() {
    //     setUserData(userData);
    // }

    const data = {
        email: data.email,
        password: data.password,
        username: data.username,
        country: 'Hongarije',

        // userDataFunction: setUserData,
    }

    return (

        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;