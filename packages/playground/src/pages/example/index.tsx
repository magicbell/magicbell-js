import { GetStaticPropsResult } from 'next';

import { getAllExamples } from '~/lib/utils';

export async function getStaticProps(): Promise<GetStaticPropsResult<any>> {
  const examples = await getAllExamples();
  return {
    redirect: {
      destination: `/example/${examples[0].slug}`,
      permanent: false,
    },
  };
}

export default function Page() {
  return null;
}
