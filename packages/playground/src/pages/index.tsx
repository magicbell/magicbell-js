import { handle, redirect } from 'next-runtime';

export const getServerSideProps = handle({
  async get() {
    return redirect(`/example/react`);
  },
});

export default function Page() {
  return null;
}
