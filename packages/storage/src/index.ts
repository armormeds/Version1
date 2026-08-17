export interface AuthorizedObjectRequest {
  readonly actorUserId: string;
  readonly opaqueObjectId: string;
  readonly requestId: string;
}
export interface SecureObjectStorage {
  createShortLivedReadUrl(request: AuthorizedObjectRequest): Promise<string>;
}
