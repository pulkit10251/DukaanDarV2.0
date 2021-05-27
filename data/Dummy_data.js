import Shop from "../models/Shop";
import PersonalCare from "./Global/PersonalCare";
import Groceries from "./Global/Groceries";
import HouseholdItems from "./Global/HouseholdItems";
import DairyAndBreakfast from "./Global/DairyAndBreakfast";
import InstantFoodAndSnacks from "./Global/InstantFoodandSnacks";

import Shampoo from "./Local/Shampoo";
import EdibleOils from "./Local/EdibleOils";
import Ghee from "./Local/Ghee";
import SoapAndBodyGel from "./Local/Soap&BodyGel";
import Detergents from "./Local/Detergents";

const ShopData = [
  new Shop(
    "15C5GS",
    "Gupta Store",
    "Pawan Gupta",
    "https://images.jdmagicbox.com/comp/delhi/d5/011pxx11.xx11.160520183410.t7d5/catalogue/vipin-store-rohini-sector-15-delhi-general-stores-bml6z1.jpg?clr=",
    "https://s3.amazonaws.com/newpay1site/blog/wp-content/uploads/2019/07/blog-image-for-5th-July-1024x683.jpg",
    "C-block sector-15",
    "Hello Friends ! Welcome to Gupta Store. You will find all the products of daily usage like Rice, pulses, Masala, Oil and other items",
    [
      PersonalCare,
      Groceries,
      HouseholdItems,
      DairyAndBreakfast,
      InstantFoodAndSnacks,
    ],
    "Open except Monday",
    "11:00",
    "21:30",
    "13:30 to 17:00",
    [
      "data:image/jpeg;base64,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",
      "https://static.vecteezy.com/system/resources/thumbnails/000/688/908/original/flash-sale-banner-template-with-shopping-bags.jpg",
    ],
    [Shampoo, SoapAndBodyGel, EdibleOils, Ghee, Detergents]
  ),
  new Shop(
    "G7745X",
    "Naman Poojan Samagri",
    "Kundan Sharma",
    "wow",
    "wow",
    "G Block sector-15",
    "hehe",
    [],
    "Everyday",
    "8:00",
    "21:30",
    "14:00 to 17:00",
    [],
    []
  ),
];

export default ShopData;
