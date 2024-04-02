import { api } from "../api";
import FormGroup from "../components/common/FormGroup";
import Label from "../components/common/Label";
import Input from "../components/input/Input";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import * as yup from "yup";
import Checkbox from "../components/common/CheckBox";
import { ProfileType } from "../types";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import classNames from "../utils/classNames";
import ProductFavouriteCard from "../components/product/ProductFavouriteCard";

const schema = yup
  .object({
    email: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    gender: yup
      .string()
      .oneOf(["male", "female"])
      .required("This field is required"),
    phone: yup.string().required("This field is required"),
  })
  .required();
const AccountPage = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const favoriteProduct = useSelector((state: RootState) => state.fav);
  const [profile, setProfile] = useState<ProfileType>();
  const [tab, setTab] = useState<"fav" | "orderHistory">("orderHistory");
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  useEffect(() => {
    if (!auth) {
      navigate("/sign-in");
    }
  }, [auth, navigate]);
  useEffect(() => {
    if (profile) {
      const { email, name, gender, phone } = profile;
      setValue("email", email);
      setValue("gender", gender ? "male" : "female");
      setValue("name", name);
      setValue("phone", phone);
    }
  }, [profile, setValue]);
  useEffect(() => {
    if (auth) {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  const fetchProfile = async () => {
    try {
      const result = await api.post<{ content: ProfileType }>(
        "/Users/getProfile",
        undefined,
        {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        }
      );
      setProfile(result.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (value: {
    email: string;
    name: string;
    gender: "male" | "female";
    phone: string;
  }) => {
    console.log(value);
    try {
      api.post(
        "/Users/updateProfile",
        { ...value, gender: value.gender === "male" },
        {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        }
      );
      fetchProfile();
      toast("Change Profile successful");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-10 gap-10">
        <div className="col-span-3 mt-20 w-3/4">
          <img
            src="https://plus.unsplash.com/premium_photo-1705091308837-a62710023dd4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full aspect-square object-cover rounded-full"
          />
        </div>
        <div className="col-span-7 space-y-8">
          <div className="flex items-center justify-center">
            <div className="text-2xl flex items-center justify-center w-fit relative before:content-[''] before:w-[200%] before:h-[1px] before:bg-black before:absolute">
              <p className="bg-white px-4 py-2 relative z-10">Profile</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-10"
          >
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input name="email" control={control} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">phone</Label>
              <Input name="phone" control={control} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input name="name" control={control} />
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
                    defaulChecked={profile && profile.gender}
                  >
                    Male
                  </Checkbox>
                  <Checkbox
                    name="gender"
                    control={control}
                    value="female"
                    htmlFor="female"
                    defaulChecked={profile && !profile.gender}
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
      </div>
      {profile && profile.ordersHistory.length > 0 && (
        <div className="space-y-8">
          {/* <div className="flex items-center justify-center">
            <div className="text-2xl flex items-center justify-center w-fit relative before:content-[''] before:w-[200%] before:h-[1px] before:bg-black before:absolute">
              <p className="bg-white px-4 py-2 relative z-10">Order Hitory</p>
            </div>
          </div> */}
          <div className="flex items-center gap-10">
            <p
              className={classNames(
                "text-2xl cursor-pointer",
                tab === "orderHistory" ? "underline underline-offset-4" : ""
              )}
              onClick={() => setTab("orderHistory")}
            >
              Order Hitory
            </p>
            <p
              className={classNames(
                "text-2xl cursor-pointer",
                tab === "fav" ? "underline underline-offset-4" : ""
              )}
              onClick={() => setTab("fav")}
            >
              Favorite
            </p>
          </div>
          {tab === "orderHistory" ? (
            <div className="space-y-5">
              {profile.ordersHistory.map((item) => (
                <div key={uuidv4()}>
                  <p>
                    + Orders have been placed on{" "}
                    {dayjs(item.date).format("DD-MM-YYYY")}
                  </p>
                  <div className="flex items-center border border-black py-2">
                    <div className="flex-1 px-2 font-medium">Image</div>
                    <div className="flex-1 px-2 font-medium">Product Name</div>
                    <div className="flex-1 px-2 font-medium">Price</div>
                    <div className="flex-1 px-2 font-medium">Quantity</div>
                    <div className="flex-1 px-2 font-medium">Total</div>
                  </div>
                  {item.orderDetail.map((product) => {
                    const { image, name, price, quantity } = product;
                    return (
                      <div className="flex items-center py-2" key={uuidv4()}>
                        <div className="flex-1 px-2">
                          <img
                            src={image}
                            className="w-16 aspect-square object-cover"
                          />
                        </div>
                        <div className="flex-1 px-2">
                          <p>{name}</p>
                        </div>
                        <div className="flex-1 px-2">{price}$</div>
                        <div className="flex-1 px-2">{quantity}</div>
                        <div className="flex-1 px-2">{price * quantity}$</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-10">
              {favoriteProduct.map((item) => (
                <ProductFavouriteCard key={uuidv4()} productId={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
