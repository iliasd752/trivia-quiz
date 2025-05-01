import { useState } from "react";
import { fetchCategories } from "../api/quizApi";
import { useQuery } from "@tanstack/react-query";

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

    )
  }
  
};
