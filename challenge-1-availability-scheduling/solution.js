/**
 * Finds all available time slots where a meeting of the specified duration can be scheduled,
 * considering working hours and existing bookings.
 *
 * @param {number[][]} workingHours - Array of working hours where each element is [startTime, endTime]
 * @param {number[][]} existingBookings - Array of existing bookings where each element is [startTime, endTime]
 * @param {number} meetingDuration - Duration of the meeting in minutes
 * @returns {number[][]} - Array of available time slots where each element is [startTime, endTime]
 * @throws {Error} - If meetingDuration is less than or equal to 0
 * @throws {Error} - If working hours overlap
 */

// Finds available time slots for scheduling a meeting based on working hours and existing bookings
function mergeBookings(bookings) {
  const mergedBookings = [];

  for (const [currentStart, currentEnd] of bookings) {
    const lastMergedBooking = mergedBookings[mergedBookings.length - 1];
    if (lastMergedBooking && lastMergedBooking[1] >= currentStart) {
      lastMergedBooking[1] = Math.max(lastMergedBooking[1], currentEnd);
    } else {
      mergedBookings.push([currentStart, currentEnd]);
    }
  }

  return mergedBookings;
}

// Generates free time slots within a given window, excluding merged bookings
function generateFreeIntervals(
  windowStart,
  windowEnd,
  mergedBookings,
  meetingDuration
) {
  const slots = [];
  let freeStart = windowStart;

  for (const [busyStart, busyEnd] of mergedBookings) {
    while (freeStart + meetingDuration <= busyStart) {
      slots.push([toHHMM(freeStart), toHHMM(freeStart + meetingDuration)]);
      freeStart += meetingDuration;
    }
    freeStart = busyEnd;
  }

  while (freeStart + meetingDuration <= windowEnd) {
    slots.push([toHHMM(freeStart), toHHMM(freeStart + meetingDuration)]);
    freeStart += meetingDuration;
  }

  return slots;
}

// Main function
function findAvailableSlots(workingHours, existingBookings, meetingDuration) {
  if (meetingDuration <= 0) {
    throw new Error('Meeting duration must be greater than 0');
  }

  // sort working hours and existing bookings
  const sortedWorking = workingHours
    .map(([start, end]) => [toMinutes(start), toMinutes(end)])
    .sort((a, b) => a[0] - b[0]);

  const sortedBookings = existingBookings
    .map(([start, end]) => [toMinutes(start), toMinutes(end)])
    .sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < sortedWorking.length; i++) {
    if (sortedWorking[i - 1][1] > sortedWorking[i][0]) {
      throw new Error('Working hours overlap');
    }
  }

  let slots = [];

  // Processes each working hour window to filter, merge bookings, and generate available time slots
  for (const [windowStart, windowEnd] of sortedWorking) {
    const filteredBookings = sortedBookings.filter(
      ([bStart, bEnd]) => bEnd > windowStart && bStart < windowEnd
    );

    const periodBookings = mergeBookings(filteredBookings);

    slots.push(
      ...generateFreeIntervals(
        windowStart,
        windowEnd,
        periodBookings,
        meetingDuration
      )
    );
  }

  return slots;
}

// Helper: convert HHMM format to minutes since midnight
function toMinutes(time) {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  return hours * 60 + minutes;
}

// Helper: convert minutes since midnight to HHMM format
function toHHMM(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs * 100 + mins;
}

module.exports = findAvailableSlots;
