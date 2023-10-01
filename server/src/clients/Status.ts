export const getStatus = (status: number) => {
  return fetch(`http://httpstat.us/${status}`).then(res => [res.status, res.statusText] as [number, string]);
};
