# PHI data flow

## Current state

No clinical functionality or production integration exists. The UI placeholders and
health endpoint do not collect PHI. Development and tests use no patient data.

## Intended trust boundaries

1. A patient, provider, or authorized workforce user connects to the matching Next.js
   application over TLS. PHI must never be put in URLs.
2. Google Cloud Identity Platform authenticates the user using opaque identity data;
   custom claims and identity profile metadata must not contain PHI.
3. The NestJS API verifies identity, loads application roles, evaluates a named
   permission and object relationship server-side, and validates input with Zod.
4. The API retrieves only required fields from private Cloud SQL PostgreSQL through
   Prisma and returns an explicit response DTO.
5. Sensitive access appends an audit event containing opaque identifiers and required
   request metadata, not record content.
6. Future background work uses opaque job identifiers. PHI is loaded only after the
   worker re-establishes authorization or a narrowly scoped system permission.

## Logging and monitoring

Only opaque request, user, patient, resource, action, and result identifiers may be
logged. Request/response bodies, names, contact data, diagnoses, medications, notes,
message bodies, intake answers, and document contents are excluded. Google Cloud
resource names and metric labels must also remain opaque and PHI-free.

## Storage and external transfer

Future patient files are restricted to approved Google Cloud Storage with public
access prevention, uniform bucket-level access, opaque keys, authorization before
short-lived access, and configured encryption. No analytics or third-party service
is present. Payments and notification contracts contain no clinical payloads; an
adapter requires vendor-matrix and contractual review before PHI processing.

## Security assumptions and open review

- Production TLS termination, private networking, IAM, KMS, secrets, backup, and
  audit configurations will be managed by reviewed Terraform.
- Production services will be covered by applicable agreements and approved in the
  vendor matrix before processing PHI.
- Authorization requires current database relationships; authentication is never
  sufficient by itself.
- Audit database immutability, retention periods, IP-address handling, emergency
  access, and data-subject workflows require security, privacy, and legal decisions.
- Threat-model and compliance matrix updates are required with the first protected
  or clinical workflow.
