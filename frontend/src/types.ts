/** Shared Home Assistant frontend types. */

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HassLocale {
  language: string;
  date_format?: "language" | "system" | "DMY" | "MDY" | "YMD";
  time_zone?: "local" | "server";
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language?: string;
  locale?: HassLocale;
  themes?: {
    darkMode?: boolean;
  };
  user?: {
    id?: string;
    name?: string;
    is_admin?: boolean;
  };
  callService: (
    domain: string,
    service: string,
    data?: Record<string, unknown>,
  ) => Promise<unknown>;
  connection: {
    sendMessagePromise: <T = unknown>(message: Record<string, unknown>) => Promise<T>;
    subscribeMessage: <T>(
      callback: (message: T) => void,
      subscribeMessage: Record<string, unknown>,
    ) => Promise<() => void>;
  };
  localize: (key: string) => string;
}

export {};
