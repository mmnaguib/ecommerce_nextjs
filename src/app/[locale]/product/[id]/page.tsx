"use client";
import React, { useState, useEffect, useCallback } from "react";
import { getAllProducts } from "../../../../../actions/productsActions";
import { ICartItem, ImageProps, IProduct, IReview } from "@/interfaces";
import RatingStar from "@/components/global/RatingStar";
import SetColor from "@/components/product/SetColor";
import Loading from "@/components/global/Loading";
import SetQuantity from "@/components/product/SetQauntity";
import Button from "@/components/global/Button";
import ProductImages from "@/components/product/ProductImages";
import RatingList from "@/components/product/RatingList";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { truncateTxt } from "@/utils/truncateTxt";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { handleAddToCart, cartItems } = useCart();
  const [cartItem, setCartItem] = useState<ICartItem | null>(null);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [rateAverage, setRateAverage] = useState<number>(0);
  const router = useRouter();

  const locale = useLocale();

  useEffect(() => {
    getAllProducts()
      .then((products: IProduct[]) => {
        const foundProduct = products.find((prod) => prod.id === params.id);
        setProduct(foundProduct);

        if (foundProduct) {
          const averageRating =
            foundProduct.reviews.reduce(
              (acc: number, item: IReview) => item.rating + acc,
              0
            ) / (foundProduct.reviews.length ? foundProduct.reviews.length : 1);

          setRateAverage(averageRating);

          setCartItem({
            id: foundProduct.id,
            name: foundProduct.name,
            inStock: foundProduct.stock,
            description: foundProduct.description,
            category: foundProduct.categoryId,
            price: foundProduct.price,
            image: foundProduct.images[0],
            quantity: 1,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [params.id]);

  const handleSetColorButton = useCallback(
    (value: ImageProps) => {
      setCartItem((prev) => {
        if (prev) {
          return { ...prev, image: value };
        }
        return null;
      });
    },
    [cartItem?.image]
  );

  const handleQtyIncrease = useCallback(() => {
    setCartItem((prev) => {
      if (prev) {
        return { ...prev, quantity: prev.quantity++ };
      }
      return null;
    });
  }, [cartItem?.quantity]);

  const handleQtyDecrease = useCallback(() => {
    setCartItem((prev) => {
      if (prev) {
        return { ...prev, quantity: prev.quantity-- };
      }
      return null;
    });
  }, [cartItem?.quantity]);

  if (!product) {
    return <Loading />;
  }
  const isProductInCart = cartItems?.some((item) => item.id === product.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <ProductImages
            cartProduct={cartItem}
            product={product}
            handleSetImage={handleSetColorButton}
          />
        </div>
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
          <h2 className="text-3xl font-medium text-slate-700">
            {truncateTxt(product.name)}
          </h2>
          <hr className="w-[30%] my-2" />
          <div className="flex items-center gap-2">
            <RatingStar rating={rateAverage} />
            <div>{product.reviews.length} review</div>
          </div>
          <div className="text-justify">{product.description}</div>
          <div className="font-semibold">
            <span>Category: </span>
            <span>{product.categoryId}</span>
          </div>
          <div className={product.stock ? "text-teal-400" : "text-rose-400"}>
            {product.stock >= 1 ? "In Stock" : "Out Stock"}
          </div>
          <hr className="w-[30%] my-2" />
          {isProductInCart ? (
            <>
              <p className="mb-2 text-slate-500 flex items-center gap-1">
                <MdCheckCircle className="text-teal-400" size={20} />
                <span>Product Added To Cart</span>
              </p>
              <div className="max-w-[300px]">
                <Button
                  custom="w-full"
                  label="View Cart"
                  outline
                  onClick={() => router.push(`/${locale}/cart`)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="">
                <SetColor
                  cartProduct={cartItem}
                  images={product.images}
                  handleSetColor={handleSetColorButton}
                />
              </div>
              <hr className="w-[30%] my-2" />
              <div className="">
                <SetQuantity
                  cartProduct={cartItem}
                  handleIncrease={handleQtyIncrease}
                  handleDecrease={handleQtyDecrease}
                />
              </div>
              <hr className="w-[30%] my-2" />
              <div className="max-w-[300px]">
                <Button
                  custom="w-full"
                  label="Add To Cart"
                  onClick={() => handleAddToCart(cartItem)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col mt-20 gap-4">
        <div className="">
          <RatingList product={product} />
        </div>
        <div className="">List</div>
      </div>
    </>
  );
};

export default ProductPage;
