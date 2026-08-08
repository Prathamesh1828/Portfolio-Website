
(async () => {
  const query = `
    query {
      matchedUser(username: "prathamesh_1828") {
        userCalendar {
          submissionCalendar
        }
      }
    }
  `;
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  const calendar = JSON.parse(data.data.matchedUser.userCalendar.submissionCalendar);
  const total = Object.values(calendar).reduce((a,b)=>a+b, 0);
  console.log('Total in submissionCalendar:', total);
})();
