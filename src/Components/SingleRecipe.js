
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SingleRecipe.css";

function SingleRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch recipe");
                }
                const data = await response.json();
                setRecipe(data.meals[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchRecipe();
    }, [id]);

    if (isLoading) {
        return (<div className="loading-box">
            <div className="spinner"></div>
            <p>Loading...</p>
            </div>);
    }

    if (!recipe) {
        return <div className="error">Recipe not found.</div>;
    }

    return (
        <div className="single-recipe-container">
            <div className="recipe-header">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="recipe-image"
                />
                <h1 className="recipe-title">{recipe.strMeal}</h1>
            </div>
            <div className="recipe-details">
                <h2>Instructions</h2>
                <p className="recipe-instructions">{recipe.strInstructions}</p>
                {recipe.strYoutube && (
                    <div className="recipe-video">
                        <h2>Watch Video</h2>
                        <iframe
                            title="Recipe Video"
                            src={`https://www.youtube.com/embed/${recipe.strYoutube.split("=")[1]}`}
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

export default SingleRecipe;

