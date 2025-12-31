import { Ratelimit } from "@upstash/ratelimit";

import { Redis } from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config();

// create ratelimiter 
try{
const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10,"20 s"),
})
}
catch(error) {
    console.warn("upstash failed to  initialize",error.message);
}
export default ratelimit;
 
