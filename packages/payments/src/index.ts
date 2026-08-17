/** Payments use opaque order IDs and never control clinical decisions. */
export interface PaymentReference {
  readonly opaqueOrderId: string;
}
