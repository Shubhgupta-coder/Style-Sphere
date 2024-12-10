import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();  //dispatcher will take reducer
  const navigate = useNavigate();
  const {toast} = useToast();

  console.log(formData);
  

  function onSubmit(event){
       event.preventDefault();
    //    here we will gave dispatcher registerUser reducer (Async Thunk) which will give response
       dispatch(registerUser(formData)).then((data)=>{
        // if we get success or our promise if fulfilled in asyncthunk we will navigate our user to login 
        if(data?.payload?.success) {
            toast({
                title:data?.payload?.message,
            })
            navigate('/auth/login');
        }
        else{
            toast({
                title:data?.payload?.message,
                variant : 'destructive'
            })
        }
        console.log(data); 
        
       }
    );

  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new Acount
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
