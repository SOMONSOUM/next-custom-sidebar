'use server';

import { cookies } from 'next/headers';

export const getCookie = async () => {
  const cookiesStore = await cookies();

  return cookiesStore.get('accessToken')?.value;
};
