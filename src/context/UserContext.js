import React, { useState, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";


// CONTEXT
// 1. create UserContext with createContext
// 2. UserContextProvider functie component bouwen met daarin:
//    - het echte UserContext.Provider component
//     - geef een data object mee via de value={} property in de .Provider
//      stukje state etc.
// 3. wikkelen de Provider component om <App /> heen in index.js
// 4. create een context-Provider component

// AUTHENTICATIE
// 0. maak raamwerkje voor alle informatie die in de Context moet staan
// 1. maak de state (voor de gebruikersdata) aan de lege functies (login, logout, state)
// 2.  plaats de state en functies in een data object en geef die mee via de value={} prop
// 3. test de context door een component aan te melden op de context met alles = useContext(UserContext)
// 4. inlogfunctie: het proces van inloggen (JWT token in local stofarge zetten en gebruikersdata opslaan in de context) in de provider regelen
// 5. uitlogfunctie: het proces van van uitloggen (JWT token uit de storage halen en context leeghalen)
// 6. implementeren dat bij refresh wordt gecheckt of er nog een JWT token is en zo ja: gebruikersdata ophalen.

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
    const history = useHistory();
    // maak state voor de gebruikersdata
    const [userAuth, setUserAuth] = useState({
        user: null,
        status: 'pending', // de applicatie wordt geladen, obv de status de app wordt wel of niet geladen
    });
    // console.log(userAuth);

    // async function fetchUserData(jwtToken) {
    //     const decoded = jwt_decode(jwtToken)
    //     const userId = decoded.sub;
    // }

    async function fetchUserData(jwtToken) {
        // we hebben hier de JWT token nodig om daaruit de userID te halen
        // hier gebruiken we de package jwt-decode voor (npm install jwt-decode --save)
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub; // we willen de gebruikersdata ophalen
        console.log('DECODED JWT', decoded);

        // gebruikersdata ophalen
        try {
            // console.log('hallllloooo!')
            const result = await axios.get(`http://localhost:3000/600/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            // console.log(result);

            // die data gebruike om de context te vullen
            setUserAuth({
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                    country: result.data.country,
                },
                status: 'done',
            });
        } catch(e) {
            console.error(e);
        }
    };

    // wanneer de applicatie geladen wordt willen we checken of er een token is, en als die er is maar er is geen gebruiker,
    // dan willen we alsnog de gebruikersdata ophalen
    useEffect(() => {
            // checken of er een token is in de local storage?
        const token = localStorage.getItem('token'); // naam van de key moet hier meegegeven worden
            // checken of er geen user aanwezig is in de context?
        if ( token !== undefined && userAuth.user === null) {
            // haal dan gebruikersdata op
            // console.log('Er is een token!')

            const decoded = jwt_decode(token)
            const userId = decoded.sub;

            fetchUserData(token);

        } else {
    //         // haal dan data op (zoals bij de login)
    //         // zo nee, dan geen user, maar wel status op 'done':
            setUserAuth({
                user: null,
                status: 'done',
            });
        }
    }, []);

    // login functie aanmaken
       async function loginFunction(jwtToken) {
        // console.log(jwtToken)
        // // we hebben hier de JWT token nodig om daaruit de userID te halen
        // // hier gebruiken we de package jwt-decode voor (npm install jwt-decode --save)
        // const decoded = jwt_decode(jwtToken)
        // const userId = decoded.sub; // we willen de gebruikersdata ophalen
        // console.log('DECODED JWT', decoded);

        // JWT token in de local storage te zetten
        localStorage.setItem('token', jwtToken);

        fetchUserData(jwtToken);
        history.push('./Profile');

        // gebruikersdata ophalen
        // axios, async.get, try/catch, request
    //     try {
    //         // console.log('hallllloooo!')
    //         const result = await axios.get(`http://localhost:3000/600/users/${userId}`, {
    //             headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${jwtToken}`,
    //         }
    //         });
    //         console.log(result);
    //
    //         // die data gebruike om de context te vullen
    //         setUserAuth({
    //             user: {
    //                 username: result.data.username,
    //                 email: result.data.email,
    //                 id: result.data.id,
    //                 country: result.data.country,
    //             },
    //             status: 'done',
    //         });
    //
    //         // doorlinken naar de profiel pagina
    //         history.push('/Profile');
    //
    //     }catch(e) {
    //         console.error(e);
    //     }
    //
    //     // console.log("Login")
    }
    // logout functie aanmaken
    function logoutFunction(jwtToken) {
        // console.log("Logout")
        // leeghalen van de localstorage (met localstorage.clear())
        localStorage.clear('token', jwtToken);
        // user in de context weer op 'null' zetten
        setUserAuth({
            user: null,

        });
    }

    // omdat userAuth een object is en we nog steeds gebruik willen maken van die automatische state updates zullen we de userAuth data 'spread'-en
    const data = {
        ...userAuth,
        loginFunc: loginFunction,
        logoutFunc: logoutFunction,
    }

    return (

        <UserContext.Provider value={data}>
            {userAuth.status === 'done' ? children : <p>Loading...</p>}
            {/*{children}*/}
        </UserContext.Provider>
    );
}

export default UserContextProvider;