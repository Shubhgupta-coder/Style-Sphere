// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Card ,CardContent, CardFooter} from "@/components/ui/card";

function AdminProductTile({ product , setFormData , setOpenCreateProductsDialog, setCurrentEditedId , handleDelete }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
             src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>

        <CardFooter  className="flex justify-between items-center">
            <Button onClick={()=>{
                setOpenCreateProductsDialog(true) //we have to open our dialog box
                setCurrentEditedId(product?._id) //id of the item which we are going to edit
                setFormData(product)
            }}>
                Edit
            </Button>
            <Button onClick={()=>handleDelete(product?._id)}>
                Delete
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
