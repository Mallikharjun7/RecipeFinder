import { useState, useEffect } from "react";
import "./RandomMeal.css";
import { Link } from "react-router-dom";


function RandomMeal() {
    const [rndmArray, setRndmArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State to track loading status

    useEffect(() => {
        async function fetchRandomMeals() {
            setIsLoading(true); // Start loading
            const newMeals = [];
            for (let i = 0; i < 12; i++) {
                try {
                    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
                    if (!response.ok) {
                        throw new Error("Response was not ok");
                    }
                    const data = await response.json();
                    newMeals.push(data.meals[0]); // Add meal to the temporary array
                } catch (err) {
                    console.log(err);
                }
            }
            setRndmArray(newMeals); // Update state with fetched meals
            setIsLoading(false); // End loading
        }

        fetchRandomMeals();
    }, []);

    return (
        <>
            <h2 className="header">Random Meals</h2>
            {isLoading ? (

                <div className="loading-box">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="grid">
                    {rndmArray.map((meal) => (
                        <div key={meal.idMeal} className="card">
                            <Link className="linkTag" to={`/Home/${meal.idMeal}`}>
                                <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="image" />
                            <h3 className="title">{meal.strMeal}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );

}

export default RandomMeal;
