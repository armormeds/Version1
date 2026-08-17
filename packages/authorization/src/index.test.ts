import { describe, expect, it } from 'vitest';
import { canReadPatient, hasPermission } from './index.js';

describe('named permissions', () => {
  it('does not grant broad administrative access', () => {
    expect(hasPermission('SYSTEM_ADMIN', 'patient.read.self')).toBe(false);
    expect(hasPermission('SUPPORT', 'patient.read.assigned')).toBe(false);
  });

  it('grants only the explicitly assigned permission', () => {
    expect(hasPermission('PATIENT', 'patient.read.self')).toBe(true);
    expect(hasPermission('PROVIDER', 'patient.read.assigned')).toBe(true);
  });
});

describe('patient object authorization', () => {
  it('allows a patient to access their own record', () => {
    expect(
      canReadPatient({
        actorUserId: 'user-a',
        patientUserId: 'user-a',
        role: 'PATIENT',
        hasActiveAssignment: false,
      }),
    ).toBe(true);
  });

  it('rejects an IDOR attempt against another patient', () => {
    expect(
      canReadPatient({
        actorUserId: 'user-a',
        patientUserId: 'user-b',
        role: 'PATIENT',
        hasActiveAssignment: false,
      }),
    ).toBe(false);
  });

  it('rejects an unassigned provider and permits an assigned provider', () => {
    const base = {
      actorUserId: 'provider-a',
      patientUserId: 'patient-a',
      role: 'PROVIDER' as const,
    };
    expect(canReadPatient({ ...base, hasActiveAssignment: false })).toBe(false);
    expect(canReadPatient({ ...base, hasActiveAssignment: true })).toBe(true);
  });

  it('does not give support or billing clinical access', () => {
    for (const role of ['SUPPORT', 'BILLING'] as const) {
      expect(
        canReadPatient({
          actorUserId: 'staff-a',
          patientUserId: 'patient-a',
          role,
          hasActiveAssignment: true,
        }),
      ).toBe(false);
    }
  });
});
