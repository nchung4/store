import Label from "../components/common/Label";
import Input from "../components/input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormGroup from "../components/common/FormGroup";
import Checkbox from "../components/common/CheckBox";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToogleValue } from "../hooks/useToogleValue";
import IconEyeToogle from "../icons/IconEyeToogle";
import { useEffect } from "react";
import { RootState } from "../store/configureStore";
import { AuthType } from "../types";
import { toast } from "react-toastify";

const schema = yup
  .object({
    email: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
    rePassword: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    gender: yup
      .string()
      .oneOf(["male", "female"])
      .required("This field is required"),
    phone: yup.string().required("This field is required"),
  })
  .required();
const RegisterPage = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const { value: tooglePassword, handleToogleValue: handleTooglePassword } =
    useToogleValue();
  const { value: toogleRePassword, handleToogleValue: handleToogleRePassword } =
    useToogleValue();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  const onSubmit = async (value: {
    email: string;
    password: string;
    rePassword: string;
    name: string;
    gender: "male" | "female";
    phone: string;
  }) => {
    console.log(value);
    try {
      if (value.password === value.rePassword) {
        const { email, gender, name, password, phone } = value;
        await api.post<{ content: AuthType }>("/Users/signup", {
          email,
          phone,
          password,
          name,
          gender: gender === "male",
        });
        toast("Registration successful, please log in");
        navigate('/login')
      } else {
        setError("rePassword", { message: "Confirm password does not match" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-center">
        <div className="text-2xl flex items-center justify-center w-fit relative before:content-[''] before:w-[200%] before:h-[1px] before:bg-black before:absolute">
          <p className="bg-white px-4 py-2 relative z-10">Register</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-40 gap-y-5"
      >
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input name="email" control={control} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input name="name" control={control} />
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
        <FormGroup>
          <Label htmlFor="phone">phone</Label>
          <Input name="phone" control={control} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="rePassword">Password confirm</Label>
          <Input
            name="rePassword"
            control={control}
            type={toogleRePassword ? "text" : "password"}
          >
            <IconEyeToogle
              className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2"
              open={toogleRePassword}
              onClick={handleToogleRePassword}
            ></IconEyeToogle>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="gender">Gender</Label>
          <div className="">
            <div className="flex items-center gap-10">
              <Checkbox
                name="gender"
                control={control}
                value="male"
                htmlFor="male"
              >
                Male
              </Checkbox>
              <Checkbox
                name="gender"
                control={control}
                value="female"
                htmlFor="female"
              >
                Female
              </Checkbox>
            </div>
            {errors.gender ? (
              <p className="text-err">{errors.gender.message}</p>
            ) : null}
          </div>
        </FormGroup>
        <button className="px-5 py-2 bg-black text-white h-fit mt-auto">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
