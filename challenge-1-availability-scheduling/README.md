# Challenge 1: Meeting Availability Finder

## Problem Statement

You're building a scheduling system for a service that requires one-on-one meetings between providers and clients. Each provider has:

1. A working schedule (e.g., 8 AM - 12 PM, 1 PM - 5 PM)
2. Existing bookings throughout their day
3. A standard meeting duration (e.g., 30 minutes)

Your task is to find all available time slots where a new meeting of the specified duration can be scheduled, ensuring that:

- The meeting fits entirely within the provider's working hours
- The meeting doesn't overlap with any existing bookings
- The meeting duration is exactly as specified

## Requirements

1. The solution should return an array of all possible time slots where the meeting can be scheduled
2. Each time slot should be exactly the specified duration
3. Time slots should be in chronological order
4. The solution should be efficient for large sets of bookings

## Example

```javascript
// Input
const workingHours = [
  [800, 1200], // 8:00 AM - 12:00 PM
  [1300, 1700], // 1:00 PM - 5:00 PM
];

const existingBookings = [
  [930, 1000], // 9:30 AM - 10:00 AM
  [1115, 1145], // 11:15 AM - 11:45 AM
  [1400, 1430], // 2:00 PM - 2:30 PM
];

const meetingDuration = 30; // minutes

// Output
const availableSlots = [
  [800, 830], // 8:00 AM - 8:30 AM
  [830, 900], // 8:30 AM - 9:00 AM
  [900, 930], // 9:00 AM - 9:30 AM
  [1000, 1030], // 10:00 AM - 10:30 AM
  [1030, 1100], // 10:30 AM - 11:00 AM
  [1300, 1330], // 1:00 PM - 1:30 PM
  [1330, 1400], // 1:30 PM - 2:00 PM
  [1430, 1500], // 2:30 PM - 3:00 PM
  [1500, 1530], // 3:00 PM - 3:30 PM
  [1530, 1600], // 3:30 PM - 4:00 PM
  [1600, 1630], // 4:00 PM - 4:30 PM
  [1630, 1700], // 4:30 PM - 5:00 PM
];
```

## Implementation

Implement your solution in `solution.js`. The function should accept:

1. An array of working hours (each element is [startTime, endTime])
2. An array of existing bookings (each element is [startTime, endTime])
3. The meeting duration in minutes

And return an array of all available time slots where the meeting can be scheduled.

## Notes

- Time is represented in 24-hour format (e.g., 800 for 8:00 AM, 1330 for 1:30 PM)
- All times are in the same time zone
- Working hours and bookings are provided in chronological order
- The meeting duration must be exact (no partial slots)
- Bookings and Available Slots can only exist inside working hours
- Time slots should be returned in chronological order
- Include edge cases where a slot might start at the exact end of a working period


## My Approach:
For this challenge, I implemented a structured approach to find all available meeting slots:

### Step 1: Time Conversion
I created helper functions to convert between HHMM format (e.g., 1430 for 2:30 PM) and minutes since midnight. This simplifies all time calculations.

```javascript
// Convert 1430 → 870 minutes (14 hours × 60 + 30 minutes)
function toMinutes(time) {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  return hours * 60 + minutes;
}

// Convert back: 870 minutes → 1430
function toHHMM(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs * 100 + mins;
}
```

### Step 2: Validate Input
Ensure that working hours do not overlap.
The meeting duration is greater than 0.

### Step 3: Merge Bookings
For each working period, I filter the bookings that fall within the period and merge any overlapping or adjacent bookings. This creates a clean list of "busy times."

### Step 4: Find Free Intervals
Using the merged bookings, I identify gaps of free time between the busy periods and the boundaries of the working hours.

### Step 5: Process Each Working Period
For each working period:

- Filter bookings that overlap with the period.
- Merge overlapping bookings.
- Generate free intervals and split them into slots of the exact meeting duration.

This gives us all possible start times for meetings that fit perfectly within the free intervals.

## Why This Solution Works Well
1. **Clarity**: The solution is broken into clear, reusable functions (mergeBookings, generateFreeIntervals).
2. **Efficiency**: By processing one working period at a time and merging bookings, the solution avoids unnecessary complexity.
3. **Edge Case Handling**: The approach handles:
   - Bookings that span across working periods.
   - Meetings that fit exactly at the end of working hours.
   - Overlapping or adjacent bookings.

The final output is a sorted array of all possible meeting slots of the requested duration, ensuring they fit within the working hours and do not overlap with existing bookings.
