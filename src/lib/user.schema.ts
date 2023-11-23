type Role = "admin" | "user";

export type RegisterRequest = {
  name: string;
  email: string;
  role: Role;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  _id: string;
  name: string;
  email: string;
  token: string;
};
