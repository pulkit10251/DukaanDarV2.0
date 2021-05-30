export const getShopId = () => {
  return async (dispatch, getState) => {
    const token = await getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/DukaanDar/${userId}.json`
    );

    const resData = await response.json();

    if (resData === null) {
      return;
    }

    const response1 = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${resData.shopId}/shop_Name.json`
    );

    const resData1 = await response1.json();

    dispatch({
      type: "GET_SHOP_ID_DUKAANDAR",
      shopId: resData.shopId,
      shopName: resData1,
    });
  };
};
