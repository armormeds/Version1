# System architecture

## Status and scope

This document records the initial application boundaries. The scaffold does not
implement clinical workflows. Compliance depends on organizational controls,
contracts, configuration, and operating practices in addition to software.

## Applications

| Application | Runtime                    | Responsibility                               | Data classification |
| ----------- | -------------------------- | -------------------------------------------- | ------------------- |
| `marketing` | Next.js                    | Public, human-reviewed informational content | Public              |
| `patient`   | Next.js                    | Future authenticated patient experience      | PHI-capable         |
| `provider`  | Next.js                    | Future authenticated provider experience     | PHI-capable         |
| `admin`     | Next.js                    | Future role-restricted operations            | PHI-capable         |
| `api`       | NestJS                     | Server-side policy and data boundary         | PHI-capable         |
| `worker`    | NestJS application context | Future asynchronous jobs                     | PHI-capable         |

The web surfaces are separate deployments so public marketing code cannot silently
become part of an authenticated PHI application. The API currently exposes only
`GET /v1/health`: it is unauthenticated, has no authorization requirement or input
schema, returns `{ status: "ok" }`, produces no sensitive audit event, is non-PHI,
and returns NestJS's generic error response on failure.

## Shared packages

Packages isolate identity verification contracts, named-permission authorization,
append-only audit writing, Prisma access, safe logging, headers, storage, payments,
notifications, Zod schemas, and presentation contracts. Identity Platform will
authenticate an opaque `identity_uid`; database roles and relationships remain the
authorization source of truth.

## Data and persistence

PostgreSQL is the single system of record and Prisma is the application ORM. UUIDs
are used for primary keys. Foreign keys preserve identity, provider, patient,
assignment, consent, and licensing relationships. Consent snapshots retain version
and hash data. Audit events intentionally have no update/delete repository contract.
Database-level append-only enforcement remains an infrastructure/migration decision.

## Deployment direction

The intended platform is Google Cloud Run with private Cloud SQL PostgreSQL. Secret
Manager supplies production secrets. Terraform will define production resources,
service accounts, private networking, encryption, backups, deletion protection,
Cloud Armor, and environment separation; none are provisioned by this scaffold.

## Decisions deferred

- Exact Identity Platform token verification and session/CSRF design.
- Permission matrix for clinical administrators and system administrators.
- Audit retention, partitioning, immutable database role, and IP retention policy.
- Consent content storage/version publication and legally approved IP capture rules.
- Provider license verification authority and jurisdiction eligibility rules.
- Approved Cloud Storage, payment, and notification adapters after vendor review.
- Deployment Terraform, observability, rate limits, and disaster recovery objectives.
