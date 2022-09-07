import cheerio from 'cheerio';

// data source: https://nationaltoday.com

export const onRequestGet = async () => {
  const allData = await fetch('https://nationaltoday.com/what-is-today/')
    .then(async (response) => {
      const markup = await response.text();
      const $ = cheerio.load(markup);
      // console.log(markup);

      const returnData = [];
      const contentSelector = '.day-card .card-content .title-box';

      $(contentSelector).each((idx, elem) => {
        const title = $(elem).find('a').text().trim().toUpperCase();
        const description = $(elem).find('p.excerpt').text().trim();
        const link = $(elem).find('a').attr('href').trim();
        const isBirthday = link.toLowerCase().includes('birthday');

        if (title.length && description.length && link.length) {
          returnData.push({
            title: `${isBirthday ? `BIRTHDAY: ${title}` : title}`,
            description,
            link,
          });
        }
      });
      // console.log(returnData);

      return returnData;
    })
    .catch((error) => {
      return new Response(JSON.stringify(error.message), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    });

  return new Response(JSON.stringify(allData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=3600, s-maxage=3600',
    },
  });
};
