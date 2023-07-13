import { UnauthorizedException } from "@nestjs/common";

export const authContext = ({ req }) => {
  if (req.headers?.authorization) {
    // Validate jwt
    return { user: { id: 123 } }; // -> context.user
  }
  throw new UnauthorizedException();
};