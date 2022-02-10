import { handle, redirect } from 'next-runtime';

import { getAllExamples } from '~/lib/utils';

export const getServerSideProps = handle({
  async get() {
    const examples = await getAllExamples();
    return redirect(`/example/${examples[0].slug}`);
  },
});

export default function Page() {
  return null;
}
