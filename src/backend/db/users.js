import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Faique",
    lastName: "Jatu",
    username: "JatuFaique",
    password: "pass@123",
    bio: "Inquisitive about punctuality",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Monica",
    lastName: "Thapar",
    username: "monicathapar",
    password: "adarshBalika123",
    bio: "I'm a novice team player looking for opportunity",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Bhavesh",
    lastName: "Agarwal",
    username: "bhaveshagarwal",
    password: "adarshBalika123",
    bio: "A corporate hustler!",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Imaad",
    lastName: "Mohamad",
    username: "imaadMohammad",
    password: "imaadMohammad",
    bio: "Looking for a better opportunity and challenges",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Patel",
    lastName: "Parminder",
    username: "parmindarp",
    password: "parmindarp",
    bio: "Everyone knows the value for money, but few people know the value of good behaviour",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Sushil",
    lastName: "Gupta",
    username: "sushilgupta",
    password: "sushilgupta",
    bio: "Talks about #galaxies #alien #planets #universe",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
