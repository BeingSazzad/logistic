/**
 * HERO Logistics — Single Source of Truth for Branch/Location Master Data
 *
 * Rules:
 *  - id        : Internal code used in data records and URL params
 *  - shortCode : 3-letter display code used in badges/tables
 *  - name      : Official full name — USE THIS everywhere in UI text
 *  - type      : Facility type
 *  - city      : City/region label used in Load origin/dest fields
 *  - state     : Australian state
 */

export const BRANCHES = [
  {
    id:        'SYD-CENTRAL',
    shortCode: 'SYD',
    name:      'Sydney Central Depot',
    type:      'Primary Depot',
    city:      'Sydney',
    state:     'NSW',
    location:  'Strathfield, NSW 2135',
    manager:   'Michael Adams',
    phone:     '+61 2 9111 2222',
    hours:     '24/7',
    status:    'Online',
  },
  {
    id:        'MEL-Depot',
    shortCode: 'MEL',
    name:      'Melbourne Depot',
    type:      'Primary Depot',
    city:      'Melbourne',
    state:     'VIC',
    location:  'Tullamarine, VIC 3043',
    manager:   'Sarah Mitchell',
    phone:     '+61 3 8111 2222',
    hours:     '06:00 – 22:00',
    status:    'Online',
  },
  {
    id:        'BNE-PORT',
    shortCode: 'BNE',
    name:      'Brisbane Port Branch',
    type:      'Local Branch',
    city:      'Brisbane',
    state:     'QLD',
    location:  'Lytton, QLD 4178',
    manager:   'Liam Smith',
    phone:     '+61 7 7111 2222',
    hours:     '04:00 – 20:00',
    status:    'Offline',
  },
];

/** Lookup by ID → full branch object */
export const getBranch = (id) => BRANCHES.find(b => b.id === id) ?? null;

/** Lookup by ID → display name (safe fallback) */
export const getBranchName = (id) => getBranch(id)?.name ?? id;

/** For <select> dropdowns */
export const BRANCH_OPTIONS = BRANCHES.map(b => ({ value: b.id, label: `${b.name} (${b.shortCode})` }));
