const t = (n) => {
  let count = 0;
  for (let i = 0; i < n; i++) {
	  for (let j = 0; j < n-1; j++) {
                count += 1;
          }
	  count += 1;
	  console.log(i);
	  console.log(count);
  }
  return count;
}

console.log(t(10));
