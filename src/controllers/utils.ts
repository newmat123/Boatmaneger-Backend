import { Request } from "express";

const maxTake = 200;

export const validateTake = (req: Request) => {
  if (typeof req.query.take !== "string") {
    return 1;
  }
  if (/^\d+$/.test(req.query.take) === false) {
    return 1;
  }
  const take = +req.query.take;
  if (take > maxTake) {
    return maxTake;
  }
  return take;
};
