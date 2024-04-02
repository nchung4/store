import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import HeartXML from "../../icons/HeartXML";
import { api } from "../../api";
import { addFav, removeFav } from "../../store/favorite/favoriteSlice";

type FavouriteIconProps = { productId: number };
const FavouriteIcon: FC<FavouriteIconProps> = ({ productId }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);
  const favouriteProduct = useSelector((state: RootState) => state.fav);
  const isFav = favouriteProduct.some((i) => i === productId);
  const handleToogleFav = async () => {
    try {
      if (isFav) {
        dispatch(removeFav(productId));
        await api.get(`/Users/unlike?productId=${productId}`, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        });
      } else {
        dispatch(addFav(productId));
        await api.get(`/Users/like?productId=${productId}`, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        });
      }
    } catch (error) {
      console.log();
    }
  };
  if (auth)
    return (
      <span onClick={handleToogleFav}>
        <HeartXML isFav={isFav} />
      </span>
    );
  return;
};

export default FavouriteIcon;
