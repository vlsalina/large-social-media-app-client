import { general } from "../_constants/general.constants";

export const bgc = (topic) => {
  switch (topic) {
    case general.TECHNOLOGY:
      return "technology";
    case general.MONEY:
      return "money";
    case general.BUSINESS:
      return "business";
    case general.PRODUCTIVITY:
      return "productivity";
    case general.PSYCHOLOGY:
      return "psychology";
    case general.MINDFULNESS:
      return "mindfulness";
    case general.ART:
      return "art";
    default:
      return "";
  }
};
