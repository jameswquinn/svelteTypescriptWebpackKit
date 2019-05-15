import App from "./App.svelte";
import { trim, upperCase, toUpper, camelCase, upperFirst } from "lodash-es";

import { DateTime } from "luxon";
import dayjs from "dayjs"

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);


var app = new App({
  target: document.body
});

export default app;

let x = "    James     "
//alert(toUpper(trim(x)));

alert(dayjs(1557961152428).fromNow());



//alert(DateTime.local().setZone("America/New_York").minus({ weeks: 1 }).endOf('day').toISO());
