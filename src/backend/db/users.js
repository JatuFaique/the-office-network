import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio: "Ima RIder",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Monica",
    lastName: "Thapar",
    username: "monicathapar",
    password: "adarshBalika123",
    bio: "Ima Provider",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Bhavesh",
    lastName: "Agarwal",
    username: "bhaveshagarwal",
    password: "adarshBalika123",
    bio: "Ima SIder",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
