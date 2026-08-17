import type { Role } from '@telehealth/authorization';

export type AuditResult = 'SUCCESS' | 'FAILURE';
export interface AppendAuditEvent {
  readonly occurredAt: Date;
  readonly actorUserId: string;
  readonly actorRole: Role;
  readonly action: string;
  readonly resourceType: string;
  readonly resourceId: string;
  readonly patientId?: string;
  readonly requestId: string;
  readonly ipAddress: string;
  readonly result: AuditResult;
}

/** Append-only by design: application consumers receive no update or delete API. */
export interface AuditWriter {
  append(event: AppendAuditEvent): Promise<{ id: string }>;
}
