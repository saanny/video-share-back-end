import { UserModel } from "@users/models/User";

export type UserCreateInput = {
  userName?: string;
  password: string;
  email: string;
};
const findByEmail = async (email: string) => {
  try {
    const result = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    return result ?? {};
  } catch (error) {
    console.log(error);
  }
};
const findById = async (id: number) => {
  try {
    const result = await UserModel.findOne({
      where: {
        attribute: {
          id: id,
        },
      },
    });
    return result ?? {};
  } catch (error) {
    console.log(error);
  }
};
const createUser = async (input: UserCreateInput) => {
  try {
    const result = await UserModel.create(input);

    return result.dataValues;
  } catch (error) {
    console.log(error);
  }
};

export { findByEmail, findById, createUser };
