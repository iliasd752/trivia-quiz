import { useState } from "react";
import { fetchCategories } from "../api/quizApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Category } from "../types/quiz";

const QuizForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const navigate = useNavigate();

  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleCreateQuiz = () => {
    if (selectedCategory && selectedDifficulty) {
      navigate(`/quiz/${selectedCategory}/${selectedDifficulty}`);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-red-500">
          Error loading quiz categories. Please try again later.
        </p>
      </div>
    );
  }

  const categories: Category[] = categoriesResponse?.trivia_categories || [];

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Trivia Quiz Challenge
      </h1>
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="categorySelect" className="block text-sm font-medium">
            Select Category:
          </label>
          <select
            id="categorySelect"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="w-full p-2 border rounded-md bg-white"
          >
            <option value={0}>Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
