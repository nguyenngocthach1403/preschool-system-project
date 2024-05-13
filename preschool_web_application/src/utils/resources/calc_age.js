function calcAge(birthday) {
  const birthdayArr = birthday.split("-");
  const year = parseInt(birthdayArr[0]);
  const month = parseInt(birthdayArr[1]);
  const day = parseInt(birthdayArr[2]);

  const now = new Date();
  const yearNow = now.getFullYear();
  let age = yearNow - year;

  return age;
}

export { calcAge };
