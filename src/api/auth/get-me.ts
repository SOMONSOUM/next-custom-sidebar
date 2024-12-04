'use server';

import { MeDocument, User } from '@/generated/graphql-types';
import { client } from '@/lib/apollo/server';

export const getMe = async () => {
  try {
    const { data, error } = await client.query({
      query: MeDocument,
    });

    if (error?.message) {
      return {
        me: null,
        error: error.message,
      };
    }

    return {
      me: data?.me as User,
      error: null,
    };
  } catch (error: any) {
    return {
      me: null,
      error: error?.message,
    };
  }
};
