const findAvailableSlots = require('./solution');

describe('findAvailableSlots', () => {
  const workingHours = [
    [800, 1200], // 8:00 AM - 12:00 PM
    [1300, 1700], // 1:00 PM - 5:00 PM
  ];

  test('basic case with no bookings', () => {
    const existingBookings = [];
    const meetingDuration = 30;

    const expected = [
      [800, 830],
      [830, 900],
      [900, 930],
      [930, 1000],
      [1000, 1030],
      [1030, 1100],
      [1100, 1130],
      [1130, 1200],
      [1300, 1330],
      [1330, 1400],
      [1400, 1430],
      [1430, 1500],
      [1500, 1530],
      [1530, 1600],
      [1600, 1630],
      [1630, 1700],
    ];

    expect(
      findAvailableSlots(workingHours, existingBookings, meetingDuration)
    ).toEqual(expected);
  });

  test('case with existing bookings', () => {
    const existingBookings = [
      [930, 1000], // 9:30 AM - 10:00 AM
      [1115, 1145], // 11:15 AM - 11:45 AM
      [1400, 1430], // 2:00 PM - 2:30 PM
    ];
    const meetingDuration = 30;

    const expected = [
      [800, 830],
      [830, 900],
      [900, 930],
      [1000, 1030],
      [1030, 1100],
      [1300, 1330],
      [1330, 1400],
      [1430, 1500],
      [1500, 1530],
      [1530, 1600],
      [1600, 1630],
      [1630, 1700],
    ];

    expect(
      findAvailableSlots(workingHours, existingBookings, meetingDuration)
    ).toEqual(expected);
  });

  test('different meeting duration', () => {
    const existingBookings = [
      [930, 1000],
      [1400, 1430],
    ];
    const meetingDuration = 60;

    const expected = [
      [800, 900],
      [1000, 1100],
      [1100, 1200],
      [1300, 1400],
      [1430, 1530],
      [1530, 1630],
    ];

    expect(
      findAvailableSlots(workingHours, existingBookings, meetingDuration)
    ).toEqual(expected);
  });

  test('bookings at working hours boundaries', () => {
    const existingBookings = [
      [800, 830], // Start of day
      [1130, 1200], // End of morning
      [1300, 1330], // Start of afternoon
      [1630, 1700], // End of day
    ];
    const meetingDuration = 30;

    const expected = [
      [830, 900],
      [900, 930],
      [930, 1000],
      [1000, 1030],
      [1030, 1100],
      [1100, 1130],
      [1330, 1400],
      [1400, 1430],
      [1430, 1500],
      [1500, 1530],
      [1530, 1600],
      [1600, 1630],
    ];

    expect(
      findAvailableSlots(workingHours, existingBookings, meetingDuration)
    ).toEqual(expected);
  });

  test('invalid meeting duration', () => {
    const existingBookings = [];
    expect(() => {
      findAvailableSlots(workingHours, existingBookings, -30);
    }).toThrow('Meeting duration must be greater than 0');

    expect(() => {
      findAvailableSlots(workingHours, existingBookings, 0);
    }).toThrow('Meeting duration must be greater than 0');
  });

  test('overlapping working hours', () => {
    const overlappingWorkingHours = [
      [800, 1200],
      [1100, 1700],
    ];
    const existingBookings = [];
    const meetingDuration = 30;

    expect(() => {
      findAvailableSlots(
        overlappingWorkingHours,
        existingBookings,
        meetingDuration
      );
    }).toThrow('Working hours overlap');
  });

  test('no available slots', () => {
    const fullyBooked = [
      [800, 1200],
      [1300, 1700],
    ];
    const noWorkingHours = [];
    const meetingDuration = 30;

    // The day is fully booked
    expect(
      findAvailableSlots(workingHours, fullyBooked, meetingDuration)
    ).toEqual([]);

    // No working hours
    expect(findAvailableSlots(noWorkingHours, [], meetingDuration)).toEqual([]);

    // Meeting duration exceeds working hours
    expect(findAvailableSlots(workingHours, [], 500)).toEqual([]);
  });

  test('multiple overlapping bookings', () => {
    const existingBookings = [
      [900, 1000],
      [930, 1030],
      [1015, 1100],
    ];
    const meetingDuration = 30;

    const expected = [
      [800, 830],
      [830, 900],
      [1100, 1130],
      [1130, 1200],
      [1300, 1330],
      [1330, 1400],
      [1400, 1430],
      [1430, 1500],
      [1500, 1530],
      [1530, 1600],
      [1600, 1630],
      [1630, 1700],
    ];

    expect(
      findAvailableSlots(workingHours, existingBookings, meetingDuration)
    ).toEqual(expected);
  });
});
