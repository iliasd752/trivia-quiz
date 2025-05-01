import axios from "axios";
import { CategoryResponse, QuizParams, QuizResponse } from "../types/quiz";

export const fetchCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await axios.get("https://opentdb.com/api_category.php");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

export const fetchQuiz = async (params: QuizParams): Promise<QuizResponse> => {
  const { amount, category, difficulty, type } = params;
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch quiz questions");
  }
};
