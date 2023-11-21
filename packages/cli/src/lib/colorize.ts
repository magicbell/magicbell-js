import kleur from 'kleur';

type TokenType =
  | 'WHITESPACE'
  | 'BRACE'
  | 'BRACKET'
  | 'COLON'
  | 'COMMA'
  | 'ERROR_KEY'
  | 'STRING_KEY'
  | 'STRING_LITERAL'
  | 'NUMBER_LITERAL'
  | 'BOOLEAN_LITERAL'
  | 'NULL_LITERAL';

const tokenTypes: { regex: RegExp; tokenType: TokenType }[] = [
  { regex: /^\s+/, tokenType: 'WHITESPACE' },
  { regex: /^[{}]/, tokenType: 'BRACE' },
  { regex: /^[[\]]/, tokenType: 'BRACKET' },
  { regex: /^:/, tokenType: 'COLON' },
  { regex: /^,/, tokenType: 'COMMA' },
  { regex: /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i, tokenType: 'NUMBER_LITERAL' },
  { regex: /^"error"(?=\s*:)/, tokenType: 'ERROR_KEY' },
  { regex: /^"(?:\\.|[^"\\])*"(?=\s*:)/, tokenType: 'STRING_KEY' },
  { regex: /^"(?:\\.|[^"\\])*"/, tokenType: 'STRING_LITERAL' },
  { regex: /^true|^false/, tokenType: 'BOOLEAN_LITERAL' },
  { regex: /^null/, tokenType: 'NULL_LITERAL' },
];

function getTokens(json: string) {
  const tokens = [];

  while (json.length) {
    let matched = false;
    for (let i = 0; i < tokenTypes.length; i++) {
      const match = tokenTypes[i].regex.exec(json);
      if (!match) continue;
      matched = true;

      tokens.push({ type: tokenTypes[i].tokenType, value: match[0] });
      json = json.substring(match[0].length);
      break;
    }

    if (!matched) {
      throw new Error('Unexpected token');
    }
  }

  return tokens;
}

export const colors: Record<TokenType, (str: string | number) => string | number> = {
  BRACE: kleur.white,
  BRACKET: kleur.white,
  COLON: kleur.white,
  COMMA: kleur.white,
  ERROR_KEY: kleur.red,
  STRING_KEY: kleur.blue,
  STRING_LITERAL: kleur.green,
  NUMBER_LITERAL: kleur.yellow,
  BOOLEAN_LITERAL: kleur.cyan,
  NULL_LITERAL: kleur.red,
  WHITESPACE: (i) => i,
};

export type Colors = { colors?: Record<keyof typeof colors, (val: string | number) => string> };

export function colorize(json: string) {
  const tokens = getTokens(json);
  return tokens.reduce((acc, token) => acc + colors[token.type](token.value), '');
}
