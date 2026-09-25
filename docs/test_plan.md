# Solo — Database Test Plan

## profiles

### Structure
- [ ] Table exists
- [ ] `id` is UUID
- [ ] `id` references `auth.users(id)`
- [ ] `ON DELETE CASCADE` works
- [ ] `created_at` has a default
- [ ] `updated_at` has a default

### Profile lifecycle
- [ ] New auth user automatically gets a profile
- [ ] Profile ID matches auth user ID
- [ ] Profile is removed when auth user is deleted
- [ ] Profile creation failure is handled correctly

### `updated_at`
- [ ] `updated_at` changes when profile is updated
- [ ] `updated_at` does not require application code
- [ ] `created_at` does not change during update

### RLS
- [ ] Authenticated user can read own profile
- [ ] Authenticated user can update own profile
- [ ] User cannot read another user's profile
- [ ] User cannot update another user's profile
- [ ] Anonymous user cannot read profiles
- [ ] Anonymous user cannot update profiles
- [ ] User cannot change profile ownership

### Edge cases
- [ ] Duplicate profile ID rejected
- [ ] Invalid user ID rejected
- [ ] Invalid ownership update rejected
- [ ] Deleted auth user cannot retain an orphan profile

---

## user_preferences

### Structure
- [ ] Table exists
- [ ] One preference row per user
- [ ] User ID references `profiles`
- [ ] Cascade deletion works
- [ ] Defaults are correct
- [ ] Validation constraints work

### RLS
- [ ] User can read own preferences
- [ ] User can update own preferences
- [ ] User cannot read another user's preferences
- [ ] User cannot update another user's preferences
- [ ] Anonymous access denied

### `updated_at`
- [ ] Changes automatically after update
- [ ] `created_at` remains unchanged

### Edge cases
- [ ] Duplicate preference row rejected
- [ ] Invalid focus duration rejected
- [ ] Invalid timezone handled/rejected appropriately
- [ ] Deleted user removes preferences

---

## Future tests

### captures
- [ ] Ownership
- [ ] RLS
- [ ] Create/update/delete
- [ ] Conversion to task
- [ ] Duplicate/concurrent conversion
- [ ] Invalid state transitions

### tasks
- [ ] Ownership
- [ ] RLS
- [ ] Valid state transitions
- [ ] One-active-task rule
- [ ] Concurrent task activation
- [ ] Completion consistency
- [ ] Delete/archive behavior

### plans
- [ ] Ownership
- [ ] RLS
- [ ] Task relationships
- [ ] Delete behavior

### daily_plans
- [ ] One daily plan per user/date
- [ ] Concurrent creation
- [ ] Task ordering
- [ ] Ownership

### focus_sessions
- [ ] Ownership
- [ ] Valid lifecycle
- [ ] Start/pause/resume/complete
- [ ] Concurrent operations
- [ ] Duration calculation
- [ ] Abandoned session handling

### subscriptions
- [ ] Ownership
- [ ] Subscription state transitions
- [ ] Duplicate webhook handling
- [ ] Expiration
- [ ] Cancellation
- [ ] Refund
- [ ] Entitlement consistency

### billing_events
- [ ] Idempotency
- [ ] Duplicate events
- [ ] Invalid events
- [ ] Out-of-order events
- [ ] Replay/recovery

### audit_logs
- [ ] Important actions recorded
- [ ] Correct actor
- [ ] Correct timestamp
- [ ] Tamper resistance
- [ ] Sensitive information not logged

### Production
- [ ] Migration reproducibility
- [ ] RLS enabled on every user-owned table
- [ ] No service-role key in client
- [ ] No database credentials in mobile app
- [ ] Indexes verified
- [ ] Query performance checked
- [ ] Backup/recovery tested