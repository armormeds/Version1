export const roles = [
  'PATIENT',
  'PROVIDER',
  'CLINICAL_ADMIN',
  'SUPPORT',
  'BILLING',
  'COMPLIANCE',
  'SYSTEM_ADMIN',
] as const;
export type Role = (typeof roles)[number];

export const permissions = [
  'patient.read.self',
  'patient.read.assigned',
  'audit.read',
] as const;
export type Permission = (typeof permissions)[number];

const grants: Readonly<Record<Role, readonly Permission[]>> = {
  PATIENT: ['patient.read.self'],
  PROVIDER: ['patient.read.assigned'],
  CLINICAL_ADMIN: [],
  SUPPORT: [],
  BILLING: [],
  COMPLIANCE: ['audit.read'],
  SYSTEM_ADMIN: [],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return grants[role].includes(permission);
}

export interface PatientAccessContext {
  readonly actorUserId: string;
  readonly role: Role;
  readonly patientUserId: string;
  readonly hasActiveAssignment: boolean;
}

export function canReadPatient(context: PatientAccessContext): boolean {
  if (context.role === 'PATIENT')
    return context.actorUserId === context.patientUserId;
  if (context.role === 'PROVIDER') return context.hasActiveAssignment;
  return false;
}
