import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SingleRecipe.css";

function SearchSingle() {
    const { id } = useParams();
    const [searchSingleArray, setSearchArray] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function searchSingleFun() {
            try {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch recipe");
                }
                const data = await response.json();

                if (data.meals && data.meals.length > 0) {
                    setSearchArray(data.meals[0]); // Save the recipe data
                } else {
                    setHasError(true); // Set error state if no meal found
                }
            } catch (error) {
                console.error(error);
                setHasError(true); // Set error state on fetch failure
            } finally {
                setIsLoading(false);
            }
        }

        searchSingleFun();
    }, [id]);

    if (isLoading) {
        return (
            <div className="loading-box">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (hasError || !searchSingleArray) {
        return <div className="error">Recipe not found.</div>;
    }

    return (
        <div className="single-recipe-container">
            <div className="recipe-header">
                <img
                    src={searchSingleArray.strMealThumb}
                    alt={searchSingleArray.strMeal}
                    className="recipe-image"
                />
                <h1 className="recipe-title">{searchSingleArray.strMeal}</h1>
            </div>
            <div className="recipe-details">
                <h2>Instructions</h2>
                <p className="recipe-instructions">
                    {searchSingleArray.strInstructions}
                </p>
                {searchSingleArray.strYoutube && (
                    <div className="recipe-video">
                        <h2>Watch Video</h2>
                        <iframe
                            title="Recipe Video"
                            src={`https://www.youtube.com/embed/${searchSingleArray.strYoutube.split("=")[1]
                                }`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchSingle;
