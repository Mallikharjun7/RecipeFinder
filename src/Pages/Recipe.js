import React, { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import "./Recipe.css";
import { Link } from "react-router-dom";

function Recipe() {
    const [searchArray, setSearchArray] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearched, setIsSearched] = useState(false); // Track if the user has searched
    const [isLoading, setIsLoading] = useState(false); // Track loading state

    const searchDataFromChild = (data) => {
        setSearchTerm(data);
        setIsSearched(true); // Set to true when the user starts a search
    };

    useEffect(() => {
        async function searchByNameFun() {
            if (!searchTerm) return;

            setIsLoading(true); // Set loading to true while fetching data
            try {
                const encodedSearchTerm = encodeURIComponent(searchTerm); // Ensure proper encoding
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodedSearchTerm}`);
                if (!response.ok) {
                    throw new Error("Response was not ok!");
                }
                const getSearchData = await response.json();
                const meals = getSearchData.meals || [];

                if (meals.length === 0) {
                    setSearchArray([]); // Clear previous results and show no results
                } else {
                    setSearchArray(meals.length > 9 ? meals.slice(0, 12) : meals); // Limit to 9 items
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setSearchArray([]); // Clear previous results on error
            } finally {
                setIsLoading(false); // Set loading to false after fetching data
            }
        }
        searchByNameFun();
    }, [searchTerm]);

    return (
        <div className="recipe-container">
            <SearchBar searchDataFromChild={searchDataFromChild} />
            <div className="recipe-results">
                {isLoading ? (
                    <div className="loading-box">
                        <div className="spinner"></div>
                        <p className="loadingRecipes">Loading recipes...</p>
                    </div>
                ) : isSearched && searchArray.length === 0 ? (
                    <div className="no-results-box">
                        <p>No results found</p>
                    </div>
                ) : (
                    <div className="recipe-grid">
                        {searchArray.map((meal) => (
                            <div className="recipe-card" key={meal.idMeal}>
                                <div className="recipe-card-content">
                                    <Link className="linkTag" to={`/Recipe/${meal.idMeal}`}>
                                    <img
                                        src={meal.strMealThumb}
                                        alt={meal.strMeal}
                                        className="recipe-image"
                                    />
                                    <h3 className="recipe-name">{meal.strMeal}</h3>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Recipe;
