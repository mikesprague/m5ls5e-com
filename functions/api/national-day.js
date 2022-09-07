const dedupeArrayOfObjects = (objArray, key) => [
  ...new Map(objArray.map((item) => [item[key], item])).values(),
];

export const onRequestGet = async () => {
  const allData = [];

  try {
    const nationalDayCalendarData = await fetch(
      'https://api.m5ls5e.com/api/national-day-calendar',
    ).then(async (response) => {
      const markup = await response.text();

      return markup;
    });

    allData.push(...nationalDayCalendarData);

    const nationalTodayData = await fetch(
      'https://api.m5ls5e.com/api/national-today',
    ).then(async (response) => {
      const markup = await response.text();

      return markup;
    });
    // allData.push(...nationalTodayData);

    const regex = /(-|\s|world|international|national|day|eve)/gi;
    const titlesToCompare = nationalDayCalendarData.map((day) =>
      day.title.toLowerCase().replace(regex, ''),
    );
    // console.log('titlesToCompare: ', titlesToCompare);

    // eslint-disable-next-line no-restricted-syntax
    for await (const day of nationalTodayData) {
      const cleanTitle = day.title.toLowerCase().replace(regex, '');

      if (!titlesToCompare.includes(cleanTitle)) {
        allData.push(day);
      }
    }

    const finalData = dedupeArrayOfObjects(allData, 'title');
    // console.log(finalData);

    return new Response(JSON.stringify(finalData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
