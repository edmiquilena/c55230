interface IUser {
  fullName: string;
  edad: number;
  isStudent: boolean;
  courses: {
    name: string;
    id: number | string;
  }[];
  role: "admin" | "user";
  phoneNumber: string;
}

interface IUserRegister extends IUser {
  password: string;
}

type TUser = {
  fullName: string;
  edad: number;
  isStudent: boolean;
  courses: {
    name: string;
    id: number | string;
  }[];
  role: "admin" | "user";
  phoneNumber: string;
};
const user: IUserRegister = {
  fullName: "eduardo",
  edad: 24,
  isStudent: true,
  role: "admin",
  courses: [{ name: "Backend", id: "55230" }],
  phoneNumber: "+10293120",
  password: "12345",
};

user.phoneNumber.toUpperCase();

console.log(username.toUpperCase());
username = "renzo";
console.log(username.toUpperCase());
