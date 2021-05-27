import Shop from "../../models/Shop";
import CategoryLocal from "../../models/CategoryLocal";
import CategoryGlobal from "../../models/CategoryGlobal";
import ShopData from "../../data/Dummy_data";

export const ADD_GLOBAL_CATEGORY = "ADD_GLOBAL_CATEGORY";
export const ADD_LOCAL_CATEGORY = "ADD_LOCAL_CATEGORY";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_GLOBAL_CATEGORY = "REMOVE_GLOBAL_CATEGORY";
export const REMOVE_LOCAL_CATEGORY = "REMOVE_LOCAL_CATEGORY";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const EDIT_GLOBAL_CATEGORY = "EDIT_GLOBAL_CATEGORY";
export const EDIT_LOCAL_CATEGORY = "EDIT_LOCAL_CATEGORY";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const EDIT_SHOP = "EDIT_SHOP";
export const ADD_SHOP = "ADD_SHOP";
export const ADD_SERVER = "ADD_SERVER";
export const FETCH_SHOP = "FETCH_SHOP";

export const addGlobal = (shopId, Name, ImageUrl) => {
  return async (dispatch, getState) => {

    dispatch({
      type: ADD_GLOBAL_CATEGORY,
      shopId: shopId,
      Name: Name,
      ImageUrl: ImageUrl,
    });


    const token = getState().auth.token;
    const shopData = getState().shops.ShopData[shopId];
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    
  };
};

export const addLocal = (shopId, Name, ImageUrl, GlobalId) => {
  return async (dispatch, getState) => {


    dispatch({
      type: ADD_LOCAL_CATEGORY,
      shopId: shopId,
      Name: Name,
      ImageUrl: ImageUrl,
      GlobalId: GlobalId,
  
    });



    const token = getState().auth.token;
    const shopData = getState().shops.ShopData[shopId];
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData ),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    
  };
};

export const addProduct = (
  shopId,
  GlobalId,
  prod_Name,
  prod_CategoryId,
  prod_ImageUrl,
  prod_Quantity,
  prod_Unit,
  prod_MfdDate,
  prod_ShelfLife,
  prod_Price,
  prod_Mrp,
  prod_Availability
) => {
  return async (dispatch, getState) => {


    dispatch({
      type: ADD_PRODUCT,
      shopId: shopId,
      GlobalId: GlobalId,
      prod_Name: prod_Name,
      prod_CategoryId: prod_CategoryId,
      prod_ImageUrl: prod_ImageUrl,
      prod_Quantity: prod_Quantity,
      prod_Unit: prod_Unit,
      prod_MfdDate: prod_MfdDate,
      prod_ShelfLife: prod_ShelfLife,
      prod_Price: prod_Price,
      prod_Mrp: prod_Mrp,
      prod_Availability: prod_Availability,
    });



    const token = getState().auth.token;
    const shopData = getState().shops.ShopData[shopId];
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    
  };
};

export const removeGlobal = (shopId, catId) => {
  return async (dispatch, getState) => {

    dispatch({ type: REMOVE_GLOBAL_CATEGORY, shopId: shopId, catId: catId });


  
    const token = getState().auth.token;
    const shopData = getState().shops.ShopData[shopId];
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

  };
};

export const removeLocal = (shopId, catId, LocId) => {
  return async (dispatch, getState) => {


    dispatch({
      type: REMOVE_LOCAL_CATEGORY,
      shopId: shopId,
      catId: catId,
      LocId: LocId,
    });



    const token = getState().auth.token;
    const shopData = getState().shops.ShopData[shopId];
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    
  };
};

export const removeProduct = (shopId, catId, LocId, prodId) => {
  return async (dispatch, getState) => {


    dispatch({
      type: REMOVE_PRODUCT,
      shopId: shopId,
      catId: catId,
      LocId: LocId,
      prodId: prodId,
    });

    const token = getState().auth.token;
    const shopData = getState().shops.ShopData[shopId];
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    
  };
};

export const editGlobal = (shopId, Name, ImageUrl, GlobalId) => {
  return async (dispatch, getState) => {


    dispatch({
      type: EDIT_GLOBAL_CATEGORY,
      shopId: shopId,
      Name: Name,
      ImageUrl: ImageUrl,
      GlobalId: GlobalId,
    });


    const token = getState().auth.token;
    const shopData = getState().shops.ShopData[shopId];
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    
  };
};

export const editLocal = (shopId, Name, ImageUrl, GlobalId, LocalId) => {
  return async (dispatch, getState) => {

    dispatch({
      type: EDIT_LOCAL_CATEGORY,
      shopId: shopId,
      Name: Name,
      ImageUrl: ImageUrl,
      GlobalId: GlobalId,
      LocalId: LocalId,
    });


    const token = getState().auth.token;
    const shopData = getState().shops.ShopData[shopId];
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();


  };
};

