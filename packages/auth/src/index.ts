export interface AuthenticatedIdentity {
  readonly identityUid: string;
}

export interface IdentityTokenVerifier {
  verify(token: string): Promise<AuthenticatedIdentity>;
}
