import { handle, redirect } from 'next-runtime';

export const getServerSideProps = handle({
  async get() {
    return redirect(`/react`, 301);
  },
});

export default function Page() {
  return null;
}
