export const onRequestGet = async () => {
  const apiUrl = 'https://icanhazdadjoke.com';
  const returnData = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(async (response) => {
      const data = await response.json();

      return data;
    })
    .catch((error) => {
      console.error(error);

      return new Response(JSON.stringify(error), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    });

  return new Response(JSON.stringify(returnData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
