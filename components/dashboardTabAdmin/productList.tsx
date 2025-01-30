import { RootState } from "@/app/store/store";
import React from "react";
import { useSelector } from "react-redux";
import Table from "../general/table";

const ProductList = () => {
  const userData = useSelector((state: RootState) => state.seller.user);
  const products: any = useSelector(
    (state: RootState) => state.product.products
  );

  return (
    <>
      <div className="bg-white rounded-md p-4">
        <div>
          <Table
            columns={["Product Info", "product Price", "active", "action"]}
            data={products?.data}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
