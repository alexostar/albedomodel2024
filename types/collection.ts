import { Database } from './schema';

export type Skogarkolefni =
  Database['public']['Tables']['skogarkolefni']['Row'];
// The main table for all known carbon farming projects in Iceland

export type Vedurstodvar = Database['public']['Tables']['vedurstodvar']['Row'];

export type Stations = Database['public']['Tables']['stations']['Row'];
export type Stationsummary =
  Database['public']['Tables']['stationsummary']['Row'];
export type Stations2 = Database['public']['Tables']['stations2']['Row'];
export type Stodvartj = Database['public']['Tables']['stodvartj']['Row'];

export type ImageTypes = Database['public']['Tables']['images']['Row'];
// Used for the Photos page (Example of a page behind a login)

// For makinging the type global:
// See for example https://blog.logrocket.com/using-next-js-with-typescript/
