import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/graphql',
  documents: 'src/**/*.{ts,tsx}',
  ignoreNoDocuments: true,
  debug: true,
  verbose: true,
  generates: {
    'src/generated/graphql-types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      presetConfig: {
        persistedDocuments: true,
      },
    },
  },
};

export default config;
