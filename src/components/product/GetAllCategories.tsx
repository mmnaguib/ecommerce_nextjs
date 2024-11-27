import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../../actions/productsActions";

interface ICategory {
  id: string;
  name: string;
  icon: string; // assuming icon is a string, adjust based on actual type
}

const GetAllCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      const formattedData = data.map((category) => ({
        ...category,
        icon: category.icon || "default-icon", // provide a default icon if missing
      }));
      setCategories(formattedData);
    };
    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto">
      {categories
        .filter((category) => category.name !== "All")
        .map((category) => (
          <div key={category.id}>
            <img src={category.icon} alt={category.name} /> {category.name}
          </div>
        ))}
    </div>
  );
};

export default GetAllCategories;
