export default async function wait(delay: number) {
  await new Promise((res) => {
    setTimeout(() => {
      res(1);
    }, delay);
  });
}
