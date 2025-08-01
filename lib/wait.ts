export default async function wait(delay: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(1);
    }, delay);
  });
}
