import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling=false
}) {
  const inputRef = useRef(null);
  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer?.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage(){
    setImageFile(null);
    if(inputRef.current){
        inputRef.current='';
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true)
    const data = new FormData();
    data.append("my_file",imageFile); 
    console.log(data);
    
    const response = await axios.post('http://localhost:5000/api/admin/products/upload-image',data);
    // console.log(response,'response');
    
    // if our request call is successful
    // in our json we have url in response->data->result->url (nested object)
    // here we get cloudinary url
    if(response.data?.success){
         setUploadedImageUrl(response.data.result.url);
         setImageLoadingState(false);
    }
  }

//   Upload imagr to cloudinary
// if there is any hange in file image means we are uploading imag in frontend at the same time we have to uplaod image on cloudinary
     useEffect(()=>{
        if(imageFile!=null) uploadImageToCloudinary()
            
     },[imageFile]);
  return (
    <div   className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={` ${isEditMode?'opacity-65':""}border-2 border-dashed rounded-lg  p-4`}
      >
        <Input
          id="image-upload"
          type="file"
            className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}

        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            // if we are editing then cursor not allowed
            className={`
              ${isEditMode}? 'cursor-not-allowed':""}  
              flex flex-col items-center justify-center h-32 cursor-pointer`
            }
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
            // when we have image file available
            imageLoadingState?  
            <Skeleton className="h-10 bg-gray-100"/>:
          <div className="flex items-center justify-between">
            <div className="flex item-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductImageUpload;
