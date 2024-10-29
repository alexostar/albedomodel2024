import { LatLngExpression, LatLngTuple } from 'leaflet';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      stations: {
        Row: {
          created_at: string;
          id: number;
          station: number;
          year: number;
          month: number;
          snowcover: number;
          name: string;
          col_f: string | null;
          col_g: string | null;
          col_h: string | null;
        };
        Insert: {
          created_at: string;
          id: number;
          station: number;
          year: number;
          month: number;
          snowcover: number;
          name: string;
          col_f: string | null;
          col_g: string | null;
          col_h: string | null;
        };
        Update: {
          created_at: string;
          id: number;
          station: number;
          year: number;
          month: number;
          snowcover: number;
          name: string;
          col_f: string | null;
          col_g: string | null;
          col_h: string | null;
        };
        Relationships: [];
      };
      stationsummary: {
        Row: {
          created_at: string;
          id: number;
          station: string;
          name: string;
          jan: number;
          feb: number;
          mar: number;
          apr: number;
          may: number;
          jun: number;
          jul: number;
          aug: number;
          sep: number;
          oct: number;
          nov: number;
          dec: number;
          first_year: number;
          last_year: number;
        };
        Insert: {
          created_at: string;
          id: number;
          station: string;
          name: string;
          jan: number;
          feb: number;
          mar: number;
          apr: number;
          may: number;
          jun: number;
          jul: number;
          aug: number;
          sep: number;
          oct: number;
          nov: number;
          dec: number;
          first_year: number;
          last_year: number;
        };
        Update: {
          created_at: string;
          id: number;
          station: string;
          name: string;
          jan: number;
          feb: number;
          mar: number;
          apr: number;
          may: number;
          jun: number;
          jul: number;
          aug: number;
          sep: number;
          oct: number;
          nov: number;
          dec: number;
          first_year: number;
          last_year: number;
        };
        Relationships: [];
      };
      stations2: {
        Row: {
          created_at: string;
          id: number;
          station: string;
          name: string;
          jan: number;
          feb: number;
          mar: number;
          apr: number;
          may: number;
          jun: number;
          jul: number;
          aug: number;
          sep: number;
          oct: number;
          nov: number;
          dec: number;
          first_year: number;
          last_year: number;
          latlng: LatLngExpression | LatLngTuple;
          snowindex01: number;
          avg_monthly_value: number;
          skogarkolefni: boolean | null;
          tdee_055_006: number;
        };
        Insert: {
          created_at: string;
          id: number;
          station: string;
          name: string;
          jan: number;
          feb: number;
          mar: number;
          apr: number;
          may: number;
          jun: number;
          jul: number;
          aug: number;
          sep: number;
          oct: number;
          nov: number;
          dec: number;
          first_year: number;
          last_year: number;
          latlng: LatLngExpression | LatLngTuple;
          snowindex01: number;
          avg_monthly_value: number;
          skogarkolefni: boolean | null;
          tdee_055_006: number;
        };
        Update: {
          created_at: string;
          id: number;
          station: string;
          name: string;
          jan: number;
          feb: number;
          mar: number;
          apr: number;
          may: number;
          jun: number;
          jul: number;
          aug: number;
          sep: number;
          oct: number;
          nov: number;
          dec: number;
          first_year: number;
          last_year: number;
          latlng: LatLngExpression | LatLngTuple;
          snowindex01: number;
          avg_monthly_value: number;
          skogarkolefni: boolean | null;
          tdee_055_006: number;
        };
        Relationships: [];
      };
      stodvartj: {
        Row: {
          created_at: string;
          id: number;
          station: string;
          lat: number;
          lng: number;
          latlng: LatLngExpression | LatLngTuple;
          name: string;
          alt: number;
          first_year: number;
          last_year: number;
        };
        Insert: {
          created_at: string;
          id: number;
          station: string;
          lat: number;
          lng: number;
          latlng: LatLngExpression | LatLngTuple;
          name: string;
          alt: number;
          first_year: number;
          last_year: number;
        };
        Update: {
          created_at: string;
          id: number;
          station: string;
          lat: number;
          lng: number;
          latlng: LatLngExpression | LatLngTuple;
          name: string;
          alt: number;
          first_year: number;
          last_year: number;
        };
        Relationships: [];
      };

      images: {
        Row: {
          auto_id: number;
          created_at: string;
          id: string;
          path: string;
          title: string;
        };
        Insert: {
          auto_id?: number;
          created_at?: string;
          id: string;
          path: string;
          title: string;
        };
        Update: {
          auto_id?: number;
          created_at?: string;
          id?: string;
          path?: string;
          title?: string;
        };
        Relationships: [];
      };
      vedurstodvar: {
        Row: {
          id: number;
          name: string;
          latlng: LatLngExpression | LatLngTuple;
          snowcover: number;
        };
        Insert: {
          id: number;
          name: string;
          latlng: LatLngExpression | LatLngTuple;
          snowcover: number;
        };
        Update: {
          id: number;
          name: string;
          latlng: LatLngExpression | LatLngTuple;
          snowcover: number;
        };
        Relationships: [];
      };

      skogarkolefni: {
        Row: {
          capture: number | null;
          certified: boolean;
          company: string;
          created_at: string;
          description: string | null;
          id: number;
          latlng: LatLngExpression | LatLngTuple;
          name: string;
          size: number | null;
          species: string | null;
          year: number | null;
          status: string | null;
          imageurl: string | null;
          icr: string | null;
          media:
            | [
                {
                  url: string;
                  linktext: string;
                }
              ]
            | null;
          url_comp: string | null;
          readmore: boolean;
          scheme: string | null;
          comments: string | null;
          snowcover: number | null;
          vedurstod: string | null;
          allimages: string | null;
          photographer: string | null;
          community: string | null;
          albedopine: number | null;
          frontpage: boolean;
          projectdata: string | null;
          vedurstodvar: [number] | null;
          tdee_055_006: number | null;
          markerphoto: string | null;
        };

        Insert: {
          capture?: number | null;
          certified?: boolean | null;
          company?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          latlng: LatLngExpression | LatLngTuple;
          name: string;
          size?: number | null;
          species?: string | null;
          year?: number | null;
          tatus: string | null;
          imageurl: string | null;
          icr: string | null;
          media:
            | [
                {
                  url: string;
                  linktext: string;
                }
              ]
            | null;
          url_comp: string | null;
          readmore: boolean;
          scheme: string | null;
          comments: string | null;
          snowcover: number | null;
          vedurstod: string | null;
          allimages: string | null;
          photographer: string | null;
          community: string | null;
          albedopine: number | null;
          frontpage: boolean;
          projectdata: string | null;
          vedurstodvar: [number] | null;
          tdee_055_006: number | null;
          markerphoto: string | null;
        };
        Update: {
          capture?: number | null;
          certified?: boolean | null;
          company?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          latlng?: LatLngExpression | LatLngTuple;
          name?: string;
          size?: number | null;
          species?: string | null;
          year?: number | null;
          tatus: string | null;
          imageurl: string | null;
          icr: string | null;
          media:
            | [
                {
                  url: string;
                  linktext: string;
                }
              ]
            | null;
          url_comp: string | null;
          readmore: boolean;
          scheme: string | null;
          comments: string | null;
          snowcover: number | null;
          vedurstod: string | null;
          allimages: string | null;
          photographer: string | null;
          community: string | null;
          albedopine: number | null;
          frontpage: boolean;
          projectdata: string | null;
          vedurstodvar: [number] | null;
          tdee_055_006: number | null;
          markerphoto: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
