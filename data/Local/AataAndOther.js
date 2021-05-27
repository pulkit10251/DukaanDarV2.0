import Product from "../../models/Product";
import CategoryLocal from "../../models/CategoryLocal";

const AataAndOther = new CategoryLocal(
  "Aata and Other flours",
      "data:image/jpeg;base64,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",
  5,
  2,
  [
    new Product(
      "Shakti Bhog Aata",
      "5-1",
      "2wCEAAkGBxMREhUTEhMVFhUVGRUVGBcXFxUXGhgVFxcXGhgaGRUYHSogGBolHRgYIjEhJSktLi4uFx8zODMtNyguLisBCgoKDg0OGxAQGy0lICYtLS0vLS0tLS0vLy0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf",
      380,
      420,
      10,
      "Kg",
      "27 April, 2020",
      "2 Months",
      5,
      true,
    ),
    new Product(
      "Aashirwad Aata",
      "5-2",
      "2wCEAAkGBxMTEhUTEhISFhMXFhYZEhYWFhcVEhgXGBUZFxgXFxUYHSghGB0lGxcWITEhJSkrLi8uGB8zODMsNygtMi0BCgoKDg0OGxAQGy0lICYtLy0tLS0vLS0tLTAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf",
      380,
      420,
      10,
      "Kg",
      "27 April, 2020",
      "2 Months",
      5,
      true,
    ),
    new Product(
      "Patanjali Aata",
      "5-3",
      "https://lh3.googleusercontent.com/proxy/lyTIAlA9hE-WEJbw-pYV65D1JAkIEB79iVmRT4SkSHqKsj84c0c5p6IKRkz8emV9EdgXyutrKcYEhegr0M-0OxECYMf05NMIjraCw8imfiSAv8e29YdQ3s_qzOtFQ-s",
      360,
      400,
      10,
      "Kg",
      "12 May, 2020",
      "2 Months",
      5,
      true,
    ),
    new Product(
      "Rajdhani Aata",
      "5-4",
      "data:image/jpeg;base64,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",
      400,
      450,
      10,
      "Kg",
      "13 May,2020",
      "2 Months",
      5,
      true,
    ),
  ]
);

export default AataAndOther;
