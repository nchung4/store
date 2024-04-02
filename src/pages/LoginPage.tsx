import { useEffect } from "react";
import { api } from "../api";
import { setAuth } from "../store/auth/authSlice";
import { AuthType } from "../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { useToogleValue } from "../hooks/useToogleValue";
import FormGroup from "../components/common/FormGroup";
import Label from "../components/common/Label";
import Input from "../components/input/Input";
import IconEyeToogle from "../icons/IconEyeToogle";

const schema = yup
  .object({
    email: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
  })
  .required();
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);
  const { value: tooglePassword, handleToogleValue: handleTooglePassword } =
    useToogleValue();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  const onSubmit = async (value: { email: string; password: string }) => {
    console.log(value);
    try {
      const result = await api.post<{ content: AuthType }>(
        "/Users/signin",
        value
      );
      console.log("result - ", result.data);
      dispatch(setAuth({ auth: result.data.content }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-10 w-1/2 mx-auto">
      <div className="flex items-center justify-center">
        <div className="text-2xl flex items-center justify-center w-fit relative before:content-[''] before:w-[200%] before:h-[1px] before:bg-black before:absolute">
          <p className="bg-white px-4 py-2 relative z-10">Register</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input name="email" control={control} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            control={control}
            type={tooglePassword ? "text" : "password"}
          >
            <IconEyeToogle
              className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2"
              open={tooglePassword}
              onClick={handleTooglePassword}
            ></IconEyeToogle>
          </Input>
        </FormGroup>
        <button className="px-5 py-3 bg-black text-white h-fit mt-auto">
          Submit
        </button>
        <p className="text-center">
          Do not have an account?{" "}
          <Link to="/register" className="underline">
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
