import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Balancemeallist from "../components/Balancemeallist";

// LET OP: VOEG HIER JOUW API KEY IN
const apiKey = '02105724086e470e88f525d3ba28227f'

function Notimemeals() {
    const { register } = useForm();

    const [mealData, setMealData] = useState(null);
    const [minutes, setMinutes] = useState(0);
    const [diet, setDiet] = useState('');
    const [notimeMealData, setnotimeMealData] = useState('')

    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    // value changes when this function is called
    function handleChange(e) {
        setMinutes(e.target.value)
    };

    // als je dus op enter drukt wordt de request uitgevoerd
    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            getMealData();
        }
    }

    async function getMealData() {
        // console.log("getmealdata?", getMealData);
        setError(false);
        toggleLoading(true);

        try {
            const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=main course&number=1&maxReadyTime=${minutes}&diet=${diet}`);
            // depending on what we set in our input as calories we will get a different api request

            setMealData(result.data);
            console.log('Wat is result?', result.data);

            toggleLoading(false);

        } catch (e) {
            console.error(e);
            // setError(e.response.data.message);
            toggleLoading(false);
        }
    }

    //     function onFormSubmit(data) {
    //     console.log(data);
    // }


    return (

        <div className="no-time-container">

            <section className="not-ime-day">
                <h1>no-time-for-cooking day</h1>
                <input
                    type="number"
                    placeholder="minutes (e.g. 40)"
                    onChange={handleChange}
                    // setting up the calory change> handleChange function
                    onKeyDown={keyPressCheck}
                    // when user presses enter it will also pull the request
                />
            </section>

            <button
                onClick={getMealData}>
                Show my no-time-for-cooking meal plan
            </button>

            <form>
                <label htmlFor="vegetarian-radio">vegetarian</label>

                <input className="vegetarian-radio"
                       type="radio"
                       id="vegetarian-radio"
                       name="diet"
                       value={diet}
                       onChange={() => setDiet('vegetarian')}
                />

                <label htmlFor="vegan-radio">vegan</label>
                <input className="vegan-radio"
                       type="radio"
                       id="vegan-radio"
                       name="diet"
                       value={diet}
                       onChange={() => setDiet('vegan')}
                />

                <label htmlFor="gluten-free-radio">gluten free</label>
                <input className="gluten-free-radio"
                       type="radio"
                       id="gluten-free-radio"
                       name="diet"
                       value={diet}
                       onChange={() => setDiet('gluten free')}
                />
            </form>

            {/*{mealData && <Balancemeallist mealListData={mealData}/>}*/}

            {/*{mealData && <ShortMealList shortMealData={mealData}/>}*/}

            {/*{mealData && <DishTypeData dishType={mealData}/>}*/}



            {error && (<span className="error-balance">Oops, something went wrong!</span>)}

            {loading && (<span className="loading-balance">Loading...</span>)}

        </div>

    )
}

export default Notimemeals;