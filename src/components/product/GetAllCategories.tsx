import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../../actions/productsActions";
import CategoryInput from "../global/CategoryInput";

interface ICategory {
  id: string;
  name: string;
  icon: any;
}

const GetAllCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    
  );
};

export default GetAllCategories;
