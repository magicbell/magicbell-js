export type UserCredentials =
  | { apiKey: string; userExternalId?: never; userEmail: string; userHmac?: string; authToken?: never }
  | { apiKey: string; userExternalId: string; userEmail?: never; userHmac?: string; authToken?: never }
  | { apiKey: string; userExternalId?: never; userEmail?: never; userHmac?: never; authToken: string };

export type ClientOptions = {
  host?: string;
} & UserCredentials;

export type ChannelToken = {
  id: string;
  created_at: string;
  updated_at: string;
  discarded_at: string | null;
};

export class IntegrationClient<Installation, Token extends ChannelToken> {
  #host: string;
  #credentials: UserCredentials;
  #key: string;

  constructor(key: string, { host, ...auth }: ClientOptions) {
    this.#key = key;
    this.#host = (host || 'https://api.magicbell.com').replace(/\/$/g, '');
    this.#credentials = auth;

    if (!this.#key) {
      throw new Error('Please provide the integration key');
    }
  }

  #getHeaders() {
    const headers: Record<string, string> = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-magicbell-api-key': this.#credentials.apiKey,
    };

    if ('authToken' in this.#credentials && this.#credentials.authToken) {
      headers['authorization'] = `Bearer ${this.#credentials.authToken}`;
    } else if ('userExternalId' in this.#credentials && this.#credentials.userExternalId) {
      headers['x-magicbell-user-external-id'] = this.#credentials.userExternalId;
    } else if ('userEmail' in this.#credentials && this.#credentials.userEmail) {
      headers['x-magicbell-user-email'] = this.#credentials.userEmail;
    } else {
      throw new Error('Missing userExternalId or userEmail');
    }

    if (this.#credentials.userHmac) {
      headers['x-magicbell-user-hmac'] = this.#credentials.userHmac;
    }

    return headers;
  }

  async #fetch<T = unknown>(method: string, path: string, data?: unknown): Promise<T> {
    if (path.startsWith('/')) {
      path = path.slice(1);
    }

    const url = `${this.#host}/${path}`;

    const init: RequestInit = {
      method,
      headers: this.#getHeaders(),
      body: data ? JSON.stringify({ [this.#key]: data }) : undefined,
    };

    const response = await fetch(url, init);
    if (response.status > 299) throw new Error(`request failed with ${response.status} - ${response.statusText}`);
    if (response.status === 204) return;

    const body = await response.json();
    if (this.#key in body) return body[this.#key];
    return body as T;
  }

  async startInstallation() {
    return this.#fetch<Installation>('POST', `/integrations/${this.#key}/installations/start`);
  }

  async getToken(id: string) {
    return this.#fetch<Token>('GET', `/channels/${this.#key}/tokens/${id}`);
  }

  async getTokens() {
    return this.#fetch<Array<Token>>('GET', `/channels/${this.#key}/tokens`);
  }

  async deleteToken(id: string) {
    return this.#fetch<void>('DELETE', `/channels/${this.#key}/tokens/${id}`);
  }

  async createToken(token: Partial<Omit<Token, keyof ChannelToken>>) {
    return this.#fetch<Token>('POST', `/channels/${this.#key}/tokens`, token);
  }
}
