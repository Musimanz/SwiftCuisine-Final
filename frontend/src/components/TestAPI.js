import React, { useEffect } from "react";
import axios from "axios";

const TestAPI = () => {
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/ingredients`);
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error.message);
      }
    };

    fetchIngredients();
  }, []);

  return <div>Testing API connectivity... Check the console for results.</div>;
};

export default TestAPI;
