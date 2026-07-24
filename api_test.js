import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. Define Ops-style thresholds (The test fails if these are missed)
export const options = {
  vus: 5,           // 5 virtual users simulated at once
  duration: '10s',  // Run the test continuously for 10 seconds
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests must be faster than 500ms
    http_req_failed: ['rate<0.01'],   // Error rate must be less than 1%
  },
};

// 2. The actual API Test Scenario
export default function () {
  const res = http.get('https://httpbin.org');
  
  // Validate the response
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1); // Wait 1 second between requests per user
}