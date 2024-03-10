export interface SignUpBodyType {
  name: string;
  password: string;
  email: string;
}

export interface LoginBodyType {
  name: string;
  password: string;
  rememberMe?: boolean;
}