export const editProduct = (
  shopId,
  GlobalId,
  prod_Id,
  prod_Name,
  prod_CategoryId,
  prod_ImageUrl,
  prod_Quantity,
  prod_Unit,
  prod_MfdDate,
  prod_ShelfLife,
  prod_Price,
  prod_Mrp,
  prod_Availability
) => {
  return async (dispatch, getState) => {

    dispatch({
      type: EDIT_PRODUCT,
      shopId: shopId,
      GlobalId: GlobalId,
      prod_Id: prod_Id,
      prod_Name: prod_Name,
      prod_CategoryId: prod_CategoryId,
      prod_ImageUrl: prod_ImageUrl,
      prod_Quantity: prod_Quantity,
      prod_Unit: prod_Unit,
      prod_MfdDate: prod_MfdDate,
      prod_ShelfLife: prod_ShelfLife,
      prod_Price: prod_Price,
      prod_Mrp: prod_Mrp,
      prod_Availability: prod_Availability,
    });

    const token = getState().auth.token;
    const shopData = getState().shops.ShopData[shopId];
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();


  };
};

export const editShop = (
  shopId,
  shopName,
  shopImage,
  shopkeeperName,
  shopkeeperImage,
  shopLocation,
  shopOffer,
  shopFront,
  shopDesc,
  openDays,
  openTimings,
  closeTimings,
  breakTimings
) => {
  return async (dispatch, getState) => {


    dispatch({
      type: EDIT_SHOP,
      shopId: shopId,
      shopName: shopName,
      shopImage: shopImage,
      shopkeeperName: shopkeeperName,
      shopkeeperImage: shopkeeperImage,
      shopLocation: shopLocation,
      shopOffer: shopOffer,
      shopFront: shopFront,
      shopDesc: shopDesc,
      openDays: openDays,
      openTimings: openTimings,
      closeTimings: closeTimings,
      breakTimings: breakTimings,
    });

    const token = getState().auth.token;
    const shopData = getState().shops.ShopData[shopId];
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    
  };
};

export const addShop = (
  shopId,
  shopName,
  shopImage,
  shopkeeperName,
  shopkeeperImage,
  shopLocation,
  shopOffer,
  shopFront,
  shopDesc,
  openDays,
  openTimings,
  closeTimings,
  breakTimings
) => {
  return async (dispatch, getState) => {
    const newShop = new Shop(
      shopId,
      shopName,
      shopkeeperName,
      shopImage,
      shopkeeperImage,
      shopLocation,
      shopDesc,
      [],
      openDays,
      openTimings,
      closeTimings,
      breakTimings,
      [],
      []
    );
    const token = getState().auth.token;
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ShopData/${shopId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShop),
      }
    );

    const response1 = await fetch(
      `https://dukaandar-e4590.firebaseio.com/AllShopIds/${shopId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopId),
      }
    );

    dispatch({
      type: ADD_SHOP,
      shopId: shopId,
      shopName: shopName,
      shopImage: shopImage,
      shopkeeperName: shopkeeperName,
      shopkeeperImage: shopkeeperImage,
      shopLocation: shopLocation,
      shopOffer: shopOffer,
      shopFront: shopFront,
      shopDesc: shopDesc,
      openDays: openDays,
      openTimings: openTimings,
      closeTimings: closeTimings,
      breakTimings: breakTimings,
    });
  };
};


export const fetchShop = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const shopIds = getState().profile.shopIds;



    const length = shopIds === undefined ? 0 : shopIds.length;
    var shopData = {};

    for (var i = 0; i < length; i++) {
      const response = await fetch(
        `https://dukaandar-e4590.firebaseio.com/ShopData/${shopIds[i]}.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.json();

      const shop = resData;

      const categories =
        shop.shop_Categories === undefined ? [] : shop.shop_Categories;
      const front = shop.shop_Front === undefined ? [] : shop.shop_Front;
      const offers = shop.shop_Offers === undefined ? [] : shop.shop_Offers;

      var shop_Categories = [];

      for (var j = 0; j < categories.length; j++) {
        const local_Categories =
          categories[j].category_Local === undefined
            ? []
            : categories[j].category_Local;

        var shopLocal = [];

        for (var k = 0; k < local_Categories.length; k++) {
          const products =
            local_Categories[k].category_Products === undefined
              ? []
              : local_Categories[k].category_Products;

          shopLocal.push(
            new CategoryLocal(
              local_Categories[k].category_Name,
              local_Categories[k].CatLocImage,
              local_Categories[k].Local_Id,
              local_Categories[k].Global_Id,
              products
            )
          );
        }

        shop_Categories.push(
          new CategoryGlobal(
            categories[j].category_Name,
            categories[j].category_Image,
            categories[j].category_Id,
            shopLocal
          )
        );
      }

      const newShop = new Shop(
        shop.shop_Id,
        shop.shop_Name,
        shop.shop_ShopkeeperName,
        shop.shop_ShopImage,
        shop.shop_ShopkeeperImage,
        shop.shop_Location,
        shop.shop_Description,
        shop_Categories,
        shop.shop_OpenDays,
        shop.shop_OpenTimings,
        shop.shop_ClosedTimings,
        shop.shop_BreakTimings,
        offers,
        front
      );

      shopData = { ...shopData, [resData.shop_Id]: newShop };
    }

    dispatch({
      type: FETCH_SHOP,
      shopData: shopData,
    });
  };
};
