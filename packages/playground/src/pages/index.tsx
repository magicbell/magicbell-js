import { handle, redirect } from 'next-runtime';

export const getServerSideProps = handle({
  async get() {
    return redirect(`/react`);
  },
});

export default function Page() {
  return null;
}
