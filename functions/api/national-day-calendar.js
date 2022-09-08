import cheerio from 'cheerio';

// data source: https://nationaldaycalendar.com

export const onRequestGet = async (context) => {
  const CACHE_NAME = 'national-day-calendar';
  const { request } = context;

  let cache = await caches.open(CACHE_NAME);

  const cachedData = await cache.match(request);

  if (cachedData) {
    console.log('🚀 using cached data!');

    const returnData = await cachedData.json();

    return new Response(JSON.stringify(returnData), cachedData);
  }

  console.log('😢 no cache, fetching new data');

  const allData = [];
  const pageData = await fetch('https://nationaldaycalendar.com/')
    .then(async (response) => {
      const markup = await response.text();

      return markup;
    })
    .catch((error) => {
      console.error(error);

      return new Response(JSON.stringify(error), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    });
  const $ = cheerio.load(pageData);
  const groupSelector = 'div.sep_month_events';
  const groupData = $(groupSelector);
  const days = $(groupData).find(
    '.eventon_list_event.evo_eventtop.scheduled.event',
  );

  for await (const day of $(days)) {
    const title = $(day).find('span.evcal_event_title').text().trim();
    const link = $(day).find('a').first().attr('href').trim();
    // console.log(title, link);
    const descriptionData = await fetch(link)
      .then(async (response) => {
        const markup = await response.text();

        return markup;
      })
      .catch((error) => {
        console.error(error);

        return new Response(JSON.stringify(error), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      });
    const selector = '#ff-main-container > main > article > section';
    const $desc = cheerio.load(descriptionData);
    const description = $desc(selector).find('h2 ~ p').first().text().trim();
    // console.log(description);

    if (title && link && description) {
      allData.push({
        title,
        link,
        description,
      });
    }
  }

  const response = new Response(JSON.stringify(allData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=3600, s-maxage=3600',
    },
  });

  // cache data;
  context.waitUntil(cache.put(request, response.clone()));

  return response;
};
