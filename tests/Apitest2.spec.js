
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://restful-booker.herokuapp.com';

const bookingData = {
  firstname: 'Yunus',
  lastname: 'Tester',
  totalprice: 250,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-11-01',
    checkout: '2026-11-05'
  },
  additionalneeds: 'Breakfast'
};

// Create a booking for tests that need their own booking ID.
async function createBooking(request) {
  const response = await request.post(`${BASE_URL}/booking`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    data: bookingData
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.bookingid).toBeDefined();

  return body.bookingid;
}

// Generate an authentication token.
async function getToken(request) {
  const response = await request.post(`${BASE_URL}/auth`, {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.token).toBeTruthy();

  return body.token;
}

test.describe('Restful Booker API Tests', () => {

  // API-01: GET all bookings
  test('API-01: Get all bookings', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();

    if (body.length > 0) {
      expect(body[0]).toHaveProperty('bookingid');
      expect(typeof body[0].bookingid).toBe('number');
    }
    console.log(`Total bookings retrieved: ${body.length}`);
  });

  // API-02: GET booking by ID
  test('API-02: Get booking by ID', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.get(
      `${BASE_URL}/booking/${bookingId}`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstname).toBe(bookingData.firstname);
    expect(body.lastname).toBe(bookingData.lastname);
    expect(body.totalprice).toBe(bookingData.totalprice);
    expect(body.depositpaid).toBe(true);
    expect(body.bookingdates.checkin)
      .toBe(bookingData.bookingdates.checkin);
      console.log(`Booking retrieved: ${JSON.stringify(body)}`);
  });

  // API-03: POST a booking
  test('API-03: Create a new booking', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      headers: {
        Accept: 'application/json'
      },
      data: bookingData
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking.firstname).toBe(bookingData.firstname);
    expect(body.booking.lastname).toBe(bookingData.lastname);
    console.log(`New booking created with ID: ${body.bookingid}`);
  });

  // API-04: PUT full update
  test('API-04: Update complete booking using PUT', async ({ request }) => {
    const bookingId = await createBooking(request);
    const token = await getToken(request);

    const updatedBooking = {
      firstname: 'UpdatedFirst',
      lastname: 'UpdatedLast',
      totalprice: 500,
      depositpaid: false,
      bookingdates: {
        checkin: '2026-12-01',
        checkout: '2026-12-06'
      },
      additionalneeds: 'Lunch'
    };

    const response = await request.put(
      `${BASE_URL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
          Accept: 'application/json'
        },
        data: updatedBooking
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstname).toBe(updatedBooking.firstname);
    expect(body.lastname).toBe(updatedBooking.lastname);
    expect(body.totalprice).toBe(updatedBooking.totalprice);
    expect(body.depositpaid).toBe(false);
    expect(body.additionalneeds).toBe('Lunch');
    console.log(`Booking updated: ${JSON.stringify(body)}`);
  });

  // API-05: PATCH partial update
  test('API-05: Update only selected fields using PATCH', async ({ request }) => {
    const bookingId = await createBooking(request);
    const token = await getToken(request);

    const response = await request.patch(
      `${BASE_URL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
          Accept: 'application/json'
        },
        data: {
          firstname: 'PatchUpdated'
        }
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstname).toBe('PatchUpdated');
    console.log(`Booking partially updated: ${JSON.stringify(body)}`);
    // Other fields should remain unchanged.
    expect(body.lastname).toBe(bookingData.lastname);
    expect(body.totalprice).toBe(bookingData.totalprice);
    expect(body.depositpaid).toBe(bookingData.depositpaid);
  });

  // API-06: DELETE booking
  test('API-06: Delete a booking', async ({ request }) => {
    const bookingId = await createBooking(request);
    const token = await getToken(request);

    const deleteResponse = await request.delete(
      `${BASE_URL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`
        }
      }
    );

    expect(deleteResponse.status()).toBe(201);

    const getResponse = await request.get(
      `${BASE_URL}/booking/${bookingId}`
    );

    expect(getResponse.status()).toBe(404);
    console.log(`Booking with ID ${bookingId} successfully deleted.`);
  });

  // API-07: Negative test - missing required fields
  test('API-07: Reject booking with missing required fields', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: {
        firstname: 'NegativeTest'
      }
    });

    // This demo API may return 400 or 500 for invalid payloads.
    // A successful response would indicate that invalid input was accepted.
    expect(response.ok()).toBeFalsy();
   
  });

  // API-08: Validate booking response schema
  test('API-08: Validate booking response fields and types', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.get(
      `${BASE_URL}/booking/${bookingId}`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(typeof body.firstname).toBe('string');
    expect(typeof body.lastname).toBe('string');
    expect(typeof body.totalprice).toBe('number');
    expect(typeof body.depositpaid).toBe('boolean');

    expect(typeof body.bookingdates).toBe('object');
    expect(typeof body.bookingdates.checkin).toBe('string');
    expect(typeof body.bookingdates.checkout).toBe('string');
    console.log(`Booking response validated: ${JSON.stringify(body)}`);
  });

  // API-09: Response time
  test('API-09: GET bookings response time is under 5 seconds', async ({ request }) => {
    const startTime = Date.now();

    const response = await request.get(`${BASE_URL}/booking`);

    const responseTime = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(5000);

    console.log(`GET /booking response time: ${responseTime} ms`);
  });

  // API-10: Authentication
  test('API-10: Protected update rejects invalid token', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.put(
      `${BASE_URL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: 'token=invalid_token',
          Accept: 'application/json'
        },
        data: bookingData
      }
    );

    expect(response.status()).toBe(403);
  });
console.log(`Protected update rejected with invalid token as expected.`);
});
