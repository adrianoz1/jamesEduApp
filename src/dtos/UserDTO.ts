export type UserDTO = {
  id: string;
  name: string;
  email: string;
  role: "MEMBER" | "ADMIN";
  created_at: Date;
}
